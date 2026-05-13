// lib/data/designData.ts

import React from "react";
import { TreeDeciduous, Flower2, Leaf, Sprout } from "lucide-react";
import type {
  LayerType,
  SymbiosisType,
  SuccessionType,
  ElementType,
} from "@/lib/types/design.types";

// ============================================
// LAYERS - ESTRATOS DEL BOSQUE
// ============================================

export const layers: LayerType[] = [
  {
    id: "canopy",
    name: "Canopy (Estrato alto)",
    height: "8-15 m",
    description: "El techo del bosque, donde la luz se filtra y la vida abunda",
    symbiosis: [
      "Sombrea el sotobosque",
      "Protege del viento",
      "Ciclo de nutrientes",
    ],
    species: [
      {
        name: "Olivo",
        icon: "🫒",
        function: "Sombra, aceite, estructura",
        color: "#5A6B47",
        benefits: ["Aceite de calidad", "Longevidad", "Resistente a sequía"],
        companionPlants: ["Romero", "Lavanda", "Esparto"],
      },
      {
        name: "Algarrobo",
        icon: "🌳",
        function: "Nitrógeno, sombra, alimento",
        color: "#4A5B37",
        benefits: ["Fija nitrógeno", "Alimento para ganado", "Madera noble"],
        companionPlants: ["Trébol", "Alfalfa", "Esparto"],
      },
      {
        name: "Almendro",
        icon: "🌰",
        function: "Frutos secos, floración temprana",
        color: "#6B7B57",
        benefits: [
          "Floración ornamental",
          "Frutos secos",
          "Abejas polinizadoras",
        ],
        companionPlants: ["Lavanda", "Romero", "Tomillo"],
      },
    ],
    icon: React.createElement(TreeDeciduous, { className: "w-6 h-6" }),
    color: "from-oliveGreen to-oliveGreen/80",
    bg: "bg-oliveGreen/5",
  },
  {
    id: "understory",
    name: "Sotobosque (Estrato medio)",
    height: "2-6 m",
    description:
      "El corazón del ecosistema, donde ocurre la magia de la biodiversidad",
    symbiosis: [
      "Protege el suelo",
      "Hábitat para fauna",
      "Ciclo de nutrientes",
    ],
    species: [
      {
        name: "Esparto",
        icon: "🌾",
        function: "Fibra textil, biomasa",
        color: "#E6B422",
        benefits: ["Fibra natural", "Control de erosión", "Biomasa"],
        companionPlants: ["Olivo", "Almendro", "Romero"],
      },
      {
        name: "Romero",
        icon: "🌿",
        function: "Aromática, protección",
        color: "#7A8B67",
        benefits: ["Aceites esenciales", "Repelente natural", "Culinario"],
        companionPlants: ["Olivo", "Lavanda", "Tomillo"],
      },
      {
        name: "Tomillo",
        icon: "🌱",
        function: "Aromática, cobertura",
        color: "#8B9B77",
        benefits: [
          "Antiséptico natural",
          "Cobertura suelo",
          "Atrae polinizadores",
        ],
        companionPlants: ["Romero", "Lavanda", "Albahaca"],
      },
    ],
    icon: React.createElement(Flower2, { className: "w-6 h-6" }),
    color: "from-wheatGold to-wheatGold/80",
    bg: "bg-wheatGold/5",
  },
  {
    id: "fungal",
    name: "Capa fúngica (Micología)",
    height: "0.1-0.3 m",
    description: "El internet de la naturaleza, conectando todo bajo tierra",
    symbiosis: [
      "Conexión subterránea",
      "Descomposición",
      "Nutrientes compartidos",
    ],
    species: [
      {
        name: "Cardonchello",
        icon: "🍄",
        function: "Descomposición, alimento",
        color: "#CD212A",
        benefits: ["Gourmet", "Descompone materia", "Micorrizas"],
        companionPlants: ["Olivo", "Algarrobo", "Encina"],
      },
      {
        name: "Cardoncello di Nebrodi",
        icon: "🍄",
        function: "Endémica, gourmet",
        color: "#B81820",
        benefits: ["Endémica Sicilia", "Alto valor", "Turismo micológico"],
        companionPlants: ["Esparto", "Olivo", "Algarrobo"],
      },
      {
        name: "Prataiolo siciliano",
        icon: "🍄",
        function: "Humus, regeneración",
        color: "#D42A32",
        benefits: ["Mejora suelo", "Ciclo rápido", "Fácil cultivo"],
        companionPlants: ["Todas las plantas"],
      },
      {
        name: "Níccolo",
        icon: "🍄",
        function: "Micorriza con encinas",
        color: "#A91018",
        benefits: ["Gastronómico", "Conservación", "Micorrizas"],
        companionPlants: ["Encina", "Pino", "Algarrobo"],
      },
    ],
    icon: React.createElement(Leaf, { className: "w-6 h-6" }),
    color: "from-sicilian-red to-sicilian-red/80",
    bg: "bg-sicilian-red/5",
  },
  {
    id: "ground",
    name: "Cobertura vegetal",
    height: "0-0.5 m",
    description: "La alfombra viva que protege y nutre el suelo",
    symbiosis: ["Fija nitrógeno", "Protege erosión", "Retiene humedad"],
    species: [
      {
        name: "Trébol",
        icon: "🍀",
        function: "Fijador de nitrógeno",
        color: "#5A6B47",
        benefits: ["Fija N2", "Cobertura rápida", "Forraje"],
        companionPlants: ["Olivo", "Algarrobo", "Almendro"],
      },
      {
        name: "Habas",
        icon: "🌱",
        function: "Nitrógeno, biomasa",
        color: "#4A5B37",
        benefits: ["Abono verde", "Alimento", "Rotación"],
        companionPlants: ["Olivo", "Tomate", "Maíz"],
      },
      {
        name: "Alfalfa",
        icon: "🌿",
        function: "Cobertura, alimento",
        color: "#6B7B57",
        benefits: ["Protección suelo", "Forraje", "Raíces profundas"],
        companionPlants: ["Olivo", "Almendro", "Higuera"],
      },
    ],
    icon: React.createElement(Sprout, { className: "w-6 h-6" }),
    color: "from-oliveGreen to-oliveGreen/70",
    bg: "bg-oliveGreen/5",
  },
];

