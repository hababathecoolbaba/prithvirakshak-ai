import {
  BrainCircuit,
  CheckCircle2,
  Database,
  ShieldCheck,
} from "lucide-react";

export default function ExplainableAI({
  reasons = [],
  confidence = "Prototype",
}) {
  const fallbackReasons = [
    "Prototype severe-weather warning is active for the selected area.",
    "A simulated storm cell is moving toward the locality.",
    "Prototype rainfall intensity is increasing.",
    "Possible transport disruption has been identified.",
  ];

  const displayedReasons =
    reasons.length > 0 ? reasons : fallbackReasons;

  const icons = [
    ShieldCheck,
    CheckCircle2,
    Database,
    BrainCircuit,
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center gap-3">
        <BrainCircuit className="text-cyan-300" />

        <div>
          <div className="text-xs font-bold tracking-widest text-cyan-300">
            EXPLAINABLE AI
          </div>

          <h2 className="mt-1 text-2xl font-black text-white">
            Why am I receiving this warning?
          </h2>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        {displayedReasons.map((text, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div
              key={`${text}-${index}`}
              className="flex gap-3 rounded-xl bg-slate-950 p-4"
            >
              <Icon
                size={18}
                className="mt-0.5 shrink-0 text-cyan-300"
              />

              <div className="text-sm leading-6 text-slate-300">
                {text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-950 p-4">
          <div className="text-xs text-slate-500">
            Prediction Confidence
          </div>

          <div className="mt-1 font-black text-cyan-300">
            {confidence}
          </div>
        </div>

        <div className="rounded-xl bg-slate-950 p-4">
          <div className="text-xs text-slate-500">
            Validation Status
          </div>

          <div className="mt-1 font-black text-amber-300">
            PROTOTYPE ONLY
          </div>
        </div>
      </div>
    </div>
  );
}

