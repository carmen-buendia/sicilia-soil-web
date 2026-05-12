"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  SensorData,
} from "@/lib/types";
import { mockSensorData, mockAlerts } from "@/lib/data/sensorData";
import { MonitoringFilters, MonitoringState } from "../types/monitoring.types";

const initialState: MonitoringState = {
  zones: [],
  selectedZone: null,
  sensorData: {},
  alerts: [],
  isLoading: true,
  error: null,
  lastUpdate: null,
};

export function useMonitoring() {
  const [state, setState] = useState<MonitoringState>(initialState);
  const [filters, setFilters] = useState<MonitoringFilters>({
    metric: "moisture",
    period: "24h",
    showAlerts: true,
  });

  const loadData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Crear el mapa de sensorData usando el tipo correcto
      const sensorDataMap: Record<string, SensorData> = {};
      mockSensorData.forEach((data) => {
        sensorDataMap[data.zoneId] = {
          zoneId: data.zoneId,
          zoneName: data.zoneName,
          sensors: { ...data.sensors },
          status: data.status,
          lastUpdate: data.lastUpdate,
        };
      });

      setState({
        zones: mockSensorData.map((data) => ({
          id: data.zoneId,
          name: data.zoneName,
          type: "cultivo",
          icon: getZoneIcon(data.zoneId),
          location: "",
          sensors: {
            moisture: {
              value: data.sensors.moisture.current,
              timestamp: new Date(data.lastUpdate),
              unit: data.sensors.moisture.unit,
              status: getStatusValue(
                data.sensors.moisture.current,
                data.sensors.moisture.optimal,
              ),
            },
            temperature: {
              value: data.sensors.temperature.current,
              timestamp: new Date(data.lastUpdate),
              unit: data.sensors.temperature.unit,
              status: getTemperatureStatusValue(
                data.sensors.temperature.current,
                data.sensors.temperature.min,
                data.sensors.temperature.max,
              ),
            },
            light: {
              value: data.sensors.light.current,
              timestamp: new Date(data.lastUpdate),
              unit: data.sensors.light.unit,
              status: getStatusValue(
                data.sensors.light.current,
                data.sensors.light.optimal,
              ),
            },
          },
          status: getZoneStatus(data.status),
          lastUpdate: new Date(data.lastUpdate),
        })),
        selectedZone: state.selectedZone,
        sensorData: sensorDataMap,
        alerts: mockAlerts.map((alert) => ({
          ...alert,
          acknowledged: alert.acknowledged || false,
        })),
        isLoading: false,
        error: null,
        lastUpdate: new Date(),
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al cargar datos",
      }));
    }
  }, [state.selectedZone]);

  const getZoneIcon = (zoneId: string): string => {
    const icons: Record<string, string> = {
      esparto: "🌾",
      tomates: "🍅",
      olivar: "🫒",
      compost: "♻️",
      hierbas: "🌿",
      agua: "💧",
    };
    return icons[zoneId] || "🌱";
  };

  const getStatusValue = (
    current: number,
    optimal: number,
  ): "optimal" | "warning" | "critical" => {
    if (current >= optimal) return "optimal";
    if (current >= optimal - 15) return "warning";
    return "critical";
  };

  // Función específica para temperatura (usa rango min-max)
  const getTemperatureStatusValue = (
    current: number,
    min: number,
    max: number,
  ): "optimal" | "warning" | "critical" => {
    if (current >= min && current <= max) return "optimal";
    if (current >= min - 5 && current <= max + 5) return "warning";
    return "critical";
  };

  const getZoneStatus = (
    sensorStatus: "optimal" | "warning" | "critical",
  ): "saludable" | "óptimo" | "necesita riego" | "activo" | "lleno" => {
    switch (sensorStatus) {
      case "optimal":
        return "óptimo";
      case "warning":
        return "necesita riego";
      case "critical":
        return "necesita riego";
      default:
        return "saludable";
    }
  };

  const selectZone = useCallback((zoneId: string | null) => {
    setState((prev) => ({ ...prev, selectedZone: zoneId }));
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setState((prev) => ({
      ...prev,
      alerts: prev.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert,
      ),
    }));
  }, []);

  const updateFilter = useCallback(
    (key: keyof MonitoringFilters, value: any) => {
      setFilters((prev: any) => ({ ...prev, [key]: value }));
    },
    [],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...state,
    filters,
    selectZone,
    acknowledgeAlert,
    updateFilter,
    refreshData: loadData,
  };
}
