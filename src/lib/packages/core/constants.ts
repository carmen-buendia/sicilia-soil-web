export const DEFAULT_ZONES = [
  { id: 'esparto', name: 'Zona de Esparto', icon: '🌾', type: 'Planta textil' },
  { id: 'tomates', name: 'Huerta de Tomates', icon: '🍅', type: 'Hortalizas' },
  { id: 'olivar', name: 'Olivar', icon: '🫒', type: 'Árboles' },
];

export const SENSOR_TYPES = {
  MOISTURE: 'moisture',
  TEMPERATURE: 'temperature',
  LIGHT: 'light',
  WIND: 'wind',
} as const;

export const STATUS_VARIANTS = {
  healthy: 'success',
  optimal: 'info',
  needs_water: 'warning',
  active: 'info',
  full: 'success',
} as const;
