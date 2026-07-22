/**
 * =============================================================================
 * AURA — Datos adicionales de demostración (v2 módulos)
 * =============================================================================
 * Simulación: estos datos se complementarían desde Google Sheets / Dentalink.
 * Seed liviano para demo — los módulos se llenan solos con cada paciente real.
 * =============================================================================
 */

import type {
  BenchmarkKpi,
  GrowthPoint,
  HeatCell,
  LeadCard,
  LoyaltyBucket,
  PatientCard,
  RiskStat,
  StatusStripData,
  TaskItem,
  TrendPoint,
} from "@/types";

export const statusStrip: StatusStripData = {
  fechaLabel: "Miércoles 22 de julio de 2026",
  seguimientosPorContactar: 7,
  pacientesNuevosMes: 4,
};

export const initialTasks: TaskItem[] = [
  // Diaria
  {
    id: "t01",
    titulo: "Confirmar cita 12:00 — C. Figueroa",
    owner: "Enfermera",
    rationale: "Sin respuesta hace 18 h · evita no-show de $95.000",
    recuperableCLP: 95000,
    cadencia: "diaria",
    estado: "abierta",
  },
  {
    id: "t02",
    titulo: "Cobrar saldo M. Pérez — $180.000",
    owner: "Dra. Macarena",
    rationale: "Factura vencida 12 días · recuperable $180.000",
    recuperableCLP: 180000,
    cadencia: "diaria",
    estado: "abierta",
  },
  {
    id: "t03",
    titulo: "Reasignar cupo 16:30 (cancelación V. Contreras)",
    owner: "Enfermera",
    rationale: "Cupo liberado · lista de espera con 2 candidatas",
    cadencia: "diaria",
    estado: "abierta",
  },
  {
    id: "t04",
    titulo: "Preparar kit armonización — A. Morales 15:00",
    owner: "Enfermera",
    rationale: "Sesión 2 de 3 · protocolo listo en ficha",
    cadencia: "diaria",
    estado: "cerrada",
  },
  // Semanal
  {
    id: "t05",
    titulo: "Seguimiento presupuesto #1042 — I. Castro",
    owner: "Dra. Macarena",
    rationale: "Emitido hace 11 días · $450.000 en pipeline",
    recuperableCLP: 450000,
    cadencia: "semanal",
    estado: "abierta",
  },
  {
    id: "t06",
    titulo: "Campaña reactivación — 5 pacientes 9+ meses",
    owner: "Dra. Macarena",
    rationale: "Prioridad Alta · ~$6.2 M histórico acumulado",
    recuperableCLP: 2100000,
    cadencia: "semanal",
    estado: "abierta",
  },
  {
    id: "t07",
    titulo: "Revisar lista de espera jueves–viernes",
    owner: "Enfermera",
    rationale: "3 cupos abiertos · relleno reduce ociosidad",
    cadencia: "semanal",
    estado: "abierta",
  },
  {
    id: "t08",
    titulo: "Aprobar piezas WhatsApp de la semana",
    owner: "Dra. Macarena",
    rationale: "4 borradores en cola de AURA",
    cadencia: "semanal",
    estado: "bloqueada",
  },
  // Mensual
  {
    id: "t09",
    titulo: "Lanzar membresía control semestral",
    owner: "Dra. Macarena",
    rationale: "Meta: 8 altas · ingreso recurrente estimado $1,6 M/año",
    recuperableCLP: 1600000,
    cadencia: "mensual",
    estado: "abierta",
  },
  {
    id: "t10",
    titulo: "Auditoría de controles vencidos 6 meses",
    owner: "Enfermera",
    rationale: "12 pacientes · pérdida potencial $3,4 M a 1 año",
    recuperableCLP: 3400000,
    cadencia: "mensual",
    estado: "abierta",
  },
  {
    id: "t11",
    titulo: "Calibrar ticket promedio vs. industria",
    owner: "Dra. Macarena",
    rationale: "Actual $285k · meta $340k · gap en packs faciales",
    cadencia: "mensual",
    estado: "abierta",
  },
  {
    id: "t12",
    titulo: "Plan de contenido primeros 90 días",
    owner: "Dra. Macarena",
    rationale: "Cuentas en cero · AURA propone calendario semanal",
    cadencia: "mensual",
    estado: "bloqueada",
  },
];

