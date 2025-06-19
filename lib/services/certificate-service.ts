import { jsPDF } from "jspdf";
import crypto from "crypto";

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
  verificationHash: string;
}

export interface CertificateTemplate {
  id: number;
  name: string;
  design_config: {
    backgroundColor: string;
    borderColor: string;
    titleColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    logoUrl?: string;
    showLogo: boolean;
    showBorder: boolean;
    borderWidth: number;
  };
}

export class CertificateGenerator {
  private static generateCertificateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `CERT-${timestamp}-${random}`.toUpperCase();
  }

  private static generateVerificationHash(data: CertificateData): string {
    const hashString = `${data.studentName}|${data.courseTitle}|${data.completionDate}|${data.certificateId}`;
    return crypto.createHash("sha256").update(hashString).digest("hex");
  }

  static async generateCertificate(
    studentName: string,
    courseTitle: string,
    completionDate: Date,
    template: CertificateTemplate
  ): Promise<{
    certificateId: string;
    verificationHash: string;
    pdfBuffer: Buffer;
  }> {
    const certificateId = this.generateCertificateId();
    const completionDateStr = completionDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const certificateData: CertificateData = {
      studentName,
      courseTitle,
      completionDate: completionDateStr,
      certificateId,
      verificationHash: "",
    };

    certificateData.verificationHash =
      this.generateVerificationHash(certificateData);

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const config = template.design_config;

    // Set background color
    if (config.backgroundColor !== "#ffffff") {
      pdf.setFillColor(config.backgroundColor);
      pdf.rect(0, 0, 297, 210, "F");
    }

    // Add border if enabled
    if (config.showBorder) {
      pdf.setDrawColor(config.borderColor);
      pdf.setLineWidth(config.borderWidth / 10);
      pdf.rect(10, 10, 277, 190);
    }

    // Add decorative elements
    pdf.setFillColor(config.accentColor);
    pdf.circle(50, 50, 15, "F");
    pdf.circle(247, 50, 15, "F");
    pdf.circle(50, 160, 15, "F");
    pdf.circle(247, 160, 15, "F");

    // Certificate title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(36);
    pdf.setTextColor(config.titleColor);
    pdf.text("CERTIFICATE OF COMPLETION", 148.5, 60, { align: "center" });

    // Decorative line
    pdf.setDrawColor(config.accentColor);
    pdf.setLineWidth(1);
    pdf.line(80, 70, 217, 70);

    // Student name
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.setTextColor(config.textColor);
    pdf.text("This is to certify that", 148.5, 85, { align: "center" });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.setTextColor(config.titleColor);
    pdf.text(studentName, 148.5, 100, { align: "center" });

    // Course completion text
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.setTextColor(config.textColor);
    pdf.text("has successfully completed the course", 148.5, 115, {
      align: "center",
    });

    // Course title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(config.accentColor);
    pdf.text(courseTitle, 148.5, 130, { align: "center" });

    // Completion date
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(config.textColor);
    pdf.text(`Completed on ${completionDateStr}`, 148.5, 145, {
      align: "center",
    });

    // Certificate ID and verification
    pdf.setFontSize(10);
    pdf.setTextColor("#666666");
    pdf.text(`Certificate ID: ${certificateId}`, 20, 190);
    pdf.text(
      `Verification: ${certificateData.verificationHash.substring(0, 16)}...`,
      20,
      195
    );

    // QR code placeholder (in a real implementation, you'd generate an actual QR code)
    pdf.setDrawColor("#cccccc");
    pdf.rect(250, 170, 25, 25);
    pdf.setFontSize(8);
    pdf.text("QR Code", 262.5, 185, { align: "center" });

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    return {
      certificateId,
      verificationHash: certificateData.verificationHash,
      pdfBuffer,
    };
  }

  static verifyHash(certificateData: CertificateData): boolean {
    const expectedHash = this.generateVerificationHash({
      ...certificateData,
      verificationHash: "",
    });
    return expectedHash === certificateData.verificationHash;
  }
}
