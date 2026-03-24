"use client";
import { useEffect, useState } from "react";
import { Bell, ChevronRight, User, Shield, Wifi, Activity } from "lucide-react";
import { format } from "date-fns";
import { KPI_STATS } from "@/lib/mockData";

const SYS_INDICATORS = [
  { icon: Wifi,     label: "NET",  color: "#00ff88", status: "LIVE" },
  { icon: Shield,   label: "SEC",  color: "#00d4ff", status: "OK" },
  { icon: Activity, label: "SYS",  color: "#ff6b35", status: "98%" },
];

export function Header() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-5 flex-shrink-0"
      style={{
        height: "52px",
        background: "rgba(6,7,9,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Left — Breadcrumb */}
      <div className="flex items-center gap-2">
        <span
          className="font-bold tracking-widest text-white/25"
          style={{ fontFamily: "var(--font-orbitron), sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em" }}
        >
          FLEET<span style={{ color: "rgba(255,107,53,0.5)" }}>OS</span>
        </span>
        <ChevronRight size={11} style={{ color: "rgba(255,255,255,0.15)" }} />
        <span
          className="font-semibold tracking-widest"
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          OVERVIEW
        </span>

        {/* Divider */}
        <div className="w-px h-4 mx-2" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* System status indicators */}
        <div className="flex items-center gap-3">
          {SYS_INDICATORS.map(({ icon: Icon, label, color, status }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={10} style={{ color, opacity: 0.7 }} />
              <span
                className="tracking-wider"
                style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.28)" }}
              >
                {label}
              </span>
              <span
                style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.58rem", color, opacity: 0.75 }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center — Live clock */}
      <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        <span
          className="font-bold tracking-widest animate-glow-pulse"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.95rem",
            color: "#00d4ff",
            textShadow: "0 0 16px rgba(0,212,255,0.8), 0 0 32px rgba(0,212,255,0.25)",
            letterSpacing: "0.1em",
          }}
        >
          {time ? format(time, "HH:mm:ss") : "--:--:--"}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.08em",
          }}
        >
          {time ? format(time, "EEE, MMM d yyyy").toUpperCase() : "---"}
        </span>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Alert bell */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Bell size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
          {KPI_STATS.alertCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{ background: "#ff3366", color: "white", boxShadow: "0 0 10px rgba(255,51,102,0.7)" }}
            >
              {KPI_STATS.alertCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,153,204,0.08))",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 12px rgba(0,212,255,0.1)",
          }}
        >
          <User size={13} style={{ color: "#00d4ff" }} />
        </div>
      </div>
    </header>
  );
}
