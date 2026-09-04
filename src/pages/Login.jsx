import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState(
    searchParams.get("role") || "citizen"
  );

  function handleLogin(event) {
    event.preventDefault();

    if (role === "authority") {
      navigate("/authority/dashboard");
    } else if (role === "responder") {
      navigate("/responder");
    } else {
      navigate("/home");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-sm font-bold tracking-widest text-cyan-300">
          PRITHVIRAKSHAK AI
        </div>

        <h1 className="mt-3 text-4xl font-black">
          Platform Login
        </h1>

        <div className="mt-7 grid grid-cols-3 gap-2">
          {["citizen", "authority", "responder"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`rounded-xl border px-3 py-3 capitalize ${
                role === item
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-7 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <input
            required
            placeholder={
              role === "authority"
                ? "Official Email / Government ID"
                : "Mobile / Email"
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-cyan-400"
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-cyan-400"
          />

          {role === "authority" && (
            <input
              placeholder="MFA verification code"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none"
            />
          )}

          <button className="w-full rounded-xl bg-cyan-400 py-4 font-bold text-slate-950">
            Login
          </button>

          {role === "citizen" && (
            <Link
              to="/home"
              className="block text-center text-sm text-cyan-300"
            >
              Continue as Guest
            </Link>
          )}
        </form>

        <Link to="/" className="mt-6 inline-block text-sm text-slate-400">
          ? Back to Welcome
        </Link>
      </div>
    </main>
  );
}

