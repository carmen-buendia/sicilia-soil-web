"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sprout,
  Eye,
  Trash2,
  Download,
  Calendar,
  Map,
  Layers,
} from "lucide-react";

interface SavedDesign {
  name: string;
  elements: any[];
  date: string;
  canvasSize: { width: number; height: number };
  preview?: string;
}

export function SavedDesigns() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<SavedDesign | null>(
    null,
  );

  useEffect(() => {
    const saved = localStorage.getItem("sintropico-designs-v3");
    if (saved) {
      setDesigns(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (index: number) => {
    if (confirm("¿Eliminar este diseño?")) {
      const newDesigns = designs.filter((_, i) => i !== index);
      setDesigns(newDesigns);
      localStorage.setItem("sintropico-designs-v3", JSON.stringify(newDesigns));
    }
  };

  if (designs.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {designs
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
                  <h3 className="font-bold text-charcoalGray">{design.name}</h3>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-oliveGreen/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {design.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Map className="w-3 h-3" />
                    {design.canvasSize.width} × {design.canvasSize.height} m
                  </span>
                  <span className="flex items-center gap-1">
                    <Sprout className="w-3 h-3" />
                    {design.elements.length} elementos
                  </span>
                </div>

                {/* Mini preview de elementos */}
                <div className="flex gap-1 flex-wrap">
                  {design.elements.slice(0, 8).map((el, i) => (
                    <span key={i} className="text-lg" title={el.species.name}>
                      {el.species.icon}
                    </span>
                  ))}
                  {design.elements.length > 8 && (
                    <span className="text-xs text-oliveGreen/50 self-center">
                      +{design.elements.length - 8}
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
                  onClick={() => handleDelete(designs.length - 1 - idx)}
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
  );
}
