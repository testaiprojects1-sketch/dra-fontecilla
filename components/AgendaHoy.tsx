"use client";

import { useMemo, useState } from "react";
import { citasSemana, HOY_FECHA } from "@/data/mock";
import type { Cadencia, Cita, CitaEstado } from "@/types";
import CadenceToggle from "@/components/CadenceToggle";

function EstadoChip({ estado }: { estado: CitaEstado }) {
  const styles: Record<CitaEstado, string> = {
    Confirmada: "bg-success/10 text-success",
    "Sin respuesta": "bg-taupe/15 text-taupe",
    Cancelada: "bg-alert/10 text-alert",
  };

  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${styles[estado]}`}
    >
      {estado}
    </span>
  );
}

function formatFechaCorta(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function filterByCadencia(citas: Cita[], cadencia: Cadencia): Cita[] {
  if (cadencia === "diaria") {
    return citas.filter((c) => c.fecha === HOY_FECHA);
  }
  if (cadencia === "semanal") {
    return citas;
  }
  // Mensual demo: misma semana + etiqueta de mes
  return citas;
}

const SUBTITLES: Record<Cadencia, string> = {
  diaria: "Miércoles 22 de julio · agenda del día",
  semanal: "Semana del 20–26 de julio · 20 citas",
  mensual: "Julio 2026 · vista mensual (demo semanal)",
};

export default function AgendaHoy() {
  const [cadencia, setCadencia] = useState<Cadencia>("diaria");
  const rows = useMemo(
    () => filterByCadencia(citasSemana, cadencia),
    [cadencia]
  );

  return (
    <section className="rounded-lg border border-line bg-white shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="text-[14px] font-medium text-ink">Agenda</h2>
          <p className="mt-0.5 text-[11px] text-muted">{SUBTITLES[cadencia]}</p>
        </div>
        <CadenceToggle
          value={cadencia}
          onChange={setCadencia}
          ariaLabel="Vista de agenda"
        />
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-muted">
              {cadencia !== "diaria" && (
                <th className="px-4 py-2.5 font-medium">Fecha</th>
              )}
              <th className="px-4 py-2.5 font-medium">Hora</th>
              <th className="px-4 py-2.5 font-medium">Paciente</th>
              <th className="px-4 py-2.5 font-medium">Tratamiento</th>
              <th className="px-4 py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((cita) => {
              const liberado = cita.estado === "Cancelada";
              return (
                <tr
                  key={cita.id}
                  className={`border-b border-line last:border-0 ${
                    liberado ? "bg-alert/[0.04]" : ""
                  }`}
                >
                  {cadencia !== "diaria" && (
                    <td className="px-4 py-2.5 tabular-nums text-muted">
                      {formatFechaCorta(cita.fecha)}
                    </td>
                  )}
                  <td className="px-4 py-2.5 tabular-nums text-ink">{cita.hora}</td>
                  <td className="px-4 py-2.5 text-ink">{cita.pacienteNombre}</td>
                  <td className="px-4 py-2.5 text-muted">{cita.tratamiento}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-col items-start gap-1">
                      <EstadoChip estado={cita.estado} />
                      {liberado && (
                        <span className="text-[11px] font-medium text-alert">
                          Cupo liberado
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
