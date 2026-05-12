"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Thermometer,
  Wind,
  Calendar,
  MapPin,
  Leaf,
  Info,
} from "lucide-react";
import { MycologyChart } from "@/components/charts/MycologyChart";

// Datos simulados para setas autóctonas
const generateMushroomData = (
  days: number,
  baseValue: number,
  variance: number,
) => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = Math.sin((i / 7) * Math.PI) * variance;
    const randomVar = (Math.random() - 0.5) * variance;
    const value = baseValue + variation + randomVar;
    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: Math.round(value * 10) / 10,
    });
  }
  return data;
};

const mushrooms = [
  {
    id: "cardonchello",
    name: "Cardonchello",
    scientificName: "Pleurotus eryngii",
    icon: "🍄",
    description:
      "Seta emblemática de Sicilia, crece sobre raíces de cañaheja. Muy apreciada en la gastronomía local.",
    habitat: "Pastizales, bordes de caminos, asociada a Ferula communis",
    season: ["Otoño", "Invierno", "Primavera"],
    isEndemic: false,
    data: {
      humidity: generateMushroomData(30, 85, 5),
      temperature: generateMushroomData(30, 18, 3),
      co2: generateMushroomData(30, 450, 30),
    },
    optimal: { humidity: [75, 85], temperature: [16, 22], co2: [400, 600] },
  },
  {
    id: "cardoncello-nebrodi",
    name: "Cardoncello di Nebrodi",
    scientificName: "Pleurotus nebrodensis",
    icon: "🍄",
    description:
      "Seta endémica de los montes Nebrodi en Sicilia. Una de las setas más raras y cotizadas del mundo.",
    habitat: "Montañas de los Nebrodi, asociada a Cachrys ferulacea",
    season: ["Primavera"],
    isEndemic: true,
    data: {
      humidity: generateMushroomData(30, 80, 5),
      temperature: generateMushroomData(30, 20, 3),
      co2: generateMushroomData(30, 500, 40),
    },
    optimal: { humidity: [70, 85], temperature: [18, 24], co2: [400, 700] },
  },
  {
    id: "prataiolo",
    name: "Prataiolo Siciliano",
    scientificName: "Agaricus bitorquis",
    icon: "🍄",
    description:
      "Variedad autóctona del champiñón, muy valorada en la cocina tradicional siciliana.",
    habitat: "Suelos ricos en materia orgánica, compost",
    season: ["Primavera", "Otoño"],
    isEndemic: false,
    data: {
      humidity: generateMushroomData(30, 75, 4),
      temperature: generateMushroomData(30, 16, 2),
      co2: generateMushroomData(30, 600, 50),
    },
    optimal: { humidity: [70, 80], temperature: [14, 18], co2: [500, 700] },
  },
  {
    id: "niccolo",
    name: "Níccolo",
    scientificName: "Lactarius sanguifluus",
    icon: "🍄",
    description:
      "Hongo micorrícico autóctono que crece asociado a encinas y pinos.",
    habitat: "Bosques de encinas y pinos",
    season: ["Otoño"],
    isEndemic: false,
    data: {
      humidity: generateMushroomData(30, 82, 6),
      temperature: generateMushroomData(30, 19, 2),
      co2: generateMushroomData(30, 480, 35),
    },
    optimal: { humidity: [75, 85], temperature: [17, 21], co2: [400, 550] },
  },
];

