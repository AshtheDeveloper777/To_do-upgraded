import type { Task, TaskId } from "../types/task";
import { STORAGE_KEYS } from "../types/storage";

/** Serialized shape stored in localStorage (plain JSON). */
interface TaskRecord {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  dueAt: number | null;
}

function isPersistedTaskId(value: string): boolean {
  return value.length > 0 && value.length <= 256;
}

function parseDueAt(value: unknown): number | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return undefined;
}

/**
 * Accepts current schema and legacy objects that had `priority` (ignored).
 */
function parseTaskRecord(value: unknown): Task | null {
  if (typeof value !== "object" || value === null) return null;
  const o = value as Record<string, unknown>;
  if (typeof o.title !== "string" || o.title.trim().length === 0) return null;
  if (typeof o.completed !== "boolean") return null;
  if (typeof o.createdAt !== "number" || !Number.isFinite(o.createdAt)) return null;
  if (typeof o.id !== "string" || !isPersistedTaskId(o.id)) return null;
  const dueParsed = parseDueAt(o.dueAt);
  if (dueParsed === undefined) return null;
  return {
    id: o.id as TaskId,
    title: o.title.trim(),
    completed: o.completed,
    createdAt: o.createdAt,
    dueAt: dueParsed,
  };
}

/**
 * Parse and validate tasks JSON from localStorage.
 * Returns `[]` for missing key; `null` if data is corrupt (caller may reset).
 */
export function parseStoredTasks(raw: string | null): Task[] | null {
  if (raw === null || raw === "") return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return null;
  const tasks: Task[] = [];
  for (const item of parsed) {
    const task = parseTaskRecord(item);
    if (!task) return null;
    tasks.push(task);
  }
  return tasks;
}

export function serializeTasks(tasks: Task[]): string {
  const payload: TaskRecord[] = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    completed: t.completed,
    createdAt: t.createdAt,
    dueAt: t.dueAt,
  }));
  return JSON.stringify(payload);
}

export function loadTasks(): Task[] {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const raw = window.localStorage.getItem(STORAGE_KEYS.tasks);
  const parsed = parseStoredTasks(raw);
  if (parsed === null) {
    window.localStorage.removeItem(STORAGE_KEYS.tasks);
    return [];
  }
  return parsed;
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.tasks, serializeTasks(tasks));
  } catch {
    // Quota or private mode — fail silently; in-memory state still works.
  }
}
