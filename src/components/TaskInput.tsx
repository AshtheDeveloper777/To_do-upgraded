import { type FormEvent, useMemo, useState } from "react";
import { combineDateTimeLocal } from "../utils/datetime";

export interface TaskInputProps {
  onAdd: (title: string, dueAt: number | null) => void;
}

function defaultDateString(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function TaskInput({ onAdd }: TaskInputProps): JSX.Element {
  const [value, setValue] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  const dueAt = useMemo(
    () => combineDateTimeLocal(dateStr, timeStr),
    [dateStr, timeStr]
  );

  const submit = (): void => {
    onAdd(value, dueAt);
    setValue("");
    setDateStr("");
    setTimeStr("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    submit();
  };

  const setQuickToday = (): void => {
    setDateStr(defaultDateString());
  };

  return (
    <form className="task-input" onSubmit={onSubmit}>
      <div className="task-input__row">
        <input
          type="text"
          className="task-input__field"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="New task title"
          maxLength={500}
        />
        <button type="submit" className="btn btn--primary">
          Add task
        </button>
      </div>
      <div className="task-input__schedule">
        <span className="task-input__schedule-label">Schedule</span>
        <div className="task-input__datetime">
          <div className="field-group">
            <label htmlFor="task-date" className="field-group__label">
              Date
            </label>
            <input
              id="task-date"
              type="date"
              className="task-input__date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label htmlFor="task-time" className="field-group__label">
              Time
            </label>
            <input
              id="task-time"
              type="time"
              className="task-input__time"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn--soft"
            onClick={setQuickToday}
            title="Set date to today"
          >
            Today
          </button>
          {(dateStr || timeStr) && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setDateStr("");
                setTimeStr("");
              }}
            >
              Clear
            </button>
          )}
        </div>
        <p className="task-input__hint">
          Leave date empty for no deadline. Time uses your local timezone.
        </p>
      </div>
    </form>
  );
}
