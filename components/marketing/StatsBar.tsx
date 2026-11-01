"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} className="text-gradient-accent font-heading text-2xl font-bold md:text-4xl">
      {value}
      {suffix}
    </span>
  );
}

// "50+ MW" -> anime 50 puis affiche "+ MW". "24/7" reste statique.
function parseValue(raw: string): { target: number; suffix: string } | null {
  const match = /^(\d+)(?![\d/])(.*)$/.exec(raw.trim());
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] };
}

export function StatsBar({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="rounded-[28px] bg-surface-card px-6 py-8 shadow-[0_24px_60px_rgba(18,21,31,0.14)]">
      <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
        {items.map((stat, i) => {
          const parsed = parseValue(stat.value);
          return (
            <div
              key={`${stat.label}-${i}`}
              className={`flex flex-col items-center gap-1.5 border-border-light px-2 text-center md:border-r md:last:border-r-0 ${
                i % 2 === 0 ? "border-r" : ""
              }`}
            >
              {parsed ? (
                <Counter target={parsed.target} suffix={parsed.suffix} />
              ) : (
                <span className="text-gradient-accent font-heading text-2xl font-bold md:text-4xl">
                  {stat.value}
                </span>
              )}
              <span className="text-[0.78rem] uppercase tracking-wide text-ink-400">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
