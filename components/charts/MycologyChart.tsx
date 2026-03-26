'use client';

import { BaseChart } from './BaseChart';

interface MycologyChartProps {
  mushroomName: string;
  data: { timestamp: string; value: number }[];
  metric: 'humidity' | 'temperature' | 'co2';
  height?: number;
}

const getMetricConfig = (metric: string) => {
  switch (metric) {
    case 'humidity':
      return { title: 'Humedad', unit: '%', color: '#3B82F6' };
    case 'temperature':
      return { title: 'Temperatura', unit: '°C', color: '#F97316' };
    case 'co2':
      return { title: 'CO₂', unit: 'ppm', color: '#8B5CF6' };
    default:
      return { title: 'Valor', unit: '', color: '#B43F2B' };
  }
};

export const MycologyChart = ({ mushroomName, data, metric, height }: MycologyChartProps) => {
  const config = getMetricConfig(metric);
  return (
    <BaseChart
      title={`${config.title} - ${mushroomName}`}
      data={data}
      unit={config.unit}
      color={config.color}
      height={height}
    />
  );
};