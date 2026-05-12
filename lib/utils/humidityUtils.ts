import { Recommendation } from "../types/monitoring.types";

export const getHumidityRecommendations = (
  humidity: number,
  optimal: number,
): Recommendation => {
  if (humidity < optimal - 15) {
    return {
      text: "Humedad muy baja. Las plantas están en estrés hídrico.",
      action: "💧 Riego urgente necesario",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  } else if (humidity < optimal) {
    return {
      text: "Humedad por debajo del óptimo. Requiere atención.",
      action: "💧 Programar riego adicional",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    };
  } else if (humidity > optimal + 20) {
    return {
      text: "Exceso de humedad. Riesgo de hongos y pudrición.",
      action: "💨 Mejorar drenaje y ventilación",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    };
  } else {
    return {
      text: "Nivel de humedad óptimo para el cultivo.",
      action: "✅ Mantener condiciones actuales",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    };
  }
};

export const getHumidityStatusColor = (
  current: number,
  optimal: number,
): string => {
  if (current >= optimal) return "bg-green-100 text-green-800 border-green-200";
  if (current >= optimal - 15)
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
};

export const getHumidityStatusText = (
  current: number,
  optimal: number,
): string => {
  if (current >= optimal) return "Óptimo";
  if (current >= optimal - 15) return "Moderado";
  return "Crítico - Regar";
};

export const getHumidityProgressColor = (humidity: number): string => {
  if (humidity < 40) return "#ef4444";
  if (humidity < 60) return "#f97316";
  if (humidity < 80) return "#eab308";
  return "#22c55e";
};
