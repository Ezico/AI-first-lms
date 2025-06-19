"use server";

import { neon } from "@neondatabase/serverless";
import { requireAuth } from "@/lib/auth-utils";
import {
  sendProductDeliveryEmail,
  sendPurchaseConfirmationEmail,
} from "@/lib/services/email-service";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const sql = neon(process.env.DATABASE_URL!);

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51Gziy4Ej7vgoVuIzXLb3JtNoyDh1tsTZhvLMAWTFjXNztFpQoPAhghCjgxtqLapGHbV79SOUSC9DwMtjJFZ274D100cwZgy2Q7",
  {
    apiVersion: "2023-10-16",
  }
);

export async function createProductCheckoutSession(formData: FormData) {
  const user = requireAuth();

  const productId = Number.parseInt(formData.get("productId") as string);
  const email = formData.get("email") as string;

  try {
    // Get product details
    const products = await sql`
      SELECT * FROM product_courses 
      WHERE id = ${productId} AND status = 'published'
      LIMIT 1
    `;

    if (products.length === 0) {
      throw new Error("Product not found");
    }

    const product = products[0];

    // Check if user already purchased this product
    const existingPurchase = await sql`
      SELECT id FROM product_purchases
      WHERE user_id = ${user.id} AND product_course_id = ${productId} AND payment_status = 'completed'
      LIMIT 1
    `;

    if (existingPurchase.length > 0) {
      throw new Error("You have already purchased this product");
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description:
                product.short_description ||
                product.description.substring(0, 100),
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/products/${product.slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/products/${product.slug}`,
      customer_email: email,
      metadata: {
        productId: productId.toString(),
        userId: user.id.toString(),
        productType: "product_course",
      },
    });

    // Create pending purchase record
    await sql`
      INSERT INTO product_purchases (
        user_id, product_course_id, purchase_price, payment_intent_id, 
        payment_status, access_expires_at, purchased_at
      ) VALUES (
        ${user.id}, ${productId}, ${product.price}, ${session.id},
        'pending', NOW() + INTERVAL '${product.access_duration} days', NOW()
      )
    `;

    return { success: true, sessionUrl: session.url };
  } catch (error) {
    console.error("Error creating product checkout session:", error);
    return { success: false, error: error.message };
  }
}

export async function handleProductPurchaseSuccess(sessionId: string) {
  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const productId = Number.parseInt(session.metadata?.productId || "0");
    const userId = Number.parseInt(session.metadata?.userId || "0");

    if (!productId || !userId) {
      throw new Error("Invalid session metadata");
    }

    // Update purchase status
    await sql`
      UPDATE product_purchases 
      SET payment_status = 'completed'
      WHERE user_id = ${userId} AND product_course_id = ${productId} AND payment_intent_id = ${sessionId}
    `;

    // Get user and product details
    const users = await sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`;
    const products =
      await sql`SELECT * FROM product_courses WHERE id = ${productId} LIMIT 1`;

    if (users.length === 0 || products.length === 0) {
      throw new Error("User or product not found");
    }

    const user = users[0];
    const product = products[0];

    // Generate download link (in a real app, this would be a secure, time-limited URL)
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${productId}/download?userId=${userId}`;

    // Send product delivery email
    await sendProductDeliveryEmail(
      user.email,
      user.name,
      productId,
      downloadLink
    );

    // Send purchase confirmation email
    await sendPurchaseConfirmationEmail(
      user.email,
      user.name,
      product.title,
      product.price
    );

    revalidatePath("/profile");
    revalidatePath("/products");

    return { success: true, product };
  } catch (error) {
    console.error("Error handling product purchase success:", error);
    return { success: false, error: error.message };
  }
}

export async function incrementDownloadCount(
  productId: number,
  userId: number
) {
  try {
    const result = await sql`
      UPDATE product_purchases 
      SET download_count = download_count + 1
      WHERE user_id = ${userId} AND product_course_id = ${productId} AND payment_status = 'completed'
      RETURNING download_count, (
        SELECT download_limit FROM product_courses WHERE id = ${productId}
      ) as download_limit
    `;

    if (result.length === 0) {
      throw new Error("Purchase not found");
    }

    const { download_count, download_limit } = result[0];

    if (download_count > download_limit) {
      throw new Error("Download limit exceeded");
    }

    return {
      success: true,
      downloadCount: download_count,
      downloadLimit: download_limit,
    };
  } catch (error) {
    console.error("Error incrementing download count:", error);
    return { success: false, error: error.message };
  }
}
