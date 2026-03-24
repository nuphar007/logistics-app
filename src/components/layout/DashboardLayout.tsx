"use client";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0b0e 0%, #0d0f14 60%, #0a0b0e 100%)" }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
