'use client';

import { BaseChart } from './BaseChart';

interface TemperatureChartProps {
  zoneName: string;
  data: { timestamp: string; value: number }[];
}

export const TemperatureChart = ({ zoneName, data }: TemperatureChartProps) => {
  return (
    <BaseChart
      title={`Temperatura - ${zoneName}`}
      data={data}
      unit="°C"
      color="#F97316"
    />
  );
};