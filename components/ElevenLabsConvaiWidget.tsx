"use client";

import Script from "next/script";
import { useMemo } from "react";
import { buildWebsiteKnowledgeBrief } from "@/lib/clinicKnowledge";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

/**
 * Official floating ConvAI widget.
 * Agent Clara requires {{services_kb}} — we always pass it.
 */
export default function ElevenLabsConvaiWidget() {
  const dynamicVariables = useMemo(() => {
    const servicesKb = buildWebsiteKnowledgeBrief().slice(0, 4000);
    return JSON.stringify({ services_kb: servicesKb });
  }, []);

  if (!AGENT_ID) return null;

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.12/dist/index.js"
        strategy="afterInteractive"
        type="text/javascript"
        async
      />
      <elevenlabs-convai
        agent-id={AGENT_ID}
        dynamic-variables={dynamicVariables}
      />
    </>
  );
}
