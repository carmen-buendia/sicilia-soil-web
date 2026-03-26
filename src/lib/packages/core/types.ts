export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: string;
  lastUpdate: string;
}

export interface GardenZone {
  id: string;
  name: string;
  type: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  status: string;
  lastUpdate: string;
  icon: string;
}
