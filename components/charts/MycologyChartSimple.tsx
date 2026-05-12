"use client";

import { Droplets, Thermometer, Wind } from "lucide-react";

interface DataPoint {
  timestamp: string;
  value: number;
}

interface MycologyChartSimpleProps {
  mushroomName: string;
  data: DataPoint[];
  metric: "humidity" | "temperature" | "co2";
  height?: number;
}

const metricConfig = {
  humidity: {
    title: "Humedad",
    unit: "%",
    color: "#5A6B47",
    bgColor: "bg-oliveGreen/10",
    icon: Droplets,
    optimalMin: 70,
    optimalMax: 85,
    yAxisMax: 100,
  },
  temperature: {
    title: "Temperatura",
    unit: "°C",
    color: "#CD212A",
    bgColor: "bg-sicilian-red/10",
    icon: Thermometer,
    optimalMin: 16,
    optimalMax: 24,
    yAxisMax: 35,
  },
  co2: {
    title: "CO₂",
    unit: "ppm",
    color: "#E6B422",
    bgColor: "bg-wheatGold/10",
    icon: Wind,
    optimalMin: 400,
    optimalMax: 700,
    yAxisMax: 1000,
  },
};

export function MycologyChartSimple({
  mushroomName,
  data,
  metric,
  height = 350,
}: MycologyChartSimpleProps) {
  const config = metricConfig[metric];
  const Icon = config.icon;
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const avgValue = data.reduce((a, b) => a + b.value, 0) / data.length;
  const lastValue = data[data.length - 1]?.value || 0;

  // Últimos 14 días para el mini gráfico
  const recentData = data.slice(-14);

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${config.bgColor}`}>
            <Icon className="w-5 h-5" style={{ color: config.color }} />
          </div>
          <h3 className="text-lg font-bold text-charcoalGray">
            {config.title} - {mushroomName}
          </h3>
        </div>
      </div>

      {/* Mini gráfico de barras */}
      <div className="h-32 flex items-end gap-1 mb-4">
        {recentData.map((point, idx) => {
          const heightPercent = (point.value / config.yAxisMax) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center group">
              <div
                className="w-full rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: `${Math.min(100, heightPercent)}%`,
                  backgroundColor: config.color,
                  opacity: 0.4 + (idx / recentData.length) * 0.6,
                }}
              />
              <div className="absolute bottom-full mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {point.timestamp}: {point.value}
                {config.unit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="p-2 bg-offWhite rounded-lg">
          <p className="text-xs text-oliveGreen/60">Mínimo</p>
          <p className="text-lg font-bold text-charcoalGray">
            {minValue.toFixed(1)}
            {config.unit}
          </p>
        </div>
        <div className="p-2 bg-offWhite rounded-lg">
          <p className="text-xs text-oliveGreen/60">Máximo</p>
          <p className="text-lg font-bold text-charcoalGray">
            {maxValue.toFixed(1)}
            {config.unit}
          </p>
        </div>
        <div className="p-2 bg-offWhite rounded-lg">
          <p className="text-xs text-oliveGreen/60">Promedio</p>
          <p className="text-lg font-bold text-charcoalGray">
            {avgValue.toFixed(1)}
            {config.unit}
          </p>
        </div>
        <div className="p-2 bg-offWhite rounded-lg">
          <p className="text-xs text-oliveGreen/60">Actual</p>
          <p className="text-lg font-bold" style={{ color: config.color }}>
            {lastValue.toFixed(1)}
            {config.unit}
          </p>
        </div>
      </div>

      {/* Rango óptimo */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-oliveGreen/60 mb-1">
          <span>Mínimo óptimo</span>
          <span>Rango ideal</span>
          <span>Máximo óptimo</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full rounded-full"
            style={{
              left: `${(config.optimalMin / config.yAxisMax) * 100}%`,
              width: `${((config.optimalMax - config.optimalMin) / config.yAxisMax) * 100}%`,
              backgroundColor: config.color,
              opacity: 0.3,
            }}
          />
          <div
            className="absolute w-3 h-3 bg-white border-2 rounded-full -top-0.5 shadow-md"
            style={{
              left: `${(lastValue / config.yAxisMax) * 100}%`,
              transform: "translateX(-50%)",
              borderColor: config.color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-oliveGreen/40 mt-1">
          <span>
            {config.optimalMin}
            {config.unit}
          </span>
          <span>
            {config.optimalMax}
            {config.unit}
          </span>
        </div>
      </div>

      {/* Leyenda de días */}
      <div className="flex justify-between text-xs text-oliveGreen/40 mt-3">
        <span>Hace 14 días</span>
        <span>Hace 7 días</span>
        <span>Hoy</span>
      </div>
    </div>
  );
}
