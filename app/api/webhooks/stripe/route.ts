import { type NextRequest, NextResponse } from "next/server";
import { StripeService } from "@/lib/services/stripe-service";
import { neon } from "@neondatabase/serverless";
import { enrollInCourse } from "@/lib/actions/enrollment";
import { handleProductPurchaseSuccess } from "@/lib/actions/product-purchase-actions";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    const event = StripeService.constructWebhookEvent(body, signature);

    console.log(`Received webhook: ${event.type}`);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        await handlePaymentSuccess(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        await handlePaymentFailure(paymentIntent);
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        // Handle subscription events if needed in the future
        console.log(`Subscription event: ${event.type}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  try {
    // Update payment status in database
    await sql`
      UPDATE payments 
      SET status = 'succeeded', updated_at = NOW()
      WHERE stripe_payment_intent_id = ${paymentIntent.id}
    `;

    // Get payment details
    const payments = await sql`
      SELECT * FROM payments WHERE stripe_payment_intent_id = ${paymentIntent.id} LIMIT 1
    `;

    if (payments.length === 0) {
      console.error("Payment not found in database:", paymentIntent.id);
      return;
    }

    const payment = payments[0];

    // Handle course enrollment
    if (payment.course_id) {
      await enrollInCourse(payment.course_id, paymentIntent.id);
    }

    // Handle product purchase
    if (payment.product_course_id) {
      // Create a mock session object for product purchase handling
      const mockSession = {
        id: paymentIntent.id,
        payment_status: "paid",
        metadata: {
          productId: payment.product_course_id.toString(),
          userId: payment.user_id.toString(),
        },
      };
      await handleProductPurchaseSuccess(mockSession.id);
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  try {
    // Update payment status in database
    await sql`
      UPDATE payments 
      SET status = 'failed', updated_at = NOW()
      WHERE stripe_payment_intent_id = ${paymentIntent.id}
    `;

    console.log(`Payment failed: ${paymentIntent.id}`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  try {
    console.log(`Checkout session completed: ${session.id}`);

    // Handle based on metadata
    if (session.metadata?.productType === "product_course") {
      await handleProductPurchaseSuccess(session.id);
    } else if (session.metadata?.courseId) {
      // Handle regular course enrollment
      const courseId = Number.parseInt(session.metadata.courseId);
      const userId = Number.parseInt(session.metadata.userId);

      if (courseId && userId) {
        await enrollInCourse(courseId, session.payment_intent);
      }
    }
  } catch (error) {
    console.error("Error handling checkout session completion:", error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    console.log(`Invoice payment succeeded: ${invoice.id}`);
    // Handle invoice payment success if needed
  } catch (error) {
    console.error("Error handling invoice payment success:", error);
  }
}
