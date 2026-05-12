import { Zone } from "../types/common.types";

export const siteConfig = {
  name: "Sicilia Soil",
  description: "Monitoreo de permacultura sintrópica en el Mediterráneo",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://sicilia-soil-web.vercel.app",
  ogImage: "https://sicilia-soil-web.vercel.app/og.jpg",
  links: {
    github: "https://github.com/carmen-buendia/sicilia-soil-web",
  },
  author: {
    name: "Carmen Buendía",
    email: "carmenbuendiafullstack@gmail.com",
    github: "https://github.com/carmen-buendia",
    linkedin: "https://linkedin.com/in/carmen-buendía",
  },
};

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
  timeout: 30000,
  retries: 3,
};

export const monitoringZones: Zone[] = [
  {
    id: "esparto",
    name: "Zona de Esparto",
    icon: "🌾",
    optimalHumidity: 70,
    optimalTemperature: 25,
    optimalLight: 70,
  },
  {
    id: "tomates",
    name: "Huerta de Tomates",
    icon: "🍅",
    optimalHumidity: 75,
    optimalTemperature: 28,
    optimalLight: 80,
  },
  {
    id: "olivar",
    name: "Olivar",
    icon: "🫒",
    optimalHumidity: 60,
    optimalTemperature: 30,
    optimalLight: 60,
  },
  {
    id: "compost",
    name: "Zona Compost",
    icon: "♻️",
    optimalHumidity: 50,
    optimalTemperature: 35,
    optimalLight: 40,
  },
  {
    id: "hierbas",
    name: "Jardín de Hierbas",
    icon: "🌿",
    optimalHumidity: 65,
    optimalTemperature: 26,
    optimalLight: 75,
  },
  {
    id: "agua",
    name: "Depósito de Agua",
    icon: "💧",
    optimalHumidity: 85,
    optimalTemperature: 22,
    optimalLight: 50,
  },
];

export const metrics = [
  {
    id: "moisture",
    name: "Humedad",
    icon: "💧",
    color: "oliveGreen",
    unit: "%",
  },
  {
    id: "temperature",
    name: "Temperatura",
    icon: "🌡️",
    color: "sicilian-red",
    unit: "°C",
  },
  { id: "light", name: "Luz Solar", icon: "☀️", color: "wheatGold", unit: "%" },
];

export const periods = [
  { id: "7", name: "7 días", days: 7 },
  { id: "15", name: "15 días", days: 15 },
  { id: "30", name: "30 días", days: 30 },
  { id: "90", name: "3 meses", days: 90 },
];
