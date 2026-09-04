import { useEffect, useState } from "react";
import {
  CloudRain,
  Search,
  Thermometer,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getWeatherByCity } from "../lib/weather";

export default function Nowcast() {
  const [query, setQuery] = useState("Jaipur");
  const [location, setLocation] = useState("Jaipur");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load(location);
  }, [location]);

  async function load(city) {
    setWeather(null);
    setError("");

    try {
      setWeather(await getWeatherByCity(city));
    } catch (err) {
      setError(err.message);
    }
  }

  function search(event) {
    event.preventDefault();

    if (query.trim()) {
      setLocation(query.trim());
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          LIVE HOURLY FORECAST
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Weather Timeline
        </h1>

        <p className="mt-3 text-slate-400">
          Live model forecast powered by Open-Meteo.
        </p>

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
            placeholder="Search city"
          />

          <button className="flex items-center gap-2 bg-cyan-400 px-5 font-bold text-slate-950">
            <Search size={17} />
            Search
          </button>
        </form>

        {error && (
          <div className="mt-6 text-red-300">
            {error}
          </div>
        )}

        {!weather && !error && (
          <div className="mt-8 text-slate-400">
            Loading live forecast...
          </div>
        )}

        {weather && (
          <>
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="text-sm font-bold text-cyan-300">
                {weather.location.displayName}
              </div>

              <div className="mt-3 text-3xl font-black">
                {weather.current.condition}
              </div>

              <div className="mt-1 text-slate-400">
                Current:{" "}
                {weather.current.temperature_2m}°C
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {weather.hourly.slice(0, 12).map((hour) => (
                <div
                  key={hour.time}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-black">
                        {new Date(
                          hour.time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      <div className="mt-1 text-sm text-cyan-300">
                        {hour.condition}
                      </div>
                    </div>

                    <div className="text-2xl font-black">
                      {hour.temperature}°C
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-400">
                    <div>
                      <CloudRain
                        size={16}
                        className="mb-2 text-cyan-300"
                      />
                      Rain {hour.precipitationProbability}%
                    </div>

                    <div>
                      <Wind
                        size={16}
                        className="mb-2 text-cyan-300"
                      />
                      {hour.windSpeed} km/h
                    </div>

                    <div>
                      <Thermometer
                        size={16}
                        className="mb-2 text-cyan-300"
                      />
                      Humidity {hour.humidity}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-slate-500">
              This is a numerical weather forecast, not radar-based
              official nowcasting or an official warning.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
