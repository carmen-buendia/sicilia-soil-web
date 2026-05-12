"use client";

import { Download } from "lucide-react";
import type { DataPoint } from "@/lib/types/common.types";

interface DataTableProps {
  zones: Array<{
    id: string;
    name: string;
    icon: string;
    data: DataPoint[];
  }>;
  unit: string;
}

export function DataTable({ zones, unit }: DataTableProps) {
  const firstZone = zones[0];
  const allDates = firstZone?.data?.map((d) => d.timestamp) || [];
  const recentDates = allDates.slice(-10).reverse();

  const exportToCSV = () => {
    const headers = ["Fecha", ...zones.map((z) => z.name)];
    const rows = recentDates.map((date) => [
      date,
      ...zones.map((zone) => {
        const point = zone.data.find((d) => d.timestamp === date);
        return point ? `${point.value}${unit}` : "-";
      }),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `datos-historicos-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-offWhite rounded-xl p-6 shadow-lg border border-oliveGreen/15">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-charcoalGray flex items-center gap-2">
          Datos históricos detallados
        </h2>
        <button
          onClick={exportToCSV}
          className="text-sm text-oliveGreen hover:text-oliveGreen/80 flex items-center gap-1 transition-colors"
        >
          <Download className="w-4 h-4" />
          Descargar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-oliveGreen/15">
              <th className="text-left py-3 px-4 text-oliveGreen font-medium">
                Fecha
              </th>
              {zones.map((zone) => (
                <th
                  key={zone.id}
                  className="text-left py-3 px-4 text-oliveGreen font-medium"
                >
                  {zone.icon} {zone.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentDates.map((date, index) => (
              <tr
                key={index}
                className="border-b border-oliveGreen/10 hover:bg-oliveGreen/5 transition-colors"
              >
                <td className="py-2 px-4 text-charcoalGray/70">{date}</td>
                {zones.map((zone) => {
                  const point = zone.data.find((d) => d.timestamp === date);
                  return (
                    <td
                      key={zone.id}
                      className="py-2 px-4 font-medium text-charcoalGray"
                    >
                      {point?.value.toFixed(1)}
                      {unit}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
