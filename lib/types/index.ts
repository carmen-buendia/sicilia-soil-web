/**
 * Type definitions for Sicilia Soil application
 */

/**
 * Sensor data structure for garden zones
 */
export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: "healthy" | "optimal" | "needs_water" | "active" | "full";
  lastUpdate: string;
}

/**
 * Garden zone configuration
 */
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

/**
 * Mushroom cultivation zone
 */
export interface MushroomZone {
  id: string;
  name: string;
  scientificName: string;
  location: string;
  humidity: number;
  temperature: number;
  co2: number;
  stage: "growth" | "fruiting" | "harvest";
  harvestIn: string;
  status: "optimal" | "excellent" | "good" | "ready";
  icon: string;
}

/**
 * Esparto plant data
 */
export interface EspartoData {
  general: {
    scientificName: string;
    health: number;
    nextHarvest: string;
  };
  growth: {
    phase: string;
    height: string;
    density: string;
    newShoots: number;
  };
  soil: {
    type: string;
    ph: number;
    moisture: number;
    nutrients: string;
  };
  harvest: {
    nextDate: string;
    estimatedYield: string;
    currentStock: string;
    quality: string;
  };
}

/**
 * Stats card data
 */
export interface StatsCardData {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
}
