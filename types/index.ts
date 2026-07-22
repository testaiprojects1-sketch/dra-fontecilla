export type CitaEstado = "Confirmada" | "Sin respuesta" | "Cancelada";

export type Prioridad = "Alta" | "Media" | "Baja";

export type NavId =
  | "centro"
  | "acciones"
  | "pacientes"
  | "kpis"
  | "crecimiento";

export type Cadencia = "diaria" | "semanal" | "mensual";

export type TaskOwner = "Dra. Macarena" | "Enfermera";

export type TaskEstado = "abierta" | "cerrada" | "bloqueada";

export type LoyaltyTier = "VIP" | "Regular" | "En riesgo" | "Lead";

export interface Paciente {
  id: string;
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  ultimaVisita: string;
  valorHistorico: number;
  activo: boolean;
  prioridad?: Prioridad;
}

export interface Cita {
  id: string;
  fecha: string;
  hora: string;
  pacienteId: string;
  pacienteNombre: string;
  tratamiento: string;
  estado: CitaEstado;
}

export interface Presupuesto {
  id: string;
  numero: number;
  pacienteId: string;
  pacienteNombre: string;
  monto: number;
  estado: "Emitido" | "Seguido" | "Aceptado" | "Pendiente seguimiento";
  fechaEmision: string;
}

export interface ApprovalItem {
  id: string;
  titulo: string;
  mensajeWhatsApp: string;
  origen: "sistema" | "campaña" | "contenido";
}

export interface KpiTrend {
  label: string;
  direction: "up" | "down" | "flat";
}

export interface WeeklyCitasPoint {
  semana: string;
  citas: number;
}

export interface FunnelPoint {
  etapa: string;
  cantidad: number;
}

export interface TaskItem {
  id: string;
  titulo: string;
  owner: TaskOwner;
  rationale: string;
  recuperableCLP?: number;
  cadencia: Cadencia;
  estado: TaskEstado;
}

export interface PatientCard {
  id: string;
  nombre: string;
  iniciales: string;
  lealtad: LoyaltyTier;
  edad: number;
  ultimoTratamiento: string;
  sesionActual?: number;
  sesionTotal?: number;
  lifetimeValue: number;
  alerta?: string;
}

export interface LoyaltyBucket {
  tier: Exclude<LoyaltyTier, "Lead">;
  count: number;
  recuperableCLP: number;
  note: string;
}

export interface RiskStat {
  id: string;
  label: string;
  value: string;
  hint: string;
}

export interface LeadCard {
  id: string;
  nombre: string;
  probabilidad: number;
  ocupacion: string;
  comuna: string;
  canal: string;
  tratamientoSugerido: string;
  ingresoMensualEst: number;
}

export interface BenchmarkKpi {
  id: string;
  label: string;
  actual: number;
  industria: number;
  meta: number;
  format: "clp" | "percent" | "number";
}

export interface TrendPoint {
  mes: string;
  ticket: number;
  ltv: number;
  vip: number;
  controles: number;
}

export interface GrowthPoint {
  dia: number;
  alcance: number;
  seguidores: number;
  metaAlcance: number;
}

export interface HeatCell {
  dia: string;
  hora: string;
  valor: number;
}

export interface StatusStripData {
  fechaLabel: string;
  seguimientosPorContactar: number;
  pacientesNuevosMes: number;
}
