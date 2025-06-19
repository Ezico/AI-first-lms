"use server";

import { requireAuth } from "@/lib/auth-utils";
import { executeQuery } from "@/lib/db";
import {
  createOrGetCustomer,
  createCheckoutSession,
} from "@/lib/services/stripe-service";
import { redirect } from "next/navigation";

export async function createCourseCheckoutSession(user, courseId, courseSlug) {
  try {
    console.log(
      "Creating checkout session for user:",
      user.id,
      "course:",
      courseId
    );

    // Get course details
    const courses = await executeQuery(
      `SELECT id, title, price, description, image FROM "courses" WHERE id = $1 LIMIT 1`,
      [courseId]
    );

    if (!courses || courses.length === 0) {
      throw new Error("Course not found");
    }

    const course = courses[0];
    console.log("Found course:", course.title, "price:", course.price);

    // Check if user is already enrolled
    const enrollments = await executeQuery(
      `SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2 LIMIT 1`,
      [user.id, courseId]
    );

    if (enrollments && enrollments.length > 0) {
      console.log("User already enrolled, redirecting to learn page");
      redirect(`/academy/courses/${courseSlug}/learn`);
    }

    // Create or get Stripe customer with better error handling
    let customer;
    try {
      customer = await createOrGetCustomer({
        email: user.email,
        name: user.name,
        userId: user.id,
      });
      console.log("Successfully created/retrieved customer:", customer.id);
    } catch (customerError) {
      console.error("Customer creation failed:", customerError);
      // Try to proceed without customer ID for now
      customer = null;
    }

    // Ensure price is a valid number
    const coursePrice = Number.parseFloat(course.price);
    if (isNaN(coursePrice) || coursePrice <= 0) {
      throw new Error("Invalid course price");
    }

    console.log("Creating checkout session with price:", coursePrice);

    // Create checkout session
    const session = await createCheckoutSession({
      customerId: customer?.id,
      lineItems: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description:
                course.description || `Access to ${course.title} course`,
              images: course.image
                ? [`${process.env.NEXT_PUBLIC_BASE_URL}${course.image}`]
                : [],
            },
            unit_amount: Math.round(coursePrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      successUrl: `http://localhost:3000/academy/courses/${courseSlug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `http://localhost:3000/academy/courses/${courseSlug}/checkout?canceled=true`,
      metadata: {
        courseId: courseId.toString(),
        userId: user.id.toString(),
        courseSlug,
        productType: "course",
      },
      paymentMethodTypes: ["card"],
    });

    console.log("Successfully created checkout session:", session.id);

    // Store the checkout session for tracking
    try {
      await executeQuery(
        `INSERT INTO payments (user_id, stripe_checkout_session_id, course_id, amount, currency, status, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          user.id,
          session.id,
          courseId,
          coursePrice,
          "usd",
          "pending",
          JSON.stringify({
            courseSlug,
            sessionUrl: session.url,
          }),
        ]
      );
      console.log("Stored payment record in database");
    } catch (dbError) {
      console.error("Failed to store payment record:", dbError);
      // Don't fail the checkout for this
    }

    return {
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session",
    };
  }
}

export async function verifyCheckoutSession(sessionId: string) {
  try {
    const user = requireAuth();
    console.log("Verifying checkout session:", sessionId, "for user:", user.id);

    // Retrieve the checkout session from Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    if (!session) {
      throw new Error("Checkout session not found");
    }

    console.log(
      "Retrieved session:",
      session.id,
      "status:",
      session.payment_status
    );

    // Verify the session belongs to the current user
    if (session.metadata?.userId !== user.id.toString()) {
      throw new Error("Unauthorized access to checkout session");
    }

    // Check if payment was successful
    if (session.payment_status === "paid") {
      const courseId = Number.parseInt(session.metadata?.courseId || "0");

      if (courseId) {
        console.log(
          "Payment successful, processing enrollment for course:",
          courseId
        );

        // Update payment record
        try {
          await executeQuery(
            `UPDATE payments SET 
             status = 'succeeded', 
             stripe_payment_intent_id = $1,
             updated_at = NOW()
             WHERE stripe_checkout_session_id = $2`,
            [session.payment_intent?.id || null, sessionId]
          );
          console.log("Updated payment record");
        } catch (dbError) {
          console.error("Failed to update payment record:", dbError);
        }

        // Check if already enrolled
        const enrollments = await executeQuery(
          `SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2 LIMIT 1`,
          [user.id, courseId]
        );

        if (!enrollments || enrollments.length === 0) {
          console.log("Creating enrollment...");

          // Create enrollment
          const enrollment = await executeQuery(
            `INSERT INTO enrollments (user_id, course_id, enrolled_at)
             VALUES ($1, $2, NOW()) RETURNING id`,
            [user.id, courseId]
          );

          if (enrollment && enrollment.length > 0) {
            console.log("Created enrollment:", enrollment[0].id);

            // Create initial progress records
            const lessons = await executeQuery(
              `SELECT l.id FROM "Lesson" l
               JOIN "Module" m ON l."moduleId" = m.id
               WHERE m."courseId" = $1 ORDER BY m."order", l."order"`,
              [courseId]
            );

            console.log("Found lessons:", lessons?.length || 0);

            if (lessons && lessons.length > 0) {
              for (const lesson of lessons) {
                await executeQuery(
                  `INSERT INTO progress (enrollment_id, lesson_id, completed, progress, last_accessed)
                   VALUES ($1, $2, false, 0, NOW())`,
                  [enrollment[0].id, lesson.id]
                );
              }
              console.log("Created progress records");
            }
          }
        } else {
          console.log("User already enrolled");
        }
      }

      return {
        success: true,
        session,
        paymentStatus: session.payment_status,
      };
    }

    return {
      success: false,
      session,
      paymentStatus: session.payment_status,
      error: "Payment not completed",
    };
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to verify checkout session",
    };
  }
}
