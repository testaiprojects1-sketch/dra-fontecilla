export default function FinalCTA() {
  return (
    <section
      id="agendar"
      className="bg-ivory py-20 sm:py-28 border-t border-black/[0.04]"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-2xl px-6 text-center fade-up">
        <h2
          id="cta-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-charcoal leading-[1.25] font-normal"
        >
          Su evaluación comienza con una conversación.
        </h2>
        <div className="rule-gold mx-auto mt-8" aria-hidden="true" />
        <a
          href="https://wa.me/56900000000"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-burgundy text-cream px-10 py-3.5 text-[10px] tracking-[0.24em] uppercase hover:bg-burgundy-dark transition-colors"
        >
          Agendar por WhatsApp
        </a>

        <div
          id="asistente-web"
          className="mt-14 mx-auto max-w-sm border border-gold/35 bg-cream px-6 py-8"
        >
          <p className="text-[10px] tracking-[0.24em] uppercase text-burgundy mb-3">
            Asistente en línea
          </p>
          <p className="font-serif text-lg text-charcoal/65 leading-snug">
            Use el asistente de voz (botón flotante) para agendar o resolver
            consultas.
          </p>
        </div>
      </div>
    </section>
  );
}
