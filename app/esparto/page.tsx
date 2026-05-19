"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Calendar,
  MapPin,
  Leaf,
  Sprout,
  Scissors,
  Package,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

// Datos del cultivo de esparto
const espartoData = {
  name: "Esparto",
  scientificName: "Stipa tenacissima",
  icon: "🌾",
  description:
    "Planta fibrosa tradicional siciliana, utilizada durante siglos para la elaboración de cuerdas, cestas y tejidos. Es un pilar de la economía rural mediterránea.",
  history:
    "El esparto ha sido cultivado en Sicilia desde la época fenicia. Su fibra resistente al agua salada lo hizo invaluable para la industria naval y agrícola.",
  benefits: [
    "Fibra natural sostenible",
    "Resistente a la humedad y salinidad",
    "Previene la erosión del suelo",
    "Hábitat para fauna local",
    "Secuestro de carbono",
    "Bajo requerimiento hídrico",
  ],
  uses: [
    "Cuerdas y cordelería",
    "Cestería tradicional",
    "Tejidos técnicos",
    "Biocombustibles",
    "Material de construcción ecológico",
    "Sustrato para cultivo de setas",
  ],
};

// Datos de monitoreo
const monitoringData = {
  moisture: [68, 70, 72, 71, 69, 68, 67, 66, 68, 70, 72, 74, 73, 71],
  temperature: [18, 19, 20, 21, 22, 23, 22, 21, 20, 19, 18, 17, 18, 19],
  light: [55, 58, 62, 65, 68, 70, 72, 71, 69, 66, 63, 60, 58, 56],
  wind: [12, 11, 13, 14, 12, 10, 9, 11, 13, 14, 15, 13, 12, 11],
};

// Calendario de cosecha
const harvestCalendar = [
  { month: "Enero", activity: "Descanso invernal", color: "bg-blue-100" },
  {
    month: "Febrero",
    activity: "Preparación del terreno",
    color: "bg-blue-100",
  },
  { month: "Marzo", activity: "Inicio de crecimiento", color: "bg-green-100" },
  { month: "Abril", activity: "Crecimiento activo", color: "bg-green-100" },
  { month: "Mayo", activity: "Crecimiento máximo", color: "bg-green-200" },
  { month: "Junio", activity: "Floración", color: "bg-yellow-100" },
  { month: "Julio", activity: "Maduración", color: "bg-yellow-100" },
  { month: "Agosto", activity: "Cosecha tradicional", color: "bg-orange-100" },
  {
    month: "Septiembre",
    activity: "Cosecha principal",
    color: "bg-orange-200",
  },
  { month: "Octubre", activity: "Secado y procesado", color: "bg-yellow-100" },
  { month: "Noviembre", activity: "Almacenamiento", color: "bg-blue-100" },
  { month: "Diciembre", activity: "Descanso invernal", color: "bg-blue-100" },
];

// Simbiosis con hongos
const mycorrhizalSymbiosis = [
  {
    mushroom: "Cardoncello di Nebrodi",
    icon: "🍄",
    description:
      "El cardoncello se asocia a las raíces del esparto, mejorando la absorción de nutrientes y agua.",
  },
  {
    mushroom: "Cardonchello",
    icon: "🍄",
    description:
      "Crece en los restos de esparto, descomponiendo la materia y enriqueciendo el suelo.",
  },
  {
    mushroom: "Níccolo",
    icon: "🍄",
    description:
      "Forma micorrizas con las raíces, extendiendo la red de absorción del esparto.",
  },
];

