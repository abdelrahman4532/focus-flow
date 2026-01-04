export type TaskCategory = 'coding' | 'school' | 'life';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: number;
}
