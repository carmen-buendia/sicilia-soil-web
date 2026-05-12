"use client";

import { useState, useEffect } from "react";
import type { DataPoint, Statistics } from "@/lib/types/common.types";
import { monitoringZones } from "@/lib/config/site.config";

interface ZoneData {
  id: string;
  name: string;
  icon: string;
  moisture: DataPoint[];
  temperature: DataPoint[];
  light: DataPoint[];
}

const generateHistoricalData = (
  days: number,
  baseValue: number,
  variance: number,
): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const randomVar = Math.random() * variance * 2 - variance;
    const value = Math.max(0, Math.min(100, baseValue + randomVar));

    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }
  return data;
};

const calculateStatistics = (data: DataPoint[]): Statistics => {
  if (!data.length) return { avg: 0, max: 0, min: 0, trend: 0, last: 0 };
  const values = data.map((d) => d.value);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const last = values[values.length - 1];
  const first = values[0];
  const trend = ((last - first) / first) * 100;
  return {
    avg: parseFloat(avg.toFixed(1)),
    max: parseFloat(max.toFixed(1)),
    min: parseFloat(min.toFixed(1)),
    trend: parseFloat(trend.toFixed(1)),
    last: parseFloat(last.toFixed(1)),
  };
};

export function useAnalysisData() {
  const [zonesData, setZonesData] = useState<ZoneData[]>([]);
  const [statistics, setStatistics] = useState<Record<string, Statistics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const zoneValues: Record<
      string,
      { moisture: number; temperature: number; light: number }
    > = {
      esparto: { moisture: 78, temperature: 22, light: 65 },
      tomates: { moisture: 82, temperature: 24, light: 78 },
      olivar: { moisture: 45, temperature: 21, light: 45 },
      compost: { moisture: 55, temperature: 28, light: 30 },
      hierbas: { moisture: 68, temperature: 23, light: 70 },
      agua: { moisture: 90, temperature: 18, light: 40 },
    };

    const newZonesData = monitoringZones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      icon: zone.icon,
      moisture: generateHistoricalData(
        90,
        zoneValues[zone.id]?.moisture || 70,
        8,
      ),
      temperature: generateHistoricalData(
        90,
        zoneValues[zone.id]?.temperature || 22,
        3,
      ),
      light: generateHistoricalData(90, zoneValues[zone.id]?.light || 60, 10),
    }));

    const newStatistics: Record<string, Statistics> = {};
    newZonesData.forEach((zone) => {
      newStatistics[zone.id] = calculateStatistics(zone.moisture);
    });

    setZonesData(newZonesData);
    setStatistics(newStatistics);
    setIsLoading(false);
  }, []);

  return { zonesData, statistics, isLoading };
}
