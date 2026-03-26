/**
 * Loading spinner component for async operations
 *
 * @example
 * <LoadingSpinner />
 * <LoadingSpinner size="lg" />
 */
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizes[size]} border-red-200 border-t-red-600 rounded-full animate-spin ${className}`}
      />
    </div>
  );
};
