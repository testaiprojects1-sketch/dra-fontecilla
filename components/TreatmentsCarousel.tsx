"use client";

import { useRef } from "react";

const TREATMENTS = [
  {
    badge: "Estética",
    name: "Estética dental",
    description: "Restauraciones y carillas con armonía facial.",
    price: "Desde $450.000",
    image: "https://placehold.co/640x800/EDE6DC/6E1E2B?text=Est%C3%A9tica+dental",
  },
  {
    badge: "Sonrisa",
    name: "Blanqueamiento profesional",
    description: "Aclaración segura y controlada en consulta.",
    price: "Desde $280.000",
    image: "https://placehold.co/640x800/E8DFD3/6E1E2B?text=Blanqueamiento",
  },
  {
    badge: "Facial",
    name: "Armonización facial",
    description: "Equilibrio sutil de volúmenes y proporciones.",
    price: "Desde $350.000",
    image: "https://placehold.co/640x800/E5D9CC/6E1E2B?text=Armonizaci%C3%B3n",
  },
  {
    badge: "Facial",
    name: "Toxina botulínica",
    description: "Suaviza líneas de expresión con naturalidad.",
    price: "Desde $180.000",
    image: "https://placehold.co/640x800/E2D5C6/6E1E2B?text=Toxina",
  },
  {
    badge: "Digital",
    name: "Diseño de sonrisa",
    description: "Plan digital personalizado de su nueva sonrisa.",
    price: "Desde $520.000",
    image: "https://placehold.co/640x800/DFD1C0/6E1E2B?text=Dise%C3%B1o+sonrisa",
  },
  {
    badge: "Seguimiento",
    name: "Mantención y control",
    description: "Seguimiento cercano para resultados duraderos.",
    price: "Desde $80.000",
    image: "https://placehold.co/640x800/DCCDBA/6E1E2B?text=Mantenci%C3%B3n",
  },
];

export default function TreatmentsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.7, 340);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="tratamientos"
      className="bg-cream pt-16 sm:pt-24 pb-20 sm:pb-28"
      aria-labelledby="treatments-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-10 sm:mb-14 fade-up">
          <div>
            <div className="flex items-baseline gap-4 mb-2">
              <h2
                id="treatments-heading"
                className="font-sans text-xl sm:text-2xl tracking-[0.04em] text-charcoal"
              >
                Tratamientos
              </h2>
              <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-charcoal/40">
                Destacados
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Tratamientos anteriores"
              className="h-9 w-9 border border-charcoal/25 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Tratamientos siguientes"
              className="h-9 w-9 border border-charcoal/25 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {TREATMENTS.map((t) => (
            <article
              key={t.name}
              className="snap-start shrink-0 w-[72%] sm:w-[38%] lg:w-[23.5%] group fade-up"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  width={640}
                  height={800}
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300" />
                <a
                  href="#agendar"
                  className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-cream text-charcoal text-center text-[10px] tracking-[0.2em] uppercase py-3"
                >
                  Conocer más
                </a>
                <span className="absolute top-3 left-3 text-[9px] tracking-[0.16em] uppercase bg-cream/90 text-charcoal px-2 py-1">
                  {t.badge}
                </span>
              </div>
              <h3 className="mt-4 font-sans text-[14px] tracking-wide text-charcoal">
                {t.name}
              </h3>
              <p className="mt-1.5 text-[13px] text-charcoal/55 leading-snug">
                {t.description}
              </p>
              <p className="mt-2.5 text-[12px] tracking-[0.04em] text-burgundy">
                {t.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
