"use client";

import { formatCLP } from "@/lib/format";
import type { Paciente } from "@/types";

interface PacientesInactivosProps {
  pacientes: Paciente[];
  onProponerCampana: (paciente: Paciente) => void;
}

function PrioridadBadge({ prioridad }: { prioridad?: string }) {
  const styles: Record<string, string> = {
    Alta: "bg-alert/10 text-alert",
    Media: "bg-taupe/15 text-taupe",
    Baja: "bg-line text-muted",
  };

  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
        styles[prioridad ?? "Baja"]
      }`}
    >
      {prioridad ?? "Baja"}
    </span>
  );
}

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function PacientesInactivos({
  pacientes,
  onProponerCampana,
}: PacientesInactivosProps) {
  return (
    <section className="rounded-lg border border-line bg-white shadow-card">
      <header className="flex items-baseline justify-between border-b border-line px-4 py-3">
        <h2 className="text-[14px] font-medium text-ink">Pacientes inactivos</h2>
        <p className="text-[11px] text-muted">
          Sin visita hace 9+ meses · ordenados por prioridad
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-muted">
              <th className="px-4 py-2.5 font-medium">Paciente</th>
              <th className="px-4 py-2.5 font-medium">Última visita</th>
              <th className="px-4 py-2.5 font-medium">Valor histórico</th>
              <th className="px-4 py-2.5 font-medium">Prioridad</th>
              <th className="px-4 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-2.5">
                  <div>
                    <p className="text-ink">{p.nombre}</p>
                    <p className="text-[11px] text-muted">{p.rut}</p>
                  </div>
                </td>
                <td className="px-4 py-2.5 tabular-nums text-muted">
                  {formatFecha(p.ultimaVisita)}
                </td>
                <td className="px-4 py-2.5 tabular-nums text-ink">
                  {formatCLP(p.valorHistorico)}
                </td>
                <td className="px-4 py-2.5">
                  <PrioridadBadge prioridad={p.prioridad} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => onProponerCampana(p)}
                    className="rounded-lg border border-line px-2.5 py-1 text-[11px] font-medium text-teal transition-colors hover:border-teal/40 hover:bg-teal/5"
                  >
                    Proponer campaña
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
