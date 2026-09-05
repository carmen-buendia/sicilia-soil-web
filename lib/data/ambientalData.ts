// Datos simulados para el dashboard ambiental

export interface HeavyMetal {
  id: string;
  name: string;
  symbol: string;
  value: number; // µg/L o mg/kg
  unit: string;
  threshold: number;
  trend: number[]; // últimos 7 valores
  status: "good" | "warning" | "danger";
}

export interface AirQuality {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  trend: number[];
  status: "good" | "warning" | "danger";
}

export interface WaterQuality {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  trend: number[];
  status: "good" | "warning" | "danger";
}

export interface SoilQuality {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  trend: number[];
  status: "good" | "warning" | "danger";
}

// Generar datos aleatorios para tendencias
const generateTrend = (base: number, variance: number, count: number = 7) => {
  return Array.from({ length: count }, () =>
    Math.max(0, base + (Math.random() - 0.5) * variance),
  );
};

// Umbrales según normativa europea (valores orientativos)
export const heavyMetals: HeavyMetal[] = [
  {
    id: "pb",
    name: "Plomo",
    symbol: "Pb",
    value: 12,
    unit: "µg/L",
    threshold: 25,
    trend: generateTrend(12, 8),
    status: "good",
  },
  {
    id: "cd",
    name: "Cadmio",
    symbol: "Cd",
    value: 3.2,
    unit: "µg/L",
    threshold: 5,
    trend: generateTrend(3.2, 2),
    status: "good",
  },
  {
    id: "hg",
    name: "Mercurio",
    symbol: "Hg",
    value: 0.8,
    unit: "µg/L",
    threshold: 1,
    trend: generateTrend(0.8, 0.5),
    status: "good",
  },
  {
    id: "as",
    name: "Arsénico",
    symbol: "As",
    value: 8.5,
    unit: "µg/L",
    threshold: 10,
    trend: generateTrend(8.5, 4),
    status: "good",
  },
];

export const airQuality: AirQuality[] = [
  {
    id: "pm25",
    name: "PM2.5",
    value: 18,
    unit: "µg/m³",
    threshold: 25,
    trend: generateTrend(18, 10),
    status: "good",
  },
  {
    id: "pm10",
    name: "PM10",
    value: 32,
    unit: "µg/m³",
    threshold: 50,
    trend: generateTrend(32, 15),
    status: "good",
  },
  {
    id: "co2",
    name: "CO₂",
    value: 410,
    unit: "ppm",
    threshold: 500,
    trend: generateTrend(410, 30),
    status: "good",
  },
  {
    id: "no2",
    name: "NO₂",
    value: 28,
    unit: "µg/m³",
    threshold: 40,
    trend: generateTrend(28, 10),
    status: "good",
  },
];

export const waterQuality: WaterQuality[] = [
  {
    id: "ph",
    name: "pH",
    value: 7.2,
    unit: "pH",
    threshold: 8.5,
    trend: generateTrend(7.2, 1),
    status: "good",
  },
  {
    id: "turbidity",
    name: "Turbidez",
    value: 3.5,
    unit: "NTU",
    threshold: 10,
    trend: generateTrend(3.5, 2),
    status: "good",
  },
  {
    id: "conductivity",
    name: "Conductividad",
    value: 450,
    unit: "µS/cm",
    threshold: 800,
    trend: generateTrend(450, 100),
    status: "good",
  },
];

export const soilQuality: SoilQuality[] = [
  {
    id: "moisture",
    name: "Humedad",
    value: 65,
    unit: "%",
    threshold: 80,
    trend: generateTrend(65, 15),
    status: "good",
  },
  {
    id: "soil_ph",
    name: "pH suelo",
    value: 6.8,
    unit: "pH",
    threshold: 8,
    trend: generateTrend(6.8, 1),
    status: "good",
  },
  {
    id: "nitrogen",
    name: "Nitrógeno",
    value: 45,
    unit: "mg/kg",
    threshold: 100,
    trend: generateTrend(45, 20),
    status: "good",
  },
];

// Función para actualizar datos simulados (cada pocos segundos)
export function updateEnvironmentalData() {
  // Actualizar metales pesados
  heavyMetals.forEach((m) => {
    m.value = Math.max(0, m.value + (Math.random() - 0.5) * 2);
    m.status =
      m.value > m.threshold * 0.8
        ? "warning"
        : m.value > m.threshold
          ? "danger"
          : "good";
    m.trend.push(m.value);
    if (m.trend.length > 7) m.trend.shift();
  });

  // Actualizar aire
  airQuality.forEach((a) => {
    a.value = Math.max(0, a.value + (Math.random() - 0.5) * 3);
    a.status =
      a.value > a.threshold * 0.8
        ? "warning"
        : a.value > a.threshold
          ? "danger"
          : "good";
    a.trend.push(a.value);
    if (a.trend.length > 7) a.trend.shift();
  });

  // Actualizar agua
  waterQuality.forEach((w) => {
    w.value = Math.max(0, w.value + (Math.random() - 0.5) * 0.5);
    w.status =
      w.value > w.threshold * 0.8
        ? "warning"
        : w.value > w.threshold
          ? "danger"
          : "good";
    w.trend.push(w.value);
    if (w.trend.length > 7) w.trend.shift();
  });

  // Actualizar suelo
  soilQuality.forEach((s) => {
    s.value = Math.max(0, s.value + (Math.random() - 0.5) * 5);
    s.status =
      s.value > s.threshold * 0.8
        ? "warning"
        : s.value > s.threshold
          ? "danger"
          : "good";
    s.trend.push(s.value);
    if (s.trend.length > 7) s.trend.shift();
  });
}