// ============================================
// SYMBIOSIS - RELACIONES SIMBIÓTICAS
// ============================================

export const symbiosis: SymbiosisType[] = [
  {
    id: "olive-rosemary",
    from: "Olivo",
    to: "Romero",
    description:
      "El romero repele plagas del olivo y mejora la retención de humedad",
    type: "Mutualismo",
    strength: 4,
    icon: "🤝",
  },
  {
    id: "carob-clover",
    from: "Algarrobo",
    to: "Trébol",
    description: "El trébol fija nitrógeno que beneficia al algarrobo",
    type: "Ciclo de nutrientes",
    strength: 5,
    icon: "🔄",
  },
  {
    id: "fungal-network",
    from: "Cardonchello",
    to: "Olivo",
    description: "Red de micorrizas que conecta y nutre a ambos",
    type: "Red simbiótica",
    strength: 5,
    icon: "🍄",
  },
  {
    id: "almond-lavender",
    from: "Almendro",
    to: "Lavanda",
    description: "La lavanda atrae polinizadores para el almendro",
    type: "Sinergia",
    strength: 3,
    icon: "🌸",
  },
];

// ============================================
// SUCCESSION - SUCESIÓN ECOLÓGICA
// ============================================

export const succession: SuccessionType[] = [
  {
    year: "0-2",
    phase: "Establecimiento",
    tasks: ["Preparación suelo", "Plantación pionera", "Riego inicial"],
    milestones: ["Supervivencia >80%", "Cobertura inicial"],
    biodiversity: 20,
    productivity: 10,
  },
  {
    year: "3-5",
    phase: "Desarrollo",
    tasks: ["Manejo de cubiertas", "Poda formativa", "Incorporación de fauna"],
    milestones: ["Dosel cerrado", "Primera cosecha"],
    biodiversity: 50,
    productivity: 40,
  },
  {
    year: "6-10",
    phase: "Madurez temprana",
    tasks: ["Manejo integrado", "Expansión de cultivos", "Cosecha regular"],
    milestones: ["Ecosistema funcional", "Producción estable"],
    biodiversity: 75,
    productivity: 70,
  },
  {
    year: "10+",
    phase: "Clímax",
    tasks: [
      "Mantenimiento mínimo",
      "Regeneración natural",
      "Cosecha sostenible",
    ],
    milestones: ["Bosque comestible", "Autosuficiencia"],
    biodiversity: 95,
    productivity: 90,
  },
];

