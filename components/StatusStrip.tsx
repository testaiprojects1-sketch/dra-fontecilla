import { statusStrip } from "@/data/mock";

export default function StatusStrip() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
      <span className="tabular-nums text-ink">{statusStrip.fechaLabel}</span>
      <span className="text-line" aria-hidden>
        ·
      </span>
      <span>
        <span className="font-medium tabular-nums text-teal">
          {statusStrip.seguimientosPorContactar}
        </span>{" "}
        seguimientos por contactar
      </span>
      <span className="text-line" aria-hidden>
        ·
      </span>
      <span>
        <span className="font-medium tabular-nums text-teal">
          {statusStrip.pacientesNuevosMes}
        </span>{" "}
        pacientes nuevos este mes
      </span>
    </div>
  );
}
