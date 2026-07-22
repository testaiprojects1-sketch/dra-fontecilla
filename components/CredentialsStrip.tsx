const BADGES = [
  "Universidad de los Andes",
  "Colegio de Cirujano Dentistas de Chile",
  "+X años de experiencia clínica",
  "Miembro Sociedad de Odontología Estética",
  "Diagnóstico digital de sonrisa",
];

export default function CredentialsStrip() {
  return (
    <section
      className="bg-cream border-y border-gold/25 py-14 sm:py-16"
      aria-labelledby="credentials-label"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          id="credentials-label"
          className="text-center text-[11px] tracking-section uppercase text-charcoal/60 mb-10 fade-up"
        >
          Formación y respaldo
        </p>
        <ul className="fade-up flex flex-wrap justify-center items-center gap-x-10 gap-y-6 sm:gap-x-14">
          {BADGES.map((badge) => (
            <li
              key={badge}
              className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-charcoal/45 font-medium text-center max-w-[140px] sm:max-w-[180px] grayscale"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
