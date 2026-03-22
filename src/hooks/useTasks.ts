import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskFilter, TaskId } from "../types/task";
import { createTaskId } from "../types/task";
import { loadTasks, saveTasks } from "../utils/storage";

function compareTasks(a: Task, b: Task): number {
  const ad = a.dueAt ?? Number.POSITIVE_INFINITY;
  const bd = b.dueAt ?? Number.POSITIVE_INFINITY;
  if (ad !== bd) return ad - bd;
  return b.createdAt - a.createdAt;
}

export interface UseTasksResult {
  tasks: Task[];
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  filteredTasks: Task[];
  counts: { total: number; active: number; completed: number };
  addTask: (title: string, dueAt: number | null) => void;
  toggleTask: (id: TaskId) => void;
  removeTask: (id: TaskId) => void;
  clearCompleted: () => void;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let list: Task[];
    switch (filter) {
      case "active":
        list = tasks.filter((t) => !t.completed);
        break;
      case "completed":
        list = tasks.filter((t) => t.completed);
        break;
      default:
        list = [...tasks];
    }
    return list.sort(compareTasks);
  }, [tasks, filter]);

  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, active: total - completed, completed };
  }, [tasks]);

  const addTask = useCallback((title: string, dueAt: number | null) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: createTaskId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
      dueAt,
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const toggleTask = useCallback((id: TaskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const removeTask = useCallback((id: TaskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  return {
    tasks,
    filter,
    setFilter,
    filteredTasks,
    counts,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
  };
}
