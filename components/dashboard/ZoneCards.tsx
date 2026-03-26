import { Droplets, Thermometer, Sun, Wind } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ZoneCardProps {
  zone: {
    id: string;
    name: string;
    type: string;
    icon: string;
    location: string;
    moisture: number;
    temperature: number;
    light: number;
    wind: number;
    status: string;
    lastUpdate: string;
  };
  onViewHistory?: (zoneId: string) => void;
}

const getStatusVariant = (status: string): 'success' | 'warning' | 'info' | 'default' => {
  const map: Record<string, any> = {
    healthy: 'success',
    optimal: 'info',
    needs_water: 'warning',
    active: 'info',
    full: 'success',
  };
  return map[status] || 'default';
};

const getStatusText = (status: string): string => {
  const map: Record<string, string> = {
    healthy: 'Healthy',
    optimal: 'Optimal',
    needs_water: 'Needs Water',
    active: 'Active',
    full: 'Full',
  };
  return map[status] || status;
};

const formatTime = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (diff < 1) return 'just now';
  if (diff < 60) return `${diff} min ago`;
  return `${Math.floor(diff / 60)} hours ago`;
};

export const ZoneCard = ({ zone, onViewHistory }: ZoneCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h3 className="font-bold text-[#2C2C2C]">{zone.name}</h3>
            <p className="text-sm text-[#C4A27A]">{zone.type}</p>
          </div>
        </div>
        <Badge variant={getStatusVariant(zone.status)} size="sm">
          {getStatusText(zone.status)}
        </Badge>
      </div>

      <p className="text-sm text-[#C4A27A] mb-4 flex items-center gap-1">
        📍 {zone.location} • 🕒 {formatTime(zone.lastUpdate)}
      </p>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-[#5F6B3D]">
              <Droplets className="w-4 h-4" /> Humidity
            </span>
            <span className="font-medium">{zone.moisture}%</span>
          </div>
          <div className="w-full h-2 bg-[#F5D7B3] rounded-full overflow-hidden">
            <div className="h-full bg-[#B43F2B] rounded-full" style={{ width: `${zone.moisture}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="flex items-center gap-1 text-sm text-[#2C2C2C]/70">
            <Thermometer className="w-4 h-4 text-[#E6B17E]" /> {zone.temperature}°C
          </div>
          <div className="flex items-center gap-1 text-sm text-[#2C2C2C]/70">
            <Sun className="w-4 h-4 text-[#E6B17E]" /> {zone.light}%
          </div>
          <div className="flex items-center gap-1 text-sm text-[#2C2C2C]/70">
            <Wind className="w-4 h-4 text-[#E6B17E]" /> {zone.wind}km/h
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewHistory?.(zone.id)}
        className="w-full mt-6 py-2 text-sm font-medium text-[#5F6B3D] border-t border-[#F5D7B3] pt-4 hover:text-[#B43F2B] transition-colors"
      >
        View History →
      </button>
    </div>
  );
};