"use client";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden relative" style={{ background: "var(--color-bg)" }}>

      {/* Ambient glow — top-right orange */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", right: "-8%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* Ambient glow — bottom-left blue */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%", left: "8%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* Ambient glow — center-top faint */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%", left: "40%",
          width: "400px", height: "300px",
          background: "radial-gradient(ellipse, rgba(0,255,136,0.025) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Vertical scan line — slow sweep across the screen */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none animate-sweep-down"
        style={{
          left: "64px", right: 0,
          height: "120px",
          background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.015), transparent)",
          zIndex: 1,
        }}
      />

      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
