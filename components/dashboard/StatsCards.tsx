interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
}

export const StatsCard = ({ value, label, icon, subtext }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#5F6B3D] font-medium">{label}</p>
          <p className="text-3xl font-bold text-[#2C2C2C] mt-1">{value}</p>
          {subtext && <p className="text-xs text-[#C4A27A] mt-2">{subtext}</p>}
        </div>
        <div className="p-3 bg-[#5F6B3D]/10 rounded-xl text-[#5F6B3D]">{icon}</div>
      </div>
    </div>
  );
};