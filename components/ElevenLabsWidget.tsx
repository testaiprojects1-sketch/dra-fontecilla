"use client";

interface ElevenLabsWidgetProps {
  className?: string;
}

/** Placeholder — se conectará ElevenLabs Conversational AI después. */
export default function ElevenLabsWidget({ className = "" }: ElevenLabsWidgetProps) {
  return (
    <section
      className={`rounded-lg border border-line bg-white p-4 shadow-card ${className}`}
      aria-label="Asistente de voz AURA"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-teal">
            Asistente de voz
          </p>
          <h2 className="mt-1 text-[14px] font-medium text-ink">
            Widget ElevenLabs
          </h2>
          <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-muted">
            Próximamente: conversación por voz con AURA para consultar agenda,
            aprobar acciones y dictar seguimientos. El widget se conectará aquí.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-teal/40 bg-teal/5 text-teal opacity-80"
          title="Conexión pendiente"
          aria-label="Activar asistente de voz (próximamente)"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="7" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-paper px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-taupe" />
        <p className="text-[11px] text-muted">
          Estado: listo para API key · sin conexión activa
        </p>
      </div>
    </section>
  );
}
