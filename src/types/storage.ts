/** Central place for storage keys — avoids string typos and documents the schema. */
export const STORAGE_KEYS = {
  tasks: "interactive-todo:v1:tasks",
} as const satisfies Record<string, string>;

export type StorageKey = keyof typeof STORAGE_KEYS;
