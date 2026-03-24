"use client";
import { KpiRow } from "@/components/cards/KpiRow";
import { GlobeMap } from "@/components/globe/GlobeMap";
import { RightPanel } from "@/components/fleet/RightPanel";
import { TelemetryRow } from "@/components/charts/TelemetryRow";
import { TELEMETRY } from "@/lib/mockData";

export default function Page() {
  return (
    <div
      className="flex flex-col gap-4 p-4 h-full"
      style={{ height: "calc(100vh - 56px)", overflowY: "auto" }}
    >
      {/* Row 1 — KPI Cards */}
      <KpiRow />

      {/* Row 2 — Globe + Right Panel */}
      <div className="flex gap-4 flex-1 min-h-0" style={{ minHeight: "380px" }}>
        <GlobeMap className="flex-1 min-w-0" />
        <RightPanel className="w-80 flex-shrink-0" />
      </div>

      {/* Row 3 — Telemetry Charts */}
      <TelemetryRow data={TELEMETRY} />
    </div>
  );
}
