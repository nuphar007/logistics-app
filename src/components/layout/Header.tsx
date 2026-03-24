"use client";
import { useEffect, useState } from "react";
import { Bell, ChevronRight, User } from "lucide-react";
import { format } from "date-fns";
import { KPI_STATS } from "@/lib/mockData";

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-5 py-3 flex-shrink-0"
      style={{
        background: "rgba(10,11,14,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-white/30 font-medium">FleetOS</span>
        <ChevronRight size={12} className="text-white/20" />
        <span className="text-white/70 font-semibold">Overview</span>
      </div>

      {/* Live clock */}
      <div className="flex flex-col items-center">
        <span
          className="text-sm font-mono font-semibold tracking-wider"
          style={{ color: "#00d4ff", textShadow: "0 0 12px rgba(0,212,255,0.7)" }}
        >
          {format(time, "HH:mm:ss")}
        </span>
        <span className="text-[10px] text-white/30 tracking-wide">
          {format(time, "EEEE, MMM d yyyy")}
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Alert bell */}
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.05] transition-all">
          <Bell size={15} className="text-white/50" />
          {KPI_STATS.alertCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={{ background: "#ff3366", color: "white", boxShadow: "0 0 8px rgba(255,51,102,0.5)" }}
            >
              {KPI_STATS.alertCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,153,204,0.1))",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <User size={14} style={{ color: "#00d4ff" }} />
        </div>
      </div>
    </header>
  );
}
