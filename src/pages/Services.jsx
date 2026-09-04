import { useState } from "react";

import {
  Ambulance,
  Building2,
  Flame,
  Hospital,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getGPSPosition,
  mapsSearchURL,
  openExternal,
} from "../lib/locationLinks";

const services = [
  {
    name: "Hospitals",
    query: "hospital",
    icon: Hospital,
  },

  {
    name: "Police",
    query: "police station",
    icon: Shield,
  },

  {
    name: "Fire Services",
    query: "fire station",
    icon: Flame,
  },

  {
    name: "Ambulance Services",
    query: "ambulance service",
    icon: Ambulance,
  },

  {
    name: "Disaster Response",
    query:
      "disaster management office",
    icon: Building2,
  },
];

export default function Services() {
  const [coords, setCoords] =
    useState(null);

  const [status, setStatus] =
    useState("");

  async function enableGPS() {
    try {
      const location =
        await getGPSPosition();

      setCoords(location);

      setStatus(
        "Location enabled."
      );
    } catch (err) {
      setStatus(err.message);
    }
  }

  function openService(query) {
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

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          LIVE EMERGENCY SERVICES
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Emergency Services
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Open nearby services using your
          current location.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={enableGPS}
            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            <MapPin size={18} />
            Enable GPS
          </button>

          <a
            href="tel:112"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-black text-white"
          >
            <Phone size={18} />
            Call 112
          </a>
        </div>

        {status && (
          <div className="mt-4 text-sm text-slate-400">
            {status}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({
              name,
              query,
              icon: Icon,
            }) => (
              <button
                key={name}
                onClick={() =>
                  openService(query)
                }
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left transition hover:border-cyan-400"
              >
                <Icon className="text-cyan-400" />

                <div className="mt-5 text-xl font-bold">
                  {name}
                </div>

                <div className="mt-3 text-sm font-bold text-cyan-400">
                  View Nearby
                </div>
              </button>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
