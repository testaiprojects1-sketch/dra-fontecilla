"use client";

import Script from "next/script";
import type { HTMLAttributes } from "react";

type ElevenLabsConvaiProps = HTMLAttributes<HTMLElement> & {
  "agent-id"?: string;
};

function ElevenLabsConvai(props: ElevenLabsConvaiProps) {
  return <elevenlabs-convai {...props} />;
}

const AGENT_ID = "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

/** Floating ElevenLabs ConvAI widget for the public site. */
export default function ElevenLabsConvaiWidget() {
  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
      <ElevenLabsConvai agent-id={AGENT_ID} />
    </>
  );
}
