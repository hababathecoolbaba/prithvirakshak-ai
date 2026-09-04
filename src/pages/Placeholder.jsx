import Header from "../components/Header";

export default function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          PRITHVIRAKSHAK MODULE
        </div>

        <h1 className="mt-4 text-4xl font-black">
          {title}
        </h1>

        <p className="mt-4 text-slate-400">
          This module is connected to the application and will be expanded in the next development batch.
        </p>
      </main>
    </div>
  );
}

