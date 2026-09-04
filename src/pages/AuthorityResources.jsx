import { useState } from "react";

import {
  Ambulance,
  Bolt,
  Home,
  Shield,
  Truck,
  Waves,
} from "lucide-react";

import AuthoritySidebar from "../components/AuthoritySidebar";

const starterResources = [
  ["Ambulances", 12, "Available", Ambulance],
  ["Rescue Teams", 8, "Assigned", Shield],
  ["Water Pumps", 16, "Available", Waves],
  ["Road Clearance Teams", 6, "Deployed", Truck],
  ["Electrical Crews", 7, "Available", Bolt],
  ["Shelters", 9, "Operational", Home],
];

export default function AuthorityResources() {
  const [resources, setResources] = useState(
    starterResources
  );

  function deploy(index) {
    setResources((current) =>
      current.map((resource, itemIndex) =>
        itemIndex === index
          ? [
              resource[0],
              resource[1],
              "Deployed",
              resource[3],
            ]
          : resource
      )
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          RESPONSE CAPACITY
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Resource Management
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resources.map(
            ([name, count, status, Icon], index) => (
              <div
                key={name}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
              >
                <Icon className="text-cyan-300" />

                <div className="mt-5 text-3xl font-black">
                  {count}
                </div>

                <div className="mt-1 font-bold">
                  {name}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {status}
                </div>

                <button
                  onClick={() => deploy(index)}
                  className="mt-6 w-full rounded-xl bg-slate-800 py-3 text-sm font-bold"
                >
                  Deploy / Assign
                </button>
              </div>
            )
          )}
        </div>

        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
          <div className="text-xs font-bold text-cyan-300">
            AI RECOMMENDATION
          </div>

          <div className="mt-3 text-xl font-bold">
            Pre-position road-clearance and electrical crews near simulated high-risk transport corridors.
          </div>

          <div className="mt-2 text-sm text-slate-400">
            Recommendation requires human operational confirmation.
          </div>
        </div>
      </main>
    </div>
  );
}

