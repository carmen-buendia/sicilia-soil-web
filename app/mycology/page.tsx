'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Thermometer, Wind } from 'lucide-react';
import { MycologyChart } from '@/components/charts/MycologyChart';

// Datos simulados para setas autóctonas
const generateMushroomData = (days: number, baseValue: number, variance: number) => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = Math.sin(i / 7 * Math.PI) * variance;
    const randomVar = (Math.random() - 0.5) * variance;
    const value = baseValue + variation + randomVar;
    data.push({
      timestamp: date.toISOString().split('T')[0],
      value: Math.round(value * 10) / 10,
    });
  }
  return data;
};

const mushrooms = [
  {
    id: 'cardonchello',
    name: 'Cardonchello',
    scientificName: 'Pleurotus eryngii',
    icon: '🍄',
    description: 'Seta emblemática de Sicilia, crece sobre raíces de cañaheja',
    data: {
      humidity: generateMushroomData(30, 85, 5),
      temperature: generateMushroomData(30, 18, 3),
      co2: generateMushroomData(30, 450, 30),
    },
    optimal: { humidity: [75, 85], temperature: [16, 22], co2: [400, 600] },
  },
  {
    id: 'cardoncello-nebrodi',
    name: 'Cardoncello di Nebrodi',
    scientificName: 'Pleurotus nebrodensis',
    icon: '🍄',
    description: 'Endémica de los montes Nebrodi, Sicilia',
    data: {
      humidity: generateMushroomData(30, 80, 5),
      temperature: generateMushroomData(30, 20, 3),
      co2: generateMushroomData(30, 500, 40),
    },
    optimal: { humidity: [70, 85], temperature: [18, 24], co2: [400, 700] },
  },
  {
    id: 'prataiolo',
    name: 'Prataiolo Siciliano',
    scientificName: 'Agaricus bitorquis',
    icon: '🍄',
    description: 'Variedad autóctona del champiñón',
    data: {
      humidity: generateMushroomData(30, 75, 4),
      temperature: generateMushroomData(30, 16, 2),
      co2: generateMushroomData(30, 600, 50),
    },
    optimal: { humidity: [70, 80], temperature: [14, 18], co2: [500, 700] },
  },
  {
    id: 'niccolo',
    name: 'Níccolo',
    scientificName: 'Lactarius sanguifluus',
    icon: '🍄',
    description: 'Hongo micorrícico autóctono',
    data: {
      humidity: generateMushroomData(30, 82, 6),
      temperature: generateMushroomData(30, 19, 2),
      co2: generateMushroomData(30, 480, 35),
    },
    optimal: { humidity: [75, 85], temperature: [17, 21], co2: [400, 550] },
  },
];

export default function MicologiaPage() {
  const [selectedMushroom, setSelectedMushroom] = useState('cardonchello');
  const current = mushrooms.find(m => m.id === selectedMushroom)!;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#F5F0E6]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-[#F5D7B3] rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#2C2C2C]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#2C2C2C]">Micología</h1>
            <p className="text-[#5F6B3D]">Seguimiento de setas autóctonas sicilianas</p>
          </div>
        </div>

        {/* Selector de setas */}
        <div className="flex flex-wrap gap-3 mb-8">
          {mushrooms.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMushroom(m.id)}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                selectedMushroom === m.id
                  ? 'bg-[#B43F2B] text-white shadow-md'
                  : 'bg-white text-[#2C2C2C] hover:bg-[#F5D7B3] border border-[#E6B17E]/30'
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <div className="text-left">
                <p className="font-medium">{m.name}</p>
                <p className="text-xs opacity-80">{m.scientificName}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Descripción de la seta */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20 mb-8">
          <p className="text-gray-600 italic">"{current.description}"</p>
        </div>

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.humidity}
              metric="humidity"
              height={350}
            />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.temperature}
              metric="temperature"
              height={350}
            />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6B17E]/20 md:col-span-2">
            <MycologyChart
              mushroomName={current.name}
              data={current.data.co2}
              metric="co2"
              height={350}
            />
          </div>
        </div>

        {/* Condiciones óptimas */}
        <div className="mt-8 bg-gradient-to-r from-[#B43F2B]/10 to-[#E6B17E]/10 rounded-2xl p-6 border border-[#E6B17E]/30">
          <h3 className="text-lg font-bold text-[#2C2C2C] mb-4">Condiciones óptimas</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B43F2B]/20 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#B43F2B]" />
              </div>
              <div>
                <p className="text-sm text-[#5F6B3D]">Humedad ideal</p>
                <p className="font-medium text-[#2C2C2C]">
                  {current.optimal.humidity[0]}% - {current.optimal.humidity[1]}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B43F2B]/20 rounded-full flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-[#B43F2B]" />
              </div>
              <div>
                <p className="text-sm text-[#5F6B3D]">Temperatura ideal</p>
                <p className="font-medium text-[#2C2C2C]">
                  {current.optimal.temperature[0]}°C - {current.optimal.temperature[1]}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B43F2B]/20 rounded-full flex items-center justify-center">
                <Wind className="w-5 h-5 text-[#B43F2B]" />
              </div>
              <div>
                <p className="text-sm text-[#5F6B3D]">CO₂ ideal</p>
                <p className="font-medium text-[#2C2C2C]">
                  {current.optimal.co2[0]} - {current.optimal.co2[1]} ppm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}