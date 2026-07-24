"use client";

import { useCallback, useMemo, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { buildWebsiteKnowledgeBrief } from "@/lib/clinicKnowledge";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

function ClaraCallButton() {
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"idle" | "listening" | "speaking">("idle");

  const servicesKb = useMemo(
    () => buildWebsiteKnowledgeBrief().slice(0, 4000),
    []
  );

  const conversation = useConversation({
    onError: (message) => {
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
    onConnect: () => {
      try {
        conversation.sendContextualUpdate(
          `Datos del sitio web (usar como fuente de verdad):\n${servicesKb}`
        );
      } catch {
        // non-fatal
      }
    },
  });

  const connected = conversation.status === "connected";
  const connecting = conversation.status === "connecting";

  const start = useCallback(async () => {
    setError(null);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Permita el micrófono en el navegador e intente de nuevo.");
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

      const session = {
        dynamicVariables: { services_kb: servicesKb },
      };

      if (auth.signedUrl) {
        await conversation.startSession({
          ...session,
          signedUrl: auth.signedUrl,
        });
      } else {
        await conversation.startSession({
          ...session,
          agentId: auth.fallbackAgentId || auth.agentId || AGENT_ID,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al iniciar la llamada");
    }
  }, [conversation, servicesKb]);

  const stop = useCallback(async () => {
    await conversation.endSession();
    setMode("idle");
  }, [conversation]);

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2">
      {error && (
        <div className="max-w-[260px] border border-burgundy/35 bg-cream px-3 py-2 text-[11px] leading-snug text-burgundy shadow-md">
          {error}
        </div>
      )}
      {connected && (
        <p className="rounded-full bg-cream/95 px-3 py-1 text-[10px] tracking-[0.14em] uppercase text-charcoal/60 shadow">
          {mode === "speaking"
            ? "Clara habla…"
            : mode === "listening"
              ? "Escuchando…"
              : "En llamada"}
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          if (connected) void stop();
          else void start();
        }}
        disabled={connecting}
        aria-label={connected ? "Colgar llamada con Clara" : "Hablar con Clara"}
        className={`flex h-14 min-w-14 items-center justify-center gap-2 rounded-full px-5 text-[10px] tracking-[0.2em] uppercase text-cream shadow-lg transition-transform hover:scale-[1.03] disabled:opacity-60 ${
          connected ? "bg-charcoal" : "bg-burgundy"
        }`}
      >
        {connecting ? "Conectando…" : connected ? "Colgar" : "Hablar"}
      </button>
    </div>
  );
}

/** Voice assistant for the public site — React SDK (reliable connect + errors). */
export default function ElevenLabsConvaiWidget() {
  return (
    <ConversationProvider>
      <ClaraCallButton />
    </ConversationProvider>
  );
}
