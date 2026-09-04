import { useState } from "react";

import {
  AlertTriangle,
  CloudRain,
  MapPin,
  Search,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../lib/weather";

import {
  getGPSPosition,
} from "../lib/locationLinks";

export default function Alerts() {
  const [query, setQuery] =
    useState("");

  const [weather, setWeather] =
    useState(null);

  const [error, setError] =
    useState("");

  async function enableGPS() {
    setWeather(null);
    setError("");

    try {
      const coords =
        await getGPSPosition();

      setWeather(
        await getWeatherByCoords(
          coords.latitude,
          coords.longitude,
          {
            name:
              "Current GPS Location",

            displayName:
              "Current GPS Location",
          }
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function search(event) {
    event.preventDefault();

    if (!query.trim()) return;

    setWeather(null);
    setError("");

    try {
      setWeather(
        await getWeatherByCity(
          query.trim()
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          LIVE FORECAST RISK
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Weather Risk Monitor
        </h1>

        <button
          onClick={enableGPS}
          className="mt-7 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
        >
          <MapPin size={18} />
          Enable GPS
        </button>

        <form
          onSubmit={search}
          className="mt-5 flex max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
        >
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Or search a city"
            className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
          />

          <button className="bg-cyan-400 px-5 text-slate-950">
            <Search />
          </button>
        </form>

        {!weather &&
          !error && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
              Choose a location to calculate
              forecast risk.
            </div>
          )}

        {error && (
          <div className="mt-6 text-red-500">
            {error}
          </div>
        )}

        {weather && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
            <div className="text-sm text-slate-400">
              {weather.location
                ?.displayName ||
                "Selected Location"}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xl font-black text-cyan-400">
                {weather.risk.level}
              </div>

              <div>
                <div className="text-3xl font-black">
                  {weather.risk.action}
                </div>

                <div className="mt-1 text-slate-400">
                  {weather.current.condition}
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {weather.risk.factors.map(
                (factor) => (
                  <div
                    key={factor}
                    className="flex gap-3 rounded-xl bg-slate-950 p-4"
                  >
                    <AlertTriangle className="shrink-0 text-cyan-400" />
                    {factor}
                  </div>
                )
              )}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-950 p-5">
                <CloudRain className="text-cyan-400" />

                <div className="mt-3 text-sm text-slate-500">
                  Maximum rain probability
                  · next 6 hours
                </div>

                <div className="mt-1 text-2xl font-black">
                  {weather.risk.maxRainProbability}
                  %
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-5">
                <Wind className="text-cyan-400" />

                <div className="mt-3 text-sm text-slate-500">
                  Maximum wind gust · next
                  6 hours
                </div>

                <div className="mt-1 text-2xl font-black">
                  {Math.round(
                    weather.risk.maxWindGust
                  )}
                  {" "}km/h
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              This is weather-model risk
              analysis, not an official
              government warning.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
