export type CitaEstado = "Confirmada" | "Sin respuesta" | "Cancelada";

export type Prioridad = "Alta" | "Media" | "Baja";

export type NavId =
  | "hoy"
  | "agenda"
  | "presupuestos"
  | "pacientes"
  | "contenido"
  | "ajustes";

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
  origen: "sistema" | "campaña";
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
