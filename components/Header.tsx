"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#la-doctora", label: "La Doctora" },
  { href: "#la-consulta", label: "La Consulta" },
  { href: "#secretos", label: "Secretos" },
  { href: "#agendar", label: "Agendar" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/97 backdrop-blur-[2px] border-b border-black/5"
          : "bg-cream border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] h-[64px] sm:h-[72px] items-center gap-3">
          <button
            type="button"
            className="lg:hidden justify-self-start p-1.5 text-charcoal"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <nav className="hidden lg:flex items-center gap-8 justify-self-start" aria-label="Principal">
            {NAV.slice(0, 3).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] tracking-[0.2em] uppercase text-charcoal/85 hover:text-burgundy transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#inicio"
            className="justify-self-center font-sans text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.28em] uppercase text-charcoal whitespace-nowrap"
          >
            Dra. Macarena Fontecilla
          </a>

          <div className="justify-self-end flex items-center gap-1 sm:gap-3">
            <nav className="hidden lg:flex items-center gap-8 mr-2" aria-label="Secundaria">
              {NAV.slice(3).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[10px] tracking-[0.2em] uppercase text-charcoal/85 hover:text-burgundy transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Buscar"
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-charcoal hover:text-burgundy transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
            <a
              href="https://wa.me/56900000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-charcoal hover:text-burgundy transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <label htmlFor="site-search" className="sr-only">
              Buscar en el sitio
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Buscar tratamientos…"
              className="w-full border border-black/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-burgundy"
            />
          </div>
        )}
      </div>

      {menuOpen && (
        <nav
          className="lg:hidden fixed inset-x-0 bottom-0 top-[calc(2.5rem+64px)] bg-cream z-40 px-6 py-10 flex flex-col gap-1"
          aria-label="Móvil"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[12px] tracking-[0.22em] uppercase text-charcoal border-b border-black/5 py-4"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
