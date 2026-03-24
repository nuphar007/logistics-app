"use client";
import { useState } from "react";
import { FleetList } from "./FleetList";
import { RouteDetails } from "./RouteDetails";
import { VEHICLES, ROUTES } from "@/lib/mockData";
import { cn } from "@/lib/cn";

interface RightPanelProps {
  className?: string;
}

export function RightPanel({ className }: RightPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedVehicle = VEHICLES.find((v) => v.id === selectedId) ?? null;
  const selectedRoute = selectedVehicle?.routeId
    ? ROUTES.find((r) => r.id === selectedVehicle.routeId) ?? null
    : null;

  return (
    <div className={cn("flex flex-col gap-3 overflow-hidden", className)}>
      <div className="glass-panel p-4 flex-1 overflow-hidden flex flex-col gap-3">
        <FleetList
          vehicles={VEHICLES}
          selectedVehicleId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <RouteDetails route={selectedRoute} />
    </div>
  );
}
