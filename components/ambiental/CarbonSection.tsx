"use client";

import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Trees, Gauge, Droplet, Activity, AlertTriangle } from "lucide-react";

// Datos mock de carbono en el suelo
const mockCarbonData = [
  {
    id: "zona1",
    name: "Parcela Norte",
    value: 2.5,
    bulkDensity: 1.2,
    depth: 30,
    co2Flux: 3.2,
    status: "good" as const,
    trend: [3.0, 2.8, 2.7, 2.6, 2.5, 2.4, 2.5],
  },
  {
    id: "zona2",
    name: "Parcela Sur",
    value: 1.8,
    bulkDensity: 1.3,
    depth: 25,
    co2Flux: 2.8,
    status: "warning" as const,
    trend: [2.0, 1.9, 1.8, 1.7, 1.6, 1.7, 1.8],
  },
  {
    id: "zona3",
    name: "Olivar",
    value: 3.0,
    bulkDensity: 1.1,
    depth: 35,
    co2Flux: 4.0,
    status: "good" as const,
    trend: [3.5, 3.3, 3.2, 3.1, 3.0, 3.0, 3.0],
  },
  {
    id: "zona4",
    name: "Jardín de Hierbas",
    value: 2.2,
    bulkDensity: 1.25,
    depth: 28,
    co2Flux: 2.5,
    status: "good" as const,
    trend: [2.5, 2.4, 2.3, 2.2, 2.2, 2.1, 2.2],
  },
];

