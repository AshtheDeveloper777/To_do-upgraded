import type { Task, TaskId } from "../types/task";
import { formatDueBadge, isOverdue } from "../utils/datetime";

export interface TaskItemProps {
  task: Task;
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps): JSX.Element {
  const overdue = isOverdue(task);
  return (
    <li
      className={`task-item ${overdue ? "task-item--overdue" : ""} ${
        task.completed ? "task-item--done" : ""
      }`}
    >
      <div className="task-item__body">
        <label className="task-item__check">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          />
          <span className="task-item__title">{task.title}</span>
        </label>
        {task.dueAt !== null && (
          <div className="task-item__meta">
            <span
              className={`task-item__due ${overdue ? "task-item__due--late" : ""}`}
              title="Due"
            >
              <CalendarIcon />
              {formatDueBadge(task.dueAt)}
            </span>
          </div>
        )}
      </div>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onRemove(task.id)}
        aria-label={`Delete task: ${task.title}`}
      >
        ×
      </button>
    </li>
  );
}

function CalendarIcon(): JSX.Element {
  return (
    <svg
      className="task-item__due-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
