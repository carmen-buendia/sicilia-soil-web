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
    duration: number;
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
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [language, setLanguage] = useState("es");

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
      wateringSchedule: { enabled: true, frequency: "smart", duration: 15 },
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
      wateringSchedule: { enabled: false, frequency: "smart", duration: 10 },
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
      wateringSchedule: { enabled: false, frequency: "smart", duration: 0 },
    },
  ]);

  const [notificationChannels, setNotificationChannels] = useState<
    NotificationChannel[]
  >([
    {
      id: "email",
      name: "Email",
      icon: Mail,
      enabled: true,
      value: "carmen@sintropico-monitor.it",
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

  const [generalConfig, setGeneralConfig] = useState({
    systemName: "Sintrópico Monitor",
    updateInterval: 30,
    autoBackup: true,
    backupFrequency: "weekly",
    dataRetention: "1 año",
    timezone: "Europe/Rome",
    temperatureUnit: "celsius",
    distanceUnit: "metric",
  });

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

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que quieres restaurar la configuración por defecto?",
      )
    ) {
      alert("Configuración restaurada");
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "zonas", label: "Zonas", icon: Droplets },
    { id: "alertas", label: "Alertas", icon: Bell },
    { id: "riego", label: "Riego", icon: Zap },
    { id: "sensores", label: "Sensores", icon: Wifi },
    { id: "notificaciones", label: "Notificaciones", icon: Mail },
    { id: "cuenta", label: "Cuenta", icon: Users },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <Settings className="w-8 h-8 text-oliveGreen" />
                Configuración
              </h1>
              <p className="text-oliveGreen/70">
                Personaliza tu sistema de monitoreo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-offWhite text-charcoalGray rounded-lg flex items-center gap-2 hover:bg-oliveGreen/5 transition-colors border border-oliveGreen/15"
            >
              <RefreshCw className="w-4 h-4" />
              Restaurar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 bg-oliveGreen text-offWhite rounded-lg flex items-center gap-2 hover:bg-oliveGreen/90 transition-all ${
                isSaving
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-[1.02]"
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
          <div className="fixed top-20 right-4 bg-oliveGreen text-offWhite px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5" />
            <span>Configuración guardada correctamente</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-oliveGreen/15">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-oliveGreen text-offWhite"
                    : "text-charcoalGray/70 hover:bg-oliveGreen/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido */}
        <div className="bg-offWhite rounded-2xl shadow-xl border border-oliveGreen/15 p-6 md:p-8">
          {/* TAB: GENERAL */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-charcoalGray mb-6">
                Configuración general
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-oliveGreen mb-2">
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
                    className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg focus:ring-2 focus:ring-oliveGreen focus:border-oliveGreen bg-offWhite text-charcoalGray"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen mb-2">
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
                    className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg focus:ring-2 focus:ring-oliveGreen bg-offWhite text-charcoalGray"
                  >
                    <option value={10}>10 segundos</option>
                    <option value={30}>30 segundos</option>
                    <option value={60}>1 minuto</option>
                    <option value={300}>5 minutos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen mb-2">
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
                    className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg focus:ring-2 focus:ring-oliveGreen bg-offWhite text-charcoalGray"
                  >
                    <option value="Europe/Rome">Roma (CET)</option>
                    <option value="Europe/Madrid">Madrid (CET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen mb-2">
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
                    className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg focus:ring-2 focus:ring-oliveGreen bg-offWhite text-charcoalGray"
                  >
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-oliveGreen/15 pt-6">
                <h3 className="text-lg font-bold text-charcoalGray mb-4">
                  Copia de seguridad
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-oliveGreen">
                      Copias de seguridad automáticas
                    </span>
                    <button
                      onClick={() =>
                        setGeneralConfig({
                          ...generalConfig,
                          autoBackup: !generalConfig.autoBackup,
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${generalConfig.autoBackup ? "bg-oliveGreen" : "bg-oliveGreen/20"}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-offWhite rounded-full transition-transform ${generalConfig.autoBackup ? "translate-x-6" : ""}`}
                      />
                    </button>
                  </label>
                  {generalConfig.autoBackup && (
                    <div>
                      <label className="block text-sm text-oliveGreen/60 mb-2">
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
                        className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg bg-offWhite text-charcoalGray"
                      >
                        <option value="daily">Diaria</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                      </select>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-oliveGreen/5 text-oliveGreen rounded-lg flex items-center gap-2 hover:bg-oliveGreen/10 transition-colors border border-oliveGreen/15">
                      <Download className="w-4 h-4" /> Descargar copia ahora
                    </button>
                    <button className="px-4 py-2 bg-oliveGreen/5 text-oliveGreen rounded-lg flex items-center gap-2 hover:bg-oliveGreen/10 transition-colors border border-oliveGreen/15">
                      <Upload className="w-4 h-4" /> Restaurar copia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ZONAS */}
          {activeTab === "zonas" && (
            <div>
              <h2 className="text-2xl font-bold text-charcoalGray mb-6">
                Configuración por zonas
              </h2>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="border border-oliveGreen/15 rounded-lg p-4 hover:shadow-md transition-shadow bg-offWhite"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{zone.icon}</span>
                        <div>
                          <h3 className="font-bold text-charcoalGray">
                            {zone.name}
                          </h3>
                          <p className="text-sm text-oliveGreen/50">
                            ID: {zone.id}
                          </p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2">
                        <span className="text-sm text-oliveGreen/60">
                          Activa
                        </span>
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
                          className={`relative w-10 h-5 rounded-full transition-colors ${zone.enabled ? "bg-oliveGreen" : "bg-oliveGreen/20"}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-offWhite rounded-full transition-transform ${zone.enabled ? "translate-x-5" : ""}`}
                          />
                        </button>
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-oliveGreen/5 rounded-lg">
                        <p className="text-oliveGreen/60">Humedad</p>
                        <p className="font-bold text-charcoalGray">
                          {zone.alerts.moisture.min}-{zone.alerts.moisture.max}%
                        </p>
                      </div>
                      <div className="text-center p-2 bg-oliveGreen/5 rounded-lg">
                        <p className="text-oliveGreen/60">Temperatura</p>
                        <p className="font-bold text-charcoalGray">
                          {zone.alerts.temperature.min}-
                          {zone.alerts.temperature.max}°C
                        </p>
                      </div>
                      <div className="text-center p-2 bg-oliveGreen/5 rounded-lg">
                        <p className="text-oliveGreen/60">Riego</p>
                        <p className="font-bold text-charcoalGray">
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
              <h2 className="text-2xl font-bold text-charcoalGray mb-6">
                Estado de los sensores
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-oliveGreen/15">
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Sensor
                      </th>
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Zona
                      </th>
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Batería
                      </th>
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Estado
                      </th>
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Última conexión
                      </th>
                      <th className="text-left py-3 px-4 text-oliveGreen">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorStatus.map((sensor) => (
                      <tr
                        key={sensor.id}
                        className="border-b border-oliveGreen/10 hover:bg-oliveGreen/5"
                      >
                        <td className="py-3 px-4 font-medium text-charcoalGray">
                          {sensor.name}
                        </td>
                        <td className="py-3 px-4 text-oliveGreen/70">
                          {sensor.zone}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-oliveGreen/10 rounded-full">
                              <div
                                className={`h-full rounded-full ${sensor.battery > 70 ? "bg-oliveGreen" : sensor.battery > 30 ? "bg-wheatGold" : "bg-sicilian-red"}`}
                                style={{ width: `${sensor.battery}%` }}
                              />
                            </div>
                            <span className="text-sm text-charcoalGray">
                              {sensor.battery}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${sensor.status === "online" ? "bg-oliveGreen/10 text-oliveGreen" : sensor.status === "warning" ? "bg-wheatGold/10 text-wheatGold" : "bg-sicilian-red/10 text-sicilian-red"}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${sensor.status === "online" ? "bg-oliveGreen animate-pulse" : sensor.status === "warning" ? "bg-wheatGold" : "bg-sicilian-red"}`}
                            />
                            {sensor.status === "online"
                              ? "En línea"
                              : sensor.status === "warning"
                                ? "Advertencia"
                                : "Crítico"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-oliveGreen/60">
                          {sensor.lastSeen}
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-oliveGreen hover:text-sicilian-red text-sm">
                            Configurar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-oliveGreen text-offWhite rounded-lg hover:bg-oliveGreen/90 transition-all">
                  Añadir nuevo sensor
                </button>
                <button className="px-4 py-2 bg-offWhite text-charcoalGray rounded-lg hover:bg-oliveGreen/5 transition-colors border border-oliveGreen/15">
                  Sincronizar todos
                </button>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICACIONES */}
          {activeTab === "notificaciones" && (
            <div>
              <h2 className="text-2xl font-bold text-charcoalGray mb-6">
                Canales de notificación
              </h2>
              <div className="space-y-4">
                {notificationChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.id}
                      className="border border-oliveGreen/15 rounded-lg p-4 bg-offWhite"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-oliveGreen" />
                          <div>
                            <h3 className="font-bold text-charcoalGray">
                              {channel.name}
                            </h3>
                            {channel.value && (
                              <p className="text-sm text-oliveGreen/50">
                                {channel.value}
                              </p>
                            )}
                          </div>
                        </div>
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
                          className={`relative w-12 h-6 rounded-full transition-colors ${channel.enabled ? "bg-oliveGreen" : "bg-oliveGreen/20"}`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-offWhite rounded-full transition-transform ${channel.enabled ? "translate-x-6" : ""}`}
                          />
                        </button>
                      </div>
                      {channel.enabled && channel.id === "email" && (
                        <div className="mt-4 pt-4 border-t border-oliveGreen/15">
                          <label className="block text-sm text-oliveGreen/60 mb-2">
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
                            className="w-full px-4 py-2 border border-oliveGreen/20 rounded-lg bg-offWhite text-charcoalGray"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-charcoalGray mb-4">
                  Tipos de alerta
                </h3>
                <div className="space-y-2">
                  {[
                    "Humedad baja",
                    "Temperatura extrema",
                    "Luz insuficiente",
                    "Batería baja del sensor",
                  ].map((alert, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-oliveGreen/70"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-oliveGreen"
                        defaultChecked={i < 3}
                      />
                      <span>{alert}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholders para tabs pendientes */}
          {activeTab === "riego" && (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-oliveGreen/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoalGray mb-2">
                Configuración de riego
              </h3>
              <p className="text-oliveGreen/60">
                Próximamente: Programación avanzada de riego automático
              </p>
            </div>
          )}

          {activeTab === "cuenta" && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-oliveGreen/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoalGray mb-2">
                Configuración de cuenta
              </h3>
              <p className="text-oliveGreen/60">
                Próximamente: Gestión de perfil, facturación y usuarios
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-oliveGreen/50">
            Última actualización: {new Date().toLocaleString()}
          </div>
          <button className="text-sicilian-red hover:text-sicilian-red/80 flex items-center gap-2 transition-colors">
            <Trash2 className="w-4 h-4" />
            Eliminar todos los datos
          </button>
        </div>
      </div>
    </div>
  );
}
