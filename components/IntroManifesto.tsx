export default function IntroManifesto() {
  return (
    <section
      className="bg-cream py-20 sm:py-28 lg:py-32"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center fade-up">
        <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-charcoal/55 mb-8">
          Estética dental y facial de precisión · Confianza discreta
        </p>
        <h2
          id="manifesto-heading"
          className="font-serif text-[1.65rem] sm:text-3xl lg:text-[2.35rem] leading-[1.35] text-charcoal font-normal"
        >
          Creada por la Dra. Macarena Fontecilla, con una mirada clínica
          centrada en resultados naturales que restauran armonía, volumen y
          vitalidad — sin exceso.
        </h2>
        <a
          href="#tratamientos"
          className="mt-10 inline-block text-[10px] tracking-[0.24em] uppercase text-burgundy border-b border-burgundy/40 pb-1 hover:border-burgundy transition-colors"
        >
          Descubra su plan
        </a>
      </div>
    </section>
  );
}
