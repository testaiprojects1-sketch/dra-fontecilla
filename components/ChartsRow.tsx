"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { citasPorSemana, funnelPresupuestos } from "@/data/mock";

export default function ChartsRow() {
  return (
    <section className="grid grid-cols-2 gap-3" aria-label="Gráficos">
      <article className="rounded-lg border border-line bg-white p-4 shadow-card">
        <h2 className="mb-3 text-[14px] font-medium text-ink">
          Citas por semana (últimas 8)
        </h2>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={citasPorSemana} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="#E4E2DC" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="semana"
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={{ stroke: "#E4E2DC" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(15, 76, 92, 0.06)" }}
                contentStyle={{
                  border: "1px solid #E4E2DC",
                  borderRadius: 8,
                  fontSize: 12,
                  background: "#FAF9F6",
                }}
              />
              <Bar dataKey="citas" name="Citas" fill="#0F4C5C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-lg border border-line bg-white p-4 shadow-card">
        <h2 className="mb-3 text-[14px] font-medium text-ink">
          Presupuestos: emitidos → seguidos → aceptados
        </h2>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelPresupuestos}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid stroke="#E4E2DC" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={{ stroke: "#E4E2DC" }}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="etapa"
                width={80}
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(15, 76, 92, 0.06)" }}
                contentStyle={{
                  border: "1px solid #E4E2DC",
                  borderRadius: 8,
                  fontSize: 12,
                  background: "#FAF9F6",
                }}
              />
              <Bar
                dataKey="cantidad"
                name="Cantidad"
                fill="#9A6A3F"
                radius={[0, 4, 4, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
