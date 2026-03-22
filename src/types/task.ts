/** Branded id so task ids are not confused with arbitrary strings at compile time. */
export type TaskId = string & { readonly __brand: "TaskId" };

export const createTaskId = (): TaskId =>
  crypto.randomUUID() as TaskId;

export interface Task {
  id: TaskId;
  title: string;
  completed: boolean;
  createdAt: number;
  /** Local date+time when the task is due, or null if unscheduled. */
  dueAt: number | null;
}

export type TaskFilter = "all" | "active" | "completed";

export function isTaskId(value: string): value is TaskId {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}
