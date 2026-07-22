"use client";

import type { Cadencia } from "@/types";

const OPTIONS: { id: Cadencia; label: string }[] = [
  { id: "diaria", label: "Diaria" },
  { id: "semanal", label: "Semanal" },
  { id: "mensual", label: "Mensual" },
];

interface CadenceToggleProps {
  value: Cadencia;
  onChange: (value: Cadencia) => void;
  ariaLabel?: string;
}

export default function CadenceToggle({
  value,
  onChange,
  ariaLabel = "Cadencia",
}: CadenceToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-line bg-paper p-0.5"
      role="group"
      aria-label={ariaLabel}
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
              active
                ? "bg-white text-teal shadow-card"
                : "text-muted hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
