"use client";

import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Droplets,
  Thermometer,
  Gauge,
  Activity,
  AlertTriangle,
  Wind,
  Leaf,
  Waves,
  Trees, // <-- NUEVO para carbono
} from "lucide-react";

// Datos simulados (igual que en useFarmData)
const mockData = {
  sensors: [
    {
      id: "S1",
      humidity: 68,
      ph: 7.2,
      temperature: 22,
      heavyMetals: {
        lead: 12.5,
        cadmium: 0.8,
        mercury: 0.05,
        arsenic: 1.2,
        chromium: 15.3,
      },
      airQuality: { pm25: 12, pm10: 25, no2: 18, o3: 35 },
      waterQuality: { turbidity: 2.5, conductivity: 450, dissolvedOxygen: 7.8 },
      soilPollutants: { hydrocarbons: 25, pesticides: 0.3, fertilizers: 120 },
      // ===== NUEVO: Carbono en el suelo =====
      soilCarbon: {
        organicCarbonPercent: 2.5,
        bulkDensity: 1.2,
        depth: 30,
        co2Flux: 3.2,
      },
    },
    {
      id: "S2",
      humidity: 52,
      ph: 7.8,
      temperature: 24,
      heavyMetals: {
        lead: 8.2,
        cadmium: 0.4,
        mercury: 0.02,
        arsenic: 0.8,
        chromium: 10.1,
      },
      airQuality: { pm25: 18, pm10: 35, no2: 25, o3: 28 },
      waterQuality: { turbidity: 3.2, conductivity: 520, dissolvedOxygen: 6.5 },
      soilPollutants: { hydrocarbons: 35, pesticides: 0.5, fertilizers: 95 },
      soilCarbon: {
        organicCarbonPercent: 1.8,
        bulkDensity: 1.3,
        depth: 25,
        co2Flux: 2.8,
      },
    },
    {
      id: "S3",
      humidity: 73,
      ph: 6.9,
      temperature: 21,
      heavyMetals: {
        lead: 15.8,
        cadmium: 1.2,
        mercury: 0.08,
        arsenic: 2.5,
        chromium: 20.4,
      },
      airQuality: { pm25: 8, pm10: 18, no2: 12, o3: 42 },
      waterQuality: { turbidity: 1.8, conductivity: 380, dissolvedOxygen: 8.2 },
      soilPollutants: { hydrocarbons: 15, pesticides: 0.1, fertilizers: 150 },
      soilCarbon: {
        organicCarbonPercent: 3.0,
        bulkDensity: 1.1,
        depth: 35,
        co2Flux: 4.0,
      },
    },
  ],
};

