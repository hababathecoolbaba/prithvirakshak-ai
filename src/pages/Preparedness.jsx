import { useState } from "react";

import {
  CloudLightning,
  Flame,
  Mountain,
  Waves,
  Wind,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const guides = {
  Flood: {
    icon: Waves,

    before: [
      "Know nearby higher-ground routes.",
      "Keep essential contacts accessible.",
      "Follow official weather and local authority updates.",
    ],

    during: [
      "Avoid entering floodwater.",
      "Stay away from flooded roads and underpasses.",
      "Move to a safer location if authorities direct you to do so.",
    ],

    after: [
      "Return only when authorities say conditions are safe.",
      "Avoid damaged electrical infrastructure.",
      "Report blocked roads or hazards through official channels.",
    ],
  },

  Lightning: {
    icon: CloudLightning,

    before: [
      "Check weather forecasts before outdoor activities.",
      "Identify a safe indoor location.",
    ],

    during: [
      "Move indoors.",
      "Avoid exposed open areas.",
      "Stay away from isolated tall objects.",
    ],

    after: [
      "Continue checking official updates.",
      "Wait until conditions improve before resuming outdoor activity.",
    ],
  },

  Heatwave: {
    icon: Flame,

    before: [
      "Check heat forecasts.",
      "Plan outdoor activity for cooler periods when possible.",
    ],

    during: [
      "Stay hydrated.",
      "Use shade or indoor cooling where available.",
      "Follow local public-health guidance.",
    ],

    after: [
      "Continue hydration.",
      "Check on family members who may need assistance.",
    ],
  },

  "Strong Wind": {
    icon: Wind,

    before: [
      "Secure loose outdoor objects where it is safe to do so.",
      "Check weather warnings.",
    ],

    during: [
      "Stay indoors when severe winds are occurring.",
      "Keep away from damaged trees and power lines.",
    ],

    after: [
      "Avoid damaged structures.",
      "Report fallen lines or blocked roads to authorities.",
    ],
  },

  Landslide: {
    icon: Mountain,

    before: [
      "Follow local landslide and heavy-rain alerts.",
      "Know evacuation routes if your area is vulnerable.",
    ],

    during: [
      "Follow evacuation instructions immediately.",
      "Stay away from unstable slopes.",
    ],

    after: [
      "Return only after authorities confirm conditions are safe.",
      "Report damaged roads and infrastructure.",
    ],
  },
};

export default function Preparedness() {
  const [selected, setSelected] =
    useState("Flood");

  const guide = guides[selected];

  const GuideIcon = guide.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-400">
          DISASTER PREPAREDNESS
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Preparedness Guides
        </h1>

        <div className="mt-7 flex flex-wrap gap-2">
          {Object.keys(
            guides
          ).map((name) => (
            <button
              key={name}
              onClick={() =>
                setSelected(name)
              }
              className={`rounded-xl px-4 py-3 text-sm font-bold ${
                selected === name
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-slate-700 bg-slate-900"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
          <GuideIcon
            size={34}
            className="text-cyan-400"
          />

          <h2 className="mt-4 text-3xl font-black">
            {selected}
          </h2>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <Section
              title="BEFORE"
              items={guide.before}
            />

            <Section
              title="DURING"
              items={guide.during}
            />

            <Section
              title="AFTER"
              items={guide.after}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  title,
  items,
}) {
  return (
    <div className="rounded-2xl bg-slate-950 p-5">
      <div className="text-xs font-black text-cyan-400">
        {title}
      </div>

      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-slate-800 pb-3 last:border-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
