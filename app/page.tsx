"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Droplets,
  Thermometer,
  Sun,
  LineChart,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Sprout,
  Leaf,
  Layers,
  Flower2,
  Wind,
  CheckCircle,
  Trees,
  Droplet,
  ThermometerSun,
  Map,
  Calendar,
  Eye,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { StatsCard } from "@/components/dashboard/StatsCards";
import { ZoneCard } from "@/components/dashboard/ZoneCards";
import { SicilianFlag } from "@/components/layout/SicilianFlag";

import type { GardenZone } from "@/lib/types";

// Tipos para los diseños guardados
interface SavedDesign {
  name: string;
  elements: any[];
  date: string;
  canvasSize: { width: number; height: number };
}

const navItems = [
  { id: "/", label: "Dashboard", icon: Home },
  { id: "/humedity", label: "Humedad", icon: Droplets },
  { id: "/temperature", label: "Temperatura", icon: Thermometer },
  { id: "/light", label: "Luz Solar", icon: Sun },
  { id: "/analysis", label: "Análisis", icon: LineChart },
  { id: "/mycology", label: "Micología", icon: Leaf },
  { id: "/design", label: "Diseño", icon: Layers },
  { id: "/configuration", label: "Configuración", icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isDashboard = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setServerStatus("online"), 1000);
  }, []);

  // Cargar diseños guardados desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sintropico-designs-v3");
    if (saved) {
      setSavedDesigns(JSON.parse(saved));
    }
  }, []);

  // Función para eliminar un diseño
  const handleDeleteDesign = (designName: string) => {
    if (confirm(`¿Eliminar el diseño "${designName}"?`)) {
      const updated = savedDesigns.filter((d) => d.name !== designName);
      setSavedDesigns(updated);
      localStorage.setItem("sintropico-designs-v3", JSON.stringify(updated));
    }
  };

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
      lastUpdate: new Date().toISOString(),
      icon: "🌾",
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
      lastUpdate: new Date().toISOString(),
      icon: "🍅",
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
      lastUpdate: new Date().toISOString(),
      icon: "🫒",
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
      lastUpdate: new Date().toISOString(),
      icon: "♻️",
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
      lastUpdate: new Date().toISOString(),
      icon: "🌿",
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
      lastUpdate: new Date().toISOString(),
      icon: "💧",
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

  return (
    <html lang="es">
      <head>
        <title>
          Sintrópico Monitor - Permacultura Sintrópica en el Mediterráneo
        </title>
        <meta
          name="description"
          content="Monitoreo de huerto de permacultura sintrópica en la región del Mediterráneo"
        />
        <meta
          name="keywords"
          content="permacultura, sintrópica, mediterráneo, agricultura regenerativa"
        />
        <meta name="author" content="Carmen Buendía" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-offWhite text-charcoalGray">
        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-offWhite/98 backdrop-blur-xl shadow-xl border-b border-oliveGreen/15"
              : "bg-offWhite/85 backdrop-blur-md border-b border-oliveGreen/10"
          }`}
        >
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 group transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-oliveGreen via-sicilian-red to-wheatGold rounded-xl shadow-md">
                    <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-offWhite" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-wheatGold rounded-full ring-2 ring-offWhite animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base sm:text-xl font-bold">
                    <span className="text-charcoalGray">Sintrópico</span>
                    <span className="text-sicilian-red ml-1">Monitor</span>
                  </h1>
                  <div className="flex items-center gap-1 text-xs text-oliveGreen/70">
                    <SicilianFlag size="small" />
                    <span>Permacultura Sintrópica</span>
                    <Flower2 className="w-3 h-3" />
                  </div>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-1 bg-oliveGreen/5 backdrop-blur-sm rounded-full p-1 border border-oliveGreen/15">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.id);
                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-sm lg:text-base ${
                        active
                          ? "bg-oliveGreen text-offWhite shadow-md shadow-oliveGreen/30"
                          : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button className="relative p-1.5 sm:p-2 rounded-full text-oliveGreen/60 hover:text-sicilian-red transition-all duration-300 hover:bg-oliveGreen/10">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-wheatGold rounded-full ring-2 ring-offWhite animate-pulse" />
                </button>

                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-full pl-2 pr-4 py-1 border border-oliveGreen/20">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-offWhite" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-charcoalGray">
                    Carmen Buendía
                  </p>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-1.5 sm:p-2 rounded-xl text-oliveGreen hover:text-wheatGold transition-all duration-300 hover:bg-oliveGreen/10"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-oliveGreen/15">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.id);
                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        active
                          ? "bg-oliveGreen text-offWhite shadow-md"
                          : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 bg-wheatGold rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
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
                        onViewHistory={(id) =>
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
                        .map((design, idx) => (
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

              {/* Esparto Section Preview */}
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
                  tradicional siciliana. Actualmente en fase de crecimiento
                  activo con un 92% de salud.
                </p>
                <Link
                  href="/analysis"
                  className="inline-flex items-center gap-2 text-oliveGreen hover:text-sicilian-red transition-colors"
                >
                  Ver detalles del cultivo <span>→</span>
                </Link>
              </div>
            </div>
          </main>
        ) : (
          <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            {children}
          </main>
        )}

        {/* Footer */}
        <footer className="bg-gradient-to-b from-oliveGreen/5 to-offWhite border-t border-oliveGreen/15 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-xl">
                <Sprout className="w-5 h-5 text-offWhite" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray">
                Sintrópico Monitor
              </h3>
            </div>
            <p className="text-oliveGreen/70">
              © {new Date().getFullYear()} - Permacultura Sintrópica en el
              Mediterráneo
            </p>
            <p className="text-oliveGreen/50 text-sm mt-2">
              Monitoreo inteligente para una agricultura regenerativa
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
