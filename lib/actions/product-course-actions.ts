"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import getServerUser from "./getUserFunction";

const sql = neon(process.env.DATABASE_URL!);

export type ProductCourse = {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  original_price?: number;
  product_type: string;
  status: string;
  featured: boolean;
  image?: string;
  gallery?: string[];
  features?: string[];
  requirements?: string[];
  what_included?: string[];
  instructor?: string;
  instructor_title?: string;
  instructor_image?: string;
  tags?: string[];
  category?: string;
  difficulty_level?: string;
  estimated_time?: string;
  file_size?: string;
  file_format?: string;
  download_limit: number;
  access_duration: number;
  created_at?: string;
  updated_at?: string;
};

export type ProductPurchase = {
  id: number;
  user_id: number;
  product_course_id: number;
  purchase_price: number;
  payment_intent_id?: string;
  payment_status: string;
  email_sent: boolean;
  email_sent_at?: string;
  download_count: number;
  access_expires_at?: string;
  purchased_at: string;
};

export async function getAllProductCourses() {
  try {
    const products = await sql<ProductCourse[]>`
      SELECT * FROM product_courses 
      WHERE status = 'published'
      ORDER BY featured DESC, created_at DESC
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch product courses:", error);
    return [];
  }
}

export async function getFeaturedProductCourses() {
  try {
    const products = await sql<ProductCourse[]>`
      SELECT * FROM product_courses 
      WHERE status = 'published' AND featured = true
      ORDER BY created_at DESC
      LIMIT 6
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch featured product courses:", error);
    return [];
  }
}

export async function getProductCourseBySlug(slug: string) {
  try {
    const products = await sql<ProductCourse[]>`
      SELECT * FROM product_courses 
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `;

    if (products.length === 0) {
      return null;
    }

    return products[0];
  } catch (error) {
    console.error(`Failed to fetch product course with slug ${slug}:`, error);
    return null;
  }
}

export async function getProductCourseById(id: number) {
  try {
    const products = await sql<ProductCourse[]>`
      SELECT * FROM product_courses 
      WHERE id = ${id}
      LIMIT 1
    `;

    if (products.length === 0) {
      return null;
    }

    return products[0];
  } catch (error) {
    console.error(`Failed to fetch product course with id ${id}:`, error);
    return null;
  }
}

