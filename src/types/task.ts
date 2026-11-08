export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
export type TaskFilter = "all" | "pending" | "completed";
export type TaskData = Omit<Task, 'id'>;