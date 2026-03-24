"use client";
import { TelemetryChart } from "./TelemetryChart";
import type { TelemetryPoint } from "@/types";

interface TelemetryRowProps {
  data: TelemetryPoint[];
}

const CHARTS = [
  { metric: "speed" as const, color: "#00d4ff", label: "Avg Speed",    unit: " km/h" },
  { metric: "fuel"  as const, color: "#ff6b35", label: "Fuel Level",   unit: "%" },
  { metric: "temp"  as const, color: "#00ff88", label: "Engine Temp",  unit: "°C" },
  { metric: "load"  as const, color: "#ffcc00", label: "Cargo Load",   unit: "%" },
];

export function TelemetryRow({ data }: TelemetryRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CHARTS.map((c) => (
        <div key={c.metric} className="glass-panel p-4">
          <TelemetryChart
            metric={c.metric}
            data={data}
            color={c.color}
            label={c.label}
            unit={c.unit}
          />
        </div>
      ))}
    </div>
  );
}
