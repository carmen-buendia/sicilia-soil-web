"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  TreeDeciduous,
  Flower2,
  Leaf,
  Sprout,
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Calendar,
  Map,
  Layers,
  Link2,
  Info,
} from "lucide-react";

// Datos de los estratos del sistema sintrópico
const layers = [
  {
    id: "canopy",
    name: "Canopy (Estrato alto)",
    height: "8-15 m",
    species: [
      { name: "Olivo", icon: "🫒", function: "Sombra, aceite, estructura" },
      {
        name: "Algarrobo",
        icon: "🌳",
        function: "Nitrógeno, sombra, alimento",
      },
      {
        name: "Almendro",
        icon: "🌰",
        function: "Frutos secos, floración temprana",
      },
    ],
    icon: <TreeDeciduous className="w-6 h-6" />,
    color: "from-emerald-800 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "understory",
    name: "Sotobosque (Estrato medio)",
    height: "2-6 m",
    species: [
      { name: "Esparto", icon: "🌾", function: "Fibra textil, biomasa" },
      { name: "Romero", icon: "🌿", function: "Aromática, protección" },
      { name: "Tomillo", icon: "🌱", function: "Aromática, cobertura" },
    ],
    icon: <Flower2 className="w-6 h-6" />,
    color: "from-green-700 to-green-500",
    bg: "bg-green-50",
  },
  {
    id: "fungal",
    name: "Capa fúngica (Micología)",
    height: "0.1-0.3 m",
    species: [
      {
        name: "Cardonchello",
        icon: "🍄",
        function: "Descomposición, alimento",
      },
      {
        name: "Cardoncello di Nebrodi",
        icon: "🍄",
        function: "Endémica, gourmet",
      },
      {
        name: "Prataiolo siciliano",
        icon: "🍄",
        function: "Humus, regeneración",
      },
      { name: "Níccolo", icon: "🍄", function: "Micorriza con encinas" },
    ],
    icon: <Leaf className="w-6 h-6" />,
    color: "from-amber-700 to-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: "ground",
    name: "Cobertura vegetal",
    height: "0-0.5 m",
    species: [
      { name: "Trébol", icon: "🍀", function: "Fijador de nitrógeno" },
      { name: "Habas", icon: "🌱", function: "Nitrógeno, biomasa" },
      { name: "Alfalfa", icon: "🌿", function: "Cobertura, alimento" },
    ],
    icon: <Sprout className="w-6 h-6" />,
    color: "from-lime-700 to-lime-500",
    bg: "bg-lime-50",
  },
];

// Relaciones simbióticas
const symbiosis = [
  {
    from: "Olivo",
    to: "Cardonchello",
    description:
      "Las raíces del olivo airean el suelo, el micelio del cardonchello descompone materia",
    type: "mutualismo",
  },
  {
    from: "Esparto",
    to: "Cardoncello di Nebrodi",
    description:
      "Los restos de esparto sirven de sustrato para el cultivo de setas",
    type: "ciclo de nutrientes",
  },
  {
    from: "Algarrobo",
    to: "Trébol",
    description: "El algarrobo fija nitrógeno y el trébol protege el suelo",
    type: "sinergia",
  },
  {
    from: "Micorrizas",
    to: "Todas las plantas",
    description: "Conexión subterránea que comparte nutrientes y agua",
    type: "red simbiótica",
  },
];

// Calendario de sucesión
const succession = [
  {
    year: "Año 1",
    phase: "Pionera",
    tasks: [
      "Plantación de cobertura",
      "Establecimiento de setas",
      "Riego inicial",
    ],
  },
  {
    year: "Años 2-3",
    phase: "Acumulación",
    tasks: [
      "Crecimiento de arbustos",
      "Primera cosecha de setas",
      "Acolchado continuo",
    ],
  },
  {
    year: "Años 4-5",
    phase: "Transición",
    tasks: [
      "Primeras cosechas de esparto",
      "Expansión de micelio",
      "Reducción de riego",
    ],
  },
  {
    year: "Años 6-10",
    phase: "Clímax",
    tasks: [
      "Cosecha estable de olivos",
      "Esparto maduro",
      "Sistema autorregulado",
    ],
  },
];

