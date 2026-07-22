export default function ClinicSection() {
  return (
    <section
      id="la-consulta"
      className="bg-cream"
      aria-labelledby="clinic-heading"
    >
      <div className="grid lg:grid-cols-2">
        <div className="fade-up relative min-h-[420px] lg:min-h-[640px] order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/consulta.jpg"
            alt="Interior de la consulta en Vitacura"
            className="absolute inset-0 h-full w-full object-cover"
            width={1400}
            height={1000}
          />
        </div>

        <div className="fade-up order-2 flex items-center bg-ivory px-8 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20">
          <div className="max-w-md">
            <p className="text-[10px] tracking-[0.28em] uppercase text-burgundy mb-5">
              La Consulta
            </p>
            <h2
              id="clinic-heading"
              className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal"
            >
              Atención privada en Vitacura
            </h2>
            <div className="rule-gold mt-7" aria-hidden="true" />
            <p className="mt-8 text-[15px] leading-[1.75] text-charcoal/70">
              En un entorno sereno y discreto, cada cita es exclusivamente
              suya. Pacientes llegan buscando precisión clínica y
              confidencialidad: diagnóstico digital, plan claro y acompañamiento
              cercano en cada etapa.
            </p>
            <address className="mt-8 not-italic text-sm text-charcoal leading-relaxed">
              Av. Kennedy 7120, Oficina 306
              <br />
              Vitacura, Santiago de Chile
            </address>
            <a
              href="#"
              className="mt-10 inline-block bg-burgundy text-cream px-9 py-3.5 text-[10px] tracking-[0.24em] uppercase hover:bg-burgundy-dark transition-colors"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
