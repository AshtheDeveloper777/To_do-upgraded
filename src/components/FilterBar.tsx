import type { TaskFilter } from "../types/task";

export interface FilterBarProps {
  filter: TaskFilter;
  onChange: (f: TaskFilter) => void;
  counts: { active: number; completed: number };
  onClearCompleted: () => void;
}

const FILTERS: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Done" },
];

export function FilterBar({
  filter,
  onChange,
  counts,
  onClearCompleted,
}: FilterBarProps): JSX.Element {
  return (
    <div className="filter-bar">
      <div className="filter-bar__tabs" role="tablist" aria-label="Filter tasks">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`filter-bar__tab ${filter === id ? "is-active" : ""}`}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="filter-bar__stats">
        <span className="mono">{counts.active} active</span>
        {counts.completed > 0 && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
