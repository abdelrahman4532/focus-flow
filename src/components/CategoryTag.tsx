import { TaskCategory } from '@/types/task';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  category: TaskCategory;
  size?: 'sm' | 'md';
  className?: string;
}

const categoryLabels: Record<TaskCategory, string> = {
  coding: 'Coding',
  school: 'School',
  life: 'Life',
};

export function CategoryTag({ category, size = 'sm', className }: CategoryTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        category === 'coding' && 'bg-tag-coding-bg text-tag-coding',
        category === 'school' && 'bg-tag-school-bg text-tag-school',
        category === 'life' && 'bg-tag-life-bg text-tag-life',
        className
      )}
    >
      {categoryLabels[category]}
    </span>
  );
}
