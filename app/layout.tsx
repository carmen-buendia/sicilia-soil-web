"use client";

import { useState, useEffect } from "react";
// @ts-ignore
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Droplets,
  Thermometer,
  Sun,
  LineChart,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Sprout,
  Leaf,
  Layers,
  Flower2,
} from "lucide-react";
import { SicilianFlag } from "@/components/layout/SicilianFlag";
const navItems = [
  { id: "/", label: "Dashboard", icon: Home },
  { id: "/humidity", label: "Humedad", icon: Droplets },
  { id: "/temperature", label: "Temperatura", icon: Thermometer },
  { id: "/light", label: "Luz", icon: Sun },
  { id: "/analysis", label: "Análisis", icon: LineChart },
  { id: "/mycology", label: "Micología", icon: Leaf },
  { id: "/esparto", label: "Esparto", icon: Sprout },
  { id: "/design", label: "Diseño", icon: Layers },
  { id: "/configuration", label: "Configuración", icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Sicilia Soil - Permacultura Sintrópica en el Mediterráneo</title>
        <meta
          name="description"
          content="Monitoreo de huerto de permacultura sintrópica en la región del Mediterráneo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-offWhite text-charcoalGray">
        {/* Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-offWhite/98 backdrop-blur-xl shadow-xl border-b border-oliveGreen/15"
              : "bg-offWhite/85 backdrop-blur-md border-b border-oliveGreen/10"
          }`}
        >
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 group transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-oliveGreen via-sicilian-red to-wheatGold rounded-xl shadow-md">
                    <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-offWhite" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-wheatGold rounded-full ring-2 ring-offWhite animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base sm:text-xl font-bold">
                    <span className="text-charcoalGray">Sicilia</span>
                    <span className="text-sicilian-red ml-1">Soil</span>
                  </h1>
                  <div className="flex items-center gap-1 text-xs text-oliveGreen/70">
                    <SicilianFlag size="small" />
                    <span>Permacultura Sintrópica</span>
                    <Flower2 className="w-3 h-3" />
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1 bg-oliveGreen/5 backdrop-blur-sm rounded-full p-1 border border-oliveGreen/15">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.id);
                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      className={`flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-sm lg:text-base ${
                        active
                          ? "bg-oliveGreen text-offWhite shadow-md shadow-oliveGreen/30"
                          : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Right side buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="relative p-1.5 sm:p-2 rounded-full text-oliveGreen/60 hover:text-sicilian-red transition-all duration-300 hover:bg-oliveGreen/10">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-wheatGold rounded-full ring-2 ring-offWhite animate-pulse" />
                </button>

                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-oliveGreen/10 to-wheatGold/10 rounded-full pl-2 pr-4 py-1 border border-oliveGreen/20">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-offWhite" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-charcoalGray">
                    Carmen Buendía
                  </p>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-1.5 sm:p-2 rounded-xl text-oliveGreen hover:text-wheatGold transition-all duration-300 hover:bg-oliveGreen/10"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-oliveGreen/15">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.id);
                  return (
                    <Link
                      key={item.id}
                      href={item.id}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                        active
                          ? "bg-oliveGreen text-offWhite shadow-md"
                          : "text-charcoalGray/60 hover:bg-oliveGreen/10 hover:text-oliveGreen"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 bg-wheatGold rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Spacer para el navbar fijo */}
        <div className="h-14 sm:h-16 lg:h-20" />

        {/* Contenido principal */}
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-oliveGreen/5 to-offWhite border-t border-oliveGreen/15 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-oliveGreen to-wheatGold rounded-xl">
                <Sprout className="w-5 h-5 text-offWhite" />
              </div>
              <h3 className="text-xl font-bold text-charcoalGray">
                Sicilia Soil
              </h3>
            </div>
            <p className="text-oliveGreen/70">
              © {new Date().getFullYear()} - Permacultura Sintrópica en el
              Mediterráneo
            </p>
            <p className="text-oliveGreen/50 text-sm mt-2">
              Monitoreo inteligente para una agricultura regenerativa
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
