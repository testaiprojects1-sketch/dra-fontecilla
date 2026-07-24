"use client";

import { useMemo, useState } from "react";
import {
  CLINIC,
  TREATMENTS,
  formatCLP,
  formatDesdeCLP,
} from "@/lib/clinicKnowledge";

type QtyMap = Record<string, number>;

export default function TreatmentCalculator() {
  const [qty, setQty] = useState<QtyMap>({});

  const selected = useMemo(
    () =>
      TREATMENTS.map((t) => ({
        treatment: t,
        quantity: qty[t.id] ?? 0,
      })).filter((row) => row.quantity > 0),
    [qty]
  );

  const total = useMemo(
    () =>
      selected.reduce(
        (sum, row) => sum + row.treatment.priceFromCLP * row.quantity,
        0
      ),
    [selected]
  );

  const itemCount = useMemo(
    () => selected.reduce((sum, row) => sum + row.quantity, 0),
    [selected]
  );

  const setQuantity = (id: string, next: number) => {
    setQty((prev) => {
      const value = Math.max(0, Math.min(5, next));
      if (value === 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }
      return { ...prev, [id]: value };
    });
  };

  const whatsappEstimate = useMemo(() => {
    if (selected.length === 0) return CLINIC.whatsappUrl;
    const lines = selected.map(
      (row) =>
        `• ${row.treatment.name} x${row.quantity} — ${formatCLP(row.treatment.priceFromCLP * row.quantity)} (desde)`
    );
    const text = [
      "Hola, me interesa una evaluación con la Dra. Fontecilla.",
      "Estimación orientativa desde el cotizador web:",
      ...lines,
      `Total aproximado: ${formatCLP(total)}`,
      "(Entiendo que el precio final está sujeto a evaluación de la doctora.)",
    ].join("\n");
    return `https://wa.me/56900000000?text=${encodeURIComponent(text)}`;
  }, [selected, total]);

  return (
    <section
      id="cotizador"
      className="bg-ivory py-20 sm:py-28 border-t border-black/[0.04]"
      aria-labelledby="cotizador-heading"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <div className="fade-up max-w-2xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-burgundy mb-5">
            Cotizador
          </p>
          <h2
            id="cotizador-heading"
            className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal"
          >
            Estime su inversión aproximada
          </h2>
          <div className="rule-gold mt-7" aria-hidden="true" />
          <p className="mt-6 text-[15px] leading-[1.75] text-charcoal/70">
            Sume o quite tratamientos para ver un total orientativo en pesos
            chilenos. Los valores son «desde» y no constituyen un presupuesto
            formal.
          </p>
        </div>

        <div className="fade-up mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7 min-h-0">
            <ul
              className="max-h-[min(28rem,55vh)] sm:max-h-[min(32rem,60vh)] overflow-y-auto overscroll-contain space-y-0 divide-y divide-black/[0.06] border border-black/[0.06] bg-cream/40 pr-1 scrollbar-thin"
              aria-label="Lista de tratamientos para cotizar"
            >
              {TREATMENTS.map((t) => {
                const quantity = qty[t.id] ?? 0;
                const active = quantity > 0;
                return (
                  <li
                    key={t.id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-4 px-4 sm:px-5 py-5 ${
                      active ? "bg-cream" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0 sm:pr-4">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3 className="font-sans text-[14px] tracking-wide text-charcoal">
                          {t.name}
                        </h3>
                        <span className="text-[9px] tracking-[0.16em] uppercase text-charcoal/40">
                          {t.badge}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] text-charcoal/55 leading-snug">
                        {t.description}
                      </p>
                      <p className="mt-2 text-[12px] tracking-[0.04em] text-burgundy">
                        {formatDesdeCLP(t.priceFromCLP)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {active ? (
                        <>
                          <div className="flex items-center border border-charcoal/20 bg-cream">
                            <button
                              type="button"
                              aria-label={`Quitar ${t.name}`}
                              onClick={() => setQuantity(t.id, quantity - 1)}
                              className="h-10 w-10 text-charcoal hover:bg-ivory transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-[13px] tabular-nums text-charcoal">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Agregar ${t.name}`}
                              onClick={() => setQuantity(t.id, quantity + 1)}
                              className="h-10 w-10 text-charcoal hover:bg-ivory transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setQuantity(t.id, 0)}
                            className="text-[10px] tracking-[0.16em] uppercase text-charcoal/45 hover:text-burgundy"
                          >
                            Quitar
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setQuantity(t.id, 1)}
                          className="border border-charcoal/80 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-charcoal hover:border-burgundy hover:text-burgundy transition-colors"
                        >
                          Agregar
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[11px] text-charcoal/40 tracking-wide">
              Desplace la lista para ver todos los tratamientos
            </p>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28 h-fit border border-gold/35 bg-cream px-6 py-7">
            <p className="text-[10px] tracking-[0.24em] uppercase text-burgundy">
              Su selección
            </p>

            {selected.length === 0 ? (
              <p className="mt-5 font-serif text-lg text-charcoal/50 leading-snug">
                Agregue tratamientos para ver el total aproximado.
              </p>
            ) : (
              <ul className="mt-5 space-y-3">
                {selected.map(({ treatment, quantity }) => (
                  <li
                    key={treatment.id}
                    className="flex items-start justify-between gap-3 text-[13px]"
                  >
                    <span className="text-charcoal/75 leading-snug">
                      {treatment.name}
                      {quantity > 1 ? (
                        <span className="text-charcoal/40"> ×{quantity}</span>
                      ) : null}
                    </span>
                    <span className="tabular-nums text-charcoal shrink-0">
                      {formatCLP(treatment.priceFromCLP * quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 pt-5 border-t border-black/[0.06]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-charcoal/45">
                  Total aprox.
                  {itemCount > 0 ? ` · ${itemCount} ítem${itemCount === 1 ? "" : "s"}` : ""}
                </span>
                <p className="font-serif text-2xl sm:text-3xl text-charcoal tabular-nums">
                  {formatCLP(total)}
                </p>
              </div>
            </div>

            <p
              className="mt-5 text-[12px] leading-relaxed text-charcoal/55"
              role="note"
            >
              <span className="text-burgundy tracking-wide uppercase text-[9px] mr-1.5">
                Aviso
              </span>
              Este cotizador entrega solo una estimación. El precio final está
              sujeto a evaluación de la doctora en consulta, según diagnóstico,
              zonas a tratar y plan personalizado.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappEstimate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-burgundy text-cream text-center px-6 py-3.5 text-[10px] tracking-[0.24em] uppercase hover:bg-burgundy-dark transition-colors"
              >
                Enviar estimación por WhatsApp
              </a>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQty({})}
                  className="text-[10px] tracking-[0.2em] uppercase text-charcoal/45 hover:text-burgundy"
                >
                  Vaciar selección
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
