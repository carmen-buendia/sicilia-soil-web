export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
};

export const getTrendIcon = (trend: string): string => {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
};

export const getTrendColor = (trend: string): string => {
  if (trend === "up") return "text-green-600";
  if (trend === "down") return "text-red-600";
  return "text-gray-500";
};
