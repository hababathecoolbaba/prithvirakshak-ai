import { useState } from "react";

import Header from "../components/Header";
import FloatingAssistant from "../components/FloatingAssistant";

const timeline = [
  {
    time: "NOW",
    severity: "ORANGE",
    arrival: "Current",
    confidence: "High",
    message: "Demo storm cell detected west of Jaipur",
  },
  {
    time: "+15 MIN",
    severity: "ORANGE",
    arrival: "15 min",
    confidence: "High",
    message: "Projected movement toward eastern localities",
  },
  {
    time: "+30 MIN",
    severity: "RED",
    arrival: "30 min",
    confidence: "Medium",
    message: "Highest simulated severe-weather impact",
  },
  {
    time: "+60 MIN",
    severity: "ORANGE",
    arrival: "60 min",
    confidence: "Medium",
    message: "Storm system continuing eastward",
  },
  {
    time: "+120 MIN",
    severity: "YELLOW",
    arrival: "120 min",
    confidence: "Low",
    message: "Simulated hazard intensity decreasing",
  },
];

export default function Nowcast() {
  const [selected, setSelected] = useState(0);
  const item = timeline[selected];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300">
          SIMULATED NOWCAST
        </div>

        <h1 className="mt-5 text-4xl font-black">
          Hyper-Local Weather Nowcast
        </h1>

        <p className="mt-3 text-slate-400">
          Explore the simulated risk evolution over the next 120 minutes.
        </p>

        <div className="mt-9 grid grid-cols-5 gap-2">
          {timeline.map((entry, index) => (
            <button
              key={entry.time}
              onClick={() => setSelected(index)}
              className={`rounded-xl px-3 py-4 text-xs font-black sm:text-sm ${
                selected === index
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-slate-800 bg-slate-900 text-slate-300"
              }`}
            >
              {entry.time}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <div className="text-xs font-bold tracking-widest text-cyan-300">
              PROJECTED CONDITION
            </div>

            <h2 className="mt-4 text-3xl font-black">
              {item.message}
            </h2>

            <div className="mt-8 h-56 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <div className="relative flex h-full items-center justify-center">
                <div className="absolute h-48 w-48 rounded-full border border-cyan-400/20" />
                <div className="absolute h-32 w-32 rounded-full border border-cyan-400/20" />
                <div className="h-20 w-20 animate-pulse rounded-full bg-orange-400/20 ring-2 ring-orange-400/50" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
            <Info title="Severity" value={item.severity} />
            <Info title="Expected Arrival" value={item.arrival} />
            <Info title="Confidence" value={item.confidence} />
            <Info title="Storm Direction" value="East / North-East · Demo" />

            <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
              Forecast values shown here are simulated for the prototype.
            </div>
          </div>
        </div>
      </main>

      <FloatingAssistant />
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="border-b border-slate-800 py-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-1 font-bold">{value}</div>
    </div>
  );
}

