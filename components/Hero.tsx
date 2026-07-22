"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    eyebrow: "Estética dental y facial",
    title: "Resultados naturales.\nPrecisión clínica.",
    cta: "Agendar una evaluación",
    href: "#agendar",
    image:
      "https://placehold.co/1920x1100/C9B8A6/FAF7F2?text=Hero+editorial+1",
  },
  {
    eyebrow: "Diagnóstico digital",
    title: "Una sonrisa diseñada\npara usted.",
    cta: "Ver tratamientos",
    href: "#tratamientos",
    image:
      "https://placehold.co/1920x1100/B7A28F/FAF7F2?text=Hero+editorial+2",
  },
  {
    eyebrow: "Consulta privada · Vitacura",
    title: "Atención discreta,\nuno a uno.",
    cta: "Conocer la consulta",
    href: "#la-consulta",
    image:
      "https://placehold.co/1920x1100/A8927E/FAF7F2?text=Hero+editorial+3",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const go = (dir: -1 | 1) => {
    setIndex((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[index];

  return (
    <section
      id="inicio"
      className="relative bg-charcoal text-cream overflow-hidden"
      aria-roledescription="carrusel"
      aria-label="Destacados"
    >
      <div className="relative min-h-[78vh] sm:min-h-[86vh] lg:min-h-[92vh]">
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={1100}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/35 to-transparent"
              aria-hidden="true"
            />
          </div>
        ))}

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 min-h-[78vh] sm:min-h-[86vh] lg:min-h-[92vh] flex items-end sm:items-center pb-24 sm:pb-0">
          <div className="max-w-xl fade-up">
            <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-cream/85 mb-5">
              {slide.eyebrow}
            </p>
            <h1 className="font-sans text-[2.15rem] sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.02em] whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="mt-6 font-serif italic text-lg sm:text-xl text-cream/80">
              La confianza de una sonrisa bien hecha.
            </p>
            <a
              href={slide.href}
              className="mt-9 inline-block bg-burgundy text-cream px-9 py-3.5 text-[10px] tracking-[0.24em] uppercase hover:bg-burgundy-dark transition-colors"
            >
              {slide.cta}
            </a>
          </div>
        </div>

        <div className="absolute z-20 bottom-8 left-0 right-0 px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Diapositivas">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Diapositiva ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-px transition-all ${
                  i === index ? "w-10 bg-cream" : "w-6 bg-cream/40"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="h-10 w-10 border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="h-10 w-10 border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