export default function DesignPage() {
  const [activeLayer, setActiveLayer] = useState("canopy");

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#F5F0E6]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-[#F5D7B3] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#2C2C2C]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <Layers className="w-8 h-8 text-[#B43F2B]" />
              Diseño Sintrópico
            </h1>
            <p className="text-[#5F6B3D]">
              Estrategia de capas, relaciones simbióticas y sucesión temporal
            </p>
          </div>
        </div>

        {/* Hero con el concepto */}
        <div className="bg-gradient-to-r from-[#B43F2B]/10 to-[#E6B17E]/10 rounded-2xl p-6 md:p-8 mb-12 border border-[#E6B17E]/30">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-3">
            🌱 ¿Qué es la Permacultura Sintrópica Micológica?
          </h2>
          <p className="text-[#2C2C2C]/80 mb-4">
            La <strong>sintropía</strong> es el principio opuesto a la entropía:
            sistemas que{" "}
            <strong>ganan complejidad y abundancia con el tiempo</strong>.
            Aplicada a la permacultura y combinada con micología, crea un
            ecosistema donde cada elemento beneficia a los demás.
          </p>
          <p className="text-[#2C2C2C]/80 italic">
            "No es solo un huerto, es un ecosistema que se diseña a sí mismo con
            la ayuda de hongos y tecnología"
          </p>
        </div>

        {/* Mapa de capas - visualización interactiva */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-2">
            <Map className="w-6 h-6 text-[#B43F2B]" />
            Mapa de Capas
          </h2>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`p-4 rounded-xl transition-all text-left ${
                  activeLayer === layer.id
                    ? `bg-gradient-to-r ${layer.color} text-white shadow-lg`
                    : `${layer.bg} text-[#2C2C2C] hover:shadow-md`
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {layer.icon}
                  <span className="font-bold">{layer.name}</span>
                </div>
                <p className="text-sm opacity-80">{layer.height}</p>
              </button>
            ))}
          </div>

          {/* Contenido de la capa activa */}
          {layers.map(
            (layer) =>
              activeLayer === layer.id && (
                <div
                  key={layer.id}
                  className={`${layer.bg} rounded-2xl p-6 border border-[#E6B17E]/30`}
                >
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                    {layer.icon} {layer.name}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {layer.species.map((species, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{species.icon}</span>
                          <span className="font-bold">{species.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {species.function}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Relaciones simbióticas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-2">
            <Link2 className="w-6 h-6 text-[#B43F2B]" />
            Relaciones Simbióticas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {symbiosis.map((rel, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#E6B17E]/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {rel.from === "Olivo"
                        ? "🫒"
                        : rel.from === "Esparto"
                          ? "🌾"
                          : rel.from === "Algarrobo"
                            ? "🌳"
                            : "🍄"}
                    </span>
                    <span className="font-bold">{rel.from}</span>
                  </div>
                  <span className="text-[#B43F2B]">→</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{rel.to}</span>
                    <span className="text-xl">
                      {rel.to === "Cardonchello"
                        ? "🍄"
                        : rel.to === "Cardoncello di Nebrodi"
                          ? "🍄"
                          : rel.to === "Trébol"
                            ? "🍀"
                            : "🌱"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rel.description}</p>
                <span className="inline-block px-2 py-1 bg-[#F5D7B3] text-[#5F6B3D] rounded-full text-xs">
                  {rel.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sucesión temporal */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#B43F2B]" />
            Sucesión Temporal
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {succession.map((phase, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#E6B17E]/20"
              >
                <h3 className="text-lg font-bold text-[#B43F2B] mb-1">
                  {phase.year}
                </h3>
                <p className="font-medium text-[#2C2C2C] mb-3">{phase.phase}</p>
                <ul className="space-y-1">
                  {phase.tasks.map((task, j) => (
                    <li
                      key={j}
                      className="text-sm text-gray-600 flex items-start gap-1"
                    >
                      <span className="text-[#B43F2B]">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Condiciones del suelo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20 mb-12">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#3B82F6]" />
            Estado del Suelo
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Humedad</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">pH</span>
                <span className="text-sm font-medium">
                  7.2 (ligeramente alcalino)
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Materia orgánica</span>
                <span className="text-sm font-medium">4.5% (buena)</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
            <div className="bg-[#F5D7B3]/30 rounded-xl p-4">
              <h3 className="font-bold text-[#2C2C2C] mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Recomendaciones
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  ✓ El suelo es arcillo-calcáreo, ideal para esparto y olivos
                </li>
                <li>
                  ✓ Aumentar materia orgánica con compost de esparto y restos de
                  setas
                </li>
                <li>✓ Mantener acolchado para retener humedad en verano</li>
                <li>
                  ✓ Inocular micorrizas para mejorar absorción de nutrientes
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer del diseño */}
        <div className="text-center py-8 border-t border-[#E6B17E]/30">
          <p className="text-sm text-[#5F6B3D]">
            🌱 Diseño basado en principios de sintropía de Ernst Götsch y
            micología aplicada
          </p>
          <p className="text-xs text-[#C4A27A] mt-2">
            Este es el diseño conceptual de mi huerto en Sicilia. Cada capa está
            pensada para interactuar y regenerar el suelo.
          </p>
        </div>
      </div>
    </div>
  );
}
