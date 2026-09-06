"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LineChart,
  DownloadCloud,
  Filter,
  Droplets,
  Wind,
  AlertTriangle,
  Trees,
  Activity,
} from "lucide-react";

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
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// ===== IMPORTAR TIPOS Y DATOS AMBIENTALES =====
import {
  heavyMetals,
  airQuality,
  waterQuality,
  soilQuality,
  updateEnvironmentalData,
  type HeavyMetal,
  type AirQuality,
  type WaterQuality,
  type SoilQuality,
} from "@/lib/data/ambientalData";

// ===== COMPONENTES AMBIENTALES (reutilizados) =====
const MetricCard = ({
  icon: Icon,
  title,
  value,
  unit,
  status,
  threshold,
}: {
  icon: any;
  title: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "danger";
  threshold: number;
}) => {
  const statusColor =
    status === "good"
      ? "text-green-600 bg-green-50 border-green-200"
      : status === "warning"
        ? "text-yellow-600 bg-yellow-50 border-yellow-200"
        : "text-red-600 bg-red-50 border-red-200";

  const percentage = Math.min(100, (value / threshold) * 100);

  return (
    <div className={`rounded-xl p-4 border shadow-sm ${statusColor}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">
            {value.toFixed(1)}
            <span className="text-sm font-normal ml-1 opacity-60">{unit}</span>
          </p>
        </div>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
      <div className="mt-2">
        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, percentage)}%`,
              background:
                status === "good"
                  ? "#22c55e"
                  : status === "warning"
                    ? "#eab308"
                    : "#ef4444",
            }}
          />
        </div>
        <p className="text-[10px] mt-1 opacity-60">
          Umbral: {threshold} {unit}
        </p>
      </div>
    </div>
  );
};

