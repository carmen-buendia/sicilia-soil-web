export type TrendType = "up" | "down" | "stable";

export const getTrendIcon = (trend: TrendType): string => {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
};

export const getTrendColor = (trend: TrendType): string => {
  if (trend === "up") return "text-green-600";
  if (trend === "down") return "text-red-600";
  return "text-gray-500";
};

export const getTrendText = (trend: TrendType): string => {
  if (trend === "up") return "Aumentando";
  if (trend === "down") return "Disminuyendo";
  return "Estable";
};
