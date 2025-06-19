"use server";

import { neon } from "@neondatabase/serverless";
import {
  CertificateGenerator,
  type CertificateTemplate,
} from "@/lib/services/certificate-service";
import { revalidatePath } from "next/cache";
import { requireAuth, getServerUser } from "@/lib/auth-utils";

const sql = neon(process.env.DATABASE_URL!);

export async function generateCertificateForCompletion(
  userId: number,
  courseId: number,
  enrollmentId: number
) {
  try {
    // Get user and course information
    const [userResult, courseResult] = await Promise.all([
      sql`SELECT name, email FROM users WHERE id = ${userId}`,
      sql`SELECT title FROM courses WHERE id = ${courseId}`,
    ]);

    if (!userResult.length || !courseResult.length) {
      throw new Error("User or course not found");
    }

    const user = userResult[0];
    const course = courseResult[0];

    // Check if certificate already exists
    const existingCert = await sql`
      SELECT id FROM certificates 
      WHERE user_id = ${userId} AND course_id = ${courseId}
    `;

    if (existingCert.length > 0) {
      return { success: true, message: "Certificate already exists" };
    }

    // Get default template
    const templateResult = await sql`
      SELECT * FROM certificate_templates 
      WHERE is_default = true 
      LIMIT 1
    `;

    if (!templateResult.length) {
      throw new Error("No default certificate template found");
    }

    const template: CertificateTemplate = templateResult[0];

    // Generate certificate
    const { certificateId, verificationHash, pdfBuffer } =
      await CertificateGenerator.generateCertificate(
        user.name,
        course.title,
        new Date(),
        template
      );

    const pdfUrl = `/api/certificates/${certificateId}/download`;

    // Save certificate record
    await sql`
      INSERT INTO certificates (
        certificate_id, user_id, course_id, enrollment_id,
        student_name, course_title, completion_date,
        template_id, verification_hash, pdf_url
      ) VALUES (
        ${certificateId}, ${userId}, ${courseId}, ${enrollmentId},
        ${user.name}, ${course.title}, CURRENT_DATE,
        ${template.id}, ${verificationHash}, ${pdfUrl}
      )
    `;

    revalidatePath("/profile");
    revalidatePath("/academy/dashboard");

    return {
      success: true,
      certificateId,
      message: "Certificate generated successfully",
    };
  } catch (error) {
    console.error("Certificate generation error:", error);
    return { success: false, message: "Failed to generate certificate" };
  }
}

export async function getUserCertificates() {
  const user = getServerUser();

  if (!user) {
    return [];
  }

  try {
    const certificates = await sql`
      SELECT 
        c.*,
        co.title as course_title,
        co.slug as course_slug
      FROM certificates c
      JOIN courses co ON c.course_id = co.id
      WHERE c.user_id = ${user.id}
      ORDER BY c.issued_date DESC
    `;

    return certificates;
  } catch (error) {
    console.error("Get user certificates error:", error);
    return [];
  }
}

export async function getCertificateById(certificateId: string) {
  try {
    const certificates = await sql`
      SELECT 
        c.*,
        u.name as student_name,
        co.title as course_title
      FROM certificates c
      JOIN users u ON c.user_id = u.id
      JOIN courses co ON c.course_id = co.id
      WHERE c.certificate_id = ${certificateId}
      LIMIT 1
    `;

    return certificates.length > 0 ? certificates[0] : null;
  } catch (error) {
    console.error("Get certificate error:", error);
    return null;
  }
}

export async function verifyCertificate(
  certificateId: string,
  verificationHash: string
) {
  try {
    const certificate = await getCertificateById(certificateId);

    if (!certificate) {
      return { valid: false, message: "Certificate not found" };
    }

    const isValid = certificate.verification_hash === verificationHash;

    return {
      valid: isValid,
      message: isValid
        ? "Certificate is valid"
        : "Certificate verification failed",
      certificate: isValid ? certificate : null,
    };
  } catch (error) {
    console.error("Certificate verification error:", error);
    return { valid: false, message: "Verification failed" };
  }
}

export async function getCertificateTemplates() {
  try {
    const templates = await sql`
      SELECT * FROM certificate_templates
      ORDER BY is_default DESC, name ASC
    `;
    return templates;
  } catch (error) {
    console.error("Get certificate templates error:", error);
    return [];
  }
}

export async function createCertificateTemplate(formData: FormData) {
  const user = requireAuth();

  // In a real app, you'd check if user is admin

  try {
    const name = formData.get("name") as string;
    const designConfig = JSON.parse(formData.get("designConfig") as string);
    const isDefault = formData.get("isDefault") === "true";

    // If setting as default, unset other defaults
    if (isDefault) {
      await sql`UPDATE certificate_templates SET is_default = false`;
    }

    await sql`
      INSERT INTO certificate_templates (name, design_config, is_default)
      VALUES (${name}, ${JSON.stringify(designConfig)}, ${isDefault})
    `;

    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error) {
    console.error("Create certificate template error:", error);
    return { success: false, message: "Failed to create template" };
  }
}