/** Seed liviano — módulos se llenan solos con cada paciente. */
export const patientCards: PatientCard[] = [
  {
    id: "pc01",
    nombre: "Francisco Valdés",
    iniciales: "FV",
    lealtad: "VIP",
    edad: 42,
    ultimoTratamiento: "Diseño de sonrisa",
    sesionActual: 3,
    sesionTotal: 4,
    lifetimeValue: 2100000,
  },
  {
    id: "pc02",
    nombre: "María Pérez González",
    iniciales: "MP",
    lealtad: "Regular",
    edad: 38,
    ultimoTratamiento: "Sesión de plan",
    sesionActual: 1,
    sesionTotal: 3,
    lifetimeValue: 890000,
    alerta: "Plan a medio terminar",
  },
  {
    id: "pc03",
    nombre: "Lorena Aguilar",
    iniciales: "LA",
    lealtad: "En riesgo",
    edad: 45,
    ultimoTratamiento: "Control post-tratamiento",
    lifetimeValue: 1420000,
    alerta: "Sin actividad 313 días",
  },
  {
    id: "pc04",
    nombre: "Isidora Castro",
    iniciales: "IC",
    lealtad: "VIP",
    edad: 34,
    ultimoTratamiento: "Armonización facial",
    sesionActual: 2,
    sesionTotal: 3,
    lifetimeValue: 1490000,
  },
  {
    id: "pc05",
    nombre: "Gonzalo Pizarro",
    iniciales: "GP",
    lealtad: "En riesgo",
    edad: 51,
    ultimoTratamiento: "Blanqueamiento",
    lifetimeValue: 980000,
    alerta: "Control vencido hace 142 días",
  },
  {
    id: "pc06",
    nombre: "Constanza Figueroa",
    iniciales: "CF",
    lealtad: "Regular",
    edad: 29,
    ultimoTratamiento: "Control post-tratamiento",
    lifetimeValue: 980000,
    alerta: "Control vencido hace 8 días",
  },
];

export const loyaltyBuckets: LoyaltyBucket[] = [
  {
    tier: "VIP",
    count: 6,
    recuperableCLP: 0,
    note: "Retener con controles y packs — base sólida",
  },
  {
    tier: "Regular",
    count: 14,
    recuperableCLP: 980000,
    note: "campaña dirigida ≈ $980.000 recuperable",
  },
  {
    tier: "En riesgo",
    count: 8,
    recuperableCLP: 4200000,
    note: "campaña dirigida ≈ $4.200.000 recuperable",
  },
];

export const riskStats: RiskStat[] = [
  {
    id: "r1",
    label: "Controles vencidos 6m",
    value: "12",
    hint: "Pacientes sin control en el semestre",
  },
  {
    id: "r2",
    label: "Riesgo anual de fuga",
    value: "18%",
    hint: "Proyección sobre cartera activa",
  },
  {
    id: "r3",
    label: "Pérdida potencial a 1 año",
    value: "$3.400.000",
    hint: "LTV en riesgo si no se reactiva",
  },
];

export const leadCards: LeadCard[] = [
  {
    id: "l01",
    nombre: "Amanda Riquelme",
    probabilidad: 72,
    ocupacion: "Arquitecta",
    comuna: "Vitacura",
    canal: "Instagram",
    tratamientoSugerido: "Evaluación + diseño de sonrisa",
    ingresoMensualEst: 2800000,
  },
  {
    id: "l02",
    nombre: "Martín Orellana",
    probabilidad: 54,
    ocupacion: "Emprendedor",
    comuna: "Las Condes",
    canal: "Referido",
    tratamientoSugerido: "Armonización facial",
    ingresoMensualEst: 3500000,
  },
  {
    id: "l03",
    nombre: "Pía Sandoval",
    probabilidad: 41,
    ocupacion: "Abogada",
    comuna: "Providencia",
    canal: "Google",
    tratamientoSugerido: "Blanqueamiento + control",
    ingresoMensualEst: 2200000,
  },
];

