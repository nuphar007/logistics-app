import { format, formatDistanceToNow } from "date-fns";
import type { VehicleStatus, RouteStatus } from "@/types";

export const formatEta = (iso: string): string =>
  format(new Date(iso), "HH:mm, MMM d");

export const timeAgo = (iso: string): string =>
  formatDistanceToNow(new Date(iso), { addSuffix: true });

export const statusColor: Record<VehicleStatus, string> = {
  active:      "#00ff88",
  idle:        "#ffcc00",
  maintenance: "#ff8c00",
  offline:     "#ff3366",
};

export const statusLabel: Record<VehicleStatus, string> = {
  active:      "Active",
  idle:        "Idle",
  maintenance: "Maintenance",
  offline:     "Offline",
};

export const routeStatusColor: Record<RouteStatus, string> = {
  "on-time": "#00ff88",
  "delayed":  "#ffcc00",
  "critical": "#ff3366",
};

export const fuelBarColor = (pct: number): string => {
  if (pct > 60) return "#00ff88";
  if (pct > 30) return "#ffcc00";
  return "#ff3366";
};

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(v, min), max);
