"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { buildWebsiteKnowledgeBrief } from "@/lib/clinicKnowledge";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

/**
 * Mount the official floating widget only after the embed script has loaded,
 * and always pass required {{services_kb}}.
 */
export default function ElevenLabsConvaiWidget() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scriptReady || !hostRef.current || !AGENT_ID) return;

    const host = hostRef.current;
    host.replaceChildren();

    try {
      const el = document.createElement("elevenlabs-convai");
      el.setAttribute("agent-id", AGENT_ID);
      el.setAttribute(
        "dynamic-variables",
        JSON.stringify({
          services_kb: buildWebsiteKnowledgeBrief().slice(0, 4000),
        })
      );
      host.appendChild(el);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo cargar el asistente de voz"
      );
    }
  }, [scriptReady]);

  if (!AGENT_ID) return null;

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.12/dist/index.js"
        strategy="afterInteractive"
        type="text/javascript"
        onLoad={() => setScriptReady(true)}
        onError={() =>
          setError("No se pudo cargar el script de ElevenLabs (red / bloqueador).")
        }
      />
      <div ref={hostRef} id="clara-convai-host" />
      {error && (
        <div className="fixed bottom-5 right-5 z-[90] max-w-xs border border-burgundy/30 bg-cream p-4 text-[12px] text-burgundy shadow-lg">
          <p className="font-medium">Asistente no disponible</p>
          <p className="mt-1 text-charcoal/70">{error}</p>
          <a
            href={`https://elevenlabs.io/app/talk-to?agent_id=${AGENT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[10px] tracking-[0.16em] uppercase text-burgundy underline"
          >
            Abrir Clara en ElevenLabs
          </a>
        </div>
      )}
    </>
  );
}
