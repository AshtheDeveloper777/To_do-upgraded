import { useEffect, useState } from "react";
import { formatLongDate, formatTimeClock } from "../utils/datetime";

export function ClockBar(): JSX.Element {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="clock-bar">
      <div className="clock-bar__calendar" aria-hidden>
        <svg
          className="clock-bar__calendar-svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <text
            x="12"
            y="17"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize="7"
            fontWeight="600"
            fontFamily="inherit"
          >
            {now.getDate()}
          </text>
        </svg>
      </div>
      <div className="clock-bar__text">
        <time className="clock-bar__time" dateTime={now.toISOString()}>
          {formatTimeClock(now)}
        </time>
        <p className="clock-bar__date">{formatLongDate(now)}</p>
      </div>
    </div>
  );
}
