"use client";

import { TrendingUp, X } from "lucide-react";
import type { DataPoint } from "@/lib/types/common.types";

interface PredictionCardProps {
  zones: Array<{
    id: string;
    name: string;
    icon: string;
    data: DataPoint[];
  }>;
  metricName: string;
  unit: string;
  onClose: () => void;
}

function std(values: number[]): number {
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length;
  return Math.sqrt(variance);
}

export function PredictionCard({
  zones,
  metricName,
  unit,
  onClose,
}: PredictionCardProps) {
  const calculatePrediction = (data: DataPoint[]): number => {
    if (!data.length) return 0;
    const recentData = data.slice(-7);
    const values = recentData.map((d) => d.value);
    const avgChange = (values[values.length - 1] - values[0]) / values.length;
    return values[values.length - 1] + avgChange;
  };

  const calculateConfidence = (data: DataPoint[]): number => {
    if (!data.length) return 70;
    const recentData = data.slice(-7);
    const values = recentData.map((d) => d.value);
    const volatility = std(values) || 5;
    return Math.max(60, Math.min(95, 100 - volatility));
  };

  return (
    <div className="bg-gradient-to-r from-oliveGreen to-oliveGreen/90 rounded-xl p-6 shadow-lg text-offWhite mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Predicciones para los próximos 7 días
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-offWhite/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {zones.slice(0, 3).map((zone) => {
          const prediction = calculatePrediction(zone.data);
          const confidence = calculateConfidence(zone.data);
          const lastValue = zone.data[zone.data.length - 1]?.value || 0;

          return (
            <div
              key={zone.id}
              className="bg-offWhite/10 rounded-lg p-4 backdrop-blur-sm border border-offWhite/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{zone.icon}</span>
                <span className="font-bold">{zone.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Actual:</span>
                  <span className="font-bold">
                    {lastValue.toFixed(1)}
                    {unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Predicción:</span>
                  <span className="font-bold text-wheatGold">
                    {prediction.toFixed(1)}
                    {unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Confianza:</span>
                  <span className="font-bold">{confidence}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
