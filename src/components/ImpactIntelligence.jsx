import {
  ArrowDown,
  CloudRain,
  Hospital,
  Road,
  Waves,
} from "lucide-react";

export default function ImpactIntelligence({
  impacts = [],
}) {
  const fallback = [
    "Heavy Rainfall",
    "Urban Waterlogging",
    "Road Disruption",
    "Emergency Access Delay",
  ];

  const steps = impacts.length > 0 ? impacts : fallback;

  const icons = [
    CloudRain,
    Waves,
    Road,
    Hospital,
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="text-xs font-bold tracking-widest text-cyan-300">
        IMPACT INTELLIGENCE
      </div>

      <h2 className="mt-3 text-2xl font-black text-white">
        What Might Happen?
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Weather hazards are translated into possible local consequences.
      </p>

      <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        {steps.map((text, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div key={`${text}-${index}`}>
              <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-4">
                <Icon
                  size={19}
                  className="text-cyan-300"
                />

                <div className="font-bold text-white">
                  {text}
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown
                    size={17}
                    className="text-cyan-300"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Possible impact sequence only. It is not a guaranteed prediction.
      </div>
    </div>
  );
}

