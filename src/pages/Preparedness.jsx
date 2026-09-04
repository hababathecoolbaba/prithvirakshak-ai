import { useState } from "react";
import { Volume2 } from "lucide-react";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

const guides = {
  Flood: {
    icon: "??",
    before: [
      "Know nearby higher-ground routes.",
      "Keep essential documents protected.",
      "Follow verified local warnings.",
    ],
    during: [
      "Avoid flooded roads and underpasses.",
      "Move away from low-lying areas when instructed.",
      "Do not enter moving floodwater.",
    ],
    after: [
      "Return only after official clearance.",
      "Avoid damaged electrical infrastructure.",
      "Report blocked roads or hazards.",
    ],
  },

  Lightning: {
    icon: "?",
    before: [
      "Check official thunderstorm alerts.",
      "Identify a substantial indoor shelter.",
      "Delay exposed outdoor activities if warnings are active.",
    ],
    during: [
      "Move indoors.",
      "Avoid exposed open areas.",
      "Follow official local safety instructions.",
    ],
    after: [
      "Wait for updated official guidance.",
      "Check for damaged infrastructure nearby.",
      "Report serious hazards through verified channels.",
    ],
  },

  Cyclone: {
    icon: "???",
    before: [
      "Monitor official cyclone bulletins.",
      "Know your evacuation or shelter route.",
      "Secure essential supplies in advance.",
    ],
    during: [
      "Stay in the designated safe location.",
      "Keep away from windows.",
      "Follow evacuation instructions immediately.",
    ],
    after: [
      "Avoid fallen wires and damaged structures.",
      "Use verified routes only.",
      "Wait for official all-clear instructions.",
    ],
  },

  Heatwave: {
    icon: "???",
    before: [
      "Check heat alerts and daily advisories.",
      "Plan outdoor activities for cooler periods.",
      "Ensure drinking water is available.",
    ],
    during: [
      "Reduce unnecessary exposure to extreme heat.",
      "Rest in cooler shaded or indoor areas.",
      "Follow local public-health guidance.",
    ],
    after: [
      "Continue hydration and recovery.",
      "Check official updates for continuing heat risk.",
      "Seek adult or medical help if someone becomes seriously unwell.",
    ],
  },

  "Strong Wind": {
    icon: "??",
    before: [
      "Secure loose outdoor objects.",
      "Check official wind warnings.",
      "Avoid unnecessary travel during severe conditions.",
    ],
    during: [
      "Stay away from trees and damaged structures.",
      "Move indoors when instructed.",
      "Avoid exposed roads where debris may fall.",
    ],
    after: [
      "Watch for fallen branches and wires.",
      "Report blocked roads.",
      "Wait for verified updates before travelling.",
    ],
  },

  Landslide: {
    icon: "??",
    before: [
      "Monitor warnings in slope-prone areas.",
      "Know alternate routes.",
      "Report visible road or slope damage.",
    ],
    during: [
      "Move away from affected slopes when instructed.",
      "Avoid blocked mountain roads.",
      "Follow evacuation guidance.",
    ],
    after: [
      "Do not enter damaged areas without clearance.",
      "Watch for secondary slope movement.",
      "Use verified road-status information.",
    ],
  },
};

export default function Preparedness() {
  const [selected, setSelected] = useState("Flood");

  const guide = guides[selected];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-sm font-bold text-cyan-300">
          PREPAREDNESS HUB
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Prepare Before the Hazard Reaches You
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          {Object.entries(guides).map(([name, item]) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`rounded-xl border px-4 py-3 ${
                selected === name
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {item.icon} {name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <GuideCard title="BEFORE" items={guide.before} />
          <GuideCard title="DURING" items={guide.during} />
          <GuideCard title="AFTER" items={guide.after} />
        </div>

        <button className="mt-7 flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 font-bold">
          <Volume2 size={18} />
          Listen to Instructions
        </button>

        <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          Prototype preparedness content. Production guidance should use approved official disaster-management instructions.
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

function GuideCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="text-sm font-black tracking-widest text-cyan-300">
        {title}
      </div>

      <ul className="mt-5 space-y-3 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-cyan-300">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

