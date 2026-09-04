import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  Clock,
  Hospital,
  LoaderCircle,
  MapPin,
  Navigation,
  Shield,
  Wifi,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ExplainableAI from "../components/ExplainableAI";
import ImpactIntelligence from "../components/ImpactIntelligence";
import { api } from "../lib/api";

export default function LocationPage() {
  const params = useParams();

  const locationName = decodeURIComponent(
    params.location || "Jaipur"
  );

  const [risk, setRisk] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setRisk(null);
    setError("");

    api
      .risk(locationName)
      .then((data) => {
        if (active) setRisk(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => {
      active = false;
    };
  }, [locationName]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-200">
            SIMULATED LOCATION INTELLIGENCE
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
            <Wifi size={13} />
            API DATA
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            Backend error: {error}
          </div>
        )}

        {!risk && !error && (
          <div className="mt-10 flex items-center gap-3 text-slate-400">
            <LoaderCircle className="animate-spin text-cyan-300" />
            Loading hyper-local risk...
          </div>
        )}

        {risk && (
          <>
            <div className="mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <MapPin size={19} />

                  <span className="text-sm font-bold">
                    HYPER-LOCAL LOCATION
                  </span>
                </div>

                <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                  {risk.location}
                </h1>

                <p className="mt-3 max-w-2xl text-slate-400">
                  {risk.what}
                </p>
              </div>

              <div className="rounded-2xl border border-orange-400/30 bg-orange-400/10 px-6 py-4">
                <div className="text-xs font-bold tracking-widest text-orange-300">
                  CURRENT RISK
                </div>

                <div className="mt-1 text-3xl font-black text-orange-300">
                  {risk.risk_level}
                </div>

                <div className="mt-1 text-sm font-bold">
                  {risk.action_level}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              <InfoCard
                title="WHAT"
                value={risk.hazard}
              />

              <InfoCard
                title="WHERE"
                value={risk.where}
              />

              <InfoCard
                title="WHEN"
                value={risk.when}
              />

              <InfoCard
                title="CONFIDENCE"
                value={risk.confidence}
              />
            </div>

            <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
              <div className="text-xs font-bold tracking-widest text-cyan-300">
                ACTION
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {risk.action.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <ExplainableAI
                reasons={risk.why}
                confidence={risk.confidence}
              />

              <ImpactIntelligence
                impacts={risk.possible_impacts}
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <ActionCard
                icon={Shield}
                title="Nearby Shelters"
                text="View nearby prototype shelter information."
                path="/shelters"
              />

              <ActionCard
                icon={Hospital}
                title="Emergency Services"
                text="Open hospitals and emergency-resource interface."
                path="/services"
              />

              <ActionCard
                icon={Navigation}
                title="Lower-Risk Route"
                text="Compare prototype routes against hazard zones."
                path="/safe-route"
              />
            </div>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3">
                <Clock className="text-cyan-300" />

                <div>
                  <div className="font-bold">
                    Data Freshness
                  </div>

                  <div className="mt-1 text-sm text-slate-400">
                    Backend update: {risk.updated_at}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="text-xs font-bold text-slate-500">
        {title}
      </div>

      <div className="mt-2 font-black">
        {value}
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, text, path }) {
  return (
    <Link
      to={path}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-400/40"
    >
      <Icon className="text-cyan-300" />

      <div className="mt-4 text-lg font-bold">
        {title}
      </div>

      <div className="mt-2 text-sm leading-6 text-slate-400">
        {text}
      </div>
    </Link>
  );
}

