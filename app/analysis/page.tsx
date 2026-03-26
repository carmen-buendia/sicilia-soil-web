"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  ArrowLeft,
  DownloadCloud,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Download,
  Droplets,
  Thermometer,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { HumidityChart } from "@/components/charts/HumidityChart";
import { TemperatureChart } from "@/components/charts/TemperatureChart";
import { LightChart } from "@/components/charts/LightChart";

// ============================================
// FUNCIÓN PARA GENERAR DATOS HISTÓRICOS
// ============================================
interface DataPoint {
  timestamp: string;
  value: number;
}

const generateHistoricalData = (
  days: number,
  baseValue: number,
  variance: number,
): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const randomVar = Math.random() * variance * 2 - variance;
    const trend = Math.sin((i / 7) * Math.PI) * 5;
    const value = Math.max(0, Math.min(100, baseValue + randomVar + trend));

    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }

  return data;
};

// ============================================
// DATOS DE LAS ZONAS - SE INICIALIZAN VACÍOS
// ============================================
interface ZoneData {
  id: string;
  name: string;
  icon: string;
  moisture: DataPoint[];
  temperature: DataPoint[];
  light: DataPoint[];
}

// Datos base (sin generar, solo estructura)
const baseZones: Omit<ZoneData, "moisture" | "temperature" | "light">[] = [
  { id: "esparto", name: "Zona de Esparto", icon: "🌾" },
  { id: "tomates", name: "Huerta de Tomates", icon: "🍅" },
  { id: "olivar", name: "Olivar", icon: "🫒" },
  { id: "compost", name: "Zona Compost", icon: "♻️" },
  { id: "hierbas", name: "Jardín de Hierbas", icon: "🌿" },
  { id: "agua", name: "Depósito de Agua", icon: "💧" },
];

// Métricas disponibles
const metrics = [
  { id: "moisture", name: "Humedad", icon: Droplets, color: "blue", unit: "%" },
  {
    id: "temperature",
    name: "Temperatura",
    icon: Thermometer,
    color: "orange",
    unit: "°C",
  },
  { id: "light", name: "Luz Solar", icon: Sun, color: "yellow", unit: "%" },
];

// Periodos de tiempo
const periods = [
  { id: "7", name: "7 días" },
  { id: "15", name: "15 días" },
  { id: "30", name: "30 días" },
  { id: "90", name: "3 meses" },
];

