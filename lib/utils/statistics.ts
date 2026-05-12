import type { DataPoint, Statistics } from "@/lib/types/common.types";

export const calculateStatistics = (data: DataPoint[]): Statistics => {
  if (!data.length) {
    return { avg: 0, max: 0, min: 0, trend: 0, last: 0 };
  }

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

export const generateHistoricalData = (
  days: number,
  baseValue: number,
  variance: number,
  seasonality: boolean = true,
): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const randomVar = Math.random() * variance * 2 - variance;
    const seasonal = seasonality
      ? Math.sin((i / 7) * Math.PI) * (variance / 2)
      : 0;
    const value = Math.max(0, Math.min(100, baseValue + randomVar + seasonal));

    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return data;
};

export const calculatePrediction = (
  data: DataPoint[],
  days: number = 7,
): { value: number; confidence: number }[] => {
  if (data.length < 7) return [];

  const recentData = data.slice(-14);
  const values = recentData.map((d) => d.value);
  const avgChange = (values[values.length - 1] - values[0]) / values.length;

  const predictions = [];
  const lastValue = values[values.length - 1];
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  const volatility = Math.sqrt(variance) || 5;

  for (let i = 1; i <= days; i++) {
    const predictedValue = lastValue + avgChange * i;
    const confidence = Math.max(60, Math.min(95, 100 - volatility * i));

    predictions.push({
      value: Math.max(0, Math.min(100, parseFloat(predictedValue.toFixed(1)))),
      confidence: parseFloat(confidence.toFixed(0)),
    });
  }

  return predictions;
};
