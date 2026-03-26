"use client";

import { useState, useEffect } from "react";
import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  CheckCircle,
  Sprout,
  Leaf,
  Calendar,
  Clock,
  Scissors,
  Package,
  Factory,
} from "lucide-react";

// Import from packages
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { formatRelativeTime } from "@/lib/utils/helpers";

import type { GardenZone } from "@/lib/types";

// Sicilian Flag component
const SicilianFlag = () => (
  <div className="relative w-8 h-8">
    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full"></div>
  </div>
);

const SicilianFlagSimple = () => (
  <span className="font-bold text-yellow-600 bg-red-600 px-2 py-1 rounded text-xs">
    SICILIA SOIL
  </span>
);

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  useEffect(() => {
    const checkServer = async () => {
      try {
        setTimeout(() => {
          setServerStatus("online");
        }, 1000);
      } catch (error) {
        setServerStatus("offline");
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 10000);
    return () => clearInterval(interval);
  }, []);

  // Garden zones data
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

  // Esparto data
  const espartoData = {
    general: {
      scientificName: "Stipa tenacissima / Macrochloa tenacissima",
      health: 92,
      nextHarvest: "15 días",
    },
    growth: {
      phase: "Crecimiento activo",
      height: "85 cm",
      density: "78%",
      newShoots: 23,
    },
    soil: {
      type: "Arcillo-calcáreo",
      ph: 7.2,
      moisture: 68,
      nutrients: "buenos",
    },
    harvest: {
      nextDate: "15 de mayo",
      estimatedYield: "12 kg",
      currentStock: "45 kg",
      quality: "excelente",
    },
  };

  // Esparto calendar
  const espartoCalendar = [
    {
      month: "Enero",
      tasks: ["Poda de limpieza", "Preparación de suelo"],
      intensity: "baja",
    },
    {
      month: "Febrero",
      tasks: ["Abonado orgánico", "Riego de apoyo"],
      intensity: "media",
    },
    {
      month: "Marzo",
      tasks: ["Inicio de crecimiento", "Control de malas hierbas"],
      intensity: "media",
    },
    {
      month: "Abril",
      tasks: ["Riego regular", "Observación de brotes"],
      intensity: "media",
    },
    {
      month: "Mayo",
      tasks: ["PREPARACIÓN PARA RECOLECCIÓN", "Selección de tallos"],
      intensity: "alta",
      highlight: true,
    },
    {
      month: "Junio",
      tasks: ["RECOLECCIÓN PRINCIPAL", "Secado al sol"],
      intensity: "muy alta",
      highlight: true,
    },
    {
      month: "Julio",
      tasks: ["Recolección tardía", "Clasificación"],
      intensity: "alta",
    },
    {
      month: "Agosto",
      tasks: ["Secado continuado", "Almacenamiento"],
      intensity: "media",
    },
    {
      month: "Septiembre",
      tasks: ["Limpieza de parcelas", "Preparación para otoño"],
      intensity: "baja",
    },
    {
      month: "Octubre",
      tasks: ["Riego de mantenimiento", "Abonado de fondo"],
      intensity: "baja",
    },
    {
      month: "Noviembre",
      tasks: ["Reposo vegetativo", "Planificación"],
      intensity: "baja",
    },
    {
      month: "Diciembre",
      tasks: ["Mantenimiento de herramientas", "Formación"],
      intensity: "baja",
    },
  ];

  // Mushroom data (native Sicilian)
  const mushroomZones = [
    {
      id: "cardonchello",
      name: "Cardonchello",
      scientificName: "Pleurotus eryngii",
      location: "Raíces de Ferula communis - Zona Sombreada",
      humidity: 85,
      temperature: 18,
      co2: 450,
      stage: "crecimiento",
      harvestIn: "5 días",
      status: "óptimo",
      icon: "🍄",
    },
    {
      id: "cardoncello-nebrodi",
      name: "Cardoncello di Nebrodi",
      scientificName: "Pleurotus nebrodensis",
      location: "Sustrato de restos de esparto - Cámara Controlada",
      humidity: 80,
      temperature: 20,
      co2: 500,
      stage: "fructificación",
      harvestIn: "2 días",
      status: "excelente",
      icon: "🍄",
    },
    {
      id: "prataiolo",
      name: "Prataiolo Siciliano",
      scientificName: "Agaricus bitorquis",
      location: "Compost de esparto - Zona de Sombra",
      humidity: 75,
      temperature: 16,
      co2: 600,
      stage: "cosecha",
      harvestIn: "hoy",
      status: "listo",
      icon: "🍄",
    },
    {
      id: "niccolo",
      name: "Níccolo",
      scientificName: "Lactarius sanguifluus",
      location: "Sotobosque de pinos y encinas",
      humidity: 82,
      temperature: 19,
      co2: 480,
      stage: "micorriza",
      harvestIn: "12 días",
      status: "bueno",
      icon: "🍄",
    },
  ];

  const gardenStats = [
    {
      value: "71%",
      label: "Humedad media",
      icon: <Droplets className="w-5 h-5" />,
    },
    {
      value: "22°C",
      label: "Temperatura media",
      icon: <Thermometer className="w-5 h-5" />,
    },
    { value: "56%", label: "Luz solar", icon: <Sun className="w-5 h-5" /> },
    {
      value: "4",
      label: "Setas autóctonas",
      icon: <span className="text-xl">🍄</span>,
    },
    {
      value: "92%",
      label: "Salud del Esparto",
      icon: <Sprout className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-amber-50 to-red-50">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl">
              <SicilianFlag />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Sicilia Soil <Sprout className="w-6 h-6 text-red-600" />
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-red-500" />
                Permacultura, Micología y Esparto en Sicilia
              </p>
              <div className="mt-1">
                <SicilianFlagSimple />
              </div>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              serverStatus === "online"
                ? "bg-green-100 text-green-800"
                : serverStatus === "offline"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {serverStatus === "online" && <CheckCircle className="w-4 h-4" />}
            <span className="font-medium">
              {serverStatus === "online"
                ? "Sensores activos"
                : serverStatus === "offline"
                  ? "Sensores desconectados"
                  : "Conectando sensores..."}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center mb-4 px-4 py-2 bg-gradient-to-r from-red-100 to-yellow-100 text-red-800 rounded-full text-sm font-medium">
              <SicilianFlag />
              <span className="ml-2">Monitoreo en tiempo real</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Permacultura, Micología y Esparto
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
                tradición siciliana con tecnología
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Este proyecto monitoriza la humedad, temperatura y luz de mi
              huerto en <strong>Sicilia</strong>, incluyendo cultivos de setas
              autóctonas sicilianas y la planta de esparto, con su calendario de
              recolección y procesamiento tradicional.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/carmen-buendia/sicilia-soil"
                target="_blank"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-semibold flex items-center gap-3 hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.58C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Ver en GitHub
              </a>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors">
                Ver datos en tiempo real
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-red-200">
            <div className="flex items-center gap-2 mb-6">
              <SicilianFlag />
              <h3 className="text-2xl font-bold text-gray-900">
                Estado general
              </h3>
            </div>
            <div className="space-y-6">
              {gardenStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl border border-red-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-yellow-400 rounded-lg text-white">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{stat.label}</p>
                      <p className="text-sm text-gray-600">Promedio hoy</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Esparto Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Sprout className="w-8 h-8 text-amber-700" />
                Cultivo de Esparto (Stipa tenacissima)
              </h2>
              <p className="text-gray-600">
                Planta textil tradicional siciliana
              </p>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <SicilianFlag />
              <span className="font-medium">Tradición siciliana</span>
            </div>
          </div>

          {/* Esparto summary cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Sprout className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900">Estado general</h3>
              </div>
              <p className="text-2xl font-bold text-amber-700 mb-2">
                {espartoData.general.health}% salud
              </p>
              <p className="text-sm text-gray-600">
                {espartoData.general.scientificName}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Próxima recolección: {espartoData.general.nextHarvest}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Leaf className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900">Crecimiento</h3>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {espartoData.growth.phase}
              </p>
              <p className="text-sm text-gray-600">
                Altura: {espartoData.growth.height}
              </p>
              <p className="text-sm text-gray-600">
                Densidad: {espartoData.growth.density}
              </p>
              <p className="text-sm text-amber-600 mt-2">
                {espartoData.growth.newShoots} nuevos brotes
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Droplets className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900">Suelo</h3>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {espartoData.soil.type}
              </p>
              <p className="text-sm text-gray-600">
                pH: {espartoData.soil.ph} • Humedad: {espartoData.soil.moisture}
                %
              </p>
              <p className="text-sm text-green-600 mt-2">
                Nutrientes: {espartoData.soil.nutrients}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900">Cosecha</h3>
              </div>
              <p className="text-lg font-bold text-amber-700">
                {espartoData.harvest.nextDate}
              </p>
              <p className="text-sm text-gray-600">
                Rendimiento: {espartoData.harvest.estimatedYield}
              </p>
              <p className="text-sm text-gray-600">
                Stock: {espartoData.harvest.currentStock}
              </p>
              <p className="text-xs text-green-600 mt-2">
                Calidad: {espartoData.harvest.quality}
              </p>
            </div>
          </div>

          {/* Esparto processes */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Factory className="w-5 h-5 text-amber-700" />
              Procesos de transformación del esparto
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-200 rounded-full">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Recolección</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">15 junio</p>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="relative p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-200 rounded-full">
                    <Sun className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Secado</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">junio-julio</p>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-400"></span>
              </div>
              <div className="relative p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-200 rounded-full">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">
                    Majado (maceración)
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">julio</p>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-500"></span>
              </div>
              <div className="relative p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-200 rounded-full">
                    <Factory className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">Espadillado</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">agosto</p>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-400"></span>
              </div>
              <div className="relative p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-amber-200 rounded-full">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">
                    Tejido/elaboración
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">septiembre</p>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-400"></span>
              </div>
            </div>
          </div>

          {/* Esparto calendar */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-700" />
              Calendario anual de trabajo del esparto
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {espartoCalendar.map((month, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    month.highlight
                      ? "bg-gradient-to-r from-red-100 to-yellow-100 border-red-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center justify-between">
                    {month.month}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        month.intensity === "baja"
                          ? "bg-gray-200 text-gray-600"
                          : month.intensity === "media"
                            ? "bg-blue-100 text-blue-800"
                            : month.intensity === "alta"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {month.intensity}
                    </span>
                  </h4>
                  <ul className="space-y-1">
                    {month.tasks.map((task, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-600 flex items-start gap-1"
                      >
                        <span className="text-amber-600 mt-0.5">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-amber-100 rounded-lg border border-amber-300">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <strong>Nota:</strong> La recolección tradicional del esparto se
                realiza en junio-julio, cuando la planta alcanza su máximo
                desarrollo y antes de que pierda flexibilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Mushroom Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">🍄</span>
                Setas Autóctonas Sicilianas
              </h2>
              <p className="text-gray-600">
                Hongos endémicos que regeneran el suelo
              </p>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <SicilianFlag />
              <span className="font-medium">Micología autóctona</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mushroomZones.map((mushroom) => (
              <div
                key={mushroom.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:border-red-300 transition-all hover:shadow-xl group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{mushroom.icon}</span>
                  <Badge
                    variant={
                      mushroom.status === "óptimo"
                        ? "success"
                        : mushroom.status === "excelente"
                          ? "success"
                          : mushroom.status === "listo"
                            ? "warning"
                            : "info"
                    }
                  >
                    {mushroom.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700">
                  {mushroom.name}
                </h3>
                <p className="text-xs text-gray-500 italic mb-1">
                  {mushroom.scientificName}
                </p>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <span>📍</span> {mushroom.location}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Humedad</span>
                    <span className="font-bold">{mushroom.humidity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${mushroom.humidity}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Temperatura</span>
                    <span className="font-bold">{mushroom.temperature}°C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CO₂</span>
                    <span className="font-bold">{mushroom.co2} ppm</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Cosecha</span>
                    <span className="font-medium text-red-600">
                      {mushroom.harvestIn}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Etapa: {mushroom.stage}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver detalles
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Garden Zones Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Zonas del huerto
              </h2>
              <p className="text-gray-600">
                Datos actualizados de cada área de cultivo
              </p>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <SicilianFlag />
              <span className="font-medium">Permacultura siciliana</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gardenZones.map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:border-red-300 transition-all hover:shadow-xl group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{zone.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700">
                        {zone.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{zone.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      zone.status === "saludable"
                        ? "success"
                        : zone.status === "óptimo"
                          ? "info"
                          : zone.status === "necesita riego"
                            ? "warning"
                            : "default"
                    }
                  >
                    {zone.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                  <span>📍 {zone.location}</span>
                  <span className="mx-2">•</span>
                  <span>🕒 {formatRelativeTime(zone.lastUpdate)}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        Humedad
                      </span>
                      <span className="font-bold">{zone.moisture}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${zone.moisture}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{zone.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{zone.light}% luz</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">{zone.wind} km/h</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver histórico
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 mb-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <SicilianFlag />
            <h2 className="text-2xl font-bold">Stack tecnológico</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                ⚛️
              </div>
              <h3 className="font-bold text-lg mb-2">React + TypeScript</h3>
              <p className="text-white/80">
                Componentes reutilizables y tipado seguro
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h3 className="font-bold text-lg mb-2">Visualización</h3>
              <p className="text-white/80">
                HighCharts y gráficos personalizados
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                🎨
              </div>
              <h3 className="font-bold text-lg mb-2">Tailwind CSS</h3>
              <p className="text-white/80">
                Diseño responsive con colores sicilianos
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                🌾
              </div>
              <h3 className="font-bold text-lg mb-2">Esparto y Micología</h3>
              <p className="text-white/80">Cultivos tradicionales sicilianos</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-full">
            <SicilianFlag />
            <span className="font-semibold">Proyecto open source</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Te gusta este proyecto?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            El código está disponible en GitHub. Puedes usarlo, modificarlo o
            inspirarte para tu propio huerto, cultivo de setas autóctonas o
            trabajo con esparto.
          </p>
          <a
            href="https://github.com/carmen-buendia/sicilia-soil"
            target="_blank"
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all inline-flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.58C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Ver en GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
