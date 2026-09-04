import {
  CheckCircle2,
  Server,
  TriangleAlert,
} from "lucide-react";

import AuthoritySidebar from "../components/AuthoritySidebar";

const systems = [
  ["Radar Feed", "Operational"],
  ["Weather API", "Operational"],
  ["Alert Engine", "Operational"],
  ["Notification Gateway", "Operational"],
  ["AI Engine", "Operational"],
  ["Citizen Report Gateway", "Degraded"],
];

export default function SystemHealth() {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          PLATFORM RESILIENCE
        </div>

        <h1 className="mt-3 text-4xl font-black">
          System Health
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {systems.map(([name, status]) => (
            <div
              key={name}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <div className="flex items-center justify-between">
                <Server className="text-cyan-300" />

                {status === "Operational" ? (
                  <CheckCircle2 className="text-emerald-300" />
                ) : (
                  <TriangleAlert className="text-yellow-300" />
                )}
              </div>

              <div className="mt-5 text-xl font-bold">
                {name}
              </div>

              <div
                className={`mt-2 text-sm ${
                  status === "Operational"
                    ? "text-emerald-300"
                    : "text-yellow-300"
                }`}
              >
                {status}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

