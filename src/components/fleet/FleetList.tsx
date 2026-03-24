"use client";
import { useState } from "react";
import { VehicleRow } from "./VehicleRow";
import type { Vehicle, VehicleStatus } from "@/types";

interface FleetListProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelect: (id: string) => void;
}

type FilterTab = "all" | VehicleStatus;

const TABS: { label: string; value: FilterTab }[] = [
  { label: "All",   value: "all" },
  { label: "Active", value: "active" },
  { label: "Idle",   value: "idle" },
  { label: "Alert",  value: "maintenance" },
];

export function FleetList({ vehicles, selectedVehicleId, onSelect }: FleetListProps) {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered = filter === "all"
    ? vehicles
    : vehicles.filter((v) => v.status === filter);

  const activeCount = vehicles.filter((v) => v.status === "active").length;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Fleet Status</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(0,255,136,0.12)", color: "#00ff88" }}
        >
          {activeCount} online
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className="flex-1 text-xs py-1 rounded-lg font-medium transition-all duration-150"
            style={{
              background: filter === tab.value ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
              color: filter === tab.value ? "#ff6b35" : "rgba(255,255,255,0.4)",
              border: filter === tab.value ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vehicle list */}
      <div className="flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: "260px" }}>
        {filtered.map((v) => (
          <VehicleRow
            key={v.id}
            vehicle={v}
            selected={selectedVehicleId === v.id}
            onClick={() => onSelect(v.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-white/30 text-center py-4">No vehicles in this filter</p>
        )}
      </div>
    </div>
  );
}
