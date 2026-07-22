export default function TestimonialSection() {
  return (
    <section
      id="resultados"
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="testimonial-label"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch fade-up">
          <div className="relative min-h-[380px] lg:min-h-[560px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/1200x900/BCA990/FAF7F2?text=Paciente"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              width={1200}
              height={900}
              aria-hidden="true"
            />
          </div>
          <div className="bg-ivory flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 sm:py-20">
            <p
              id="testimonial-label"
              className="text-[10px] tracking-[0.28em] uppercase text-burgundy mb-8"
            >
              Pacientes que vuelven
            </p>
            <blockquote>
              <p className="font-serif text-2xl sm:text-[1.85rem] lg:text-[2.1rem] leading-[1.35] text-charcoal">
                &ldquo;Nadie nota nada — solo que me veo mejor. Eso era
                exactamente lo que quería.&rdquo;
              </p>
              <footer className="mt-8 text-[12px] tracking-[0.14em] uppercase text-charcoal/55">
                — Paciente, Vitacura
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