// ============================================
// DRAWING ELEMENTS - ELEMENTOS PARA DIBUJO
// ============================================

export const drawingElements: ElementType[] = [
  {
    id: "olive-tree",
    name: "Olivo",
    icon: "🫒",
    category: "trees",
    size: 30,
    color: "#5A6B47",
    realSize: 4,
    description: "Árbol longevo que produce aceitunas",
    benefits: ["Aceite de oliva", "Sombra", "Fijación de carbono"],
  },
  {
    id: "carob-tree",
    name: "Algarrobo",
    icon: "🌳",
    category: "trees",
    size: 35,
    color: "#4A5B37",
    realSize: 5,
    description: "Árbol que fija nitrógeno y produce algarroba",
    benefits: ["Fijación de nitrógeno", "Alimento", "Madera"],
  },
  {
    id: "almond-tree",
    name: "Almendro",
    icon: "🌰",
    category: "trees",
    size: 25,
    color: "#6B7B57",
    realSize: 3.5,
    description: "Árbol de floración temprana que produce almendras",
    benefits: ["Frutos secos", "Floración ornamental", "Abejas"],
  },
  {
    id: "rosemary",
    name: "Romero",
    icon: "🌿",
    category: "shrubs",
    size: 15,
    color: "#7A8B67",
    realSize: 1,
    description: "Planta aromática mediterránea",
    benefits: ["Aceites esenciales", "Repelente natural", "Culinario"],
  },
  {
    id: "thyme",
    name: "Tomillo",
    icon: "🌱",
    category: "shrubs",
    size: 10,
    color: "#8B9B77",
    realSize: 0.5,
    description: "Planta aromática de cobertura",
    benefits: ["Antiséptico", "Cobertura", "Polinizadores"],
  },
  {
    id: "esparto",
    name: "Esparto",
    icon: "🌾",
    category: "groundcovers",
    size: 12,
    color: "#E6B422",
    realSize: 0.8,
    description: "Fibra natural para control de erosión",
    benefits: ["Fibra textil", "Control de erosión", "Biomasa"],
  },
  {
    id: "clover",
    name: "Trébol",
    icon: "🍀",
    category: "groundcovers",
    size: 8,
    color: "#5A6B47",
    realSize: 0.3,
    description: "Fijador de nitrógeno y cobertura vegetal",
    benefits: ["Fija nitrógeno", "Cobertura rápida", "Forraje"],
  },
];

// ============================================
// CATEGORIES - CATEGORÍAS PARA ELEMENTOS
// ============================================

export const categories = [
  {
    id: "trees",
    name: "Árboles",
    items: ["Olivo", "Algarrobo", "Almendro"],
  },
  {
    id: "shrubs",
    name: "Arbustos",
    items: ["Romero", "Tomillo", "Lavanda"],
  },
  {
    id: "groundcovers",
    name: "Coberturas",
    items: ["Trébol", "Alfalfa", "Esparto"],
  },
];
