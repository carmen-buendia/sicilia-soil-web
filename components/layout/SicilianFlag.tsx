/**
 * Sicilian flag component (Trinacria)
 * Displays the traditional Sicilian symbol with red and yellow colors
 *
 * @example
 * <SicilianFlag size="small" />
 * <SicilianFlag size="large" className="mx-2" />
 */
interface SicilianFlagProps {
  size?: "small" | "large";
  className?: string;
}

export const SicilianFlag = ({ size = "small", className = "" }) => {
  const sizeClass = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const triangleSize = size === "small" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {/* Fondo rojo/amarillo de la bandera siciliana */}
      <div className="absolute inset-0 bg-gradient-to-r from-sicilia-red to-sicilia-yellow rounded-full"></div>
      {/* Trinacria blanca */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${triangleSize}`}
      >
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
      </div>
    </div>
  );
};

/**
 * Simple text version of the Sicilian flag badge
 * Used in compact spaces like navbar
 */
export const SicilianFlagSimple = () => (
  <span className="font-bold text-yellow-600 bg-red-600 px-2 py-1 rounded text-xs">
    SICILIA SOIL
  </span>
);
