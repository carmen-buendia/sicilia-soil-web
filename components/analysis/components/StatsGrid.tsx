"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { Statistics } from "@/lib/types/common.types";

interface StatsGridProps {
  zones: Array<{
    id: string;
    name: string;
    icon: string;
    stats: Statistics;
    metricColor: string;
    unit: string;
  }>;
}

export function StatsGrid({ zones }: StatsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {zones.map((zone) => {
        const trendColor =
          zone.stats.trend > 0
            ? "text-oliveGreen"
            : zone.stats.trend < 0
              ? "text-sicilian-red"
              : "text-charcoalGray/50";

        return (
          <div
            key={zone.id}
            className="bg-offWhite rounded-xl p-6 shadow-lg border border-oliveGreen/15 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{zone.icon}</span>
                <h3 className="text-lg font-bold text-charcoalGray">
                  {zone.name}
                </h3>
              </div>
              <span className={`flex items-center gap-1 text-sm ${trendColor}`}>
                {zone.stats.trend > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(zone.stats.trend)}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-oliveGreen/5 rounded-lg">
                <p className="text-sm text-oliveGreen/60">Promedio</p>
                <p className={`text-2xl font-bold ${zone.metricColor}`}>
                  {zone.stats.avg}
                  {zone.unit}
                </p>
              </div>
              <div className="text-center p-3 bg-oliveGreen/5 rounded-lg">
                <p className="text-sm text-oliveGreen/60">Actual</p>
                <p className="text-2xl font-bold text-oliveGreen">
                  {zone.stats.last}
                  {zone.unit}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm text-oliveGreen/60">
              <span>
                Mín: {zone.stats.min}
                {zone.unit}
              </span>
              <span>
                Máx: {zone.stats.max}
                {zone.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
