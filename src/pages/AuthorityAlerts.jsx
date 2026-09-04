import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  LoaderCircle,
  ShieldAlert,
  Wifi,
  XCircle,
} from "lucide-react";

import AuthoritySidebar from "../components/AuthoritySidebar";
import { api } from "../lib/api";

export default function AuthorityAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    setLoading(true);
    setError("");

    try {
      const data = await api.alerts();
      const items = data.alerts || [];

      setAlerts(items);

      if (items.length > 0) {
        setSelectedId((current) =>
          current &&
          items.some((item) => item.id === current)
            ? current
            : items[0].id
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const selected =
    alerts.find((item) => item.id === selectedId) ||
    alerts[0];

  function updateAlert(updatedAlert) {
    setAlerts((current) =>
      current.map((item) =>
        item.id === updatedAlert.id
          ? updatedAlert
          : item
      )
    );
  }

  async function approve() {
    if (!selected) return;

    setWorking(true);
    setError("");

    try {
      const data = await api.approveAlert(selected.id);
      updateAlert(data.alert);
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  }

  async function modify() {
    if (!selected) return;

    setWorking(true);
    setError("");

    try {
      const data = await api.modifyAlert(
        selected.id,
        "Authority modification requested from command dashboard."
      );

      updateAlert(data.alert);
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  }

  async function reject() {
    if (!selected) return;

    setWorking(true);
    setError("");

    try {
      const data = await api.rejectAlert(selected.id);
      updateAlert(data.alert);
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs font-bold tracking-widest text-cyan-300">
            HUMAN-IN-THE-LOOP WARNING CONTROL
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <Wifi size={12} />
            FASTAPI
          </div>
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Alert Approval
        </h1>

        <p className="mt-2 text-slate-400">
          Authority actions are now sent to the backend.
        </p>

        {loading && (
          <div className="mt-8 flex gap-3 text-slate-400">
            <LoaderCircle className="animate-spin text-cyan-300" />
            Loading warning candidates...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {selected && (
          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_.8fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-block rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-black text-orange-300">
                  {selected.level} WARNING CANDIDATE
                </div>

                <div className="text-xs text-slate-500">
                  {selected.id}
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-black">
                {selected.hazard}
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Info
                  title="Area"
                  value={selected.location}
                />

                <Info
                  title="Confidence"
                  value={selected.confidence}
                />

                <Info
                  title="Expected"
                  value={selected.arrival}
                />

                <Info
                  title="Source"
                  value={selected.source}
                />
              </div>

              <div className="mt-7">
                <div className="text-xs text-slate-500">
                  CURRENT BACKEND STATUS
                </div>

                <div className="mt-2 text-xl font-black text-cyan-300">
                  {selected.status}
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <button
                  disabled={working}
                  onClick={approve}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-4 font-black text-slate-950 disabled:opacity-40"
                >
                  <CheckCircle2 size={18} />
                  APPROVE
                </button>

                <button
                  disabled={working}
                  onClick={modify}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-400 px-4 py-4 font-black text-slate-950 disabled:opacity-40"
                >
                  <Edit3 size={18} />
                  MODIFY
                </button>

                <button
                  disabled={working}
                  onClick={reject}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-4 font-black text-red-300 disabled:opacity-40"
                >
                  <XCircle size={18} />
                  REJECT
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
              <ShieldAlert
                className="text-cyan-300"
                size={30}
              />

              <h2 className="mt-4 text-2xl font-black">
                Warning Candidates
              </h2>

              <div className="mt-5 space-y-3">
                {alerts.map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() =>
                      setSelectedId(alert.id)
                    }
                    className={`w-full rounded-xl border p-4 text-left ${
                      alert.id === selected.id
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-slate-800 bg-slate-950"
                    }`}
                  >
                    <div className="font-bold">
                      {alert.hazard}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {alert.id} · {alert.status}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-950 p-4">
      <div className="text-xs text-slate-500">
        {title}
      </div>

      <div className="mt-1 font-bold">
        {value}
      </div>
    </div>
  );
}

