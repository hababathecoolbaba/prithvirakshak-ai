import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  CloudRain,
  Droplets,
  MapPin,
  Navigation,
  Shield,
  Thermometer,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getWeatherByCity } from "../lib/weather";

export default function LocationPage() {
  const { location = "Jaipur" } = useParams();

  const locationName = decodeURIComponent(location);

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setWeather(null);
    setError("");

    getWeatherByCity(locationName)
      .then(setWeather)
      .catch((err) => setError(err.message));
  }, [locationName]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
        <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
          LIVE · OPEN-METEO
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!weather && !error && (
          <div className="mt-8 text-slate-400">
            Loading live weather...
          </div>
        )}

        {weather && (
          <>
            <div className="mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <MapPin size={19} />
                  LIVE WEATHER
                </div>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  {weather.location.displayName}
                </h1>

                <p className="mt-3 text-xl text-slate-300">
                  {weather.current.condition}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-4">
                <div className="text-5xl font-black">
                  {Math.round(
                    weather.current.temperature_2m
                  )}
                  °C
                </div>

                <div className="mt-2 text-sm text-slate-300">
                  Feels like{" "}
                  {Math.round(
                    weather.current.apparent_temperature
                  )}
                  °C
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric
                icon={Droplets}
                title="Humidity"
                value={`${weather.current.relative_humidity_2m}%`}
              />

              <Metric
                icon={CloudRain}
                title="Rain Chance"
                value={
                  weather.current.precipitationProbability !=
                  null
                    ? `${weather.current.precipitationProbability}%`
                    : "N/A"
                }
              />

              <Metric
                icon={Wind}
                title="Wind"
                value={`${weather.current.wind_speed_10m} km/h`}
              />

              <Metric
                icon={Wind}
                title="Wind Gust"
                value={`${weather.current.wind_gusts_10m} km/h`}
              />
            </div>

            <section className="mt-10">
              <h2 className="text-3xl font-black">
                Next 24 Hours
              </h2>

              <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-800">
                <div className="min-w-[850px]">
                  {weather.hourly.map((hour) => (
                    <div
                      key={hour.time}
                      className="grid grid-cols-[160px_1fr_120px_120px_120px] border-b border-slate-800 bg-slate-900/60 px-5 py-4 text-sm last:border-b-0"
                    >
                      <div className="font-bold">
                        {new Date(
                          hour.time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      <div className="text-slate-300">
                        {hour.condition}
                      </div>

                      <div>
                        {hour.temperature}°C
                      </div>

                      <div>
                        Rain {hour.precipitationProbability}%
                      </div>

                      <div>
                        Gust {hour.windGusts} km/h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-3xl font-black">
                7-Day Forecast
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                {weather.daily.map((day) => (
                  <div
                    key={day.time}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                  >
                    <div className="text-sm font-bold">
                      {new Date(
                        `${day.time}T12:00:00`
                      ).toLocaleDateString([], {
                        weekday: "short",
                      })}
                    </div>

                    <div className="mt-3 text-sm text-cyan-300">
                      {day.condition}
                    </div>

                    <div className="mt-4 text-xl font-black">
                      {Math.round(day.maxTemperature)}°
                    </div>

                    <div className="text-sm text-slate-500">
                      {Math.round(day.minTemperature)}°
                    </div>

                    <div className="mt-4 text-xs text-slate-400">
                      Rain {day.precipitationProbability}%
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
              <div className="text-xs font-bold tracking-widest text-cyan-300">
                PRITHVIRAKSHAK RISK INDICATOR
              </div>

              <div className="mt-3 text-3xl font-black">
                {weather.risk.level} ·{" "}
                {weather.risk.action}
              </div>

              <div className="mt-5 space-y-2">
                {weather.risk.factors.map((factor) => (
                  <div
                    key={factor}
                    className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300"
                  >
                    {factor}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-amber-300">
                This is a forecast-based prototype risk indicator,
                not an official IMD or government warning.
              </p>
            </section>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                to="/safe-route"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <Navigation className="text-cyan-300" />
                Lower-Risk Route
              </Link>

              <Link
                to="/shelters"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <Shield className="text-cyan-300" />
                Nearby Shelters
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Metric({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <Icon className="text-cyan-300" />

      <div className="mt-4 text-xs text-slate-500">
        {title}
      </div>

      <div className="mt-1 text-xl font-black">
        {value}
      </div>
    </div>
  );
}
