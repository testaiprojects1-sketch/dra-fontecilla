/**
 * One-off: register cotizador client tools on the Clara ConvAI agent.
 * Usage: node scripts/update-agent-tools.mjs [--dry]
 * Reads ELEVENLABS_API_KEY / NEXT_PUBLIC_ELEVENLABS_AGENT_ID from .env.local.
 */
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const API_KEY = env.ELEVENLABS_API_KEY;
const AGENT_ID =
  env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_1001ky62xg8wfpmrg3n2zmyy2p9v";
if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY in .env.local");
  process.exit(1);
}

const dry = process.argv.includes("--dry");
const base = "https://api.elevenlabs.io";
const headers = { "xi-api-key": API_KEY, "Content-Type": "application/json" };

const res = await fetch(`${base}/v1/convai/agents/${AGENT_ID}`, { headers });
if (!res.ok) {
  console.error("GET agent failed:", res.status, (await res.text()).slice(0, 400));
  process.exit(1);
}
const agent = await res.json();
const prompt = agent?.conversation_config?.agent?.prompt ?? {};
console.log("Agent:", agent.name);
console.log("Existing inline tools:", (prompt.tools ?? []).map((t) => t.name));
console.log("Existing tool_ids:", prompt.tool_ids ?? []);

const clientTool = (name, description, properties, required) => ({
  type: "client",
  name,
  description,
  expects_response: true,
  response_timeout_secs: 5,
  parameters: {
    type: "object",
    properties,
    required,
  },
});

const tratamientoParam = {
  type: "string",
  description:
    "Nombre del tratamiento tal como lo dijo el usuario (ej: botox, carillas, blanqueamiento, armonización, diseño de sonrisa, mantención).",
};

const newTools = [
  clientTool(
    "agregar_tratamiento",
    "Agrega un tratamiento al cotizador de la página web y devuelve el resumen con el nuevo total en CLP. Úsalo cuando el usuario pida cotizar, sumar o agregar un tratamiento.",
    {
      tratamiento: tratamientoParam,
      cantidad: {
        type: "integer",
        description: "Cantidad a agregar (por defecto 1, máximo 5).",
      },
    },
    ["tratamiento"]
  ),
  clientTool(
    "quitar_tratamiento",
    "Quita por completo un tratamiento del cotizador y devuelve el resumen con el nuevo total.",
    { tratamiento: tratamientoParam },
    ["tratamiento"]
  ),
  clientTool(
    "fijar_cantidad",
    "Fija la cantidad exacta de un tratamiento en el cotizador (0 lo elimina) y devuelve el resumen con el nuevo total.",
    {
      tratamiento: tratamientoParam,
      cantidad: {
        type: "integer",
        description: "Cantidad exacta deseada (0 a 5).",
      },
    },
    ["tratamiento", "cantidad"]
  ),
  clientTool(
    "vaciar_cotizador",
    "Vacía por completo el cotizador de la página.",
    {},
    []
  ),
  clientTool(
    "resumen_cotizador",
    "Devuelve la selección actual del cotizador con subtotales y el total aproximado en CLP. Úsalo antes de responder preguntas sobre el total o lo seleccionado.",
    {},
    []
  ),
];

const keptTools = (prompt.tools ?? []).filter(
  (t) => !newTools.some((n) => n.name === t.name)
);

const promptAddendum = `

— Cotizador (herramientas) —
Puedes operar el cotizador de la página con las herramientas: agregar_tratamiento, quitar_tratamiento, fijar_cantidad, vaciar_cotizador y resumen_cotizador.
Cuando el usuario pida cotizar, sumar, quitar o saber el total, usa la herramienta correspondiente y responde con el resultado que devuelve (incluye el total en pesos chilenos).
No calcules totales de memoria: usa resumen_cotizador. Aclara siempre que son valores «desde», sujetos a evaluación de la doctora.`;

const currentPrompt = prompt.prompt ?? "";
const nextPrompt = currentPrompt.includes("— Cotizador (herramientas) —")
  ? currentPrompt
  : currentPrompt + promptAddendum;

const body = {
  conversation_config: {
    agent: {
      prompt: {
        prompt: nextPrompt,
        tools: [...keptTools, ...newTools],
      },
    },
  },
};

if (dry) {
  console.log("DRY RUN — would PATCH with tools:", body.conversation_config.agent.prompt.tools.map((t) => t.name));
  process.exit(0);
}

const patch = await fetch(`${base}/v1/convai/agents/${AGENT_ID}`, {
  method: "PATCH",
  headers,
  body: JSON.stringify(body),
});
if (!patch.ok) {
  console.error("PATCH failed:", patch.status, (await patch.text()).slice(0, 800));
  process.exit(1);
}
const updated = await patch.json();
console.log(
  "PATCH ok. Tools now:",
  (updated?.conversation_config?.agent?.prompt?.tools ?? []).map((t) => t.name)
);
