import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CloudRain,
  Search,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingAssistant from "../components/FloatingAssistant";

import { getWeatherByCity } from "../lib/weather";

export default function Alerts() {
  const [query, setQuery] = useState("Jaipur");
  const [location, setLocation] = useState("Jaipur");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeatherByCity(location)
      .then(setWeather)
      .catch((err) => setError(err.message));
  }, [location]);

  function search(event) {
    event.preventDefault();

    if (query.trim()) {
      setWeather(null);
      setError("");
      setLocation(query.trim());
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          LIVE FORECAST RISK
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Weather Risk Monitor
        </h1>

        <form
          onSubmit={search}
          className="mt-7 flex max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
        >
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
          />

          <button className="bg-cyan-400 px-5 text-slate-950">
            <Search />
          </button>
        </form>

        {error && (
          <div className="mt-6 text-red-300">
            {error}
          </div>
        )}

        {weather && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
            <div className="text-sm text-slate-400">
              {weather.location.displayName}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xl font-black text-cyan-300">
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
              {weather.risk.factors.map((factor) => (
                <div
                  key={factor}
                  className="flex gap-3 rounded-xl bg-slate-950 p-4"
                >
                  <AlertTriangle className="shrink-0 text-cyan-300" />
                  {factor}
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-950 p-5">
                <CloudRain className="text-cyan-300" />
                <div className="mt-3 text-sm text-slate-500">
                  Max rain probability · next 6h
                </div>
                <div className="mt-1 text-2xl font-black">
                  {weather.risk.maxRainProbability}%
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-5">
                <Wind className="text-cyan-300" />
                <div className="mt-3 text-sm text-slate-500">
                  Max wind gust · next 6h
                </div>
                <div className="mt-1 text-2xl font-black">
                  {Math.round(
                    weather.risk.maxWindGust
                  )}{" "}
                  km/h
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
              Forecast risk notice only. It is NOT an official IMD,
              MoES or government emergency warning.
            </div>
          </div>
        )}
      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
