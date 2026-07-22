export default function ClinicSection() {
  return (
    <section
      id="la-consulta"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="clinic-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="fade-up order-2 lg:order-1 lg:pr-8">
            <p className="text-[11px] tracking-section uppercase text-burgundy mb-4">
              La Consulta
            </p>
            <h2
              id="clinic-heading"
              className="font-sans text-2xl sm:text-3xl tracking-tight text-charcoal"
            >
              Atención privada, uno a uno
            </h2>
            <div className="mt-6 w-16 h-px bg-gold" aria-hidden="true" />
            <p className="mt-8 text-[15px] leading-relaxed text-charcoal/75 max-w-md">
              En un entorno sereno y discreto en Vitacura, cada cita es
              exclusivamente suya. Sin salas de espera concurridas: solo tiempo
              para escucharle, diagnosticar con precisión y acompañarle en cada
              etapa del tratamiento.
            </p>
            <address className="mt-8 not-italic text-sm text-charcoal">
              Av. Kennedy 7120, Oficina 306
              <br />
              Vitacura, Santiago de Chile
            </address>
            <a
              href="#"
              className="mt-10 inline-block bg-burgundy text-cream px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-burgundy-dark transition-colors"
            >
              Cómo llegar
            </a>
          </div>

          <div className="fade-up order-1 lg:order-2 aspect-[5/4] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/1000x800/D8CBBA/6E1E2B?text=Interior+consulta"
              alt="Interior de la consulta en Vitacura"
              className="h-full w-full object-cover"
              width={1000}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
