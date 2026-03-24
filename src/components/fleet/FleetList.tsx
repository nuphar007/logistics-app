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
  { label: "ALL",    value: "all" },
  { label: "ACTIVE", value: "active" },
  { label: "IDLE",   value: "idle" },
  { label: "ALERT",  value: "maintenance" },
];

export function FleetList({ vehicles, selectedVehicleId, onSelect }: FleetListProps) {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered = filter === "all"
    ? vehicles
    : vehicles.filter((v) => v.status === filter);

  const activeCount = vehicles.filter((v) => v.status === "active").length;

  const getCounts = (val: FilterTab) =>
    val === "all" ? vehicles.length : vehicles.filter((v) => v.status === val).length;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className="label-xs"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            Fleet Status
          </span>
          {/* Live dot */}
          <div className="relative w-1.5 h-1.5">
            <div className="absolute inset-0 rounded-full" style={{ background: "#00ff88" }} />
            <span className="absolute inset-0 rounded-full animate-ping-slow" style={{ background: "#00ff88", opacity: 0.5 }} />
          </div>
        </div>
        <span
          className="px-2 py-0.5 rounded-md text-[10px] font-bold"
          style={{
            background: "rgba(0,255,136,0.1)",
            border: "1px solid rgba(0,255,136,0.2)",
            color: "#00ff88",
            fontFamily: "var(--font-mono), monospace",
            boxShadow: "0 0 8px rgba(0,255,136,0.1)",
          }}
        >
          {activeCount} online
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {TABS.map((tab) => {
          const active = filter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className="flex-1 py-1 rounded-lg transition-all duration-150 relative overflow-hidden"
              style={{
                background: active ? "rgba(255,107,53,0.12)" : "rgba(255,255,255,0.03)",
                border: active ? "1px solid rgba(255,107,53,0.3)" : "1px solid rgba(255,255,255,0.05)",
                boxShadow: active ? "0 0 12px rgba(255,107,53,0.1)" : "none",
              }}
            >
              {active && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, transparent, #ff6b35, transparent)" }}
                />
              )}
              <div className="flex flex-col items-center gap-0">
                <span
                  className="text-[9px] font-bold"
                  style={{
                    color: active ? "#ff6b35" : "rgba(255,255,255,0.3)",
                    fontFamily: "var(--font-orbitron), sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  {tab.label}
                </span>
                <span
                  className="text-[9px]"
                  style={{
                    color: active ? "rgba(255,107,53,0.6)" : "rgba(255,255,255,0.2)",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {getCounts(tab.value)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Vehicle list */}
      <div className="flex flex-col gap-0.5 overflow-y-auto pr-0.5" style={{ maxHeight: "256px" }}>
        {filtered.map((v, i) => (
          <VehicleRow
            key={v.id}
            vehicle={v}
            selected={selectedVehicleId === v.id}
            onClick={() => onSelect(v.id)}
            index={i}
          />
        ))}
        {filtered.length === 0 && (
          <p
            className="text-center py-5"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem" }}
          >
            NO VEHICLES IN FILTER
          </p>
        )}
      </div>
    </div>
  );
}
