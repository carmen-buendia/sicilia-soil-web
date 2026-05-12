"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LineChart, DownloadCloud, Filter } from "lucide-react";

import { monitoringZones, metrics } from "@/lib/config/site.config";
import { getMetricColor, getMetricUnit } from "@/components/analysis/utils";
import {
  useAnalysisData,
  ZoneSelector,
  MetricsSelector,
  PeriodSelector,
  StatsGrid,
  PredictionCard,
  InsightsFooter,
} from "@/components/analysis";
import { DataTable } from "@/components/analysis/components/DataTable";

export default function AnalysisPage() {
  const [selectedZones, setSelectedZones] = useState<string[]>([
    "tomates",
    "olivar",
  ]);
  const [selectedMetric, setSelectedMetric] = useState("moisture");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [showPredictions, setShowPredictions] = useState(true);

  const { zonesData, statistics, isLoading } = useAnalysisData();

  const currentMetric = metrics.find((m) => m.id === selectedMetric);
  const unit = getMetricUnit(selectedMetric);
  const metricColor = getMetricColor(selectedMetric);

  const filteredZones = zonesData
    .filter((z) => selectedZones.includes(z.id))
    .map((zone) => ({
      id: zone.id,
      name: zone.name,
      icon: zone.icon,
      stats: statistics[zone.id] || {
        avg: 0,
        max: 0,
        min: 0,
        trend: 0,
        last: 0,
      },
      metricColor,
      unit,
    }));

  const predictionZones = zonesData
    .filter((z) => selectedZones.includes(z.id))
    .map((zone) => ({
      id: zone.id,
      name: zone.name,
      icon: zone.icon,
      data: zone[selectedMetric as keyof typeof zone] as any[],
    }));

  const handleExport = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      period: `${selectedPeriod} días`,
      metric: currentMetric?.name,
      zones: filteredZones.map((z) => ({
        name: z.name,
        stats: z.stats,
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analisis-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-oliveGreen/20 border-t-oliveGreen rounded-full animate-spin mx-auto mb-4" />
          <p className="text-oliveGreen/70">Cargando datos de análisis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <LineChart className="w-8 h-8 text-oliveGreen" />
                Análisis de Datos
              </h1>
              <p className="text-oliveGreen/70">
                Estadísticas avanzadas y comparativas entre zonas
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="px-4 py-2 bg-oliveGreen text-offWhite rounded-lg flex items-center gap-2 hover:bg-oliveGreen/90 transition-all hover:scale-[1.02]"
          >
            <DownloadCloud className="w-4 h-4" />
            Exportar datos
          </button>
        </div>

        {/* Filters */}
        <div className="bg-offWhite rounded-xl p-6 shadow-lg border border-oliveGreen/15 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <ZoneSelector
              selectedZones={selectedZones}
              onZoneToggle={(zoneId) => {
                setSelectedZones((prev) =>
                  prev.includes(zoneId)
                    ? prev.filter((id) => id !== zoneId)
                    : [...prev, zoneId],
                );
              }}
            />
            <MetricsSelector
              selectedMetric={selectedMetric}
              onMetricChange={setSelectedMetric}
            />
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              showPredictions={showPredictions}
              onTogglePredictions={() => setShowPredictions(!showPredictions)}
            />
          </div>
        </div>

        {selectedZones.length === 0 ? (
          <div className="bg-offWhite rounded-xl p-12 shadow-lg border border-oliveGreen/15 text-center">
            <Filter className="w-16 h-16 text-oliveGreen/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-charcoalGray mb-2">
              Selecciona zonas para analizar
            </h2>
            <p className="text-oliveGreen/60">
              Elige al menos una zona del panel izquierdo para ver los datos
            </p>
          </div>
        ) : (
          <>
            <StatsGrid zones={filteredZones} />

            {showPredictions && predictionZones.length > 0 && (
              <PredictionCard
                zones={predictionZones}
                metricName={currentMetric?.name || ""}
                unit={unit}
                onClose={() => setShowPredictions(false)}
              />
            )}

            {predictionZones.length > 0 && (
              <DataTable zones={predictionZones} unit={unit} />
            )}

            <InsightsFooter />
          </>
        )}
      </div>
    </div>
  );
}
