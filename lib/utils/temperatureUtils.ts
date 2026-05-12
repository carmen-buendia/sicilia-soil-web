import { Recommendation } from "../types/monitoring.types";

export const getTemperatureRecommendations = (temp: number): Recommendation => {
  if (temp > 35) {
    return {
      text: "Temperatura extremadamente alta. Riesgo de estrés hídrico.",
      action: "💧 Aumentar riego y proteger del sol",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  } else if (temp > 30) {
    return {
      text: "Temperatura alta. Las plantas pueden sufrir estrés.",
      action: "🌤️ Proteger del sol directo en horas centrales",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    };
  } else if (temp < 10) {
    return {
      text: "Temperatura baja. Riesgo de heladas.",
      action: "❄️ Proteger plantas sensibles",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    };
  } else {
    return {
      text: "Temperatura adecuada para el crecimiento.",
      action: "✅ Condiciones óptimas",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    };
  }
};

export const getTemperatureStatusColor = (
  temp: number,
  optimal: number,
): string => {
  if (temp <= optimal) return "bg-green-100 text-green-800";
  if (temp <= optimal + 5) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export const getTemperatureStatusText = (
  temp: number,
  optimal: number,
): string => {
  if (temp <= optimal) return "Óptimo";
  if (temp <= optimal + 5) return "Moderado";
  return "Alta - Proteger";
};

export const getTemperatureProgressColor = (
  temp: number,
  maxTemp: number = 45,
): string => {
  const percentage = (temp / maxTemp) * 100;
  if (percentage < 40) return "#22c55e";
  if (percentage < 70) return "#eab308";
  return "#ef4444";
};
