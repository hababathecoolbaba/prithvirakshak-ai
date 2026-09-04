import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock,
  LoaderCircle,
  MapPin,
  Radio,
  Wifi,
} from "lucide-react";

import Header from "../components/Header";
import FloatingAssistant from "../components/FloatingAssistant";
import MobileNav from "../components/MobileNav";
import { api } from "../lib/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .alerts()
      .then((data) => {
        setAlerts(data.alerts || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs font-bold tracking-widest text-cyan-300">
            ACTIVE WARNING CENTRE
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <Wifi size={12} />
            BACKEND DATA
          </div>
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Alerts
        </h1>

        <p className="mt-3 text-slate-400">
          Warning candidates and monitoring information returned by the
          PRITHVIRAKSHAK FastAPI service.
        </p>

        {loading && (
          <div className="mt-8 flex items-center gap-3 text-slate-400">
            <LoaderCircle className="animate-spin text-cyan-300" />
            Loading alerts...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
            />
          ))}
        </div>

        {!loading &&
          !error &&
          alerts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
              No prototype alerts returned.
            </div>
          )}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="text-xs font-bold text-cyan-300">
            WHY AM I RECEIVING A WARNING?
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
            <li>Location falls inside the prototype impact area.</li>
            <li>Simulated severe-weather conditions may affect the locality.</li>
            <li>Local impact intelligence indicates possible disruption.</li>
            <li>Official warnings must always take priority.</li>
          </ul>
        </div>
      </main>

      <FloatingAssistant />
      <MobileNav />
    </div>
  );
}

function AlertCard({ alert }) {
  const styles = {
    RED:
      "border-red-500/30 bg-red-500/10 text-red-300",
    ORANGE:
      "border-orange-400/30 bg-orange-400/10 text-orange-300",
    YELLOW:
      "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    GREEN:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div>
          <div
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${
              styles[alert.level] ||
              "border-slate-700 bg-slate-800 text-slate-300"
            }`}
          >
            {alert.level}
          </div>

          <h2 className="mt-4 text-2xl font-black">
            {alert.hazard}
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              {alert.location}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={15} />
              Expected: {alert.arrival}
            </div>

            <div className="flex items-center gap-2">
              <Radio size={15} />
              Confidence: {alert.confidence}
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-xs text-slate-500">
            {alert.id}
          </div>

          <div className="mt-2 text-sm font-bold text-cyan-300">
            {alert.status}
          </div>

          <div className="mt-2 text-xs text-slate-500">
            {alert.source}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-slate-950 p-4 text-xs text-amber-200">
        <AlertTriangle
          size={16}
          className="shrink-0"
        />

        Prototype warning information. Not an official emergency warning.
      </div>
    </div>
  );
}

