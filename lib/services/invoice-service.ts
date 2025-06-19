import { neon } from "@neondatabase/serverless";
// import { sendEmail } from "./email-service";

const sql = neon(process.env.DATABASE_URL!);

export interface CreateInvoiceParams {
  userId: number;
  paymentId?: number;
  amount: number;
  taxAmount?: number;
  courseId?: number;
  productCourseId?: number;
  dueDate?: Date;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  courseId?: number;
  productCourseId?: number;
}

export class InvoiceService {
  // Generate unique invoice number
  static async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");

    // Get the next sequence number for this month
    const result = await sql`
      SELECT COUNT(*) as count FROM invoices 
      WHERE invoice_number LIKE ${`INV-${year}${month}-%`}
    `;

    const sequence = (Number.parseInt(result[0].count) + 1)
      .toString()
      .padStart(4, "0");
    return `INV-${year}${month}-${sequence}`;
  }

  // Create invoice
  static async createInvoice(
    params: CreateInvoiceParams,
    lineItems: InvoiceLineItem[]
  ): Promise<number> {
    try {
      const invoiceNumber = await this.generateInvoiceNumber();
      const totalAmount = params.amount + (params.taxAmount || 0);
      const dueDate =
        params.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

      // Create invoice
      const invoiceResult = await sql`
        INSERT INTO invoices (
          invoice_number, user_id, payment_id, amount, tax_amount, total_amount,
          status, due_date, invoice_data
        ) VALUES (
          ${invoiceNumber}, ${params.userId}, ${params.paymentId || null}, 
          ${params.amount}, ${params.taxAmount || 0}, ${totalAmount},
          'draft', ${dueDate}, ${JSON.stringify({
            createdAt: new Date().toISOString(),
            courseId: params.courseId,
            productCourseId: params.productCourseId,
          })}
        ) RETURNING id
      `;

      const invoiceId = invoiceResult[0].id;

      // Create line items
      for (const item of lineItems) {
        await sql`
          INSERT INTO invoice_line_items (
            invoice_id, description, quantity, unit_price, total_price,
            course_id, product_course_id
          ) VALUES (
            ${invoiceId}, ${item.description}, ${item.quantity}, ${item.unitPrice},
            ${item.quantity * item.unitPrice}, ${item.courseId || null}, ${item.productCourseId || null}
          )
        `;
      }

      return invoiceId;
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw new Error("Failed to create invoice");
    }
  }

  // Mark invoice as paid
  static async markInvoiceAsPaid(
    invoiceId: number,
    paymentId?: number
  ): Promise<void> {
    try {
      await sql`
        UPDATE invoices SET 
          status = 'paid', 
          paid_at = NOW(),
          payment_id = COALESCE(${paymentId || null}, payment_id),
          updated_at = NOW()
        WHERE id = ${invoiceId}
      `;
    } catch (error) {
      console.error("Error marking invoice as paid:", error);
      throw new Error("Failed to update invoice status");
    }
  }

  // Get invoice by ID
  static async getInvoiceById(invoiceId: number) {
    try {
      const invoices = await sql`
        SELECT i.*, u.name as user_name, u.email as user_email
        FROM invoices i
        JOIN users u ON i.user_id = u.id
        WHERE i.id = ${invoiceId}
        LIMIT 1
      `;

      if (invoices.length === 0) {
        return null;
      }

      const invoice = invoices[0];

      // Get line items
      const lineItems = await sql`
        SELECT * FROM invoice_line_items WHERE invoice_id = ${invoiceId}
        ORDER BY id
      `;

      return {
        ...invoice,
        lineItems,
      };
    } catch (error) {
      console.error("Error getting invoice:", error);
      return null;
    }
  }

  // Get invoices for user
  static async getUserInvoices(userId: number) {
    try {
      const invoices = await sql`
        SELECT i.*, 
          COALESCE(c.title, pc.title) as course_title
        FROM invoices i
        LEFT JOIN invoice_line_items ili ON i.id = ili.invoice_id
        LEFT JOIN courses c ON ili.course_id = c.id
        LEFT JOIN product_courses pc ON ili.product_course_id = pc.id
        WHERE i.user_id = ${userId}
        ORDER BY i.created_at DESC
      `;

      return invoices;
    } catch (error) {
      console.error("Error getting user invoices:", error);
      return [];
    }
  }

  // Send invoice email
  static async sendInvoiceEmail(invoiceId: number): Promise<void> {
    try {
      const invoice = await this.getInvoiceById(invoiceId);
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // Get course information
      let courseName = "Course";
      if (invoice.lineItems.length > 0) {
        const lineItem = invoice.lineItems[0];
        if (lineItem.course_id) {
          const courses =
            await sql`SELECT title FROM courses WHERE id = ${lineItem.course_id} LIMIT 1`;
          courseName = courses[0]?.title || courseName;
        } else if (lineItem.product_course_id) {
          const products =
            await sql`SELECT title FROM product_courses WHERE id = ${lineItem.product_course_id} LIMIT 1`;
          courseName = products[0]?.title || courseName;
        }
      }

      const variables = {
        userName: invoice.user_name,
        invoiceNumber: invoice.invoice_number,
        courseName,
        amount: invoice.total_amount.toFixed(2),
        dueDate: new Date(invoice.due_date).toLocaleDateString(),
        invoiceUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/${invoice.id}`,
      };

      // await sendEmail({
      //   to: invoice.user_email,
      //   templateType: "invoice_generated",
      //   variables,
      // });

      // Update invoice status
      await sql`
        UPDATE invoices SET status = 'sent', updated_at = NOW() WHERE id = ${invoiceId}
      `;
    } catch (error) {
      console.error("Error sending invoice email:", error);
      throw new Error("Failed to send invoice email");
    }
  }
}
