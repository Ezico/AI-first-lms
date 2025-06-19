import { type NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/actions/certificate-actions";
import { CertificateGenerator } from "@/lib/services/certificate-service";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: { certificateId: string } }
) {
  try {
    const certificate = await getCertificateById(params.certificateId);

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // Get template
    const templateResult = await sql`
      SELECT * FROM certificate_templates 
      WHERE id = ${certificate.template_id}
      LIMIT 1
    `;

    if (!templateResult.length) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    const template = templateResult[0];

    // Regenerate PDF (in production, you'd store the actual PDF)
    const { pdfBuffer } = await CertificateGenerator.generateCertificate(
      certificate.student_name,
      certificate.course_title,
      new Date(certificate.completion_date),
      template
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${certificate.certificate_id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Certificate download error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
