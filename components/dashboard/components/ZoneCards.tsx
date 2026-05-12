"use client";

import Link from "next/link";
import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/formatters";

interface GardenZone {
  id: string;
  name: string;
  type: string;
  location: string;
  moisture: number;
  temperature: number;
  light: number;
  wind: number;
  status: string;
  icon: string;
  lastUpdate: string;
}

interface ZoneCardProps {
  zone: GardenZone;
  onViewHistory: (id: string) => void;
}

export function ZoneCard({ zone, onViewHistory }: ZoneCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "óptimo":
        return "bg-green-100 text-green-700";
      case "saludable":
        return "bg-blue-100 text-blue-700";
      case "necesita riego":
        return "bg-red-100 text-red-700";
      case "activo":
        return "bg-yellow-100 text-yellow-700";
      case "lleno":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMoistureColor = (value: number) => {
    if (value >= 70) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getTempColor = (value: number) => {
    if (value >= 20 && value <= 25) return "text-green-600";
    if (value >= 15 && value <= 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getLightColor = (value: number) => {
    if (value >= 60) return "text-green-600";
    if (value >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-oliveGreen/15 hover:shadow-xl transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-charcoalGray">{zone.name}</h3>
            <p className="text-xs text-oliveGreen/60">{zone.type}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}
        >
          {zone.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-oliveGreen/60">Humedad</span>
          <span
            className={`text-sm font-semibold ml-auto ${getMoistureColor(zone.moisture)}`}
          >
            {zone.moisture}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-red-500" />
          <span className="text-xs text-oliveGreen/60">Temperatura</span>
          <span
            className={`text-sm font-semibold ml-auto ${getTempColor(zone.temperature)}`}
          >
            {zone.temperature}°C
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="text-xs text-oliveGreen/60">Luz Solar</span>
          <span
            className={`text-sm font-semibold ml-auto ${getLightColor(zone.light)}`}
          >
            {zone.light}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-oliveGreen/60">Viento</span>
          <span className="text-sm font-semibold ml-auto">
            {zone.wind} km/h
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-oliveGreen/10">
        <div className="flex flex-col">
          <span className="text-xs text-oliveGreen/50">{zone.location}</span>
          <span className="text-xs text-oliveGreen/40 mt-0.5">
            Actualizado: {formatRelativeTime(zone.lastUpdate)}
          </span>
        </div>
        <button
          onClick={() => onViewHistory(zone.id)}
          className="text-xs text-oliveGreen hover:text-sicilian-red transition-colors"
        >
          Ver histórico →
        </button>
      </div>
    </div>
  );
}
