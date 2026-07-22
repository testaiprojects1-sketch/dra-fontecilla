export default function AboutDoctor() {
  return (
    <section
      id="la-doctora"
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="doctor-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="fade-up aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/800x1000/DDD2C4/6E1E2B?text=Dra.+Fontecilla"
              alt="Dra. Macarena Fontecilla"
              className="h-full w-full object-cover"
              width={800}
              height={1000}
            />
          </div>

          <div className="fade-up lg:py-8">
            <p className="text-[11px] tracking-section uppercase text-burgundy mb-4">
              La Doctora
            </p>
            <h2
              id="doctor-heading"
              className="font-sans text-2xl sm:text-3xl lg:text-4xl tracking-tight text-charcoal"
            >
              Dra. Macarena Fontecilla
            </h2>
            <div className="mt-6 w-16 h-px bg-gold" aria-hidden="true" />
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal/75 max-w-lg">
              <p>
                Cirujano Dentista egresada de la Universidad de los Andes, con
                más de X años de experiencia clínica en estética dental y
                facial.
              </p>
              <p>
                Su filosofía se centra en resultados naturales y un trato
                personal: cada plan se diseña con usted, sin prisa y con
                absoluta discreción, para que el cambio se sienta como una
                versión más refinada de sí misma.
              </p>
            </div>
            <a
              href="#agendar"
              className="mt-10 inline-block border border-charcoal px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase text-charcoal hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Conocer su enfoque
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
