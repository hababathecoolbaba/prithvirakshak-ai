import Header from "../components/Header";
import { Navigation } from "lucide-react";

export default function SafeRoute() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="text-4xl font-black">
          Lower-Risk Route
        </h1>

        <p className="mt-3 text-slate-400">
          Prototype route assessment based on simulated hazard zones.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <input
            placeholder="FROM: Current or entered location"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none"
          />

          <input
            placeholder="TO: Home, hospital, shelter..."
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none"
          />
        </div>

        <button className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">
          <Navigation size={18} />
          Analyse Routes
        </button>

        <div className="mt-9 space-y-4">
          <RouteCard
            status="AVOID"
            level="RED"
            reason="Simulated flood-risk zone"
          />
          <RouteCard
            status="CAUTION"
            level="ORANGE"
            reason="Demo severe weather approaching"
          />
          <RouteCard
            status="LOWER RISK"
            level="GREEN"
            reason="No simulated critical hazard detected"
          />
        </div>

        <div className="mt-7 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          A lower-risk route is not guaranteed to be safe. Follow official instructions and verified road closures.
        </div>
      </main>
    </div>
  );
}

function RouteCard({ status, level, reason }) {
  const colours = {
    RED: "text-red-300",
    ORANGE: "text-orange-300",
    GREEN: "text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className={`font-black ${colours[level]}`}>
        {status}
      </div>
      <div className="mt-2 text-slate-300">{reason}</div>
    </div>
  );
}

