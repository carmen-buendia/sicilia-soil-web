"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  ArrowLeft,
  AlertCircle,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { io } from "socket.io-client";

// Inicializar socket
const socket = io("http://localhost:3001");

// Datos de las zonas (igual que en dashboard)
const gardenZones = [
  {
    id: "esparto",
    name: "Zona de Esparto",
    location: "Parcela Norte",
    light: 65,
    optimal: 70,
    uv: 4,
    hours: 8.5,
    trend: "+2%",
    status: "buena",
    icon: "🌾",
  },
  {
    id: "tomates",
    name: "Huerta de Tomates",
    location: "Parcela Sur",
    light: 78,
    optimal: 80,
    uv: 5,
    hours: 9.2,
    trend: "+5%",
    status: "excelente",
    icon: "🍅",
  },
  {
    id: "olivar",
    name: "Olivar",
    location: "Ladera Este",
    light: 45,
    optimal: 60,
    uv: 3,
    hours: 6.0,
    trend: "-8%",
    status: "baja",
    icon: "🫒",
  },
  {
    id: "compost",
    name: "Zona Compost",
    location: "Trasera",
    light: 30,
    optimal: 40,
    uv: 2,
    hours: 4.5,
    trend: "-3%",
    status: "muy baja",
    icon: "♻️",
  },
  {
    id: "hierbas",
    name: "Jardín de Hierbas",
    location: "Parcela Oeste",
    light: 70,
    optimal: 75,
    uv: 4,
    hours: 8.0,
    trend: "+1%",
    status: "buena",
    icon: "🌿",
  },
  {
    id: "agua",
    name: "Depósito de Agua",
    location: "Noreste",
    light: 40,
    optimal: 50,
    uv: 3,
    hours: 5.5,
    trend: "-2%",
    status: "baja",
    icon: "💧",
  },
];

// Datos históricos simulados (últimos 7 días)
const historicalData = [
  { day: "Lun", value: 65, optimal: 70 },
  { day: "Mar", value: 68, optimal: 70 },
  { day: "Mié", value: 72, optimal: 70 },
  { day: "Jue", value: 70, optimal: 70 },
  { day: "Vie", value: 75, optimal: 70 },
  { day: "Sáb", value: 78, optimal: 70 },
  { day: "Dom", value: 73, optimal: 70 },
];

// Recomendaciones según nivel de luz
const getRecommendations = (light: number) => {
  if (light < 30) {
    return {
      text: "Muy poca luz. Considera trasladar plantas o usar luces de cultivo.",
      action: "🌱 Necesita luz urgente",
      color: "text-red-600",
    };
  } else if (light < 50) {
    return {
      text: "Luz insuficiente para plantas que requieren sol directo.",
      action: "🌿 Bueno para plantas de sombra",
      color: "text-orange-600",
    };
  } else if (light < 70) {
    return {
      text: "Luz adecuada para la mayoría de hortalizas.",
      action: "✅ Bueno para tomates, hierbas",
      color: "text-green-600",
    };
  } else {
    return {
      text: "Excelente luz. Ideal para plantas mediterráneas.",
      action: "☀️ Perfecto para olivos, esparto",
      color: "text-yellow-600",
    };
  }
};

