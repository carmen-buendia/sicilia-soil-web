export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export const calculatePercentage = (value: number, max: number = 100): number => {
  return Math.min(100, Math.max(0, (value / max) * 100));
};

// Añade al final del archivo

export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    healthy: 'bg-green-100 text-green-800',
    optimal: 'bg-blue-100 text-blue-800',
    needs_water: 'bg-red-100 text-red-800',
    active: 'bg-purple-100 text-purple-800',
    full: 'bg-cyan-100 text-cyan-800',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

export const formatWithUnit = (value: number, unit: string): string => {
  return `${value}${unit}`;
};