// apps/web/lib/sicilia-soil-client.ts
import { io, Socket } from "socket.io-client";

// Tipos de datos para sensores
export interface SensorData {
  zoneId: string;
  zoneName: string;
  sensors: {
    moisture: { current: number; optimal: number; unit: string };
    temperature: { current: number; min: number; max: number; unit: string };
    light: { current: number; optimal: number; unit: string };
    wind: { current: number; unit: string };
  };
  status: string;
  lastUpdate: string;
}

export interface AlertData {
  zone: string;
  type: string;
  current: string;
  optimal: string;
  severity: string;
  timestamp: string;
}

export class SiciliaSoilClient {
  private socket: Socket;
  private zoneCallbacks: Map<string, (data: SensorData) => void> = new Map();
  private globalStatsCallback: ((stats: any) => void) | null = null;
  private alertCallback: ((alerts: AlertData[]) => void) | null = null;

  constructor(serverUrl: string = "http://localhost:3001") {
    this.socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupSocketListeners();
  }

  /**
   * Configurar listeners del socket
   */
  private setupSocketListeners(): void {
    this.socket.on("connect", () => {
      console.log("🌱 Conectado al servidor Sicilia Soil");
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Desconectado del servidor Sicilia Soil");
    });

    // Recibir datos iniciales
    this.socket.on("initial-data", (data: { zones: any[]; stats: any }) => {
      console.log("📦 Datos iniciales recibidos:", data);
    });

    // Recibir actualización de una zona específica
    this.socket.on("zone-update", (data: SensorData) => {
      const callback = this.zoneCallbacks.get(data.zoneId);
      if (callback) {
        callback(data);
      }
    });

    // Recibir estadísticas globales
    this.socket.on("global-stats", (stats: any) => {
      if (this.globalStatsCallback) {
        this.globalStatsCallback(stats);
      }
    });

    // Recibir estado del riego
    this.socket.on(
      "watering-status",
      (data: {
        zoneId: string;
        status: string;
        duration: number;
        startTime: string;
      }) => {
        console.log(`💧 Estado de riego - Zona ${data.zoneId}: ${data.status}`);
      },
    );

    // Manejo de errores
    this.socket.on("connect_error", (error) => {
      console.error("❌ Error de conexión:", error);
    });
  }

  /**
   * Suscribirse a actualizaciones de una zona específica
   */
  public subscribeToZone(
    zoneId: string,
    callback: (data: SensorData) => void,
  ): void {
    this.zoneCallbacks.set(zoneId, callback);
    this.socket.emit("subscribe-zone", zoneId);
    console.log(`📡 Suscrito a zona: ${zoneId}`);
  }

  /**
   * Cancelar suscripción a una zona
   */
  public unsubscribeFromZone(zoneId: string): void {
    this.zoneCallbacks.delete(zoneId);
    this.socket.emit("unsubscribe-zone", zoneId);
    console.log(`🔕 Suscripción cancelada: ${zoneId}`);
  }

  /**
   * Suscribirse a estadísticas globales
   */
  public subscribeToGlobalStats(callback: (stats: any) => void): void {
    this.globalStatsCallback = callback;
  }

  /**
   * Activar riego manual para una zona
   */
  public activateManualWatering(zoneId: string, duration: number = 15): void {
    this.socket.emit("manual-watering", { zoneId, duration });
    console.log(
      `💧 Activando riego manual en zona ${zoneId} por ${duration} minutos`,
    );
  }

  /**
   * Obtener datos históricos de un sensor
   */
  public async getHistoricalData(
    zoneId: string,
    sensor: string,
    days: number = 7,
  ): Promise<any> {
    try {
      const response = await fetch(
        `http://localhost:3001/api/history/${zoneId}/${sensor}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error al obtener datos históricos:", error);
      throw error;
    }
  }

  /**
   * Obtener todas las zonas
   */
  public async getAllZones(): Promise<any> {
    try {
      const response = await fetch("http://localhost:3001/api/zones");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error al obtener zonas:", error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas generales
   */
  public async getStats(): Promise<any> {
    try {
      const response = await fetch("http://localhost:3001/api/stats");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error al obtener estadísticas:", error);
      throw error;
    }
  }

  /**
   * Obtener alertas activas
   */
  public async getAlerts(): Promise<AlertData[]> {
    try {
      const response = await fetch("http://localhost:3001/api/alerts");
      const data = await response.json();
      return data.alerts;
    } catch (error) {
      console.error("❌ Error al obtener alertas:", error);
      throw error;
    }
  }

  /**
   * Verificar estado del servidor
   */
  public async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/health");
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Limpiar conexiones
   */
  public cleanup(): void {
    this.zoneCallbacks.clear();
    this.globalStatsCallback = null;
    this.alertCallback = null;
    this.socket.disconnect();
    console.log("🧹 Cliente desconectado y limpiado");
  }
}
