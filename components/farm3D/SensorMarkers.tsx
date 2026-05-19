"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { SensorData } from "@/lib/types/farm3D.types";

interface SensorMarkersProps {
  sensors: SensorData[];
}

function AnimatedSensor({
  sensor,
  index,
}: {
  sensor: SensorData;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Efecto de pulsación suave
      const intensity = 0.5 + Math.sin(clock.elapsedTime * 3 + index) * 0.3;
      meshRef.current.material.emissiveIntensity = intensity;
    }
  });

  // Color según humedad (rojo seco, azul húmedo)
  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return "#ff4444";
    if (humidity < 60) return "#ffaa44";
    return "#44ff44";
  };

  return (
    <group position={[sensor.x, 0.5, sensor.z]}>
      {/* Cuerpo del sensor */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 16]} />
        <meshStandardMaterial
          color={getHumidityColor(sensor.humidity)}
          emissive="#442222"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Antena/soporte */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} />
      </mesh>

      {/* Tooltip flotante con datos */}
      <Html position={[0, 1.2, 0]} center distanceFactor={8}>
        <div
          style={{
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontFamily: "sans-serif",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <div>📡 {sensor.id}</div>
          <div>💧 {sensor.humidity}%</div>
          <div>🧪 pH {sensor.ph}</div>
          {sensor.temperature && <div>🌡️ {sensor.temperature}°C</div>}
        </div>
      </Html>
    </group>
  );
}

export default function SensorMarkers({ sensors }: SensorMarkersProps) {
  return (
    <>
      {sensors.map((sensor, idx) => (
        <AnimatedSensor key={sensor.id} sensor={sensor} index={idx} />
      ))}
    </>
  );
}
