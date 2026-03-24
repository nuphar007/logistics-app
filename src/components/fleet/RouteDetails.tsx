"use client";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { formatEta } from "@/lib/utils";
import type { Route } from "@/types";

interface RouteDetailsProps {
  route: Route | null;
}

const statusBadgeColor = {
  "on-time": "green" as const,
  "delayed":  "yellow" as const,
  "critical": "red" as const,
};

export function RouteDetails({ route }: RouteDetailsProps) {
  if (!route) {
    return (
      <div className="glass-panel p-4 flex flex-col items-center justify-center gap-2" style={{ minHeight: "120px" }}>
        <MapPin size={20} className="text-white/20" />
        <p className="text-xs text-white/30">Select a vehicle to view route</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40">{route.id.toUpperCase()}</span>
        <GlowBadge
          label={route.status.replace("-", " ")}
          color={statusBadgeColor[route.status]}
          size="xs"
        />
      </div>

      {/* Origin → Destination */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/40">From</p>
          <p className="text-sm font-semibold text-white/90 truncate">{route.origin.city}</p>
        </div>
        <ArrowRight size={14} style={{ color: "#ff6b35", flexShrink: 0 }} />
        <div className="flex-1 min-w-0 text-right">
          <p className="text-xs text-white/40">To</p>
          <p className="text-sm font-semibold text-white/90 truncate">{route.destination.city}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/40">Progress</span>
          <span className="text-xs font-semibold" style={{ color: "#ff6b35" }}>{route.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${route.progress}%`,
              background: "linear-gradient(90deg, #ff6b35, #ff8c00)",
              boxShadow: "0 0 8px rgba(255,107,53,0.6)",
            }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-3">
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-white/30" />
          <span className="text-xs text-white/50">ETA {formatEta(route.eta)}</span>
        </div>
        <span className="text-xs text-white/30">{route.distance.toLocaleString()} km</span>
        <span className="text-xs text-white/30">{route.vehicleIds.length} vehicle{route.vehicleIds.length !== 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}
