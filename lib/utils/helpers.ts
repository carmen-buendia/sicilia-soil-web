/**
 * Helper functions for the Sicilia Soil application
 */

/**
 * Returns CSS classes for status badges based on status string
 * @param status - Status string from sensor data
 * @returns Tailwind CSS classes
 */
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    // Garden zone statuses
    healthy: "bg-green-100 text-green-800 border-green-200",
    optimal: "bg-blue-100 text-blue-800 border-blue-200",
    needs_water: "bg-red-100 text-red-800 border-red-200",
    active: "bg-purple-100 text-purple-800 border-purple-200",
    full: "bg-cyan-100 text-cyan-800 border-cyan-200",
    // Mushroom statuses
    excellent: "bg-green-100 text-green-800 border-green-200",
    good: "bg-blue-100 text-blue-800 border-blue-200",
    ready: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

/**
 * Formats a date to a relative time string (e.g., "2 minutes ago")
 * @param date - ISO date string
 * @returns Human-readable relative time
 */
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

/**
 * Calculates percentage for progress bars
 * @param value - Current value
 * @param max - Maximum value (default 100)
 * @returns Percentage clamped between 0 and 100
 */
export const calculatePercentage = (
  value: number,
  max: number = 100,
): number => {
  return Math.min(100, Math.max(0, (value / max) * 100));
};

/**
 * Formats a number with unit
 * @param value - Number to format
 * @param unit - Unit string (%, °C, km/h, etc.)
 * @returns Formatted string
 */
export const formatWithUnit = (value: number, unit: string): string => {
  return `${value}${unit}`;
};
