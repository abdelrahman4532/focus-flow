import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskCategory } from '@/types/task';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAdd: (title: string, category: TaskCategory) => void;
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'coding', label: 'Coding' },
  { value: 'school', label: 'School' },
  { value: 'life', label: 'Life' },
];

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('coding');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), category);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div
        className={cn(
          'flex items-center gap-3 p-4 rounded-xl bg-card shadow-card transition-all duration-200',
          isFocused && 'shadow-card-hover ring-1 ring-primary/10'
        )}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
          <Plus className="w-3.5 h-3.5 text-muted-foreground/50" />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                category === cat.value
                  ? cat.value === 'coding'
                    ? 'bg-tag-coding-bg text-tag-coding'
                    : cat.value === 'school'
                    ? 'bg-tag-school-bg text-tag-school'
                    : 'bg-tag-life-bg text-tag-life'
                  : 'bg-secondary text-muted-foreground hover:bg-muted'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className={cn(
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
            'bg-primary text-primary-foreground',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'hover:opacity-90'
          )}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
