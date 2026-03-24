"use client";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";

const GlobeMapInner = dynamic(
  () => import("./GlobeMapInner"),
  {
    ssr: false,
    loading: () => <GlobeMapSkeleton />,
  }
);

function GlobeMapSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className="w-48 h-48 rounded-full border animate-ping-slow"
          style={{ borderColor: "rgba(0,212,255,0.15)" }}
        />
        <div
          className="absolute w-32 h-32 rounded-full border"
          style={{ borderColor: "rgba(255,107,53,0.2)" }}
        />
        <div
          className="absolute w-4 h-4 rounded-full"
          style={{ background: "#00d4ff", boxShadow: "0 0 16px rgba(0,212,255,0.8)" }}
        />
      </div>
    </div>
  );
}

interface GlobeMapProps {
  className?: string;
}

export function GlobeMap({ className }: GlobeMapProps) {
  return (
    <div className={cn("glass-panel-lg relative overflow-hidden", className)}>
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />
      {/* Header label */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-pulse-glow"
          style={{ background: "#00ff88", boxShadow: "0 0 8px rgba(0,255,136,0.8)" }}
        />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Live Fleet Map
        </span>
      </div>
      {/* Route count */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,107,53,0.15)",
            color: "#ff6b35",
            border: "1px solid rgba(255,107,53,0.25)",
            boxShadow: "0 0 8px rgba(255,107,53,0.3)",
          }}
        >
          4 Active Routes
        </span>
      </div>
      <GlobeMapInner />
    </div>
  );
}
