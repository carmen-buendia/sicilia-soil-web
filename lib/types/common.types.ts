export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface Zone {
  id: string;
  name: string;
  icon: string;
  location?: string;
  optimalHumidity?: number;
  optimalTemperature?: number;
  optimalLight?: number;
}

export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: "optimal" | "warning" | "critical";
  lastUpdate: string;
}

export interface Alert {
  id: string;
  zone: string;
  type: "humidity" | "temperature" | "light";
  current: number;
  optimal: number;
  severity: "low" | "medium" | "high";
  timestamp: string;
  acknowledged: boolean;
}

export interface Statistics {
  avg: number;
  max: number;
  min: number;
  trend: number;
  last: number;
}

export type MetricType = "moisture" | "temperature" | "light";
export type PeriodType = "7" | "15" | "30" | "90";
