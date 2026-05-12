import type { SensorData } from "@/lib/types";
import { Alert } from "../types/monitoring.types";

export const mockSensorData: SensorData[] = [
  {
    zoneId: "esparto",
    zoneName: "Zona de Esparto",
    sensors: {
      moisture: { current: 78, optimal: 70, unit: "%" },
      temperature: { current: 22, min: 18, max: 30, unit: "°C" },
      light: { current: 65, optimal: 70, unit: "%" },
      wind: { current: 12, unit: "km/h" },
    },
    status: "optimal", // ✅ Usando SensorStatusType
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "tomates",
    zoneName: "Huerta de Tomates",
    sensors: {
      moisture: { current: 82, optimal: 75, unit: "%" },
      temperature: { current: 24, min: 20, max: 32, unit: "°C" },
      light: { current: 78, optimal: 80, unit: "%" },
      wind: { current: 8, unit: "km/h" },
    },
    status: "optimal",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "olivar",
    zoneName: "Olivar",
    sensors: {
      moisture: { current: 45, optimal: 60, unit: "%" },
      temperature: { current: 21, min: 18, max: 35, unit: "°C" },
      light: { current: 45, optimal: 60, unit: "%" },
      wind: { current: 15, unit: "km/h" },
    },
    status: "optimal", // ✅ Usando SensorStatusType
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "compost",
    zoneName: "Zona Compost",
    sensors: {
      moisture: { current: 55, optimal: 50, unit: "%" },
      temperature: { current: 28, min: 25, max: 45, unit: "°C" },
      light: { current: 30, optimal: 40, unit: "%" },
      wind: { current: 5, unit: "km/h" },
    },
    status: "optimal",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "hierbas",
    zoneName: "Jardín de Hierbas",
    sensors: {
      moisture: { current: 68, optimal: 65, unit: "%" },
      temperature: { current: 23, min: 18, max: 30, unit: "°C" },
      light: { current: 70, optimal: 75, unit: "%" },
      wind: { current: 10, unit: "km/h" },
    },
    status: "optimal",
    lastUpdate: new Date().toISOString(),
  },
  {
    zoneId: "agua",
    zoneName: "Depósito de Agua",
    sensors: {
      moisture: { current: 90, optimal: 85, unit: "%" },
      temperature: { current: 18, min: 15, max: 25, unit: "°C" },
      light: { current: 40, optimal: 50, unit: "%" },
      wind: { current: 7, unit: "km/h" },
    },
    status: "optimal",
    lastUpdate: new Date().toISOString(),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    zone: "Olivar",
    type: "humidity",
    current: 45,
    optimal: 60,
    severity: "high",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    message: "Humedad crítica en el Olivar. Necesita riego urgente.",
  },
  {
    id: "2",
    zone: "Olivar",
    type: "light",
    current: 45,
    optimal: 60,
    severity: "medium",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
    message:
      "Luz insuficiente en el Olivar. Considerar poda de árboles cercanos.",
  },
];
