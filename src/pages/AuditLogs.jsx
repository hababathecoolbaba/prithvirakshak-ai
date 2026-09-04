import AuthoritySidebar from "../components/AuthoritySidebar";

const logs = [
  ["11:31", "Alert Candidate Generated", "AI Engine"],
  ["11:31", "AI Analysis Completed", "AI Engine"],
  ["11:33", "Officer Review Started", "Officer DEMO-01"],
  ["11:34", "Warning Approved", "Officer DEMO-01"],
  ["11:34", "Distribution Triggered", "Alert Gateway"],
  ["11:37", "Resource Assignment Updated", "Operations DEMO-02"],
];

export default function AuditLogs() {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          ACCOUNTABILITY & TRACEABILITY
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Audit Logs
        </h1>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800">
          <div className="grid grid-cols-[90px_1fr_180px] bg-slate-900 px-5 py-4 text-xs font-bold text-slate-500">
            <div>TIME</div>
            <div>ACTION</div>
            <div>ACTOR</div>
          </div>

          {logs.map(([time, action, actor]) => (
            <div
              key={`${time}-${action}`}
              className="grid grid-cols-[90px_1fr_180px] border-t border-slate-800 bg-slate-950 px-5 py-5 text-sm"
            >
              <div className="text-slate-500">
                {time}
              </div>

              <div className="font-bold">
                {action}
              </div>

              <div className="text-slate-400">
                {actor}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

