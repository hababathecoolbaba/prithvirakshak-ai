import {
  Building,
  Home,
  MapPin,
  School,
  Shield,
} from "lucide-react";

import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getGPSPosition,
  mapsSearchURL,
  openExternal,
} from "../lib/locationLinks";

const searches = [
  {
    title: "Emergency Shelters",
    query: "emergency shelter",
    icon: Shield,
  },

  {
    title: "Relief Camps",
    query: "relief camp",
    icon: Home,
  },

  {
    title: "Community Centres",
    query: "community centre",
    icon: Building,
  },

  {
    title: "Government Schools",
    query: "government school",
    icon: School,
  },
];

export default function Shelters() {
  const [coords, setCoords] =
    useState(null);

  const [status, setStatus] =
    useState("");

  async function enableGPS() {
    try {
      const position =
        await getGPSPosition();

      setCoords(position);

      setStatus(
        "Location enabled."
      );
    } catch (err) {
      setStatus(err.message);
    }
  }

  function search(query) {
    openExternal(
      mapsSearchURL(
        query,
        coords
      )
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          LIVE MAP SEARCH
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Find Shelter
        </h1>

        <p className="mt-3 text-slate-400">
          Search current map listings near
          your location.
        </p>

        <button
          onClick={enableGPS}
          className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
        >
          <MapPin size={18} />
          Enable GPS
        </button>

        {status && (
          <div className="mt-4 text-sm text-slate-400">
            {status}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {searches.map(
            ({
              title,
              query,
              icon: Icon,
            }) => (
              <button
                key={title}
                onClick={() =>
                  search(query)
                }
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left transition hover:border-cyan-400"
              >
                <Icon className="text-cyan-400" />

                <div className="mt-4 text-xl font-bold">
                  {title}
                </div>

                <div className="mt-2 text-sm text-cyan-400">
                  Search Nearby
                </div>
              </button>
            )
          )}
        </div>

        <p className="mt-7 text-xs text-slate-500">
          Confirm that a location is currently
          operating as an emergency shelter
          before travelling there.
        </p>
      </main>

      <Footer />
    </div>
  );
}
