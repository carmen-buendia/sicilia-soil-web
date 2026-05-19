"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Calendar,
  Map,
  Layers,
  Link2,
  Info,
  Paintbrush,
  Download,
  Trash2,
  Undo2,
  Redo2,
  Save,
  Ruler,
  Grid3x3,
  Plus,
  Minus,
  Search,
  Sprout,
  Flower2,
} from "lucide-react";

// Importar datos desde lib
import {
  layers,
  symbiosis,
  succession,
  drawingElements,
  categories,
} from "../../lib/data/designData";
import type {
  PlacedElement,
  SavedDesign,
  ElementType,
} from "../../lib/types/design.types";

// Importar el mapa 3D
import { FarmScene, useFarmData } from "../../components/farm3D";
import { SicilianFlag } from "../../components/layout/SicilianFlag";

export default function DesignPage() {
  // ============================================
  // ESTADOS PARA VISTAS (2D / 3D)
  // ============================================
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const { data, isLoading } = useFarmData();

  // ============================================
  // ESTADOS PARA CANVAS 2D (diseño sintrópico)
  // ============================================
  const [activeLayer, setActiveLayer] = useState("canopy");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedElement, setSelectedElement] = useState<ElementType>(
    drawingElements[0],
  );
  const [elements, setElements] = useState<PlacedElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const [history, setHistory] = useState<PlacedElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGrid, setShowGrid] = useState(true);
  const [designName, setDesignName] = useState("Mi diseño sintrópico");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [terrainWidth, setTerrainWidth] = useState(50);
  const [terrainHeight, setTerrainHeight] = useState(40);
  const [pixelsPerMeter, setPixelsPerMeter] = useState(12);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isNightMode, setIsNightMode] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasWidth = terrainWidth * pixelsPerMeter;
  const canvasHeight = terrainHeight * pixelsPerMeter;

  // Cargar diseños guardados
  useEffect(() => {
    const saved = localStorage.getItem("sintropico-designs-v2");
    if (saved) {
      setSavedDesigns(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (newElements: PlacedElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const handleClear = () => {
    if (confirm("¿Borrar todo el diseño?")) {
      setElements([]);
      saveToHistory([]);
      setSelectedElementId(null);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `sintropico-${designName.replace(/\s/g, "-")}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleSaveDesign = () => {
    const newDesign: SavedDesign = {
      name: designName,
      elements: [...elements],
      date: new Date().toLocaleString(),
      terrainWidth,
      terrainHeight,
      pixelsPerMeter,
    };
    const updated = [...savedDesigns, newDesign];
    setSavedDesigns(updated);
    localStorage.setItem("sintropico-designs-v2", JSON.stringify(updated));
    alert(`Diseño "${designName}" guardado correctamente`);
  };

  const handleLoadDesign = (design: SavedDesign) => {
    setElements(design.elements);
    setDesignName(design.name);
    setTerrainWidth(design.terrainWidth);
    setTerrainHeight(design.terrainHeight);
    setPixelsPerMeter(design.pixelsPerMeter);
    saveToHistory(design.elements);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;

    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    if (snapToGrid) {
      const gridPx = pixelsPerMeter;
      x = Math.round(x / gridPx) * gridPx;
      y = Math.round(y / gridPx) * gridPx;
    }

    x = Math.max(0, Math.min(canvasWidth - selectedElement.size, x));
    y = Math.max(0, Math.min(canvasHeight - selectedElement.size, y));

    const newElement: PlacedElement = { x, y, element: selectedElement };
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElementId((newElements.length - 1).toString());
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;

    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      const centerX = el.x + el.element.size / 2;
      const centerY = el.y + el.element.size / 2;
      const radius = el.element.size / 2;
      if (Math.hypot(mouseX - centerX, mouseY - centerY) < radius) {
        setSelectedElementId(i.toString());
        setDragOffset({ x: el.x - mouseX, y: el.y - mouseY });
        setIsDragging(true);
        return;
      }
    }
    setSelectedElementId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElementId) return;

    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;

    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    let newX = (e.clientX - rect.left) * scaleX + dragOffset.x;
    let newY = (e.clientY - rect.top) * scaleY + dragOffset.y;

    if (snapToGrid) {
      const gridPx = pixelsPerMeter;
      newX = Math.round(newX / gridPx) * gridPx;
      newY = Math.round(newY / gridPx) * gridPx;
    }

    const element = elements[parseInt(selectedElementId)];
    if (element) {
      newX = Math.max(0, Math.min(canvasWidth - element.element.size, newX));
      newY = Math.max(0, Math.min(canvasHeight - element.element.size, newY));
    }

    const updatedElements = [...elements];
    updatedElements[parseInt(selectedElementId)] = {
      ...updatedElements[parseInt(selectedElementId)],
      x: newX,
      y: newY,
    };
    setElements(updatedElements);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      saveToHistory(elements);
      setIsDragging(false);
    }
  };

  const handleDeleteElement = () => {
    if (selectedElementId) {
      const index = parseInt(selectedElementId);
      const updatedElements = elements.filter((_, i) => i !== index);
      setElements(updatedElements);
      saveToHistory(updatedElements);
      setSelectedElementId(null);
    }
  };

  // Dibujar canvas 2D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, "#F5E6C8");
    gradient.addColorStop(1, "#E8D5B0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (showGrid) {
      const gridPx = pixelsPerMeter;
      ctx.beginPath();
      ctx.strokeStyle = "#5A6B47";
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.3;
      for (let x = 0; x <= canvasWidth; x += gridPx) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y <= canvasHeight; y += gridPx) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    elements.forEach((item, idx) => {
      const centerX = item.x + item.element.size / 2;
      const centerY = item.y + item.element.size / 2;
      const radiusPx = (item.element.realSize / 2) * pixelsPerMeter;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radiusPx, 0, 2 * Math.PI);
      ctx.fillStyle = `${item.element.color}20`;
      ctx.fill();
      ctx.strokeStyle = `${item.element.color}40`;
      ctx.stroke();

      ctx.font = `${Math.min(item.element.size, 32)}px "Segoe UI Emoji", "Apple Color Emoji"`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.element.icon, centerX, centerY);

      if (selectedElementId === idx.toString()) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, item.element.size / 1.5 + 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#E6B422";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    ctx.strokeStyle = "#5A6B47";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
  }, [
    elements,
    showGrid,
    canvasWidth,
    canvasHeight,
    pixelsPerMeter,
    selectedElementId,
  ]);

  const filteredElements = drawingElements.filter(
    (el) =>
      (selectedCategory === "todos" || el.category === selectedCategory) &&
      el.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-offWhite">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pt-24">
        {/* Header con botones de cambio de vista */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-charcoalGray flex items-center gap-2 flex-wrap">
                <Layers className="w-7 h-7 text-oliveGreen" />
                Diseño Sintrópico · Sicilia‑soil
              </h1>
              <div className="flex items-center gap-2 text-sm text-oliveGreen/70 mt-1">
                <SicilianFlag size="small" />
                <span>Geoparque Rocca di Cerere</span>
                <Flower2 className="w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Botón modo noche (solo para vista 3D) */}
            {viewMode === "3d" && (
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className="px-4 py-2 rounded-lg bg-oliveGreen/10 hover:bg-oliveGreen/20 transition-colors text-oliveGreen text-sm"
              >
                {isNightMode ? "☀️ Modo día" : "🌙 Modo noche"}
              </button>
            )}

            {/* Botones de cambio de vista */}
            <div className="flex gap-2 bg-white rounded-xl border border-oliveGreen/20 p-1 shadow-sm">
              <button
                onClick={() => setViewMode("2d")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${
                  viewMode === "2d"
                    ? "bg-oliveGreen text-white shadow-md"
                    : "text-oliveGreen/70 hover:bg-oliveGreen/10"
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                Diseño 2D
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${
                  viewMode === "3d"
                    ? "bg-oliveGreen text-white shadow-md"
                    : "text-oliveGreen/70 hover:bg-oliveGreen/10"
                }`}
              >
                <div className="w-4 h-4" />
                Visualización 3D
              </button>
            </div>
          </div>
        </div>

        {/* Hero concepto (siempre visible) */}
        <div className="bg-gradient-to-r from-oliveGreen/10 via-wheatGold/5 to-oliveGreen/10 rounded-2xl p-6 md:p-8 mb-10 border border-oliveGreen/20">
          <h2 className="text-2xl font-bold text-charcoalGray mb-3">
            🌱 Diseño Sintrópico + Agricultura 4.0
          </h2>
          <p className="text-charcoalGray/80 mb-3">
            <strong>La Isola Latente</strong> combina el diseño de ecosistemas
            sintrópicos con monitorización IoT en tiempo real. Diseña tu espacio
            con elementos naturales, y visualiza los datos de sensores en un
            mapa 3D interactivo. Nuestro enfoque se inspira en los principios de
            la <strong>agricultura sintrópica</strong> desarrollados por el
            ingeniero agrónomo suizo-brasileño <strong>Ernst Götsch</strong>.
          </p>
          <p className="text-oliveGreen/80 text-sm">
            🎨 <strong>Vista 2D</strong>: Coloca árboles, setas, plantas y
            elementos del sistema sintrópico.
            <br />
            📡 <strong>Vista 3D</strong>: Explora tu finca con sensores de
            humedad, pH y temperatura en tiempo real.
          </p>
        </div>

        {/* ============================================ */}
        {/* VISTA 2D: DISEÑO SINTRÓPICO COMPLETO */}
        {/* ============================================ */}
        {viewMode === "2d" && (
          <>
            {/* Controles del terreno */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-oliveGreen/15 shadow-sm overflow-x-auto">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-oliveGreen" />
                  <span className="text-sm font-medium">Terreno real:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={terrainWidth}
                    onChange={(e) => setTerrainWidth(parseInt(e.target.value))}
                    className="w-28"
                  />
                  <span className="text-sm">{terrainWidth} m</span>
                  <span>×</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={terrainHeight}
                    onChange={(e) => setTerrainHeight(parseInt(e.target.value))}
                    className="w-28"
                  />
                  <span className="text-sm">{terrainHeight} m</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Escala:</span>
                  <button
                    onClick={() =>
                      setPixelsPerMeter(Math.max(8, pixelsPerMeter - 2))
                    }
                    className="p-1 rounded bg-offWhite border"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm w-12 text-center">
                    {pixelsPerMeter} px/m
                  </span>
                  <button
                    onClick={() =>
                      setPixelsPerMeter(Math.min(20, pixelsPerMeter + 2))
                    }
                    className="p-1 rounded bg-offWhite border"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`px-2 py-1 rounded text-xs ${
                      showGrid ? "bg-oliveGreen text-white" : "bg-white border"
                    }`}
                  >
                    <Grid3x3 className="w-3 h-3 inline mr-1" /> Cuadrícula 1m
                  </button>
                  <button
                    onClick={() => setSnapToGrid(!snapToGrid)}
                    className={`px-2 py-1 rounded text-xs ${
                      snapToGrid
                        ? "bg-oliveGreen text-white"
                        : "bg-white border"
                    }`}
                  >
                    Snap a cuadrícula
                  </button>
                </div>
              </div>
            </div>

            {/* Diseñador interactivo */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
                  <Map className="w-5 h-5 text-oliveGreen" />
                  Diseña tu espacio sintrópico
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-oliveGreen/20 rounded-lg bg-white text-charcoalGray w-40"
                    placeholder="Nombre del diseño"
                  />
                  <button
                    onClick={handleSaveDesign}
                    className="p-2 rounded-lg hover:bg-oliveGreen/10"
                    title="Guardar diseño"
                  >
                    <Save className="w-4 h-4 text-oliveGreen" />
                  </button>
                  <button
                    onClick={handleUndo}
                    className="p-2 rounded-lg hover:bg-oliveGreen/10"
                    title="Deshacer"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRedo}
                    className="p-2 rounded-lg hover:bg-oliveGreen/10"
                    title="Rehacer"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-2 rounded-lg hover:bg-red-100"
                    title="Borrar todo"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg hover:bg-oliveGreen/10"
                    title="Descargar imagen"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Panel de herramientas */}
                <div className="lg:col-span-1">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-oliveGreen/15 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-charcoalGray flex items-center gap-2">
                        <Paintbrush className="w-4 h-4 text-oliveGreen" />
                        Elementos ({drawingElements.length})
                      </h3>
                    </div>

                    {/* Buscador */}
                    <div className="relative mb-3">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-oliveGreen/50" />
                      <input
                        type="text"
                        placeholder="Buscar elemento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 text-xs border border-oliveGreen/20 rounded-lg bg-offWhite"
                      />
                    </div>

                    {/* Categorías */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-2 py-1 rounded text-xs transition-all ${
                            selectedCategory === cat.id
                              ? "bg-oliveGreen text-white"
                              : "bg-white border border-oliveGreen/15 hover:bg-oliveGreen/5"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Grid de elementos */}
                    <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-1">
                      {filteredElements.map((element) => (
                        <button
                          key={element.id}
                          onClick={() => setSelectedElement(element)}
                          className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                            selectedElement.id === element.id
                              ? "bg-oliveGreen text-white shadow-md scale-105"
                              : "bg-white border border-oliveGreen/15 hover:bg-oliveGreen/5"
                          }`}
                        >
                          <span className="text-2xl">{element.icon}</span>
                          <span className="text-[10px] text-center">
                            {element.name}
                          </span>
                          <span className="text-[8px] opacity-60">
                            {element.realSize}m
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="text-xs text-oliveGreen/60 text-center mt-3">
                      🖱️ Click: Colocar | Arrastrar: Mover
                    </p>
                  </div>

                  {/* Diseños guardados */}
                  {savedDesigns.length > 0 && (
                    <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-oliveGreen/15 shadow-sm">
                      <h4 className="text-xs font-bold text-oliveGreen/70 mb-2">
                        📁 Diseños guardados
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {savedDesigns
                          .slice(-5)
                          .reverse()
                          .map((design, i) => (
                            <button
                              key={i}
                              onClick={() => handleLoadDesign(design)}
                              className="w-full text-left text-xs p-1.5 rounded hover:bg-oliveGreen/10 flex justify-between"
                            >
                              <span>{design.name}</span>
                              <span className="text-oliveGreen/40 text-[10px]">
                                {design.date.split(",")[0]}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas de dibujo */}
                <div className="lg:col-span-3">
                  <div
                    ref={containerRef}
                    className="bg-white rounded-xl shadow-lg border border-oliveGreen/15 overflow-auto"
                    style={{ maxHeight: "65vh" }}
                  >
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      className="cursor-crosshair w-full h-auto"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap justify-between text-xs text-oliveGreen/60 gap-2">
                    <div className="flex gap-4">
                      <span>
                        📐 {terrainWidth} × {terrainHeight} m (
                        {terrainWidth * terrainHeight} m²)
                      </span>
                      <span>🌱 {elements.length} elementos colocados</span>
                    </div>
                    {selectedElementId && (
                      <button
                        onClick={handleDeleteElement}
                        className="text-red-500 hover:underline"
                      >
                        🗑 Eliminar seleccionado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* VISTA 3D: MAPA DE SENSORES EN TIEMPO REAL + DISEÑO */}
        {/* ============================================ */}
        {viewMode === "3d" && (
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 mb-6 border border-oliveGreen/15 shadow-sm">
              <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2 mb-2">
                <Map className="w-5 h-5 text-oliveGreen" />
                Tu finca en 3D - Datos en tiempo real + Diseño
              </h2>
              <p className="text-oliveGreen/70 text-sm">
                Todos los elementos que colocaste en el diseño 2D aparecen aquí
                en 3D. Arrastra para rotar, haz zoom, y pasa el ratón sobre los
                sensores para ver los datos de humedad y pH.
              </p>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-xl p-20 text-center border border-oliveGreen/15">
                <div className="animate-pulse text-oliveGreen">
                  Cargando datos 3D...
                </div>
              </div>
            ) : (
              <FarmScene
                data={data}
                designElements={elements}
                pixelsPerMeter={pixelsPerMeter}
                terrainWidth={terrainWidth}
                terrainHeight={terrainHeight}
                isNight={isNightMode}
              />
            )}

            <div className="mt-4 flex flex-wrap justify-between text-xs text-oliveGreen/60 gap-2">
              <div className="flex gap-4">
                <span>📍 {data.parcels.length} parcelas</span>
                <span>📡 {data.sensors.length} sensores activos</span>
                <span>
                  🏠{" "}
                  {
                    elements.filter((e) => e.element.category === "structures")
                      .length
                  }{" "}
                  estructuras
                </span>
                <span>
                  🌳{" "}
                  {
                    elements.filter((e) => e.element.category === "trees")
                      .length
                  }{" "}
                  árboles
                </span>
                <span>🏔️ Geoparque Rocca di Cerere</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* CONTENIDO EDUCATIVO (común a ambas vistas) */}
        {/* ============================================ */}

        {/* Estratos del Sistema Sintrópico */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-oliveGreen" />
            Estratos del Sistema Sintrópico
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`p-4 rounded-xl transition-all text-left ${
                  activeLayer === layer.id
                    ? `bg-gradient-to-r ${layer.color} text-white shadow-lg`
                    : `bg-white ${layer.bg} text-charcoalGray hover:shadow-md border border-oliveGreen/10`
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

          {layers.map(
            (layer) =>
              activeLayer === layer.id && (
                <div
                  key={layer.id}
                  className={`bg-white rounded-2xl p-6 border border-oliveGreen/15 shadow-sm`}
                >
                  <h3 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
                    {layer.icon} {layer.name}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {layer.species.map((species, i) => (
                      <div
                        key={i}
                        className="bg-offWhite rounded-xl p-4 shadow-sm border border-oliveGreen/10"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{species.icon}</span>
                          <span className="font-bold text-charcoalGray">
                            {species.name}
                          </span>
                        </div>
                        <p className="text-sm text-oliveGreen/70">
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
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <Link2 className="w-6 h-6 text-oliveGreen" />
            Relaciones Simbióticas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {symbiosis.map((rel, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-oliveGreen/15 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
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
                    <span className="font-bold text-charcoalGray">
                      {rel.from}
                    </span>
                  </div>
                  <span className="text-oliveGreen">→</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoalGray">
                      {rel.to}
                    </span>
                    <span className="text-xl">
                      {rel.to.includes("Cardonchello")
                        ? "🍄"
                        : rel.to === "Trébol"
                          ? "🍀"
                          : "🌱"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-oliveGreen/70 mb-2">
                  {rel.description}
                </p>
                <span className="inline-block px-2 py-1 bg-oliveGreen/10 text-oliveGreen rounded-full text-xs">
                  {rel.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sucesión temporal */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-charcoalGray mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-wheatGold" />
            Sucesión Temporal
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {succession.map((phase, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-oliveGreen/15 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-oliveGreen mb-1">
                  {phase.year}
                </h3>
                <p className="font-medium text-charcoalGray mb-3">
                  {phase.phase}
                </p>
                <ul className="space-y-1">
                  {phase.tasks.map((task, j) => (
                    <li
                      key={j}
                      className="text-sm text-oliveGreen/70 flex items-start gap-1"
                    >
                      <span className="text-wheatGold">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del suelo con datos reales (solo en vista 3D) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-oliveGreen/15 mb-12">
          <h2 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-oliveGreen" />
            Estado del Suelo{" "}
            {viewMode === "3d" && (
              <span className="text-sm font-normal text-oliveGreen/60">
                (datos en tiempo real)
              </span>
            )}
          </h2>

          {viewMode === "3d" && isLoading ? (
            <p className="text-oliveGreen/70">Cargando datos del backend...</p>
          ) : viewMode === "3d" && !isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-oliveGreen/70">
                    Humedad media
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      data.sensors.reduce(
                        (acc: any, s: any) => acc + s.humidity,
                        0,
                      ) / data.sensors.length,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full h-2 bg-oliveGreen/10 rounded-full mb-4">
                  <div
                    className="h-full bg-oliveGreen rounded-full"
                    style={{
                      width: `${Math.round(
                        data.sensors.reduce(
                          (acc: any, s: any) => acc + s.humidity,
                          0,
                        ) / data.sensors.length,
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-oliveGreen/70">pH medio</span>
                  <span className="text-sm font-medium">
                    {(
                      data.sensors.reduce((acc: any, s: any) => acc + s.ph, 0) /
                      data.sensors.length
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-oliveGreen/10 rounded-full">
                  <div
                    className="h-full bg-wheatGold rounded-full"
                    style={{
                      width: `${
                        (data.sensors.reduce(
                          (acc: any, s: any) => acc + s.ph,
                          0,
                        ) /
                          data.sensors.length /
                          14) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="bg-oliveGreen/5 rounded-xl p-4 border border-oliveGreen/10">
                <h3 className="font-bold text-charcoalGray mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-oliveGreen" /> Recomendaciones
                </h3>
                <ul className="space-y-2 text-sm text-oliveGreen/70">
                  <li>
                    ✓{" "}
                    {Math.round(
                      data.sensors.reduce(
                        (acc: any, s: any) => acc + s.humidity,
                        0,
                      ) / data.sensors.length,
                    ) < 60
                      ? "Programar riego en parcela norte"
                      : "Humedad dentro del rango óptimo"}
                  </li>
                  <li>
                    ✓ Monitorear sensor{" "}
                    {data.sensors.find((s: any) => s.ph > 7.5)?.id || "S2"} (pH
                    elevado)
                  </li>
                  <li>✓ Mantener acolchado para retener humedad en verano</li>
                  <li>✓ Inocular micorrizas en zonas más secas</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-oliveGreen/70">
                    Humedad (ejemplo)
                  </span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full h-2 bg-oliveGreen/10 rounded-full mb-4">
                  <div className="h-full bg-oliveGreen rounded-full w-[65%]" />
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-oliveGreen/70">
                    pH (ejemplo)
                  </span>
                  <span className="text-sm font-medium">7.0</span>
                </div>
                <div className="w-full h-2 bg-oliveGreen/10 rounded-full">
                  <div className="h-full bg-wheatGold rounded-full w-[50%]" />
                </div>
              </div>
              <div className="bg-oliveGreen/5 rounded-xl p-4 border border-oliveGreen/10">
                <h3 className="font-bold text-charcoalGray mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-oliveGreen" /> Recomendaciones
                  generales
                </h3>
                <ul className="space-y-2 text-sm text-oliveGreen/70">
                  <li>✓ Cambia a la vista 3D para ver datos en tiempo real</li>
                  <li>✓ Conecta sensores IoT para monitorización automática</li>
                  <li>✓ Mantén el suelo cubierto con acolchado orgánico</li>
                  <li>✓ Fomenta la micorrización para mejorar nutrientes</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* SECCIÓN: ERNST GÖTSCH - El padre de la sintropía */}
        {/* ============================================ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-oliveGreen/15 mb-12">
          <h2 className="text-xl font-bold text-charcoalGray mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-oliveGreen" />
            Ernst Götsch · El padre de la agricultura sintrópica
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-charcoalGray/80 mb-3">
                El ingeniero agrónomo <strong>Ernst Götsch</strong> (nacido en
                Suiza en 1948) desarrolló el concepto de{" "}
                <strong>Agricultura Sintrópica</strong> tras décadas de trabajo
                en Brasil. Su enfoque revolucionario se basa en imitar los
                procesos de sucesión natural de los ecosistemas, acelerando la
                regeneración del suelo y la biodiversidad.
              </p>
              <p className="text-charcoalGray/80 mb-3">
                Frente a la agricultura convencional que lucha contra la
                naturaleza, Götsch propone{" "}
                <strong>trabajar a favor de ella</strong>, plantando cultivos
                que se ayudan mutuamente y regeneran el territorio. Su método ha
                recuperado miles de hectáreas degradadas en Brasil, Suiza y
                otros países.
              </p>
              <p className="text-oliveGreen/80 text-sm italic">
                "El secreto está en la gestión de la biomasa y la creación de
                sistemas cada vez más complejos y productivos."
              </p>
            </div>
            <div className="bg-oliveGreen/5 rounded-xl p-4 border border-oliveGreen/10">
              <h3 className="font-bold text-charcoalGray mb-2">
                📖 Principios clave
              </h3>
              <ul className="space-y-2 text-sm text-oliveGreen/70">
                <li>
                  ✓ <strong>Sucesión natural acelerada</strong>
                </li>
                <li>
                  ✓ <strong>Manejo de biomasa</strong> (podas, cobertura del
                  suelo)
                </li>
                <li>
                  ✓ <strong>Diversidad funcional</strong> (especies que se
                  complementan)
                </li>
                <li>
                  ✓ <strong>Mínimo disturbio del suelo</strong>
                </li>
                <li>
                  ✓ <strong>Integración de árboles, cultivos y animales</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
