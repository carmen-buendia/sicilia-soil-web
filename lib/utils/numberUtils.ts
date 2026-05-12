export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round((sum / values.length) * 10) / 10;
};

export const calculateTrend = (values: number[]): number => {
  if (values.length < 2) return 0;
  const first = values[0];
  const last = values[values.length - 1];
  if (first === 0) return 0;
  return parseFloat((((last - first) / first) * 100).toFixed(1));
};

export const formatNumber = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals);
};

export const formatPercentage = (value: number): string => {
  return `${formatNumber(value)}%`;
};

export const formatTemperature = (value: number): string => {
  return `${formatNumber(value)}°C`;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
