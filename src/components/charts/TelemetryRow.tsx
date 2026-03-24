"use client";
import { TelemetryChart } from "./TelemetryChart";
import type { TelemetryPoint } from "@/types";

interface TelemetryRowProps {
  data: TelemetryPoint[];
}

const CHARTS = [
  { metric: "speed" as const, color: "#00d4ff", label: "Avg Speed",   unit: " km/h" },
  { metric: "fuel"  as const, color: "#ff6b35", label: "Fuel Level",  unit: "%" },
  { metric: "temp"  as const, color: "#00ff88", label: "Engine Temp", unit: "°C" },
  { metric: "load"  as const, color: "#ffcc00", label: "Cargo Load",  unit: "%" },
];

export function TelemetryRow({ data }: TelemetryRowProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Section header */}
      <div className="flex items-center gap-3 px-1">
        <span
          className="label-xs"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          Live Telemetry
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.55rem",
            color: "rgba(0,212,255,0.4)",
          }}
        >
          STREAMING
        </span>
        <div className="w-1.5 h-1.5 rounded-full animate-glow-pulse" style={{ background: "#00d4ff" }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CHARTS.map((c) => (
          <div
            key={c.metric}
            className="p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.018) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c.color}55, transparent)` }}
            />
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
    </div>
  );
}
