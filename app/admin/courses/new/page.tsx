"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createCourse } from "@/lib/actions/course-actions";

export default function NewCoursePage() {
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
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCourse} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" name="title" required />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" required />
                <p className="text-xs text-gray-500">URL-friendly name (e.g., "ai-leadership")</p>
              </div> */}
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
                <Input id="slug" name="slug" required />
                <p className="text-xs text-gray-500">
                  URL-friendly name (e.g., "ai-leadership")
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select name="level" defaultValue="beginner">
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 4 weeks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor Name</Label>
                <Input id="instructor" name="instructor" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor_title">Instructor Title</Label>
                <Input id="instructor_title" name="instructor_title" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="instructor_image">Instructor Image URL</Label>
                <Input
                  id="instructor_image"
                  name="instructor_image"
                  defaultValue="/professional-headshot.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Course Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue="/ai-leadership-course.png"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="leadership">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="ethics">Ethics</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topics">Topics (comma separated)</Label>
                <Input
                  id="topics"
                  name="topics"
                  placeholder="AI, Leadership, Strategy"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" name="featured" />
                <Label htmlFor="featured">Featured Course</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="published" name="published" />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/courses">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800"
              >
                Create Course
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
