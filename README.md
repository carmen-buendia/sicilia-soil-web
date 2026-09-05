# 🌱 Sicilia Soil – Public Demo (Work in Progress 🚧)

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-WORK%20IN%20PROGRESS-orange?style=for-the-badge&logo=githubactions&logoColor=white" alt="Work in Progress" />
  <img src="https://img.shields.io/badge/License-NC%20OSL-blue?style=flat-square" alt="License" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/HighCharts-0081CB?style=for-the-badge&logo=highcharts&logoColor=white" alt="HighCharts" />
</p>

<p align="center">
  <strong>🌾 Syntropic Permaculture · 🍄 Mycology · 🌿 Esparto · 🤖 IoT</strong>
</p>

---

## ✨ Live Demo

> **Note:** This is a public demo of a larger private monorepo. Features are limited to frontend visualization.

| Environment | URL                                                                                  |
| :---------- | :----------------------------------------------------------------------------------- |
| **Demo**    | [https://sicilia-soil-web-xg8w.vercel.app](https://sicilia-soil-web-xg8w.vercel.app) |

This is a public demonstration of **Sicilia Soil**, a real-time monitoring system for syntropic permaculture in Sicily.

> "It's not just a garden, it's an ecosystem that designs itself with the help of fungi and technology"

---

## 🍄 What can you see in this demo?

- 📊 **Main Dashboard** with real-time statistics
- 🌾 **Esparto Harvest Calendar** (Sicilian traditional knowledge)
- 🍄 **Mycology with native mushrooms** (Cardonchello, Cardoncello di Nebrodi)
- 📈 **Interactive charts** with HighCharts
- 🎨 **Responsive design** with Tailwind CSS

---

## 🎯 Why this project exists

I built **Sicilia Soil** for three reasons:

1. **To explore real-time architectures** (Next.js + WebSockets + IoT simulation)
2. **To practice full-stack patterns** in a realistic, self-contained project
3. **To showcase my frontend expertise** in a public, non-NDA context

This demo is a **portfolio piece** that reflects how I structure, test, and deploy modern web applications.

---

## 🏗️ Technologies Used

| Technology       | Purpose            |
| :--------------- | :----------------- |
| **Next.js 14**   | React framework    |
| **React 18**     | UI components      |
| **TypeScript**   | Type safety        |
| **Tailwind CSS** | Responsive styling |
| **HighCharts**   | Data visualization |
| **Vercel**       | Deployment         |

---

## 📁 Project Structure (Demo)

```
sicilia-soil-web/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx            # Main dashboard
│   ├── layout.tsx          # Root layout with navbar & footer
│   ├── ambiental/          # Environmental Monitoring page
│   ├── analysis/           # Analysis page with charts
│   ├── mycology/           # Mycology page
│   ├── humedad/            # Humidity page
│   ├── temperatura/        # Temperature page
│   ├── luz/                # Sunlight page
│   └── configuration/      # Settings page
│
├── components/             # Reusable React components
│   ├── common/             # Badge, Button, LoadingSpinner
│   ├── charts/             # HighCharts (BaseChart, HumidityChart, etc.)
│   ├── dashboard/          # StatsCard, ZoneCard
│   ├── esparto/            # EspartoSummary
│   ├── layout/             # Navbar, SicilianFlag
│   └── mycology/           # MushroomCard
│
├── lib/                    # Utilities, types & clients
│   ├── types/              # TypeScript definitions (GardenZone, etc.)
│   ├── utils/              # Helper functions (formatRelativeTime, etc.)
│   └── client/             # WebSocket client (simulated data)
│
├── public/                 # Static assets
├── package.json
└── README.md
```

> **Note:** The complete codebase (including backend, WebSockets, shared packages, and CI/CD) is maintained in a private monorepo.

---

## 🧭 Navigation

| Route            | Page                     | Description                                               |
| :--------------- | :----------------------- | :-------------------------------------------------------- |
| `/`              | Dashboard                | Garden overview with environmental metrics                |
| `/ambiental`     | Environmental Monitoring | Heavy metals, air quality, water quality, soil pollutants |
| `/analysis`      | Analysis                 | Historical charts & statistics                            |
| `/mycology`      | Mycology                 | Native Sicilian mushroom tracking                         |
| `/humedad`       | Humidity                 | Soil moisture by zone                                     |
| `/temperatura`   | Temperature              | Temperature by zone                                       |
| `/luz`           | Sunlight                 | Light levels by zone                                      |
| `/configuration` | Configuration            | System configuration                                      |

---

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/carmen-buendia/sicilia-soil-web.git
cd sicilia-soil-web

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## ⚖️ License

This demo is licensed under the **NC OSL (Non-Commercial Open Source License)**.

| ✅ Permitted                      | ❌ Not Permitted         |
| :-------------------------------- | :----------------------- |
| Educational and research purposes | Commercial products      |
| Non-profit personal projects      | Commercial SaaS          |
| Community initiatives             | Internal corporate tools |
| Hackathons and workshops          | Any for-profit activity  |

**Conditions:**

- ✅ Must retain original author credit (`Copyright (c) 2026 Carmen Buendía`)
- ✅ Must share improvements under the same license

---

## 💼 Interested in Commercial Use?

If you are a company, startup, or entrepreneur wanting to use **Sicilia Soil** in your product or service, please contact me to acquire a commercial license.

📧 **carmenbuendiafullstack@gmail.com**

---

## 👩‍💻 Author

**Carmen Buendía** – Senior Frontend Architect & Full Stack Engineer

- [GitHub](https://github.com/carmen-buendia)
- [LinkedIn](https://linkedin.com/in/carmen-buendia)
- [Email](carmenbuendiafullstack@gmail.com)

_This demo represents my personal work. The full private monorepo includes backend, WebSockets, and shared packages._

---

## ⭐ About the Full Project

_Sicilia Soil_ is a complete monitoring system for syntropic permaculture. It includes:

- Real-time WebSocket server
- IoT sensor integration (Arduino)
- Shared packages for types and utilities
- CI/CD with GitHub Actions
- Commercial licensing options

This public demo showcases only the frontend visualization layer.

---

## 📬 Contact

| Via          | Link                                                     |
| :----------- | :------------------------------------------------------- |
| **GitHub**   | [carmen-buendia](https://github.com/carmen-buendia)      |
| **LinkedIn** | [carmen-buendía](https://linkedin.com/in/carmen-buendía) |
| **Email**    | carmenbuendiafullstack@gmail.com                         |

---

<p align="center">
  <strong>Made with ❤️, 🌱, 🍄 and 🌾 in Sicily</strong><br />
  <sub>Where technology and nature design the future together</sub>
</p>