export default function EspartoPage() {
  const [activeTab, setActiveTab] = useState<
    "info" | "monitoring" | "harvest" | "symbiosis"
  >("info");

  const getMoistureColor = (value: number) => {
    if (value >= 70) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthStatus = () => {
    const avgMoisture =
      monitoringData.moisture.reduce((a, b) => a + b, 0) /
      monitoringData.moisture.length;
    const avgTemp =
      monitoringData.temperature.reduce((a, b) => a + b, 0) /
      monitoringData.temperature.length;
    const avgLight =
      monitoringData.light.reduce((a, b) => a + b, 0) /
      monitoringData.light.length;

    if (avgMoisture >= 65 && avgTemp >= 18 && avgTemp <= 25 && avgLight >= 60) {
      return {
        status: "Excelente",
        color: "bg-green-100 text-green-700",
        icon: "✅",
      };
    }
    if (avgMoisture >= 50 && avgTemp >= 15 && avgTemp <= 30) {
      return {
        status: "Buena",
        color: "bg-yellow-100 text-yellow-700",
        icon: "⚠️",
      };
    }
    return {
      status: "Requiere atención",
      color: "bg-red-100 text-red-700",
      icon: "🔴",
    };
  };

  const health = getHealthStatus();

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-gradient-to-br from-offWhite to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                  <span className="text-3xl">🌾</span>
                </div>
                Cultivo de Esparto
              </h1>
              <p className="text-oliveGreen/70">
                {espartoData.scientificName} - Tradición y sostenibilidad en
                Sicilia
              </p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${health.color}`}
          >
            <span>{health.icon}</span>
            <span className="font-medium">
              Salud del cultivo: {health.status}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl p-6 md:p-8 mb-12 border border-oliveGreen/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-charcoalGray mb-3">
                🌾 El Tesoro Fibroso del Mediterráneo
              </h2>
              <p className="text-charcoalGray/80 mb-4">
                El esparto <strong>(Stipa tenacissima)</strong> es una planta
                milenaria que ha moldeado la cultura y economía siciliana. Su
                fibra, resistente y versátil, representa un modelo de{" "}
                <strong>agricultura regenerativa y sostenible</strong>.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🌱 Sostenible
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  💧 Bajo consumo hídrico
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🌍 Tradición siciliana
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                  🔄 Economía circular
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-2">🌾</div>
              <p className="text-sm text-oliveGreen/60">
                Símbolo de resistencia mediterránea
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-oliveGreen/15 pb-2">
          {[
            { id: "info", label: "Información", icon: "📖" },
            { id: "monitoring", label: "Monitoreo", icon: "📊" },
            { id: "harvest", label: "Calendario", icon: "📅" },
            { id: "symbiosis", label: "Simbiosis", icon: "🔗" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-oliveGreen text-white shadow-md"
                  : "text-oliveGreen/70 hover:bg-oliveGreen/10"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Información */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-oliveGreen" />
                Historia y tradición
              </h3>
              <p className="text-oliveGreen/70 leading-relaxed">
                {espartoData.history}
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-oliveGreen" />
                Beneficios
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {espartoData.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-oliveGreen/70"
                  >
                    <span className="text-green-500">✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-oliveGreen" />
                Usos tradicionales y modernos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {espartoData.uses.map((use, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-oliveGreen/70"
                  >
                    <span className="text-wheatGold">→</span>
                    {use}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-oliveGreen/5 to-emerald-500/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-wheatGold" />
                Reconocimientos
              </h3>
              <p className="text-sm text-oliveGreen/70 mb-3">
                El esparto siciliano es reconocido como patrimonio cultural
                inmaterial por la UNESCO.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-white/50 rounded-full">
                  🏆 Denominación de origen
                </span>
                <span className="px-3 py-1 bg-white/50 rounded-full">
                  🌿 Producto ecológico
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Monitoreo */}
        {activeTab === "monitoring" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15">
                <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-oliveGreen/60">Humedad media</p>
                <p className="text-2xl font-bold text-charcoalGray">69%</p>
                <p className="text-xs text-green-600">↑ Óptimo</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15">
                <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-oliveGreen/60">Temperatura media</p>
                <p className="text-2xl font-bold text-charcoalGray">20°C</p>
                <p className="text-xs text-green-600">✓ Ideal</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15">
                <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-oliveGreen/60">Luz solar media</p>
                <p className="text-2xl font-bold text-charcoalGray">64%</p>
                <p className="text-xs text-green-600">Buena exposición</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-oliveGreen/15">
                <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-oliveGreen/60">Viento medio</p>
                <p className="text-2xl font-bold text-charcoalGray">12 km/h</p>
                <p className="text-xs text-green-600">Moderado</p>
              </div>
            </div>

            {/* Gráfico simplificado */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4">
                Evolución de condiciones (últimos 14 días)
              </h3>

              <div className="space-y-6">
                {Object.entries(monitoringData).map(([key, values]) => {
                  const config = {
                    moisture: {
                      label: "Humedad",
                      color: "#5A6B47",
                      unit: "%",
                      max: 100,
                    },
                    temperature: {
                      label: "Temperatura",
                      color: "#CD212A",
                      unit: "°C",
                      max: 35,
                    },
                    light: {
                      label: "Luz solar",
                      color: "#E6B422",
                      unit: "%",
                      max: 100,
                    },
                    wind: {
                      label: "Viento",
                      color: "#6B7280",
                      unit: "km/h",
                      max: 30,
                    },
                  };
                  const cfg = config[key as keyof typeof config];

                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cfg.label}</span>
                        <span>
                          {values[values.length - 1]}
                          {cfg.unit}
                        </span>
                      </div>
                      <div className="h-12 flex items-end gap-1">
                        {values.map((value, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-t transition-all hover:opacity-80"
                            style={{
                              height: `${(value / cfg.max) * 40}px`,
                              backgroundColor: cfg.color,
                              opacity: 0.3 + (idx / values.length) * 0.7,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-gradient-to-r from-oliveGreen/5 to-emerald-500/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-oliveGreen" />
                Recomendaciones
              </h3>
              <ul className="space-y-2 text-sm text-oliveGreen/70">
                <li>
                  ✓ Mantener la humedad entre 65-75% para un crecimiento óptimo
                </li>
                <li>✓ La temperatura ideal está entre 18-25°C</li>
                <li>
                  ✓ La luz solar debe superar el 60% para buena fotosíntesis
                </li>
                <li>✓ Proteger de vientos superiores a 25 km/h</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab: Calendario de cosecha */}
        {activeTab === "harvest" && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {harvestCalendar.map((month) => (
              <div
                key={month.month}
                className={`${month.color} rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all`}
              >
                <p className="font-bold text-charcoalGray">{month.month}</p>
                <p className="text-sm text-oliveGreen/70 mt-1">
                  {month.activity}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Simbiosis con hongos */}
        {activeTab === "symbiosis" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-oliveGreen" />
                La Red Subterránea: Esparto + Hongos
              </h3>
              <p className="text-oliveGreen/70">
                El esparto forma asociaciones simbióticas con hongos
                micorrícicos que mejoran su capacidad de absorción de agua y
                nutrientes. A cambio, el esparto proporciona carbohidratos a los
                hongos. Los restos de poda del esparto sirven como sustrato para
                el cultivo de setas comestibles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mycorrhizalSymbiosis.map((sym, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 hover:shadow-xl transition-all"
                >
                  <div className="text-center mb-4">
                    <span className="text-5xl">{sym.icon}</span>
                    <h3 className="text-lg font-bold text-charcoalGray mt-2">
                      {sym.mushroom}
                    </h3>
                  </div>
                  <p className="text-sm text-oliveGreen/70 text-center">
                    {sym.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 border border-oliveGreen/20">
              <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
                🍄 + 🌾 = ♾️
              </h3>
              <p className="text-oliveGreen/70">
                El esparto y los hongos forman un sistema simbiótico perfecto.
                Los restos de esparto proporcionan el sustrato ideal para el
                cultivo de setas como el Cardonchello, mientras que el micelio
                de los hongos ayuda a descomponer la materia orgánica,
                enriqueciendo el suelo y mejorando las condiciones para el
                esparto.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 p-6 bg-gradient-to-r from-oliveGreen/10 to-emerald-500/10 rounded-2xl border border-oliveGreen/15">
          <div className="flex flex-wrap gap-6 justify-between items-center">
            <div>
              <h3 className="font-bold text-charcoalGray mb-1">
                🌾 El Esparto Siciliano
              </h3>
              <p className="text-sm text-oliveGreen/70">
                Un patrimonio natural y cultural que conecta tradición,
                sostenibilidad e innovación
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🏺 Tradición milenaria
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🌍 Sostenibilidad
              </span>
              <span className="px-3 py-1 bg-white/50 rounded-full text-xs">
                🍄 Economía circular
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