export async function getAllProductCoursesAdmin() {
  try {
    const products = await sql<ProductCourse[]>`
      SELECT * FROM product_courses 
      ORDER BY created_at DESC
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch product courses for admin:", error);
    return [];
  }
}

export async function createProductCourse(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const short_description = formData.get("short_description") as string;
    const price = Number.parseFloat(formData.get("price") as string);
    const original_price = formData.get("original_price")
      ? Number.parseFloat(formData.get("original_price") as string)
      : null;
    const product_type =
      (formData.get("product_type") as string) || "digital_download";
    const status = (formData.get("status") as string) || "draft";
    const featured = formData.get("featured") === "on";
    const image = formData.get("image") as string;
    const instructor = formData.get("instructor") as string;
    const instructor_title = formData.get("instructor_title") as string;
    const instructor_image = formData.get("instructor_image") as string;
    const category = formData.get("category") as string;
    const difficulty_level = formData.get("difficulty_level") as string;
    const estimated_time = formData.get("estimated_time") as string;
    const file_size = formData.get("file_size") as string;
    const file_format = formData.get("file_format") as string;
    const download_limit =
      Number.parseInt(formData.get("download_limit") as string) || 3;
    const access_duration =
      Number.parseInt(formData.get("access_duration") as string) || 365;

    // Parse arrays from form data
    const features = formData.get("features")
      ? (formData.get("features") as string).split("\n").filter((f) => f.trim())
      : [];
    const requirements = formData.get("requirements")
      ? (formData.get("requirements") as string)
          .split("\n")
          .filter((r) => r.trim())
      : [];
    const what_included = formData.get("what_included")
      ? (formData.get("what_included") as string)
          .split("\n")
          .filter((w) => w.trim())
      : [];
    const tags = formData.get("tags")
      ? (formData.get("tags") as string)
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];

    const result = await sql`
      INSERT INTO product_courses (
        title, slug, description, short_description, price, original_price,
        product_type, status, featured, image, features, requirements, 
        what_included, instructor, instructor_title, instructor_image,
        tags, category, difficulty_level, estimated_time, file_size,
        file_format, download_limit, access_duration, created_at, updated_at
      ) VALUES (
        ${title}, ${slug}, ${description}, ${short_description}, ${price}, ${original_price},
        ${product_type}, ${status}, ${featured}, ${image}, ${features}, ${requirements},
        ${what_included}, ${instructor}, ${instructor_title}, ${instructor_image},
        ${tags}, ${category}, ${difficulty_level}, ${estimated_time}, ${file_size},
        ${file_format}, ${download_limit}, ${access_duration}, NOW(), NOW()
      ) RETURNING id
    `;

    const productId = result[0].id;

    revalidatePath("/admin/product-courses");
    revalidatePath("/products");

    return { success: true, productId };
  } catch (error) {
    console.error("Failed to create product course:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProductCourse(
  productId: number,
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const short_description = formData.get("short_description") as string;
    const price = Number.parseFloat(formData.get("price") as string);
    const original_price = formData.get("original_price")
      ? Number.parseFloat(formData.get("original_price") as string)
      : null;
    const product_type = formData.get("product_type") as string;
    const status = formData.get("status") as string;
    const featured = formData.get("featured") === "on";
    const image = formData.get("image") as string;
    const instructor = formData.get("instructor") as string;
    const instructor_title = formData.get("instructor_title") as string;
    const instructor_image = formData.get("instructor_image") as string;
    const category = formData.get("category") as string;
    const difficulty_level = formData.get("difficulty_level") as string;
    const estimated_time = formData.get("estimated_time") as string;
    const file_size = formData.get("file_size") as string;
    const file_format = formData.get("file_format") as string;
    const download_limit = Number.parseInt(
      formData.get("download_limit") as string
    );
    const access_duration = Number.parseInt(
      formData.get("access_duration") as string
    );

    // Parse arrays from form data
    const features = formData.get("features")
      ? (formData.get("features") as string).split("\n").filter((f) => f.trim())
      : [];
    const requirements = formData.get("requirements")
      ? (formData.get("requirements") as string)
          .split("\n")
          .filter((r) => r.trim())
      : [];
    const what_included = formData.get("what_included")
      ? (formData.get("what_included") as string)
          .split("\n")
          .filter((w) => w.trim())
      : [];
    const tags = formData.get("tags")
      ? (formData.get("tags") as string)
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];

    await sql`
      UPDATE product_courses SET
        title = ${title},
        slug = ${slug},
        description = ${description},
        short_description = ${short_description},
        price = ${price},
        original_price = ${original_price},
        product_type = ${product_type},
        status = ${status},
        featured = ${featured},
        image = ${image},
        features = ${features},
        requirements = ${requirements},
        what_included = ${what_included},
        instructor = ${instructor},
        instructor_title = ${instructor_title},
        instructor_image = ${instructor_image},
        tags = ${tags},
        category = ${category},
        difficulty_level = ${difficulty_level},
        estimated_time = ${estimated_time},
        file_size = ${file_size},
        file_format = ${file_format},
        download_limit = ${download_limit},
        access_duration = ${access_duration},
        updated_at = NOW()
      WHERE id = ${productId}
    `;

    revalidatePath("/admin/product-courses");
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);

    return { success: true };
  } catch (error) {
    console.error(
      `Failed to update product course with id ${productId}:`,
      error
    );
    return { success: false, error: error.message };
  }
}

export async function deleteProductCourse(productId: number) {
  try {
    // Delete associated files first
    await sql`DELETE FROM product_files WHERE product_course_id = ${productId}`;

    // Delete the product course
    await sql`DELETE FROM product_courses WHERE id = ${productId}`;

    revalidatePath("/admin/product-courses");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error(
      `Failed to delete product course with id ${productId}:`,
      error
    );
    return { success: false, error: error.message };
  }
}

export async function getUserProductPurchases() {
  const user = getServerUser();

  if (!user) {
    return [];
  }

  try {
    const purchases = await sql`
      SELECT 
        pp.*,
        pc.title,
        pc.slug,
        pc.image,
        pc.instructor,
        pc.file_format,
        pc.file_size
      FROM product_purchases pp
      JOIN product_courses pc ON pp.product_course_id = pc.id
      WHERE pp.user_id = ${user.id} AND pp.payment_status = 'completed'
      ORDER BY pp.purchased_at DESC
    `;

    return purchases;
  } catch (error) {
    console.error("Failed to fetch user product purchases:", error);
    return [];
  }
}

export async function hasUserPurchasedProduct(productId: number) {
  const user = getServerUser();

  if (!user) {
    return false;
  }

  try {
    const purchases = await sql`
      SELECT COUNT(*) as count
      FROM product_purchases
      WHERE user_id = ${user.id} AND product_course_id = ${productId} AND payment_status = 'completed'
    `;

    return purchases[0].count > 0;
  } catch (error) {
    console.error("Failed to check product purchase:", error);
    return false;
  }
}
