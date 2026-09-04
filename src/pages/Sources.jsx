import {
  Database,
  Map,
  Radio,
  Satellite,
  Users,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const sources = [
  ["Official Weather Warnings", "IMD / authorized warning systems", Radio],
  ["Radar Information", "Operational radar feeds when available", Radio],
  ["Satellite Observations", "Authorized satellite products", Satellite],
  ["Weather Stations", "Verified observation networks", Database],
  ["Geospatial Information", "Terrain, roads and infrastructure data", Map],
  ["Citizen Reports", "Unverified until corroborated or authority reviewed", Users],
];

export default function Sources() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          DATA TRANSPARENCY
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Data Sources
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          Production warnings should clearly identify their source, freshness,
          validation status and whether information is official, AI-generated
          or citizen-reported.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map(([title, detail, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <Icon className="text-cyan-300" />

              <div className="mt-4 font-bold">
                {title}
              </div>

              <div className="mt-2 text-sm leading-6 text-slate-400">
                {detail}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <div className="font-bold text-amber-200">
            Prototype Data Policy
          </div>

          <p className="mt-2 text-sm leading-6 text-amber-100/70">
            No simulated weather information on this prototype should be interpreted
            as a live emergency warning.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

