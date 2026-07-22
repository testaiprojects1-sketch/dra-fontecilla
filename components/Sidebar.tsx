"use client";

import type { ReactNode } from "react";
import type { NavId } from "@/types";

const NAV: { id: NavId; label: string; icon: ReactNode }[] = [
  {
    id: "centro",
    label: "Centro de Mando",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "acciones",
    label: "Acciones & Tareas",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3.5 4.5h9M3.5 8h9M3.5 11.5h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "pacientes",
    label: "Pacientes & Predicción",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.25" />
        <path d="M3.5 13c.8-2.2 2.4-3.3 4.5-3.3s3.7 1.1 4.5 3.3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "kpis",
    label: "KPIs & Simulador",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 12V8.5M6.5 12V5M10 12V7M13 12V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "crecimiento",
    label: "Crecimiento Digital",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 11.5 6.5 7l2.5 2.5L13 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4.5h3v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

interface SidebarProps {
  active: NavId;
  onNavigate: (id: NavId) => void;
  aprobadasHoy: number;
}

export default function Sidebar({ active, onNavigate, aprobadasHoy }: SidebarProps) {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-line bg-paper px-4 py-6">
      <div className="mb-8 px-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal">
          AURA
        </p>
        <h1 className="mt-2 text-[13px] font-medium leading-snug text-ink">
          Panel de la Consulta
        </h1>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">
          Dra. Macarena Fontecilla
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5" aria-label="Navegación principal">
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-[12.5px] leading-snug transition-colors ${
                isActive
                  ? "bg-teal/10 font-medium text-teal"
                  : "text-muted hover:bg-line/60 hover:text-ink"
              }`}
            >
              <span className={`shrink-0 ${isActive ? "text-teal" : "text-muted"}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-lg border border-line px-3 py-2.5">
        <p className="text-[10px] uppercase tracking-wider text-muted">Aprobadas hoy</p>
        <p className="mt-0.5 text-lg font-medium tabular-nums text-teal">{aprobadasHoy}</p>
      </div>
    </aside>
  );
}
