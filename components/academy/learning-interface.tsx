"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Play,
  Pause,
  FileText,
  HelpCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Download,
  BookOpen,
  AlertTriangle,
} from "lucide-react"
import { updateLessonProgress, saveNote, getNote, submitQuiz, getQuizResponse } from "@/lib/actions/enrollment"

interface LearningInterfaceProps {
  course: any
  courseModules: any[]
  initialLessonId: string | null
  initialModuleIndex: number
  initialLessonIndex: number
  overallProgress: number
  userId: string
}

export default function LearningInterface({
  course,
  courseModules,
  initialLessonId,
  initialModuleIndex,
  initialLessonIndex,
  overallProgress,
  userId,
}: LearningInterfaceProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(initialLessonId)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(initialModuleIndex)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(initialLessonIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lessonProgress, setLessonProgress] = useState(0)
  const [noteText, setNoteText] = useState("")
  const [isNoteSaving, setIsNoteSaving] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitting, setQuizSubmitting] = useState(false)
  const [quizResult, setQuizResult] = useState<{ score: number } | null>(null)
  const [quizError, setQuizError] = useState<string | null>(null)

  // Find current lesson
  const currentLesson = currentLessonId
    ? courseModules.flatMap((module) => module.lessons).find((lesson) => lesson.id === currentLessonId)
    : null

  useEffect(() => {
    // Load note for the current lesson
    const loadNote = async () => {
      if (currentLessonId) {
        try {
          const note = await getNote(currentLessonId)
          if (note) {
            setNoteText(note.content)
          } else {
            setNoteText("")
          }
        } catch (error) {
          console.error("Error loading note:", error)
        }
      }
    }

    // Load quiz response if it's a quiz
    const loadQuizResponse = async () => {
      if (currentLessonId && currentLesson?.type === "quiz") {
        try {
          const response = await getQuizResponse(currentLessonId)
          if (response) {
            setQuizAnswers(response.answers || {})
            if (response.completed) {
              setQuizResult({ score: response.score })
            } else {
              setQuizResult(null)
            }
          } else {
            setQuizAnswers({})
            setQuizResult(null)
          }
        } catch (error) {
          console.error("Error loading quiz response:", error)
        }
      }
    }

    loadNote()
    loadQuizResponse()

    // Reset quiz state when changing lessons
    if (currentLesson?.type !== "quiz") {
      setQuizAnswers({})
      setQuizResult(null)
      setQuizError(null)
    }
  }, [currentLessonId, currentLesson])

  // Navigation functions
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      // Previous lesson in same module
      const prevLesson = courseModules[currentModuleIndex].lessons[currentLessonIndex - 1]
      setCurrentLessonId(prevLesson.id)
      setCurrentLessonIndex(currentLessonIndex - 1)
    } else if (currentModuleIndex > 0) {
      // Last lesson of previous module
      const prevModule = courseModules[currentModuleIndex - 1]
      const lastLessonIndex = prevModule.lessons.length - 1
      setCurrentLessonId(prevModule.lessons[lastLessonIndex].id)
      setCurrentModuleIndex(currentModuleIndex - 1)
      setCurrentLessonIndex(lastLessonIndex)
    }
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < courseModules[currentModuleIndex].lessons.length - 1) {
      // Next lesson in same module
      const nextLesson = courseModules[currentModuleIndex].lessons[currentLessonIndex + 1]
      setCurrentLessonId(nextLesson.id)
      setCurrentLessonIndex(currentLessonIndex + 1)
    } else if (currentModuleIndex < courseModules.length - 1) {
      // First lesson of next module
      const nextModule = courseModules[currentModuleIndex + 1]
      setCurrentLessonId(nextModule.lessons[0].id)
      setCurrentModuleIndex(currentModuleIndex + 1)
      setCurrentLessonIndex(0)
    }
  }

  const markAsComplete = async () => {
    if (!currentLessonId) return

    try {
      setLessonProgress(100)
      await updateLessonProgress(currentLessonId, 100, true)

      // Update the local state to reflect the change
      const updatedModules = [...courseModules]
      updatedModules[currentModuleIndex].lessons[currentLessonIndex].completed = true
      updatedModules[currentModuleIndex].lessons[currentLessonIndex].progress = 100

      // Automatically go to next lesson if available
      if (
        currentLessonIndex < courseModules[currentModuleIndex].lessons.length - 1 ||
        currentModuleIndex < courseModules.length - 1
      ) {
        goToNextLesson()
      }

      router.refresh()
    } catch (error) {
      console.error("Error marking lesson as complete:", error)
    }
  }

  const handleSaveNote = async () => {
    if (!currentLessonId) return

    try {
      setIsNoteSaving(true)
      await saveNote(currentLessonId, noteText)
      setIsNoteSaving(false)
    } catch (error) {
      console.error("Error saving note:", error)
      setIsNoteSaving(false)
    }
  }

  const handleQuizSubmit = async () => {
    if (!currentLessonId) return

    // Validate that all questions are answered
    const questions = document.querySelectorAll("[data-question-id]")
    const questionIds = Array.from(questions).map((q) => q.getAttribute("data-question-id"))

    const unansweredQuestions = questionIds.filter((id) => !quizAnswers[id!])

    if (unansweredQuestions.length > 0) {
      setQuizError("Please answer all questions before submitting.")
      return
    }

    try {
      setQuizSubmitting(true)
      setQuizError(null)

      const result = await submitQuiz(currentLessonId, quizAnswers)

      if (result.success) {
        setQuizResult(result)

        // Update the local state to reflect the lesson as completed
        const updatedModules = [...courseModules]
        updatedModules[currentModuleIndex].lessons[currentLessonIndex].completed = true
        updatedModules[currentModuleIndex].lessons[currentLessonIndex].progress = 100
      }
    } catch (error) {
      console.error("Error submitting quiz:", error)
      setQuizError("Failed to submit quiz. Please try again.")
    } finally {
      setQuizSubmitting(false)
    }
  }

  const handleQuizAnswerChange = (questionId: string, answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleLessonClick = (lessonId: string, moduleIndex: number, lessonIndex: number) => {
    setCurrentLessonId(lessonId)
    setCurrentModuleIndex(moduleIndex)
    setCurrentLessonIndex(lessonIndex)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:z-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Course Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href={`/academy/courses/${course.slug}`}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span>Back to Course</span>
              </Link>
              <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h1>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Course Progress</span>
                <span className="font-medium text-gray-900">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>

          {/* Course Content */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Course Content</h2>
              <div className="space-y-4">
                {courseModules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 font-medium text-gray-900">{module.title}</div>
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          className={`w-full flex justify-between items-center p-3 text-left ${
                            lesson.id === currentLessonId
                              ? "bg-purple-50 text-purple-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => handleLessonClick(lesson.id, moduleIndex, lessonIndex)}
                        >
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : lesson.id === currentLessonId ? (
                              <div className="h-5 w-5 rounded-full bg-purple-700 mr-2"></div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-2"></div>
                            )}
                            <div className="flex items-center">
                              {lesson.type === "video" && <Play className="h-4 w-4 text-gray-500 mr-2" />}
                              {lesson.type === "document" && <FileText className="h-4 w-4 text-gray-500 mr-2" />}
                              {lesson.type === "quiz" && <HelpCircle className="h-4 w-4 text-gray-500 mr-2" />}
                              <span>{lesson.title}</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={goToPreviousLesson}
                disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <span className="text-sm font-medium text-gray-700">
                Lesson {currentLessonIndex + 1} of {courseModules[currentModuleIndex]?.lessons.length || 0}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={goToNextLesson}
                disabled={
                  currentModuleIndex === courseModules.length - 1 &&
                  currentLessonIndex === (courseModules[currentModuleIndex]?.lessons.length || 0) - 1
                }
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentLesson?.type !== "quiz" && (
              <Button
                variant="outline"
                size="sm"
                className="border-purple-700 text-purple-700 hover:bg-purple-50"
                onClick={markAsComplete}
              >
                Mark as Complete
              </Button>
            )}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {currentLesson ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>

                {currentLesson.type === "video" && (
                  <div className="mb-6">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {!isPlaying ? (
                          <button
                            className="bg-white bg-opacity-80 rounded-full p-4 hover:bg-opacity-100 transition-all"
                            onClick={() => setIsPlaying(true)}
                          >
                            <Play className="h-8 w-8 text-purple-700" />
                          </button>
                        ) : (
                          <button
                            className="bg-white bg-opacity-80 rounded-full p-4 hover:bg-opacity-100 transition-all"
                            onClick={() => setIsPlaying(false)}
                          >
                            <Pause className="h-8 w-8 text-purple-700" />
                          </button>
                        )}
                      </div>
                      <Image
                        src="/placeholder-b2qft.png"
                        alt="Video Thumbnail"
                        width={1280}
                        height={720}
                        className={`w-full h-full object-cover ${isPlaying ? "opacity-50" : ""}`}
                      />
                      {isPlaying && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                          <Progress value={lessonProgress} className="h-1 mb-2" />
                          <div className="flex justify-between text-white text-xs">
                            <span>00:15 / 45:00</span>
                            <div className="flex space-x-4">
                              <button>1x</button>
                              <button>HD</button>
                              <button>CC</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentLesson.type === "document" && (
                  <div className="mb-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="prose max-w-none">
                        {currentLesson.content ? (
                          <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                        ) : (
                          <>
                            <h2>Building Your AI Roadmap</h2>
                            <p>
                              An effective AI roadmap is essential for organizations looking to implement AI solutions
                              strategically. This document outlines the key components of a comprehensive AI roadmap and
                              provides a framework for developing your own.
                            </p>
                            <h3>Key Components of an AI Roadmap</h3>
                            <ol>
                              <li>
                                <strong>Current State Assessment</strong>
                                <p>
                                  Begin by assessing your organization's current AI capabilities, including existing
                                  technologies, data infrastructure, and team skills.
                                </p>
                              </li>
                              <li>
                                <strong>Vision and Objectives</strong>
                                <p>
                                  Define clear objectives for your AI initiatives that align with your overall business
                                  strategy.
                                </p>
                              </li>
                              <li>
                                <strong>Use Case Prioritization</strong>
                                <p>
                                  Identify and prioritize AI use cases based on business value, feasibility, and
                                  strategic alignment.
                                </p>
                              </li>
                              <li>
                                <strong>Implementation Timeline</strong>
                                <p>Develop a phased implementation plan with clear milestones and success metrics.</p>
                              </li>
                              <li>
                                <strong>Resource Planning</strong>
                                <p>Determine the resources required, including technology, talent, and budget.</p>
                              </li>
                            </ol>
                            <p>Download the full document and worksheets to start building your AI roadmap today.</p>
                          </>
                        )}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button className="bg-purple-700 hover:bg-purple-800">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {currentLesson.type === "quiz" && (
                  <div className="mb-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Module Assessment</h2>
                      <p className="text-gray-700 mb-6">
                        Complete this assessment to test your understanding of the key concepts covered in this module.
                      </p>

                      {quizResult ? (
                        <div className="mb-6">
                          <Alert
                            className={
                              quizResult.score >= 70 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
                            }
                          >
                            <CheckCircle
                              className={`h-5 w-5 ${quizResult.score >= 70 ? "text-green-500" : "text-amber-500"}`}
                            />
                            <AlertTitle className={quizResult.score >= 70 ? "text-green-700" : "text-amber-700"}>
                              Quiz Completed
                            </AlertTitle>
                            <AlertDescription className={quizResult.score >= 70 ? "text-green-600" : "text-amber-600"}>
                              You scored {quizResult.score}% on this quiz.
                              {quizResult.score >= 70
                                ? " Congratulations on passing the assessment!"
                                : " You need 70% to pass. Consider reviewing the material and trying again."}
                            </AlertDescription>
                          </Alert>

                          <div className="mt-6 flex justify-end space-x-4">
                            <Button
                              variant="outline"
                              className="border-purple-700 text-purple-700"
                              onClick={() => {
                                setQuizResult(null)
                                setQuizAnswers({})
                              }}
                            >
                              Retake Quiz
                            </Button>
                            <Button
                              className="bg-purple-700 hover:bg-purple-800"
                              onClick={goToNextLesson}
                              disabled={
                                currentModuleIndex === courseModules.length - 1 &&
                                currentLessonIndex === (courseModules[currentModuleIndex]?.lessons.length || 0) - 1
                              }
                            >
                              Continue to Next Lesson
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {quizError && (
                            <Alert className="mb-6 bg-red-50 border-red-200">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              <AlertTitle className="text-red-700">Error</AlertTitle>
                              <AlertDescription className="text-red-600">{quizError}</AlertDescription>
                            </Alert>
                          )}

                          <div className="space-y-6">
                            <div className="border border-gray-200 rounded-lg p-4" data-question-id="q1">
                              <h3 className="font-medium text-gray-900 mb-3">
                                1. Which of the following is NOT a key component of an AI roadmap?
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q1-a"
                                    name="q1"
                                    className="mr-2"
                                    checked={quizAnswers.q1 === "a"}
                                    onChange={() => handleQuizAnswerChange("q1", "a")}
                                  />
                                  <label htmlFor="q1-a">Current State Assessment</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q1-b"
                                    name="q1"
                                    className="mr-2"
                                    checked={quizAnswers.q1 === "b"}
                                    onChange={() => handleQuizAnswerChange("q1", "b")}
                                  />
                                  <label htmlFor="q1-b">Vision and Objectives</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q1-c"
                                    name="q1"
                                    className="mr-2"
                                    checked={quizAnswers.q1 === "c"}
                                    onChange={() => handleQuizAnswerChange("q1", "c")}
                                  />
                                  <label htmlFor="q1-c">Competitor Analysis</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q1-d"
                                    name="q1"
                                    className="mr-2"
                                    checked={quizAnswers.q1 === "d"}
                                    onChange={() => handleQuizAnswerChange("q1", "d")}
                                  />
                                  <label htmlFor="q1-d">Implementation Timeline</label>
                                </div>
                              </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4" data-question-id="q2">
                              <h3 className="font-medium text-gray-900 mb-3">
                                2. When prioritizing AI use cases, which factor is most important to consider?
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q2-a"
                                    name="q2"
                                    className="mr-2"
                                    checked={quizAnswers.q2 === "a"}
                                    onChange={() => handleQuizAnswerChange("q2", "a")}
                                  />
                                  <label htmlFor="q2-a">Technical complexity</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q2-b"
                                    name="q2"
                                    className="mr-2"
                                    checked={quizAnswers.q2 === "b"}
                                    onChange={() => handleQuizAnswerChange("q2", "b")}
                                  />
                                  <label htmlFor="q2-b">Business value and strategic alignment</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q2-c"
                                    name="q2"
                                    className="mr-2"
                                    checked={quizAnswers.q2 === "c"}
                                    onChange={() => handleQuizAnswerChange("q2", "c")}
                                  />
                                  <label htmlFor="q2-c">Implementation cost</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q2-d"
                                    name="q2"
                                    className="mr-2"
                                    checked={quizAnswers.q2 === "d"}
                                    onChange={() => handleQuizAnswerChange("q2", "d")}
                                  />
                                  <label htmlFor="q2-d">Time to implement</label>
                                </div>
                              </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4" data-question-id="q3">
                              <h3 className="font-medium text-gray-900 mb-3">
                                3. What is the recommended first step in developing an AI roadmap?
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q3-a"
                                    name="q3"
                                    className="mr-2"
                                    checked={quizAnswers.q3 === "a"}
                                    onChange={() => handleQuizAnswerChange("q3", "a")}
                                  />
                                  <label htmlFor="q3-a">Implementing AI solutions</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q3-b"
                                    name="q3"
                                    className="mr-2"
                                    checked={quizAnswers.q3 === "b"}
                                    onChange={() => handleQuizAnswerChange("q3", "b")}
                                  />
                                  <label htmlFor="q3-b">Hiring AI specialists</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q3-c"
                                    name="q3"
                                    className="mr-2"
                                    checked={quizAnswers.q3 === "c"}
                                    onChange={() => handleQuizAnswerChange("q3", "c")}
                                  />
                                  <label htmlFor="q3-c">Current state assessment</label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="q3-d"
                                    name="q3"
                                    className="mr-2"
                                    checked={quizAnswers.q3 === "d"}
                                    onChange={() => handleQuizAnswerChange("q3", "d")}
                                  />
                                  <label htmlFor="q3-d">Purchasing AI tools</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-end">
                            <Button
                              className="bg-purple-700 hover:bg-purple-800"
                              onClick={handleQuizSubmit}
                              disabled={quizSubmitting}
                            >
                              {quizSubmitting ? "Submitting..." : "Submit Assessment"}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">My Notes</h2>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Take notes on this lesson..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      className="border-purple-700 text-purple-700 hover:bg-purple-50"
                      onClick={handleSaveNote}
                      disabled={isNoteSaving}
                    >
                      {isNoteSaving ? "Saving..." : "Save Notes"}
                    </Button>
                  </div>
                </div>

                {/* Additional Resources */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Resources</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">AI Roadmap Template</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Download this template to start building your own AI roadmap.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-purple-700">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Recommended Reading</h3>
                        <p className="text-sm text-gray-600 mb-1">"AI Transformation Playbook" by Andrew Ng</p>
                        <Button variant="link" className="p-0 h-auto text-purple-700">
                          View Resource
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">Discussion Forum</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Join the discussion on AI roadmap development with your peers.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-purple-700">
                          Visit Forum
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Select a lesson to begin learning.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