const MetricCard = ({
  icon: Icon,
  title,
  value,
  unit,
  status,
  subtext,
}: {
  icon: any;
  title: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "danger";
  subtext?: string;
}) => {
  const statusColor =
    status === "good"
      ? "text-green-600 bg-green-50 border-green-200"
      : status === "warning"
        ? "text-yellow-600 bg-yellow-50 border-yellow-200"
        : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className={`rounded-xl p-4 border shadow-sm ${statusColor}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">
            {value.toFixed(1)}
            <span className="text-sm font-normal ml-1 opacity-60">{unit}</span>
          </p>
          {subtext && <p className="text-xs opacity-60 mt-1">{subtext}</p>}
        </div>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
    </div>
  );
};

export default function CarbonSection() {
  const [carbonData] = useState(mockCarbonData);

  const calculateCO2 = (cos: number, density: number, depth: number) => {
    const carbonStored = (cos * density * depth) / 10;
    return carbonStored * 3.67;
  };

  const avgCos =
    carbonData.reduce((acc, c) => acc + c.value, 0) / carbonData.length;
  const avgCo2Flux =
    carbonData.reduce((acc, c) => acc + c.co2Flux, 0) / carbonData.length;
  const avgCo2Sequestration =
    carbonData.reduce(
      (acc, c) => acc + calculateCO2(c.value, c.bulkDensity, c.depth),
      0,
    ) / carbonData.length;

  // Gráficos (estáticos)
  const cosChartOptions = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 250,
    },
    title: {
      text: "Carbono Orgánico del Suelo (COS)",
      style: { fontSize: "14px", fontWeight: "bold" },
    },
    xAxis: {
      categories: carbonData.map((c) => c.name),
    },
    yAxis: {
      title: { text: "COS (%)" },
    },
    series: [
      {
        name: "COS",
        data: carbonData.map((c) => c.value),
        color: "#2d5a27",
        dataLabels: { enabled: true, format: "{y}%" },
      },
    ],
    credits: { enabled: false },
  };

  const co2ChartOptions = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 250,
    },
    title: {
      text: "CO₂ Secuestrado",
      style: { fontSize: "14px", fontWeight: "bold" },
    },
    xAxis: {
      categories: carbonData.map((c) => c.name),
    },
    yAxis: {
      title: { text: "t CO₂/ha" },
    },
    series: [
      {
        name: "CO₂ secuestrado",
        data: carbonData.map((c) =>
          calculateCO2(c.value, c.bulkDensity, c.depth),
        ),
        color: "#22c55e",
        dataLabels: { enabled: true, format: "{y} t/ha" },
      },
    ],
    credits: { enabled: false },
  };

  const fluxChartOptions = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 200,
    },
    title: {
      text: "Flujo de CO₂ (últimos 7 días)",
      style: { fontSize: "14px", fontWeight: "bold" },
    },
    xAxis: {
      categories: [
        "hoy",
        "día -1",
        "día -2",
        "día -3",
        "día -4",
        "día -5",
        "día -6",
      ],
    },
    yAxis: {
      title: { text: "µmol/m²/s" },
    },
    series: carbonData.map((c) => ({
      name: c.name,
      data: c.trend.slice().reverse(),
      lineWidth: 2,
      marker: { radius: 3 },
    })),
    credits: { enabled: false },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
          <Trees className="w-6 h-6 text-emerald-600" />
          Carbono en el Suelo
        </h2>
        <span className="text-xs text-oliveGreen/60">
          {carbonData.length} puntos de monitoreo
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Trees}
          title="COS promedio"
          value={avgCos}
          unit="%"
          status="good"
          subtext="Rango óptimo: 2.5-4.5%"
        />
        <MetricCard
          icon={Activity}
          title="CO₂ secuestrado"
          value={avgCo2Sequestration}
          unit="t/ha"
          status="good"
          subtext="Captura de carbono en suelo"
        />
        <MetricCard
          icon={Gauge}
          title="Flujo CO₂"
          value={avgCo2Flux}
          unit="µmol/m²/s"
          status="good"
          subtext="Respiración del suelo"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Estado general"
          value={
            carbonData.filter((c) => c.status === "good").length ===
            carbonData.length
              ? 100
              : carbonData.filter((c) => c.status === "warning").length > 1
                ? 70
                : 50
          }
          unit="%"
          status={
            carbonData.filter((c) => c.status === "good").length ===
            carbonData.length
              ? "good"
              : "warning"
          }
          subtext={`${carbonData.filter((c) => c.status === "good").length}/${carbonData.length} zonas saludables`}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={cosChartOptions} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
          <HighchartsReact highcharts={Highcharts} options={co2ChartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10">
        <HighchartsReact highcharts={Highcharts} options={fluxChartOptions} />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-oliveGreen/10 overflow-x-auto">
        <h4 className="font-bold text-charcoalGray mb-3 flex items-center gap-2">
          <Droplet className="w-4 h-4 text-oliveGreen" />
          Detalle por zona
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-oliveGreen/10">
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                Zona
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                COS (%)
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                Densidad (g/cm³)
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                Profundidad (cm)
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                Flujo CO₂
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                CO₂ secuestrado (t/ha)
              </th>
              <th className="text-left py-2 text-oliveGreen/60 font-medium">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {carbonData.map((c) => {
              const co2 = calculateCO2(c.value, c.bulkDensity, c.depth);
              const statusColors = {
                good: "text-green-600",
                warning: "text-yellow-600",
                danger: "text-red-600",
              };
              return (
                <tr
                  key={c.id}
                  className="border-b border-oliveGreen/5 hover:bg-oliveGreen/5"
                >
                  <td className="py-2 font-medium">{c.name}</td>
                  <td>{c.value.toFixed(1)}%</td>
                  <td>{c.bulkDensity.toFixed(2)}</td>
                  <td>{c.depth}</td>
                  <td>{c.co2Flux.toFixed(1)} µmol/m²/s</td>
                  <td className="font-semibold text-emerald-600">
                    {co2.toFixed(1)}
                  </td>
                  <td
                    className={`font-semibold ${statusColors[c.status as keyof typeof statusColors]}`}
                  >
                    {c.status === "good"
                      ? "✅ Saludable"
                      : c.status === "warning"
                        ? "⚠️ Atención"
                        : "❌ Crítico"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
