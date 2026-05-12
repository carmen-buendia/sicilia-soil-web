"use client";

import { useState, useEffect } from "react";

interface DashboardData {
  stats: {
    avgHumidity: number;
    avgTemperature: number;
    avgLight: number;
    activeAlerts: number;
  };
  zones: Array<{
    id: string;
    name: string;
    icon: string;
    moisture: number;
    temperature: number;
    light: number;
  }>;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos (después conectarás con API real)
    setTimeout(() => {
      setData({
        stats: {
          avgHumidity: 68,
          avgTemperature: 23,
          avgLight: 65,
          activeAlerts: 2,
        },
        zones: [
          {
            id: "esparto",
            name: "Zona de Esparto",
            icon: "🌾",
            moisture: 78,
            temperature: 22,
            light: 65,
          },
          {
            id: "tomates",
            name: "Huerta de Tomates",
            icon: "🍅",
            moisture: 82,
            temperature: 24,
            light: 78,
          },
          {
            id: "olivar",
            name: "Olivar",
            icon: "🫒",
            moisture: 45,
            temperature: 21,
            light: 45,
          },
          {
            id: "compost",
            name: "Zona Compost",
            icon: "♻️",
            moisture: 55,
            temperature: 28,
            light: 30,
          },
          {
            id: "hierbas",
            name: "Jardín de Hierbas",
            icon: "🌿",
            moisture: 68,
            temperature: 23,
            light: 70,
          },
          {
            id: "agua",
            name: "Depósito de Agua",
            icon: "💧",
            moisture: 90,
            temperature: 18,
            light: 40,
          },
        ],
      });
      setIsLoading(false);
    }, 500);
  }, []);

  return { data, isLoading };
}
