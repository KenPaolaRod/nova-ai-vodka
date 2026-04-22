"use client";

import { cn } from "@/lib/cn";

type ChipGroupProps<T extends string> = {
  label: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
};

export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: ChipGroupProps<T>) {
  return (
    <div>
      <span
        className="font-mono-ui mb-2.5 block text-ink-dim"
        id={`chip-${label.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`chip-${label.replace(/\s+/g, "-").toLowerCase()}`}
        className="flex flex-wrap gap-2.5"
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "font-display cursor-pointer rounded-full border px-5 py-3 text-[12px] uppercase tracking-[0.08em] transition-all duration-200",
                active
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-transparent text-ink hover:border-ink"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
