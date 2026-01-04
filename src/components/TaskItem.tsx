import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '@/types/task';
import { CategoryTag } from './CategoryTag';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl bg-card shadow-card transition-all duration-200',
        'hover:shadow-card-hover',
        task.completed && 'opacity-60'
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          task.completed
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/30 hover:border-primary/50'
        )}
      >
        {task.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-base font-medium transition-all duration-200',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.title}
        </p>
      </div>

      <CategoryTag category={task.category} />

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
