"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Sky, Stars } from "@react-three/drei";
import SensorMarkers from "./SensorMarkers";
import GroundPlane from "./GroundPlane";
import AllElements3D from "./AllElements3D";
import type { FarmData } from "@/lib/types/farm3D.types";
import type { PlacedElement } from "@/lib/types/design.types";

interface FarmSceneProps {
  data: FarmData;
  designElements?: PlacedElement[];  // ← NUEVO: elementos del diseño 2D
  pixelsPerMeter?: number;           // ← NUEVO: para convertir coordenadas
  terrainWidth?: number;              // ← NUEVO
  terrainHeight?: number;             // ← NUEVO
  isNight?: boolean;
}

// Componente para las parcelas (áreas coloreadas)
function Parcels({ parcels }: { parcels: FarmData["parcels"] }) {
  return (
    <>
      {parcels.map((parcel) => (
        <mesh
          key={parcel.id}
          position={[
            parcel.x + parcel.width / 2,
            0.01,
            parcel.z + parcel.depth / 2,
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[parcel.width, parcel.depth]} />
          <meshStandardMaterial
            color={parcel.color}
            transparent
            opacity={0.35}
            side={2}
            emissive={parcel.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

export default function FarmScene({ 
  data, 
  designElements = [], 
  pixelsPerMeter = 12, 
  terrainWidth = 50, 
  terrainHeight = 40,
  isNight = false 
}: FarmSceneProps) {
  return (
    <div
      style={{
        height: "550px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [18, 15, 18], fov: 50 }}
        shadows
        style={{ background: isNight ? "#0a0a2a" : "#87CEEB" }}
      >
        {/* Iluminación */}
        <ambientLight intensity={isNight ? 0.2 : 0.6} />
        <directionalLight
          position={[10, 20, 5]}
          intensity={isNight ? 0.5 : 1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffaa66" />

        {/* Terreno */}
        <GroundPlane width={terrainWidth} height={terrainHeight} />

        {/* Parcelas (datos del backend) */}
        <Parcels parcels={data.parcels} />

        {/* Sensores (datos del backend) */}
        <SensorMarkers sensors={data.sensors} />

        {/* ============================================ */}
        {/* ELEMENTOS DEL DISEÑO 2D EN 3D (NUEVO) */}
        {/* ============================================ */}
        {designElements.length > 0 && (
          <AllElements3D 
            elements={designElements} 
            pixelsPerMeter={pixelsPerMeter}
            terrainWidth={terrainWidth}
            terrainHeight={terrainHeight}
          />
        )}

        {/* Cielo y efectos */}
        {isNight ? (
          <Stars radius={100} depth={50} count={2000} factor={4} />
        ) : (
          <Sky
            distance={450}
            sunPosition={[10, 10, -5]}
            turbidity={2}
            azimuth={0.5}
          />
        )}

        {/* Cuadrícula de referencia */}
        <Grid
          infiniteGrid
          cellSize={1}
          sectionSize={5}
          fadeDistance={30}
          fadeStrength={1}
        />

        {/* Controles de cámara */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          zoomSpeed={1.2}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}