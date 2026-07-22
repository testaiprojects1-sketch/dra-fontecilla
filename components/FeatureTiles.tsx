const TILES = [
  {
    label: "Pacientes que vuelven",
    image: "https://placehold.co/900x1100/C4B5A5/FAF7F2?text=Pacientes",
  },
  {
    label: "Resultados naturales",
    image: "https://placehold.co/900x1100/B9A793/FAF7F2?text=Resultados",
  },
  {
    label: "X años de experiencia",
    image: "https://placehold.co/900x1100/AD9A84/FAF7F2?text=Experiencia",
  },
];

export default function FeatureTiles() {
  return (
    <section className="bg-cream pb-6 sm:pb-10" aria-label="Pilares">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-8">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {TILES.map((tile) => (
            <li key={tile.label} className="fade-up relative group overflow-hidden">
              <div className="aspect-[4/5] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tile.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  width={900}
                  height={1100}
                />
                <div
                  className="absolute inset-0 bg-charcoal/35 group-hover:bg-charcoal/45 transition-colors"
                  aria-hidden="true"
                />
                <p className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-center text-[11px] sm:text-xs tracking-[0.22em] uppercase text-cream">
                  {tile.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