export default function Light() {
  const [selectedZone, setSelectedZone] = useState(gardenZones[0]);
  const [isLive, setIsLive] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    // Conectar al servidor WebSocket
    socket.on("connect", () => {
      console.log("Conectado al servidor de luz");
    });

    // Escuchar actualizaciones de luz
    socket.on("light-update", (data) => {
      if (isLive) {
        // Actualizar datos de luz
        console.log("Luz actualizada:", data);
      }
    });

    return () => {
      socket.off("light-update");
    };
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excelente":
        return "bg-green-100 text-green-800 border-green-200";
      case "buena":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "baja":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "muy baja":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-yellow-50/30 to-orange-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header con navegación */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-500" />
                Luz Solar
              </h1>
              <p className="text-gray-600">
                Monitoreo de radiación solar por zona de cultivo
              </p>
            </div>
          </div>

          {/* Controles en tiempo real */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isLive
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
              />
              {isLive ? "Tiempo real" : "Pausado"}
            </button>

            <button className="p-2 hover:bg-yellow-100 rounded-lg relative">
              <Calendar className="w-5 h-5 text-gray-600" />
            </button>

            <button className="p-2 hover:bg-yellow-100 rounded-lg">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Selector de zonas (tabs) */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {gardenZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedZone.id === zone.id
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200"
              }`}
            >
              <span>{zone.icon}</span>
              <span className="font-medium">{zone.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedZone.id === zone.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {zone.light}%
              </span>
            </button>
          ))}
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Medidor principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de luz actual */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedZone.icon} {selectedZone.name}
                  </h2>
                  <p className="text-gray-600">{selectedZone.location}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedZone.status)}`}
                >
                  {selectedZone.status === "excelente"
                    ? "Óptimo"
                    : selectedZone.status === "buena"
                      ? "Bueno"
                      : selectedZone.status === "baja"
                        ? "Bajo"
                        : "Crítico"}
                </span>
              </div>

              {/* Medidor circular grande */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Círculo de fondo */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* Círculo de progreso */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - selectedZone.light / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Texto central */}
                    <text
                      x="50"
                      y="45"
                      textAnchor="middle"
                      className="text-3xl font-bold"
                      fill="#1f2937"
                    >
                      {selectedZone.light}%
                    </text>
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      className="text-xs"
                      fill="#6b7280"
                    >
                      radiación
                    </text>
                  </svg>
                </div>

                <div className="flex gap-8 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">UV</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedZone.uv}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Horas sol</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedZone.hours}h
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Óptimo</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedZone.optimal}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de rango óptimo */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rango óptimo</span>
                  <span className="font-medium">
                    {selectedZone.optimal - 10}% - {selectedZone.optimal + 10}%
                  </span>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-yellow-400"
                    style={{ width: `${selectedZone.optimal}%` }}
                  />
                  <div
                    className="absolute w-4 h-4 bg-yellow-600 rounded-full -top-0.5 border-2 border-white"
                    style={{
                      left: `${selectedZone.light}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              </div>

              {/* Tendencia */}
              <div className="mt-6 flex items-center gap-2 text-sm">
                {selectedZone.trend.startsWith("+") ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={
                    selectedZone.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedZone.trend} vs ayer
                </span>
              </div>
            </div>

            {/* Gráfico histórico semanal */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Últimos 7 días
              </h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {historicalData.map((day, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="relative w-full flex justify-center gap-1">
                      {/* Barra actual */}
                      <div
                        className="w-4 bg-yellow-400 rounded-t"
                        style={{ height: `${day.value * 1.5}px` }}
                      />
                      {/* Barra óptimo */}
                      <div
                        className="w-4 bg-gray-300 rounded-t opacity-50"
                        style={{ height: `${day.optimal * 1.5}px` }}
                      />
                    </div>
                    <span className="text-xs mt-2 text-gray-600">
                      {day.day}
                    </span>
                    <span className="text-xs font-bold">{day.value}%</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-400 rounded"></span> Actual
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-gray-300 rounded"></span> Óptimo
                </span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información y recomendaciones */}
          <div className="space-y-6">
            {/* Recomendaciones */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Recomendaciones
              </h3>

              {(() => {
                const rec = getRecommendations(selectedZone.light);
                return (
                  <div
                    className={`p-4 rounded-xl ${rec.color.replace("text", "bg").replace("600", "50")} border ${rec.color.replace("text", "border")}`}
                  >
                    <p className="text-gray-800 mb-2">{rec.text}</p>
                    <p className={`font-medium ${rec.color}`}>{rec.action}</p>
                  </div>
                );
              })()}

              {/* Consejos por planta */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-gray-700">
                  Plantas recomendadas para este nivel:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedZone.light > 70 ? (
                    <>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌿 Romero
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌱 Tomillo
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🫒 Olivo
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌾 Esparto
                      </span>
                    </>
                  ) : selectedZone.light > 50 ? (
                    <>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🍅 Tomates
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌶️ Pimientos
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🍆 Berenjenas
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌿 Albahaca
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🍃 Lechugas
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🥬 Espinacas
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🌱 Perejil
                      </span>
                      <span className="px-3 py-2 bg-yellow-50 rounded-lg text-sm">
                        🍄 Setas
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Control de iluminación */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Control de iluminación
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Notificaciones</span>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </label>
                  <p className="text-xs text-gray-500">
                    Alertas cuando la luz sea baja
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-medium text-gray-700 mb-2">
                    Programar alertas:
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                        defaultChecked
                      />
                      <span>Luz por debajo del 40%</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                        defaultChecked
                      />
                      <span>Exceso de UV (índice &gt; 6)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded text-yellow-500"
                      />
                      <span>Horas de sol insuficientes</span>
                    </label>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  Guardar configuración
                </button>
              </div>
            </div>

            {/* Datos adicionales */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Datos adicionales
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amanecer</span>
                  <span className="font-medium">06:47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Atardecer</span>
                  <span className="font-medium">19:32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horas de luz</span>
                  <span className="font-medium">12h 45m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Índice UV máximo</span>
                  <span className="font-medium text-yellow-600">7 (Alto)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Próxima alarma</span>
                  <span className="font-medium">En 2h (UV alto)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con información adicional */}
        <footer className="mt-12 pt-8 border-t border-yellow-200">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                Sobre la luz solar
              </h4>
              <p>
                Los niveles óptimos varían según el tipo de planta. Consulta las
                recomendaciones para cada zona.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                Próximas acciones
              </h4>
              <ul className="space-y-1">
                <li>• Riego automático en zonas con poca luz</li>
                <li>• Revisar plantas en zona de olivar</li>
                <li>• Programar malla de sombreo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Estadísticas</h4>
              <p>Promedio general: 56%</p>
              <p>Mejor zona: Huerta de Tomates (78%)</p>
              <p>Zona crítica: Compost (30%)</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
