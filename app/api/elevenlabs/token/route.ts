import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * WebRTC conversation token for ElevenLabs ConvAI (better audio than WebSocket).
 * Uses server-only ELEVENLABS_API_KEY.
 */
export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const agentId =
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() ||
    process.env.ELEVENLABS_AGENT_ID?.trim() ||
    "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";

  if (!apiKey) {
    return NextResponse.json({ agentId, note: "Sin API key" });
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      {
        headers: { "xi-api-key": apiKey },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({
        error: `ElevenLabs token ${res.status}`,
        detail: detail.slice(0, 300),
        agentId,
      });
    }

    const data = (await res.json()) as { token?: string };
    if (!data.token) {
      return NextResponse.json({ error: "Respuesta sin token", agentId });
    }

    return NextResponse.json({ token: data.token, agentId });
  } catch {
    return NextResponse.json({
      error: "No se pudo obtener token WebRTC",
      agentId,
    });
  }
}
