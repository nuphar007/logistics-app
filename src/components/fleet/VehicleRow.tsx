"use client";
import { motion } from "framer-motion";
import { StatusDot } from "@/components/ui/StatusDot";
import { fuelBarColor, statusLabel } from "@/lib/utils";
import type { Vehicle } from "@/types";
import { Truck, Package, Navigation, Anchor } from "lucide-react";

interface VehicleRowProps {
  vehicle: Vehicle;
  selected: boolean;
  onClick: () => void;
  index?: number;
}

const typeIcon = {
  truck: Truck,
  van:   Package,
  drone: Navigation,
  ship:  Anchor,
};

const statusColor: Record<string, string> = {
  active:      "#00ff88",
  idle:        "#00d4ff",
  maintenance: "#ff3366",
  offline:     "rgba(255,255,255,0.2)",
};

export function VehicleRow({ vehicle, selected, onClick, index = 0 }: VehicleRowProps) {
  const Icon = typeIcon[vehicle.type] ?? Truck;
  const sColor = statusColor[vehicle.status] ?? "rgba(255,255,255,0.2)";

  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors duration-150 relative overflow-hidden group"
      style={{
        background: selected ? "rgba(255,107,53,0.07)" : "transparent",
      }}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      whileHover={{ backgroundColor: selected ? "rgba(255,107,53,0.09)" : "rgba(255,255,255,0.025)" }}
    >
      {/* Selected indicator */}
      {selected && (
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
          style={{ background: "#ff6b35", boxShadow: "0 0 8px rgba(255,107,53,0.8)" }}
        />
      )}

      {/* Status dot */}
      <div className="flex-shrink-0">
        <StatusDot status={vehicle.status} pulse={vehicle.status === "active"} size="sm" />
      </div>

      {/* Type icon */}
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: selected ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${selected ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <Icon size={11} style={{ color: selected ? "#ff6b35" : sColor, opacity: selected ? 1 : 0.7 }} />
      </div>

      {/* Name + Driver */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-bold truncate"
          style={{
            color: selected ? "#ff6b35" : "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.04em",
          }}
        >
          {vehicle.name}
        </p>
        <p
          className="truncate mt-0.5"
          style={{ color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem" }}
        >
          {vehicle.driver}
        </p>
      </div>

      {/* Speed + Fuel bar */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span
          className="font-bold"
          style={{
            color: vehicle.speed > 0 ? "#00d4ff" : "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
          }}
        >
          {vehicle.speed > 0 ? `${vehicle.speed}` : statusLabel[vehicle.status]}
          {vehicle.speed > 0 && (
            <span style={{ color: "rgba(0,212,255,0.5)", fontSize: "0.55rem" }}> km/h</span>
          )}
        </span>
        {/* Fuel bar */}
        <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${vehicle.fuel}%`,
              background: fuelBarColor(vehicle.fuel),
              boxShadow: `0 0 5px ${fuelBarColor(vehicle.fuel)}`,
            }}
          />
        </div>
      </div>
    </motion.button>
  );
}
