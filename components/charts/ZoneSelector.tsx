interface ZoneSelectorProps {
  zones: { id: string; name: string; icon: string }[];
  selectedZone: string;
  onZoneChange: (zoneId: string) => void;
}

export const ZoneSelector = ({ zones, selectedZone, onZoneChange }: ZoneSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onZoneChange(zone.id)}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            selectedZone === zone.id
              ? 'bg-[#B43F2B] text-white shadow-md'
              : 'bg-white text-[#2C2C2C] hover:bg-[#F5D7B3] border border-[#E6B17E]/30'
          }`}
        >
          <span>{zone.icon}</span>
          <span className="font-medium">{zone.name}</span>
        </button>
      ))}
    </div>
  );
};