'use client';

import { BaseChart } from './BaseChart';

interface LightChartProps {
  zoneName: string;
  data: { timestamp: string; value: number }[];
  height?: number;
}

export const LightChart = ({ zoneName, data, height }: LightChartProps) => {
  return (
    <BaseChart
      title={`Luz solar - ${zoneName}`}
      data={data}
      unit="%"
      color="#EAB308"
    />
  );
};