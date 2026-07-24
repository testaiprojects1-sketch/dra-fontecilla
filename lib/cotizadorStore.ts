/**
 * Shared cotizador state: the on-page calculator and the voice assistant
 * (client tools) read and mutate the same selection.
 */

import { TREATMENTS, TreatmentInfo, formatCLP } from "@/lib/clinicKnowledge";

export type QtyMap = Readonly<Record<string, number>>;

const MAX_QTY = 5;

let state: QtyMap = {};
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): QtyMap {
  return state;
}

export function setQuantity(id: string, next: number): void {
  const value = Math.max(0, Math.min(MAX_QTY, Math.round(next)));
  if ((state[id] ?? 0) === value) return;
  if (value === 0) {
    const rest = { ...state };
    delete rest[id];
    state = rest;
  } else {
    state = { ...state, [id]: value };
  }
  emit();
}

export function addQuantity(id: string, delta: number): void {
  setQuantity(id, (state[id] ?? 0) + delta);
}

export function clearSelection(): void {
  if (Object.keys(state).length === 0) return;
  state = {};
  emit();
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Fuzzy match a spoken treatment name to a catalog entry. */
export function findTreatment(query: string): TreatmentInfo | null {
  const q = normalize(query);
  if (!q) return null;

  const exact = TREATMENTS.find(
    (t) => t.id === q || normalize(t.name) === q
  );
  if (exact) return exact;

  const contains = TREATMENTS.find(
    (t) => normalize(t.name).includes(q) || q.includes(normalize(t.name))
  );
  if (contains) return contains;

  const aliases: Record<string, string> = {
    botox: "toxina",
    toxina: "toxina",
    botulinica: "toxina",
    relleno: "armonizacion",
    rellenos: "armonizacion",
    "acido hialuronico": "armonizacion",
    labios: "armonizacion",
    armonizacion: "armonizacion",
    blanqueamiento: "blanqueamiento",
    carillas: "estetica-dental",
    carilla: "estetica-dental",
    restauracion: "estetica-dental",
    "diseno de sonrisa": "diseno-sonrisa",
    diseno: "diseno-sonrisa",
    sonrisa: "diseno-sonrisa",
    control: "mantencion",
    mantencion: "mantencion",
    seguimiento: "mantencion",
  };
  for (const [alias, id] of Object.entries(aliases)) {
    if (q.includes(alias)) {
      return TREATMENTS.find((t) => t.id === id) ?? null;
    }
  }
  return null;
}

export interface QuoteLine {
  treatment: TreatmentInfo;
  quantity: number;
  subtotal: number;
}

export function getQuote(): {
  lines: QuoteLine[];
  total: number;
  itemCount: number;
} {
  const lines = TREATMENTS.flatMap((t) => {
    const quantity = state[t.id] ?? 0;
    if (quantity === 0) return [];
    return [{ treatment: t, quantity, subtotal: t.priceFromCLP * quantity }];
  });
  return {
    lines,
    total: lines.reduce((s, l) => s + l.subtotal, 0),
    itemCount: lines.reduce((s, l) => s + l.quantity, 0),
  };
}

/** Spanish summary the voice agent can read aloud. */
export function quoteSummaryText(): string {
  const { lines, total } = getQuote();
  if (lines.length === 0) {
    return "El cotizador está vacío. No hay tratamientos seleccionados.";
  }
  const items = lines
    .map(
      (l) =>
        `${l.treatment.name}${l.quantity > 1 ? ` por ${l.quantity}` : ""}: ${formatCLP(l.subtotal)}`
    )
    .join("; ");
  return `Selección actual: ${items}. Total aproximado: ${formatCLP(total)} pesos chilenos. Valores «desde», sujetos a evaluación de la doctora.`;
}
