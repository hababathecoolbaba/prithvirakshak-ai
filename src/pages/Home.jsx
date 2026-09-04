import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Bot,
  Cloud,
  CloudLightning,
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

const shortcuts = [
  ["Live Forecast", "/nowcast", Radio],
  ["Weather Risk", "/alerts", Siren],
  ["Live Risk Map", "/map", Map],
  ["Lower-Risk Route", "/safe-route", Navigation],
  ["Find Shelter", "/shelters", Shield],
  ["Ask Prithvi AI", "/assistant", Bot],
];

export default function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("Jaipur");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCity("Jaipur");
  }, []);

  async function loadCity(city) {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function search(event) {
    event.preventDefault();

    const city = query.trim();

    if (!city) return;

    navigate(`/location/${encodeURIComponent(city)}`);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );

          setWeather(data);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission was not granted.");
        setLoading(false);
      }
    );
  }

  const current = weather?.current;
  const risk = weather?.risk;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <section className="grid-background border-b border-slate-800">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
                LIVE WEATHER · OPEN-METEO
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Live Hyper-Local
                <span className="text-cyan-300">
                  {" "}Weather Intelligence.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-slate-400 sm:text-lg">
                Current conditions and forecast data for locations worldwide.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={useMyLocation}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
                >
                  <MapPin size={18} />
                  Use My Location
                </button>

                <Link
                  to="/nowcast"
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold"
                >
                  Hourly Forecast
                </Link>
              </div>

              <form
                onSubmit={search}
                className="mt-7 flex max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
              >
                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Enter city or place"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
                />

                <button className="flex items-center gap-2 bg-slate-800 px-5 font-semibold text-cyan-300">
                  <Search size={17} />
                  Search
                </button>
              </form>

              {error && (
                <div className="mt-4 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-7">
              {loading && (
                <div className="text-slate-400">
                  Loading live weather...
                </div>
              )}

              {weather && !loading && (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-widest text-slate-500">
                        LIVE LOCATION
                      </div>

                      <div className="mt-2 text-xl font-bold">
                        {weather.location.displayName ||
                          weather.location.name}
                      </div>
                    </div>

                    <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                      LIVE
                    </div>
                  </div>

                  <div className="my-7 border-y border-slate-800 py-7">
                    <div className="text-5xl font-black">
                      {Math.round(current.temperature_2m)}°C
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

                  <div className="grid grid-cols-2 gap-4 text-sm">
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

                  <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
                    <div className="text-xs text-slate-500">
                      PRITHVIRAKSHAK FORECAST RISK
                    </div>

                    <div className="mt-1 text-xl font-black text-cyan-300">
                      {risk.level} · {risk.action}
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Forecast-based prototype indicator, not an official warning.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {weather && (
          <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-8">
            <div className="text-sm font-bold text-cyan-300">
              LIVE WEATHER
            </div>

            <h2 className="mt-2 text-3xl font-black">
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
                  current.precipitationProbability != null
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
                  current.visibilityKm != null
                    ? `${current.visibilityKm.toFixed(1)} km`
                    : "N/A"
                }
              />
            </div>

            {risk.thunderstorm && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-orange-400/30 bg-orange-400/10 p-4 text-orange-200">
                <CloudLightning />
                Thunderstorm conditions appear in the forecast.
              </div>
            )}
          </section>
        )}

        <section className="mx-auto max-w-[1500px] px-5 pb-20 lg:px-8">
          <h2 className="text-3xl font-black">
            Disaster Intelligence
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shortcuts.map(([name, path, Icon]) => (
              <Link
                key={path}
                to={path}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <Icon className="text-cyan-300" />

                <div className="mt-5 font-bold">
                  {name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingAssistant />
    </div>
  );
}

function WeatherCard({ icon: Icon, name, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <Icon size={29} className="text-cyan-300" />

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
