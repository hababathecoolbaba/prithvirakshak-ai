import { Link } from "react-router";
import { MapPin, Navigation, Phone, Volume2 } from "lucide-react";

export default function Emergency() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300">
          DEMO RED ALERT
        </div>

        <h1 className="mt-6 text-4xl font-black sm:text-6xl">
          SEVERE WEATHER WARNING
        </h1>

        <div className="mt-3 text-2xl font-black text-red-300">
          ACT NOW
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="text-xs font-bold text-amber-300">
            SIMULATED FOR PROTOTYPE — NOT A REAL EMERGENCY ALERT
          </div>

          <div className="mt-7 space-y-6">
            <Info title="WHAT?" value="Demo severe thunderstorm" />
            <Info title="WHERE?" value="Prototype Jaipur test area" />
            <Info title="WHEN?" value="Demo risk window: 30–60 minutes" />
            <Info
              title="ACTION?"
              value="Follow official instructions and avoid exposed areas during severe weather."
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="flex items-center gap-3 rounded-2xl bg-cyan-400 p-5 font-bold text-slate-950">
            <MapPin />
            Find Shelter
          </button>

          <button className="flex items-center gap-3 rounded-2xl bg-slate-800 p-5 font-bold">
            <Navigation />
            Lower-Risk Route
          </button>

          <button className="flex items-center gap-3 rounded-2xl bg-slate-800 p-5 font-bold">
            <Phone />
            Emergency Contacts
          </button>

          <button className="flex items-center gap-3 rounded-2xl bg-slate-800 p-5 font-bold">
            <Volume2 />
            Listen to Instructions
          </button>
        </div>

        <Link to="/" className="mt-8 inline-block text-sm text-slate-400">
          ? Back
        </Link>
      </div>
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <div className="text-xs font-bold tracking-widest text-cyan-300">
        {title}
      </div>
      <div className="mt-1 text-lg">{value}</div>
    </div>
  );
}

