"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trees,
  Droplet,
  ThermometerSun,
  Sun,
  Sprout,
  Activity,
  Wind,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/components/StatsCards";
import { ZoneCard } from "@/components/dashboard/components/ZoneCards";
import { ServerStatus } from "@/components/dashboard/components/ServerStatus";

import type { GardenZone } from "@/lib/types";

// ========== DATOS MOCK (FALLBACK) ==========
const mockZones: GardenZone[] = [
  {
    id: "norte",
    name: "Zona de Esparto",
    type: "Planta textil",
    location: "Parcela Norte",
    moisture: 65,
    temperature: 22.5,
    light: 85,
    wind: 12,
    status: "saludable",
    icon: "🌾",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "sur",
    name: "Huerta de Tomates",
    type: "Hortalizas",
    location: "Parcela Sur",
    moisture: 58,
    temperature: 24.2,
    light: 92,
    wind: 8,
    status: "saludable",
    icon: "🍅",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "este",
    name: "Olivar",
    type: "Árboles",
    location: "Ladera Este",
    moisture: 62,
    temperature: 23.1,
    light: 89,
    wind: 10,
    status: "saludable",
    icon: "🫒",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "oeste",
    name: "Jardín de Hierbas",
    type: "Aromáticas",
    location: "Parcela Oeste",
    moisture: 68,
    temperature: 21.8,
    light: 78,
    wind: 7,
    status: "saludable",
    icon: "🌿",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "compost",
    name: "Zona Compost",
    type: "Suelo vivo",
    location: "Trasera",
    moisture: 55,
    temperature: 28,
    light: 30,
    wind: 5,
    status: "activo",
    icon: "♻️",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "agua",
    name: "Depósito de Agua",
    type: "Recolección",
    location: "Noreste",
    moisture: 90,
    temperature: 18,
    light: 40,
    wind: 7,
    status: "lleno",
    icon: "💧",
    lastUpdate: new Date().toISOString(),
  },
];

// Datos ambientales simulados (para el resumen)
const ambientSummary = {
  heavyMetals: [
    { name: "Plomo (Pb)", value: 12.5, unit: "mg/kg", healthy: true },
    { name: "Cadmio (Cd)", value: 0.8, unit: "mg/kg", healthy: true },
    { name: "Mercurio (Hg)", value: 0.05, unit: "mg/kg", healthy: true },
    { name: "Arsénico (As)", value: 1.2, unit: "mg/kg", healthy: true },
    { name: "Cromo (Cr)", value: 15.3, unit: "mg/kg", healthy: true },
  ],
  airQuality: [
    { name: "PM2.5", value: 12, unit: "µg/m³", healthy: true },
    { name: "PM10", value: 25, unit: "µg/m³", healthy: true },
    { name: "NO₂", value: 18, unit: "µg/m³", healthy: true },
    { name: "O₃", value: 35, unit: "µg/m³", healthy: true },
  ],
  waterQuality: [
    { name: "Turbidez", value: 2.5, unit: "NTU", healthy: true },
    { name: "Conductividad", value: 450, unit: "µS/cm", healthy: true },
    { name: "Oxígeno disuelto", value: 7.8, unit: "mg/L", healthy: true },
  ],
  soilPollutants: [
    { name: "Hidrocarburos", value: 25, unit: "mg/kg", healthy: true },
    { name: "Pesticidas", value: 0.3, unit: "mg/kg", healthy: true },
    { name: "Fertilizantes", value: 120, unit: "mg/kg", healthy: true },
  ],
};

