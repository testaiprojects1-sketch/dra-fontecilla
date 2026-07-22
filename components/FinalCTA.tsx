export default function FinalCTA() {
  return (
    <section
      id="agendar"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center fade-up">
        <h2
          id="cta-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal leading-snug"
        >
          Su evaluación comienza con una conversación.
        </h2>
        <div className="mt-6 mx-auto w-16 h-px bg-gold" aria-hidden="true" />
        <a
          href="https://wa.me/56900000000"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-burgundy text-cream px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-burgundy-dark transition-colors"
        >
          Agendar por WhatsApp
        </a>

        <div
          id="asistente-web"
          className="mt-14 mx-auto max-w-md border border-gold/40 bg-cream px-6 py-8"
        >
          <p className="text-[11px] tracking-section uppercase text-burgundy mb-3">
            Próximamente
          </p>
          <p className="font-serif text-lg text-charcoal/70">
            Asistente de agenda en línea — próximamente
          </p>
        </div>
      </div>
    </section>
  );
}
