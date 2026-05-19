import { useEffect, useState } from "react";
import type {
  FarmData,
  SensorData,
  ParcelData,
} from "@/lib/types/farm3D.types";

// Datos simulados de tu finca en el Geoparque Rocca di Cerere
const mockSensors: SensorData[] = [
  { id: "S1", x: 5, z: 3, humidity: 68, ph: 7.2, temperature: 22 },
  { id: "S2", x: 12, z: 8, humidity: 52, ph: 7.8, temperature: 24 },
  { id: "S3", x: 8, z: 15, humidity: 73, ph: 6.9, temperature: 21 },
  { id: "S4", x: 18, z: 12, humidity: 45, ph: 8.1, temperature: 25 },
  { id: "S5", x: 3, z: 22, humidity: 81, ph: 6.7, temperature: 20 },
];

const mockParcels: ParcelData[] = [
  {
    id: "P1",
    x: 0,
    z: 0,
    width: 10,
    depth: 10,
    color: "#66cc66",
    name: "Parcela Olivos",
  },
  {
    id: "P2",
    x: 12,
    z: 2,
    width: 8,
    depth: 8,
    color: "#66aa33",
    name: "Parcela Esparto",
  },
  {
    id: "P3",
    x: 5,
    z: 14,
    width: 12,
    depth: 10,
    color: "#88cc44",
    name: "Zona Setas",
  },
  {
    id: "P4",
    x: 15,
    z: 18,
    width: 10,
    depth: 8,
    color: "#55aa55",
    name: "Área Reforestación",
  },
];

export default function useFarmData() {
  const [data, setData] = useState<FarmData>({
    sensors: [],
    parcels: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos desde una API
    const fetchData = async () => {
      // Aquí luego puedes reemplazar con fetch real a tu backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData({
        sensors: mockSensors,
        parcels: mockParcels,
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading };
}
