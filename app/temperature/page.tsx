"use client";

import { Thermometer, ArrowLeft } from "lucide-react";
import Link from "next/link";

const temperatureData = [
  {
    zone: "Zona de Esparto",
    current: 22,
    min: 18,
    max: 25,
    feels: 21,
    history: [20, 21, 22, 23, 22, 21, 22],
  },
  {
    zone: "Huerta de Tomates",
    current: 24,
    min: 20,
    max: 28,
    feels: 25,
    history: [22, 23, 24, 25, 24, 23, 24],
  },
  {
    zone: "Olivar",
    current: 21,
    min: 16,
    max: 24,
    feels: 20,
    history: [19, 20, 21, 22, 21, 20, 21],
  },
  {
    zone: "Zona Compost",
    current: 28,
    min: 22,
    max: 32,
    feels: 30,
    history: [26, 27, 28, 29, 28, 27, 28],
  },
  {
    zone: "Jardín de Hierbas",
    current: 23,
    min: 19,
    max: 26,
    feels: 23,
    history: [21, 22, 23, 24, 23, 22, 23],
  },
  {
    zone: "Depósito de Agua",
    current: 18,
    min: 15,
    max: 22,
    feels: 17,
    history: [17, 18, 18, 19, 18, 17, 18],
  },
];

export default function Temperature() {
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
              <Thermometer className="w-8 h-8 text-orange-500" />
              Temperatura
            </h1>
            <p className="text-gray-600">
              Monitoreo térmico por zona de cultivo
            </p>
          </div>
        </div>

        {/* Grid of Temperatures */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temperatureData.map((zone, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {zone.zone}
              </h3>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Actual</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {zone.current}°C
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Sensación</p>
                  <p className="text-xl text-gray-700">{zone.feels}°C</p>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Mín: {zone.min}°C</span>
                <span className="text-gray-500">Máx: {zone.max}°C</span>
              </div>

              {/* Barre of range */}
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="absolute h-full bg-orange-500 rounded-full"
                  style={{
                    left: `${((zone.min - 10) / 30) * 100}%`,
                    right: `${100 - ((zone.max - 10) / 30) * 100}%`,
                  }}
                />
                <div
                  className="absolute w-3 h-3 bg-red-600 rounded-full -top-0.5"
                  style={{ left: `${((zone.current - 10) / 30) * 100}%` }}
                />
              </div>

              {/* Historial last hours */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Últimas 6h</p>
                <div className="flex items-end justify-between h-16 gap-1">
                  {zone.history.map((temp, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="w-6 bg-orange-500 rounded-t"
                        style={{ height: `${(temp / 40) * 100}%` }}
                      />
                      <span className="text-xs mt-1">{temp}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
