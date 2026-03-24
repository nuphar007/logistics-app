"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Globe from "react-globe.gl";
import { ROUTES, HUBS, VEHICLES } from "@/lib/mockData";

interface GlobePoint {
  lat: number;
  lng: number;
  color: string;
  city?: string;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  status: string;
}

interface GlobeRing {
  lat: number;
  lng: number;
  vehicleId: string;
}

export default function GlobeMapInner() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 600, h: 500 });

  // Measure container
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      if (entry) {
        setDimensions({
          w: Math.floor(entry.contentRect.width),
          h: Math.floor(entry.contentRect.height),
        });
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Set initial POV
  useEffect(() => {
    if (globeEl.current && dimensions.w > 0) {
      setTimeout(() => {
        try {
          globeEl.current?.pointOfView({ lat: 20, lng: 10, altitude: 2.0 }, 1200);
        } catch {
          // ignore
        }
      }, 300);
    }
  }, [dimensions]);

  const arcData: GlobeArc[] = ROUTES.map((r) => ({
    startLat: r.origin.coords.lat,
    startLng: r.origin.coords.lng,
    endLat:   r.destination.coords.lat,
    endLng:   r.destination.coords.lng,
    color:    `rgba(${r.arcColor[0]},${r.arcColor[1]},${r.arcColor[2]},${r.arcColor[3]})`,
    status:   r.status,
  }));

  const pointData: GlobePoint[] = HUBS.map((h) => ({
    lat:   h.coords.lat,
    lng:   h.coords.lng,
    color: h.color,
    city:  h.city,
  }));

  const ringData: GlobeRing[] = VEHICLES
    .filter((v) => v.status === "active")
    .map((v) => ({ lat: v.lat, lng: v.lng, vehicleId: v.id }));

  const arcColor = useCallback((d: object) => (d as GlobeArc).color, []);
  const pointColor = useCallback((d: object) => (d as GlobePoint).color, []);
  const ringColor = useCallback(() => "rgba(255,107,53,0.7)", []);
  const arcLabel = useCallback((d: object) => `Route: ${(d as GlobeArc).status}`, []);
  const pointLabel = useCallback((d: object) => (d as GlobePoint).city ?? "", []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.w > 0 && (
        <Globe
          ref={globeEl}
          width={dimensions.w}
          height={dimensions.h}
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#00d4ff"
          atmosphereAltitude={0.18}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          // Arcs (routes)
          arcsData={arcData}
          arcStartLat={(d) => (d as GlobeArc).startLat}
          arcStartLng={(d) => (d as GlobeArc).startLng}
          arcEndLat={(d) => (d as GlobeArc).endLat}
          arcEndLng={(d) => (d as GlobeArc).endLng}
          arcColor={arcColor}
          arcAltitude={0.32}
          arcStroke={1.8}
          arcDashLength={0.4}
          arcDashGap={0.25}
          arcDashAnimateTime={1800}
          arcLabel={arcLabel}
          // Hub points
          pointsData={pointData}
          pointLat={(d) => (d as GlobePoint).lat}
          pointLng={(d) => (d as GlobePoint).lng}
          pointColor={pointColor}
          pointAltitude={0.01}
          pointRadius={0.55}
          pointsMerge={false}
          pointLabel={pointLabel}
          // Vehicle rings
          ringsData={ringData}
          ringLat={(d) => (d as GlobeRing).lat}
          ringLng={(d) => (d as GlobeRing).lng}
          ringColor={ringColor}
          ringMaxRadius={3.5}
          ringPropagationSpeed={2.5}
          ringRepeatPeriod={800}
          // Controls
          enablePointerInteraction={true}
        />
      )}
    </div>
  );
}
