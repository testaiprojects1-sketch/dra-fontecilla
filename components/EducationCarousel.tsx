"use client";

import { useRef } from "react";

const ARTICLES = [
  {
    category: "Blanqueamiento",
    title: "¿Cuánto dura realmente un blanqueamiento?",
    image: "/images/edu-blanqueamiento.jpg",
  },
  {
    category: "Facial",
    title: "Toxina: mitos y verdades",
    image: "/images/edu-toxina.jpg",
  },
  {
    category: "Guía",
    title: "Cómo elegir a su especialista",
    image: "/images/edu-especialista.jpg",
  },
  {
    category: "Mantención",
    title: "El valor de una mantención oportuna",
    image: "/images/edu-mantencion.jpg",
  },
];

export default function EducationCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.75, 420);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="secretos"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-12 fade-up">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-burgundy mb-3">
              Educación
            </p>
            <h2
              id="education-heading"
              className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal"
            >
              Secretos de una buena sonrisa
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Artículos anteriores"
              className="h-9 w-9 border border-charcoal/25 flex items-center justify-center hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Artículos siguientes"
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
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31.5%] fade-up group"
            >
              <div className="aspect-[10/7] overflow-hidden bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  width={800}
                  height={560}
                />
              </div>
              <p className="mt-5 text-[10px] tracking-[0.22em] uppercase text-charcoal/45">
                {article.category}
              </p>
              <h3 className="mt-2 font-serif text-xl sm:text-[1.35rem] text-charcoal leading-snug">
                {article.title}
              </h3>
              <a
                href="#"
                className="mt-4 inline-block text-[10px] tracking-[0.22em] uppercase text-charcoal border-b border-gold/70 pb-0.5 hover:text-burgundy hover:border-burgundy transition-colors"
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
