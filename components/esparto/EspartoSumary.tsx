import { Sprout, Leaf, Droplets, Calendar } from "lucide-react";
import { Badge } from "../common/Badge";

/**
 * Esparto plant summary component
 * Displays key metrics for esparto grass (Stipa tenacissima) cultivation
 *
 * @example
 * <EspartoSummary data={espartoData} />
 */
interface EspartoData {
  general: {
    scientificName: string;
    health: number;
    nextHarvest: string;
  };
  growth: {
    phase: string;
    height: string;
    density: string;
    newShoots: number;
  };
  soil: {
    type: string;
    ph: number;
    moisture: number;
    nutrients: string;
  };
  harvest: {
    nextDate: string;
    estimatedYield: string;
    currentStock: string;
    quality: string;
  };
}

interface EspartoSummaryProps {
  data: EspartoData;
}

/**
 * Returns text color based on health percentage
 */
const getHealthColor = (health: number): string => {
  if (health >= 80) return "text-green-600";
  if (health >= 60) return "text-yellow-600";
  return "text-red-600";
};

export const EspartoSummary = ({ data }: EspartoSummaryProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Health Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Sprout className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-gray-900">Plant Health</h3>
        </div>
        <p
          className={`text-3xl font-bold ${getHealthColor(data.general.health)} mb-2`}
        >
          {data.general.health}%
        </p>
        <p className="text-sm text-gray-600 italic">
          {data.general.scientificName}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Next harvest: {data.general.nextHarvest}
        </p>
      </div>

      {/* Growth Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Leaf className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-gray-900">Growth Status</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">{data.growth.phase}</p>
        <p className="text-sm text-gray-600">Height: {data.growth.height}</p>
        <p className="text-sm text-gray-600">Density: {data.growth.density}</p>
        <p className="text-sm text-amber-600 mt-2">
          {data.growth.newShoots} new shoots
        </p>
      </div>

      {/* Soil Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Droplets className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-gray-900">Soil Condition</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">{data.soil.type}</p>
        <p className="text-sm text-gray-600">
          pH: {data.soil.ph} • Moisture: {data.soil.moisture}%
        </p>
        <p className="text-sm text-green-600 mt-2">
          Nutrients: {data.soil.nutrients}
        </p>
      </div>

      {/* Harvest Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Calendar className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-gray-900">Harvest</h3>
        </div>
        <p className="text-lg font-bold text-amber-700">
          {data.harvest.nextDate}
        </p>
        <p className="text-sm text-gray-600">
          Yield: {data.harvest.estimatedYield}
        </p>
        <p className="text-sm text-gray-600">
          Stock: {data.harvest.currentStock}
        </p>
        <Badge variant="success" size="sm" className="mt-2">
          Quality: {data.harvest.quality}
        </Badge>
      </div>
    </div>
  );
};
