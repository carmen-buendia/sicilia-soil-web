import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variants = {
  primary:
    "bg-oliveGreen text-offWhite hover:bg-oliveGreen/90 shadow-sm shadow-oliveGreen/20",
  secondary:
    "bg-wheatGold text-charcoalGray hover:bg-wheatGold/90 shadow-sm shadow-wheatGold/20",
  outline: "border-2 border-oliveGreen text-oliveGreen hover:bg-oliveGreen/5",
  ghost: "text-oliveGreen hover:bg-oliveGreen/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-base rounded-xl",
  lg: "px-6 py-3 text-lg rounded-xl",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-[1.02] active:scale-[0.98]"
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
