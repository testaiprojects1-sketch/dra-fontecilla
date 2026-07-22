const BADGES = [
  "Universidad de los Andes",
  "Colegio de Cirujano Dentistas de Chile",
  "+X años de experiencia clínica",
  "Sociedad de Odontología Estética",
  "Diagnóstico digital de sonrisa",
];

export default function CredentialsStrip() {
  return (
    <section
      className="bg-cream border-y border-black/[0.06] py-12 sm:py-16"
      aria-labelledby="credentials-label"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p
          id="credentials-label"
          className="text-center text-[10px] tracking-[0.28em] uppercase text-charcoal/45 mb-10 fade-up"
        >
          Formación y respaldo
        </p>
        <ul className="fade-up flex flex-wrap justify-center items-center gap-x-12 gap-y-7 sm:gap-x-16">
          {BADGES.map((badge) => (
            <li
              key={badge}
              className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-charcoal/35 font-medium text-center max-w-[150px] sm:max-w-[170px] leading-snug"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
