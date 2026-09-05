"use client";

import { useEffect } from "react";
// @ts-ignore
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Flower2, Sprout } from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";
// @ts-ignore

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>Sicilia Soil - Permacultura Sintrópica en el Mediterráneo</title>
        <meta
          name="description"
          content="Monitoreo de huerto de permacultura sintrópica en la región del Mediterráneo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-offWhite text-charcoalGray">
        {/* Navbar importado */}
        <Navbar />

        {/* Spacer para el navbar fijo */}
        <div className="h-14 sm:h-16 lg:h-20" />

        {/* Contenido principal */}
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {children}
        </main>

        {/* Footer mejorado */}
        <footer className="bg-gradient-to-b from-oliveGreen/5 to-transparent border-t border-oliveGreen/15 py-10 mt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-xl shadow-md">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray">
                Sicilia‑soil | La Isola Latente
              </h3>
            </div>
            <p className="text-oliveGreen/70 max-w-2xl mx-auto text-sm">
              Tecnología al servicio de la regeneración del territorio en el
              Geoparque Rocca di Cerere (Enna, Sicilia). Integramos diseño
              sintrópico, micología, esparto y agricultura 4.0.
            </p>
            <p className="text-oliveGreen/60 max-w-2xl mx-auto text-xs mt-2 italic">
              🌿 Inspirado en la agricultura sintrópica de{" "}
              <strong>Ernst Götsch</strong> – "Cuanto más intervenimos para
              acelerar la sucesión natural, más nos acerca a la abundancia."
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-oliveGreen/50">
              <SicilianFlag size="small" />
              <span>Permacultura Sintrópica en el Mediterráneo</span>
              <Flower2 className="w-3 h-3" />
            </div>
            <p className="text-xs text-oliveGreen/40 mt-6">
              © {new Date().getFullYear()} · Sicilia‑soil · Datos simulados
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
