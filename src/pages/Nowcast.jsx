import { useState } from "react";

import {
  CloudRain,
  MapPin,
  Search,
  Thermometer,
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

export default function Nowcast() {
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

      const data =
        await getWeatherByCoords(
          coords.latitude,
          coords.longitude,
          {
            name:
              "Current GPS Location",

            displayName:
              "Current GPS Location",
          }
        );

      setWeather(data);
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

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          LIVE HOURLY FORECAST
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Weather Timeline
        </h1>

        <button
          onClick={enableGPS}
          className="mt-7 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
        >
          <MapPin size={17} />
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
            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-7 text-slate-400">
              Choose a location to load the
              hourly forecast.
            </div>
          )}

        {error && (
          <div className="mt-6 text-red-500">
            {error}
          </div>
        )}

        {weather && (
          <>
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="font-bold text-cyan-400">
                {weather.location
                  ?.displayName ||
                  "Selected Location"}
              </div>

              <div className="mt-3 text-3xl font-black">
                {weather.current.condition}
              </div>

              <div className="mt-1 text-slate-400">
                Current{" "}
                {weather.current.temperature_2m}
                °C
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {weather.hourly
                .slice(0, 12)
                .map((hour) => (
                  <div
                    key={hour.time}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-black">
                          {new Date(
                            hour.time
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit",
                            }
                          )}
                        </div>

                        <div className="mt-1 text-sm text-cyan-400">
                          {hour.condition}
                        </div>
                      </div>

                      <div className="text-2xl font-black">
                        {hour.temperature}
                        °C
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-400">
                      <div>
                        <CloudRain className="mb-2 text-cyan-400" size={16} />
                        Rain{" "}
                        {hour.precipitationProbability}
                        %
                      </div>

                      <div>
                        <Wind className="mb-2 text-cyan-400" size={16} />
                        {hour.windSpeed}
                        {" "}km/h
                      </div>

                      <div>
                        <Thermometer className="mb-2 text-cyan-400" size={16} />
                        Humidity{" "}
                        {hour.humidity}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
