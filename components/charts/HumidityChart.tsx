'use client';

import { BaseChart } from './BaseChart';

interface HumidityChartProps {
  zoneName: string;
  data: { timestamp: string; value: number }[];
}

export const HumidityChart = ({ zoneName, data }: HumidityChartProps) => {
  return (
    <BaseChart
      title={`Humedad - ${zoneName}`}
      data={data}
      unit="%"
      color="#3B82F6"
    />
  );
};