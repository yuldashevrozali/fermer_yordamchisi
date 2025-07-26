"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { useTaskStore } from "@/lib/store"
import { Plus, Edit2, Trash2, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTaskStore()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  })

  const content = {
    en: {
      title: "Daily Tasks",
      description: "Manage your farming tasks efficiently",
      addTask: "Add New Task",
      editTask: "Edit Task",
      taskTitle: "Task Title",
      taskDescription: "Description",
      priority: "Priority",
      dueDate: "Due Date",
      save: "Save Task",
      cancel: "Cancel",
      update: "Update Task",
      delete: "Delete",
      edit: "Edit",
      completed: "Completed",
      pending: "Pending",
      overdue: "Overdue",
      noTasks: "No tasks yet. Add your first farming task!",
      priorities: {
        low: "Low",
        medium: "Medium",
        high: "High",
      },
    },
    uz: {
      title: "Kundalik vazifalar",
      description: "Fermer vazifalaringizni samarali boshqaring",
      addTask: "Yangi vazifa qo'shish",
      editTask: "Vazifani tahrirlash",
      taskTitle: "Vazifa nomi",
      taskDescription: "Tavsif",
      priority: "Muhimlik",
      dueDate: "Tugash sanasi",
      save: "Vazifani saqlash",
      cancel: "Bekor qilish",
      update: "Vazifani yangilash",
      delete: "O'chirish",
      edit: "Tahrirlash",
      completed: "Bajarilgan",
      pending: "Kutilmoqda",
      overdue: "Muddati o'tgan",
      noTasks: "Hali vazifalar yo'q. Birinchi fermer vazifangizni qo'shing!",
      priorities: {
        low: "Past",
        medium: "O'rta",
        high: "Yuqori",
      },
    },
  }

  const t = content[language]

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    })
    setEditingTask(null)
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      })
      return
    }

    if (editingTask) {
      updateTask(editingTask, formData)
      toast({
        title: "Success",
        description: "Task updated successfully",
      })
    } else {
      addTask(formData)
      toast({
        title: "Success",
        description: "Task added successfully",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      })
      setEditingTask(taskId)
      setIsDialogOpen(true)
    }
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
    toast({
      title: "Success",
      description: "Task deleted successfully",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTaskStatus = (task: any) => {
    if (task.completed) return "completed"
    if (task.dueDate && new Date(task.dueDate) < new Date()) return "overdue"
    return "pending"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{t.title}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addTask}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingTask ? t.editTask : t.addTask}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">{t.taskTitle}</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Water tomato plants"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">{t.taskDescription}</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Additional details about the task..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">{t.priority}</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t.priorities.low}</SelectItem>
                        <SelectItem value="medium">{t.priorities.medium}</SelectItem>
                        <SelectItem value="high">{t.priorities.high}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">{t.dueDate}</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t.cancel}
                  </Button>
                  <Button onClick={handleSubmit}>{editingTask ? t.update : t.save}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground text-lg">{t.noTasks}</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => {
            const status = getTaskStatus(task)
            return (
              <Card key={task.id} className={task.completed ? "opacity-75" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-muted-foreground mt-1 ${task.completed ? "line-through" : ""}`}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          <Badge className={getPriorityColor(task.priority)}>{t.priorities[task.priority]}</Badge>
                          <Badge className={getStatusColor(status)}>
                            {status === "completed" ? t.completed : status === "overdue" ? t.overdue : t.pending}
                          </Badge>
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(task.id)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
