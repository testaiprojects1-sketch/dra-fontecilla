"use client";

import {
  leadCards,
  loyaltyBuckets,
  patientCards,
  riskStats,
} from "@/data/mock";
import { formatCLP } from "@/lib/format";
import type { LoyaltyTier } from "@/types";

const LOYALTY_STYLES: Record<LoyaltyTier, string> = {
  VIP: "bg-teal/10 text-teal",
  Regular: "bg-line text-muted",
  "En riesgo": "bg-alert/10 text-alert",
  Lead: "bg-taupe/15 text-taupe",
};

function ProbChip({ value }: { value: number }) {
  const tone =
    value >= 65 ? "text-success bg-success/10" : value >= 45 ? "text-taupe bg-taupe/15" : "text-muted bg-line";
  return (
    <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${tone}`}>
      {value}% prob.
    </span>
  );
}

export default function PacientesPrediccion() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[16px] font-medium text-ink">
          Pacientes & Predicción
        </h2>
        <p className="mt-1 text-[12px] text-muted">
          Cartera, lealtad e ingresos en riesgo — con leads sugeridos.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-teal/30 bg-teal/[0.04] px-4 py-3 text-[12px] leading-relaxed text-teal">
        Su base nace segmentada desde el día uno — estos módulos se llenan solos
        con cada paciente.
      </div>

      <section>
        <h3 className="mb-3 text-[13px] font-medium text-ink">Pacientes</h3>
        <div className="grid grid-cols-3 gap-3">
          {patientCards.map((p) => (
            <article
              key={p.id}
              className="rounded-lg border border-line bg-white p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-[11px] font-medium text-teal">
                  {p.iniciales}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-[13px] font-medium text-ink">
                      {p.nombre}
                    </p>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${LOYALTY_STYLES[p.lealtad]}`}
                    >
                      {p.lealtad}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    {p.edad} años · {p.ultimoTratamiento}
                    {p.sesionActual != null && p.sesionTotal != null && (
                      <> · sesión {p.sesionActual} de {p.sesionTotal}</>
                    )}
                  </p>
                  <p className="mt-1.5 text-[12px] tabular-nums text-ink">
                    LTV {formatCLP(p.lifetimeValue)}
                  </p>
                  {p.alerta && (
                    <p className="mt-2 text-[11px] font-medium text-alert">
                      {p.alerta}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-medium text-ink">
          Segmentación de lealtad
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {loyaltyBuckets.map((b) => (
            <article
              key={b.tier}
              className="rounded-lg border border-line bg-white px-4 py-3.5 shadow-card"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-medium text-ink">{b.tier}</p>
                <p className="text-[20px] font-medium tabular-nums text-teal">
                  {b.count}
                </p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">{b.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-medium text-ink">
          Ingresos en riesgo
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {riskStats.map((s) => (
            <article
              key={s.id}
              className="rounded-lg border border-line bg-white px-4 py-3.5 shadow-card"
            >
              <p className="text-[11px] text-muted">{s.label}</p>
              <p className="mt-2 text-[20px] font-medium tabular-nums text-alert">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] text-muted">{s.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[13px] font-medium text-ink">Nuevos leads</h3>
        <div className="grid grid-cols-3 gap-3">
          {leadCards.map((l) => (
            <article
              key={l.id}
              className="rounded-lg border border-line bg-white p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-medium text-ink">{l.nombre}</p>
                <ProbChip value={l.probabilidad} />
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                {l.ocupacion} · {l.comuna} · {l.canal}
              </p>
              <p className="mt-2 text-[12px] text-ink">{l.tratamientoSugerido}</p>
              <p className="mt-1 text-[11px] tabular-nums text-muted">
                Ingreso mens. est. {formatCLP(l.ingresoMensualEst)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
