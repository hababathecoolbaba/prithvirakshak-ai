import {
  MapPin,
  Navigation,
  Route,
} from "lucide-react";

import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getGPSPosition,
  mapsDirectionsURL,
  openExternal,
} from "../lib/locationLinks";

export default function SafeRoute() {
  const [destination, setDestination] =
    useState("");

  const [coords, setCoords] =
    useState(null);

  const [travelMode, setTravelMode] =
    useState("driving");

  const [status, setStatus] =
    useState("");

  async function enableGPS() {
    try {
      const position =
        await getGPSPosition();

      setCoords(position);

      setStatus(
        "Current location enabled."
      );
    } catch (err) {
      setStatus(err.message);
    }
  }

  function navigate(event) {
    event.preventDefault();

    if (!destination.trim()) {
      setStatus(
        "Enter a destination first."
      );

      return;
    }

    const url =
      mapsDirectionsURL({
        destination:
          destination.trim(),

        coords,

        travelMode,
      });

    openExternal(url);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          LIVE DIRECTIONS
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Route Planner
        </h1>

        <p className="mt-3 text-slate-400">
          Launch live Google Maps directions
          from your current location.
        </p>

        <button
          onClick={enableGPS}
          className="mt-7 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
        >
          <MapPin size={18} />
          Use My Location
        </button>

        <form
          onSubmit={navigate}
          className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <label className="text-xs font-bold text-slate-500">
            DESTINATION
          </label>

          <input
            value={destination}
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
            placeholder="Enter shelter, hospital, address or place"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none"
          />

          <div className="mt-5">
            <label className="text-xs font-bold text-slate-500">
              TRAVEL MODE
            </label>

            <select
              value={travelMode}
              onChange={(event) =>
                setTravelMode(
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
            >
              <option value="driving">
                Driving
              </option>

              <option value="walking">
                Walking
              </option>

              <option value="bicycling">
                Bicycling
              </option>
            </select>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 p-4 font-black text-slate-950">
            <Navigation />
            Open Live Directions
          </button>
        </form>

        {status && (
          <div className="mt-4 text-sm text-slate-400">
            {status}
          </div>
        )}

        <div className="mt-7 flex gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Route className="shrink-0 text-cyan-400" />

          <p className="text-sm leading-6 text-slate-400">
            Live road directions are available.
            Automatic weather-hazard avoidance
            requires a verified live road-closure
            and hazard feed, so the system does
            not claim that a route is guaranteed
            safer.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