export default function MycologyPage() {
  const [selectedMushroom, setSelectedMushroom] = useState("cardonchello");
  const current = mushrooms.find((m) => m.id === selectedMushroom)!;

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "humidity":
        return <Droplets className="w-4 h-4" />;
      case "temperature":
        return <Thermometer className="w-4 h-4" />;
      default:
        return <Wind className="w-4 h-4" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "humidity":
        return "text-oliveGreen";
      case "temperature":
        return "text-sicilian-red";
      default:
        return "text-wheatGold";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
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
                  <span className="text-2xl">🍄</span>
                </div>
                Micología Siciliana
              </h1>
              <p className="text-oliveGreen/70">
                Seguimiento de setas autóctonas y condiciones de cultivo
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-2xl p-6 md:p-8 mb-12 border border-oliveGreen/20">
          <h2 className="text-2xl font-bold text-charcoalGray mb-3">
            🍄 El Reino Fungi en la Permacultura Sintrópica
          </h2>
          <p className="text-charcoalGray/80 mb-4">
            Los hongos son la <strong>red de internet de la naturaleza</strong>.
            Conectan plantas, descomponen materia orgánica y crean suelos vivos.
            En Sicilia, tenemos especies endémicas como el Cardoncello di
            Nebrodi que son clave para nuestros ecosistemas.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🔬 Micorrizas
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🌍 Endemismo siciliano
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              ♻️ Descomposición
            </span>
            <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
              🍽️ Gastronomía
            </span>
          </div>
        </div>

        {/* Selector de setas */}
        <div className="flex flex-wrap gap-3 mb-8">
          {mushrooms.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMushroom(m.id)}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                selectedMushroom === m.id
                  ? "bg-gradient-to-r from-oliveGreen to-wheatGold text-white shadow-lg scale-102"
                  : "bg-white text-charcoalGray hover:bg-oliveGreen/5 border border-oliveGreen/20"
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <div className="text-left">
                <p className="font-medium">{m.name}</p>
                <p className="text-xs opacity-80">{m.scientificName}</p>
              </div>
              {m.isEndemic && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedMushroom === m.id
                      ? "bg-white/20 text-white"
                      : "bg-wheatGold/20 text-wheatGold"
                  }`}
                >
                  Endémica
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Info de la seta seleccionada */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Descripción */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-oliveGreen" />
              <h3 className="text-lg font-bold text-charcoalGray">
                Descripción
              </h3>
            </div>
            <p className="text-oliveGreen/70 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Datos rápidos */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Hábitat:</span>
                <span className="text-sm font-medium text-charcoalGray">
                  {current.habitat}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Temporada:</span>
                <span className="text-sm font-medium text-charcoalGray">
                  {current.season.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-oliveGreen" />
                <span className="text-sm text-oliveGreen/70">Endemismo:</span>
                <span
                  className={`text-sm font-medium ${current.isEndemic ? "text-wheatGold" : "text-oliveGreen/60"}`}
                >
                  {current.isEndemic ? "Endémica de Sicilia 🌍" : "Cosmopolita"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
            📊 Seguimiento de condiciones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.humidity}
                metric="humidity"
                height={350}
              />
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.temperature}
                metric="temperature"
                height={350}
              />
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15 md:col-span-2">
              <MycologyChart
                mushroomName={current.name}
                data={current.data.co2}
                metric="co2"
                height={350}
              />
            </div>
          </div>
        </div>

        {/* Condiciones óptimas */}
        <div className="bg-gradient-to-r from-oliveGreen/5 to-wheatGold/5 rounded-2xl p-6 border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-oliveGreen" />
            Condiciones óptimas para el cultivo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
              <div className="w-10 h-10 bg-oliveGreen/20 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-oliveGreen" />
              </div>
              <div>
                <p className="text-sm text-oliveGreen/60">Humedad ideal</p>
                <p className="font-medium text-charcoalGray">
                  {current.optimal.humidity[0]}% - {current.optimal.humidity[1]}
                  %
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
              <div className="w-10 h-10 bg-sicilian-red/20 rounded-full flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-sicilian-red" />
              </div>
              <div>
                <p className="text-sm text-oliveGreen/60">Temperatura ideal</p>
                <p className="font-medium text-charcoalGray">
                  {current.optimal.temperature[0]}°C -{" "}
                  {current.optimal.temperature[1]}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
              <div className="w-10 h-10 bg-wheatGold/20 rounded-full flex items-center justify-center">
                <Wind className="w-5 h-5 text-wheatGold" />
              </div>
              <div>
                <p className="text-sm text-oliveGreen/60">CO₂ ideal</p>
                <p className="font-medium text-charcoalGray">
                  {current.optimal.co2[0]} - {current.optimal.co2[1]} ppm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer educativo */}
        <div className="mt-12 p-6 bg-oliveGreen/5 rounded-2xl border border-oliveGreen/15">
          <h3 className="text-lg font-bold text-charcoalGray mb-3 flex items-center gap-2">
            📚 Sabías que...
          </h3>
          <p className="text-sm text-oliveGreen/70">
            El Cardoncello di Nebrodi es una de las setas más raras y cotizadas
            del mundo. Crece exclusivamente en las montañas de los Nebrodi en
            Sicilia y está protegida como patrimonio natural. Su cultivo en
            sistemas sintrópicos ayuda a su conservación.
          </p>
        </div>
      </div>
    </div>
  );
}
