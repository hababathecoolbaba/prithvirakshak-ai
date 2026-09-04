import {
  Ambulance,
  Flame,
  Hospital,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

import { useState } from "react";

import {
  getGPSPosition,
  mapsSearchURL,
  openExternal,
} from "../lib/locationLinks";

export default function Emergency() {
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
        "Location enabled for nearby-service searches."
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
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs font-black tracking-widest text-red-500">
          EMERGENCY ACCESS
        </div>

        <h1 className="mt-3 text-5xl font-black">
          Emergency Help
        </h1>

        <a
          href="tel:112"
          className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-red-600 p-6 text-2xl font-black text-white"
        >
          <Phone />
          CALL 112
        </a>

        <button
          onClick={enableGPS}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 p-5 font-black text-slate-950"
        >
          <MapPin />
          Enable Location
        </button>

        {status && (
          <div className="mt-4 text-sm text-slate-400">
            {status}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <EmergencyCard
            icon={Hospital}
            title="Nearest Hospital"
            onClick={() =>
              search("hospital")
            }
          />

          <EmergencyCard
            icon={Shield}
            title="Nearest Police"
            onClick={() =>
              search(
                "police station"
              )
            }
          />

          <EmergencyCard
            icon={Flame}
            title="Nearest Fire Service"
            onClick={() =>
              search(
                "fire station"
              )
            }
          />

          <EmergencyCard
            icon={Ambulance}
            title="Ambulance Services"
            onClick={() =>
              search(
                "ambulance service"
              )
            }
          />
        </div>
      </div>
    </main>
  );
}

function EmergencyCard({
  icon: Icon,
  title,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left"
    >
      <Icon className="text-red-500" />

      <div className="mt-4 font-black">
        {title}
      </div>

      <div className="mt-2 text-sm text-cyan-400">
        Open Map
      </div>
    </button>
  );
}
