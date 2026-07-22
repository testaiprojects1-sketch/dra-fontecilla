export default function AboutDoctor() {
  return (
    <section
      id="la-doctora"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="doctor-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 fade-up">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://placehold.co/900x1125/D5C7B6/6E1E2B?text=Dra.+Fontecilla"
                alt="Dra. Macarena Fontecilla"
                className="h-full w-full object-cover"
                width={900}
                height={1125}
              />
            </div>
          </div>

          <div className="lg:col-span-7 fade-up lg:pl-6">
            <p className="text-[10px] tracking-[0.28em] uppercase text-burgundy mb-5">
              La Doctora
            </p>
            <h2
              id="doctor-heading"
              className="font-sans text-2xl sm:text-3xl lg:text-[2.5rem] tracking-tight text-charcoal leading-tight"
            >
              Dra. Macarena Fontecilla
            </h2>
            <div className="rule-gold mt-7" aria-hidden="true" />
            <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-charcoal/70 max-w-xl">
              <p>
                Cirujano Dentista egresada de la Universidad de los Andes, con
                más de X años de experiencia clínica en estética dental y
                facial.
              </p>
              <p>
                Atrae a pacientes que buscan un cambio preciso y discreto. Su
                enfoque — restaurar armonía y vitalidad sin exceso — define una
                consulta donde cada plan se diseña con usted, con tiempo y
                absoluta confidencialidad.
              </p>
            </div>
            <a
              href="#agendar"
              className="mt-10 inline-block border border-charcoal/80 px-9 py-3.5 text-[10px] tracking-[0.24em] uppercase text-charcoal hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Conocer su enfoque
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
