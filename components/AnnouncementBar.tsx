"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Evaluación inicial con diagnóstico digital de sonrisa",
  "Atención privada y discreta en Vitacura",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="bg-burgundy text-cream text-center text-[11px] sm:text-xs tracking-[0.14em] uppercase py-2.5 px-4"
      role="status"
      aria-live="polite"
    >
      <p
        className={`transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
