import { useState } from "react";
import {
  Camera,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Send,
} from "lucide-react";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import { api } from "../lib/api";

const categories = [
  "Flooding",
  "Fallen Tree",
  "Electrical Hazard",
  "Blocked Road",
  "Infrastructure Damage",
  "Landslide",
  "Fire",
  "Other",
];

export default function Report() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitReport(event) {
    event.preventDefault();

    setError("");

    if (!category) {
      setError("Select an incident category.");
      return;
    }

    setSubmitting(true);

    try {
      const data = await api.createIncident({
        category,
        location,
        description,
        contact: contact || null,
      });

      setResult(data.incident);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-slate-950 pb-24 text-white">
        <Header />

        <main className="mx-auto max-w-3xl px-5 py-12">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8">
            <CheckCircle2
              size={42}
              className="text-emerald-300"
            />

            <div className="mt-5 text-xs font-bold tracking-widest text-emerald-300">
              REPORT RECEIVED BY FASTAPI
            </div>

            <h1 className="mt-2 text-3xl font-black">
              {result.id}
            </h1>

            <p className="mt-3 text-slate-300">
              Your incident has been added to the authority incident queue.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Info
                title="Category"
                value={result.category}
              />

              <Info
                title="Priority"
                value={result.priority}
              />

              <Info
                title="Status"
                value={result.status}
              />

              <Info
                title="Verified"
                value={result.verified ? "Yes" : "No"}
              />
            </div>

            <div className="mt-6 rounded-xl border border-amber-400/20 bg-slate-950/50 p-4 text-xs text-amber-200">
              Citizen reports remain unverified until corroborated or reviewed
              by an authorized operator.
            </div>

            <button
              onClick={() => {
                setResult(null);
                setCategory("");
                setLocation("");
                setDescription("");
                setContact("");
                setPhotoName("");
              }}
              className="mt-6 rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950"
            >
              Submit Another Report
            </button>
          </div>
        </main>

        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <Header />

      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          CITIZEN INCIDENT REPORTING
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Report an Incident
        </h1>

        <p className="mt-3 text-slate-400">
          Reports are sent to the FastAPI incident gateway and remain unverified
          until reviewed.
        </p>

        <form
          onSubmit={submitReport}
          className="mt-8 space-y-7"
        >
          <div>
            <label className="text-xs font-bold text-slate-500">
              INCIDENT CATEGORY
            </label>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-xl border p-4 text-sm font-bold ${
                    category === item
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-slate-800 bg-slate-900 text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">
              LOCATION
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4">
              <MapPin
                size={19}
                className="text-cyan-300"
              />

              <input
                required
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Road, landmark, locality or ward"
                className="w-full bg-transparent py-4 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">
              DESCRIPTION
            </label>

            <textarea
              required
              minLength={5}
              rows="5"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe what you can safely observe..."
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">
              PHOTO - OPTIONAL
            </label>

            <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-5 text-slate-400">
              <Camera className="text-cyan-300" />

              <span>
                {photoName ||
                  "Choose supporting photo"}
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  setPhotoName(
                    event.target.files?.[0]?.name || ""
                  )
                }
              />
            </label>

            <div className="mt-2 text-xs text-slate-600">
              Photo upload is interface-only in this backend batch.
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">
              CONTACT - OPTIONAL
            </label>

            <input
              value={contact}
              onChange={(event) =>
                setContact(event.target.value)
              }
              placeholder="Phone or contact reference"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-cyan-400"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 p-4 font-black text-slate-950 disabled:opacity-50"
          >
            {submitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}

            {submitting
              ? "SENDING REPORT..."
              : "SUBMIT INCIDENT REPORT"}
          </button>
        </form>
      </main>

      <MobileNav />
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-950/60 p-4">
      <div className="text-xs text-slate-500">
        {title}
      </div>

      <div className="mt-1 font-bold">
        {value}
      </div>
    </div>
  );
}

