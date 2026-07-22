"use client";

import { useState } from "react";
import {
  initialApprovals,
  initialTasks,
  pacientesInactivos as pacientesInactivosSeed,
} from "@/data/mock";
import type { ApprovalItem, NavId, Paciente, TaskItem } from "@/types";
import Sidebar from "@/components/Sidebar";
import StatusStrip from "@/components/StatusStrip";
import KpiRow from "@/components/KpiRow";
import AgendaHoy from "@/components/AgendaHoy";
import AprobacionesPendientes from "@/components/AprobacionesPendientes";
import ChartsRow from "@/components/ChartsRow";
import PacientesInactivos from "@/components/PacientesInactivos";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";
import AccionesTareas from "@/components/AccionesTareas";
import PacientesPrediccion from "@/components/PacientesPrediccion";
import KpisSimulador from "@/components/KpisSimulador";
import CrecimientoDigital from "@/components/CrecimientoDigital";
import { formatCLP } from "@/lib/format";

const TAB_TITLES: Record<NavId, string> = {
  centro: "Centro de Mando",
  acciones: "Acciones & Tareas",
  pacientes: "Pacientes & Predicción",
  kpis: "KPIs & Simulador",
  crecimiento: "Crecimiento Digital",
};

export default function DashboardShell() {
  const [nav, setNav] = useState<NavId>("centro");
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovals);
  const [aprobadasHoy, setAprobadasHoy] = useState(0);
  const [inactivos, setInactivos] = useState(pacientesInactivosSeed);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleAprobar = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    setAprobadasHoy((n) => n + 1);
  };

  const handleAhoraNo = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleProponerCampana = (paciente: Paciente) => {
    const alreadyQueued = approvals.some((a) => a.id === `camp-${paciente.id}`);
    if (alreadyQueued) return;

    const item: ApprovalItem = {
      id: `camp-${paciente.id}`,
      titulo: `Campaña de reactivación — ${paciente.nombre.split(" ")[0]} · ${formatCLP(paciente.valorHistorico)} histórico`,
      mensajeWhatsApp: `Hola ${paciente.nombre.split(" ")[0]}, hace tiempo que no nos vemos en la consulta de la Dra. Fontecilla. Tenemos cupos esta semana para un control. ¿Te agendo? Responde a este WhatsApp.`,
      origen: "campaña",
    };

    setApprovals((prev) => [item, ...prev]);
    setInactivos((prev) => prev.filter((p) => p.id !== paciente.id));
    setNav("centro");
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        switch (t.estado) {
          case "abierta":
            return { ...t, estado: "cerrada" };
          case "cerrada":
            return { ...t, estado: "bloqueada" };
          case "bloqueada":
            return { ...t, estado: "abierta" };
          default: {
            const _exhaustive: never = t.estado;
            return _exhaustive;
          }
        }
      })
    );
  };

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar active={nav} onNavigate={setNav} aprobadasHoy={aprobadasHoy} />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-line px-8 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Panel de la Consulta
              </p>
              <h2 className="mt-0.5 text-[18px] font-medium text-ink">
                {TAB_TITLES[nav]}
              </h2>
              <StatusStrip />
            </div>
            <p className="shrink-0 text-[12px] text-muted">
              Demo · datos simulados desde Google Sheets
            </p>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-8 py-6">
          {nav === "centro" && (
            <>
              <KpiRow />
              <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
                <AgendaHoy />
                <div className="space-y-4">
                  <AprobacionesPendientes
                    items={approvals}
                    onAprobar={handleAprobar}
                    onAhoraNo={handleAhoraNo}
                  />
                  <ElevenLabsWidget />
                </div>
              </div>
              <ChartsRow />
              <PacientesInactivos
                pacientes={inactivos}
                onProponerCampana={handleProponerCampana}
              />
            </>
          )}

          {nav === "acciones" && (
            <AccionesTareas tasks={tasks} onToggleEstado={handleToggleTask} />
          )}

          {nav === "pacientes" && <PacientesPrediccion />}

          {nav === "kpis" && <KpisSimulador />}

          {nav === "crecimiento" && (
            <CrecimientoDigital approvals={approvals} />
          )}
        </div>

        <footer className="space-y-1.5 border-t border-line px-8 py-3">
          <p className="text-center text-[11px] tracking-wide text-muted">
            AURA propone · usted aprueba
          </p>
          <p className="mx-auto max-w-3xl text-center text-[10.5px] leading-relaxed text-muted/90">
            Datos de demostración hasta conectar sus fuentes · AURA no reemplaza
            a Dentalink — vive encima, y lo vuelve inteligente. Los datos son de
            la consulta, y de la consulta se quedan.
          </p>
        </footer>
      </main>
    </div>
  );
}
