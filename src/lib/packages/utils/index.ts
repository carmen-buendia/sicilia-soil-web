// ============================================
// DATE UTILITIES
// ============================================
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

// ============================================
// STATUS UTILITIES
// ============================================
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    saludable: "bg-green-100 text-green-800",
    healthy: "bg-green-100 text-green-800",
    óptimo: "bg-blue-100 text-blue-800",
    optimal: "bg-blue-100 text-blue-800",
    "necesita riego": "bg-red-100 text-red-800",
    needs_water: "bg-red-100 text-red-800",
    activo: "bg-purple-100 text-purple-800",
    active: "bg-purple-100 text-purple-800",
    lleno: "bg-cyan-100 text-cyan-800",
    full: "bg-cyan-100 text-cyan-800",
    excelente: "bg-green-100 text-green-800",
    excellent: "bg-green-100 text-green-800",
    bueno: "bg-blue-100 text-blue-800",
    good: "bg-blue-100 text-blue-800",
    listo: "bg-yellow-100 text-yellow-800",
    ready: "bg-yellow-100 text-yellow-800",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800";
};

export const getStatusVariant = (status: string): "success" | "warning" | "error" | "info" | "default" => {
  const map: Record<string, any> = {
    saludable: "success",
    healthy: "success",
    óptimo: "info",
    optimal: "info",
    "necesita riego": "warning",
    needs_water: "warning",
    activo: "info",
    active: "info",
    lleno: "success",
    full: "success",
    excelente: "success",
    excellent: "success",
    bueno: "info",
    good: "info",
    listo: "warning",
    ready: "warning",
  };
  return map[status] || "default";
};

export const getStatusText = (status: string): string => {
  const map: Record<string, string> = {
    saludable: "Healthy",
    healthy: "Healthy",
    óptimo: "Optimal",
    optimal: "Optimal",
    "necesita riego": "Needs Water",
    needs_water: "Needs Water",
    activo: "Active",
    active: "Active",
    lleno: "Full",
    full: "Full",
    excelente: "Excellent",
    excellent: "Excellent",
    bueno: "Good",
    good: "Good",
    listo: "Ready",
    ready: "Ready",
  };
  return map[status] || status;
};

// ============================================
// FORMAT UTILITIES
// ============================================
export const formatWithUnit = (value: number, unit: string): string => {
  return `${value}${unit}`;
};

export const calculatePercentage = (value: number, max: number = 100): number => {
  return Math.min(100, Math.max(0, (value / max) * 100));
};

// ============================================
// DATA GENERATION (for demos)
// ============================================
export const generateHistoricalData = (
  days: number,
  baseValue: number,
  variance: number
): { timestamp: string; value: number }[] => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const randomVar = Math.random() * variance * 2 - variance;
    const trend = Math.sin((i / 7) * Math.PI) * 5;
    const value = Math.max(0, Math.min(100, baseValue + randomVar + trend));
    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }
  return data;
};
