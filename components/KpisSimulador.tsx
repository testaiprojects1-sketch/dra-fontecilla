"use client";

import { useMemo, useState } from "react";
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
  benchmarkKpis,
  ingresoAnualBase,
  simulatorDefaults,
  simulatorWeights,
  trendSeries,
} from "@/data/mock";
import { formatCLP, formatPercent } from "@/lib/format";

type TrendMetric = "ticket" | "ltv" | "vip" | "controles";

const METRIC_OPTS: { id: TrendMetric; label: string }[] = [
  { id: "ticket", label: "Ticket" },
  { id: "ltv", label: "LTV" },
  { id: "vip", label: "% VIP" },
  { id: "controles", label: "Controles" },
];

function formatBenchmark(value: number, format: "clp" | "percent" | "number") {
  if (format === "clp") return formatCLP(value);
  if (format === "percent") return formatPercent(value);
  return String(value);
}

function SliderRow({
  label,
  help,
  value,
  contribution,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  contribution: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="rounded-lg border border-line px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="text-[13px] font-medium tabular-nums text-teal">{value}%</p>
      </div>
      <p className="mt-1 text-[11px] text-muted">{help}</p>
      <input
        type="range"
        min={0}
        max={40}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-teal"
        aria-label={label}
      />
      <p className="mt-1.5 text-[11px] tabular-nums text-muted">
        Contribución:{" "}
        <span className="font-medium text-ink">{formatCLP(contribution)}/año</span>
      </p>
    </div>
  );
}

export default function KpisSimulador() {
  const [metric, setMetric] = useState<TrendMetric>("ticket");
  const [noShow, setNoShow] = useState(simulatorDefaults.noShow);
  const [controles, setControles] = useState(simulatorDefaults.controles);
  const [leads, setLeads] = useState(simulatorDefaults.leads);
  const [membresia, setMembresia] = useState(simulatorDefaults.membresia);

  const contribs = useMemo(
    () => ({
      noShow: noShow * simulatorWeights.noShow,
      controles: controles * simulatorWeights.controles,
      leads: leads * simulatorWeights.leads,
      membresia: membresia * simulatorWeights.membresia,
    }),
    [noShow, controles, leads, membresia]
  );

  const impacto = useMemo(
    () =>
      contribs.noShow +
      contribs.controles +
      contribs.leads +
      contribs.membresia,
    [contribs]
  );

  const proyectado = ingresoAnualBase + impacto;
  const impactoPct = (impacto / ingresoAnualBase) * 100;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[16px] font-medium text-ink">KPIs & Simulador</h2>
        <p className="mt-1 text-[12px] text-muted">
          Benchmarks de la consulta frente a industria y meta, más simulador de
          impacto.
        </p>
      </div>

      <section className="grid grid-cols-4 gap-3">
        {benchmarkKpis.map((k) => (
          <article
            key={k.id}
            className="rounded-lg border border-line bg-white px-4 py-3.5 shadow-card"
          >
            <p className="text-[11px] text-muted">{k.label}</p>
            <dl className="mt-2 space-y-1 text-[12px]">
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Actual</dt>
                <dd className="font-medium tabular-nums text-ink">
                  {formatBenchmark(k.actual, k.format)}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Industria</dt>
                <dd className="tabular-nums text-muted">
                  {formatBenchmark(k.industria, k.format)}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted">Meta</dt>
                <dd className="tabular-nums text-teal">
                  {formatBenchmark(k.meta, k.format)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-line bg-white p-4 shadow-card">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[14px] font-medium text-ink">
            Tendencia 6 meses
          </h3>
          <div
            className="inline-flex rounded-lg border border-line bg-paper p-0.5"
            role="group"
            aria-label="Métrica de tendencia"
          >
            {METRIC_OPTS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMetric(opt.id)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                  metric === opt.id
                    ? "bg-white text-teal shadow-card"
                    : "text-muted hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendSeries} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#E4E2DC" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={{ stroke: "#E4E2DC" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B6E73", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={56}
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
                dataKey={metric}
                stroke="#0F4C5C"
                strokeWidth={2}
                dot={{ r: 3, fill: "#0F4C5C" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white p-4 shadow-card">
        <h3 className="text-[14px] font-medium text-ink">Simulador de impacto</h3>
        <p className="mt-1 text-[12px] text-muted">
          Ajuste las palancas — el ingreso anual proyectado se recalcula al
          instante.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <SliderRow
            label="Reducción de no-show %"
            help="Cada punto libera cupos y reduce huecos en agenda."
            value={noShow}
            contribution={contribs.noShow}
            onChange={setNoShow}
          />
          <SliderRow
            label="Recuperación de controles %"
            help="Trae de vuelta pacientes con control vencido."
            value={controles}
            contribution={contribs.controles}
            onChange={setControles}
          />
          <SliderRow
            label="Conversión de leads %"
            help="Convierte consultas entrantes en primeras visitas."
            value={leads}
            contribution={contribs.leads}
            onChange={setLeads}
          />
          <SliderRow
            label="Adopción de membresía %"
            help="Ingreso recurrente por planes de control."
            value={membresia}
            contribution={contribs.membresia}
            onChange={setMembresia}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 rounded-lg bg-paper px-4 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted">
              Ingreso anual proyectado
            </p>
            <p className="mt-1 text-[26px] font-medium tabular-nums tracking-tight text-ink">
              {formatCLP(proyectado)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted">Impacto vs. base</p>
            <p className="mt-1 text-[18px] font-medium tabular-nums text-success">
              +{impactoPct.toFixed(1)}%
            </p>
            <p className="text-[11px] tabular-nums text-muted">
              +{formatCLP(impacto)} / año
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
