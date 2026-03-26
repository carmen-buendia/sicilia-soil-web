"use client";

import { useState } from "react";
import { Droplets, ArrowLeft, Calendar, Download } from "lucide-react";
import Link from "next/link";

// Datos simulados de humedad
const humidityData = [
  {
    zone: "Zona de Esparto",
    current: 78,
    optimal: 70,
    history: [75, 77, 78, 76, 79, 78, 77],
    unit: "%",
  },
  {
    zone: "Huerta de Tomates",
    current: 82,
    optimal: 75,
    history: [80, 81, 82, 81, 83, 82, 81],
    unit: "%",
  },
  {
    zone: "Olivar",
    current: 45,
    optimal: 60,
    history: [48, 46, 45, 44, 46, 45, 43],
    unit: "%",
  },
  {
    zone: "Zona Compost",
    current: 55,
    optimal: 50,
    history: [53, 54, 55, 56, 55, 54, 55],
    unit: "%",
  },
  {
    zone: "Jardín de Hierbas",
    current: 68,
    optimal: 65,
    history: [66, 67, 68, 69, 68, 67, 68],
    unit: "%",
  },
  {
    zone: "Depósito de Agua",
    current: 90,
    optimal: 85,
    history: [88, 89, 90, 91, 90, 89, 90],
    unit: "%",
  },
];

export default function Humedity() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-500" />
              Humedad del Suelo
            </h1>
            <p className="text-gray-600">
              Monitoreo detallado de humedad por zona de cultivo
            </p>
          </div>
        </div>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <p className="text-sm text-gray-500">Promedio general</p>
            <p className="text-2xl font-bold text-blue-600">69%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <p className="text-sm text-gray-500">Zona más húmeda</p>
            <p className="text-2xl font-bold text-green-600">Depósito</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100">
            <p className="text-sm text-gray-500">Necesita riego</p>
            <p className="text-2xl font-bold text-red-600">Olivar</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <p className="text-sm text-gray-500">Última lectura</p>
            <p className="text-2xl font-bold text-purple-600">hace 2 min</p>
          </div>
        </div>

        {/* Grid de Zonas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {humidityData.map((zone, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedZone(zone.zone)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{zone.zone}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    zone.current >= zone.optimal
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {zone.current >= zone.optimal ? "Óptimo" : "Necesita riego"}
                </span>
              </div>

              {/* Medidor circular simple */}
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        zone.current >= zone.optimal ? "#22c55e" : "#ef4444"
                      }
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - zone.current / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dy="0.3em"
                      className="text-2xl font-bold"
                      fill={
                        zone.current >= zone.optimal ? "#22c55e" : "#ef4444"
                      }
                    >
                      {zone.current}%
                    </text>
                  </svg>
                </div>
              </div>

              {/* Mini histórico */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Últimas 24h</p>
                <div className="flex items-end justify-between h-12 gap-1">
                  {zone.history.map((value, i) => (
                    <div
                      key={i}
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-500">Óptimo: {zone.optimal}%</span>
                <span className="text-gray-500">Actual: {zone.current}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Control de Riego */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-600" />
            Control de Riego
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Riego automático</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estado</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Activado
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Próximo riego</p>
                <p className="text-xl font-bold">en 2 horas</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Consumo de agua</h3>
              <p className="text-3xl font-bold text-blue-600">124L</p>
              <p className="text-sm text-gray-500">en las últimas 24h</p>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Acciones rápidas</h3>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2">
                Riego manual ahora
              </button>
              <button className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                Programar riego
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
