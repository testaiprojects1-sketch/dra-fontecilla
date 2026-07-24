/**
 * Knowledge base for the public voice assistant — mirrors website content
 * (Dra. Macarena Fontecilla · estética dental y facial · Vitacura).
 */

export interface TreatmentInfo {
  badge: string;
  name: string;
  description: string;
  price: string;
  image: string;
  details: string;
}

export const TREATMENTS: TreatmentInfo[] = [
  {
    badge: "Estética",
    name: "Estética dental",
    description: "Restauraciones y carillas con armonía facial.",
    price: "Desde $450.000",
    image: "/images/tx-estetica.jpg",
    details:
      "Carillas, restauraciones y correcciones mínimamente invasivas alineadas al rostro. Evaluación digital incluida en el plan.",
  },
  {
    badge: "Sonrisa",
    name: "Blanqueamiento profesional",
    description: "Aclaración segura y controlada en consulta.",
    price: "Desde $280.000",
    image: "/images/tx-blanqueamiento.jpg",
    details:
      "Protocolo en consulta con control de sensibilidad. Incluye indicaciones de mantención domiciliaria.",
  },
  {
    badge: "Facial",
    name: "Armonización facial",
    description: "Equilibrio sutil de volúmenes y proporciones.",
    price: "Desde $350.000",
    image: "/images/tx-armonizacion.jpg",
    details:
      "Ácido hialurónico y protocolos de perfil (labios, mentón, pómulos, mandíbula) con resultado natural.",
  },
  {
    badge: "Facial",
    name: "Toxina botulínica",
    description: "Suaviza líneas de expresión con naturalidad.",
    price: "Desde $180.000",
    image: "/images/tx-toxina.jpg",
    details:
      "Tercio superior (frente, entrecejo, patas de gallo) y opciones de masaeteros. Control post a ~14 días.",
  },
  {
    badge: "Digital",
    name: "Diseño de sonrisa",
    description: "Plan digital personalizado de su nueva sonrisa.",
    price: "Desde $520.000",
    image: "/images/tx-diseno.jpg",
    details:
      "Diagnóstico digital, simulación y plan por etapas. Ideal antes de carillas o rehabilitación estética.",
  },
  {
    badge: "Seguimiento",
    name: "Mantención y control",
    description: "Seguimiento cercano para resultados duraderos.",
    price: "Desde $80.000",
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
      a: "Los valores publicados son «desde» orientativos en CLP. El plan definitivo se confirma en la evaluación presencial según zonas, producto y objetivos.",
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
      `- ${t.name} (${t.price}): ${t.description} ${t.details}`
  ).join("\n");

  const faqBlock = CLINIC.faqs
    .map((f) => `P: ${f.q}\nR: ${f.a}`)
    .join("\n\n");

  return [
    `Eres el asistente de voz del sitio web de ${CLINIC.name}, consulta de ${CLINIC.specialty} en ${CLINIC.city}.`,
    "Responde solo con información de este sitio. Habla en español de Chile, usted, tono cálido y profesional.",
    "Si no sabes algo clínico específico, invita a agendar una evaluación. No inventes precios fuera de la lista.",
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
    (t) => `${t.name} — ${t.price}. ${t.description} ${t.details}`
  ).join("\n");
}
