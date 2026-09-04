import {
  Ambulance,
  Building2,
  Flame,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

const services = [
  {
    title: "Hospitals",
    icon: Ambulance,
    detail: "Find nearby verified medical facilities.",
  },
  {
    title: "Police",
    icon: Shield,
    detail: "Access verified police-service information.",
  },
  {
    title: "Fire Services",
    icon: Flame,
    detail: "Locate verified fire and rescue services.",
  },
  {
    title: "Disaster Response",
    icon: Building2,
    detail: "Find designated disaster-response resources.",
  },
  {
    title: "Emergency Contacts",
    icon: Phone,
    detail: "Display verified emergency numbers.",
  },
  {
    title: "Shelters",
    icon: MapPin,
    detail: "Open nearby shelter information.",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-sm font-bold text-cyan-300">
          EMERGENCY RESOURCES
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Emergency Services
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Prototype service finder designed to connect citizens with verified nearby emergency resources.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, icon: Icon, detail }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <Icon className="text-cyan-300" />

              <h2 className="mt-5 text-xl font-bold">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {detail}
              </p>

              <button className="mt-5 rounded-xl bg-slate-800 px-4 py-3 text-sm font-bold">
                View Nearby
              </button>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          Demo interface only. Do not use unverified contact or operational-status information in production.
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

