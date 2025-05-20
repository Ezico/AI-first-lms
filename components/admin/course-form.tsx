"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Course } from "@/lib/actions/course-actions"
import { createCourse, updateCourse } from "@/lib/actions/course-actions"
import {
  getModulesForCourse,
  getLessonsForModule,
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/lib/actions/module-actions"
import { toast } from "@/hooks/use-toast"

type CourseFormProps = {
  course?: Course
}

export default function CourseForm({ course }: CourseFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [modules, setModules] = useState<any[]>([])
  const [lessons, setLessons] = useState<Record<number, any[]>>({})
  const [description, setDescription] = useState(course?.description || "")

  // Load modules and lessons if editing an existing course
  useEffect(() => {
    if (course?.id) {
      const loadModules = async () => {
        const moduleData = await getModulesForCourse(course.id)
        setModules(moduleData)

        // Load lessons for each module
        const lessonData: Record<number, any[]> = {}
        for (const module of moduleData) {
          const moduleLessons = await getLessonsForModule(module.id)
          lessonData[module.id] = moduleLessons
        }
        setLessons(lessonData)
      }

      loadModules()
    }
  }, [course?.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Add the rich text description
      formData.set("description", description)

      let result

      if (course?.id) {
        // Update existing course
        result = await updateCourse(course.id, formData)
      } else {
        // Create new course
        result = await createCourse(formData)
      }

      if (result.success) {
        toast({
          title: course?.id ? "Course updated" : "Course created",
          description: course?.id
            ? "The course has been updated successfully."
            : "The course has been created successfully.",
        })

        if (!course?.id && result.courseId) {
          // Redirect to edit page for the new course
          router.push(`/admin/courses/${result.courseId}`)
        } else {
          // Refresh the page to show updated data
          router.refresh()
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddModule = async () => {
    if (!course?.id) {
      toast({
        title: "Save course first",
        description: "Please save the course before adding modules.",
        variant: "destructive",
      })
      return
    }

    try {
      const formData = new FormData()
      formData.set("title", "New Module")
      formData.set("order", (modules.length + 1).toString())
      formData.set("courseId", course.id.toString())

      const result = await createModule(formData)

      if (result.success) {
        toast({
          title: "Module added",
          description: "The module has been added successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Add module error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateModule = async (moduleId: number, title: string, order: number) => {
    if (!course?.id) return

    try {
      const formData = new FormData()
      formData.set("title", title)
      formData.set("order", order.toString())
      formData.set("courseId", course.id.toString())

      const result = await updateModule(moduleId, formData)

      if (result.success) {
        toast({
          title: "Module updated",
          description: "The module has been updated successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Update module error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteModule = async (moduleId: number) => {
    if (!course?.id) return

    if (!confirm("Are you sure you want to delete this module? This will also delete all lessons in this module.")) {
      return
    }

    try {
      const result = await deleteModule(moduleId, course.id)

      if (result.success) {
        toast({
          title: "Module deleted",
          description: "The module has been deleted successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Delete module error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddLesson = async (moduleId: number) => {
    if (!course?.id) return

    try {
      const moduleIndex = modules.findIndex((m) => m.id === moduleId)
      const moduleLessons = lessons[moduleId] || []

      const formData = new FormData()
      formData.set("title", "New Lesson")
      formData.set("type", "video")
      formData.set("content", "")
      formData.set("duration", "30 min")
      formData.set("order", (moduleLessons.length + 1).toString())
      formData.set("moduleId", moduleId.toString())
      formData.set("courseId", course.id.toString())

      const result = await createLesson(formData)

      if (result.success) {
        toast({
          title: "Lesson added",
          description: "The lesson has been added successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Add lesson error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateLesson = async (lessonId: number, moduleId: number, data: any) => {
    if (!course?.id) return

    try {
      const formData = new FormData()
      formData.set("title", data.title)
      formData.set("type", data.type)
      formData.set("content", data.content)
      formData.set("duration", data.duration)
      formData.set("order", data.order.toString())
      formData.set("moduleId", moduleId.toString())
      formData.set("courseId", course.id.toString())

      const result = await updateLesson(lessonId, formData)

      if (result.success) {
        toast({
          title: "Lesson updated",
          description: "The lesson has been updated successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Update lesson error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteLesson = async (lessonId: number) => {
    if (!course?.id) return

    if (!confirm("Are you sure you want to delete this lesson?")) {
      return
    }

    try {
      const result = await deleteLesson(lessonId, course.id)

      if (result.success) {
        toast({
          title: "Lesson deleted",
          description: "The lesson has been deleted successfully.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Delete lesson error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content" disabled={!course?.id}>
            Course Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" defaultValue={course?.title || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={course?.slug || ""} required />
              <p className="text-xs text-gray-500">URL-friendly name (e.g., "ai-leadership")</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select name="level" defaultValue={course?.level || "beginner"}>
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
                defaultValue={course?.duration || ""}
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
                defaultValue={course?.price || ""}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor Name</Label>
              <Input id="instructor" name="instructor" defaultValue={course?.instructor || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor_title">Instructor Title</Label>
              <Input
                id="instructor_title"
                name="instructor_title"
                defaultValue={course?.instructor_title || ""}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instructor_image">Instructor Image URL</Label>
              <Input id="instructor_image" name="instructor_image" defaultValue={course?.instructor_image || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Course Image URL</Label>
              <Input id="image" name="image" defaultValue={course?.image || ""} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={course?.category || "leadership"}>
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
                defaultValue={course?.topics || ""}
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" name="featured" defaultChecked={course?.featured || false} />
              <Label htmlFor="featured">Featured Course</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="published" name="published" defaultChecked={course?.published || false} />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : course?.id ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Course Modules</h2>
            <Button type="button" className="bg-purple-700 hover:bg-purple-800" onClick={handleAddModule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>

          {modules.length > 0 ? (
            <div className="space-y-6">
              {modules.map((module, index) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 font-medium">Module {index + 1}:</span>
                        <input
                          type="text"
                          className="font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                          value={module.title}
                          onChange={(e) => {
                            const updatedModules = [...modules]
                            updatedModules[index].title = e.target.value
                            setModules(updatedModules)
                          }}
                          onBlur={() => handleUpdateModule(module.id, module.title, module.order)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteModule(module.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Lessons</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => handleAddLesson(module.id)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>

                      {lessons[module.id]?.length > 0 ? (
                        <div className="space-y-2">
                          {lessons[module.id].map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-500 text-sm">{lessonIndex + 1}.</span>
                                  <input
                                    type="text"
                                    className="font-medium bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full"
                                    value={lesson.title}
                                    onChange={(e) => {
                                      const updatedLessons = { ...lessons }
                                      updatedLessons[module.id][lessonIndex].title = e.target.value
                                      setLessons(updatedLessons)
                                    }}
                                    onBlur={() =>
                                      handleUpdateLesson(lesson.id, module.id, lessons[module.id][lessonIndex])
                                    }
                                  />
                                </div>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Select
                                    value={lesson.type}
                                    onValueChange={(value) => {
                                      const updatedLessons = { ...lessons }
                                      updatedLessons[module.id][lessonIndex].type = value
                                      setLessons(updatedLessons)
                                      handleUpdateLesson(lesson.id, module.id, {
                                        ...lessons[module.id][lessonIndex],
                                        type: value,
                                      })
                                    }}
                                  >
                                    <SelectTrigger className="h-6 text-xs border-none bg-transparent">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="document">Document</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <span className="mx-2">•</span>
                                  <input
                                    type="text"
                                    className="text-xs bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-20"
                                    value={lesson.duration}
                                    onChange={(e) => {
                                      const updatedLessons = { ...lessons }
                                      updatedLessons[module.id][lessonIndex].duration = e.target.value
                                      setLessons(updatedLessons)
                                    }}
                                    onBlur={() =>
                                      handleUpdateLesson(lesson.id, module.id, lessons[module.id][lessonIndex])
                                    }
                                    placeholder="Duration"
                                  />
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => handleDeleteLesson(lesson.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No lessons yet. Add your first lesson!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-gray-500 mb-4">No modules yet. Add your first module to get started!</p>
              <Button type="button" className="bg-purple-700 hover:bg-purple-800" onClick={handleAddModule}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Module
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </form>
  )
}
