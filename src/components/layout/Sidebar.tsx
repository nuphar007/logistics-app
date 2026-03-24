"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Map, Truck, Route, BarChart2, Settings, Bell,
  ChevronRight, Hexagon, Circle
} from "lucide-react";
import { cn } from "@/lib/cn";
import { KPI_STATS } from "@/lib/mockData";

const NAV_ITEMS = [
  { icon: Map,       label: "Fleet Map",    active: true  },
  { icon: Truck,     label: "Fleet",        active: false },
  { icon: Route,     label: "Routes",       active: false },
  { icon: BarChart2, label: "Analytics",    active: false },
  { icon: Settings,  label: "Settings",     active: false },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      className="h-full flex flex-col py-4 relative z-20"
      style={{
        background: "rgba(10,11,14,0.8)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
      animate={{ width: expanded ? 200 : 64 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-6 px-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.3), rgba(255,140,0,0.2))",
            boxShadow: "0 0 16px rgba(255,107,53,0.4)",
            border: "1px solid rgba(255,107,53,0.3)",
          }}
        >
          <Hexagon size={18} style={{ color: "#ff6b35" }} />
        </div>
        {expanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2.5 font-bold text-sm tracking-tight text-white/90 whitespace-nowrap"
          >
            FleetOS
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-2 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 group",
              active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
            )}
            style={{
              borderLeft: active ? "2px solid #ff6b35" : "2px solid transparent",
            }}
          >
            <Icon
              size={16}
              style={{ color: active ? "#ff6b35" : "rgba(255,255,255,0.4)", flexShrink: 0 }}
            />
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium whitespace-nowrap"
                style={{ color: active ? "#ff6b35" : "rgba(255,255,255,0.5)" }}
              >
                {label}
              </motion.span>
            )}
          </button>
        ))}

        {/* Alert badge item */}
        <button
          className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-150 relative"
        >
          <div className="relative flex-shrink-0">
            <Bell size={16} className="text-white/40" />
            {KPI_STATS.alertCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: "#ff3366", color: "white", boxShadow: "0 0 8px rgba(255,51,102,0.6)" }}
              >
                {KPI_STATS.alertCount}
              </span>
            )}
          </div>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-white/50 whitespace-nowrap"
            >
              Alerts
            </motion.span>
          )}
        </button>
      </nav>

      {/* Bottom — status + expand toggle */}
      <div className="px-2 flex flex-col gap-2">
        {/* Online indicator */}
        <div className="flex items-center gap-2 px-2.5 py-2">
          <div className="relative flex-shrink-0">
            <Circle size={8} style={{ color: "#00ff88", fill: "#00ff88" }} />
            <span
              className="absolute inset-0 rounded-full animate-ping-slow"
              style={{ background: "#00ff88", opacity: 0.4 }}
            />
          </div>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-white/40 whitespace-nowrap"
            >
              System online
            </motion.span>
          )}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto hover:bg-white/[0.05] transition-all"
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={14} className="text-white/30" />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}
