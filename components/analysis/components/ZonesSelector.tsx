"use client";

import { monitoringZones } from "@/lib/config/site.config";

interface ZoneSelectorProps {
  selectedZones: string[];
  onZoneToggle: (zoneId: string) => void;
}

export function ZoneSelector({
  selectedZones,
  onZoneToggle,
}: ZoneSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-oliveGreen mb-3">
        Zonas a comparar
      </label>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {monitoringZones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onZoneToggle(zone.id)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
              selectedZones.includes(zone.id)
                ? "bg-oliveGreen/10 text-oliveGreen border border-oliveGreen/30"
                : "bg-offWhite text-charcoalGray/70 hover:bg-oliveGreen/5 border border-oliveGreen/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{zone.icon}</span>
              <span className="font-medium">{zone.name}</span>
            </span>
            {selectedZones.includes(zone.id) && (
              <span className="text-xs bg-oliveGreen/20 text-oliveGreen px-2 py-0.5 rounded-full">
                seleccionada
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
