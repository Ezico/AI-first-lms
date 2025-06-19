"use server";

import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Initialize Stripe - handle both test and live keys
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Stripe secret key is not configured");
  }

  return new Stripe(secretKey, {
    apiVersion: "2023-10-16",
    typescript: true,
  });
};

// Create or retrieve Stripe customer with improved error handling
export async function createOrGetCustomer(params: {
  email: string;
  name: string;
  userId: number;
}): Promise<Stripe.Customer> {
  try {
    console.log("Creating/getting customer for:", params);

    const stripe = getStripeInstance();

    // Check if customer already exists in our database
    const existingCustomers = await sql`
      SELECT stripe_customer_id FROM users WHERE id = ${params.userId} AND stripe_customer_id IS NOT NULL
    `;

    console.log("Existing customers check:", existingCustomers);

    if (
      existingCustomers.length > 0 &&
      existingCustomers[0].stripe_customer_id
    ) {
      try {
        // Retrieve existing customer from Stripe
        const customer = await stripe.customers.retrieve(
          existingCustomers[0].stripe_customer_id
        );
        if (!customer.deleted) {
          console.log("Found existing customer:", customer.id);
          return customer as Stripe.Customer;
        }
      } catch (error) {
        console.log("Existing customer not found in Stripe, creating new one");
      }
    }

    // Create new customer
    console.log("Creating new Stripe customer...");
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: {
        userId: params.userId.toString(),
      },
    });

    console.log("Created Stripe customer:", customer.id);

    // Update user record with Stripe customer ID
    try {
      await sql`
        UPDATE users SET stripe_customer_id = ${customer.id} WHERE id = ${params.userId}
      `;
      console.log("Updated user with customer ID");
    } catch (dbError) {
      console.error("Failed to update user with customer ID:", dbError);
      // Don't throw here, customer was created successfully
    }

    return customer;
  } catch (error) {
    console.error("Error creating/getting Stripe customer:", error);

    // Provide more specific error messages
    if (error instanceof Stripe.errors.StripeError) {
      throw new Error(`Stripe error: ${error.message}`);
    }

    throw new Error(
      `Failed to create customer: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Create payment intent with comprehensive options
export async function createPaymentIntent(params: {
  amount: number;
  currency?: string;
  customerId?: string;
  paymentMethodId?: string;
  courseId?: number;
  productCourseId?: number;
  userId: number;
  metadata?: Record<string, string>;
}): Promise<Stripe.PaymentIntent> {
  try {
    const stripe = getStripeInstance();

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: Math.round(params.amount * 100), // Convert to cents
      currency: params.currency || "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: params.userId.toString(),
        ...(params.courseId && { courseId: params.courseId.toString() }),
        ...(params.productCourseId && {
          productCourseId: params.productCourseId.toString(),
        }),
        ...params.metadata,
      },
    };

    if (params.customerId) {
      paymentIntentParams.customer = params.customerId;
    }

    if (params.paymentMethodId) {
      paymentIntentParams.payment_method = params.paymentMethodId;
      paymentIntentParams.confirmation_method = "manual";
      paymentIntentParams.confirm = true;
      paymentIntentParams.return_url = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/return`;
    }

    const paymentIntent =
      await stripe.paymentIntents.create(paymentIntentParams);

    // Store payment record in database
    await sql`
      INSERT INTO payments (
        user_id, stripe_payment_intent_id, stripe_customer_id, amount, currency, 
        status, course_id, product_course_id, metadata
      ) VALUES (
        ${params.userId}, ${paymentIntent.id}, ${params.customerId || null}, 
        ${params.amount}, ${params.currency || "usd"}, ${paymentIntent.status},
        ${params.courseId || null}, ${params.productCourseId || null}, ${JSON.stringify(params.metadata || {})}
      )
    `;

    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

// Create checkout session for hosted checkout
export async function createCheckoutSession(params: {
  customerId?: string;
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  paymentMethodTypes?: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
}): Promise<Stripe.Checkout.Session> {
  try {
    const stripe = getStripeInstance();

    console.log("Creating checkout session with params:", {
      customerId: params.customerId,
      lineItems: params.lineItems,
      metadata: params.metadata,
    });

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: params.paymentMethodTypes || ["card"],
      line_items: params.lineItems,
      mode: "payment",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
      invoice_creation: {
        enabled: true,
      },
    };

    // Only add customer if provided
    if (params.customerId) {
      sessionParams.customer = params.customerId;
    }

    // Add payment intent data if metadata exists
    if (params.metadata) {
      sessionParams.payment_intent_data = {
        metadata: params.metadata,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log("Created checkout session:", session.id);
    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);

    if (error instanceof Stripe.errors.StripeError) {
      throw new Error(`Stripe checkout error: ${error.message}`);
    }

    throw new Error("Failed to create checkout session");
  }
}

// Save payment method for future use
export async function savePaymentMethod(params: {
  customerId: string;
  paymentMethodId: string;
  userId: number;
  setAsDefault?: boolean;
}): Promise<void> {
  try {
    const stripe = getStripeInstance();
    // Attach payment method to customer
    await stripe.paymentMethods.attach(params.paymentMethodId, {
      customer: params.customerId,
    });

    // Get payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(
      params.paymentMethodId
    );

    // Set as default if requested
    if (params.setAsDefault) {
      await stripe.customers.update(params.customerId, {
        invoice_settings: {
          default_payment_method: params.paymentMethodId,
        },
      });

      // Update existing default payment methods
      await sql`
        UPDATE payment_methods SET is_default = false WHERE user_id = ${params.userId}
      `;
    }

    // Store in database
    await sql`
      INSERT INTO payment_methods (
        user_id, stripe_payment_method_id, type, card_brand, card_last4, 
        card_exp_month, card_exp_year, is_default
      ) VALUES (
        ${params.userId}, ${params.paymentMethodId}, ${paymentMethod.type},
        ${paymentMethod.card?.brand || null}, ${paymentMethod.card?.last4 || null},
        ${paymentMethod.card?.exp_month || null}, ${paymentMethod.card?.exp_year || null},
        ${params.setAsDefault || false}
      )
      ON CONFLICT (stripe_payment_method_id) DO UPDATE SET
        is_default = ${params.setAsDefault || false},
        updated_at = NOW()
    `;
  } catch (error) {
    console.error("Error saving payment method:", error);
    throw new Error("Failed to save payment method");
  }
}

