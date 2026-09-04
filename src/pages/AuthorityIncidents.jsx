import { useEffect, useState } from "react";
import {
  LoaderCircle,
  RefreshCw,
  Wifi,
} from "lucide-react";

import AuthoritySidebar from "../components/AuthoritySidebar";
import { api } from "../lib/api";

export default function AuthorityIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    setLoading(true);
    setError("");

    try {
      const data = await api.incidents();
      setIncidents(data.incidents || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function assignIncident(id) {
    setWorkingId(id);
    setError("");

    try {
      const data = await api.assignIncident(
        id,
        "Response Team Alpha"
      );

      setIncidents((current) =>
        current.map((incident) =>
          incident.id === id
            ? data.incident
            : incident
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setWorkingId("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="min-w-0 flex-1 px-5 py-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs font-bold tracking-widest text-cyan-300">
            AI INCIDENT PRIORITY SYSTEM
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <Wifi size={12} />
            FASTAPI QUEUE
          </div>
        </div>

        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h1 className="text-4xl font-black">
            Incident Management
          </h1>

          <button
            onClick={loadIncidents}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-4">
          <PriorityCard
            priority="P0"
            meaning="Life Safety"
          />

          <PriorityCard
            priority="P1"
            meaning="High"
          />

          <PriorityCard
            priority="P2"
            meaning="Medium"
          />

          <PriorityCard
            priority="P3"
            meaning="Low"
          />
        </div>

        {loading && (
          <div className="mt-8 flex items-center gap-3 text-slate-400">
            <LoaderCircle className="animate-spin text-cyan-300" />
            Loading backend incident queue...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:grid-cols-[110px_70px_1fr_220px_130px] lg:items-center"
            >
              <div className="text-xs text-slate-500">
                {incident.id}
              </div>

              <Priority value={incident.priority} />

              <div>
                <div className="font-bold">
                  {incident.category}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {incident.location}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {incident.description}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-300">
                  {incident.status}
                </div>

                {incident.assigned_team && (
                  <div className="mt-1 text-xs text-cyan-300">
                    {incident.assigned_team}
                  </div>
                )}
              </div>

              <button
                disabled={
                  workingId === incident.id ||
                  incident.status ===
                    "Assigned to Response Team"
                }
                onClick={() =>
                  assignIncident(incident.id)
                }
                className="rounded-xl bg-cyan-400 px-3 py-3 text-xs font-black text-slate-950 disabled:bg-slate-700 disabled:text-slate-400"
              >
                {workingId === incident.id
                  ? "ASSIGNING..."
                  : incident.status ===
                    "Assigned to Response Team"
                  ? "ASSIGNED"
                  : "ASSIGN"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function PriorityCard({ priority, meaning }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="text-2xl font-black">
        {priority}
      </div>

      <div className="mt-1 text-xs text-slate-400">
        {meaning}
      </div>
    </div>
  );
}

function Priority({ value }) {
  const colours = {
    P0: "text-red-300",
    P1: "text-orange-300",
    P2: "text-yellow-300",
    P3: "text-emerald-300",
  };

  return (
    <div
      className={`font-black ${
        colours[value] || "text-slate-300"
      }`}
    >
      {value}
    </div>
  );
}

