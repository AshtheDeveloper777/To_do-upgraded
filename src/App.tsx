import { ClockBar } from "./components/ClockBar";
import { FilterBar } from "./components/FilterBar";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import type { TaskFilter } from "./types/task";

function emptyMessageForFilter(filter: TaskFilter): string {
  switch (filter) {
    case "active":
      return "Nothing left to do — or add something new above.";
    case "completed":
      return "No completed tasks yet. Check one off when you're done.";
    default:
      return "Start by adding your first task.";
  }
}

export default function App(): JSX.Element {
  const {
    filter,
    setFilter,
    filteredTasks,
    counts,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
  } = useTasks();

  return (
    <div className="app">
      <div className="app__glow" aria-hidden />
      <div className="app__top">
        <header className="app__header">
          <p className="eyebrow">Interactive To-Do</p>
          <h1 className="app__title">Plan your day with clarity</h1>
          <p className="app__subtitle">
            Schedule tasks with date and time — saved safely in{" "}
            <code className="mono">localStorage</code>.
          </p>
        </header>
        <ClockBar />
      </div>

      <main className="app__main">
        <section className="card" aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="sr-only">
            Tasks
          </h2>
          <TaskInput onAdd={addTask} />
          <FilterBar
            filter={filter}
            onChange={setFilter}
            counts={counts}
            onClearCompleted={clearCompleted}
          />
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onRemove={removeTask}
            emptyMessage={emptyMessageForFilter(filter)}
          />
        </section>
      </main>

      <footer className="app__footer">
        <span className="mono">{counts.total} tasks total</span>
      </footer>
    </div>
  );
}
