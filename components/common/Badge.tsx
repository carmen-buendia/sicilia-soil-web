interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "info" | "default";
  size?: "sm" | "md";
}

const variants = {
  success: "bg-oliveGreen/10 text-oliveGreen border-oliveGreen/20",
  warning: "bg-wheatGold/10 text-wheatGold border-wheatGold/20",
  info: "bg-sicilian-red/10 text-sicilian-red border-sicilian-red/20",
  default: "bg-oliveGreen/5 text-charcoalGray border-oliveGreen/10",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
};

export const Badge = ({
  children,
  variant = "default",
  size = "md",
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
