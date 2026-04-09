"use client";

import { useState } from "react";
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
} from "lucide-react";
import { SicilianFlag, SicilianFlagSimple } from "./SicilianFlag";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/humidity", label: "Humidity", icon: Droplets },
  { path: "/temperature", label: "Temperature", icon: Thermometer },
  { path: "/light", label: "Sunlight", icon: Sun },
  { path: "/analysis", label: "Analysis", icon: LineChart },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-sicilia-red/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-sicilia-red to-sicilia-yellow rounded-lg shadow-sm">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
                Sicilia Soil <span className="text-lg">🌱</span>
              </h1>
              <div className="text-xs text-text-secondary flex items-center gap-1">
                <SicilianFlag size="small" />
                Permaculture & Mycology
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-sicilia-red text-white shadow-sm"
                      : "text-text-secondary hover:bg-sicilia-red/5 hover:text-sicilia-red"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-text-secondary hover:bg-sicilia-red/5 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sicilia-red rounded-full"></span>
            </button>

            <div className="hidden md:flex items-center space-x-3 bg-sicilia-red/5 rounded-full pl-1 pr-4 py-1 border border-sicilia-red/20">
              <div className="w-8 h-8 bg-gradient-to-r from-sicilia-red to-sicilia-yellow rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Carmen</p>
                <p className="text-xs text-text-secondary">Sicily Garden</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:bg-sicilia-red/5 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sicilia-red/20">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg ${
                      isActive(item.path)
                        ? "bg-sicilia-red text-white"
                        : "text-text-secondary hover:bg-sicilia-red/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
