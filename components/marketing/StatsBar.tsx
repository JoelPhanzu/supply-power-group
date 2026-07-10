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

const STATS: { value: number | null; suffix: string; label: string; staticValue?: string }[] = [
  { value: 50, suffix: "+ MW", label: "Capacité de production" },
  { value: 1000, suffix: "+ KM", label: "Lignes HT/BT déployées" },
  { value: null, suffix: "", staticValue: "24/7", label: "Maintenance & intervention" },
  { value: 100, suffix: "%", label: "Solutions clés en main" },
];

export function StatsBar() {
  return (
    <div className="rounded-[28px] bg-surface-card px-6 py-8 shadow-[0_24px_60px_rgba(18,21,31,0.14)]">
      <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-1.5 border-border-light px-2 text-center md:border-r md:last:border-r-0 ${
              i % 2 === 0 ? "border-r" : ""
            }`}
          >
            {stat.value !== null ? (
              <Counter target={stat.value} suffix={stat.suffix} />
            ) : (
              <span className="text-gradient-accent font-heading text-2xl font-bold md:text-4xl">
                {stat.staticValue}
              </span>
            )}
            <span className="text-[0.78rem] uppercase tracking-wide text-ink-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
