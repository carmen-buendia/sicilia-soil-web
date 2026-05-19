export interface ElementType {
  id: string;
  name: string;
  icon: string;
  category: "trees" | "crops" | "mushrooms" | "structures" | "infrastructure";
  color: string;
  size: number; // tamaño en píxeles para el canvas 2D
  realSize: number; // tamaño real en metros
  model3d?:
    | "tree"
    | "house"
    | "greenhouse"
    | "sensor"
    | "mushroom"
    | "crop"
    | "default";
}

export interface PlacedElement {
  x: number;
  y: number;
  element: ElementType;
}

export interface SavedDesign {
  name: string;
  elements: PlacedElement[];
  date: string;
  terrainWidth: number;
  terrainHeight: number;
  pixelsPerMeter: number;
}

export interface LayerType {
  id: string;
  name: string;
  height: string;
  species: SpeciesType[];
  icon: React.ReactNode;
  color: string;
  bg: string;
  description: string;
  symbiosis: string[];
}

export interface SpeciesType {
  name: string;
  icon: string;
  function: string;
  color: string;
  benefits: string[];
  companionPlants: string[];
}

export interface SymbiosisType {
  id: string;
  from: string;
  to: string;
  description: string;
  type: "Mutualismo" | "Ciclo de nutrientes" | "Sinergia" | "Red simbiótica";
  strength: number; // 1-5
  icon: string;
}

export interface SuccessionType {
  year: string;
  phase: string;
  tasks: string[];
  milestones: string[];
  biodiversity: number; // 0-100
  productivity: number; // 0-100
}
