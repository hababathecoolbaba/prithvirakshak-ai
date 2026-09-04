import { Link } from "react-router";
import {
  AlertTriangle,
  Bot,
  CloudFog,
  CloudLightning,
  CloudRain,
  Flame,
  Hospital,
  Map,
  MapPin,
  Navigation,
  Radio,
  Shield,
  Siren,
  Waves,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import FloatingAssistant from "../components/FloatingAssistant";

const threats = [
  {
    name: "Rainfall",
    level: "High",
    icon: CloudRain,
  },
  {
    name: "Lightning",
    level: "Severe",
    icon: CloudLightning,
  },
  {
    name: "Wind",
    level: "Medium",
    icon: Wind,
  },
  {
    name: "Flood Risk",
    level: "Medium",
    icon: Waves,
  },
  {
    name: "Heat",
    level: "Low",
    icon: Flame,
  },
  {
    name: "Fog",
    level: "Low",
    icon: CloudFog,
  },
];

const shortcuts = [
  ["Live Risk Map", "/map", Map],
  ["Weather Nowcast", "/nowcast", Radio],
  ["Active Alerts", "/alerts", Siren],
  ["Lower-Risk Route", "/safe-route", Navigation],
  ["Find Shelter", "/shelters", Shield],
  ["Emergency Services", "/services", Hospital],
  ["Report Incident", "/report", MapPin],
  ["Ask Prithvi AI", "/assistant", Bot],
];

export default function Home() {
  function useLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(
          `Location permission granted.\nLatitude: ${position.coords.latitude.toFixed(
            4
          )}\nLongitude: ${position.coords.longitude.toFixed(4)}`
        );
      },
      () => {
        alert("Location permission was not granted.");
      }
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <section className="grid-background border-b border-slate-800">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300">
                SIMULATED FOR PROTOTYPE
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Know What's Coming
                <span className="text-cyan-300">
                  {" "}Before It Reaches You.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-slate-400 sm:text-lg">
                AI-powered hyper-local severe-weather intelligence for faster
                warnings and smarter disaster response.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={useLocation}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
                >
                  <MapPin size={18} />
                  Check My Area
                </button>

                <Link
                  to="/map"
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold"
                >
                  Open Live Map
                </Link>

                <Link
                  to="/alerts"
                  className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-5 py-3 font-semibold text-orange-300"
                >
                  Active Warnings
                </Link>
              </div>

              <div className="mt-7 flex max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                <input
                  placeholder="Enter city, district, village or PIN code"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
                />

                <button className="bg-slate-800 px-5 font-semibold text-cyan-300">
                  Search
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-7">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs tracking-widest text-slate-500">
                    CURRENT LOCATION
                  </div>

                  <div className="mt-2 text-xl font-bold">
                    Jaipur, Rajasthan
                  </div>
                </div>

                <div className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-black text-orange-300">
                  ORANGE
                </div>
              </div>

              <div className="my-7 border-y border-slate-800 py-7">
                <div className="text-xs tracking-widest text-slate-500">
                  YOUR CURRENT RISK
                </div>

                <div className="mt-3 text-4xl font-black text-orange-300">
                  ORANGE
                </div>

                <div className="mt-1 font-bold">
                  BE PREPARED
                </div>

                <div className="mt-4 text-lg">
                  Severe Thunderstorm
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <Info title="Expected" value="Demo 30-60 min" />
                <Info title="Confidence" value="High" />
                <Info title="Source" value="Prototype Simulation" />
                <Info title="AI Status" value="Demo Analysis" />
              </div>

              <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
                DEMO DATA - not a real-world weather warning.
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-8">
          <div className="text-sm font-bold text-cyan-300">
            HYPER-LOCAL INTELLIGENCE
          </div>

          <h2 className="mt-2 text-3xl font-black">
            Weather Threat Summary
          </h2>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {threats.map(({ name, level, icon: Icon }) => (
              <div
                key={name}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <Icon
                  size={31}
                  strokeWidth={1.8}
                  className="text-cyan-300"
                />

                <div className="mt-5 font-bold">
                  {name}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  {level}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-5 pb-20 lg:px-8">
          <h2 className="text-3xl font-black">
            Disaster Intelligence
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <FloatingAssistant />
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

