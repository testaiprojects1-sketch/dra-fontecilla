const BENEFITS = [
  {
    title: "Atención personalizada 1:1",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      </svg>
    ),
  },
  {
    title: "Agendamiento por WhatsApp",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="M4 8l8 5 8-5" />
      </svg>
    ),
  },
  {
    title: "Recordatorios automáticos",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Planes de tratamiento claros",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4M10 12h4M10 16h2" />
      </svg>
    ),
  },
  {
    title: "Discreción absoluta",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <path d="M12 4c-5 0-9 4.5-9 8s4 8 9 8 9-4.5 9-8-4-8-9-8z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Estacionamiento en el edificio",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
        <path d="M5 19V5h9a4 4 0 010 8H5" />
        <path d="M5 13h7" />
      </svg>
    ),
  },
];

export default function BenefitsGrid() {
  return (
    <section className="bg-cream py-16 sm:py-20" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2
          id="benefits-heading"
          className="text-center text-[10px] tracking-[0.28em] uppercase text-charcoal/45 mb-12 sm:mb-14 fade-up"
        >
          Cuidado experto y beneficios exclusivos
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 sm:gap-y-14 max-w-4xl mx-auto">
          {BENEFITS.map((b) => (
            <li key={b.title} className="fade-up flex flex-col items-center text-center gap-3.5">
              <span className="text-burgundy">{b.icon}</span>
              <p className="text-[11px] sm:text-[12px] tracking-[0.04em] text-charcoal/75 max-w-[150px] leading-snug">
                {b.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
