interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
}

export const StatsCard = ({ value, label, icon, subtext }: StatsCardProps) => {
  return (
    <div className="bg-offWhite rounded-2xl p-6 shadow-sm border border-oliveGreen/15 hover:shadow-md hover:border-wheatGold/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-oliveGreen/70 font-medium">{label}</p>
          <p className="text-3xl font-bold text-charcoalGray mt-1">{value}</p>
          {subtext && (
            <p className="text-xs text-oliveGreen/50 mt-2">{subtext}</p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-oliveGreen/10 to-wheatGold/10 rounded-xl text-oliveGreen">
          {icon}
        </div>
      </div>
    </div>
  );
};