export default function Analysis() {
  const [isMounted, setIsMounted] = useState(false);
  const [zonesData, setZonesData] = useState<ZoneData[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([
    "tomates",
    "olivar",
  ]);
  const [selectedMetric, setSelectedMetric] = useState("moisture");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [isExporting, setIsExporting] = useState(false);
  const [showComparison, setShowComparison] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);

  // Generar datos SOLO en el cliente
  useEffect(() => {
    const generateAllData = () => {
      return baseZones.map((zone) => ({
        ...zone,
        moisture: generateHistoricalData(
          30,
          zone.id === "esparto"
            ? 78
            : zone.id === "tomates"
              ? 82
              : zone.id === "olivar"
                ? 45
                : zone.id === "compost"
                  ? 55
                  : zone.id === "hierbas"
                    ? 68
                    : 90,
          8,
        ),
        temperature: generateHistoricalData(
          30,
          zone.id === "esparto"
            ? 22
            : zone.id === "tomates"
              ? 24
              : zone.id === "olivar"
                ? 21
                : zone.id === "compost"
                  ? 28
                  : zone.id === "hierbas"
                    ? 23
                    : 18,
          3,
        ),
        light: generateHistoricalData(
          30,
          zone.id === "esparto"
            ? 65
            : zone.id === "tomates"
              ? 78
              : zone.id === "olivar"
                ? 45
                : zone.id === "compost"
                  ? 30
                  : zone.id === "hierbas"
                    ? 70
                    : 40,
          zone.id === "tomates" ? 12 : 8,
        ),
      }));
    };

    setZonesData(generateAllData());
    setIsMounted(true);
  }, []);

  // Calcular estadísticas
  const getStatistics = () => {
    const stats: any = {};

    selectedZones.forEach((zoneId) => {
      const zone = zonesData.find((z) => z.id === zoneId);
      if (!zone) return;

      const metric = selectedMetric as keyof typeof zone;
      const data = zone[metric] as DataPoint[];

      if (data && data.length > 0) {
        const values = data.map((d) => d.value);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        const last = values[values.length - 1];
        const first = values[0];
        const trend = (((last - first) / first) * 100).toFixed(1);

        stats[zoneId] = {
          avg: avg.toFixed(1),
          max: max.toFixed(1),
          min: min.toFixed(1),
          trend: parseFloat(trend),
          last: last.toFixed(1),
        };
      }
    });

    return stats;
  };

  const statistics = getStatistics();

  // Función para exportar datos
  const exportData = () => {
    setIsExporting(true);

    setTimeout(() => {
      const dataToExport = {
        generatedAt: new Date().toISOString(),
        period: `${selectedPeriod} días`,
        metric: metrics.find((m) => m.id === selectedMetric)?.name,
        zones: selectedZones.map((zoneId) => {
          const zone = zonesData.find((z) => z.id === zoneId);
          return {
            name: zone?.name,
            icon: zone?.icon,
            data: zone?.[selectedMetric as keyof ZoneData],
          };
        }),
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sicilia-soil-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();

      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    }, 1500);
  };

  // Toggle selección de zonas
  const toggleZone = (zoneId: string) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId)
        ? prev.filter((id) => id !== zoneId)
        : [...prev, zoneId],
    );
  };

  const currentMetric = metrics.find((m) => m.id === selectedMetric);

  // Obtener datos filtrados por período para los gráficos
  const getFilteredDataForZone = (zoneId: string, metricType: string) => {
    const zone = zonesData.find((z) => z.id === zoneId);
    if (!zone) return [];
    const data = zone[metricType as keyof ZoneData] as DataPoint[];
    const periodDays = parseInt(selectedPeriod);
    return data.slice(-periodDays);
  };

  // Mostrar loading mientras se generan los datos en el cliente
  if (!isMounted || zonesData.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-purple-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando datos de análisis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-purple-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <LineChart className="w-8 h-8 text-purple-600" />
                Análisis de Datos
              </h1>
              <p className="text-gray-600">
                Estadísticas avanzadas y comparativas entre zonas
              </p>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="flex items-center gap-3">
            <button
              onClick={exportData}
              disabled={isExporting}
              className={`px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors ${
                isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <DownloadCloud className="w-4 h-4" />
              )}
              {isExporting ? "Exportando..." : "Exportar datos"}
            </button>
          </div>
        </div>

        {/* Filtros principales */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Selección de zonas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Zonas a comparar
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {zonesData.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => toggleZone(zone.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                      selectedZones.includes(zone.id)
                        ? "bg-purple-100 text-purple-800 border border-purple-300"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{zone.icon}</span>
                      <span className="font-medium">{zone.name}</span>
                    </span>
                    {selectedZones.includes(zone.id) && (
                      <span className="text-xs bg-purple-200 px-2 py-0.5 rounded-full">
                        seleccionada
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de métrica */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Métrica a analizar
              </label>
              <div className="space-y-2">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                        selectedMetric === metric.id
                          ? `bg-${metric.color}-100 text-${metric.color}-800 border border-${metric.color}-300`
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 text-${metric.color}-500`} />
                        <span className="font-medium">{metric.name}</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {metric.unit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selección de período */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Período de tiempo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showComparison}
                    onChange={() => setShowComparison(!showComparison)}
                    className="rounded text-purple-600"
                  />
                  Mostrar comparativa
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <input
                    type="checkbox"
                    checked={showPredictions}
                    onChange={() => setShowPredictions(!showPredictions)}
                    className="rounded text-purple-600"
                  />
                  Mostrar predicciones
                </label>
              </div>
            </div>
          </div>
        </div>

        {selectedZones.length === 0 ? (
          // Mensaje si no hay zonas seleccionadas
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-200 text-center">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Selecciona zonas para analizar
            </h2>
            <p className="text-gray-500 mb-6">
              Elige al menos una zona del panel izquierdo para ver los datos
            </p>
          </div>
        ) : (
          <>
            {/* Grid de estadísticas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {selectedZones.map((zoneId) => {
                const zone = zonesData.find((z) => z.id === zoneId);
                const stats = statistics[zoneId];
                if (!zone || !stats) return null;

                const MetricIcon = currentMetric?.icon || Droplets;
                const trendColor =
                  stats.trend > 0
                    ? "text-green-600"
                    : stats.trend < 0
                      ? "text-red-600"
                      : "text-gray-600";

                return (
                  <div
                    key={zoneId}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{zone.icon}</span>
                        <h3 className="text-lg font-bold text-gray-900">
                          {zone.name}
                        </h3>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-sm ${trendColor}`}
                      >
                        {stats.trend > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(stats.trend)}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.avg}
                          {currentMetric?.unit}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Actual</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {stats.last}
                          {currentMetric?.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>
                        Mín: {stats.min}
                        {currentMetric?.unit}
                      </span>
                      <span>
                        Máx: {stats.max}
                        {currentMetric?.unit}
                      </span>
                    </div>

                    {/* Mini gráfico de tendencia */}
                    <div className="h-16 flex items-end gap-0.5 mt-4">
                      {zone[selectedMetric as keyof ZoneData] &&
                        (zone[selectedMetric as keyof ZoneData] as DataPoint[])
                          .slice(-14)
                          .map((point, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-purple-500 rounded-t"
                              style={{
                                height: `${(point.value / 100) * 100}%`,
                              }}
                            />
                          ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SECCIÓN DE GRÁFICOS CON HIGHCHARTS */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-purple-600" />
                Visualización detallada
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedZones.map((zoneId) => {
                  const zone = zonesData.find((z) => z.id === zoneId);
                  if (!zone) return null;

                  const moistureData = getFilteredDataForZone(
                    zoneId,
                    "moisture",
                  );
                  const temperatureData = getFilteredDataForZone(
                    zoneId,
                    "temperature",
                  );
                  const lightData = getFilteredDataForZone(zoneId, "light");

                  return (
                    <div key={zoneId} className="space-y-6">
                      {selectedMetric === "moisture" && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                          <HumidityChart
                            zoneName={zone.name}
                            data={moistureData}
                          />
                        </div>
                      )}
                      {selectedMetric === "temperature" && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                          <TemperatureChart
                            zoneName={zone.name}
                            data={temperatureData}
                          />
                        </div>
                      )}
                      {selectedMetric === "light" && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                          <LightChart
                            zoneName={zone.name}
                            data={lightData}
                            height={350}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gráfico principal de comparativa */}
            {showComparison && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Comparativa entre zonas
                  </h2>
                  <span className="text-sm text-gray-500">
                    Últimos {selectedPeriod} días
                  </span>
                </div>

                <div className="h-80 flex items-end gap-4">
                  {selectedZones.map((zoneId) => {
                    const zone = zonesData.find((z) => z.id === zoneId);
                    if (!zone) return null;

                    const data = zone[
                      selectedMetric as keyof ZoneData
                    ] as DataPoint[];
                    if (!data) return null;

                    const avg =
                      data.reduce((a, b) => a + b.value, 0) / data.length;

                    return (
                      <div
                        key={zoneId}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div className="w-full flex flex-col items-center">
                          <span className="text-2xl mb-2">{zone.icon}</span>
                          <div className="relative w-full flex justify-center">
                            <div
                              className="w-16 bg-purple-500 rounded-t"
                              style={{ height: `${(avg / 100) * 200}px` }}
                            />
                          </div>
                          <span className="mt-2 font-bold">
                            {avg.toFixed(1)}
                            {currentMetric?.unit}
                          </span>
                          <span className="text-sm text-gray-600">
                            {zone.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Predicciones */}
            {showPredictions && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg text-white mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Predicciones para los próximos 7 días
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {selectedZones.slice(0, 3).map((zoneId) => {
                    const zone = zonesData.find((z) => z.id === zoneId);
                    if (!zone) return null;

                    const data = zone[
                      selectedMetric as keyof ZoneData
                    ] as DataPoint[];
                    if (!data) return null;

                    const lastValue = data[data.length - 1].value;
                    const prediction = lastValue + (Math.random() * 6 - 3);
                    const confidence = 70 + Math.random() * 20;

                    return (
                      <div
                        key={zoneId}
                        className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{zone.icon}</span>
                          <span className="font-bold">{zone.name}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Actual:</span>
                            <span className="font-bold">
                              {lastValue.toFixed(1)}
                              {currentMetric?.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Predicción:</span>
                            <span className="font-bold text-yellow-300">
                              {prediction.toFixed(1)}
                              {currentMetric?.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confianza:</span>
                            <span className="font-bold">
                              {confidence.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tabla de datos históricos */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Datos históricos detallados
                </h2>
                <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Descargar CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Fecha</th>
                      {selectedZones.map((zoneId) => {
                        const zone = zonesData.find((z) => z.id === zoneId);
                        return (
                          <th key={zoneId} className="text-left py-3 px-4">
                            {zone?.icon} {zone?.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {zonesData[0]?.[selectedMetric as keyof ZoneData] &&
                      (
                        zonesData[0][
                          selectedMetric as keyof ZoneData
                        ] as DataPoint[]
                      )
                        .slice(-10)
                        .reverse()
                        .map((point, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-2 px-4">{point.timestamp}</td>
                            {selectedZones.map((zoneId) => {
                              const zone = zonesData.find(
                                (z) => z.id === zoneId,
                              );
                              if (!zone) return null;

                              const data = zone[
                                selectedMetric as keyof ZoneData
                              ] as DataPoint[];
                              const dataPoint = data.find(
                                (d) => d.timestamp === point.timestamp,
                              );

                              return (
                                <td
                                  key={zoneId}
                                  className="py-2 px-4 font-medium"
                                >
                                  {dataPoint?.value.toFixed(1)}
                                  {currentMetric?.unit}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Footer con insights */}
        <footer className="mt-12 pt-8 border-t border-purple-200">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-bold text-purple-900 mb-2">
                Insights destacados
              </h4>
              <p className="text-purple-700">
                La humedad en el olivar ha bajado un 12% esta semana
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Recomendación</h4>
              <p className="text-blue-700">
                Aumentar riego en zonas con tendencia negativa
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">
                Mejor rendimiento
              </h4>
              <p className="text-green-700">
                Huerta de Tomates: +5% vs promedio
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-bold text-yellow-900 mb-2">Alerta</h4>
              <p className="text-yellow-700">Revisar sensor en zona Compost</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
