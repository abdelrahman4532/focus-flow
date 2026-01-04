import { useCallback } from 'react';
import { Task, TaskCategory } from '@/types/task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { ProgressBar } from '@/components/ProgressBar';
import { PomodoroTimer } from '@/components/PomodoroTimer';

const Index = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('focus-tasks', []);

  const handleAddTask = useCallback((title: string, category: TaskCategory) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, [setTasks]);

  const handleToggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-2">
            Focus
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay productive. One task at a time.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,320px] gap-12 lg:gap-16">
          {/* Main Content */}
          <main className="space-y-8">
            <AddTaskForm onAdd={handleAddTask} />
            
            <ProgressBar completed={completedCount} total={tasks.length} />
            
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <PomodoroTimer />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Index;
