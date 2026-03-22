/** Combine HTML date + time inputs into a UTC timestamp (local interpretation). */
export function combineDateTimeLocal(
  dateStr: string,
  timeStr: string
): number | null {
  if (!dateStr.trim()) return null;
  const t = timeStr.trim() || "00:00";
  const d = new Date(`${dateStr}T${t}`);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
}

/** Format for task row badge (locale-aware, compact). */
export function formatDueBadge(ts: number): string {
  const d = new Date(ts);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

/** Long date for header: "Sunday, March 22, 2026". */
export function formatLongDate(now: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);
}

/** Live clock "2:45:08 PM". */
export function formatTimeClock(now: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);
}

export function isOverdue(task: { completed: boolean; dueAt: number | null }): boolean {
  if (task.completed || task.dueAt === null) return false;
  return task.dueAt < Date.now();
}
