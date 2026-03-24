"use client";
import { Route, Truck, CheckCircle, AlertTriangle } from "lucide-react";
import { StatCard } from "./StatCard";
import { KPI_STATS } from "@/lib/mockData";

export function KpiRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        title="Active Routes"
        value={KPI_STATS.activeRoutes}
        subtitle="Cross-continental"
        icon={Route}
        accentColor="blue"
        trend={{ value: 12, direction: "up" }}
        index={0}
      />
      <StatCard
        title="Fleet Size"
        value={KPI_STATS.fleetSize}
        subtitle="Vehicles tracked"
        icon={Truck}
        accentColor="orange"
        trend={{ value: 3, direction: "up" }}
        index={1}
      />
      <StatCard
        title="On-Time Rate"
        value={`${KPI_STATS.onTimePct}%`}
        subtitle="Last 24 hours"
        icon={CheckCircle}
        accentColor="green"
        trend={{ value: 5, direction: "up" }}
        index={2}
      />
      <StatCard
        title="Active Alerts"
        value={KPI_STATS.alertCount}
        subtitle={`${KPI_STATS.alertCount} need attention`}
        icon={AlertTriangle}
        accentColor="red"
        trend={{ value: 2, direction: "down" }}
        index={3}
      />
    </div>
  );
}
