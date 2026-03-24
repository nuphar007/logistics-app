"use client";
import { motion } from "framer-motion";
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
      <div
        className="p-4 flex flex-col items-center justify-center gap-2"
        style={{
          minHeight: "112px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          backdropFilter: "blur(20px)",
        }}
      >
        <MapPin size={18} style={{ color: "rgba(255,255,255,0.15)" }} />
        <p
          style={{
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
          }}
        >
          SELECT VEHICLE TO VIEW ROUTE
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.018) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.6), transparent)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="label-xs"
          style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          {route.id.toUpperCase()}
        </span>
        <GlowBadge
          label={route.status.replace("-", " ")}
          color={statusBadgeColor[route.status]}
          size="xs"
        />
      </div>

      {/* Origin → Destination */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", letterSpacing: "0.08em" }}>FROM</p>
          <p className="text-xs font-semibold truncate" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-orbitron), sans-serif", fontSize: "0.65rem" }}>
            {route.origin.city}
          </p>
        </div>
        <ArrowRight size={13} style={{ color: "#ff6b35", flexShrink: 0 }} />
        <div className="flex-1 min-w-0 text-right">
          <p style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", letterSpacing: "0.08em" }}>TO</p>
          <p className="text-xs font-semibold truncate" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-orbitron), sans-serif", fontSize: "0.65rem" }}>
            {route.destination.city}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem" }}>PROGRESS</span>
          <span
            className="font-bold"
            style={{ color: "#ff6b35", fontFamily: "var(--font-mono), monospace", fontSize: "0.65rem" }}
          >
            {route.progress}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${route.progress}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(90deg, #ff6b35, #ffcc00)",
              boxShadow: "0 0 10px rgba(255,107,53,0.7)",
            }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <Clock size={10} style={{ color: "rgba(255,255,255,0.25)" }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem" }}>
            ETA {formatEta(route.eta)}
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem" }}>
          {route.distance.toLocaleString()} km
        </span>
      </div>
    </motion.div>
  );
}
