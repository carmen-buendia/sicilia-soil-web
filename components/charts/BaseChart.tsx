'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

interface DataPoint {
  timestamp?: string;
  date?: string;
  value: number;
}

interface BaseChartProps {
  title: string;
  data: DataPoint[];
  unit: string;
  color?: string;
  height?: number;
}

export const BaseChart = ({ 
  title, 
  data, 
  unit, 
  color = '#B43F2B',
  height = 400 
}: BaseChartProps) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Normalizar datos: usar timestamp o date como fecha
    const normalizedData = data.map(point => ({
      timestamp: point.timestamp || point.date || new Date().toISOString(),
      value: point.value
    }));

    // Ordenar datos por fecha
    const sortedData = [...normalizedData].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setOptions({
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        style: { fontFamily: 'Inter, sans-serif' },
        height: height,
        spacing: [20, 20, 20, 20],
      },
      title: {
        text: title,
        style: { color: '#2C2C2C', fontSize: '16px', fontWeight: '600' },
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: { color: '#6B7280', fontSize: '12px' },
          format: '{value:%d/%m}',
        },
        title: {
          text: 'Fecha',
          style: { color: '#6B7280', fontSize: '12px' },
        },
        gridLineColor: '#E5E7EB',
      },
      yAxis: {
        title: {
          text: unit,
          style: { color: '#6B7280', fontSize: '12px' },
        },
        gridLineColor: '#E5E7EB',
        labels: {
          style: { color: '#6B7280', fontSize: '12px' },
        },
      },
      series: [
        {
          name: title,
          data: sortedData.map(d => [new Date(d.timestamp).getTime(), d.value]),
          color: color,
          lineWidth: 2,
          marker: {
            radius: 4,
            fillColor: color,
            lineColor: '#FFFFFF',
            lineWidth: 1,
          },
          states: {
            hover: {
              lineWidth: 3,
            },
          },
        },
      ],
      credits: { enabled: false },
      legend: { enabled: false },
      tooltip: {
        valueSuffix: ` ${unit}`,
        shared: true,
        backgroundColor: '#FFFFFF',
        borderColor: '#E6B17E',
        borderRadius: 8,
        style: { color: '#2C2C2C', fontSize: '12px' },
      },
      plotOptions: {
        line: {
          animation: true,
          connectNulls: false,
        },
      },
    });
  }, [data, title, unit, color, height]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-xl">
        <p className="text-gray-500">No hay datos disponibles</p>
      </div>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};