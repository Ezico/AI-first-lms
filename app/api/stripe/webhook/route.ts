import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { enrollInCourse } from "@/lib/actions/enrollment";
import { neon } from "@neondatabase/serverless";
import { executeQuery } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const config = {
  api: {
    bodyParser: false,
  },
};

const sql = neon(process.env.DATABASE_URL!);
export async function POST(req: Request) {
  const rawBody = await req.text(); // No bodyParser used
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const userId = session.metadata.userId;
    const email = session.metadata.email;
    const courseId = session.metadata.courseId;
    const cohortDate = session.metadata.cohortDate;
    const courseType = session.metadata.type; //
    const paymentIntent = event.data.object;

    if (courseType === "simple") {
      // Store purchase

      await sql`
      INSERT INTO "SimpleCoursePurchase" (userId, courseId, cohortdate, createdat)
      VALUES (${userId}, ${courseId}, ${cohortDate}, NOW());`;
    } else {
      console.log(`Enroll user ${userId} to course ${courseId}`);
      const existingEnrollment = await executeQuery(
        `SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2`,
        [userId, courseId]
      );
      if (existingEnrollment && existingEnrollment.length > 0) {
        return {
          success: true,
          message: "Already enrolled",
          enrollmentId: existingEnrollment[0].id,
        };
      }
      // Create enrollment
      const enrollment = await executeQuery(
        `INSERT INTO enrollments (user_id, course_id, enrolled_at)
   VALUES ($1, $2, NOW()) RETURNING id`,
        [userId, courseId]
      );

      if (!enrollment || enrollment.length === 0) {
        throw new Error("Failed to create enrollment");
      }

      const enrollmentId = enrollment[0].id;

      const lessons = await executeQuery(
        `SELECT l.id FROM lessons l
   JOIN modules m ON l.module_id = m.id
   WHERE m.course_id = $1 ORDER BY m.order, l.order`,
        [courseId]
      );

      if (lessons && lessons.length > 0) {
        for (const lesson of lessons) {
          await executeQuery(
            `INSERT INTO progress (enrollment_id, lesson_id, completed, progress, last_accessed)
       VALUES ($1, $2, false, 0, NOW())`,
            [enrollmentId, lesson.id]
          );
        }
      }
    }
  }
  return NextResponse.json({ received: true });
}
