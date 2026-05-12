import { Recommendation } from "../types/monitoring.types";

export const getLightRecommendations = (light: number): Recommendation => {
  if (light < 30) {
    return {
      text: "Muy poca luz. Considera trasladar plantas o usar luces de cultivo.",
      action: "🌱 Necesita luz urgente",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  } else if (light < 50) {
    return {
      text: "Luz insuficiente para plantas que requieren sol directo.",
      action: "🌿 Bueno para plantas de sombra",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    };
  } else if (light < 70) {
    return {
      text: "Luz adecuada para la mayoría de hortalizas.",
      action: "✅ Bueno para tomates, hierbas",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    };
  } else {
    return {
      text: "Excelente luz. Ideal para plantas mediterráneas.",
      action: "☀️ Perfecto para olivos, esparto",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    };
  }
};

export const getLightStatusColor = (status: string): string => {
  switch (status) {
    case "excelente":
      return "bg-green-100 text-green-800 border-green-200";
    case "buena":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "baja":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "muy baja":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getLightStatusText = (
  current: number,
  optimal: number,
): string => {
  if (current >= optimal) return "Óptimo";
  if (current >= optimal - 15) return "Moderado";
  return "Crítico - Poca luz";
};

export const getLightProgressColor = (light: number): string => {
  if (light < 30) return "#ef4444";
  if (light < 50) return "#f97316";
  if (light < 70) return "#eab308";
  return "#22c55e";
};

export const getRecommendedPlants = (light: number): string[] => {
  if (light > 70) {
    return ["Romero 🌿", "Tomillo 🌱", "Olivo 🫒", "Esparto 🌾"];
  } else if (light > 50) {
    return ["Tomates 🍅", "Pimientos 🌶️", "Berenjenas 🍆", "Albahaca 🌿"];
  } else {
    return ["Lechugas 🍃", "Espinacas 🥬", "Perejil 🌱", "Setas 🍄"];
  }
};
