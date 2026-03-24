"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; direction: "up" | "down" };
  accentColor: "orange" | "blue" | "green" | "red";
  index?: number;
}

const accent = {
  orange: {
    text: "#ff6b35",
    bg: "rgba(255,107,53,0.08)",
    bgStrong: "rgba(255,107,53,0.15)",
    glow: "glow-text-orange",
    border: "rgba(255,107,53,0.45)",
    shadow: "rgba(255,107,53,0.12)",
    scanColor: "rgba(255,107,53,0.06)",
  },
  blue: {
    text: "#00d4ff",
    bg: "rgba(0,212,255,0.07)",
    bgStrong: "rgba(0,212,255,0.13)",
    glow: "glow-text-blue",
    border: "rgba(0,212,255,0.45)",
    shadow: "rgba(0,212,255,0.10)",
    scanColor: "rgba(0,212,255,0.05)",
  },
  green: {
    text: "#00ff88",
    bg: "rgba(0,255,136,0.07)",
    bgStrong: "rgba(0,255,136,0.12)",
    glow: "glow-text-green",
    border: "rgba(0,255,136,0.45)",
    shadow: "rgba(0,255,136,0.08)",
    scanColor: "rgba(0,255,136,0.05)",
  },
  red: {
    text: "#ff3366",
    bg: "rgba(255,51,102,0.07)",
    bgStrong: "rgba(255,51,102,0.13)",
    glow: "glow-text-red",
    border: "rgba(255,51,102,0.45)",
    shadow: "rgba(255,51,102,0.10)",
    scanColor: "rgba(255,51,102,0.05)",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, accentColor, index = 0 }: StatCardProps) {
  const a = accent[accentColor];

  return (
    <motion.div
      className="relative cursor-default select-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.018, y: -3 }}
    >
      <div
        className="relative p-5 overflow-hidden"
        style={{
          background: `linear-gradient(150deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.018) 100%)`,
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: "14px",
          boxShadow: `0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Top accent gradient line */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "1px", background: `linear-gradient(90deg, transparent 0%, ${a.text} 40%, ${a.text} 60%, transparent 100%)`, opacity: 0.7 }}
        />
        {/* Top accent glow wash */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "48px", background: `linear-gradient(180deg, ${a.bgStrong} 0%, transparent 100%)`, pointerEvents: "none" }}
        />

        {/* Corner brackets — top-left */}
        <div className="absolute top-[7px] left-[7px] w-3 h-3" style={{ borderTop: `1.5px solid ${a.text}`, borderLeft: `1.5px solid ${a.text}`, opacity: 0.45 }} />
        {/* Corner brackets — top-right */}
        <div className="absolute top-[7px] right-[7px] w-3 h-3" style={{ borderTop: `1.5px solid ${a.text}`, borderRight: `1.5px solid ${a.text}`, opacity: 0.45 }} />
        {/* Corner brackets — bottom-left */}
        <div className="absolute bottom-[7px] left-[7px] w-3 h-3" style={{ borderBottom: `1.5px solid ${a.text}`, borderLeft: `1.5px solid ${a.text}`, opacity: 0.3 }} />
        {/* Corner brackets — bottom-right */}
        <div className="absolute bottom-[7px] right-[7px] w-3 h-3" style={{ borderBottom: `1.5px solid ${a.text}`, borderRight: `1.5px solid ${a.text}`, opacity: 0.3 }} />

        {/* Hover scan shimmer */}
        <motion.div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: "35%",
            background: `linear-gradient(90deg, transparent, ${a.scanColor}, transparent)`,
          }}
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "380%", opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <p className="label-xs">{title}</p>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: a.bgStrong,
                border: `1px solid ${a.border}`,
                boxShadow: `0 0 18px ${a.shadow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              <Icon size={15} style={{ color: a.text }} />
            </div>
          </div>

          {/* Value */}
          <div>
            <p className={cn("stat-value", a.glow)}>{value}</p>
            {subtitle && (
              <p
                className="text-[11px] mt-1.5 tracking-wide"
                style={{ color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-mono), monospace" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Trend */}
          {trend && (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-md"
                style={{
                  background: trend.direction === "up" ? "rgba(0,255,136,0.08)" : "rgba(255,51,102,0.08)",
                  border: `1px solid ${trend.direction === "up" ? "rgba(0,255,136,0.22)" : "rgba(255,51,102,0.22)"}`,
                }}
              >
                {trend.direction === "up"
                  ? <TrendingUp size={9} style={{ color: "#00ff88" }} />
                  : <TrendingDown size={9} style={{ color: "#ff3366" }} />
                }
                <span
                  className="text-[10px] font-bold font-display"
                  style={{ color: trend.direction === "up" ? "#00ff88" : "#ff3366" }}
                >
                  {trend.value}%
                </span>
              </div>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono), monospace" }}>
                vs last week
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
