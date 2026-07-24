"use client";

import { useEffect, useMemo, useRef } from "react";
import Script from "next/script";
import { buildWebsiteKnowledgeBrief } from "@/lib/clinicKnowledge";

const AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
  "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

/**
 * Official ElevenLabs floating widget (reliable audio) + website knowledge
 * injected via dynamic-variables so answers match this page.
 *
 * In the ElevenLabs agent prompt, include: {{website_context}}
 */
export default function ElevenLabsConvaiWidget() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const dynamicJson = useMemo(() => {
    const brief = buildWebsiteKnowledgeBrief();
    // Agent prompt expects {{services_kb}} as the knowledge source.
    return JSON.stringify({
      services_kb: brief.slice(0, 4500),
      website_context: brief.slice(0, 4500),
    });
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !AGENT_ID) return;

    let el = host.querySelector("elevenlabs-convai") as HTMLElement | null;
    if (!el) {
      el = document.createElement("elevenlabs-convai");
      host.appendChild(el);
    }
    el.setAttribute("agent-id", AGENT_ID);
    el.setAttribute("dynamic-variables", dynamicJson);
  }, [dynamicJson]);

  if (!AGENT_ID) return null;

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
      <div ref={hostRef} className="contents" />
    </>
  );
}
