export default function TestimonialSection() {
  return (
    <section
      id="resultados"
      className="relative min-h-[70vh] sm:min-h-[75vh] flex items-end sm:items-center"
      aria-labelledby="testimonial-label"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://placehold.co/1920x1080/C4B5A5/FAF7F2?text=Ambiente+c%C3%A1lido"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-charcoal/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 py-20 sm:py-28 text-center fade-up">
        <p
          id="testimonial-label"
          className="text-[11px] tracking-section uppercase text-cream/90 mb-8"
        >
          Pacientes que vuelven
        </p>
        <blockquote>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-snug text-cream">
            &ldquo;Nadie nota nada — solo que me veo mejor. Eso era exactamente
            lo que quería.&rdquo;
          </p>
          <footer className="mt-8 text-sm tracking-[0.12em] text-cream/80">
            — Paciente, Vitacura
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
