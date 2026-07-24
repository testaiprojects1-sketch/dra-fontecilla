/**
 * Knowledge base for the public voice assistant — mirrors website content
 * (Dra. Macarena Fontecilla · estética dental y facial · Vitacura).
 */

export interface TreatmentInfo {
  id: string;
  badge: string;
  name: string;
  description: string;
  /** Approximate starting fee in CLP (used by cotizador). */
  priceFromCLP: number;
  image: string;
  details: string;
}

export function formatDesdeCLP(amount: number): string {
  return `Desde $${amount.toLocaleString("es-CL")}`;
}

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}

export const TREATMENTS: TreatmentInfo[] = [
  {
    id: "estetica-dental",
    badge: "Estética",
    name: "Estética dental",
    description: "Restauraciones y carillas con armonía facial.",
    priceFromCLP: 450000,
    image: "/images/tx-estetica.jpg",
    details:
      "Carillas, restauraciones y correcciones mínimamente invasivas alineadas al rostro. Evaluación digital incluida en el plan.",
  },
  {
    id: "blanqueamiento",
    badge: "Sonrisa",
    name: "Blanqueamiento profesional",
    description: "Aclaración segura y controlada en consulta.",
    priceFromCLP: 280000,
    image: "/images/tx-blanqueamiento.jpg",
    details:
      "Protocolo en consulta con control de sensibilidad. Incluye indicaciones de mantención domiciliaria.",
  },
  {
    id: "armonizacion",
    badge: "Facial",
    name: "Armonización facial",
    description: "Equilibrio sutil de volúmenes y proporciones.",
    priceFromCLP: 350000,
    image: "/images/tx-armonizacion.jpg",
    details:
      "Ácido hialurónico y protocolos de perfil (labios, mentón, pómulos, mandíbula) con resultado natural.",
  },
  {
    id: "toxina",
    badge: "Facial",
    name: "Toxina botulínica",
    description: "Suaviza líneas de expresión con naturalidad.",
    priceFromCLP: 180000,
    image: "/images/tx-toxina.jpg",
    details:
      "Tercio superior (frente, entrecejo, patas de gallo) y opciones de masaeteros. Control post a ~14 días.",
  },
  {
    id: "diseno-sonrisa",
    badge: "Digital",
    name: "Diseño de sonrisa",
    description: "Plan digital personalizado de su nueva sonrisa.",
    priceFromCLP: 520000,
    image: "/images/tx-diseno.jpg",
    details:
      "Diagnóstico digital, simulación y plan por etapas. Ideal antes de carillas o rehabilitación estética.",
  },
  {
    id: "mantencion",
    badge: "Seguimiento",
    name: "Mantención y control",
    description: "Seguimiento cercano para resultados duraderos.",
    priceFromCLP: 80000,
    image: "/images/tx-mantencion.jpg",
    details:
      "Controles post-tratamiento, retoques de toxina en ventana ideal y seguimiento de packs.",
  },
];

export const CLINIC = {
  name: "Dra. Macarena Fontecilla",
  specialty: "Estética dental y facial",
  city: "Vitacura, Santiago de Chile",
  address: "Av. Kennedy 7120, Oficina 306, Vitacura, Santiago",
  email: "contacto@dramacarenafontecilla.cl",
  whatsappDisplay: "+56 9 0000 0000",
  whatsappUrl: "https://wa.me/56900000000",
  hours:
    "Lunes a viernes 09:00–19:00 · Sábados 09:00–14:00 (con agenda previa). Domingos cerrado.",
  parking: "Estacionamiento en el edificio",
  approach:
    "Resultados naturales y precisión clínica. Atención privada 1:1, diagnóstico digital, plan claro y confidencialidad absoluta.",
  doctor: {
    title: "Cirujano Dentista",
    almaMater: "Universidad de los Andes",
    affiliations: [
      "Colegio de Cirujano Dentistas de Chile",
      "Sociedad de Odontología Estética",
    ],
    focus:
      "Atrae a pacientes que buscan un cambio preciso y discreto. Restaurar armonía y vitalidad sin exceso.",
  },
  benefits: [
    "Atención personalizada 1:1",
    "Agendamiento por WhatsApp",
    "Recordatorios automáticos",
    "Planes de tratamiento claros",
    "Discreción absoluta",
    "Estacionamiento en el edificio",
  ],
  faqs: [
    {
      q: "¿Cómo agendo?",
      a: "Por WhatsApp al +56 9 0000 0000 o pidiendo al asistente que le indique el enlace. También puede usar el botón «Agendar por WhatsApp» en la web.",
    },
    {
      q: "¿Dónde está la consulta?",
      a: "Av. Kennedy 7120, Oficina 306, Vitacura, Santiago. Hay estacionamiento en el edificio.",
    },
    {
      q: "¿Los precios son finales?",
      a: "Los valores publicados y el cotizador web son «desde» orientativos en CLP. El precio final está sujeto a evaluación presencial de la doctora según zonas, producto y objetivos.",
    },
    {
      q: "¿Hay cotizador en la web?",
      a: "Sí. En la sección Cotizador puede sumar o quitar tratamientos para ver un total aproximado. No es un presupuesto formal.",
    },
    {
      q: "¿Atención dental y facial?",
      a: "Sí: estética dental (carillas, blanqueamiento, diseño de sonrisa) y facial (toxina, armonización con ácido hialurónico, mantención).",
    },
  ],
} as const;

/** Plain-text brief injected into the voice agent on connect. */
export function buildWebsiteKnowledgeBrief(): string {
  const treatmentsBlock = TREATMENTS.map(
    (t) =>
      `- ${t.name} (${formatDesdeCLP(t.priceFromCLP)}): ${t.description} ${t.details}`
  ).join("\n");

  const faqBlock = CLINIC.faqs
    .map((f) => `P: ${f.q}\nR: ${f.a}`)
    .join("\n\n");

  return [
    `Eres el asistente de voz del sitio web de ${CLINIC.name}, consulta de ${CLINIC.specialty} en ${CLINIC.city}.`,
    "Responde solo con información de este sitio. Habla en español de Chile, usted, tono cálido y profesional.",
    "Si no sabes algo clínico específico, invita a agendar una evaluación. No inventes precios fuera de la lista.",
    "Puede mencionar el Cotizador (#cotizador) para estimar totales aproximados; siempre aclare que el precio final lo define la doctora.",
    "",
    "— Consulta —",
    `Dirección: ${CLINIC.address}`,
    `Email: ${CLINIC.email}`,
    `WhatsApp: ${CLINIC.whatsappDisplay} (${CLINIC.whatsappUrl})`,
    `Horario: ${CLINIC.hours}`,
    `Enfoque: ${CLINIC.approach}`,
    "",
    "— La doctora —",
    `${CLINIC.doctor.title}, egresada de ${CLINIC.doctor.almaMater}.`,
    CLINIC.doctor.focus,
    `Afiliaciones: ${CLINIC.doctor.affiliations.join("; ")}.`,
    "",
    "— Tratamientos y precios (CLP, «desde») —",
    treatmentsBlock,
    "",
    "— Beneficios —",
    CLINIC.benefits.map((b) => `- ${b}`).join("\n"),
    "",
    "— Preguntas frecuentes —",
    faqBlock,
  ].join("\n");
}

export function treatmentsAsPlainText(): string {
  return TREATMENTS.map(
    (t) =>
      `${t.name} — ${formatDesdeCLP(t.priceFromCLP)}. ${t.description} ${t.details}`
  ).join("\n");
}
