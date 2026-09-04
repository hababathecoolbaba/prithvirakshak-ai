import { Link } from "react-router";

import {
  AlertTriangle,
  Navigation,
  Phone,
  Shield,
  Volume2,
} from "lucide-react";

export default function LiteMode() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-slate-950">
      <div className="mx-auto max-w-2xl">
        <div className="text-xs font-black tracking-widest">
          PRITHVIRAKSHAK LITE MODE
        </div>

        <div className="mt-7 border-4 border-red-600 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" />

            <div className="text-3xl font-black text-red-700">
              RED WARNING
            </div>
          </div>

          <div className="mt-5 text-2xl font-black">
            Severe Thunderstorm
          </div>

          <LiteInfo
            title="Affected Area"
            value="Ward 8 / Ward 9 - Demo"
          />

          <LiteInfo
            title="Expected"
            value="25-40 minutes - Demo"
          />

          <LiteInfo
            title="Action"
            value="Move indoors. Avoid low-lying roads. Follow official instructions."
          />

          <LiteInfo
            title="Updated"
            value="Prototype timestamp"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            to="/shelters"
            className="flex items-center gap-3 border-2 border-slate-950 p-4 font-black"
          >
            <Shield />
            Find Shelter
          </Link>

          <Link
            to="/safe-route"
            className="flex items-center gap-3 border-2 border-slate-950 p-4 font-black"
          >
            <Navigation />
            Lower-Risk Route
          </Link>

          <Link
            to="/services"
            className="flex items-center gap-3 border-2 border-slate-950 p-4 font-black"
          >
            <Phone />
            Emergency Contacts
          </Link>

          <button className="flex items-center gap-3 border-2 border-slate-950 p-4 font-black">
            <Volume2 />
            Listen
          </button>
        </div>

        <div className="mt-7 border border-slate-400 p-4 text-sm">
          SIMULATED FOR PROTOTYPE. Lite Mode is designed for reduced graphics
          and lower-bandwidth access.
        </div>

        <Link
          to="/home"
          className="mt-6 inline-block font-black underline"
        >
          Return to full interface
        </Link>
      </div>
    </main>
  );
}

function LiteInfo({ title, value }) {
  return (
    <div className="mt-6">
      <div className="text-xs font-black uppercase">
        {title}
      </div>

      <div className="mt-1 text-lg">
        {value}
      </div>
    </div>
  );
}

