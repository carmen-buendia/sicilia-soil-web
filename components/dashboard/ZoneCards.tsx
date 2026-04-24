import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { Badge } from "../common/Badge";

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

const getStatusVariant = (
  status: string,
): "success" | "warning" | "info" | "default" => {
  const map: Record<string, any> = {
    saludable: "success",
    óptimo: "success",
    optimo: "success",
    healthy: "success",
    optimal: "success",
    active: "info",
    activo: "info",
    necesita_riego: "warning",
    needs_water: "warning",
    lleno: "success",
    full: "success",
  };
  return map[status] || "default";
};

const getStatusText = (status: string): string => {
  const map: Record<string, string> = {
    saludable: "Saludable",
    óptimo: "Óptimo",
    optimo: "Óptimo",
    healthy: "Saludable",
    optimal: "Óptimo",
    necesita_riego: "Necesita riego",
    needs_water: "Necesita riego",
    active: "Activo",
    activo: "Activo",
    lleno: "Lleno",
    full: "Lleno",
  };
  return map[status] || status;
};

const formatTime = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (diff < 1) return "ahora mismo";
  if (diff < 60) return `hace ${diff} min`;
  if (diff < 1440) return `hace ${Math.floor(diff / 60)} horas`;
  return `hace ${Math.floor(diff / 1440)} días`;
};

export const ZoneCard = ({ zone, onViewHistory }: ZoneCardProps) => {
  // Determinar color de la barra de humedad según el valor
  const getMoistureBarColor = (moisture: number) => {
    if (moisture < 40) return "bg-sicilian-red";
    if (moisture > 80) return "bg-sicilian-red/70";
    return "bg-oliveGreen";
  };

  return (
    <div className="bg-offWhite rounded-2xl p-6 shadow-sm border border-oliveGreen/15 hover:shadow-md hover:border-wheatGold/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h3 className="font-bold text-charcoalGray group-hover:text-sicilian-red transition-colors">
              {zone.name}
            </h3>
            <p className="text-sm text-oliveGreen/60">{zone.type}</p>
          </div>
        </div>
        <Badge variant={getStatusVariant(zone.status)}>
          {getStatusText(zone.status)}
        </Badge>
      </div>

      <p className="text-sm text-oliveGreen/60 mb-4 flex items-center gap-1">
        <span>📍</span> {zone.location} • <span>🕒</span>{" "}
        {formatTime(zone.lastUpdate)}
      </p>

      <div className="space-y-3">
        {/* Humedad */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-oliveGreen">
              <Droplets className="w-4 h-4" /> Humedad
            </span>
            <span className="font-medium text-charcoalGray">
              {zone.moisture}%
            </span>
          </div>
          <div className="w-full h-2 bg-oliveGreen/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${getMoistureBarColor(zone.moisture)} rounded-full transition-all duration-500`}
              style={{ width: `${zone.moisture}%` }}
            />
          </div>
        </div>

        {/* Métricas en grid */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="flex items-center gap-1 text-sm text-charcoalGray/70 bg-oliveGreen/5 rounded-lg px-2 py-1.5">
            <Thermometer className="w-4 h-4 text-sicilian-red" />
            <span>{zone.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-charcoalGray/70 bg-oliveGreen/5 rounded-lg px-2 py-1.5">
            <Sun className="w-4 h-4 text-wheatGold" />
            <span>{zone.light}%</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-charcoalGray/70 bg-oliveGreen/5 rounded-lg px-2 py-1.5">
            <Wind className="w-4 h-4 text-oliveGreen" />
            <span>{zone.wind}km/h</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewHistory?.(zone.id)}
        className="w-full mt-6 py-2 text-sm font-medium text-oliveGreen border-t border-oliveGreen/10 pt-4 hover:text-sicilian-red transition-colors flex items-center justify-center gap-1 group/btn"
      >
        Ver historial
        <span className="group-hover/btn:translate-x-1 transition-transform">
          →
        </span>
      </button>
    </div>
  );
};
