import {
  Activity,
  AlertTriangle,
  Bot,
  Radio,
  ShieldAlert,
  Users,
} from "lucide-react";

import AuthoritySidebar from "../components/AuthoritySidebar";

const metrics = [
  ["Critical Zones", "2", ShieldAlert],
  ["High-Risk Zones", "6", AlertTriangle],
  ["Active Incidents", "14", Activity],
  ["Unverified Reports", "9", Bot],
  ["Active Alerts", "4", Radio],
  ["Response Teams", "18", Users],
];

const incidents = [
  ["P0", "Flooding near hospital entrance", "Possible emergency-access obstruction"],
  ["P0", "Electrical hazard on major road", "Potential immediate life-safety risk"],
  ["P1", "Major underpass flooding", "High transport-disruption risk"],
  ["P2", "Local road waterlogging", "Localized mobility impact"],
];

export default function AuthorityDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] text-cyan-300">
              NATIONAL / STATE / DISTRICT DISASTER OPERATIONS
            </div>

            <h1 className="mt-3 text-4xl font-black">
              Authority Command Centre
            </h1>

            <p className="mt-2 text-slate-400">
              Operational decision-support dashboard using simulated prototype data.
            </p>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs font-bold text-amber-200">
            DEMO COMMAND DATA
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {metrics.map(([label, value, Icon]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <Icon size={20} className="text-cyan-300" />

              <div className="mt-4 text-3xl font-black">
                {value}
              </div>

              <div className="mt-1 text-xs text-slate-400">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="text-xs font-bold text-cyan-300">
              LIVE OPERATIONS
            </div>

            <h2 className="mt-2 text-2xl font-black">
              Operational Risk View
            </h2>

            <div className="relative mt-6 flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <div className="absolute h-80 w-80 rounded-full border border-cyan-400/10" />
              <div className="absolute h-56 w-56 rounded-full border border-cyan-400/10" />
              <div className="absolute h-36 w-36 rounded-full border border-cyan-400/10" />

              <div className="absolute left-[22%] top-[34%] h-16 w-16 rounded-full bg-red-500/20 ring-2 ring-red-500/40" />

              <div className="absolute right-[28%] top-[48%] h-24 w-24 rounded-full bg-orange-400/20 ring-2 ring-orange-400/40" />

              <div className="relative text-center">
                <Activity
                  className="mx-auto text-cyan-300"
                  size={42}
                />

                <div className="mt-4 font-bold">
                  Simulated Operations Map
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Operational layers connect here
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="text-xs font-bold text-cyan-300">
              INCIDENT PRIORITY QUEUE
            </div>

            <h2 className="mt-2 text-2xl font-black">
              Highest Priority
            </h2>

            <div className="mt-6 space-y-3">
              {incidents.map(([priority, title, reason]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-start gap-3">
                    <Priority value={priority} />

                    <div>
                      <div className="font-bold">
                        {title}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        AI reasoning: {reason}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Priority({ value }) {
  const styles = {
    P0: "border-red-500/30 bg-red-500/10 text-red-300",
    P1: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    P2: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    P3: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  };

  return (
    <span
      className={`rounded-lg border px-2 py-1 text-xs font-black ${styles[value]}`}
    >
      {value}
    </span>
  );
}

