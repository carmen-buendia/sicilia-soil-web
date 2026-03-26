"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  ArrowLeft,
  Bell,
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Wifi,
  Zap,
  Moon,
  Globe,
  Mail,
  Smartphone,
  Clock,
  Calendar,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  Users,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

// Tipos de configuración
interface AlertThreshold {
  enabled: boolean;
  min: number;
  max: number;
  unit: string;
}

interface ZoneConfig {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  alerts: {
    moisture: AlertThreshold;
    temperature: AlertThreshold;
    light: AlertThreshold;
  };
  wateringSchedule: {
    enabled: boolean;
    frequency: "daily" | "custom" | "smart";
    time?: string;
    days?: string[];
    duration: number; // minutos
  };
}

interface NotificationChannel {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  value?: string;
}

export default function Configuration() {
  // Estado general
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");

  // Configuración de zonas
  const [zones, setZones] = useState<ZoneConfig[]>([
    {
      id: "esparto",
      name: "Zona de Esparto",
      icon: "🌾",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 60, max: 85, unit: "%" },
        temperature: { enabled: true, min: 15, max: 30, unit: "°C" },
        light: { enabled: false, min: 40, max: 90, unit: "%" },
      },
      wateringSchedule: {
        enabled: true,
        frequency: "smart",
        duration: 15,
      },
    },
    {
      id: "tomates",
      name: "Huerta de Tomates",
      icon: "🍅",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 65, max: 90, unit: "%" },
        temperature: { enabled: true, min: 18, max: 32, unit: "°C" },
        light: { enabled: true, min: 60, max: 95, unit: "%" },
      },
      wateringSchedule: {
        enabled: true,
        frequency: "daily",
        time: "08:00",
        duration: 20,
      },
    },
    {
      id: "olivar",
      name: "Olivar",
      icon: "🫒",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 40, max: 70, unit: "%" },
        temperature: { enabled: true, min: 10, max: 35, unit: "°C" },
        light: { enabled: true, min: 50, max: 90, unit: "%" },
      },
      wateringSchedule: {
        enabled: true,
        frequency: "custom",
        days: ["Lun", "Mié", "Vie"],
        duration: 30,
      },
    },
    {
      id: "compost",
      name: "Zona Compost",
      icon: "♻️",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 40, max: 70, unit: "%" },
        temperature: { enabled: true, min: 15, max: 40, unit: "°C" },
        light: { enabled: false, min: 20, max: 60, unit: "%" },
      },
      wateringSchedule: {
        enabled: false,
        frequency: "smart",
        duration: 10,
      },
    },
    {
      id: "hierbas",
      name: "Jardín de Hierbas",
      icon: "🌿",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 55, max: 80, unit: "%" },
        temperature: { enabled: true, min: 15, max: 28, unit: "°C" },
        light: { enabled: true, min: 50, max: 85, unit: "%" },
      },
      wateringSchedule: {
        enabled: true,
        frequency: "daily",
        time: "09:00",
        duration: 10,
      },
    },
    {
      id: "agua",
      name: "Depósito de Agua",
      icon: "💧",
      enabled: true,
      alerts: {
        moisture: { enabled: true, min: 70, max: 100, unit: "%" },
        temperature: { enabled: false, min: 5, max: 25, unit: "°C" },
        light: { enabled: false, min: 20, max: 80, unit: "%" },
      },
      wateringSchedule: {
        enabled: false,
        frequency: "smart",
        duration: 0,
      },
    },
  ]);

  // Canales de notificación
  const [notificationChannels, setNotificationChannels] = useState<
    NotificationChannel[]
  >([
    {
      id: "email",
      name: "Email",
      icon: Mail,
      enabled: true,
      value: "carmen@siciliasoil.it",
    },
    {
      id: "push",
      name: "Notificaciones Push",
      icon: Smartphone,
      enabled: true,
    },
    {
      id: "sms",
      name: "SMS",
      icon: Zap,
      enabled: false,
      value: "+39 123 456 789",
    },
  ]);

  // Configuración general
  const [generalConfig, setGeneralConfig] = useState({
    systemName: "Sicilia Soil",
    updateInterval: 30, // segundos
    autoBackup: true,
    backupFrequency: "weekly",
    dataRetention: "1 año",
    timezone: "Europe/Rome",
    temperatureUnit: "celsius",
    distanceUnit: "metric",
  });

  // Estado de sensores
  const [sensorStatus, setSensorStatus] = useState([
    {
      id: "sensor-1",
      name: "Sensor Norte",
      zone: "Zona de Esparto",
      battery: 87,
      status: "online",
      lastSeen: "hace 2 min",
    },
    {
      id: "sensor-2",
      name: "Sensor Sur",
      zone: "Huerta de Tomates",
      battery: 92,
      status: "online",
      lastSeen: "hace 1 min",
    },
    {
      id: "sensor-3",
      name: "Sensor Este",
      zone: "Olivar",
      battery: 45,
      status: "warning",
      lastSeen: "hace 15 min",
    },
    {
      id: "sensor-4",
      name: "Sensor Oeste",
      zone: "Jardín de Hierbas",
      battery: 78,
      status: "online",
      lastSeen: "hace 3 min",
    },
    {
      id: "sensor-5",
      name: "Sensor Compost",
      zone: "Zona Compost",
      battery: 12,
      status: "critical",
      lastSeen: "hace 2 horas",
    },
  ]);

  // Función para guardar configuración
  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simular guardado
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Función para resetear configuración
  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres restaurar la configuración por defecto?",
      )
    ) {
      // Aquí iría la lógica de reset
      alert("Configuración restaurada");
    }
  };

  // Actualizar umbral de alerta
  const updateAlertThreshold = (
    zoneId: string,
    alertType: keyof ZoneConfig["alerts"],
    field: "min" | "max",
    value: number,
  ) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === zoneId
          ? {
              ...zone,
              alerts: {
                ...zone.alerts,
                [alertType]: {
                  ...zone.alerts[alertType],
                  [field]: value,
                },
              },
            }
          : zone,
      ),
    );
  };

  // Toggle alerta
  const toggleAlert = (
    zoneId: string,
    alertType: keyof ZoneConfig["alerts"],
  ) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === zoneId
          ? {
              ...zone,
              alerts: {
                ...zone.alerts,
                [alertType]: {
                  ...zone.alerts[alertType],
                  enabled: !zone.alerts[alertType].enabled,
                },
              },
            }
          : zone,
      ),
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-50 to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Settings className="w-8 h-8 text-gray-700" />
                Configuración
              </h1>
              <p className="text-gray-600">
                Personaliza tu sistema de monitoreo
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Restaurar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {saveSuccess && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slideIn">
            <CheckCircle className="w-5 h-5" />
            <span>Configuración guardada correctamente</span>
          </div>
        )}

        {/* Tabs de navegación */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-gray-200">
          {[
            { id: "general", label: "General", icon: Settings },
            { id: "zonas", label: "Zonas", icon: Droplets },
            { id: "alertas", label: "Alertas", icon: Bell },
            { id: "riego", label: "Riego", icon: Zap },
            { id: "sensores", label: "Sensores", icon: Wifi },
            { id: "notificaciones", label: "Notificaciones", icon: Mail },
            { id: "cuenta", label: "Cuenta", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido según tab activo */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          {/* TAB: GENERAL */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Configuración general
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del sistema
                  </label>
                  <input
                    type="text"
                    value={generalConfig.systemName}
                    onChange={(e) =>
                      setGeneralConfig({
                        ...generalConfig,
                        systemName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intervalo de actualización
                  </label>
                  <select
                    value={generalConfig.updateInterval}
                    onChange={(e) =>
                      setGeneralConfig({
                        ...generalConfig,
                        updateInterval: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={10}>10 segundos</option>
                    <option value={30}>30 segundos</option>
                    <option value={60}>1 minuto</option>
                    <option value={300}>5 minutos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona horaria
                  </label>
                  <select
                    value={generalConfig.timezone}
                    onChange={(e) =>
                      setGeneralConfig({
                        ...generalConfig,
                        timezone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Europe/Rome">Roma (CET)</option>
                    <option value="Europe/Madrid">Madrid (CET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidad de temperatura
                  </label>
                  <select
                    value={generalConfig.temperatureUnit}
                    onChange={(e) =>
                      setGeneralConfig({
                        ...generalConfig,
                        temperatureUnit: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Copia de seguridad
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Copias de seguridad automáticas
                    </span>
                    <button
                      onClick={() =>
                        setGeneralConfig({
                          ...generalConfig,
                          autoBackup: !generalConfig.autoBackup,
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        generalConfig.autoBackup
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          generalConfig.autoBackup ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </label>

                  {generalConfig.autoBackup && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Frecuencia
                      </label>
                      <select
                        value={generalConfig.backupFrequency}
                        onChange={(e) =>
                          setGeneralConfig({
                            ...generalConfig,
                            backupFrequency: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="daily">Diaria</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                      </select>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                      <Download className="w-4 h-4" />
                      Descargar copia ahora
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                      <Upload className="w-4 h-4" />
                      Restaurar copia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ZONAS (resumen) */}
          {activeTab === "zonas" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Configuración por zonas
              </h2>

              <div className="space-y-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{zone.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {zone.name}
                          </h3>
                          <p className="text-sm text-gray-500">ID: {zone.id}</p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Activa</span>
                        <button
                          onClick={() =>
                            setZones((prev) =>
                              prev.map((z) =>
                                z.id === zone.id
                                  ? { ...z, enabled: !z.enabled }
                                  : z,
                              ),
                            )
                          }
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            zone.enabled ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                              zone.enabled ? "translate-x-5" : ""
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500">Humedad</p>
                        <p className="font-bold">
                          {zone.alerts.moisture.min}-{zone.alerts.moisture.max}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Temperatura</p>
                        <p className="font-bold">
                          {zone.alerts.temperature.min}-
                          {zone.alerts.temperature.max}°C
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Riego</p>
                        <p className="font-bold">
                          {zone.wateringSchedule.enabled
                            ? zone.wateringSchedule.duration + "min"
                            : "Manual"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SENSORES */}
          {activeTab === "sensores" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Estado de los sensores
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Sensor</th>
                      <th className="text-left py-3 px-4">Zona</th>
                      <th className="text-left py-3 px-4">Batería</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Última conexión</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorStatus.map((sensor) => (
                      <tr
                        key={sensor.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium">{sensor.name}</td>
                        <td className="py-3 px-4">{sensor.zone}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-full rounded-full ${
                                  sensor.battery > 70
                                    ? "bg-green-500"
                                    : sensor.battery > 30
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${sensor.battery}%` }}
                              />
                            </div>
                            <span className="text-sm">{sensor.battery}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                              sensor.status === "online"
                                ? "bg-green-100 text-green-800"
                                : sensor.status === "warning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                sensor.status === "online"
                                  ? "bg-green-500 animate-pulse"
                                  : sensor.status === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            {sensor.status === "online"
                              ? "En línea"
                              : sensor.status === "warning"
                                ? "Advertencia"
                                : "Crítico"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {sensor.lastSeen}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Configurar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Añadir nuevo sensor
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Sincronizar todos
                </button>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICACIONES */}
          {activeTab === "notificaciones" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Canales de notificación
              </h2>

              <div className="space-y-4">
                {notificationChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {channel.name}
                            </h3>
                            {channel.value && (
                              <p className="text-sm text-gray-500">
                                {channel.value}
                              </p>
                            )}
                          </div>
                        </div>
                        <label className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setNotificationChannels((prev) =>
                                prev.map((c) =>
                                  c.id === channel.id
                                    ? { ...c, enabled: !c.enabled }
                                    : c,
                                ),
                              )
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              channel.enabled ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                channel.enabled ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </label>
                      </div>

                      {channel.enabled && channel.id === "email" && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <label className="block text-sm text-gray-600 mb-2">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            value={channel.value}
                            onChange={(e) =>
                              setNotificationChannels((prev) =>
                                prev.map((c) =>
                                  c.id === channel.id
                                    ? { ...c, value: e.target.value }
                                    : c,
                                ),
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Tipos de alerta
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Humedad baja</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Temperatura extrema</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Luz insuficiente</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Batería baja del sensor</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span>Sensor desconectado</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder para otros tabs */}
          {activeTab === "riego" && (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Configuración de riego
              </h3>
              <p className="text-gray-500">
                Próximamente: Programación avanzada de riego automático
              </p>
            </div>
          )}

          {activeTab === "cuenta" && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Configuración de cuenta
              </h3>
              <p className="text-gray-500">
                Próximamente: Gestión de perfil, facturación y usuarios
              </p>
            </div>
          )}
        </div>

        {/* Footer con acciones adicionales */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleString()}
          </div>
          <button className="text-red-600 hover:text-red-800 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Eliminar todos los datos
          </button>
        </div>
      </div>
    </div>
  );
}
