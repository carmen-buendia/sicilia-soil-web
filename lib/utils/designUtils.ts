// ✅ Importar el tipo desde types
import type { PlacedElement, ElementType } from "@/lib/types/design.types";

// ✅ Definir el tipo CanvasCoordinates localmente o importarlo
export interface CanvasCoordinates {
  x: number;
  y: number;
}

export const getCanvasCoordinates = (
  clientX: number,
  clientY: number,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  canvasWidth: number,
  canvasHeight: number,
  selectedElement: ElementType,
  snapToGrid: boolean,
  pixelsPerMeter: number,
): CanvasCoordinates | null => {
  const canvas = canvasRef.current;
  const rect = canvas?.getBoundingClientRect();
  if (!rect) return null;

  const scaleX = canvasWidth / rect.width;
  const scaleY = canvasHeight / rect.height;
  let x = (clientX - rect.left) * scaleX;
  let y = (clientY - rect.top) * scaleY;

  if (snapToGrid) {
    const gridPx = pixelsPerMeter;
    x = Math.round(x / gridPx) * gridPx;
    y = Math.round(y / gridPx) * gridPx;
  }

  // ✅ Asegurar que selectedElement existe antes de usar size
  const elementSize = selectedElement?.size ?? 32;

  return {
    x: Math.max(0, Math.min(canvasWidth - elementSize, x)),
    y: Math.max(0, Math.min(canvasHeight - elementSize, y)),
  };
};

export const findElementAtPosition = (
  x: number,
  y: number,
  elements: PlacedElement[],
): { index: number; element: PlacedElement } | null => {
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    if (!el || !el.element) continue; // ✅ Guardia de seguridad

    const centerX = el.x + el.element.size / 2;
    const centerY = el.y + el.element.size / 2;
    const radius = el.element.size / 2;
    if (Math.hypot(x - centerX, y - centerY) < radius) {
      return { index: i, element: el };
    }
  }
  return null;
};

export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

export const generateDesignId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`; // ✅ substr está deprecated, usar substring
};

export const calculateTotalArea = (width: number, height: number): number => {
  return width * height;
};

export const isValidDesignName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 50;
};
