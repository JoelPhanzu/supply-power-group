"use client";

import { useState, type ChangeEvent } from "react";
import type { ActionResult } from "@/lib/actions/types";

export function StatusSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => Promise<ActionResult>;
}) {
  const [current, setCurrent] = useState(value);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as T;
    const previous = current;
    setCurrent(next);
    setPending(true);
    setError(null);

    const result = await onChange(next);
    setPending(false);

    if (!result.success) {
      setCurrent(previous);
      setError(result.error ?? "Une erreur est survenue.");
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={current}
        onChange={handleChange}
        disabled={pending}
        className="rounded-full border border-border-soft bg-navy-700 px-3.5 py-1.5 text-xs font-semibold text-text-main focus:border-accent-500 focus:outline-none disabled:opacity-60"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[0.68rem] text-red-300">{error}</p>}
    </div>
  );
}
