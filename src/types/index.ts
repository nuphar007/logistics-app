export type VehicleStatus = "active" | "idle" | "maintenance" | "offline";
export type RouteStatus = "on-time" | "delayed" | "critical";
export type VehicleType = "truck" | "drone" | "van" | "ship";
export type AlertSeverity = "critical" | "warning" | "info";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LogisticsHub {
  id: string;
  name: string;
  city: string;
  coords: Coordinates;
  color: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  status: VehicleStatus;
  speed: number;
  fuel: number;
  lat: number;
  lng: number;
  routeId: string | null;
  driver: string;
  lastUpdate: string;
  cargo: string;
}

export interface Route {
  id: string;
  origin: LogisticsHub;
  destination: LogisticsHub;
  status: RouteStatus;
  progress: number;
  eta: string;
  distance: number;
  vehicleIds: string[];
  arcColor: [number, number, number, number];
}

export interface TelemetryPoint {
  time: string;
  speed: number;
  fuel: number;
  temp: number;
  load: number;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  vehicleId?: string;
  time: string;
}

export interface KpiStats {
  activeRoutes: number;
  fleetSize: number;
  onTimePct: number;
  alertCount: number;
}
