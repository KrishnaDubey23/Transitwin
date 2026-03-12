# TransitWin

Smart urban mobility platform with route planning, supporting services booking, and multi-modal transit.

## Project Structure

```
hack/
├── frontend/     # Next.js app (Planner, Dashboard, Bookings, Maps)
├── backend/      # FastAPI (Auth, Routes, Trips, Stats)
└── dataset/      # Mumbai Metro & Train station CSVs
```

## Getting Started

### 1. Backend (FastAPI)

```bash
# From project root
npm run dev:backend
# Or manually:
cd backend
python -m uvicorn main:app --reload --port 8000
```

- Requires **MongoDB** (set `MONGODB_URL` in `backend/.env`)
- Set **ORS_API_KEY** for car/road routing; metro & train routes work without it

### 2. Frontend (Next.js)

```bash
# From project root
npm install
npm run dev
# Or from frontend folder:
cd frontend && npm install && npm run dev
```

1. Copy env file:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
2. Add **NEXT_PUBLIC_MAPBOX_TOKEN** for live maps (get free token at https://account.mapbox.com/access-tokens/)
   - Without it, a styled placeholder map is shown in the Planner
3. Ensure **NEXT_PUBLIC_API_URL=http://localhost:8000** (default)

Open [http://localhost:3000](http://localhost:3000)

### Maps

Maps appear in:
- **Smart Route Planner** – Mapbox map with route visualization
- **Traffic** – SVG-based traffic heatmap
- **Trip History** – SVG route replay

For the **Planner map**, add `NEXT_PUBLIC_MAPBOX_TOKEN` to `frontend/.env.local`. A placeholder with route preview is shown if the token is missing.

### Datasets

Station data is in `dataset/`:
- `mumbai_metro_stations_coords.csv` – Metro Line 1
- `mumbai_train_stations_coords.csv` – Western/Central line
