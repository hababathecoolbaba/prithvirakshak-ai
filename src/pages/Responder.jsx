import { useState } from "react";

import {
  CheckCircle2,
  MapPin,
  Navigation,
  Radio,
  Send,
  Upload,
  Users,
} from "lucide-react";

export default function Responder() {
  const [status, setStatus] = useState("Assigned");

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white">
      <div className="mx-auto max-w-xl">
        <div className="text-xs font-bold tracking-[0.16em] text-cyan-300">
          PRITHVIRAKSHAK RESPONDER
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Field Assignment
        </h1>

        <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs font-bold text-amber-200">
          SIMULATED RESPONDER ASSIGNMENT
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">
              P0 - LIFE SAFETY
            </div>

            <div className="text-xs font-bold text-cyan-300">
              {status}
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-black">
            FLOODING
          </h2>

          <div className="mt-6 space-y-4">
            <Info
              icon={MapPin}
              title="LOCATION"
              value="XYZ Underpass - Demo"
            />

            <Info
              icon={Navigation}
              title="DISTANCE"
              value="2.3 km - Simulated"
            />

            <Info
              icon={Radio}
              title="RISK"
              value="High"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <Action
            icon={Navigation}
            text="NAVIGATE"
            primary
            onClick={() => setStatus("Navigating")}
          />

          <Action
            icon={MapPin}
            text="ARRIVED"
            onClick={() => setStatus("On Scene")}
          />

          <Action
            icon={Users}
            text="REQUEST SUPPORT"
            onClick={() => setStatus("Support Requested")}
          />

          <Action
            icon={Upload}
            text="UPLOAD FIELD REPORT"
            onClick={() => setStatus("Field Report Uploaded")}
          />

          <Action
            icon={CheckCircle2}
            text="INCIDENT RESOLVED"
            onClick={() => setStatus("Resolved")}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2 font-bold">
            <Send size={17} className="text-cyan-300" />
            Field Note
          </div>

          <textarea
            rows="4"
            placeholder="Add verified field observations..."
            className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none focus:border-cyan-400"
          />
        </div>
      </div>
    </main>
  );
}

function Info({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-950 p-4">
      <Icon size={19} className="text-cyan-300" />

      <div>
        <div className="text-xs text-slate-500">
          {title}
        </div>

        <div className="mt-1 font-bold">
          {value}
        </div>
      </div>
    </div>
  );
}

function Action({
  icon: Icon,
  text,
  onClick,
  primary = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-3 rounded-2xl p-5 font-black ${
        primary
          ? "bg-cyan-400 text-slate-950"
          : "bg-slate-800 text-white"
      }`}
    >
      <Icon />
      {text}
    </button>
  );
}

