// lib/api.ts
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_URL = "https://sicilia-soil-backend.onrender.com";

export interface ZoneData {
  _id?: string;
  zone: string;
  temperature: number;
  humidity: number;
  light: number;
  timestamp: string | Date;
}

export interface Zone {
  id: string;
  name: string;
  zone: string;
}

// Obtener todas las zonas con sus últimos datos
export async function fetchZones(): Promise<ZoneData[]> {
  const res = await fetch(`${API_URL}/api/zones`);
  if (!res.ok) throw new Error("Error fetching zones");
  return res.json();
}

// Obtener histórico de una zona específica
export async function fetchZoneHistory(
  zone: string,
  limit: number = 24,
): Promise<ZoneData[]> {
  const res = await fetch(`${API_URL}/api/history/${zone}?limit=${limit}`);
  if (!res.ok) throw new Error(`Error fetching history for zone ${zone}`);
  return res.json();
}

// Enviar datos de sensores (para simular o IoT real)
export async function postSensorData(
  data: Omit<ZoneData, "_id" | "timestamp">,
): Promise<ZoneData> {
  const res = await fetch(`${API_URL}/api/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error posting sensor data");
  return res.json();
}

// Health check
export async function healthCheck(): Promise<{
  status: string;
  message: string;
}> {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
