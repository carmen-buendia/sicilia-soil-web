export interface SensorData {
  id: string;
  x: number;
  z: number;
  humidity: number;
  ph: number;
  temperature?: number;
  lastUpdate?: string;
}

export interface ParcelData {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  color: string;
  name: string;
}

export interface FarmData {
  sensors: SensorData[];
  parcels: ParcelData[];
}
