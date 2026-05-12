export interface LightZone {
  id: string;
  zone: string;
  current: number;
  optimal: number;
  min: number;
  max: number;
  history: number[];
  unit: string;
  trend: "up" | "down" | "stable";
  soilType: string;
  status: "excelente" | "buena" | "baja" | "muy baja";
  uv: number;
  icon: string;
  location: string;
  hours: number;
}

export const lightZones: LightZone[] = [
  {
    id: "esparto",
    zone: "Zona de Esparto",
    current: 65,
    optimal: 70,
    min: 50,
    max: 85,
    history: [62, 63, 65, 64, 66, 65, 65],
    unit: "%",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
    uv: 4,
    icon: "🌾",
    location: "Parcela Norte",
    hours: 8.5,
  },
  {
    id: "tomates",
    zone: "Huerta de Tomates",
    current: 78,
    optimal: 80,
    min: 60,
    max: 90,
    history: [75, 76, 78, 77, 79, 78, 78],
    unit: "%",
    trend: "up",
    soilType: "Franco",
    status: "excelente",
    uv: 5,
    icon: "🍅",
    location: "Parcela Sur",
    hours: 9.2,
  },
  {
    id: "olivar",
    zone: "Olivar",
    current: 45,
    optimal: 60,
    min: 40,
    max: 75,
    history: [43, 44, 45, 44, 46, 45, 45],
    unit: "%",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
    uv: 3,
    icon: "🫒",
    location: "Ladera Este",
    hours: 6.0,
  },
  {
    id: "compost",
    zone: "Zona Compost",
    current: 30,
    optimal: 40,
    min: 25,
    max: 55,
    history: [28, 29, 30, 31, 30, 29, 30],
    unit: "%",
    trend: "up",
    soilType: "Orgánico",
    status: "muy baja",
    uv: 2,
    icon: "♻️",
    location: "Trasera",
    hours: 4.5,
  },
  {
    id: "hierbas",
    zone: "Jardín de Hierbas",
    current: 70,
    optimal: 75,
    min: 55,
    max: 85,
    history: [68, 69, 70, 71, 70, 69, 70],
    unit: "%",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
    uv: 4,
    icon: "🌿",
    location: "Parcela Oeste",
    hours: 8.0,
  },
  {
    id: "agua",
    zone: "Depósito de Agua",
    current: 40,
    optimal: 50,
    min: 35,
    max: 65,
    history: [38, 39, 40, 41, 40, 39, 40],
    unit: "%",
    trend: "up",
    soilType: "N/A",
    status: "baja",
    uv: 3,
    icon: "💧",
    location: "Noreste",
    hours: 5.5,
  },
];

export const historicalData = [
  { day: "Lun", value: 65, optimal: 70 },
  { day: "Mar", value: 68, optimal: 70 },
  { day: "Mié", value: 72, optimal: 70 },
  { day: "Jue", value: 70, optimal: 70 },
  { day: "Vie", value: 75, optimal: 70 },
  { day: "Sáb", value: 78, optimal: 70 },
  { day: "Dom", value: 73, optimal: 70 },
];

export const forecastData = [
  { day: "Lun", uv: 5, light: 72 },
  { day: "Mar", uv: 6, light: 75 },
  { day: "Mié", uv: 4, light: 68 },
  { day: "Jue", uv: 5, light: 70 },
  { day: "Vie", uv: 7, light: 78 },
];
