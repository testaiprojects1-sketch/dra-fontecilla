"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  growthSeries,
  heatCells,
  heatDays,
  heatHours,
} from "@/data/mock";
import type { ApprovalItem } from "@/types";

interface CrecimientoDigitalProps {
  approvals: ApprovalItem[];
}

function heatColor(valor: number): string {
  const alpha = 0.08 + (valor / 9) * 0.55;
  return `rgba(15, 76, 92, ${alpha.toFixed(2)})`;
}

export default function CrecimientoDigital({
  approvals,
}: CrecimientoDigitalProps) {
  const planContenido = approvals.filter(
    (a) => a.origen === "campaña" || a.origen === "contenido" || a.origen === "sistema"
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[16px] font-medium text-ink">
          Crecimiento Digital
        </h2>
        <p className="mt-1 text-[12px] text-muted">
          Pensado para una práctica que parte de cero — cuentas, trayectoria 90
          días y plan de contenido aprobado por usted.
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3">
        {["Instagram", "TikTok"].map((red) => (
          <article
            key={red}
            className="rounded-lg border border-dashed border-line bg-white px-4 py-4 shadow-card"
          >
            <p className="text-[11px] uppercase tracking-wider text-muted">
              Cuenta conectada
            </p>
            <p className="mt-1 text-[15px] font-medium text-ink">{red}</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-muted">Seguidores</p>
                <p className="text-[22px] font-medium tabular-nums text-ink">0</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-line px-3 py-1.5 text-[11px] font-medium text-teal hover:border-teal/40 hover:bg-teal/5"
              >
                Conectar
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Placeholder — sin integración activa en esta demo.
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-line bg-white p-4 shadow-card">
        <h3 className="text-[14px] font-medium text-ink">
          Primeros 90 días — alcance y seguidores
        </h3>
        <p className="mt-1 text-[11px] text-muted">
          Trayectoria desde cerca de cero · línea punteada = meta de alcance
        </p>
        <div className="mt-3 h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthSeries} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#E4E2DC" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="dia"
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={{ stroke: "#E4E2DC" }}
                tickLine={false}
                tickFormatter={(v) => `D${v}`}
              />
              <YAxis
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  border: "1px solid #E4E2DC",
                  borderRadius: 8,
                  fontSize: 12,
                  background: "#FAF9F6",
                }}
              />
              <Line
                type="monotone"
                dataKey="metaAlcance"
                name="Meta alcance"
                stroke="#9A6A3F"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="alcance"
                name="Alcance"
                stroke="#0F4C5C"
                strokeWidth={2}
                dot={{ r: 2, fill: "#0F4C5C" }}
              />
              <Line
                type="monotone"
                dataKey="seguidores"
                name="Seguidores"
                stroke="#3D7A4F"
                strokeWidth={2}
                dot={{ r: 2, fill: "#3D7A4F" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white p-4 shadow-card">
        <h3 className="text-[14px] font-medium text-ink">
          Mejores días y horas
        </h3>
        <p className="mt-1 text-[11px] text-muted">
          Referencia del sector salud-estética en Chile
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="w-10" />
                {heatHours.map((h) => (
                  <th
                    key={h}
                    className="pb-1 text-center text-[10px] font-medium text-muted"
                  >
                    {h}:00
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatDays.map((dia) => (
                <tr key={dia}>
                  <td className="pr-2 text-[11px] text-muted">{dia}</td>
                  {heatHours.map((hora) => {
                    const cell = heatCells.find(
                      (c) => c.dia === dia && c.hora === hora
                    );
                    const valor = cell?.valor ?? 0;
                    return (
                      <td key={`${dia}-${hora}`}>
                        <div
                          className="flex h-8 items-center justify-center rounded text-[10px] tabular-nums text-ink/70"
                          style={{ backgroundColor: heatColor(valor) }}
                          title={`${dia} ${hora}:00 · índice ${valor}`}
                        >
                          {valor}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white shadow-card">
        <header className="border-b border-line px-4 py-3">
          <h3 className="text-[14px] font-medium text-ink">Plan de contenido</h3>
          <p className="mt-0.5 text-[11px] text-muted">
            Alimentado por la cola de aprobaciones · AURA propone, usted aprueba
          </p>
        </header>
        <ul className="divide-y divide-line">
          {planContenido.length === 0 ? (
            <li className="px-4 py-6 text-center text-[13px] text-muted">
              No hay piezas en cola. Las propuestas de contenido aparecerán aquí
              cuando AURA las genere.
            </li>
          ) : (
            planContenido.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <p className="text-[13px] font-medium text-ink">{item.titulo}</p>
                <p className="mt-1 line-clamp-2 text-[12px] text-muted">
                  {item.mensajeWhatsApp}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
