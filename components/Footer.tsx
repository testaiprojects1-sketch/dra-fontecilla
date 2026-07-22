export default function Footer() {
  return (
    <footer className="bg-cream border-t border-gold/30 pt-16 pb-8" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
          <div>
            <h3 className="text-[11px] tracking-section uppercase text-charcoal mb-5">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-charcoal/70 leading-relaxed">
              <li>
                Av. Kennedy 7120, Oficina 306
                <br />
                Vitacura, Santiago
              </li>
              <li>
                <a
                  href="https://wa.me/56900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-burgundy transition-colors"
                >
                  WhatsApp: +56 9 0000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@dramacarenafontecilla.cl"
                  className="hover:text-burgundy transition-colors"
                >
                  contacto@dramacarenafontecilla.cl
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-section uppercase text-charcoal mb-5">
              La Consulta
            </h3>
            <ul className="space-y-3 text-sm text-charcoal/70">
              <li>
                <a href="#tratamientos" className="hover:text-burgundy transition-colors">
                  Tratamientos
                </a>
              </li>
              <li>
                <a href="#la-doctora" className="hover:text-burgundy transition-colors">
                  La Doctora
                </a>
              </li>
              <li>
                <a href="#agendar" className="hover:text-burgundy transition-colors">
                  Agendar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-section uppercase text-charcoal mb-5">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-charcoal/70">
              <li>
                <a href="#" className="hover:text-burgundy transition-colors">
                  Política de privacidad
                </a>
              </li>
              <li className="leading-relaxed">
                Datos tratados conforme a la Ley 21.719
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gold/20">
          <p className="text-center text-[11px] tracking-[0.1em] text-charcoal/50">
            © 2026 Dra. Macarena Fontecilla · Vitacura, Santiago
          </p>
        </div>
      </div>
    </footer>
  );
}