export const benchmarkKpis: BenchmarkKpi[] = [
  {
    id: "ticket",
    label: "Ticket promedio",
    actual: 285000,
    industria: 310000,
    meta: 340000,
    format: "clp",
  },
  {
    id: "ltv",
    label: "LTV",
    actual: 1180000,
    industria: 1350000,
    meta: 1600000,
    format: "clp",
  },
  {
    id: "vip",
    label: "% VIP",
    actual: 20,
    industria: 18,
    meta: 28,
    format: "percent",
  },
  {
    id: "controles",
    label: "Controles a tiempo",
    actual: 62,
    industria: 71,
    meta: 85,
    format: "percent",
  },
];

export const trendSeries: TrendPoint[] = [
  { mes: "Feb", ticket: 250000, ltv: 980000, vip: 14, controles: 55 },
  { mes: "Mar", ticket: 260000, ltv: 1020000, vip: 15, controles: 57 },
  { mes: "Abr", ticket: 268000, ltv: 1080000, vip: 16, controles: 58 },
  { mes: "May", ticket: 275000, ltv: 1120000, vip: 18, controles: 60 },
  { mes: "Jun", ticket: 280000, ltv: 1150000, vip: 19, controles: 61 },
  { mes: "Jul", ticket: 285000, ltv: 1180000, vip: 20, controles: 62 },
];

/** Base anual de ingresos de la consulta (demo). */
export const ingresoAnualBase = 48000000;

export const simulatorDefaults = {
  noShow: 8,
  controles: 12,
  leads: 10,
  membresia: 5,
};

/** Contribución CLP/año por punto porcentual de cada palanca. */
export const simulatorWeights = {
  noShow: 95000,
  controles: 180000,
  leads: 220000,
  membresia: 310000,
};

export const growthSeries: GrowthPoint[] = Array.from({ length: 13 }, (_, i) => {
  const dia = i * 7;
  return {
    dia,
    alcance: Math.round(i * i * 12 + i * 8),
    seguidores: Math.round(i * i * 1.8 + i * 2),
    metaAlcance: Math.round(dia * 18 + 40),
  };
});

export const heatDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const heatHours = ["09", "11", "13", "15", "17", "19"];

/** Referencia sector salud-estética Chile (demo). */
export const heatCells: HeatCell[] = [
  { dia: "Lun", hora: "09", valor: 2 },
  { dia: "Lun", hora: "11", valor: 4 },
  { dia: "Lun", hora: "13", valor: 3 },
  { dia: "Lun", hora: "15", valor: 5 },
  { dia: "Lun", hora: "17", valor: 6 },
  { dia: "Lun", hora: "19", valor: 4 },
  { dia: "Mar", hora: "09", valor: 3 },
  { dia: "Mar", hora: "11", valor: 5 },
  { dia: "Mar", hora: "13", valor: 4 },
  { dia: "Mar", hora: "15", valor: 7 },
  { dia: "Mar", hora: "17", valor: 8 },
  { dia: "Mar", hora: "19", valor: 5 },
  { dia: "Mié", hora: "09", valor: 3 },
  { dia: "Mié", hora: "11", valor: 6 },
  { dia: "Mié", hora: "13", valor: 5 },
  { dia: "Mié", hora: "15", valor: 7 },
  { dia: "Mié", hora: "17", valor: 9 },
  { dia: "Mié", hora: "19", valor: 6 },
  { dia: "Jue", hora: "09", valor: 4 },
  { dia: "Jue", hora: "11", valor: 6 },
  { dia: "Jue", hora: "13", valor: 5 },
  { dia: "Jue", hora: "15", valor: 8 },
  { dia: "Jue", hora: "17", valor: 9 },
  { dia: "Jue", hora: "19", valor: 7 },
  { dia: "Vie", hora: "09", valor: 3 },
  { dia: "Vie", hora: "11", valor: 5 },
  { dia: "Vie", hora: "13", valor: 4 },
  { dia: "Vie", hora: "15", valor: 6 },
  { dia: "Vie", hora: "17", valor: 7 },
  { dia: "Vie", hora: "19", valor: 8 },
  { dia: "Sáb", hora: "09", valor: 5 },
  { dia: "Sáb", hora: "11", valor: 8 },
  { dia: "Sáb", hora: "13", valor: 7 },
  { dia: "Sáb", hora: "15", valor: 4 },
  { dia: "Sáb", hora: "17", valor: 2 },
  { dia: "Sáb", hora: "19", valor: 1 },
];
