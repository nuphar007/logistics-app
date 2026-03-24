"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map, Truck, Route, BarChart2, Settings, Bell,
  ChevronRight, Zap
} from "lucide-react";
import { cn } from "@/lib/cn";
import { KPI_STATS } from "@/lib/mockData";

const NAV_ITEMS = [
  { icon: Map,       label: "Fleet Map",  active: true  },
  { icon: Truck,     label: "Fleet",      active: false },
  { icon: Route,     label: "Routes",     active: false },
  { icon: BarChart2, label: "Analytics",  active: false },
  { icon: Settings,  label: "Settings",   active: false },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      className="h-full flex flex-col py-4 relative z-20"
      style={{
        background: "rgba(6,7,9,0.85)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
      }}
      animate={{ width: expanded ? 196 : 60 }}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Vertical accent line */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.2) 30%, rgba(0,212,255,0.15) 70%, transparent 100%)" }}
      />

      {/* Logo */}
      <div className="flex items-center justify-center mb-7 px-3">
        <div
          className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.22), rgba(255,140,0,0.12))",
            border: "1px solid rgba(255,107,53,0.35)",
            boxShadow: "0 0 20px rgba(255,107,53,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <Zap size={16} style={{ color: "#ff6b35" }} />
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-xl animate-ping-slow"
            style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)" }}
          />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="ml-2.5 font-display font-black text-sm tracking-wider text-white/90 whitespace-nowrap"
              style={{ fontFamily: "var(--font-orbitron), sans-serif", letterSpacing: "0.06em" }}
            >
              FLEET<span style={{ color: "#ff6b35" }}>OS</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-2 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-200 group overflow-hidden",
              active ? "" : "hover:bg-white/[0.035]"
            )}
            style={{
              background: active ? "rgba(255,107,53,0.07)" : "transparent",
            }}
          >
            {/* Active left border glow */}
            {active && (
              <div
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                style={{ background: "#ff6b35", boxShadow: "0 0 10px rgba(255,107,53,0.8), 0 0 20px rgba(255,107,53,0.4)" }}
              />
            )}
            {/* Active bg shimmer */}
            {active && (
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: "linear-gradient(90deg, rgba(255,107,53,0.06), transparent)" }}
              />
            )}

            <Icon
              size={15}
              style={{
                color: active ? "#ff6b35" : "rgba(255,255,255,0.32)",
                flexShrink: 0,
                filter: active ? "drop-shadow(0 0 6px rgba(255,107,53,0.7))" : "none",
              }}
            />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{
                    color: active ? "#ff6b35" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-orbitron), sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}

        {/* Alerts */}
        <button className="relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.035] transition-all duration-200 overflow-hidden">
          <div className="relative flex-shrink-0">
            <Bell size={15} className="text-white/32" style={{ color: "rgba(255,255,255,0.32)" }} />
            {KPI_STATS.alertCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
                style={{ background: "#ff3366", color: "white", boxShadow: "0 0 8px rgba(255,51,102,0.7), 0 0 16px rgba(255,51,102,0.3)" }}
              >
                {KPI_STATS.alertCount}
              </span>
            )}
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-semibold whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-orbitron), sans-serif", fontSize: "0.65rem", letterSpacing: "0.06em" }}
              >
                ALERTS
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Bottom status + toggle */}
      <div className="px-2 flex flex-col gap-2">
        {/* Divider */}
        <div className="h-px mx-2" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Online indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1.5">
          <div className="relative flex-shrink-0 w-2 h-2">
            <div className="absolute inset-0 rounded-full" style={{ background: "#00ff88" }} />
            <span
              className="absolute inset-0 rounded-full animate-ping-slow"
              style={{ background: "#00ff88", opacity: 0.5 }}
            />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[10px] whitespace-nowrap"
                style={{ color: "rgba(0,255,136,0.55)", fontFamily: "var(--font-mono), monospace" }}
              >
                SYS ONLINE
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto transition-all hover:bg-white/[0.04]"
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.28 }}>
            <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.25)" }} />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}
