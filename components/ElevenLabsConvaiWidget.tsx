"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { CLINIC, buildWebsiteKnowledgeBrief } from "@/lib/clinicKnowledge";
import {
  addQuantity,
  clearSelection,
  findTreatment,
  quoteSummaryText,
  setQuantity,
} from "@/lib/cotizadorStore";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

function scrollToCotizador() {
  document
    .getElementById("cotizador")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Client tools Clara can call to drive the on-page cotizador. */
const clientTools = {
  agregar_tratamiento: ({
    tratamiento,
    cantidad,
  }: {
    tratamiento: string;
    cantidad?: number;
  }) => {
    const t = findTreatment(String(tratamiento ?? ""));
    if (!t) {
      return `No encontré el tratamiento "${tratamiento}". Opciones: estética dental, blanqueamiento, armonización facial, toxina botulínica, diseño de sonrisa, mantención.`;
    }
    const n = Math.max(1, Math.round(Number(cantidad) || 1));
    addQuantity(t.id, n);
    scrollToCotizador();
    return `Agregado ${t.name} x${n}. ${quoteSummaryText()}`;
  },
  quitar_tratamiento: ({ tratamiento }: { tratamiento: string }) => {
    const t = findTreatment(String(tratamiento ?? ""));
    if (!t) {
      return `No encontré el tratamiento "${tratamiento}" en el catálogo.`;
    }
    setQuantity(t.id, 0);
    scrollToCotizador();
    return `Quitado ${t.name}. ${quoteSummaryText()}`;
  },
  fijar_cantidad: ({
    tratamiento,
    cantidad,
  }: {
    tratamiento: string;
    cantidad: number;
  }) => {
    const t = findTreatment(String(tratamiento ?? ""));
    if (!t) {
      return `No encontré el tratamiento "${tratamiento}" en el catálogo.`;
    }
    const n = Math.max(0, Math.round(Number(cantidad) || 0));
    setQuantity(t.id, n);
    scrollToCotizador();
    return `${t.name} ahora en cantidad ${n}. ${quoteSummaryText()}`;
  },
  vaciar_cotizador: () => {
    clearSelection();
    scrollToCotizador();
    return "Cotizador vaciado. No hay tratamientos seleccionados.";
  },
  resumen_cotizador: () => quoteSummaryText(),
};

function ClaraPanel() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webrtcToken, setWebrtcToken] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"idle" | "listening" | "speaking">("idle");

  const servicesKb = useMemo(
    () => buildWebsiteKnowledgeBrief().slice(0, 4000),
    []
  );
  const servicesKbRef = useRef(servicesKb);
  servicesKbRef.current = servicesKb;

  const conversation = useConversation({
    clientTools,
    onError: (message) => {
      setOpen(true);
      setError(
        typeof message === "string"
          ? message
          : "No se pudo conectar con Clara"
      );
    },
    onDisconnect: () => setMode("idle"),
    onModeChange: ({ mode: next }) => {
      if (next === "speaking" || next === "listening") setMode(next);
      else setMode("idle");
    },
    onConnect: () => setError(null),
  });

  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const connected = conversation.status === "connected";
  const connecting = conversation.status === "connecting";
  const connectedRef = useRef(false);
  connectedRef.current = connected || connecting;

  const refreshCredentials = useCallback(() => {
    // Don't churn credentials mid-call.
    if (connectedRef.current) return;
    fetch("/api/elevenlabs/token")
      .then((r) => r.json())
      .then((data: { token?: string }) => {
        if (data.token) setWebrtcToken(data.token);
      })
      .catch(() => undefined);
    fetch("/api/elevenlabs/signed-url")
      .then((r) => r.json())
      .then((data: { signedUrl?: string }) => {
        if (data.signedUrl) setSignedUrl(data.signedUrl);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    refreshCredentials();
    const id = window.setInterval(refreshCredentials, 60_000);
    return () => window.clearInterval(id);
  }, [refreshCredentials]);

  /** Must stay synchronous inside the click handler (no await before startSession). */
  const start = () => {
    setError(null);
    setOpen(true);
    try {
      const session = {
        dynamicVariables: { services_kb: servicesKbRef.current },
        onConnect: () => {
          try {
            conversationRef.current.sendContextualUpdate(
              `Datos del sitio web (fuente de verdad):\n${servicesKbRef.current}`
            );
          } catch {
            // non-fatal
          }
        },
      };

      if (webrtcToken) {
        // WebRTC: adaptive jitter buffer + Opus → smoother audio than WebSocket.
        conversation.startSession({
          ...session,
          conversationToken: webrtcToken,
          connectionType: "webrtc",
        });
        setWebrtcToken(null); // single-use token
      } else if (signedUrl) {
        conversation.startSession({
          ...session,
          signedUrl,
          connectionType: "websocket",
        });
      } else {
        conversation.startSession({
          ...session,
          agentId: AGENT_ID,
          connectionType: "webrtc",
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al iniciar la llamada");
    }
  };

  const stop = () => {
    conversation.endSession();
    setMode("idle");
    refreshCredentials();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col items-end gap-2">
      {open && (
        <div
          className="w-[min(100vw-2rem,320px)] border border-gold/40 bg-cream p-4 shadow-xl"
          role="dialog"
          aria-label="Asistente Clara"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-burgundy">
                Asistente web
              </p>
              <p className="mt-1 font-serif text-[17px] text-charcoal">Clara</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal/60">
                Consulta Dra. Fontecilla · tratamientos, precios y cotizador.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (connected || connecting) stop();
                setOpen(false);
              }}
              className="text-[11px] text-charcoal/45 hover:text-charcoal"
            >
              Cerrar
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 border border-black/[0.06] bg-ivory px-3 py-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connected
                  ? "bg-burgundy"
                  : connecting
                    ? "animate-pulse bg-gold"
                    : "bg-charcoal/25"
              }`}
            />
            <p className="text-[11px] text-charcoal/55">
              {connected
                ? mode === "speaking"
                  ? "Clara habla…"
                  : mode === "listening"
                    ? "Escuchando…"
                    : "En llamada"
                : connecting
                  ? "Conectando con Clara…"
                  : "Listo — pulse Hablar"}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {!connected ? (
              <button
                type="button"
                onClick={start}
                disabled={connecting}
                className="bg-burgundy px-3 py-2 text-[10px] tracking-[0.18em] uppercase text-cream disabled:opacity-50"
              >
                {connecting ? "Conectando…" : "Hablar"}
              </button>
            ) : (
              <button
                type="button"
                onClick={stop}
                className="border border-burgundy/40 px-3 py-2 text-[10px] tracking-[0.18em] uppercase text-burgundy"
              >
                Colgar
              </button>
            )}
            <a
              href={CLINIC.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-charcoal/20 px-3 py-2 text-[10px] tracking-[0.18em] uppercase text-charcoal hover:border-burgundy hover:text-burgundy"
            >
              WhatsApp
            </a>
          </div>

          {error && (
            <p className="mt-3 text-[12px] font-medium text-burgundy">{error}</p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (open && !connected && !connecting) {
            start();
            return;
          }
          if (connected || connecting) {
            setOpen(true);
            return;
          }
          start();
        }}
        aria-label="Hablar con Clara"
        className={`flex h-14 min-w-14 items-center justify-center rounded-full px-5 text-[10px] tracking-[0.2em] uppercase text-cream shadow-lg transition-transform hover:scale-[1.03] ${
          connected || connecting ? "bg-charcoal" : "bg-burgundy"
        }`}
      >
        {connecting ? "…" : connected ? "En vivo" : "Hablar"}
      </button>
    </div>
  );
}

export default function ElevenLabsConvaiWidget() {
  return (
    <ConversationProvider>
      <ClaraPanel />
    </ConversationProvider>
  );
}
