import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ========== DATOS SIMULADOS (sin MongoDB) ==========

const simulatedZones = [
  {
    zone: "norte",
    temperature: 22.5,
    humidity: 65,
    light: 850,
    timestamp: new Date(),
  },
  {
    zone: "sur",
    temperature: 24.2,
    humidity: 58,
    light: 920,
    timestamp: new Date(),
  },
  {
    zone: "este",
    temperature: 23.1,
    humidity: 62,
    light: 890,
    timestamp: new Date(),
  },
  {
    zone: "oeste",
    temperature: 21.8,
    humidity: 68,
    light: 780,
    timestamp: new Date(),
  },
];

// ========== RUTAS API ==========

// GET /api/health - Comprobar que el backend vive
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Backend Sicilia Soil funcionando 🚀" });
});

// GET /api/zones - Datos simulados de zonas
app.get("/api/zones", (req: Request, res: Response) => {
  res.json(simulatedZones);
});

// GET /api/history/:zone - Histórico simulado
app.get("/api/history/:zone", (req: Request, res: Response) => {
  const { zone } = req.params;
  const limit = parseInt(req.query.limit as string) || 24;

  // Generar datos históricos simulados
  const history = Array.from({ length: limit }, (_, i) => ({
    zone,
    temperature: 20 + Math.random() * 5,
    humidity: 50 + Math.random() * 30,
    light: 700 + Math.random() * 300,
    timestamp: new Date(Date.now() - i * 3600000),
  }));

  res.json(history);
});

// POST /api/data - Recibir datos (solo simula y loguea)
app.post("/api/data", (req: Request, res: Response) => {
  const { zone, temperature, humidity, light } = req.body;

  if (
    !zone ||
    temperature === undefined ||
    humidity === undefined ||
    light === undefined
  ) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  console.log(
    `📊 Datos recibidos - Zona: ${zone}, Temp: ${temperature}°C, Hum: ${humidity}%, Luz: ${light}lux`,
  );
  res
    .status(201)
    .json({ message: "Datos recibidos (simulados)", data: req.body });
});

// ========== INICIAR SERVIDOR ==========
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponibles:`);
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/zones`);
  console.log(`   - GET  http://localhost:${PORT}/api/history/:zone`);
  console.log(`   - POST http://localhost:${PORT}/api/data`);
});
