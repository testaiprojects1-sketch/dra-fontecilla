# AURA — Panel de la Consulta

Panel interno demo para la consulta de la **Dra. Macarena Fontecilla**.

> AURA propone · usted aprueba

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Recharts
- Datos mock en `data/mock.ts` + `data/extended.ts` (simulados desde Google Sheets)

## Módulos

1. **Centro de Mando** — KPIs, agenda (diaria/semanal/mensual), aprobaciones, ElevenLabs (placeholder), gráficos, inactivos
2. **Acciones & Tareas** — tableros diaria / semanal / mensual
3. **Pacientes & Predicción** — lealtad, riesgo, leads
4. **KPIs & Simulador** — benchmarks + simulador de impacto
5. **Crecimiento Digital** — redes desde cero, 90 días, heatmap, plan de contenido

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) — pensado para demo a 1440px.