function calculateStatsFromZones(zones: GardenZone[]) {
  if (zones.length === 0) {
    return [
      {
        value: "65%",
        label: "Humedad media",
        icon: <Droplet className="w-5 h-5" />,
        subtext: "Datos de demostración",
      },
      {
        value: "22°C",
        label: "Temperatura media",
        icon: <ThermometerSun className="w-5 h-5" />,
        subtext: "Datos de demostración",
      },
      {
        value: "85%",
        label: "Luz solar",
        icon: <Sun className="w-5 h-5" />,
        subtext: "Buena exposición",
      },
      {
        value: "4",
        label: "Setas autóctonas",
        icon: <span className="text-xl">🍄</span>,
        subtext: "En producción",
      },
      {
        value: "92%",
        label: "Salud del Esparto",
        icon: <Sprout className="w-5 h-5" />,
        subtext: "Excelente estado",
      },
    ];
  }

  const avgMoisture = Math.round(
    zones.reduce((acc, z) => acc + z.moisture, 0) / zones.length,
  );
  const avgTemp = Math.round(
    zones.reduce((acc, z) => acc + z.temperature, 0) / zones.length,
  );
  const avgLight = Math.round(
    zones.reduce((acc, z) => acc + z.light, 0) / zones.length,
  );

  return [
    {
      value: `${avgMoisture}%`,
      label: "Humedad media",
      icon: <Droplet className="w-5 h-5" />,
      subtext: "Datos en tiempo real",
    },
    {
      value: `${avgTemp}°C`,
      label: "Temperatura media",
      icon: <ThermometerSun className="w-5 h-5" />,
      subtext: "Óptimo para cultivos",
    },
    {
      value: `${avgLight}%`,
      label: "Luz solar",
      icon: <Sun className="w-5 h-5" />,
      subtext: "Buena exposición",
    },
    {
      value: "4",
      label: "Setas autóctonas",
      icon: <span className="text-xl">🍄</span>,
      subtext: "En producción",
    },
    {
      value: "92%",
      label: "Salud del Esparto",
      icon: <Sprout className="w-5 h-5" />,
      subtext: "Excelente estado",
    },
  ];
}

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [gardenZones, setGardenZones] = useState<GardenZone[]>(mockZones);
  const [statsData, setStatsData] = useState(
    calculateStatsFromZones(mockZones),
  );

  useEffect(() => {
    // Intentar conectar al backend en segundo plano
    async function fetchRealData() {
      try {
        console.log("🔍 Intentando conectar al backend...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(
          "https://sicilia-soil-backend.onrender.com/api/zones",
          {
            signal: controller.signal,
          },
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const zonesData = await response.json();
          console.log("✅ Datos reales recibidos:", zonesData);

          if (zonesData && zonesData.length > 0) {
            const convertedZones: GardenZone[] = zonesData.map((data: any) => ({
              id: data.zone,
              name: getZoneName(data.zone),
              type: getZoneType(data.zone),
              location: getZoneLocation(data.zone),
              moisture: data.humidity,
              temperature: data.temperature,
              light: data.light,
              wind: Math.floor(Math.random() * 15) + 5,
              status:
                data.humidity < 40
                  ? "necesita riego"
                  : data.humidity > 85
                    ? "exceso de agua"
                    : "saludable",
              icon: getZoneIcon(data.zone),
              lastUpdate: data.timestamp,
            }));

            setGardenZones(convertedZones);
            setStatsData(calculateStatsFromZones(convertedZones));
            setServerStatus("online");
            console.log("✅ UI actualizada con datos reales");
          }
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.warn(
          "⚠️ Usando datos de demostración (backend no disponible):",
          error,
        );
        setServerStatus("offline");
      }
    }

    fetchRealData();
  }, []);

  const handleViewHistory = (zoneId: string) => {
    console.log(`Ver historial de zona: ${zoneId}`);
  };

  // Funciones auxiliares para convertir datos del backend
  function getZoneName(zone: string): string {
    const names: Record<string, string> = {
      norte: "Zona de Esparto",
      sur: "Huerta de Tomates",
      este: "Olivar",
      oeste: "Jardín de Hierbas",
    };
    return names[zone] || zone;
  }

  function getZoneType(zone: string): string {
    const types: Record<string, string> = {
      norte: "Planta textil",
      sur: "Hortalizas",
      este: "Árboles",
      oeste: "Aromáticas",
    };
    return types[zone] || "Cultivo";
  }

  function getZoneLocation(zone: string): string {
    const locations: Record<string, string> = {
      norte: "Parcela Norte",
      sur: "Parcela Sur",
      este: "Ladera Este",
      oeste: "Parcela Oeste",
    };
    return locations[zone] || `Parcela ${zone}`;
  }

  function getZoneIcon(zone: string): string {
    const icons: Record<string, string> = {
      norte: "🌾",
      sur: "🍅",
      este: "🫒",
      oeste: "🌿",
    };
    return icons[zone] || "🌱";
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoalGray">
            🌱 Sicilia Soil - Demo Online (Work in progress)
          </h1>
          <p className="text-oliveGreen flex items-center gap-2">
            <Trees className="w-4 h-4" /> Monitoreo en tiempo real ·
            Permacultura Sintrópica
          </p>
        </div>
        <ServerStatus status={serverStatus} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Two column layout: Zones + Ambiental Summary */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Zones Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoalGray">
              Zonas del Huerto
            </h2>
            <Link
              href="/analysis"
              className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
            >
              Ver análisis completo <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {gardenZones.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                onViewHistory={handleViewHistory}
              />
            ))}
          </div>
        </div>

        {/* Ambiental Summary Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
              <Activity className="w-6 h-6 text-oliveGreen" />
              Monitoreo Ambiental
            </h2>
            <Link
              href="/ambiental"
              className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
            >
              Panel completo <span>→</span>
            </Link>
          </div>
          <div className="space-y-4">
            {/* Metales pesados */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
              <h4 className="text-xs font-semibold text-oliveGreen/70 uppercase tracking-wider flex items-center gap-1 mb-2">
                <AlertTriangle className="w-3 h-3" /> Metales pesados
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {ambientSummary.heavyMetals.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-charcoalGray/70">{item.name}</span>
                    <span className="font-medium">
                      {item.value} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calidad del aire */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
              <h4 className="text-xs font-semibold text-oliveGreen/70 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Wind className="w-3 h-3" /> Calidad del aire
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {ambientSummary.airQuality.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-charcoalGray/70">{item.name}</span>
                    <span className="font-medium">
                      {item.value} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calidad del agua */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
              <h4 className="text-xs font-semibold text-oliveGreen/70 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Droplet className="w-3 h-3" /> Calidad del agua
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {ambientSummary.waterQuality.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-charcoalGray/70">{item.name}</span>
                    <span className="font-medium">
                      {item.value} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contaminación del suelo */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
              <h4 className="text-xs font-semibold text-oliveGreen/70 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Leaf className="w-3 h-3" /> Contaminación del suelo
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {ambientSummary.soilPollutants.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-charcoalGray/70">{item.name}</span>
                    <span className="font-medium">
                      {item.value} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de riesgos */}
            <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 rounded-xl p-3 border border-oliveGreen/10 flex items-center justify-between text-xs">
              <span className="font-medium text-charcoalGray">
                Riesgo global:
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span>Bajo</span>
                <span className="text-oliveGreen/30">|</span>
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                <span>Moderado</span>
                <span className="text-oliveGreen/30">|</span>
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                <span>Alto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Esparto Section */}
      <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-oliveGreen/10 rounded-xl">
            <Sprout className="w-6 h-6 text-oliveGreen" />
          </div>
          <h2 className="text-xl font-bold text-charcoalGray">
            Cultivo de Esparto
          </h2>
        </div>
        <p className="text-oliveGreen/70 mb-4">
          La planta de esparto (Stipa tenacissima) es una fibra natural
          tradicional siciliana. Actualmente en fase de crecimiento activo con
          un 92% de salud.
        </p>
        <Link
          href="/esparto"
          className="inline-flex items-center gap-2 text-oliveGreen hover:text-sicilian-red transition-colors"
        >
          Ver detalles del cultivo <span>→</span>
        </Link>
      </div>
    </div>
  );
}