export default function EnvironmentalDashboard() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  // Calcular promedios para las tarjetas
  const avg = (key: string, subKey?: string) => {
    const values = data.sensors.map((s: any) => {
      if (subKey) return s[key]?.[subKey] || 0;
      return s[key] || 0;
    });
    const valid = values.filter((v: number) => v > 0);
    if (valid.length === 0) return 0;
    return valid.reduce((a: number, b: number) => a + b, 0) / valid.length;
  };

  // ===== NUEVA FUNCIÓN: Calcular CO₂ secuestrado =====
  const calculateCO2Sequestration = (
    cosPercent: number,
    bulkDensity: number,
    depth: number,
  ): number => {
    // Carbono almacenado (t C/ha) = (COS% * densidad * profundidad) / 10
    const carbonStored = (cosPercent * bulkDensity * depth) / 10;
    // CO₂ equivalente = carbono * 3.67
    return carbonStored * 3.67;
  };

  // Configuración de gráficos con Highcharts
  const createChartOptions = (
    title: string,
    categories: string[],
    series: { name: string; data: number[]; color?: string }[],
    unit: string = "",
    yAxisTitle: string = "Valor",
  ) => ({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      style: { fontFamily: "inherit" },
      height: 250,
    },
    title: { text: title, style: { fontSize: "14px", fontWeight: "bold" } },
    xAxis: {
      categories,
      labels: { style: { fontSize: "10px" } },
    },
    yAxis: {
      title: { text: yAxisTitle, style: { fontSize: "11px" } },
      labels: { style: { fontSize: "10px" } },
    },
    series: series.map((s) => ({
      ...s,
      dataLabels: {
        enabled: true,
        format: `{y} ${unit}`,
        style: { fontSize: "9px" },
      },
    })),
    tooltip: {
      shared: true,
      valueSuffix: ` ${unit}`,
    },
    legend: {
      enabled: series.length > 1,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: { fontSize: "10px" },
    },
    credits: { enabled: false },
    plotOptions: {
      column: {
        borderRadius: 4,
        groupPadding: 0.1,
      },
    },
  });

  // Gráfico: Metales pesados
  const heavyMetalsChart = createChartOptions(
    "Metales pesados en suelo",
    ["Pb", "Cd", "Hg", "As", "Cr"],
    [
      {
        name: "Concentración",
        data: data.sensors
          .map((s) => [
            s.heavyMetals.lead,
            s.heavyMetals.cadmium,
            s.heavyMetals.mercury,
            s.heavyMetals.arsenic,
            s.heavyMetals.chromium,
          ])
          .reduce(
            (acc, curr) => acc.map((v, i) => v + curr[i]),
            [0, 0, 0, 0, 0],
          )
          .map((v) => v / data.sensors.length),
        color: "#e74c3c",
      },
    ],
    "mg/kg",
    "Concentración (mg/kg)",
  );

  // Gráfico: Calidad del aire
  const airQualityChart = createChartOptions(
    "Calidad del aire",
    ["PM2.5", "PM10", "NO₂", "O₃"],
    [
      {
        name: "Promedio",
        data: data.sensors
          .map((s) => [
            s.airQuality.pm25,
            s.airQuality.pm10,
            s.airQuality.no2,
            s.airQuality.o3,
          ])
          .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), [0, 0, 0, 0])
          .map((v) => v / data.sensors.length),
        color: "#3498db",
      },
    ],
    "µg/m³",
    "Concentración (µg/m³)",
  );

  // Gráfico: Calidad del agua
  const waterQualityChart = createChartOptions(
    "Calidad del agua",
    ["Turbidez", "Conductividad", "Oxígeno disuelto"],
    [
      {
        name: "Promedio",
        data: data.sensors
          .map((s) => [
            s.waterQuality.turbidity,
            s.waterQuality.conductivity / 100, // Escalar para visualización
            s.waterQuality.dissolvedOxygen,
          ])
          .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), [0, 0, 0])
          .map((v) => v / data.sensors.length),
        color: "#2ecc71",
      },
    ],
    "",
    "Valor",
  );

  // Gráfico: Contaminación del suelo
  const soilPollutantsChart = createChartOptions(
    "Contaminación del suelo",
    ["Hidrocarburos", "Pesticidas", "Fertilizantes"],
    [
      {
        name: "Promedio",
        data: data.sensors
          .map((s) => [
            s.soilPollutants.hydrocarbons,
            s.soilPollutants.pesticides * 10, // Escalar para visualización
            s.soilPollutants.fertilizers,
          ])
          .reduce((acc, curr) => acc.map((v, i) => v + curr[i]), [0, 0, 0])
          .map((v) => v / data.sensors.length),
        color: "#f39c12",
      },
    ],
    "mg/kg",
    "Concentración (mg/kg)",
  );

  // ===== NUEVO GRÁFICO: CO₂ secuestrado por sensor =====
  const carbonSequestrationChart = createChartOptions(
    "CO₂ secuestrado por sensor",
    data.sensors.map((s) => s.id),
    [
      {
        name: "CO₂ secuestrado",
        data: data.sensors.map((s) =>
          calculateCO2Sequestration(
            s.soilCarbon.organicCarbonPercent,
            s.soilCarbon.bulkDensity,
            s.soilCarbon.depth,
          ),
        ),
        color: "#2ecc71",
      },
    ],
    "t/ha",
    "t CO₂/ha",
  );

  // Tarjeta de métrica rápida
  const MetricCard = ({
    icon: Icon,
    title,
    value,
    unit,
    color = "text-oliveGreen",
  }: {
    icon: any;
    title: string;
    value: number | string;
    unit: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-oliveGreen/60 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-charcoalGray mt-1">
            {typeof value === "number" ? value.toFixed(1) : value}
            <span className="text-sm font-normal text-oliveGreen/50 ml-1">
              {unit}
            </span>
          </p>
        </div>
        <div
          className={`p-2 rounded-lg bg-opacity-10 ${color} bg-${color.replace("text-", "")}/10`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );

  // ===== NUEVA TARJETA DE MÉTRICA DE CARBONO (reutiliza MetricCard pero con diferentes props) =====
  const CarbonMetricCard = ({
    icon: Icon,
    title,
    value,
    unit,
    color = "text-emerald-600",
  }: {
    icon: any;
    title: string;
    value: number | string;
    unit: string;
    color?: string;
  }) => (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 shadow-sm border border-emerald-200/30 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-emerald-700/60 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-charcoalGray mt-1">
            {typeof value === "number" ? value.toFixed(1) : value}
            <span className="text-sm font-normal text-emerald-600/50 ml-1">
              {unit}
            </span>
          </p>
        </div>
        <div className="p-2 rounded-lg bg-emerald-100/50">
          <Icon className={`w-5 h-5 text-emerald-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoalGray flex items-center gap-3">
            <span className="text-4xl">🌍</span> Monitorización Ambiental
          </h1>
          <p className="text-oliveGreen/70 text-sm mt-1">
            Datos en tiempo real de sensores IoT · Última actualización:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-oliveGreen/60">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {data.sensors.length} sensores activos
        </div>
      </div>

      {/* Tarjetas de métricas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Droplets}
          title="Humedad media"
          value={avg("humidity")}
          unit="%"
          color="text-blue-500"
        />
        <MetricCard
          icon={Gauge}
          title="pH medio"
          value={avg("ph")}
          unit=""
          color="text-purple-500"
        />
        <MetricCard
          icon={Thermometer}
          title="Temperatura media"
          value={avg("temperature")}
          unit="°C"
          color="text-red-500"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Riesgo ambiental"
          value={avg("heavyMetals", "lead") > 10 ? "Alto" : "Moderado"}
          unit=""
          color="text-yellow-500"
        />
      </div>

      {/* Gráficos en grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={heavyMetalsChart} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={airQualityChart} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact
            highcharts={Highcharts}
            options={waterQualityChart}
          />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact
            highcharts={Highcharts}
            options={soilPollutantsChart}
          />
        </div>
      </div>

      {/* ===== NUEVA SECCIÓN: CAPTURA DE CARBONO EN EL SUELO ===== */}
      <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50/30 rounded-2xl p-6 border border-emerald-200/30">
        <div className="flex items-center gap-2 mb-6">
          <Trees className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-charcoalGray">
            Captura de Carbono en el Suelo
          </h2>
          <span className="text-xs text-emerald-600/60 ml-auto">
            CO₂ secuestrado calculado con método estándar
          </span>
        </div>

        {/* Tarjetas de carbono */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <CarbonMetricCard
            icon={Leaf}
            title="COS promedio"
            value={avg("soilCarbon", "organicCarbonPercent")}
            unit="%"
          />
          <CarbonMetricCard
            icon={Gauge}
            title="Densidad aparente"
            value={avg("soilCarbon", "bulkDensity")}
            unit="g/cm³"
          />
          <CarbonMetricCard
            icon={Activity}
            title="Profundidad media"
            value={avg("soilCarbon", "depth")}
            unit="cm"
          />
          <CarbonMetricCard
            icon={Trees}
            title="CO₂ secuestrado"
            value={
              data.sensors.reduce(
                (acc, s) =>
                  acc +
                  calculateCO2Sequestration(
                    s.soilCarbon.organicCarbonPercent,
                    s.soilCarbon.bulkDensity,
                    s.soilCarbon.depth,
                  ),
                0,
              ) / data.sensors.length
            }
            unit="t/ha"
          />
        </div>

        {/* Gráfico de CO₂ secuestrado */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100/50 mb-6">
          <HighchartsReact
            highcharts={Highcharts}
            options={carbonSequestrationChart}
          />
        </div>

        {/* Tabla de carbono */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100/50 overflow-x-auto">
          <h4 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Detalle de carbono por sensor
          </h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-100">
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  Sensor
                </th>
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  COS (%)
                </th>
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  Densidad (g/cm³)
                </th>
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  Profundidad (cm)
                </th>
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  Flujo CO₂ (µmol/m²/s)
                </th>
                <th className="text-left py-2 text-emerald-700/60 font-medium">
                  CO₂ secuestrado (t/ha)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.sensors.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-emerald-50 hover:bg-emerald-50/50"
                >
                  <td className="py-2 font-medium">{s.id}</td>
                  <td>{s.soilCarbon.organicCarbonPercent}%</td>
                  <td>{s.soilCarbon.bulkDensity}</td>
                  <td>{s.soilCarbon.depth}</td>
                  <td>{s.soilCarbon.co2Flux}</td>
                  <td className="font-semibold text-emerald-700">
                    {calculateCO2Sequestration(
                      s.soilCarbon.organicCarbonPercent,
                      s.soilCarbon.bulkDensity,
                      s.soilCarbon.depth,
                    ).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-emerald-600/50 mt-3 text-center">
          * Fórmula: CO₂ (t/ha) = (COS% × Densidad × Profundidad) / 10 × 3.67
        </p>
      </div>

      {/* Detalle de sensores (se mantiene igual) */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
        <h3 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-oliveGreen" />
          Estado de sensores
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-oliveGreen/10">
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  Sensor
                </th>
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  Humedad
                </th>
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  pH
                </th>
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  Temp.
                </th>
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  Pb (mg/kg)
                </th>
                <th className="text-left py-2 text-oliveGreen/60 font-medium">
                  PM2.5
                </th>
              </tr>
            </thead>
            <tbody>
              {data.sensors.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                >
                  <td className="py-2 font-medium">{s.id}</td>
                  <td>{s.humidity}%</td>
                  <td>{s.ph}</td>
                  <td>{s.temperature}°C</td>
                  <td>{s.heavyMetals.lead}</td>
                  <td>{s.airQuality.pm25} µg/m³</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leyenda de riesgos (se mantiene igual) */}
      <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl p-4 border border-oliveGreen/10 flex flex-wrap items-center gap-4 text-xs">
        <span className="font-medium text-charcoalGray">
          Niveles de riesgo:
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Bajo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Alto
        </span>
        <span className="text-oliveGreen/50 ml-auto">
          Basado en umbrales de referencia
        </span>
      </div>
    </div>
  );
}