// ===== COMPONENTE PRINCIPAL =====
export default function AnalysisPage() {
  // Estados para análisis agronómico
  const [selectedZones, setSelectedZones] = useState<string[]>([
    "tomates",
    "olivar",
  ]);
  const [selectedMetric, setSelectedMetric] = useState("moisture");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [showPredictions, setShowPredictions] = useState(true);

  // Estados para análisis ambiental
  const [activeTab, setActiveTab] = useState<"agronomico" | "ambiental">(
    "agronomico",
  );
  const [ambientalData, setAmbientalData] = useState<{
    heavyMetals: HeavyMetal[];
    airQuality: AirQuality[];
    waterQuality: WaterQuality[];
    soilQuality: SoilQuality[];
  }>({
    heavyMetals,
    airQuality,
    waterQuality,
    soilQuality,
  });

  // Actualizar datos ambientales cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      updateEnvironmentalData();
      setAmbientalData({
        heavyMetals: [...heavyMetals],
        airQuality: [...airQuality],
        waterQuality: [...waterQuality],
        soilQuality: [...soilQuality],
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  // ===== GRÁFICOS AMBIENTALES =====
  const createEnvChart = (
    title: string,
    data: { name: string; value: number; threshold: number }[],
    unit: string,
    color: string,
  ) => ({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 250,
    },
    title: { text: title, style: { fontSize: "14px", fontWeight: "bold" } },
    xAxis: {
      categories: data.map((d) => d.name),
    },
    yAxis: {
      title: { text: unit },
    },
    series: [
      {
        name: "Valor actual",
        data: data.map((d) => d.value),
        color: color,
        dataLabels: { enabled: true, format: `{y} ${unit}` },
      },
      {
        name: "Umbral",
        data: data.map((d) => d.threshold),
        color: "#ff6b6b",
        type: "line",
        dashStyle: "Dash",
        dataLabels: { enabled: false },
      },
    ],
    credits: { enabled: false },
  });

  // Ahora usando tipos explícitos en los map
  const heavyMetalsChart = createEnvChart(
    "Metales pesados vs umbrales",
    ambientalData.heavyMetals.map((m: HeavyMetal) => ({
      name: m.symbol,
      value: m.value,
      threshold: m.threshold,
    })),
    "µg/L",
    "#e74c3c",
  );

  const airQualityChart = createEnvChart(
    "Calidad del aire vs umbrales",
    ambientalData.airQuality.map((a: AirQuality) => ({
      name: a.name,
      value: a.value,
      threshold: a.threshold,
    })),
    "µg/m³",
    "#3498db",
  );

  const waterQualityChart = createEnvChart(
    "Calidad del agua vs umbrales",
    ambientalData.waterQuality.map((w: WaterQuality) => ({
      name: w.name,
      value: w.value,
      threshold: w.threshold,
    })),
    "unidades",
    "#2ecc71",
  );

  const soilQualityChart = createEnvChart(
    "Calidad del suelo vs umbrales",
    ambientalData.soilQuality.map((s: SoilQuality) => ({
      name: s.name,
      value: s.value,
      threshold: s.threshold,
    })),
    "unidades",
    "#f39c12",
  );

  // ===== EXPORTAR DATOS (agronómicos + ambientales) =====
  const handleExport = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      period: `${selectedPeriod} días`,
      metric: currentMetric?.name,
      agronomic: {
        zones: filteredZones.map((z) => ({
          name: z.name,
          stats: z.stats,
        })),
      },
      environmental: {
        heavyMetals: ambientalData.heavyMetals,
        airQuality: ambientalData.airQuality,
        waterQuality: ambientalData.waterQuality,
        soilQuality: ambientalData.soilQuality,
      },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analisis-completo-${new Date().toISOString().split("T")[0]}.json`;
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

        {/* Pestañas */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-oliveGreen/15 shadow-sm">
          <button
            onClick={() => setActiveTab("agronomico")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "agronomico"
                ? "bg-oliveGreen text-white shadow-md"
                : "text-charcoalGray/60 hover:bg-oliveGreen/10"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Droplets className="w-4 h-4" />
              Agronómico
            </span>
          </button>
          <button
            onClick={() => setActiveTab("ambiental")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "ambiental"
                ? "bg-oliveGreen text-white shadow-md"
                : "text-charcoalGray/60 hover:bg-oliveGreen/10"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              Ambiental
            </span>
          </button>
        </div>

        {/* ===== PESTAÑA AGRONÓMICO ===== */}
        {activeTab === "agronomico" && (
          <>
            {/* Filtros */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-oliveGreen/15 mb-8">
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
                  onTogglePredictions={() =>
                    setShowPredictions(!showPredictions)
                  }
                />
              </div>
            </div>

            {selectedZones.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-lg border border-oliveGreen/15 text-center">
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
          </>
        )}

        {/* ===== PESTAÑA AMBIENTAL ===== */}
        {activeTab === "ambiental" && (
          <div className="space-y-6">
            {/* Tarjetas de resumen ambiental */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
                  Metales pesados (Pb)
                </p>
                <p className="text-2xl font-bold text-charcoalGray mt-1">
                  {ambientalData.heavyMetals
                    .find((m) => m.id === "pb")
                    ?.value.toFixed(1)}
                  <span className="text-sm font-normal text-oliveGreen/50 ml-1">
                    µg/L
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      ambientalData.heavyMetals.find((m) => m.id === "pb")
                        ?.status === "good"
                        ? "bg-green-500"
                        : ambientalData.heavyMetals.find((m) => m.id === "pb")
                              ?.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-oliveGreen/60">
                    {ambientalData.heavyMetals.find((m) => m.id === "pb")
                      ?.status || ""}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
                  CO₂ en aire
                </p>
                <p className="text-2xl font-bold text-charcoalGray mt-1">
                  {ambientalData.airQuality
                    .find((a) => a.id === "co2")
                    ?.value.toFixed(0)}
                  <span className="text-sm font-normal text-oliveGreen/50 ml-1">
                    ppm
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      ambientalData.airQuality.find((a) => a.id === "co2")
                        ?.status === "good"
                        ? "bg-green-500"
                        : ambientalData.airQuality.find((a) => a.id === "co2")
                              ?.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-oliveGreen/60">
                    {ambientalData.airQuality.find((a) => a.id === "co2")
                      ?.status || ""}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
                  pH agua
                </p>
                <p className="text-2xl font-bold text-charcoalGray mt-1">
                  {ambientalData.waterQuality
                    .find((w) => w.id === "ph")
                    ?.value.toFixed(1)}
                  <span className="text-sm font-normal text-oliveGreen/50 ml-1">
                    pH
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      ambientalData.waterQuality.find((w) => w.id === "ph")
                        ?.status === "good"
                        ? "bg-green-500"
                        : ambientalData.waterQuality.find((w) => w.id === "ph")
                              ?.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-oliveGreen/60">
                    {ambientalData.waterQuality.find((w) => w.id === "ph")
                      ?.status || ""}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
                  Humedad suelo
                </p>
                <p className="text-2xl font-bold text-charcoalGray mt-1">
                  {ambientalData.soilQuality
                    .find((s) => s.id === "moisture")
                    ?.value.toFixed(0)}
                  <span className="text-sm font-normal text-oliveGreen/50 ml-1">
                    %
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      ambientalData.soilQuality.find((s) => s.id === "moisture")
                        ?.status === "good"
                        ? "bg-green-500"
                        : ambientalData.soilQuality.find(
                              (s) => s.id === "moisture",
                            )?.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-oliveGreen/60">
                    {ambientalData.soilQuality.find((s) => s.id === "moisture")
                      ?.status || ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Gráficos ambientales */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={heavyMetalsChart}
                />
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={airQualityChart}
                />
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={waterQualityChart}
                />
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={soilQualityChart}
                />
              </div>
            </div>

            {/* Tabla detalle ambiental */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10 overflow-x-auto">
              <h3 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-oliveGreen" />
                Detalle de parámetros ambientales
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-oliveGreen/10">
                    <th className="text-left py-2 text-oliveGreen/60 font-medium">
                      Parámetro
                    </th>
                    <th className="text-left py-2 text-oliveGreen/60 font-medium">
                      Valor
                    </th>
                    <th className="text-left py-2 text-oliveGreen/60 font-medium">
                      Unidad
                    </th>
                    <th className="text-left py-2 text-oliveGreen/60 font-medium">
                      Umbral
                    </th>
                    <th className="text-left py-2 text-oliveGreen/60 font-medium">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Metales pesados */}
                  {ambientalData.heavyMetals.map((m: HeavyMetal) => (
                    <tr
                      key={m.id}
                      className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                    >
                      <td className="py-2 font-medium">
                        {m.name} ({m.symbol})
                      </td>
                      <td>{m.value.toFixed(1)}</td>
                      <td>{m.unit}</td>
                      <td>{m.threshold}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            m.status === "good"
                              ? "bg-green-100 text-green-700"
                              : m.status === "warning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Aire */}
                  {ambientalData.airQuality.map((a: AirQuality) => (
                    <tr
                      key={a.id}
                      className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                    >
                      <td className="py-2 font-medium">{a.name}</td>
                      <td>{a.value.toFixed(1)}</td>
                      <td>{a.unit}</td>
                      <td>{a.threshold}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            a.status === "good"
                              ? "bg-green-100 text-green-700"
                              : a.status === "warning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Agua */}
                  {ambientalData.waterQuality.map((w: WaterQuality) => (
                    <tr
                      key={w.id}
                      className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                    >
                      <td className="py-2 font-medium">{w.name}</td>
                      <td>{w.value.toFixed(1)}</td>
                      <td>{w.unit}</td>
                      <td>{w.threshold}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            w.status === "good"
                              ? "bg-green-100 text-green-700"
                              : w.status === "warning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Suelo */}
                  {ambientalData.soilQuality.map((s: SoilQuality) => (
                    <tr
                      key={s.id}
                      className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                    >
                      <td className="py-2 font-medium">{s.name}</td>
                      <td>{s.value.toFixed(1)}</td>
                      <td>{s.unit}</td>
                      <td>{s.threshold}</td>
                      <td>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            s.status === "good"
                              ? "bg-green-100 text-green-700"
                              : s.status === "warning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leyenda de riesgos */}
            <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl p-4 border border-oliveGreen/10 flex flex-wrap items-center gap-4 text-xs">
              <span className="font-medium text-charcoalGray">
                Niveles de riesgo:
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Bajo
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>{" "}
                Moderado
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Alto
              </span>
              <span className="text-oliveGreen/50 ml-auto">
                Basado en umbrales de referencia
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