// Retrieve payment methods for a customer
export async function getCustomerPaymentMethods(
  customerId: string
): Promise<Stripe.PaymentMethod[]> {
  try {
    const stripe = getStripeInstance();
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    return paymentMethods.data;
  } catch (error) {
    console.error("Error retrieving payment methods:", error);
    return [];
  }
}

// Confirm payment intent
export async function confirmPaymentIntent(
  paymentIntentId: string,
  paymentMethodId?: string
): Promise<Stripe.PaymentIntent> {
  try {
    const stripe = getStripeInstance();
    const confirmParams: Stripe.PaymentIntentConfirmParams = {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/return`,
    };

    if (paymentMethodId) {
      confirmParams.payment_method = paymentMethodId;
    }

    const paymentIntent = await stripe.paymentIntents.confirm(
      paymentIntentId,
      confirmParams
    );

    // Update payment status in database
    await sql`
      UPDATE payments SET status = ${paymentIntent.status}, updated_at = NOW()
      WHERE stripe_payment_intent_id = ${paymentIntentId}
    `;

    return paymentIntent;
  } catch (error) {
    console.error("Error confirming payment intent:", error);
    throw new Error("Failed to confirm payment");
  }
}

// Retrieve payment intent
export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  try {
    const stripe = getStripeInstance();
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw new Error("Failed to retrieve payment intent");
  }
}

// Create refund
export async function createRefund(params: {
  paymentIntentId: string;
  amount?: number;
  reason?: Stripe.RefundCreateParams.Reason;
}): Promise<Stripe.Refund> {
  try {
    const stripe = getStripeInstance();
    const refund = await stripe.refunds.create({
      payment_intent: params.paymentIntentId,
      amount: params.amount ? Math.round(params.amount * 100) : undefined,
      reason: params.reason,
    });

    return refund;
  } catch (error) {
    console.error("Error creating refund:", error);
    throw new Error("Failed to create refund");
  }
}

// Get webhook event
export async function constructWebhookEvent(
  payload: string,
  signature: string
): Promise<Stripe.Event> {
  try {
    const stripe = getStripeInstance();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Stripe webhook secret is not configured");
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Error constructing webhook event:", error);
    throw new Error("Invalid webhook signature");
  }
}
