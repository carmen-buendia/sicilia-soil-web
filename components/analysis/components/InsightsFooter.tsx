"use client";

export function InsightsFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-oliveGreen/10">
      <div className="grid md:grid-cols-4 gap-4 text-sm">
        <div className="bg-oliveGreen/5 rounded-lg p-4 border border-oliveGreen/10">
          <h4 className="font-bold text-oliveGreen mb-2">
            Insights destacados
          </h4>
          <p className="text-charcoalGray/70">
            La humedad en el olivar ha bajado un 12% esta semana
          </p>
        </div>
        <div className="bg-oliveGreen/5 rounded-lg p-4 border border-oliveGreen/10">
          <h4 className="font-bold text-oliveGreen mb-2">Recomendación</h4>
          <p className="text-charcoalGray/70">
            Aumentar riego en zonas con tendencia negativa
          </p>
        </div>
        <div className="bg-oliveGreen/5 rounded-lg p-4 border border-oliveGreen/10">
          <h4 className="font-bold text-oliveGreen mb-2">Mejor rendimiento</h4>
          <p className="text-charcoalGray/70">
            Huerta de Tomates: +5% vs promedio
          </p>
        </div>
        <div className="bg-wheatGold/5 rounded-lg p-4 border border-wheatGold/10">
          <h4 className="font-bold text-wheatGold mb-2">Alerta</h4>
          <p className="text-charcoalGray/70">Revisar sensor en zona Compost</p>
        </div>
      </div>
    </footer>
  );
}
