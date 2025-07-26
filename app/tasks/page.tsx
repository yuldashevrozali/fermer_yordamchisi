import { Header } from "@/components/header"
import { TaskManager } from "@/components/task-manager"

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Daily Tasks</h1>
          <TaskManager />
        </div>
      </main>
    </div>
  )
}
