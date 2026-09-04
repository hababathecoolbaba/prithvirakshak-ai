import Header from "../components/Header";
import { MapPin, Navigation, Shield } from "lucide-react";

const shelters = [
  ["Demo Community Shelter A", "1.8 km", "Operational"],
  ["Demo School Relief Centre", "3.1 km", "Operational"],
  ["Demo Civic Shelter B", "4.6 km", "Status Unverified"],
];

export default function Shelters() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex items-center gap-3">
          <Shield className="text-cyan-300" />
          <h1 className="text-4xl font-black">
            Nearby Shelters
          </h1>
        </div>

        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          Prototype shelter information only. Operational status must be verified before production use.
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {shelters.map(([name, distance, status]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <MapPin className="text-cyan-300" />

              <h2 className="mt-4 text-xl font-bold">
                {name}
              </h2>

              <div className="mt-3 text-sm text-slate-400">
                Distance: {distance}
              </div>

              <div className="mt-1 text-sm text-slate-400">
                Status: {status}
              </div>

              <button className="mt-5 flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-sm font-bold">
                <Navigation size={16} />
                View Lower-Risk Route
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

