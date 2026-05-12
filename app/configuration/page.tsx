"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Droplets,
  Thermometer,
  Sun,
  Wind,
  Save,
  RefreshCw,
  Shield,
  Database,
  Wifi,
  Moon,
  Sun as SunIcon,
  Monitor,
  Globe,
  Mail,
  Phone,
  MapPin,
  User,
  Lock,
  Settings,
} from "lucide-react";

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "alerts" | "sensors" | "account"
  >("general");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("30");

  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 bg-offWhite">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-oliveGreen/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-oliveGreen" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-charcoalGray flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-oliveGreen/20 to-wheatGold/20 rounded-xl">
                  <Settings className="w-6 h-6 text-oliveGreen" />
                </div>
                Configuración
              </h1>
              <p className="text-oliveGreen/70">
                Ajusta las preferencias de tu huerto sintrópico
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-oliveGreen/15 pb-2">
          {[
            { id: "general", label: "⚙️ General", icon: Settings },
            { id: "alerts", label: "🔔 Alertas", icon: Bell },
            { id: "sensors", label: "📡 Sensores", icon: Wifi },
            { id: "account", label: "👤 Cuenta", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-oliveGreen text-white shadow-md"
                  : "text-oliveGreen/70 hover:bg-oliveGreen/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: General */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-oliveGreen" />
                Apariencia
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoalGray">Modo oscuro</p>
                    <p className="text-sm text-oliveGreen/70">
                      Alternar entre tema claro y oscuro
                    </p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      darkMode ? "bg-oliveGreen" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        darkMode ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-oliveGreen" />
                Datos
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoalGray">
                      Auto-refresco
                    </p>
                    <p className="text-sm text-oliveGreen/70">
                      Actualizar datos automáticamente
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      autoRefresh ? "bg-oliveGreen" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        autoRefresh ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                {autoRefresh && (
                  <div>
                    <label className="block text-sm font-medium text-oliveGreen/70 mb-2">
                      Intervalo de refresco
                    </label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(e.target.value)}
                      className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50"
                    >
                      <option value="15">Cada 15 segundos</option>
                      <option value="30">Cada 30 segundos</option>
                      <option value="60">Cada 1 minuto</option>
                      <option value="300">Cada 5 minutos</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-oliveGreen" />
                Idioma
              </h3>
              <select className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50">
                <option value="es">Español</option>
                <option value="it">Italiano</option>
                <option value="en">English</option>
              </select>
            </div>

            <button className="w-full px-4 py-3 bg-gradient-to-r from-oliveGreen to-wheatGold text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Guardar cambios
            </button>
          </div>
        )}

        {/* Tab: Alertas */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-oliveGreen" />
                Notificaciones
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoalGray">
                      Notificaciones push
                    </p>
                    <p className="text-sm text-oliveGreen/70">
                      Recibir alertas en el navegador
                    </p>
                  </div>
                  <button
                    onClick={() => setPushAlerts(!pushAlerts)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pushAlerts ? "bg-oliveGreen" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        pushAlerts ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoalGray">
                      Alertas por email
                    </p>
                    <p className="text-sm text-oliveGreen/70">
                      Recibir alertas en tu correo
                    </p>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      emailAlerts ? "bg-oliveGreen" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        emailAlerts ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Umbrales de alerta
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Humedad mínima (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-oliveGreen/60 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Temperatura máxima (°C)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    defaultValue="35"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-oliveGreen/60 mt-1">
                    <span>0°C</span>
                    <span>35°C</span>
                    <span>50°C</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Luz mínima (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="40"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-oliveGreen/60 mt-1">
                    <span>0%</span>
                    <span>40%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-gradient-to-r from-oliveGreen to-wheatGold text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Guardar umbrales
            </button>
          </div>
        )}

        {/* Tab: Sensores */}
        {activeTab === "sensors" && (
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-oliveGreen" />
                Estado de sensores
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Sensor de humedad - Parcela Norte",
                    status: "online",
                    value: "78%",
                  },
                  {
                    name: "Sensor de temperatura - Parcela Sur",
                    status: "online",
                    value: "24°C",
                  },
                  {
                    name: "Sensor de luz - Olivar",
                    status: "offline",
                    value: "---",
                  },
                  {
                    name: "Sensor de viento - Zona Oeste",
                    status: "online",
                    value: "12 km/h",
                  },
                ].map((sensor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-charcoalGray">
                        {sensor.name}
                      </p>
                      <p className="text-sm text-oliveGreen/60">
                        {sensor.value}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        sensor.status === "online"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sensor.status === "online"
                        ? "🟢 Conectado"
                        : "🔴 Desconectado"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-gradient-to-r from-oliveGreen to-wheatGold text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reintentar conexión
            </button>
          </div>
        )}

        {/* Tab: Cuenta */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-oliveGreen" />
                Información personal
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Carmen Buendía"
                    className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="carmen@example.com"
                    className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="+34 123 456 789"
                    className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-oliveGreen/70 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    defaultValue="Sicilia, Italia"
                    className="w-full px-3 py-2 border border-oliveGreen/20 rounded-lg bg-white/50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-oliveGreen/15">
              <h3 className="text-lg font-bold text-charcoalGray mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-oliveGreen" />
                Seguridad
              </h3>
              <button className="w-full px-4 py-2 border border-oliveGreen/30 text-oliveGreen rounded-lg hover:bg-oliveGreen/5 transition-colors">
                Cambiar contraseña
              </button>
            </div>

            <button className="w-full px-4 py-3 bg-gradient-to-r from-oliveGreen to-wheatGold text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Guardar cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
