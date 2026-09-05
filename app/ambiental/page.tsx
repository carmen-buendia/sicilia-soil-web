"use client";

import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import EnvironmentalDashboard from "@/components/ambiental/EnvironmentalDashboard";

// Onboarding (simplificado)
const Onboarding = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "🌱 Bienvenido al dashboard ambiental",
      desc: "Aquí podrás monitorizar en tiempo real la calidad del suelo, agua, aire y metales pesados.",
    },
    {
      title: "📊 Datos en tiempo real",
      desc: "Los datos se actualizan automáticamente cada 3 segundos para mostrarte las últimas mediciones.",
    },
    {
      title: "🔔 Alertas",
      desc: "Si algún parámetro supera los umbrales, verás una alerta visual para actuar a tiempo.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-oliveGreen/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-charcoalGray">
            {steps[step].title}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <span className="text-xl">✕</span>
          </button>
        </div>
        <p className="text-charcoalGray/80 mb-6">{steps[step].desc}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-oliveGreen/60">
            Paso {step + 1} de {steps.length}
          </span>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg border border-oliveGreen/20 text-oliveGreen hover:bg-oliveGreen/5"
              >
                Anterior
              </button>
            )}
            <button
              onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
                else onClose();
              }}
              className="px-4 py-2 rounded-lg bg-oliveGreen text-white hover:bg-oliveGreen/90"
            >
              {step === steps.length - 1 ? "¡Empezar!" : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AmbientalPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const hasSeen = localStorage.getItem("sintropico-onboarding-seen");
    if (hasSeen) setShowOnboarding(false);
  }, []);

  return (
    <div className="min-h-screen bg-offWhite flex flex-col">
      {showOnboarding && (
        <Onboarding
          onClose={() => {
            setShowOnboarding(false);
            localStorage.setItem("sintropico-onboarding-seen", "true");
          }}
        />
      )}

      {/* HEADER */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-oliveGreen/10 z-20 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <span className="font-bold text-charcoalGray">Sicilia Soil</span>
            <span className="text-xs text-oliveGreen/60 bg-oliveGreen/10 px-2 py-0.5 rounded-full">
              v2.0
            </span>
          </div>
          <button
            onClick={() => setShowOnboarding(true)}
            className="p-2 rounded-lg hover:bg-oliveGreen/10 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-oliveGreen" />
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
        <EnvironmentalDashboard />
      </div>

      {/* Pie de página */}
      <div className="flex-shrink-0 text-center text-xs text-oliveGreen/30 py-2 border-t border-oliveGreen/10">
        Sicilia Soil · Monitoreo Ambiental · Datos simulados para demostración
      </div>
    </div>
  );
}
