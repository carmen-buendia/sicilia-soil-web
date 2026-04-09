## 🌱 Sicilia Soil (Public Demo - Work in Progress 🚧)

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-WORK%20IN%20PROGRESS-orange?style=for-the-badge&logo=githubactions&logoColor=white" alt="Work in Progress" />
  <img src="https://img.shields.io/github/last-commit/carmen-buendia/sicilia-soil-web?color=blue&logo=github" alt="Last Commit" />
  <img src="https://img.shields.io/badge/License-NC%20OSL-blue?style=flat-square" alt="License" />
</p>

<p align="center">
  <strong>🌾 Syntropic Permaculture · 🍄 Mycology · 🌿 Esparto · 🤖 IoT</strong>
</p>

---

## ✨ Live Demo (Work in Progress 🚧)

> **Note:** This project is under active development. Features and UI are continuously evolving.

| Environment          | URL                                                                                  |
| :------------------- | :----------------------------------------------------------------------------------- |
| **Main Demo**        | [https://sicilia-soil-web.vercel.app](https://sicilia-soil-web.vercel.app)           |
| **Alternative Demo** | [https://sicilia-soil-web-xg8w.vercel.app](https://sicilia-soil-web-xg8w.vercel.app) |

This is a public demo of **Sicilia Soil**, a real-time monitoring system for syntropic permaculture in Sicily.

> "It's not just a garden, it's an ecosystem that designs itself with the help of fungi and technology"

---

## 🍄 What can you see in this demo?

- 📊 **Main Dashboard** with real-time statistics
- 🌾 **Esparto Harvest Calendar** (Sicilian traditional knowledge)
- 🍄 **Mycology with native mushrooms** (Cardonchello, Cardoncello di Nebrodi)
- 📈 **Interactive charts** with HighCharts
- 🎨 **Responsive design** with Tailwind CSS

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

## 📁 Project Structure

```
sicilia-soil-web/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx            # Main dashboard
│   ├── layout.tsx          # Root layout with navbar & footer
│   ├── globals.css         # Global styles & Tailwind
│   ├── design/             # Syntropic design page
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
│   └── client/             # WebSocket client (sicilia-soil-client.ts)
│
├── public/                 # Static assets (favicon, SVG images)
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

---

## 🧭 Navigation

| Route            | Page             | Description                              |
| :--------------- | :--------------- | :--------------------------------------- |
| `/`              | Dashboard        | Garden overview                          |
| `/design`        | Syntropic Design | Layer strategy & symbiotic relationships |
| `/analysis`      | Analysis         | Historical charts & statistics           |
| `/mycology`      | Mycology         | Native Sicilian mushroom tracking        |
| `/humedad`       | Humidity         | Soil moisture by zone                    |
| `/temperatura`   | Temperature      | Temperature by zone                      |
| `/luz`           | Sunlight         | Light levels by zone                     |
| `/configuration` | Settings         | System configuration                     |

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

This project is licensed under the **NC OSL (Non-Commercial Open Source License)**.

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

If you are a company, startup, or entrepreneur wanting to use **Sicilia Soil** in your product or service, please contact me to acquire a commercial license:

📧 **carmenbuendiafullstack@gmail.com**

---

## 📬 Contact

| Via          | Link                                                     |
| :----------- | :------------------------------------------------------- |
| **GitHub**   | [carmen-buendia](https://github.com/carmen-buendia)      |
| **LinkedIn** | [carmen-buendía](https://linkedin.com/in/carmen-buendía) |
| **Email**    | carmenbuendiafullstack@gmail.com                         |

---

## ⭐ About the Full Project

This demo is a public version of **Sicilia Soil**. The complete codebase (including backend, WebSockets, and shared packages) is maintained in a private repository.

---

<p align="center">
  <strong>Made with ❤️, 🌱, 🍄 and 🌾 in Sicily</strong><br />
  <sub>Where technology and nature design the future together</sub>
</p>
```
