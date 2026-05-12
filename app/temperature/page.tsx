"use client";

import { useState } from "react";
import {
  Thermometer,
  ArrowLeft,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";
import Link from "next/link";

// Datos simulados de temperatura
const temperatureData = [
  {
    zone: "Zona de Esparto",
    current: 22,
    optimal: 25,
    min: 18,
    max: 30,
    history: [21, 22, 23, 22, 21, 22, 22],
    unit: "°C",
    trend: "up",
    soilType: "Arcilloso",
    status: "buena",
  },
  {
    zone: "Huerta de Tomates",
    current: 24,
    optimal: 28,
    min: 20,
    max: 32,
    history: [23, 24, 25, 24, 23, 24, 24],
    unit: "°C",
    trend: "up",
    soilType: "Franco",
    status: "buena",
  },
  {
    zone: "Olivar",
    current: 21,
    optimal: 30,
    min: 18,
    max: 35,
    history: [20, 21, 22, 21, 20, 21, 21],
    unit: "°C",
    trend: "down",
    soilType: "Calcáreo",
    status: "baja",
  },
  {
    zone: "Zona Compost",
    current: 28,
    optimal: 35,
    min: 25,
    max: 45,
    history: [27, 28, 29, 28, 27, 28, 28],
    unit: "°C",
    trend: "up",
    soilType: "Orgánico",
    status: "buena",
  },
  {
    zone: "Jardín de Hierbas",
    current: 23,
    optimal: 26,
    min: 18,
    max: 30,
    history: [22, 23, 24, 23, 22, 23, 23],
    unit: "°C",
    trend: "stable",
    soilType: "Arenoso",
    status: "buena",
  },
  {
    zone: "Depósito de Agua",
    current: 18,
    optimal: 22,
    min: 15,
    max: 25,
    history: [17, 18, 19, 18, 17, 18, 18],
    unit: "°C",
    trend: "up",
    soilType: "N/A",
    status: "buena",
  },
];

export default function TemperaturePage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const getStatusColor = (current: number, optimal: number) => {
    if (current <= optimal) return "bg-green-100 text-green-800";
    if (current <= optimal + 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusText = (current: number, optimal: number) => {
    if (current <= optimal) return "Óptimo";
    if (current <= optimal + 5) return "Moderado";
    return "Alta - Proteger";
  };

  const averageTemp = Math.round(
    temperatureData.reduce((acc, z) => acc + z.current, 0) /
      temperatureData.length,
  );
  const highZones = temperatureData.filter(
    (z) => z.current > z.optimal + 5,
  ).length;
  const optimalZones = temperatureData.filter(
    (z) => z.current <= z.optimal,
  ).length;

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-red-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                  <Thermometer className="w-8 h-8 text-red-600" />
                </div>
                Temperatura del Suelo
              </h1>
              <p className="text-oliveGreen/70">
                Monitoreo detallado de temperatura por zona de cultivo
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-red-200 text-sm flex items-center gap-2 hover:bg-white transition-colors">
              <Calendar className="w-4 h-4" />
              Última semana
            </button>
            <button className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-red-200 text-sm flex items-center gap-2 hover:bg-white transition-colors">
              <Download className="w-4 h-4" />
              Exportar datos
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Promedio general</p>
            <p className="text-3xl font-bold text-red-600">{averageTemp}°C</p>
            <p className="text-xs text-green-600 mt-1">↑ 1°C vs ayer</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Zonas óptimas</p>
            <p className="text-3xl font-bold text-green-600">{optimalZones}</p>
            <p className="text-xs text-oliveGreen/60">
              de {temperatureData.length} zonas
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Temperatura alta</p>
            <p className="text-3xl font-bold text-red-600">{highZones}</p>
            <p className="text-xs text-orange-600">⚠️ Requiere atención</p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <p className="text-sm text-oliveGreen/60">Última lectura</p>
            <p className="text-3xl font-bold text-purple-600">2 min</p>
            <p className="text-xs text-oliveGreen/60">sensores activos</p>
          </div>
        </div>

        {/* Dashboard Climático */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Radiación solar</span>
            </div>
            <p className="text-2xl font-bold mt-2">780 W/m²</p>
            <p className="text-xs text-oliveGreen/60">Alta</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Humedad relativa</span>
            </div>
            <p className="text-2xl font-bold mt-2">55%</p>
            <p className="text-xs text-oliveGreen/60">Moderada</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">Viento</span>
            </div>
            <p className="text-2xl font-bold mt-2">12 km/h</p>
            <p className="text-xs text-oliveGreen/60">Brisa suave</p>
          </div>
        </div>

        {/* Grid de Zonas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
              <Thermometer className="w-5 h-5 text-red-600" />
            </div>
            Monitoreo por Zona
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temperatureData.map((zone, index) => (
              <div
                key={index}
                className={`group bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-102 ${
                  zone.current > zone.optimal + 5
                    ? "border-red-200 hover:border-red-300"
                    : zone.current <= zone.optimal
                      ? "border-green-200 hover:border-green-300"
                      : "border-yellow-200 hover:border-yellow-300"
                }`}
                onClick={() =>
                  setSelectedZone(zone.zone === selectedZone ? null : zone.zone)
                }
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-charcoalGray">
                      {zone.zone}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-oliveGreen/60">
                        {zone.soilType}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.current, zone.optimal)}`}
                  >
                    {getStatusText(zone.current, zone.optimal)}
                  </span>
                </div>

                {/* Medidor circular */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={
                          zone.current <= zone.optimal
                            ? "#22c55e"
                            : zone.current <= zone.optimal + 5
                              ? "#eab308"
                              : "#ef4444"
                        }
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - zone.current / 50)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-500"
                      />
                      <text
                        x="50"
                        y="45"
                        textAnchor="middle"
                        className="text-2xl font-bold"
                        fill="#1f2937"
                      >
                        {zone.current}°
                      </text>
                      <text
                        x="50"
                        y="60"
                        textAnchor="middle"
                        className="text-xs"
                        fill="#6b7280"
                      >
                        Celsius
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Indicador de tendencia */}
                <div className="flex justify-center items-center gap-1 mb-3">
                  {getTrendIcon(zone.trend)}
                  <span className="text-xs text-oliveGreen/60">
                    {zone.trend === "up" && "Aumentando"}
                    {zone.trend === "down" && "Disminuyendo"}
                    {zone.trend === "stable" && "Estable"}
                  </span>
                </div>

                {/* Gráfico histórico simplificado */}
                <div className="mt-4">
                  <p className="text-xs text-oliveGreen/60 mb-2">
                    Evolución últimas 24h
                  </p>
                  <div className="flex items-end justify-between h-16 gap-1">
                    {zone.history.map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-red-400 to-red-500 rounded-t transition-all duration-300 hover:from-red-500 hover:to-red-600"
                        style={{
                          height: `${(value / 40) * 100}%`,
                          opacity: 0.7 + (i / zone.history.length) * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-100 flex justify-between text-sm">
                  <span className="text-oliveGreen/60">
                    Óptimo: ≤{zone.optimal}°C
                  </span>
                  <span className="font-medium text-charcoalGray">
                    Actual: {zone.current}°C
                  </span>
                </div>

                {/* Panel expandido */}
                {selectedZone === zone.zone && (
                  <div className="mt-4 pt-4 border-t border-red-100 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-red-50/50 rounded-lg p-2">
                        <p className="text-xs text-oliveGreen/60">
                          Rango óptimo
                        </p>
                        <p className="font-medium text-charcoalGray">
                          {zone.min}°C - {zone.max}°C
                        </p>
                      </div>
                      <div className="bg-red-50/50 rounded-lg p-2">
                        <p className="text-xs text-oliveGreen/60">
                          Recomendación
                        </p>
                        <p className="font-medium text-charcoalGray">
                          {zone.current > zone.optimal
                            ? "Proteger del sol directo"
                            : "Temperatura adecuada"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-red-100 mt-8">
          <p className="text-sm text-oliveGreen/70">
            🌡️ Datos actualizados en tiempo real desde sensores IoT
          </p>
          <p className="text-xs text-oliveGreen/50 mt-2">
            Última sincronización: hace 2 minutos • Todos los sensores
            operativos
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
