import { neon } from "@neondatabase/serverless";
import { getProductCourseById } from "@/lib/actions/product-course-actions";

const sql = neon(process.env.DATABASE_URL!);

// In a real application, you would use a service like SendGrid, AWS SES, or Resend
// For this example, we'll simulate the email sending process

export type EmailTemplate = {
  id: number;
  name: string;
  template_type: string;
  subject: string;
  html_content: string;
  text_content?: string;
  variables?: string[];
  is_default: boolean;
};

export async function getEmailTemplate(templateType: string) {
  try {
    const templates = await sql<EmailTemplate[]>`
      SELECT * FROM email_templates 
      WHERE template_type = ${templateType} AND is_default = true
      LIMIT 1
    `;

    if (templates.length === 0) {
      throw new Error(`No default template found for type: ${templateType}`);
    }

    return templates[0];
  } catch (error) {
    console.error("Failed to fetch email template:", error);
    throw error;
  }
}

export async function getAllEmailTemplates() {
  try {
    const templates = await sql<EmailTemplate[]>`
      SELECT * FROM email_templates 
      ORDER BY template_type, name
    `;
    return templates;
  } catch (error) {
    console.error("Failed to fetch email templates:", error);
    return [];
  }
}

export async function createEmailTemplate(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const template_type = formData.get("template_type") as string;
    const subject = formData.get("subject") as string;
    const html_content = formData.get("html_content") as string;
    const text_content = formData.get("text_content") as string;
    const variables = formData.get("variables")
      ? (formData.get("variables") as string).split(",").map((v) => v.trim())
      : [];
    const is_default = formData.get("is_default") === "on";

    // If this is set as default, unset other defaults for this type
    if (is_default) {
      await sql`
        UPDATE email_templates 
        SET is_default = false 
        WHERE template_type = ${template_type}
      `;
    }

    await sql`
      INSERT INTO email_templates (
        name, template_type, subject, html_content, text_content, 
        variables, is_default, created_at, updated_at
      ) VALUES (
        ${name}, ${template_type}, ${subject}, ${html_content}, ${text_content},
        ${variables}, ${is_default}, NOW(), NOW()
      )
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to create email template:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEmailTemplate(
  templateId: number,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const template_type = formData.get("template_type") as string;
    const subject = formData.get("subject") as string;
    const html_content = formData.get("html_content") as string;
    const text_content = formData.get("text_content") as string;
    const variables = formData.get("variables")
      ? (formData.get("variables") as string).split(",").map((v) => v.trim())
      : [];
    const is_default = formData.get("is_default") === "on";

    // If this is set as default, unset other defaults for this type
    if (is_default) {
      await sql`
        UPDATE email_templates 
        SET is_default = false 
        WHERE template_type = ${template_type} AND id != ${templateId}
      `;
    }

    await sql`
      UPDATE email_templates SET
        name = ${name},
        template_type = ${template_type},
        subject = ${subject},
        html_content = ${html_content},
        text_content = ${text_content},
        variables = ${variables},
        is_default = ${is_default},
        updated_at = NOW()
      WHERE id = ${templateId}
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to update email template:", error);
    return { success: false, error: error.message };
  }
}

function replaceTemplateVariables(
  content: string,
  variables: Record<string, any>
): string {
  let result = content;

  // Replace simple variables like {{variableName}}
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, String(value || ""));
  }

  // Handle array variables like {{#each whatIncluded}}
  if (variables.whatIncluded && Array.isArray(variables.whatIncluded)) {
    const listItems = variables.whatIncluded
      .map((item) => `<li>${item}</li>`)
      .join("");
    result = result.replace(
      /{{#each whatIncluded}}[\s\S]*?{{\/each}}/g,
      listItems
    );
  }

  return result;
}

export async function sendProductDeliveryEmail(
  userEmail: string,
  userName: string,
  productId: number,
  downloadLink: string
) {
  try {
    // Get the product details
    const product = await getProductCourseById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Get the email template
    const template = await getEmailTemplate("product_delivery");

    // Prepare template variables
    const variables = {
      userName,
      productTitle: product.title,
      downloadLink,
      downloadLimit: product.download_limit,
      accessExpiry: new Date(
        Date.now() + product.access_duration * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      whatIncluded: product.what_included || [],
      instructorName: product.instructor || "AI Academy Team",
      instructorTitle: product.instructor_title || "Course Instructor",
      purchaseDate: new Date().toLocaleDateString(),
    };

    // Replace variables in template
    const subject = replaceTemplateVariables(template.subject, variables);
    const htmlContent = replaceTemplateVariables(
      template.html_content,
      variables
    );
    const textContent = template.text_content
      ? replaceTemplateVariables(template.text_content, variables)
      : "";

    // In a real application, you would send the email using your email service
    // For example, with Resend:
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'AI Academy <noreply@yourdomain.com>',
      to: userEmail,
      subject: subject,
      html: htmlContent,
      text: textContent
    })
    */

    // For this demo, we'll just log the email content
    console.log("=== EMAIL SENT ===");
    console.log("To:", userEmail);
    console.log("Subject:", subject);
    console.log("HTML Content:", htmlContent.substring(0, 200) + "...");
    console.log("==================");

    // Update the purchase record to mark email as sent
    await sql`
      UPDATE product_purchases 
      SET email_sent = true, email_sent_at = NOW()
      WHERE product_course_id = ${productId} AND user_id = (
        SELECT id FROM users WHERE email = ${userEmail} LIMIT 1
      )
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to send product delivery email:", error);
    return { success: false, error: error.message };
  }
}

export async function sendPurchaseConfirmationEmail(
  userEmail: string,
  userName: string,
  productTitle: string,
  purchaseAmount: number
) {
  try {
    // In a real application, you would have a purchase confirmation template
    // For now, we'll use a simple confirmation

    console.log("=== PURCHASE CONFIRMATION EMAIL ===");
    console.log("To:", userEmail);
    console.log("Subject: Purchase Confirmation - " + productTitle);
    console.log("Content: Thank you for your purchase!");
    console.log("===================================");

    return { success: true };
  } catch (error) {
    console.error("Failed to send purchase confirmation email:", error);
    return { success: false, error: error.message };
  }
}
