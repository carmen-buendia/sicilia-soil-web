"use client";

import { Html } from "@react-three/drei";
import type { PlacedElement } from "@/lib/types/design.types";

interface AllElements3DProps {
  elements: PlacedElement[];
  pixelsPerMeter: number;
  terrainWidth: number;
  terrainHeight: number;
}

// Mapeo de modelos 3D según el tipo de elemento
function Element3D({
  element,
  x,
  z,
}: {
  element: PlacedElement;
  x: number;
  z: number;
}) {
  const { element: el } = element;
  const sizeInMeters = el.realSize;
  const yPosition = 0.05; // justo sobre el suelo

  // Colores según tipo
  const getColor = () => {
    switch (el.model3d) {
      case "tree":
        return "#5a7a3a";
      case "house":
        return "#c47a5a";
      case "greenhouse":
        return "#7aba7a";
      case "sensor":
        return "#e8e8e8";
      case "mushroom":
        return "#e8d8c8";
      case "crop":
        return "#8aba5a";
      default:
        return el.color;
    }
  };

  // Altura según tipo
  const getHeight = () => {
    switch (el.model3d) {
      case "tree":
        return sizeInMeters * 0.8;
      case "house":
        return sizeInMeters * 0.5;
      case "greenhouse":
        return sizeInMeters * 0.4;
      case "sensor":
        return 0.6;
      case "mushroom":
        return 0.3;
      default:
        return sizeInMeters * 0.3;
    }
  };

  // Forma según tipo
  if (el.model3d === "tree") {
    return (
      <group position={[x, 0, z]}>
        {/* Tronco */}
        <mesh position={[0, getHeight() / 2, 0]}>
          <cylinderGeometry args={[0.3, 0.4, getHeight(), 6]} />
          <meshStandardMaterial color="#8B5A2B" />
        </mesh>
        {/* Copa */}
        <mesh position={[0, getHeight() + 0.2, 0]}>
          <sphereGeometry args={[sizeInMeters * 0.4, 16]} />
          <meshStandardMaterial color={getColor()} />
        </mesh>
        {/* Tooltip con nombre */}
        <Html position={[0, getHeight() + 0.6, 0]} center distanceFactor={12}>
          <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
            {el.icon} {el.name}
          </div>
        </Html>
      </group>
    );
  }

  if (el.model3d === "house") {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, getHeight() / 2, 0]}>
          <boxGeometry args={[sizeInMeters, getHeight(), sizeInMeters]} />
          <meshStandardMaterial color={getColor()} />
        </mesh>
        {/* Techo */}
        <mesh position={[0, getHeight(), 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[sizeInMeters * 0.7, getHeight() * 0.6, 4]} />
          <meshStandardMaterial color="#c44a2a" />
        </mesh>
        <Html position={[0, getHeight() + 0.4, 0]} center distanceFactor={12}>
          <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
            {el.icon} {el.name}
          </div>
        </Html>
      </group>
    );
  }

  if (el.model3d === "greenhouse") {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, getHeight() / 2, 0]}>
          <boxGeometry args={[sizeInMeters, getHeight(), sizeInMeters]} />
          <meshStandardMaterial
            color={getColor()}
            transparent
            opacity={0.7}
            metalness={0.8}
          />
        </mesh>
        <Html position={[0, getHeight() + 0.2, 0]} center distanceFactor={12}>
          <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
            {el.icon} {el.name}
          </div>
        </Html>
      </group>
    );
  }

  if (el.model3d === "sensor") {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.5, 8]} />
          <meshStandardMaterial
            color={getColor()}
            emissive="#ff4444"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.12, 8]} />
          <meshStandardMaterial
            color="#ff4444"
            emissive="#ff0000"
            emissiveIntensity={0.5}
          />
        </mesh>
        <Html position={[0, 0.9, 0]} center distanceFactor={12}>
          <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
            📡 {el.name}
          </div>
        </Html>
      </group>
    );
  }

  if (el.model3d === "mushroom") {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.15, 6]} />
          <meshStandardMaterial color="#e8d8c8" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.15, 8]} />
          <meshStandardMaterial color="#d4b896" />
        </mesh>
        <Html position={[0, 0.4, 0]} center distanceFactor={12}>
          <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
            {el.icon} {el.name}
          </div>
        </Html>
      </group>
    );
  }

  // Elemento por defecto (cubos simples)
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, getHeight() / 2, 0]}>
        <boxGeometry
          args={[sizeInMeters * 0.6, getHeight(), sizeInMeters * 0.6]}
        />
        <meshStandardMaterial color={getColor()} />
      </mesh>
      <Html position={[0, getHeight() + 0.2, 0]} center distanceFactor={12}>
        <div className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
          {el.icon} {el.name}
        </div>
      </Html>
    </group>
  );
}

export default function AllElements3D({
  elements,
  pixelsPerMeter,
  terrainWidth,
  terrainHeight,
}: AllElements3DProps) {
  // Convertir coordenadas del canvas 2D (píxeles) a coordenadas 3D (metros)
  const convertTo3D = (x: number, y: number) => {
    // El canvas 2D tiene su origen en esquina superior izquierda
    // En 3D, X es horizontal, Z es profundidad, Y es altura
    const x3d = x / pixelsPerMeter;
    const z3d = terrainHeight - y / pixelsPerMeter;
    return { x: x3d, z: z3d };
  };

  return (
    <>
      {elements.map((element, idx) => {
        const { x, z } = convertTo3D(element.x, element.y);
        return <Element3D key={idx} element={element} x={x} z={z} />;
      })}
    </>
  );
}
