"use client";

import { useRef } from "react";

const TREATMENTS = [
  {
    name: "Estética dental",
    description: "Restauraciones y carillas con armonía facial.",
    price: "Desde $450.000",
    image: "https://placehold.co/600x750/EDE6DC/6E1E2B?text=Est%C3%A9tica+dental",
  },
  {
    name: "Blanqueamiento profesional",
    description: "Aclaración segura y controlada en consulta.",
    price: "Desde $280.000",
    image: "https://placehold.co/600x750/E8DFD3/6E1E2B?text=Blanqueamiento",
  },
  {
    name: "Armonización facial",
    description: "Equilibrio sutil de volúmenes y proporciones.",
    price: "Desde $350.000",
    image: "https://placehold.co/600x750/E5D9CC/6E1E2B?text=Armonizaci%C3%B3n",
  },
  {
    name: "Toxina botulínica",
    description: "Suaviza líneas de expresión con naturalidad.",
    price: "Desde $180.000",
    image: "https://placehold.co/600x750/E2D5C6/6E1E2B?text=Toxina",
  },
  {
    name: "Diseño de sonrisa",
    description: "Plan digital personalizado de su nueva sonrisa.",
    price: "Desde $520.000",
    image: "https://placehold.co/600x750/DFD1C0/6E1E2B?text=Dise%C3%B1o+sonrisa",
  },
  {
    name: "Mantención y control",
    description: "Seguimiento cercano para resultados duraderos.",
    price: "Desde $80.000",
    image: "https://placehold.co/600x750/DCCDBA/6E1E2B?text=Mantenci%C3%B3n",
  },
];

export default function TreatmentsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.75, 360);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="tratamientos"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="treatments-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 fade-up">
          <div>
            <p className="text-[11px] tracking-section uppercase text-burgundy mb-3">
              Tratamientos
            </p>
            <h2
              id="treatments-heading"
              className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal"
            >
              Cuidado de precisión, resultados naturales
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Tratamientos anteriores"
              className="h-10 w-10 border border-charcoal/30 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Tratamientos siguientes"
              className="h-10 w-10 border border-charcoal/30 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {TREATMENTS.map((t) => (
            <article
              key={t.name}
              className="snap-start shrink-0 w-[78%] sm:w-[45%] lg:w-[30%] fade-up group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  width={600}
                  height={750}
                />
              </div>
              <h3 className="mt-5 font-sans text-base tracking-wide text-charcoal">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
                {t.description}
              </p>
              <p className="mt-3 text-xs tracking-[0.08em] text-burgundy">
                {t.price}
              </p>
              <a
                href="#agendar"
                className="mt-4 inline-block text-[11px] tracking-[0.18em] uppercase text-charcoal border-b border-gold/60 pb-0.5 hover:text-burgundy hover:border-burgundy transition-colors"
              >
                Conocer más
              </a>
            </article>
          ))}
        </div>

        <div className="flex sm:hidden justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Tratamientos anteriores"
            className="h-10 w-10 border border-charcoal/30 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Tratamientos siguientes"
            className="h-10 w-10 border border-charcoal/30 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
