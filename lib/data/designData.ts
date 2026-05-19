import type { ElementType } from "../types/design.types";

// ============================================
// ELEMENTOS DEL SISTEMA SINTRÓPICO (MUCHOS MÁS)
// ============================================

export const drawingElements: ElementType[] = [
  // ========== ÁRBOLES ==========
  {
    id: "olivo",
    name: "Olivo",
    icon: "🫒",
    category: "trees",
    color: "#5a7a3a",
    size: 32,
    realSize: 4,
    model3d: "tree",
  },
  {
    id: "algarrobo",
    name: "Algarrobo",
    icon: "🌳",
    category: "trees",
    color: "#4a6a2a",
    size: 36,
    realSize: 6,
    model3d: "tree",
  },
  {
    id: "almendro",
    name: "Almendro",
    icon: "🌰",
    category: "trees",
    color: "#7a8a4a",
    size: 32,
    realSize: 5,
    model3d: "tree",
  },
  {
    id: "higuera",
    name: "Higuera",
    icon: "🍐",
    category: "trees",
    color: "#6a7a3a",
    size: 34,
    realSize: 5,
    model3d: "tree",
  },
  {
    id: "cipres",
    name: "Ciprés",
    icon: "🌲",
    category: "trees",
    color: "#3a6a2a",
    size: 28,
    realSize: 3,
    model3d: "tree",
  },
  {
    id: "pino",
    name: "Pino",
    icon: "🌲",
    category: "trees",
    color: "#4a7a3a",
    size: 32,
    realSize: 5,
    model3d: "tree",
  },

  // ========== CULTIVOS ==========
  {
    id: "esparto",
    name: "Esparto",
    icon: "🌾",
    category: "crops",
    color: "#c4a86a",
    size: 24,
    realSize: 1.5,
    model3d: "crop",
  },
  {
    id: "lavanda",
    name: "Lavanda",
    icon: "🌸",
    category: "crops",
    color: "#9b59b6",
    size: 24,
    realSize: 1,
    model3d: "crop",
  },
  {
    id: "romero",
    name: "Romero",
    icon: "🌿",
    category: "crops",
    color: "#6a9a3a",
    size: 22,
    realSize: 1,
    model3d: "crop",
  },
  {
    id: "tomillo",
    name: "Tomillo",
    icon: "🌱",
    category: "crops",
    color: "#7aaa4a",
    size: 20,
    realSize: 0.8,
    model3d: "crop",
  },
  {
    id: "alcaparra",
    name: "Alcaparra",
    icon: "🥒",
    category: "crops",
    color: "#8aba5a",
    size: 22,
    realSize: 1,
    model3d: "crop",
  },
  {
    id: "trigo",
    name: "Trigo",
    icon: "🌾",
    category: "crops",
    color: "#d4b86a",
    size: 24,
    realSize: 1.2,
    model3d: "crop",
  },

  // ========== SETAS ==========
  {
    id: "champinon",
    name: "Champiñón",
    icon: "🍄",
    category: "mushrooms",
    color: "#e8d8c8",
    size: 20,
    realSize: 0.5,
    model3d: "mushroom",
  },
  {
    id: "shiitake",
    name: "Shiitake",
    icon: "🍄",
    category: "mushrooms",
    color: "#c8a878",
    size: 22,
    realSize: 0.6,
    model3d: "mushroom",
  },
  {
    id: "cardo",
    name: "Cardonchello",
    icon: "🍄",
    category: "mushrooms",
    color: "#d8b888",
    size: 24,
    realSize: 0.7,
    model3d: "mushroom",
  },
  {
    id: "ostra",
    name: "Setas Ostra",
    icon: "🍄",
    category: "mushrooms",
    color: "#e8c8a8",
    size: 26,
    realSize: 0.8,
    model3d: "mushroom",
  },

  // ========== ESTRUCTURAS ==========
  {
    id: "casa",
    name: "Casa",
    icon: "🏠",
    category: "structures",
    color: "#c47a5a",
    size: 48,
    realSize: 8,
    model3d: "house",
  },
  {
    id: "entrada",
    name: "Entrada",
    icon: "🚪",
    category: "structures",
    color: "#8a6a4a",
    size: 28,
    realSize: 3,
    model3d: "house",
  },
  {
    id: "invernadero",
    name: "Invernadero",
    icon: "🏗️",
    category: "structures",
    color: "#7aba7a",
    size: 44,
    realSize: 6,
    model3d: "greenhouse",
  },
  {
    id: "almacen",
    name: "Almacén",
    icon: "🏚️",
    category: "structures",
    color: "#9a7a5a",
    size: 40,
    realSize: 5,
    model3d: "house",
  },
  {
    id: "estanque",
    name: "Estanque",
    icon: "💧",
    category: "structures",
    color: "#4a9aba",
    size: 36,
    realSize: 4,
    model3d: "default",
  },
  {
    id: "compostera",
    name: "Compostera",
    icon: "🗑️",
    category: "structures",
    color: "#6a5a3a",
    size: 24,
    realSize: 1.5,
    model3d: "default",
  },

  // ========== INFRAESTRUCTURA ==========
  {
    id: "sensor",
    name: "Sensor IoT",
    icon: "📡",
    category: "infrastructure",
    color: "#e8e8e8",
    size: 20,
    realSize: 0.5,
    model3d: "sensor",
  },
  {
    id: "camino",
    name: "Camino",
    icon: "🛤️",
    category: "infrastructure",
    color: "#d4c4a4",
    size: 16,
    realSize: 1.5,
    model3d: "default",
  },
  {
    id: "valla",
    name: "Valla",
    icon: "🚧",
    category: "infrastructure",
    color: "#8a7a5a",
    size: 18,
    realSize: 0.3,
    model3d: "default",
  },
  {
    id: "riego",
    name: "Sistema riego",
    icon: "💦",
    category: "infrastructure",
    color: "#6aba9a",
    size: 22,
    realSize: 1,
    model3d: "default",
  },
];

