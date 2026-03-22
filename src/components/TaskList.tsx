import type { Task, TaskId } from "../types/task";
import { TaskItem } from "./TaskItem";

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
  emptyMessage: string;
}

export function TaskList({
  tasks,
  onToggle,
  onRemove,
  emptyMessage,
}: TaskListProps): JSX.Element {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
