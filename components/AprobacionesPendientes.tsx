"use client";

import { useState } from "react";
import type { ApprovalItem } from "@/types";

interface AprobacionesPendientesProps {
  items: ApprovalItem[];
  onAprobar: (id: string) => void;
  onAhoraNo: (id: string) => void;
}

export default function AprobacionesPendientes({
  items,
  onAprobar,
  onAhoraNo,
}: AprobacionesPendientesProps) {
  const [exiting, setExiting] = useState<Set<string>>(new Set());

  const handleAprobar = (id: string) => {
    setExiting((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      onAprobar(id);
      setExiting((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  return (
    <section className="rounded-lg border border-line bg-white shadow-card">
      <header className="border-b border-line px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[14px] font-medium text-ink">
            Aprobaciones pendientes
          </h2>
          <span className="rounded bg-teal/10 px-2 py-0.5 text-[11px] font-medium text-teal">
            {items.length} en cola
          </span>
        </div>
        <p className="mt-1 text-[12px] text-muted">
          Acciones propuestas por el sistema. Nada se envía sin su aprobación.
        </p>
      </header>

      <div className="space-y-3 p-4">
        {items.length === 0 && (
          <p className="py-6 text-center text-[13px] text-muted">
            No hay aprobaciones pendientes. AURA quedará atenta a la próxima
            acción.
          </p>
        )}

        {items.map((item) => (
          <article
            key={item.id}
            className={`overflow-hidden rounded-lg border border-line px-4 py-3.5 ${
              exiting.has(item.id) ? "approval-exit" : ""
            }`}
          >
            <p className="text-[13px] font-medium text-ink">{item.titulo}</p>
            <blockquote className="mt-2.5 border-l-2 border-teal/40 bg-paper px-3 py-2 text-[12px] leading-relaxed text-muted">
              {item.mensajeWhatsApp}
            </blockquote>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAprobar(item.id)}
                disabled={exiting.has(item.id)}
                className="rounded-lg bg-teal px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Aprobar ✓
              </button>
              <button
                type="button"
                onClick={() => onAhoraNo(item.id)}
                disabled={exiting.has(item.id)}
                className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:border-ink/20 hover:text-ink disabled:opacity-50"
              >
                Ahora no
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
