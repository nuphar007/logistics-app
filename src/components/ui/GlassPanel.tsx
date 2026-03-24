"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: "orange" | "blue" | "none";
  hover?: boolean;
}

export function GlassPanel({ children, className, glow = "none", hover = false }: GlassPanelProps) {
  const glowClass =
    glow === "orange" ? "shadow-glow-orange" :
    glow === "blue"   ? "shadow-glow-blue"   : "";

  const baseClass = "glass-panel";

  if (hover) {
    return (
      <motion.div
        className={cn(baseClass, glowClass, className)}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(baseClass, glowClass, className)}>
      {children}
    </div>
  );
}
