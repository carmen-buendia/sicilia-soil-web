"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trees, Droplet, ThermometerSun, Sun, Sprout } from "lucide-react";
import { StatsCard } from "@/components/dashboard/components/StatsCards";
import { ZoneCard } from "@/components/dashboard/components/ZoneCards";
import { SavedDesigns } from "@/components/dashboard/components/SavedDesigns";
import { ServerStatus } from "@/components/dashboard/components/ServerStatus";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { SicilianFlag } from "@/components/layout/SicilianFlag";

import type { GardenZone } from "@/lib/types";

interface SavedDesign {
  name: string;
  elements: any[];
  date: string;
  canvasSize: { width: number; height: number };
}

// Datos simulados con lastUpdate
const gardenZones: GardenZone[] = [
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

const statsData = [
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

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  useEffect(() => {
    setTimeout(() => setServerStatus("online"), 1000);
    const saved = localStorage.getItem("sintropico-designs-v3");
    if (saved) setSavedDesigns(JSON.parse(saved));
  }, []);

  const handleDeleteDesign = (designName: string) => {
    if (confirm(`¿Eliminar el diseño "${designName}"?`)) {
      const updated = savedDesigns.filter(
        (d: { name: string }) => d.name !== designName,
      );
      setSavedDesigns(updated);
      localStorage.setItem("sintropico-designs-v3", JSON.stringify(updated));
    }
  };

  const handleViewHistory = (zoneId: string) => {
    console.log(`Ver historial de zona: ${zoneId}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoalGray">
            Bienvenida a tu Huerto Sintrópico
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

      {/* Two column layout */}
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
        </nav>

        <div className="h-14 sm:h-16 lg:h-20" />

        {/* Contenido principal */}
        {isDashboard ? (
          <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-charcoalGray">
                    Bienvenida a tu Huerto Sintrópico
                  </h1>
                  <p className="text-oliveGreen flex items-center gap-2">
                    <Trees className="w-4 h-4" /> Monitoreo en tiempo real ·
                    Permacultura Sintrópica
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    serverStatus === "online"
                      ? "bg-oliveGreen/10 text-oliveGreen"
                      : serverStatus === "offline"
                        ? "bg-sicilian-red/10 text-sicilian-red"
                        : "bg-wheatGold/10 text-wheatGold"
                  }`}
                >
                  {serverStatus === "online" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {serverStatus === "online"
                      ? "Sensores activos"
                      : serverStatus === "offline"
                        ? "Sensores desconectados"
                        : "Conectando..."}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                {statsData.map((stat, index) => (
                  <StatsCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    subtext={stat.subtext}
                  />
                ))}
              </div>

              {/* Two column layout: Zones + Saved Designs */}
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {/* Zones Section - 2 columnas */}
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
                        onViewHistory={(id: any) =>
                          console.log(`Ver historial de ${id}`)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Saved Designs Section - 1 columna */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-charcoalGray flex items-center gap-2">
                      <Map className="w-5 h-5 text-oliveGreen" />
                      Mis Diseños
                    </h2>
                    <Link
                      href="/design"
                      className="text-sm text-oliveGreen hover:text-sicilian-red transition-colors flex items-center gap-1"
                    >
                      Nuevo diseño <span>+</span>
                    </Link>
                  </div>

                  {savedDesigns.length === 0 ? (
                    <div className="bg-offWhite rounded-xl p-8 text-center border border-oliveGreen/15">
                      <div className="w-16 h-16 bg-oliveGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Map className="w-8 h-8 text-oliveGreen/40" />
                      </div>
                      <h3 className="text-lg font-medium text-charcoalGray mb-2">
                        No tienes diseños guardados
                      </h3>
                      <p className="text-oliveGreen/60 text-sm mb-4">
                        Crea tu primer diseño sintrópico en la página de Diseño
                      </p>
                      <Link
                        href="/design"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-oliveGreen text-offWhite rounded-lg hover:bg-oliveGreen/90 transition-all"
                      >
                        <Layers className="w-4 h-4" />
                        Ir a Diseño Sintrópico
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedDesigns
                        .slice()
                        .reverse()
                        .map((design: any, idx: any) => (
                          <div
                            key={idx}
                            className="bg-offWhite rounded-xl p-4 border border-oliveGreen/15 hover:shadow-md transition-all hover:border-oliveGreen/30"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Map className="w-4 h-4 text-oliveGreen" />
                                  <h3 className="font-bold text-charcoalGray">
                                    {design.name}
                                  </h3>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-oliveGreen/60 mb-3">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {design.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Map className="w-3 h-3" />
                                    {design.canvasSize.width} ×{" "}
                                    {design.canvasSize.height} m
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Sprout className="w-3 h-3" />
                                    {design.elements.length} elementos
                                  </span>
                                </div>

                                {/* Mini preview de elementos */}
                                <div className="flex gap-1 flex-wrap">
                                  {design.elements
                                    .slice(0, 6)
                                    .map((el: any, i: number) => (
                                      <span
                                        key={i}
                                        className="text-lg"
                                        title={el.species.name}
                                      >
                                        {el.species.icon}
                                      </span>
                                    ))}
                                  {design.elements.length > 6 && (
                                    <span className="text-xs text-oliveGreen/50 self-center">
                                      +{design.elements.length - 6}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Link
                                  href={`/design?load=${encodeURIComponent(design.name)}`}
                                  className="p-2 rounded-lg hover:bg-oliveGreen/10 transition-colors"
                                  title="Abrir diseño"
                                >
                                  <Eye className="w-4 h-4 text-oliveGreen" />
                                </Link>
                                <button
                                  onClick={() =>
                                    handleDeleteDesign(design.name)
                                  }
                                  className="p-2 rounded-lg hover:bg-sicilian-red/10 transition-colors"
                                  title="Eliminar diseño"
                                >
                                  <Trash2 className="w-4 h-4 text-sicilian-red/70" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
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
