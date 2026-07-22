"use client";

import { useRef } from "react";

const ARTICLES = [
  {
    title: "¿Cuánto dura realmente un blanqueamiento?",
    image:
      "https://placehold.co/700x480/E8DFD3/6E1E2B?text=Blanqueamiento",
  },
  {
    title: "Toxina: mitos y verdades",
    image: "https://placehold.co/700x480/E2D5C6/6E1E2B?text=Toxina",
  },
  {
    title: "Cómo elegir a su especialista",
    image: "https://placehold.co/700x480/DDD2C4/6E1E2B?text=Especialista",
  },
  {
    title: "El valor de una mantención oportuna",
    image: "https://placehold.co/700x480/D8CBBA/6E1E2B?text=Mantenci%C3%B3n",
  },
];

export default function EducationCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 fade-up">
          <div>
            <p className="text-[11px] tracking-section uppercase text-burgundy mb-3">
              Educación
            </p>
            <h2
              id="education-heading"
              className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal max-w-md"
            >
              Secretos de una buena sonrisa
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Artículos anteriores"
              className="h-10 w-10 border border-charcoal/30 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Artículos siguientes"
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="snap-start shrink-0 w-[85%] sm:w-[48%] lg:w-[31%] fade-up group"
            >
              <div className="aspect-[7/5] overflow-hidden bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  width={700}
                  height={480}
                />
              </div>
              <h3 className="mt-5 font-serif text-xl sm:text-2xl text-charcoal leading-snug">
                {article.title}
              </h3>
              <a
                href="#"
                className="mt-4 inline-block text-[11px] tracking-[0.18em] uppercase text-charcoal border-b border-gold/60 pb-0.5 hover:text-burgundy hover:border-burgundy transition-colors"
              >
                Leer
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
