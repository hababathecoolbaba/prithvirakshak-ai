import AuthoritySidebar from "../components/AuthoritySidebar";

const pulse = [
  ["Weather", "RED"],
  ["Flooding", "ORANGE"],
  ["Roads", "ORANGE"],
  ["Power", "YELLOW"],
  ["Hospitals", "GREEN"],
  ["Communications", "GREEN"],
];

export default function DisasterPulse() {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          RAPID OPERATIONAL SUMMARY
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Disaster Pulse
        </h1>

        <div className="mt-8 rounded-3xl border border-orange-400/30 bg-orange-400/10 p-8">
          <div className="text-xs font-bold tracking-widest text-orange-300">
            OVERALL RISK
          </div>

          <div className="mt-3 text-5xl font-black text-orange-300">
            ORANGE
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pulse.map(([name, level]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="text-sm text-slate-400">
                {name}
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Dot level={level} />

                <div className="text-xl font-black">
                  {level}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-7">
          <div className="text-xs font-bold text-cyan-300">
            FAILURE CASCADE ENGINE
          </div>

          <h2 className="mt-3 text-2xl font-black">
            Possible Secondary Effects
          </h2>

          <div className="mt-8 flex flex-col gap-3 xl:flex-row xl:items-center">
            <Node text="Extreme Rainfall" />
            <Arrow />
            <Node text="Flooding" />
            <Arrow />
            <Node text="Road Closure" />
            <Arrow />
            <Node text="Traffic Disruption" />
            <Arrow />
            <Node text="Ambulance Delay" />
            <Arrow />
            <Node text="Hospital Access Risk" />
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Conceptual risk chain — not a guaranteed prediction.
          </div>
        </div>
      </main>
    </div>
  );
}

function Dot({ level }) {
  const colours = {
    RED: "bg-red-400",
    ORANGE: "bg-orange-400",
    YELLOW: "bg-yellow-300",
    GREEN: "bg-emerald-400",
  };

  return (
    <div
      className={`h-4 w-4 rounded-full ${colours[level]}`}
    />
  );
}

function Node({ text }) {
  return (
    <div className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-4 text-center text-sm font-bold">
      {text}
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-center font-black text-cyan-300">
      ?
    </div>
  );
}

