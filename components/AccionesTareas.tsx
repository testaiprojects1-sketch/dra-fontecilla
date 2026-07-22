"use client";

import { useMemo, useState } from "react";
import { formatCLP } from "@/lib/format";
import type { Cadencia, TaskEstado, TaskItem } from "@/types";
import CadenceToggle from "@/components/CadenceToggle";

const CADENCIA_META: Record<
  Cadencia,
  { title: string; subtitle: string }
> = {
  diaria: {
    title: "Diaria",
    subtitle: "Lo que se mueve hoy",
  },
  semanal: {
    title: "Semanal",
    subtitle: "Prioridad de la semana",
  },
  mensual: {
    title: "Mensual",
    subtitle: "Jugadas del mes",
  },
};

const NEXT_ESTADO: Record<TaskEstado, TaskEstado> = {
  abierta: "cerrada",
  cerrada: "bloqueada",
  bloqueada: "abierta",
};

const ESTADO_UI: Record<
  TaskEstado,
  { label: string; mark: string; className: string }
> = {
  abierta: { label: "Abierta", mark: "●", className: "text-taupe" },
  cerrada: { label: "Cerrada", mark: "✓", className: "text-success" },
  bloqueada: { label: "Bloqueada", mark: "⛔", className: "text-alert" },
};

interface AccionesTareasProps {
  tasks: TaskItem[];
  onToggleEstado: (id: string) => void;
}

export default function AccionesTareas({
  tasks,
  onToggleEstado,
}: AccionesTareasProps) {
  const [cadencia, setCadencia] = useState<Cadencia>("semanal");

  const board = useMemo(
    () => tasks.filter((t) => t.cadencia === cadencia),
    [tasks, cadencia]
  );

  const counts = useMemo(() => {
    return {
      abierta: board.filter((t) => t.estado === "abierta").length,
      cerrada: board.filter((t) => t.estado === "cerrada").length,
      bloqueada: board.filter((t) => t.estado === "bloqueada").length,
    };
  }, [board]);

  const meta = CADENCIA_META[cadencia];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-medium text-ink">Acciones & Tareas</h2>
          <p className="mt-1 text-[12px] text-muted">
            Tres tableros de cadencia. Toque el estado para ciclar: abierta →
            cerrada → bloqueada.
          </p>
        </div>
        <CadenceToggle
          value={cadencia}
          onChange={setCadencia}
          ariaLabel="Cadencia de tareas"
        />
      </div>

      <section className="rounded-lg border border-line bg-white shadow-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <h3 className="text-[14px] font-medium text-ink">{meta.title}</h3>
            <p className="text-[12px] text-muted">{meta.subtitle}</p>
          </div>
          <div className="flex gap-3 text-[11px]">
            <span className="text-taupe">
              ● Abiertas <strong className="tabular-nums">{counts.abierta}</strong>
            </span>
            <span className="text-success">
              ✓ Cerradas <strong className="tabular-nums">{counts.cerrada}</strong>
            </span>
            <span className="text-alert">
              ⛔ Bloqueadas{" "}
              <strong className="tabular-nums">{counts.bloqueada}</strong>
            </span>
          </div>
        </header>

        <ul className="divide-y divide-line">
          {board.map((task) => {
            const ui = ESTADO_UI[task.estado];
            return (
              <li
                key={task.id}
                className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-ink">{task.titulo}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal">
                      {task.owner}
                    </span>
                    <p className="text-[12px] text-muted">
                      {task.rationale}
                      {task.recuperableCLP != null && (
                        <span className="ml-1 font-medium text-ink">
                          · {formatCLP(task.recuperableCLP)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleEstado(task.id)}
                  className={`shrink-0 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-medium transition-colors hover:border-ink/20 ${ui.className}`}
                  title={`Cambiar a ${ESTADO_UI[NEXT_ESTADO[task.estado]].label}`}
                >
                  {ui.mark} {ui.label}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
