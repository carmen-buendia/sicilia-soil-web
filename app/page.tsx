"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trees, Droplet, ThermometerSun, Sun, Sprout } from "lucide-react";
import { StatsCard } from "@/components/dashboard/components/StatsCards";
import { ZoneCard } from "@/components/dashboard/components/ZoneCards";
import { SavedDesigns } from "@/components/dashboard/components/SavedDesigns";
import { ServerStatus } from "@/components/dashboard/components/ServerStatus";
import { fetchZones, healthCheck, ZoneData } from "@/lib/api";

import type { GardenZone } from "@/lib/types";

interface SavedDesign {
  name: string;
  elements: any[];
  date: string;
  canvasSize: { width: number; height: number };
}

// ========== DATOS SIMULADOS (FALLBACK) ==========
const fallbackZones: GardenZone[] = [
  {
    id: "esparto",
    name: "Zona de Esparto",
    type: "Planta textil",
    location: "Parcela Norte",
    moisture: 78,
    temperature: 22,
    light: 65,
    wind: 12,
    status: "saludable",
    icon: "🌾",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "tomates",
    name: "Huerta de Tomates",
    type: "Hortalizas",
    location: "Parcela Sur",
    moisture: 82,
    temperature: 24,
    light: 78,
    wind: 8,
    status: "óptimo",
    icon: "🍅",
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "olivar",
    name: "Olivar",
    type: "Árboles",
    location: "Ladera Este",
    moisture: 45,
    temperature: 21,
    light: 45,
    wind: 15,
    status: "necesita riego",
    icon: "🫒",
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
    id: "hierbas",
    name: "Jardín de Hierbas",
    type: "Aromáticas",
    location: "Parcela Oeste",
    moisture: 68,
    temperature: 23,
    light: 70,
    wind: 10,
    status: "saludable",
    icon: "🌿",
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

// Estadísticas simuladas (fallback)
const fallbackStats = [
  {
    value: "71%",
    label: "Humedad media",
    icon: <Droplet className="w-5 h-5" />,
    subtext: "+3% vs ayer",
  },
  {
    value: "22°C",
    label: "Temperatura media",
    icon: <ThermometerSun className="w-5 h-5" />,
    subtext: "Óptimo para cultivos",
  },
  {
    value: "56%",
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

// Función para convertir datos del backend a GardenZone
function convertToGardenZone(data: ZoneData): GardenZone {
  const zoneNameMap: Record<
    string,
    { name: string; icon: string; type: string }
  > = {
    norte: { name: "Zona de Esparto", icon: "🌾", type: "Planta textil" },
    sur: { name: "Huerta de Tomates", icon: "🍅", type: "Hortalizas" },
    este: { name: "Olivar", icon: "🫒", type: "Árboles" },
    oeste: { name: "Jardín de Hierbas", icon: "🌿", type: "Aromáticas" },
  };

  const zoneInfo = zoneNameMap[data.zone] || {
    name: data.zone,
    icon: "🌱",
    type: "Cultivo",
  };

  let status: GardenZone["status"] = "saludable";
  if (data.humidity < 40) status = "necesita riego";
  else if (data.humidity > 85) status = "exceso de agua";
  else if (data.temperature > 35) status = "alerta térmica";
  else status = "saludable";

  return {
    id: data.zone,
    name: zoneInfo.name,
    type: zoneInfo.type,
    location: `Parcela ${data.zone}`,
    moisture: data.humidity,
    temperature: data.temperature,
    light: data.light,
    wind: 10,
    status,
    icon: zoneInfo.icon,
    lastUpdate:
      typeof data.timestamp === "string"
        ? data.timestamp
        : data.timestamp.toISOString(),
  };
}

// Calcular estadísticas desde datos reales
function calculateStatsFromZones(zones: GardenZone[]) {
  if (zones.length === 0) return fallbackStats;

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
  const [gardenZones, setGardenZones] = useState<GardenZone[]>(fallbackZones);
  const [statsData, setStatsData] = useState(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Intentar conectar al backend
        const health = await healthCheck();
        if (health.status === "ok") {
          setServerStatus("online");

          // Cargar datos reales
          const zonesData = await fetchZones();
          if (zonesData && zonesData.length > 0) {
            const convertedZones = zonesData.map(convertToGardenZone);
            setGardenZones(convertedZones);
            setStatsData(calculateStatsFromZones(convertedZones));
          } else {
            // Backend responde pero sin datos, usar fallback
            setServerStatus("offline");
            setGardenZones(fallbackZones);
            setStatsData(fallbackStats);
          }
        } else {
          setServerStatus("offline");
          setGardenZones(fallbackZones);
          setStatsData(fallbackStats);
        }
      } catch (error) {
        console.error("Error conectando al backend:", error);
        setServerStatus("offline");
        setGardenZones(fallbackZones);
        setStatsData(fallbackStats);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // Cargar diseños guardados
    const saved = localStorage.getItem("sintropico-designs-v3");
    if (saved) setSavedDesigns(JSON.parse(saved));
  }, []);

  const handleDeleteDesign = (designName: string) => {
    if (confirm(`¿Eliminar el diseño "${designName}"?`)) {
      const updated = savedDesigns.filter((d) => d.name !== designName);
      setSavedDesigns(updated);
      localStorage.setItem("sintropico-designs-v3", JSON.stringify(updated));
    }
  };

  const handleViewHistory = (zoneId: string) => {
    console.log(`Ver historial de zona: ${zoneId}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="animate-pulse">
          <p className="text-oliveGreen">🌱 Cargando datos del huerto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoalGray">
            🌱 Sicilia Soil - Demo Online
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

      {/* Two column layout: Zones + Saved Designs */}
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

        {/* Saved Designs Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
              Mis Diseños
            </h2>
            <Link
              href="/design"
              className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
            >
              Nuevo diseño <span>+</span>
            </Link>
          </div>
          <SavedDesigns designs={savedDesigns} onDelete={handleDeleteDesign} />
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
          href="/analysis"
          className="inline-flex items-center gap-2 text-oliveGreen hover:text-sicilian-red transition-colors"
        >
          Ver detalles del cultivo <span>→</span>
        </Link>
      </div>
    </div>
  );
}
