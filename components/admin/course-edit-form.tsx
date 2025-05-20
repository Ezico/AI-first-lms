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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit } from "lucide-react"
import { type Course, updateCourse } from "@/lib/actions/course-actions"
import {
  getModulesForCourse,
  getLessonsForModule,
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
  type Module,
  type Lesson,
} from "@/lib/actions/module-actions"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type CourseEditFormProps = {
  course: Course
}

export default function CourseEditForm({ course }: CourseEditFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [modules, setModules] = useState<Module[]>([])
  const [lessons, setLessons] = useState<Record<number, Lesson[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAddingModule, setIsAddingModule] = useState(false)
  const [newModuleTitle, setNewModuleTitle] = useState("")
  const [isAddingLesson, setIsAddingLesson] = useState<number | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: "video",
    content: "",
    duration: "30 min",
  })
  const [editingLesson, setEditingLesson] = useState<{
    id: number
    moduleId: number
    data: {
      title: string
      type: string
      content: string
      duration: string
    }
  } | null>(null)

  // Load modules and lessons
  useEffect(() => {
    const loadModulesAndLessons = async () => {
      const moduleData = await getModulesForCourse(course.id)
      setModules(moduleData)

      // Load lessons for each module
      const lessonData: Record<number, Lesson[]> = {}
      for (const module of moduleData) {
        const moduleLessons = await getLessonsForModule(module.id)
        lessonData[module.id] = moduleLessons
      }
      setLessons(lessonData)
    }

    loadModulesAndLessons()
  }, [course.id])

  const handleUpdateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateCourse(course.id, formData)

      if (result.success) {
        toast({
          title: "Course updated",
          description: "The course has been updated successfully.",
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
    if (!newModuleTitle.trim()) {
      toast({
        title: "Module title required",
        description: "Please enter a title for the module.",
        variant: "destructive",
      })
      return
    }

    setIsAddingModule(true)

    try {
      const formData = new FormData()
      formData.set("title", newModuleTitle)
      formData.set("order", (modules.length + 1).toString())
      formData.set("courseId", course.id.toString())

      const result = await createModule(formData)

      if (result.success) {
        toast({
          title: "Module added",
          description: "The module has been added successfully.",
        })

        // Refresh modules
        const updatedModules = await getModulesForCourse(course.id)
        setModules(updatedModules)

        // Reset form
        setNewModuleTitle("")
        setIsAddingModule(false)
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
    } finally {
      setIsAddingModule(false)
    }
  }

  const handleUpdateModule = async (moduleId: number, title: string) => {
    try {
      const module = modules.find((m) => m.id === moduleId)
      if (!module) return

      const formData = new FormData()
      formData.set("title", title)
      formData.set("order", module.order.toString())
      formData.set("courseId", course.id.toString())

      const result = await updateModule(moduleId, formData)

      if (result.success) {
        toast({
          title: "Module updated",
          description: "The module has been updated successfully.",
        })

        // Update local state
        setModules(modules.map((m) => (m.id === moduleId ? { ...m, title } : m)))
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

        // Update local state
        setModules(modules.filter((m) => m.id !== moduleId))

        // Remove lessons for this module
        const updatedLessons = { ...lessons }
        delete updatedLessons[moduleId]
        setLessons(updatedLessons)
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
    if (!newLesson.title.trim()) {
      toast({
        title: "Lesson title required",
        description: "Please enter a title for the lesson.",
        variant: "destructive",
      })
      return
    }

    try {
      const moduleLessons = lessons[moduleId] || []

      const formData = new FormData()
      formData.set("title", newLesson.title)
      formData.set("type", newLesson.type)
      formData.set("content", newLesson.content)
      formData.set("duration", newLesson.duration)
      formData.set("order", (moduleLessons.length + 1).toString())
      formData.set("moduleId", moduleId.toString())
      formData.set("courseId", course.id.toString())

      const result = await createLesson(formData)

      if (result.success) {
        toast({
          title: "Lesson added",
          description: "The lesson has been added successfully.",
        })

        // Refresh lessons for this module
        const updatedLessons = await getLessonsForModule(moduleId)
        setLessons({
          ...lessons,
          [moduleId]: updatedLessons,
        })

        // Reset form
        setNewLesson({
          title: "",
          type: "video",
          content: "",
          duration: "30 min",
        })
        setIsAddingLesson(null)
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

  const handleUpdateLesson = async () => {
    if (!editingLesson) return

    try {
      const { id, moduleId, data } = editingLesson
      const lesson = lessons[moduleId]?.find((l) => l.id === id)
      if (!lesson) return

      const formData = new FormData()
      formData.set("title", data.title)
      formData.set("type", data.type)
      formData.set("content", data.content)
      formData.set("duration", data.duration)
      formData.set("order", lesson.order.toString())
      formData.set("moduleId", moduleId.toString())
      formData.set("courseId", course.id.toString())

      const result = await updateLesson(id, formData)

      if (result.success) {
        toast({
          title: "Lesson updated",
          description: "The lesson has been updated successfully.",
        })

        // Update local state
        setLessons({
          ...lessons,
          [moduleId]: lessons[moduleId].map((l) => (l.id === id ? { ...l, ...data } : l)),
        })

        // Reset form
        setEditingLesson(null)
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

  const handleDeleteLesson = async (lessonId: number, moduleId: number) => {
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

        // Update local state
        setLessons({
          ...lessons,
          [moduleId]: lessons[moduleId].filter((l) => l.id !== lessonId),
        })
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
    <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="details">Course Details</TabsTrigger>
        <TabsTrigger value="content">Course Content</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateCourse} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" name="title" defaultValue={course.title} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" defaultValue={course.slug} required />
                  <p className="text-xs text-gray-500">URL-friendly name (e.g., "ai-leadership")</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={6} defaultValue={course.description} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select name="level" defaultValue={course.level}>
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
                  <Input id="duration" name="duration" defaultValue={course.duration} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={course.price}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor Name</Label>
                  <Input id="instructor" name="instructor" defaultValue={course.instructor} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor_title">Instructor Title</Label>
                  <Input
                    id="instructor_title"
                    name="instructor_title"
                    defaultValue={course.instructor_title}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instructor_image">Instructor Image URL</Label>
                  <Input id="instructor_image" name="instructor_image" defaultValue={course.instructor_image} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Course Image URL</Label>
                  <Input id="image" name="image" defaultValue={course.image} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={course.category}>
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
                  <Input id="topics" name="topics" defaultValue={course.topics} required />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" name="featured" defaultChecked={course.featured} />
                  <Label htmlFor="featured">Featured Course</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="published" name="published" defaultChecked={course.published} />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course Modules</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="New module title"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="w-64"
                />
                <Button
                  onClick={handleAddModule}
                  disabled={isAddingModule || !newModuleTitle.trim()}
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {modules.length > 0 ? (
                modules.map((module, index) => (
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
                            onBlur={() => handleUpdateModule(module.id, module.title)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setIsAddingLesson(module.id)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Lesson
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Lesson</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="lesson-title">Lesson Title</Label>
                                  <Input
                                    id="lesson-title"
                                    value={newLesson.title}
                                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                    placeholder="Enter lesson title"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lesson-type">Lesson Type</Label>
                                  <Select
                                    value={newLesson.type}
                                    onValueChange={(value) => setNewLesson({ ...newLesson, type: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="document">Document</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lesson-content">Content</Label>
                                  <Textarea
                                    id="lesson-content"
                                    value={newLesson.content}
                                    onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                                    placeholder="Enter lesson content or URL"
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lesson-duration">Duration</Label>
                                  <Input
                                    id="lesson-duration"
                                    value={newLesson.duration}
                                    onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                    placeholder="e.g., 30 min"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setNewLesson({
                                        title: "",
                                        type: "video",
                                        content: "",
                                        duration: "30 min",
                                      })
                                      setIsAddingLesson(null)
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleAddLesson(module.id)}
                                    disabled={!newLesson.title.trim()}
                                    className="bg-purple-700 hover:bg-purple-800"
                                  >
                                    Add Lesson
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {lessons[module.id]?.length > 0 ? (
                          <div className="space-y-2">
                            {lessons[module.id].map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium">
                                    {lessonIndex + 1}. {lesson.title}
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <span className="capitalize">{lesson.type}</span>
                                    <span className="mx-2">•</span>
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          setEditingLesson({
                                            id: lesson.id,
                                            moduleId: module.id,
                                            data: {
                                              title: lesson.title,
                                              type: lesson.type,
                                              content: lesson.content,
                                              duration: lesson.duration,
                                            },
                                          })
                                        }
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Lesson</DialogTitle>
                                      </DialogHeader>
                                      {editingLesson && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-lesson-title">Lesson Title</Label>
                                            <Input
                                              id="edit-lesson-title"
                                              value={editingLesson.data.title}
                                              onChange={(e) =>
                                                setEditingLesson({
                                                  ...editingLesson,
                                                  data: { ...editingLesson.data, title: e.target.value },
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-lesson-type">Lesson Type</Label>
                                            <Select
                                              value={editingLesson.data.type}
                                              onValueChange={(value) =>
                                                setEditingLesson({
                                                  ...editingLesson,
                                                  data: { ...editingLesson.data, type: value },
                                                })
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="video">Video</SelectItem>
                                                <SelectItem value="document">Document</SelectItem>
                                                <SelectItem value="quiz">Quiz</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-lesson-content">Content</Label>
                                            <Textarea
                                              id="edit-lesson-content"
                                              value={editingLesson.data.content}
                                              onChange={(e) =>
                                                setEditingLesson({
                                                  ...editingLesson,
                                                  data: { ...editingLesson.data, content: e.target.value },
                                                })
                                              }
                                              rows={4}
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-lesson-duration">Duration</Label>
                                            <Input
                                              id="edit-lesson-duration"
                                              value={editingLesson.data.duration}
                                              onChange={(e) =>
                                                setEditingLesson({
                                                  ...editingLesson,
                                                  data: { ...editingLesson.data, duration: e.target.value },
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="flex justify-end space-x-2 pt-4">
                                            <Button variant="outline" onClick={() => setEditingLesson(null)}>
                                              Cancel
                                            </Button>
                                            <Button
                                              onClick={handleUpdateLesson}
                                              disabled={!editingLesson.data.title.trim()}
                                              className="bg-purple-700 hover:bg-purple-800"
                                            >
                                              Save Changes
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleDeleteLesson(lesson.id, module.id)}
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
                ))
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <p className="text-gray-500 mb-4">No modules yet. Add your first module to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
