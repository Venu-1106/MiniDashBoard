# 🌍 MiniDashBoard

A responsive React + TypeScript dashboard displaying real-time world country data using the [REST Countries API](https://restcountries.com). Built as a collaborative group project using a feature-branch Git workflow.

---

## 👥 Team Members & Contributions

| Member | Branch | Files Handled |
|---|---|---|
| Gaurish Julka | `countryApi/Gaurish` | `countryApi.ts`, `Dashboard.tsx`, `ExtraCharts.tsx` |
| Venu Yelsani | `Venu` / `Charts/Venu` | `Chart.tsx`, `Skeleton.tsx` |
| Ruturaj Shimpi | `feature/kpi-card` | `KPICard.tsx` |
| Arpit Sharma | `Errorboundaries/arpit` | `ErrorBoundary.tsx` |

---

## 📁 Project Structure

```
MiniDashBoard/
├── public/
├── src/
│   ├── api/
│   │   ├── pages/
│   │   │   └── Dashboard.tsx       # Main dashboard page
│   │   └── countryApi.ts           # API fetch functions & helpers
│   ├── Chart.tsx                   # Population by region bar chart
│   ├── ErrorBoundary.tsx           # Error boundary wrapper with retry
│   ├── ExtraCharts.tsx             # Pie chart + Top countries bar chart
│   ├── KPICard.tsx                 # KPI metric card component
│   ├── Skeleton.tsx                # Shimmer loading skeletons
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✨ Features

- 🌐 **Live API Data** — Real-time data from REST Countries API (~250 countries)
- 📊 **Bar Chart** — Population by region using Recharts
- 🥧 **Pie Chart** — Region share of world population
- 🏆 **Top 10 Countries** — Horizontal bar chart of most populous countries
- 🃏 **KPI Cards** — Total countries, population, regions, most populous country
- ⏳ **Skeleton Loaders** — Shimmer placeholders while data loads
- 🛡️ **Error Boundary** — Gracefully handles component crashes with retry
- 🌙 **Dark Theme** — Navy dark UI with amber gold accents

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Recharts | Charts & data visualization |
| REST Countries API | Live country data source |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Venu-1106/MiniDashBoard.git

# 2. Navigate into the project
cd MiniDashBoard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🌿 Git Workflow

This project follows the **Feature Branch Workflow**:

```
main
 ├── countryApi/Gaurish     → countryApi.ts + Dashboard.tsx + ExtraCharts.tsx
 ├── Venu / Charts/Venu     → Chart.tsx + Skeleton.tsx
 ├── feature/kpi-card       → KPICard.tsx
 └── Errorboundaries/arpit  → ErrorBoundary.tsx
```

Each member worked on their own branch and submitted a **Pull Request** to merge into `main`. Conflicts were resolved via terminal before merging.

---

## 📡 API Reference

**Base URL:** `https://restcountries.com/v3.1`

| Endpoint | Description |
|---|---|
| `/all?fields=...` | Fetch all countries with selected fields |
| `/region/{region}` | Fetch countries by region |

### Helper Functions (`countryApi.ts`)

```typescript
fetchAllCountries()           // Fetches all ~250 countries
getPopulationByRegion()       // Groups countries by region, sums population
getTopCountries(n)            // Returns top N most populous countries
```

---

## 🖼️ Components

### `KPICard`
Displays a single metric with title, value, icon, subtitle and a colored left border accent.

```tsx
<KPICard
  title="Total Countries"
  value={250}
  icon="🏳️"
  subtitle="Recognised worldwide"
  accent="#f59e0b"
/>
```

### `Chart`
Bar chart showing population grouped by world region.

```tsx
<Chart data={regionData} title="Population by Region" />
```

### `ExtraCharts`
Two additional charts — a pie chart for region share and a horizontal bar chart for top countries.

```tsx
<RegionPieChart data={regionData} loading={loading} />
<TopCountriesBarChart countries={countries} loading={loading} topN={10} />
```

### `Skeleton`
Shimmer loading placeholders shown while API data is fetched.

```tsx
<KPICardSkeleton />
<ChartSkeleton />
```

### `ErrorBoundary`
Wraps components to catch runtime errors and show a fallback UI with a retry button.

```tsx
<ErrorBoundary>
  <Chart data={regionData} />
</ErrorBoundary>
```

---

## 🔧 Key Configuration

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["ES6", "ES2017", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### `.gitignore`
```
node_modules/
dist/
.env
```

---

## 📝 License

This project was built for educational purposes as part of a BCA Data Science group assignment at **Pillai College of Arts, Commerce & Science, Mumbai (2025-26)**.