// ============================================
// CATEGORÍAS PARA EL FILTRO
// ============================================
export const categories = [
  { id: "todos", name: "Todos" },
  { id: "trees", name: "🌳 Árboles" },
  { id: "crops", name: "🌾 Cultivos" },
  { id: "mushrooms", name: "🍄 Setas" },
  { id: "structures", name: "🏠 Estructuras" },
  { id: "infrastructure", name: "🔧 Infraestructura" },
];

// ============================================
// ESTRATOS SINTRÓPICOS (CAPAS)
// ============================================
export const layers = [
  {
    id: "canopy",
    name: "Canopea",
    height: "8-15 m",
    icon: "🌳",
    color: "from-emerald-700 to-emerald-600",
    bg: "bg-emerald-50",
    species: [
      {
        name: "Olivo",
        icon: "🫒",
        function: "Producción de aceite, sombra moderada",
      },
      {
        name: "Algarrobo",
        icon: "🌳",
        function: "Sombra densa, fijación de nitrógeno",
      },
      {
        name: "Almendro",
        icon: "🌰",
        function: "Producción de frutos, floración temprana",
      },
    ],
  },
  {
    id: "understory",
    name: "Sotobosque",
    height: "2-6 m",
    icon: "🌿",
    color: "from-emerald-600 to-emerald-500",
    bg: "bg-emerald-100",
    species: [
      { name: "Higuera", icon: "🍐", function: "Frutos dulces, refugio fauna" },
      { name: "Granado", icon: "🍎", function: "Frutos, floración ornamental" },
    ],
  },
  {
    id: "shrub",
    name: "Arbustivo",
    height: "0.5-2 m",
    icon: "🌱",
    color: "from-emerald-500 to-emerald-400",
    bg: "bg-emerald-100/70",
    species: [
      {
        name: "Romero",
        icon: "🌿",
        function: "Aromático, atrae polinizadores",
      },
      {
        name: "Lavanda",
        icon: "🌸",
        function: "Floración, control de erosión",
      },
    ],
  },
  {
    id: "ground",
    name: "Cobertura",
    height: "0-0.5 m",
    icon: "🍀",
    color: "from-emerald-400 to-emerald-300",
    bg: "bg-emerald-50/50",
    species: [
      {
        name: "Trébol",
        icon: "🍀",
        function: "Fijación de nitrógeno, cobertura",
      },
      { name: "Tomillo", icon: "🌱", function: "Aromático, cubresuelos" },
    ],
  },
];

// ============================================
// RELACIONES SIMBIÓTICAS
// ============================================
export const symbiosis = [
  {
    from: "Olivo",
    to: "Esparto",
    type: "Complementaria",
    description:
      "El esparto actúa como acolchado natural, manteniendo la humedad del suelo para el olivo",
  },
  {
    from: "Algarrobo",
    to: "Trébol",
    type: "Fijación de nitrógeno",
    description: "El trébol fija nitrógeno que beneficia al algarrobo",
  },
  {
    from: "Pino",
    to: "Cardonchello",
    type: "Micorriza",
    description: "Micorrización natural que mejora la absorción de nutrientes",
  },
  {
    from: "Higuera",
    to: "Romero",
    type: "Protección",
    description: "El romero repele plagas que afectan a la higuera",
  },
];

// ============================================
// SUCESIÓN TEMPORAL
// ============================================
export const succession = [
  {
    year: "Año 0-1",
    phase: "Preparación",
    tasks: [
      "Análisis de suelo",
      "Diseño de parcelas",
      "Instalación de riego",
      "Planta pionera",
    ],
  },
  {
    year: "Año 1-3",
    phase: "Establecimiento",
    tasks: [
      "Plantación de árboles",
      "Siembra de coberturas",
      "Instalación de sensores",
      "Compostaje",
    ],
  },
  {
    year: "Año 3-5",
    phase: "Consolidación",
    tasks: [
      "Primeras cosechas",
      "Poda de formación",
      "Expansión de setas",
      "Mejora de riego",
    ],
  },
  {
    year: "Año 5-10",
    phase: "Madurez",
    tasks: [
      "Sistema autosuficiente",
      "Cosechas regulares",
      "Biodiversidad consolidada",
      "Turismo educativo",
    ],
  },
];
