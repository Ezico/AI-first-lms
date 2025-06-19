"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
// import {
//   createProductCourse,
//   updateProductCourse,
//   type ProductCourse,
// } from "@/lib/actions/product-course-actions";

export default function ProductCourseForm() {
  const [form, setForm] = useState({
    title: "",
    instructorName: "",
    duration: "",
    level: "",
    slug: "",
    description: "",
    price: "",
    instructorImageUrl: "",
    imageUrl: "",
    fileUrl: "",
    featured: false,
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/simple-courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Simple course created!");
      setForm({
        title: "",
        instructorName: "",
        duration: "",
        level: "",
        slug: "",
        description: "",
        price: "",
        instructorImageUrl: "",
        imageUrl: "",
        fileUrl: "",
        featured: false,
      });
    } else {
      alert("Error creating course.");
    }

    console.log(form);
  };
  const handleSlugGeneration = () => {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const title = titleInput.value;
    const slugInput = document.getElementById("slug") as HTMLInputElement;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    slugInput.value = slug;
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 mt-3">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                name="title"
                onChange={handleChange}
                defaultValue={form?.title || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="slug">Slug</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSlugGeneration}
                  className="text-xs"
                >
                  Generate from Title
                </Button>
              </div>
              <Input
                defaultValue={form?.slug}
                onChange={handleChange}
                id="slug"
                name="slug"
                required
              />
              <p className="text-xs text-gray-500">
                URL-friendly name (e.g., "ai-leadership")
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              onChange={handleChange}
              defaultValue={form?.description || ""}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing & Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                onChange={handleChange}
                defaultValue={form?.price || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                onChange={handleChange}
                defaultValue={form?.imageUrl || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileUrl">File URL</Label>
              <Input
                id="fileUrl"
                name="fileUrl"
                onChange={handleChange}
                defaultValue={form?.fileUrl || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g. 2 hours, 3 weeks"
                onChange={handleChange}
                defaultValue={form?.duration || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructorName">Instructor Name</Label>
              <Input
                id="instructorName"
                name="instructorName"
                onChange={handleChange}
                defaultValue={form?.instructorName || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorImageUrl">Instructor Image URL</Label>
              <Input
                id="instructorImageUrl"
                name="instructorImageUrl"
                onChange={handleChange}
                defaultValue={form?.instructorImageUrl || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" name="featured" />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/product-courses")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
