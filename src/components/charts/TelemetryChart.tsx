"use client";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { TelemetryPoint } from "@/types";

interface TelemetryChartProps {
  metric: "speed" | "fuel" | "temp" | "load";
  data: TelemetryPoint[];
  color: string;
  label: string;
  unit: string;
}

const gradientId = (metric: string) => `grad-${metric}`;

export function TelemetryChart({ metric, data, color, label, unit }: TelemetryChartProps) {
  const id = gradientId(metric);
  const currentVal = data[data.length - 1]?.[metric];

  return (
    <div className="flex flex-col gap-2">
      {/* Header with big current value */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="label-xs mb-1"
            style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
          >
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-orbitron), sans-serif",
                fontSize: "1.5rem",
                color,
                textShadow: `0 0 16px ${color}99, 0 0 32px ${color}44`,
              }}
            >
              {currentVal}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.62rem",
                color: `${color}88`,
              }}
            >
              {unit}
            </span>
          </div>
        </div>
        {/* Trend dot */}
        <div
          className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>

      <ResponsiveContainer width="100%" height={72}>
        <AreaChart data={data} margin={{ top: 2, right: 0, left: -32, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
            <filter id={`glow-${metric}`} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8, fontFamily: "var(--font-mono), monospace" }}
            axisLine={false}
            tickLine={false}
            interval={7}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8, fontFamily: "var(--font-mono), monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(10,12,17,0.95)",
              border: `1px solid ${color}33`,
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "10px",
              color: "#e8eaf0",
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 20px ${color}22`,
            }}
            itemStyle={{ color, fontFamily: "var(--font-mono), monospace", fontSize: "11px" }}
            formatter={(v: number) => [`${v}${unit}`, label]}
            labelStyle={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono), monospace", fontSize: "9px" }}
          />
          <Area
            type="monotone"
            dataKey={metric}
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${id})`}
            filter={`url(#glow-${metric})`}
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0, filter: `url(#glow-${metric})` }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
