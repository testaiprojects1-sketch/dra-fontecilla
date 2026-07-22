export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cream"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh] py-14 sm:py-20 lg:py-24">
          <div className="fade-up order-2 lg:order-1">
            <h1
              id="hero-heading"
              className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl leading-[1.15] tracking-tight text-charcoal max-w-xl"
            >
              Estética dental y facial de precisión, resultados naturales.
            </h1>
            <p className="mt-6 font-serif italic text-xl sm:text-2xl text-charcoal/70">
              La confianza de una sonrisa bien hecha.
            </p>
            <div className="mt-10">
              <a
                href="#agendar"
                className="inline-block bg-burgundy text-cream px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-burgundy-dark transition-colors"
              >
                Agendar una evaluación
              </a>
            </div>
          </div>

          <div className="fade-up order-1 lg:order-2 relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none lg:ml-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://placehold.co/800x1000/E8DFD3/6E1E2B?text=Retrato+editorial"
                alt="Retrato editorial de la Dra. Macarena Fontecilla"
                className="h-full w-full object-cover"
                width={800}
                height={1000}
              />
            </div>
            <div
              className="absolute -bottom-3 -left-3 w-24 h-24 border border-gold/50 hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
