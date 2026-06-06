# 📊 Commodity Price Dashboard — Next.js Frontend

> **Algo Architech Internship Task | Frontend Repository**

An interactive **Commodity Price Index Dashboard** built with **Next.js 14**, featuring a dynamic ApexCharts area chart, interval filtering (Daily / Monthly / Yearly), and a static broker overview table. Powered by React Query for intelligent data fetching and caching.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [Pages](#-pages)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** (App Router) | React framework with SSR/CSR |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **ApexCharts** + **react-apexcharts** | Interactive area chart |
| **@tanstack/react-query** | Data fetching, caching & revalidation |
| **Axios** | HTTP client (calls FastAPI backend) |
| **Lucide React** | Icon library |

---

## ✨ Features

- 📈 **Interactive Area Chart** — Smooth animated commodity price index chart powered by ApexCharts
- 🔘 **Interval Filter** — Toggle between Daily (last 30 readings), Monthly (full history), and Yearly (annual averages) views
- ⚡ **React Query Caching** — 5-minute stale time prevents redundant API calls
- 🛡️ **Loading & Error States** — Spinner while fetching, graceful error display on failure
- 🏦 **Broker Overview Table** — Static table showing Zerodha, Angel One, and Finvasia broker stats
- 🌐 **Navigation** — Full-featured Navbar with links to Dashboard, Products, Services, and Contact pages
- 📱 **Responsive Design** — Mobile-first layout using Tailwind CSS breakpoints

---

## 📁 Project Structure

```
algo-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — Navbar + QueryClientProvider
│   │   ├── page.tsx             # Dashboard page (main entry point)
│   │   ├── providers.tsx        # React Query client setup
│   │   ├── globals.css          # Global styles & CSS variables
│   │   ├── contact/page.tsx     # Contact page
│   │   ├── products/page.tsx    # Products page
│   │   └── services/page.tsx    # Services page
│   ├── components/
│   │   ├── chart/
│   │   │   ├── CommodityChart.tsx   # ApexCharts area chart with data helpers
│   │   │   └── FilterButtons.tsx    # Daily / Monthly / Yearly toggle buttons
│   │   ├── table/
│   │   │   └── UsersTable.tsx       # Static broker overview table
│   │   └── layout/
│   │       ├── Navbar.tsx           # Top navigation bar
│   │       └── DashboardHeader.tsx  # Dashboard page header
│   ├── context/
│   │   └── AuthContext.tsx          # Auth context (for future use)
│   ├── hooks/
│   │   └── useCommodities.ts    # React Query data fetching hook
│   ├── lib/
│   │   └── api.ts               # Axios instance → FastAPI backend
│   └── types/
│       └── css.d.ts             # CSS module type declarations
├── .env.local                   # Frontend environment variables (not committed)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18.x+ |
| npm | 8.x+ |

> ⚠️ **The FastAPI backend must be running** before starting the frontend. See [Algo-Architech-Backend](https://github.com/yashu1412/Algo-Architech-Backend).

### 1. Clone the Repository

```bash
git clone https://github.com/yashu1412/Algo-Architech-Frontend.git
cd Algo-Architech-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000/api` | Base URL of the FastAPI backend |

---

## ▶️ Running the App

```bash
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

> Make sure the backend is running at `http://localhost:8000` first, otherwise the chart will show an error state.

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Main dashboard — commodity chart + broker table |
| `/products` | Products overview page |
| `/services` | Services overview page |
| `/contact` | Contact page |

---

## 📊 Data Flow

```
Alpha Vantage API
      ↓
FastAPI Backend (port 8000)
      ↓  [HTTP via Axios]
React Query (useCommodities hook)
      ↓  [cached for 5 min]
CommodityChart Component
      ↓  [client-side aggregation]
ApexCharts Area Chart (Daily / Monthly / Yearly)
```

---

## 🤝 Related Repository

- **Backend API:** [Algo-Architech-Backend](https://github.com/yashu1412/Algo-Architech-Backend)

---

*Algo Architech | Internship Selection Task 2024*
