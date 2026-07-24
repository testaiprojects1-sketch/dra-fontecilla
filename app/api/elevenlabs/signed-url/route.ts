import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Signed URL for ElevenLabs ConvAI. Uses server-only ELEVENLABS_API_KEY.
 * Falls back to public agentId if signed URL is unavailable.
 */
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const agentId =
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
    process.env.ELEVENLABS_AGENT_ID?.trim() ||
    "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

  if (!apiKey) {
    return NextResponse.json({
      agentId,
      fallbackAgentId: agentId,
      note: "Sin API key — usando agentId público",
    });
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
      {
        headers: { "xi-api-key": apiKey },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({
        error: `ElevenLabs signed-url ${res.status}`,
        detail: detail.slice(0, 300),
        fallbackAgentId: agentId,
        agentId,
      });
    }

    const data = (await res.json()) as { signed_url?: string };
    if (!data.signed_url) {
      return NextResponse.json({
        error: "Respuesta sin signed_url",
        fallbackAgentId: agentId,
        agentId,
      });
    }

    return NextResponse.json({
      signedUrl: data.signed_url,
      agentId,
    });
  } catch {
    return NextResponse.json({
      error: "No se pudo obtener signed URL",
      fallbackAgentId: agentId,
      agentId,
    });
  }
}
