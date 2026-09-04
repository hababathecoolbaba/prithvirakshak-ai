import { useState } from "react";
import { Link } from "react-router";

import {
  Accessibility,
  Languages,
  LogIn,
  Mic,
  ShieldAlert,
  UserPlus,
  X,
} from "lucide-react";

import Logo from "../components/Logo";
import {
  useLanguage,
} from "../context/LanguageContext";

export default function Welcome() {
  const {
    language,
    setLanguage,
    languages,
    t,
  } = useLanguage();

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [accessOpen, setAccessOpen] =
    useState(false);

  function toggleBodyClass(name) {
    document.body.classList.toggle(name);
  }

  return (
    <>
      <main className="grid-background relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
          <div className="radar">
            <div className="radar-sweep" />
          </div>
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-10">
          <div className="text-sm font-semibold text-slate-300">
            {t("ministry")}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLanguageOpen(true)
              }
              className="flex items-center gap-2 rounded-xl bg-slate-900/70 p-3 text-slate-300 hover:text-cyan-300"
            >
              <Languages size={19} />

              <span className="hidden text-xs font-bold sm:inline">
                {language.toUpperCase()}
              </span>
            </button>

            <Link
              to="/assistant"
              className="rounded-xl bg-slate-900/70 p-3 text-slate-300 hover:text-cyan-300"
            >
              <Mic size={19} />
            </Link>

            <button
              onClick={() =>
                setAccessOpen(true)
              }
              className="rounded-xl bg-slate-900/70 p-3 text-slate-300 hover:text-cyan-300"
            >
              <Accessibility size={19} />
            </button>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-6xl flex-col items-center justify-center px-6 pb-16 text-center">
          <Logo />

          <div className="mt-8 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
            LIVE WEATHER + DISASTER INTELLIGENCE
          </div>

          <h1 className="mt-8 text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            {t("predictEarly")}

            <span className="block text-cyan-300">
              {t("warnLocally")}
            </span>

            <span className="block">
              {t("actFaster")}
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex w-full max-w-4xl flex-wrap justify-center gap-3">
            <Link
              to="/home"
              className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950"
            >
              {t("enterCitizen")}
            </Link>

            <Link
              to="/login?mode=signin&role=citizen"
              className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-7 py-4 font-bold text-cyan-300"
            >
              <LogIn size={18} />
              {t("signIn")}
            </Link>

            <Link
              to="/login?mode=signup&role=citizen"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-4 font-semibold"
            >
              <UserPlus size={18} />
              {t("signUp")}
            </Link>

            <Link
              to="/login?role=authority"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-4 font-semibold"
            >
              {t("authorityLogin")}
            </Link>

            <Link
              to="/login?role=responder"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-4 font-semibold"
            >
              {t("responderLogin")}
            </Link>
          </div>

          <Link
            to="/emergency"
            className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-8 py-4 font-bold text-red-300"
          >
            <ShieldAlert size={20} />
            {t("emergencyAccess")}
          </Link>
        </section>
      </main>

      {languageOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[80vh] w-full max-w-xl overflow-auto rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                {t("language")}
              </h2>

              <button
                onClick={() =>
                  setLanguageOpen(false)
                }
                className="rounded-xl bg-slate-800 p-2"
              >
                <X />
              </button>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setLanguageOpen(false);
                  }}
                  className={`rounded-xl border p-4 text-left ${
                    language === item.code
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="font-bold">
                    {item.native}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {item.english}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {accessOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                {t("accessibility")}
              </h2>

              <button
                onClick={() =>
                  setAccessOpen(false)
                }
                className="rounded-xl bg-slate-800 p-2"
              >
                <X />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  toggleBodyClass(
                    "large-text"
                  )
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Increase text size
              </button>

              <button
                onClick={() =>
                  toggleBodyClass(
                    "high-contrast"
                  )
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                High contrast
              </button>

              <button
                onClick={() =>
                  toggleBodyClass(
                    "reduce-motion"
                  )
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Reduce animations
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
