"use client";

import { periods } from "@/lib/config/site.config";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (periodId: string) => void;
  showPredictions?: boolean;
  onTogglePredictions?: () => void;
}

export function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
  showPredictions = true,
  onTogglePredictions,
}: PeriodSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-oliveGreen mb-3">
        Período de tiempo
      </label>
      <div className="grid grid-cols-2 gap-2">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => onPeriodChange(period.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period.id
                ? "bg-oliveGreen text-offWhite"
                : "bg-offWhite text-charcoalGray/70 hover:bg-oliveGreen/5 border border-oliveGreen/10"
            }`}
          >
            {period.name}
          </button>
        ))}
      </div>
      {onTogglePredictions && (
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm text-oliveGreen">
            <input
              type="checkbox"
              checked={showPredictions}
              onChange={onTogglePredictions}
              className="rounded text-oliveGreen focus:ring-oliveGreen"
            />
            Mostrar predicciones
          </label>
        </div>
      )}
    </div>
  );
}
