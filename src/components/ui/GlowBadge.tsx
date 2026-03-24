"use client";

interface GlowBadgeProps {
  label: string;
  color: "orange" | "blue" | "green" | "red" | "yellow";
  size?: "xs" | "sm";
}

const colorMap = {
  orange: { text: "#ff6b35", bg: "rgba(255,107,53,0.15)", glow: "rgba(255,107,53,0.4)" },
  blue:   { text: "#00d4ff", bg: "rgba(0,212,255,0.12)",  glow: "rgba(0,212,255,0.35)" },
  green:  { text: "#00ff88", bg: "rgba(0,255,136,0.12)",  glow: "rgba(0,255,136,0.35)" },
  red:    { text: "#ff3366", bg: "rgba(255,51,102,0.15)", glow: "rgba(255,51,102,0.4)" },
  yellow: { text: "#ffcc00", bg: "rgba(255,204,0,0.15)",  glow: "rgba(255,204,0,0.35)" },
};

export function GlowBadge({ label, color, size = "sm" }: GlowBadgeProps) {
  const c = colorMap[color];
  const padding = size === "xs" ? "2px 6px" : "3px 8px";
  const fontSize = size === "xs" ? "10px" : "11px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding,
        borderRadius: "9999px",
        background: c.bg,
        color: c.text,
        fontSize,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        boxShadow: `0 0 8px ${c.glow}`,
        border: `1px solid ${c.text}30`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
