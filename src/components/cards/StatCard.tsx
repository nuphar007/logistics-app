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
  orange: { text: "#ff6b35", bg: "rgba(255,107,53,0.12)", glow: "glow-text-orange", shadow: "shadow-glow-orange-sm" },
  blue:   { text: "#00d4ff", bg: "rgba(0,212,255,0.10)",  glow: "glow-text-blue",   shadow: "shadow-glow-blue-sm" },
  green:  { text: "#00ff88", bg: "rgba(0,255,136,0.10)",  glow: "glow-text-green",  shadow: "shadow-glow-green" },
  red:    { text: "#ff3366", bg: "rgba(255,51,102,0.10)", glow: "glow-text-red",    shadow: "shadow-glow-red" },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, accentColor, index = 0 }: StatCardProps) {
  const a = accent[accentColor];

  return (
    <motion.div
      className="glass-panel p-5 flex flex-col gap-3 cursor-default select-none"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{title}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: a.bg, boxShadow: `0 0 12px ${a.bg}` }}
        >
          <Icon size={18} style={{ color: a.text }} />
        </div>
      </div>

      <div>
        <p className={cn("stat-value", a.glow)}>{value}</p>
        {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          {trend.direction === "up" ? (
            <TrendingUp size={12} style={{ color: "#00ff88" }} />
          ) : (
            <TrendingDown size={12} style={{ color: "#ff3366" }} />
          )}
          <span
            className="text-xs font-semibold"
            style={{ color: trend.direction === "up" ? "#00ff88" : "#ff3366" }}
          >
            {trend.value}% vs last week
          </span>
        </div>
      )}
    </motion.div>
  );
}
