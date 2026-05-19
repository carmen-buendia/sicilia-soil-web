"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

interface GroundPlaneProps {
  width?: number;
  height?: number;
}

export default function GroundPlane({
  width = 30,
  height = 30,
}: GroundPlaneProps) {
  // Opcional: cargar textura de suelo real
  // const texture = useLoader(TextureLoader, '/textures/soil.jpg');

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[width / 2, -0.1, height / 2]}
      receiveShadow
    >
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#8B5A2B" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}
