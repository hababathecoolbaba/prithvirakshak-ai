import {
  BrainCircuit,
  Earth,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          ABOUT THE PLATFORM
        </div>

        <h1 className="mt-3 text-4xl font-black">
          PRITHVIRAKSHAK AI
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          An AI-driven hyper-local severe-weather nowcasting and disaster-management
          prototype focused on translating weather intelligence into understandable
          local risk, possible impacts and recommended action.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <Feature
            icon={Earth}
            title="Earth Science"
            text="Combines meteorological and geospatial intelligence."
          />

          <Feature
            icon={MapPin}
            title="Hyper-Local"
            text="Focuses on location-specific risk instead of generic regional statistics."
          />

          <Feature
            icon={BrainCircuit}
            title="Explainable AI"
            text="Shows why a warning or recommendation is being presented."
          />

          <Feature
            icon={ShieldCheck}
            title="Human Validation"
            text="Critical warnings remain subject to official authority review."
          />
        </div>

        <div className="mt-9 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
          <div className="text-xs font-bold text-cyan-300">
            CORE OPERATIONAL FLOW
          </div>

          <div className="mt-4 text-xl font-black">
            SENSE - FUSE - PREDICT - IMPACT - WARN - RESPOND - LEARN
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <Icon className="text-cyan-300" />

      <div className="mt-4 text-xl font-bold">
        {title}
      </div>

      <div className="mt-2 text-sm leading-6 text-slate-400">
        {text}
      </div>
    </div>
  );
}

