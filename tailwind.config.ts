import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "neon-blue": "#00d4ff",
        "neon-blue-dim": "#0099cc",
        "neon-orange": "#ff6b35",
        "neon-orange-bright": "#ff8c00",
        "status-green": "#00ff88",
        "status-red": "#ff3366",
        "status-yellow": "#ffcc00",
        "bg-base": "#0a0b0e",
        "bg-surface": "#0d0f14",
        "bg-elevated": "#12151c",
        "bg-overlay": "#161b25",
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: ["SF Mono", "Fira Code", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-dark":
          "linear-gradient(135deg, #0a0b0e 0%, #0d0f14 50%, #0a0b0e 100%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-orange-glow":
          "radial-gradient(ellipse at center, rgba(255,107,53,0.15) 0%, transparent 70%)",
        "gradient-blue-glow":
          "radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-orange": "0 0 20px rgba(255,107,53,0.6), 0 0 40px rgba(255,107,53,0.3)",
        "glow-orange-sm": "0 0 8px rgba(255,107,53,0.5), 0 0 16px rgba(255,107,53,0.2)",
        "glow-blue": "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.3)",
        "glow-blue-sm": "0 0 8px rgba(0,212,255,0.5), 0 0 16px rgba(0,212,255,0.2)",
        "glow-green": "0 0 12px rgba(0,255,136,0.5), 0 0 24px rgba(0,255,136,0.2)",
        "glow-red": "0 0 12px rgba(255,51,102,0.5), 0 0 24px rgba(255,51,102,0.2)",
        glass: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "ping-slow": "ping 3s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.7", filter: "brightness(1.4)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
