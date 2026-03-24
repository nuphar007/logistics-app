"use client";
import { StatusDot } from "@/components/ui/StatusDot";
import { fuelBarColor, statusLabel } from "@/lib/utils";
import type { Vehicle } from "@/types";
import { Truck, Package, Navigation, Anchor } from "lucide-react";

interface VehicleRowProps {
  vehicle: Vehicle;
  selected: boolean;
  onClick: () => void;
}

const typeIcon = {
  truck: Truck,
  van:   Package,
  drone: Navigation,
  ship:  Anchor,
};

export function VehicleRow({ vehicle, selected, onClick }: VehicleRowProps) {
  const Icon = typeIcon[vehicle.type] ?? Truck;

  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150"
      style={{
        background: selected ? "rgba(255,107,53,0.08)" : "transparent",
        borderLeft: selected ? "2px solid #ff6b35" : "2px solid transparent",
      }}
    >
      {/* Status + Icon */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusDot status={vehicle.status} pulse={vehicle.status === "active"} size="sm" />
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Icon size={13} className="text-white/60" />
        </div>
      </div>

      {/* Name + Driver */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white/90 truncate">{vehicle.name}</p>
        <p className="text-xs text-white/40 truncate">{vehicle.driver}</p>
      </div>

      {/* Speed + Fuel */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className="text-xs font-mono" style={{ color: "#00d4ff" }}>
          {vehicle.speed > 0 ? `${vehicle.speed} km/h` : statusLabel[vehicle.status]}
        </span>
        {/* Fuel bar */}
        <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${vehicle.fuel}%`,
              background: fuelBarColor(vehicle.fuel),
              boxShadow: `0 0 4px ${fuelBarColor(vehicle.fuel)}`,
            }}
          />
        </div>
      </div>
    </button>
  );
}
