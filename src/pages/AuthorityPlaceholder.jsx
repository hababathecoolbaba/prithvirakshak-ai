import AuthoritySidebar from "../components/AuthoritySidebar";

export default function AuthorityPlaceholder({ title }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AuthoritySidebar />

      <main className="flex-1 px-5 py-12 lg:px-8">
        <div className="text-xs font-bold tracking-widest text-cyan-300">
          PRITHVIRAKSHAK COMMAND
        </div>

        <h1 className="mt-3 text-4xl font-black">
          {title}
        </h1>

        <p className="mt-4 max-w-xl text-slate-400">
          This authority module is connected and ready for further expansion.
        </p>
      </main>
    </div>
  );
}

