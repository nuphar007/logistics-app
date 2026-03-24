import type { Vehicle, Route, LogisticsHub, TelemetryPoint, Alert, KpiStats } from "@/types";

export const HUBS: LogisticsHub[] = [
  { id: "hub-nyc", name: "New York Hub",     city: "New York",    coords: { lat: 40.71,  lng: -74.01  }, color: "#00d4ff" },
  { id: "hub-la",  name: "LA Distribution",  city: "Los Angeles", coords: { lat: 34.05,  lng: -118.24 }, color: "#00d4ff" },
  { id: "hub-chi", name: "Chicago Depot",    city: "Chicago",     coords: { lat: 41.88,  lng: -87.63  }, color: "#00d4ff" },
  { id: "hub-lon", name: "London Gateway",   city: "London",      coords: { lat: 51.51,  lng: -0.12   }, color: "#ff6b35" },
  { id: "hub-sin", name: "Singapore Port",   city: "Singapore",   coords: { lat: 1.35,   lng: 103.82  }, color: "#ff6b35" },
  { id: "hub-dxb", name: "Dubai Logistics",  city: "Dubai",       coords: { lat: 25.20,  lng: 55.27   }, color: "#ff6b35" },
  { id: "hub-sao", name: "São Paulo Hub",    city: "São Paulo",   coords: { lat: -23.55, lng: -46.63  }, color: "#00ff88" },
  { id: "hub-tok", name: "Tokyo Center",     city: "Tokyo",       coords: { lat: 35.69,  lng: 139.69  }, color: "#00d4ff" },
];

export const ROUTES: Route[] = [
  {
    id: "rt-001",
    origin: HUBS[0],
    destination: HUBS[3],
    status: "on-time",
    progress: 72,
    eta: new Date(Date.now() + 3 * 3600_000).toISOString(),
    distance: 5570,
    vehicleIds: ["v-001", "v-002"],
    arcColor: [255, 107, 53, 0.9],
  },
  {
    id: "rt-002",
    origin: HUBS[4],
    destination: HUBS[7],
    status: "delayed",
    progress: 45,
    eta: new Date(Date.now() + 8 * 3600_000).toISOString(),
    distance: 5320,
    vehicleIds: ["v-003"],
    arcColor: [255, 140, 0, 0.85],
  },
  {
    id: "rt-003",
    origin: HUBS[2],
    destination: HUBS[1],
    status: "on-time",
    progress: 90,
    eta: new Date(Date.now() + 1 * 3600_000).toISOString(),
    distance: 3240,
    vehicleIds: ["v-004", "v-005"],
    arcColor: [255, 107, 53, 0.95],
  },
  {
    id: "rt-004",
    origin: HUBS[5],
    destination: HUBS[3],
    status: "critical",
    progress: 20,
    eta: new Date(Date.now() + 14 * 3600_000).toISOString(),
    distance: 5500,
    vehicleIds: ["v-006"],
    arcColor: [255, 51, 102, 0.9],
  },
];

export const VEHICLES: Vehicle[] = [
  { id: "v-001", name: "TRK-0042", type: "truck",  status: "active",      speed: 88,  fuel: 74, lat: 45.0,  lng: -40.0,  routeId: "rt-001", driver: "J. Martinez",  lastUpdate: new Date().toISOString(), cargo: "Electronics" },
  { id: "v-002", name: "VAN-0017", type: "van",    status: "active",      speed: 95,  fuel: 61, lat: 47.5,  lng: -30.0,  routeId: "rt-001", driver: "A. Patel",     lastUpdate: new Date().toISOString(), cargo: "Pharmaceuticals" },
  { id: "v-003", name: "SHP-0008", type: "ship",   status: "active",      speed: 28,  fuel: 82, lat: 18.0,  lng: 121.0,  routeId: "rt-002", driver: "K. Tanaka",    lastUpdate: new Date().toISOString(), cargo: "Auto Parts" },
  { id: "v-004", name: "TRK-0031", type: "truck",  status: "active",      speed: 105, fuel: 44, lat: 38.5,  lng: -100.0, routeId: "rt-003", driver: "R. Johnson",   lastUpdate: new Date().toISOString(), cargo: "Food Grade" },
  { id: "v-005", name: "DRN-0003", type: "drone",  status: "active",      speed: 180, fuel: 90, lat: 36.0,  lng: -110.0, routeId: "rt-003", driver: "Auto-Pilot",   lastUpdate: new Date().toISOString(), cargo: "Medical Supplies" },
  { id: "v-006", name: "TRK-0055", type: "truck",  status: "maintenance", speed: 0,   fuel: 30, lat: 28.0,  lng: 42.0,   routeId: "rt-004", driver: "M. Al-Rashid", lastUpdate: new Date().toISOString(), cargo: "Hazmat Class B" },
  { id: "v-007", name: "VAN-0022", type: "van",    status: "idle",        speed: 0,   fuel: 95, lat: 41.88, lng: -87.63, routeId: null,     driver: "S. Williams",  lastUpdate: new Date().toISOString(), cargo: "—" },
  { id: "v-008", name: "TRK-0019", type: "truck",  status: "offline",     speed: 0,   fuel: 15, lat: 51.51, lng: -0.12,  routeId: null,     driver: "P. Davies",    lastUpdate: new Date(Date.now() - 3600_000).toISOString(), cargo: "—" },
];

export const TELEMETRY: TelemetryPoint[] = Array.from({ length: 24 }, (_, i) => {
  const t = new Date(Date.now() - (23 - i) * 600_000);
  const hh = t.getHours().toString().padStart(2, "0");
  const mm = t.getMinutes().toString().padStart(2, "0");
  return {
    time: `${hh}:${mm}`,
    speed: 70 + Math.round(Math.sin(i * 0.5) * 25 + (i % 5) * 3),
    fuel: 80 - Math.round(i * 1.2 + (i % 3)),
    temp: 62 + Math.round(Math.sin(i * 0.3) * 8 + (i % 4) * 2),
    load: 75 + Math.round(Math.cos(i * 0.4) * 12),
  };
});

export const ALERTS: Alert[] = [
  { id: "a-1", severity: "critical", message: "TRK-0055 engine fault detected",        vehicleId: "v-006", time: new Date(Date.now() - 1800_000).toISOString() },
  { id: "a-2", severity: "warning",  message: "SHP-0008 ETA delayed by 3 hours",       vehicleId: "v-003", time: new Date(Date.now() - 3600_000).toISOString() },
  { id: "a-3", severity: "warning",  message: "TRK-0031 fuel level below 50%",         vehicleId: "v-004", time: new Date(Date.now() - 5400_000).toISOString() },
  { id: "a-4", severity: "info",     message: "Route RT-003 approaching destination",  vehicleId: "v-004", time: new Date(Date.now() - 7200_000).toISOString() },
  { id: "a-5", severity: "critical", message: "TRK-0019 connectivity lost",            vehicleId: "v-008", time: new Date(Date.now() - 3600_000).toISOString() },
];

export const KPI_STATS: KpiStats = {
  activeRoutes: ROUTES.filter((r) => r.vehicleIds.length > 0).length,
  fleetSize: VEHICLES.length,
  onTimePct: Math.round((ROUTES.filter((r) => r.status === "on-time").length / ROUTES.length) * 100),
  alertCount: ALERTS.filter((a) => a.severity !== "info").length,
};
