import {
  CloudRain,
  Droplets,
  MapPin,
  Wind,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getWeatherByCity,
} from "../lib/weather";

export default function LocationPage() {
  const { location = "" } =
    useParams();

  const locationName =
    decodeURIComponent(
      location
    );

  const [weather, setWeather] =
    useState(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!locationName) return;

    getWeatherByCity(
      locationName
    )
      .then(setWeather)
      .catch((err) =>
        setError(err.message)
      );
  }, [locationName]);

  if (!locationName) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        <main className="mx-auto max-w-4xl px-5 py-16 text-center">
          <MapPin
            size={44}
            className="mx-auto text-cyan-400"
          />

          <h1 className="mt-5 text-3xl font-black">
            No location selected
          </h1>

          <Link
            to="/home"
            className="mt-6 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            Choose Location
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        {error && (
          <div className="text-red-500">
            {error}
          </div>
        )}

        {!weather &&
          !error && (
            <div className="text-slate-400">
              Loading live weather...
            </div>
          )}

        {weather && (
          <>
            <div className="flex items-center gap-2 text-cyan-400">
              <MapPin size={19} />
              LIVE WEATHER
            </div>

            <h1 className="mt-3 text-4xl font-black">
              {weather.location
                ?.displayName ||
                locationName}
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric
                title="Temperature"
                value={`${weather.current.temperature_2m}°C`}
              />

              <Metric
                title="Humidity"
                value={`${weather.current.relative_humidity_2m}%`}
                icon={Droplets}
              />

              <Metric
                title="Rain Chance"
                value={`${weather.current.precipitationProbability ?? 0}%`}
                icon={CloudRain}
              />

              <Metric
                title="Wind"
                value={`${weather.current.wind_speed_10m} km/h`}
                icon={Wind}
              />
            </div>

            <section className="mt-10">
              <h2 className="text-3xl font-black">
                24-Hour Forecast
              </h2>

              <div className="mt-5 space-y-2">
                {weather.hourly.map(
                  (hour) => (
                    <div
                      key={hour.time}
                      className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:grid-cols-4"
                    >
                      <div className="font-bold">
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

                      <div>
                        {hour.condition}
                      </div>

                      <div>
                        {hour.temperature}
                        °C
                      </div>

                      <div>
                        Rain{" "}
                        {hour.precipitationProbability}
                        %
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Metric({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      {Icon && (
        <Icon className="text-cyan-400" />
      )}

      <div className="mt-3 text-xs text-slate-500">
        {title}
      </div>

      <div className="mt-1 text-xl font-black">
        {value}
      </div>
    </div>
  );
}
