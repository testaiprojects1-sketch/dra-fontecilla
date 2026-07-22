import { formatCLP, formatPercent } from "@/lib/format";
import { kpis } from "@/data/mock";
import type { KpiTrend } from "@/types";

interface Tile {
  label: string;
  value: string;
  trend: KpiTrend;
}

function TrendMark({ trend }: { trend: KpiTrend }) {
  const arrow =
    trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→";
  const color =
    trend.direction === "up"
      ? "text-success"
      : trend.direction === "down"
        ? "text-alert"
        : "text-muted";

  return (
    <span className={`text-[11px] ${color}`}>
      {arrow} {trend.label}
    </span>
  );
}

export default function KpiRow() {
  const tiles: Tile[] = [
    {
      label: "Citas de hoy",
      value: String(kpis.citasHoy),
      trend: kpis.citasHoyTrend,
    },
    {
      label: "Tasa de confirmación semanal",
      value: formatPercent(kpis.tasaConfirmacion),
      trend: kpis.tasaConfirmacionTrend,
    },
    {
      label: "Presupuestos pendientes de seguimiento",
      value: formatCLP(kpis.presupuestosPendientes),
      trend: kpis.presupuestosPendientesTrend,
    },
    {
      label: "Por cobrar",
      value: formatCLP(kpis.porCobrar),
      trend: kpis.porCobrarTrend,
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-3" aria-label="Indicadores del día">
      {tiles.map((tile) => (
        <article
          key={tile.label}
          className="rounded-lg border border-line bg-white px-4 py-3.5 shadow-card"
        >
          <p className="text-[11px] leading-snug text-muted">{tile.label}</p>
          <p className="mt-2 text-[22px] font-medium tabular-nums tracking-tight text-ink">
            {tile.value}
          </p>
          <div className="mt-1.5">
            <TrendMark trend={tile.trend} />
          </div>
        </article>
      ))}
    </section>
  );
}
