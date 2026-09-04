import { useState } from "react";
import { Link } from "react-router";

import {
  Bot,
  Cloud,
  CloudRain,
  Droplets,
  Gauge,
  Map,
  MapPin,
  Navigation,
  Radio,
  Search,
  Shield,
  Siren,
  Thermometer,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import FloatingAssistant from "../components/FloatingAssistant";
import Footer from "../components/Footer";

import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../lib/weather";

import {
  getGPSPosition,
} from "../lib/locationLinks";

export default function Home() {
  const [query, setQuery] = useState("");

  const [weather, setWeather] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function searchCity(event) {
    event.preventDefault();

    const city = query.trim();

    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const data =
        await getWeatherByCity(city);

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function enableGPS() {
    setLoading(true);
    setError("");

    try {
      const coords =
        await getGPSPosition();

      const data =
        await getWeatherByCoords(
          coords.latitude,
          coords.longitude,
          {
            name: "Current Location",
            displayName:
              "Current GPS Location",
            latitude:
              coords.latitude,
            longitude:
              coords.longitude,
          }
        );

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const current = weather?.current;

  const shortcuts = [
    [
      "Live Forecast",
      "/nowcast",
      Radio,
    ],

    [
      "Weather Risk",
      "/alerts",
      Siren,
    ],

    [
      "Live Map",
      "/map",
      Map,
    ],

    [
      "Route Planner",
      "/safe-route",
      Navigation,
    ],

    [
      "Find Shelter",
      "/shelters",
      Shield,
    ],

    [
      "Ask Prithvi AI",
      "/assistant",
      Bot,
    ],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <section className="grid-background border-b border-slate-800">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-500">
                LIVE WEATHER · OPEN-METEO
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Hyper-Local
                <span className="text-cyan-500">
                  {" "}Weather Intelligence.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-slate-400 sm:text-lg">
                Choose your location or enable GPS
                to load current weather and forecasts.
              </p>

              <div className="mt-8">
                <button
                  onClick={enableGPS}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
                >
                  <MapPin size={18} />
                  Enable GPS
                </button>
              </div>

              <form
                onSubmit={searchCity}
                className="mt-5 flex max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
              >
                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value
                    )
                  }
                  placeholder="Enter city or place"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
                />

                <button className="flex items-center gap-2 bg-slate-800 px-5 font-bold text-cyan-400">
                  <Search size={17} />
                  Search
                </button>
              </form>

              {error && (
                <div className="mt-4 text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-7">
              {!weather &&
                !loading && (
                  <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                    <MapPin
                      size={44}
                      className="text-cyan-400"
                    />

                    <h2 className="mt-5 text-2xl font-black">
                      No location selected
                    </h2>

                    <p className="mt-2 max-w-sm text-sm text-slate-400">
                      Search for a location or
                      enable GPS to load live
                      weather.
                    </p>
                  </div>
                )}

              {loading && (
                <div className="flex min-h-[340px] items-center justify-center text-slate-400">
                  Loading live weather...
                </div>
              )}

              {weather &&
                !loading &&
                current && (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs tracking-widest text-slate-500">
                          SELECTED LOCATION
                        </div>

                        <div className="mt-2 text-xl font-bold">
                          {weather.location
                            ?.displayName ||
                            weather.location
                              ?.name ||
                            "Current Location"}
                        </div>
                      </div>

                      <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-500">
                        LIVE
                      </div>
                    </div>

                    <div className="my-7 border-y border-slate-800 py-7">
                      <div className="text-5xl font-black">
                        {Math.round(
                          current.temperature_2m
                        )}
                        °C
                      </div>

                      <div className="mt-2 text-xl font-bold">
                        {current.condition}
                      </div>

                      <div className="mt-2 text-sm text-slate-400">
                        Feels like{" "}
                        {Math.round(
                          current.apparent_temperature
                        )}
                        °C
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Info
                        title="Humidity"
                        value={`${current.relative_humidity_2m}%`}
                      />

                      <Info
                        title="Rain"
                        value={`${current.rain} mm`}
                      />

                      <Info
                        title="Wind"
                        value={`${Math.round(
                          current.wind_speed_10m
                        )} km/h`}
                      />

                      <Info
                        title="Wind Gust"
                        value={`${Math.round(
                          current.wind_gusts_10m
                        )} km/h`}
                      />

                      <Info
                        title="Cloud Cover"
                        value={`${current.cloud_cover}%`}
                      />

                      <Info
                        title="Pressure"
                        value={`${Math.round(
                          current.pressure_msl
                        )} hPa`}
                      />
                    </div>

                    {weather.risk && (
                      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
                        <div className="text-xs text-slate-500">
                          FORECAST RISK
                        </div>

                        <div className="mt-1 text-xl font-black text-cyan-400">
                          {weather.risk.level}
                          {" · "}
                          {weather.risk.action}
                        </div>

                        <p className="mt-2 text-xs text-slate-500">
                          Forecast-based risk
                          analysis. Official
                          warnings remain the
                          responsibility of
                          government authorities.
                        </p>
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>
        </section>

        {weather &&
          current && (
            <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-8">
              <h2 className="text-3xl font-black">
                Current Conditions
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                <WeatherCard
                  icon={Thermometer}
                  name="Temperature"
                  value={`${current.temperature_2m}°C`}
                />

                <WeatherCard
                  icon={Droplets}
                  name="Humidity"
                  value={`${current.relative_humidity_2m}%`}
                />

                <WeatherCard
                  icon={CloudRain}
                  name="Rain Chance"
                  value={
                    current.precipitationProbability !=
                    null
                      ? `${current.precipitationProbability}%`
                      : "N/A"
                  }
                />

                <WeatherCard
                  icon={Wind}
                  name="Wind"
                  value={`${current.wind_speed_10m} km/h`}
                />

                <WeatherCard
                  icon={Cloud}
                  name="Cloud Cover"
                  value={`${current.cloud_cover}%`}
                />

                <WeatherCard
                  icon={Gauge}
                  name="Visibility"
                  value={
                    current.visibilityKm !=
                    null
                      ? `${current.visibilityKm.toFixed(
                          1
                        )} km`
                      : "N/A"
                  }
                />
              </div>
            </section>
          )}

        <section className="mx-auto max-w-[1500px] px-5 pb-20 lg:px-8">
          <h2 className="text-3xl font-black">
            Disaster Intelligence
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shortcuts.map(
              ([name, path, Icon]) => (
                <Link
                  key={path}
                  to={path}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
                >
                  <Icon className="text-cyan-400" />

                  <div className="mt-5 font-bold">
                    {name}
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingAssistant />
    </div>
  );
}

function WeatherCard({
  icon: Icon,
  name,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <Icon
        size={29}
        className="text-cyan-400"
      />

      <div className="mt-5 font-bold">
        {name}
      </div>

      <div className="mt-1 text-sm text-slate-400">
        {value}
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <div className="text-xs text-slate-500">
        {title}
      </div>

      <div className="mt-1 font-medium">
        {value}
      </div>
    </div>
  );
}
