"use client";

import { useCallback, useMemo, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import {
  CLINIC,
  buildWebsiteKnowledgeBrief,
  treatmentsAsPlainText,
} from "@/lib/clinicKnowledge";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

function readVisiblePageText(): string {
  if (typeof document === "undefined") return "";
  const main = document.querySelector("main");
  const root = main ?? document.body;
  const text = (root?.innerText ?? "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
  return text.slice(0, 6000);
}

function FloatingAgent() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"listening" | "speaking" | "idle">("idle");
  const [lastTool, setLastTool] = useState<string | null>(null);

  const knowledge = useMemo(() => buildWebsiteKnowledgeBrief(), []);

  const clientTools = useMemo(
    () => ({
      get_website_info: async () => {
        setLastTool("get_website_info");
        return knowledge;
      },
      get_treatments: async () => {
        setLastTool("get_treatments");
        return treatmentsAsPlainText();
      },
      get_page_text: async () => {
        setLastTool("get_page_text");
        return readVisiblePageText() || "No hay texto visible en la página.";
      },
      get_contact: async () => {
        setLastTool("get_contact");
        return [
          `Dirección: ${CLINIC.address}`,
          `WhatsApp: ${CLINIC.whatsappDisplay} — ${CLINIC.whatsappUrl}`,
          `Email: ${CLINIC.email}`,
          `Horario: ${CLINIC.hours}`,
        ].join("\n");
      },
    }),
    [knowledge]
  );

  const conversation = useConversation({
    clientTools,
    onError: (message) => {
      setError(
        typeof message === "string" ? message : "Error de conversación"
      );
    },
    onConnect: () => {
      conversation.sendContextualUpdate(
        [
          "Contexto del sitio web (fuente de verdad):",
          knowledge,
          "",
          "Texto visible actual de la página:",
          readVisiblePageText().slice(0, 2500),
        ].join("\n")
      );
    },
    onDisconnect: () => setMode("idle"),
    onModeChange: ({ mode: next }) => {
      if (next === "speaking" || next === "listening") setMode(next);
      else setMode("idle");
    },
  });

  const connected = conversation.status === "connected";
  const connecting = conversation.status === "connecting";

  const start = useCallback(async () => {
    setError(null);
    setLastTool(null);
    setOpen(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Permita el micrófono para hablar con el asistente.");
      return;
    }

    try {
      const authRes = await fetch("/api/elevenlabs/signed-url");
      const auth = (await authRes.json()) as {
        signedUrl?: string;
        agentId?: string;
        fallbackAgentId?: string;
        error?: string;
      };

      const sessionOpts = {
        dynamicVariables: {
          website_context: knowledge.slice(0, 4500),
        },
        clientTools,
        overrides: {
          agent: {
            firstMessage:
              "Hola, soy el asistente de la consulta de la Dra. Fontecilla en Vitacura. Puedo ayudarle con tratamientos, precios orientativos, ubicación o a agendar por WhatsApp. ¿En qué le ayudo?",
            language: "es" as const,
            prompt: {
              prompt: [
                "Usa siempre el contexto del sitio web inyectado (website_context) y las herramientas del cliente.",
                "Herramientas: get_website_info, get_treatments, get_page_text, get_contact.",
                "Si preguntan precios o tratamientos, llama get_treatments o usa el contexto.",
                "Si preguntan dirección, horario o WhatsApp, llama get_contact.",
                "No inventes datos que no estén en el sitio.",
              ].join(" "),
            },
          },
        },
      };

      if (auth.signedUrl) {
        await conversation.startSession({
          ...sessionOpts,
          signedUrl: auth.signedUrl,
        });
      } else {
        await conversation.startSession({
          ...sessionOpts,
          agentId: auth.fallbackAgentId || auth.agentId || AGENT_ID,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar la sesión");
    }
  }, [clientTools, conversation, knowledge]);

  const stop = useCallback(async () => {
    await conversation.endSession();
    setMode("idle");
  }, [conversation]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (connected) {
            setOpen((v) => !v);
            return;
          }
          void start();
        }}
        aria-label="Abrir asistente de voz"
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-cream shadow-lg transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect
            x="7"
            y="3"
            width="6"
            height="10"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-[90] w-[min(100vw-2rem,340px)] border border-gold/40 bg-cream p-4 shadow-xl"
          role="dialog"
          aria-label="Asistente de voz de la consulta"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-burgundy">
                Asistente web
              </p>
              <p className="mt-1 font-serif text-[17px] text-charcoal">
                Dra. Fontecilla
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal/60">
                Lee tratamientos, precios, ubicación y el contenido de esta
                página para responderle.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] tracking-wide text-charcoal/45 hover:text-charcoal"
              aria-label="Cerrar panel"
            >
              Cerrar
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 border border-black/[0.06] bg-ivory px-3 py-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connected ? "bg-burgundy" : "bg-charcoal/25"
              }`}
            />
            <p className="text-[11px] text-charcoal/55">
              {connected
                ? `${mode === "speaking" ? "Hablando" : mode === "listening" ? "Escuchando" : "Conectado"}${lastTool ? ` · ${lastTool}` : ""}`
                : connecting
                  ? "Conectando…"
                  : "Listo para hablar"}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {!connected ? (
              <button
                type="button"
                onClick={() => void start()}
                disabled={connecting}
                className="bg-burgundy px-3 py-2 text-[10px] tracking-[0.18em] uppercase text-cream disabled:opacity-50"
              >
                {connecting ? "Conectando…" : "Hablar"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void stop()}
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
    </>
  );
}

/** Floating voice agent fed with live website knowledge. */
export default function ElevenLabsConvaiWidget() {
  return (
    <ConversationProvider>
      <FloatingAgent />
    </ConversationProvider>
  );
}
