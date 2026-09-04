import { useEffect, useState } from "react";

import {
  MapPin,
  Search,
} from "lucide-react";

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  searchLocation,
} from "../lib/weather";

import {
  getGPSPosition,
} from "../lib/locationLinks";

export default function LiveMap() {
  const [query, setQuery] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const [error, setError] =
    useState("");

  async function enableGPS() {
    try {
      const coords =
        await getGPSPosition();

      setSelected({
        latitude:
          coords.latitude,

        longitude:
          coords.longitude,

        name:
          "Current GPS Location",
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function search(event) {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      const location =
        await searchLocation(
          query.trim()
        );

      setSelected(location);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const center = selected
    ? [
        selected.latitude,
        selected.longitude,
      ]
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-4xl font-black">
          Live Map
        </h1>

        <p className="mt-2 text-slate-400">
          Choose a location before opening
          the map.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={enableGPS}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            <MapPin size={18} />
            Enable GPS
          </button>

          <form
            onSubmit={search}
            className="flex flex-1 overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
          >
            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search city"
              className="min-w-0 flex-1 bg-transparent px-4 outline-none"
            />

            <button className="bg-slate-800 px-5 text-cyan-400">
              <Search />
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}

        {!selected && (
          <div className="mt-8 flex min-h-[500px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 text-center text-slate-400">
            No location selected.
          </div>
        )}

        {selected && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800">
            <MapContainer
              center={center}
              zoom={12}
              className="h-[600px] w-full"
            >
              <Recenter
                center={center}
              />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <CircleMarker
                center={center}
                radius={12}
                pathOptions={{
                  color: "#06b6d4",
                }}
              >
                <Popup>
                  {selected.displayName ||
                    selected.name}
                </Popup>
              </CircleMarker>
            </MapContainer>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Recenter({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);

  return null;
}
