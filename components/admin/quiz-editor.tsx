"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getQuizQuestions,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  createQuizAnswer,
  updateQuizAnswer,
  deleteQuizAnswer,
  type QuizQuestion,
} from "@/lib/actions/quiz-actions";

type QuizEditorProps = {
  lessonId: number;
  courseId: number;
};

export default function QuizEditor({ lessonId, courseId }: QuizEditorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    explanation: "",
  });
  const [editingQuestion, setEditingQuestion] = useState<{
    id: number;
    data: {
      questionText: string;
      explanation: string;
    };
  } | null>(null);
  const [newAnswer, setNewAnswer] = useState({
    answerText: "",
    isCorrect: false,
  });
  const [editingAnswer, setEditingAnswer] = useState<{
    id: number;
    questionId: number;
    data: {
      answerText: string;
      isCorrect: boolean;
    };
  } | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  // Load quiz questions and answers
  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      try {
        const questionData = await getQuizQuestions(lessonId);
        setQuestions(questionData);
        if (questionData.length > 0 && !activeQuestionId) {
          setActiveQuestionId(questionData[0].id);
        }
      } catch (error) {
        console.error("Error loading quiz data:", error);
        toast({
          title: "Error",
          description: "Failed to load quiz questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [lessonId, activeQuestionId]);

  const handleAddQuestion = async () => {
    if (!newQuestion.questionText.trim()) {
      toast({
        title: "Question text required",
        description: "Please enter text for the question.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.set("lessonId", lessonId.toString());
      formData.set("questionText", newQuestion.questionText);
      formData.set("explanation", newQuestion.explanation);
      formData.set("courseId", courseId.toString());

      const result = await createQuizQuestion(formData);

      if (result.success) {
        toast({
          title: "Question added",
          description: "The question has been added successfully.",
        });

        // Refresh questions
        const updatedQuestions = await getQuizQuestions(lessonId);
        setQuestions(updatedQuestions);

        // Set the new question as active
        if (result.questionId) {
          setActiveQuestionId(result.questionId);
        }

        // Reset form
        setNewQuestion({
          questionText: "",
          explanation: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Add question error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuestion) return;

    if (!editingQuestion.data.questionText.trim()) {
      toast({
        title: "Question text required",
        description: "Please enter text for the question.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.set("questionText", editingQuestion.data.questionText);
      formData.set("explanation", editingQuestion.data.explanation);
      formData.set("courseId", courseId.toString());

      const result = await updateQuizQuestion(editingQuestion.id, formData);

      if (result.success) {
        toast({
          title: "Question updated",
          description: "The question has been updated successfully.",
        });

        // Update local state
        setQuestions(
          questions.map((q) =>
            q.id === editingQuestion.id
              ? {
                  ...q,
                  question_text: editingQuestion.data.questionText,
                  explanation: editingQuestion.data.explanation,
                }
              : q
          )
        );

        // Reset form
        setEditingQuestion(null);
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Update question error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this question? This will also delete all answers."
      )
    ) {
      return;
    }

    try {
      const result = await deleteQuizQuestion(questionId, courseId);

      if (result.success) {
        toast({
          title: "Question deleted",
          description: "The question has been deleted successfully.",
        });

        // Update local state
        const updatedQuestions = questions.filter((q) => q.id !== questionId);
        setQuestions(updatedQuestions);

        // If the active question was deleted, set a new active question
        if (activeQuestionId === questionId) {
          setActiveQuestionId(
            updatedQuestions.length > 0 ? updatedQuestions[0].id : null
          );
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete question error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddAnswer = async () => {
    if (!activeQuestionId) return;

    if (!newAnswer.answerText.trim()) {
      toast({
        title: "Answer text required",
        description: "Please enter text for the answer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.set("questionId", activeQuestionId.toString());
      formData.set("answerText", newAnswer.answerText);
      formData.set("isCorrect", newAnswer.isCorrect.toString());
      formData.set("courseId", courseId.toString());

      const result = await createQuizAnswer(formData);

      if (result.success) {
        toast({
          title: "Answer added",
          description: "The answer has been added successfully.",
        });

        // Refresh questions to get updated answers
        const updatedQuestions = await getQuizQuestions(lessonId);
        setQuestions(updatedQuestions);

        // Reset form
        setNewAnswer({
          answerText: "",
          isCorrect: false,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Add answer error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAnswer = async () => {
    if (!editingAnswer) return;

    if (!editingAnswer.data.answerText.trim()) {
      toast({
        title: "Answer text required",
        description: "Please enter text for the answer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.set("answerText", editingAnswer.data.answerText);
      formData.set("isCorrect", editingAnswer.data.isCorrect.toString());
      formData.set("courseId", courseId.toString());

      const result = await updateQuizAnswer(editingAnswer.id, formData);

      if (result.success) {
        toast({
          title: "Answer updated",
          description: "The answer has been updated successfully.",
        });

        // Update local state
        setQuestions(
          questions.map((q) => {
            if (q.id === editingAnswer.questionId && q.answers) {
              return {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === editingAnswer.id
                    ? {
                        ...a,
                        answer_text: editingAnswer.data.answerText,
                        is_correct: editingAnswer.data.isCorrect,
                      }
                    : a
                ),
              };
            }
            return q;
          })
        );

        // Reset form
        setEditingAnswer(null);
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Update answer error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAnswer = async (answerId: number, questionId: number) => {
    if (!confirm("Are you sure you want to delete this answer?")) {
      return;
    }

    try {
      const result = await deleteQuizAnswer(answerId, courseId);

      if (result.success) {
        toast({
          title: "Answer deleted",
          description: "The answer has been deleted successfully.",
        });

        // Update local state
        setQuestions(
          questions.map((q) => {
            if (q.id === questionId && q.answers) {
              return {
                ...q,
                answers: q.answers.filter((a) => a.id !== answerId),
              };
            }
            return q;
          })
        );
      } else {
        toast({
          title: "Error",
          description: result.error || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete answer error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const activeQuestion = questions.find((q) => q.id === activeQuestionId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Quiz Editor</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  id="question-text"
                  value={newQuestion.questionText}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      questionText: e.target.value,
                    })
                  }
                  placeholder="Enter your question here"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation (Optional)</Label>
                <Textarea
                  id="explanation"
                  value={newQuestion.explanation}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      explanation: e.target.value,
                    })
                  }
                  placeholder="Explain the correct answer (shown after submission)"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewQuestion({
                      questionText: "",
                      explanation: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddQuestion}
                  disabled={!newQuestion.questionText.trim()}
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  Add Question
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center p-8">
          <p className="text-gray-500">Loading quiz questions...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">
            No questions yet. Add your first question to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-3 rounded-md cursor-pointer ${
                        activeQuestionId === question.id
                          ? "bg-purple-100 border-l-4 border-purple-700"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveQuestionId(question.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {index + 1}.{" "}
                          {question.question_text.length > 30
                            ? `${question.question_text.substring(0, 30)}...`
                            : question.question_text}
                        </span>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingQuestion({
                                id: question.id,
                                data: {
                                  questionText: question.question_text,
                                  explanation: question.explanation || "",
                                },
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteQuestion(question.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {question.answers?.length || 0} answer
                        {question.answers?.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            {activeQuestion ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-between items-center">
                      <span>Question Details</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Question
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Question</DialogTitle>
                          </DialogHeader>
                          {editingQuestion && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-question-text">
                                  Question Text
                                </Label>
                                <Textarea
                                  id="edit-question-text"
                                  value={editingQuestion.data.questionText}
                                  onChange={(e) =>
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      data: {
                                        ...editingQuestion.data,
                                        questionText: e.target.value,
                                      },
                                    })
                                  }
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-explanation">
                                  Explanation (Optional)
                                </Label>
                                <Textarea
                                  id="edit-explanation"
                                  value={editingQuestion.data.explanation}
                                  onChange={(e) =>
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      data: {
                                        ...editingQuestion.data,
                                        explanation: e.target.value,
                                      },
                                    })
                                  }
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingQuestion(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleUpdateQuestion}
                                  disabled={
                                    !editingQuestion.data.questionText.trim()
                                  }
                                  className="bg-purple-700 hover:bg-purple-800"
                                >
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Question:</h3>
                      <p className="p-3 bg-gray-50 rounded-md">
                        {activeQuestion.question_text}
                      </p>
                    </div>

                    {activeQuestion.explanation && (
                      <div>
                        <h3 className="font-semibold mb-2">Explanation:</h3>
                        <p className="p-3 bg-gray-50 rounded-md">
                          {activeQuestion.explanation}
                        </p>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Answers:</h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-purple-700 hover:bg-purple-800"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Answer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Answer</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="answer-text">Answer Text</Label>
                                <Input
                                  id="answer-text"
                                  value={newAnswer.answerText}
                                  onChange={(e) =>
                                    setNewAnswer({
                                      ...newAnswer,
                                      answerText: e.target.value,
                                    })
                                  }
                                  placeholder="Enter answer option"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="is-correct"
                                  checked={newAnswer.isCorrect}
                                  onCheckedChange={(checked) =>
                                    setNewAnswer({
                                      ...newAnswer,
                                      isCorrect: checked as boolean,
                                    })
                                  }
                                />
                                <Label htmlFor="is-correct">
                                  This is the correct answer
                                </Label>
                              </div>
                              <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setNewAnswer({
                                      answerText: "",
                                      isCorrect: false,
                                    });
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleAddAnswer}
                                  disabled={!newAnswer.answerText.trim()}
                                  className="bg-purple-700 hover:bg-purple-800"
                                >
                                  Add Answer
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {activeQuestion.answers &&
                      activeQuestion.answers.length > 0 ? (
                        <div className="space-y-3">
                          {activeQuestion.answers.map((answer, index) => (
                            <div
                              key={answer.id}
                              className={`p-3 rounded-md border ${
                                answer.is_correct
                                  ? "border-green-500 bg-green-50"
                                  : "border-gray-200 bg-gray-50"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <span className="font-medium">
                                    {String.fromCharCode(65 + index)}.
                                  </span>
                                  <span>{answer.answer_text}</span>
                                  {answer.is_correct && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <Check className="h-3 w-3 mr-1" />
                                      Correct
                                    </span>
                                  )}
                                </div>
                                <div className="flex space-x-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                          setEditingAnswer({
                                            id: answer.id,
                                            questionId: activeQuestion.id,
                                            data: {
                                              answerText: answer.answer_text,
                                              isCorrect: answer.is_correct,
                                            },
                                          })
                                        }
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Answer</DialogTitle>
                                      </DialogHeader>
                                      {editingAnswer && (
                                        <div className="space-y-4 py-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="edit-answer-text">
                                              Answer Text
                                            </Label>
                                            <Input
                                              id="edit-answer-text"
                                              value={
                                                editingAnswer.data.answerText
                                              }
                                              onChange={(e) =>
                                                setEditingAnswer({
                                                  ...editingAnswer,
                                                  data: {
                                                    ...editingAnswer.data,
                                                    answerText: e.target.value,
                                                  },
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              id="edit-is-correct"
                                              checked={
                                                editingAnswer.data.isCorrect
                                              }
                                              onCheckedChange={(checked) =>
                                                setEditingAnswer({
                                                  ...editingAnswer,
                                                  data: {
                                                    ...editingAnswer.data,
                                                    isCorrect:
                                                      checked as boolean,
                                                  },
                                                })
                                              }
                                            />
                                            <Label htmlFor="edit-is-correct">
                                              This is the correct answer
                                            </Label>
                                          </div>
                                          <div className="flex justify-end space-x-2 pt-4">
                                            <Button
                                              variant="outline"
                                              onClick={() =>
                                                setEditingAnswer(null)
                                              }
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              onClick={handleUpdateAnswer}
                                              disabled={
                                                !editingAnswer.data.answerText.trim()
                                              }
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
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                    onClick={() =>
                                      handleDeleteAnswer(
                                        answer.id,
                                        activeQuestion.id
                                      )
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center p-4 border border-dashed rounded-md">
                          No answers yet. Add some answer options for this
                          question.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500">
                  Select a question from the list or create a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
