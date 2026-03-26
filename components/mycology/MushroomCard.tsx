import { Badge } from "../common/Badge";

/**
 * Mushroom cultivation card component
 * Displays conditions and status for mushroom growing zones
 *
 * @example
 * <MushroomCard
 *   mushroom={{
 *     id: "oyster",
 *     name: "Oyster Mushroom",
 *     scientificName: "Pleurotus ostreatus",
 *     humidity: 85,
 *     temperature: 18,
 *     co2: 450,
 *     stage: "growth",
 *     harvestIn: "5 days"
 *   }}
 * />
 */
interface MushroomCardProps {
  mushroom: {
    id: string;
    name: string;
    scientificName: string;
    icon: string;
    location: string;
    humidity: number;
    temperature: number;
    co2: number;
    stage: "growth" | "fruiting" | "harvest";
    harvestIn: string;
    status: "optimal" | "excellent" | "good" | "ready";
  };
  onViewDetails?: (id: string) => void;
}

/**
 * Maps status to badge variant
 */
const getStatusVariant = (
  status: string,
): "success" | "warning" | "info" | "default" => {
  const variantMap: Record<string, any> = {
    optimal: "success",
    excellent: "success",
    good: "info",
    ready: "warning",
  };
  return variantMap[status] || "default";
};

/**
 * Maps growth stage to human-readable text
 */
const getStageText = (stage: string): string => {
  const stageMap: Record<string, string> = {
    growth: "Growing",
    fruiting: "Fruiting",
    harvest: "Ready to Harvest",
  };
  return stageMap[stage] || stage;
};

export const MushroomCard = ({
  mushroom,
  onViewDetails,
}: MushroomCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200 hover:border-red-300 transition-all hover:shadow-xl group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{mushroom.icon}</span>
        <Badge variant={getStatusVariant(mushroom.status)} size="sm">
          {mushroom.status}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700">
        {mushroom.name}
      </h3>
      <p className="text-xs text-gray-500 italic mb-2">
        {mushroom.scientificName}
      </p>

      {/* Location */}
      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
        <span>📍</span> {mushroom.location}
      </p>

      {/* Growing Conditions */}
      <div className="space-y-2 mb-4">
        {/* Humidity Bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Humidity</span>
            <span className="font-bold">{mushroom.humidity}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${mushroom.humidity}%` }}
            />
          </div>
        </div>

        {/* Temperature */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Temperature</span>
          <span className="font-bold">{mushroom.temperature}°C</span>
        </div>

        {/* CO2 Level */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">CO₂</span>
          <span className="font-bold">{mushroom.co2} ppm</span>
        </div>
      </div>

      {/* Harvest Information */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Harvest in</span>
          <span className="font-medium text-red-600">{mushroom.harvestIn}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Stage: {getStageText(mushroom.stage)}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onViewDetails?.(mushroom.id)}
        className="w-full mt-4 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};
