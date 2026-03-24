"use client";
import { statusColor } from "@/lib/utils";
import type { VehicleStatus } from "@/types";

interface StatusDotProps {
  status: VehicleStatus;
  pulse?: boolean;
  size?: "sm" | "md";
}

export function StatusDot({ status, pulse = false, size = "md" }: StatusDotProps) {
  const color = statusColor[status];
  const dim = size === "sm" ? "8px" : "10px";

  if (pulse && status === "active") {
    return (
      <span className="relative inline-flex" style={{ width: dim, height: dim }}>
        <span
          className="absolute inline-flex rounded-full animate-ping-slow"
          style={{ width: dim, height: dim, background: color, opacity: 0.5 }}
        />
        <span
          className="relative inline-flex rounded-full"
          style={{ width: dim, height: dim, background: color, boxShadow: `0 0 6px ${color}` }}
        />
      </span>
    );
  }

  return (
    <span
      className="inline-flex rounded-full flex-shrink-0"
      style={{ width: dim, height: dim, background: color, boxShadow: `0 0 5px ${color}` }}
    />
  );
}
