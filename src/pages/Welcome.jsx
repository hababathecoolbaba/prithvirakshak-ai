import { useState } from "react";
import { Link } from "react-router";

import {
  Accessibility,
  Languages,
  Mic,
  ShieldAlert,
  X,
} from "lucide-react";

import Logo from "../components/Logo";

const languages = [
  { native: "English", english: "English", code: "en" },
  { native: "\u0939\u093f\u0928\u094d\u0926\u0940", english: "Hindi", code: "hi" },
  { native: "\u09ac\u09be\u0982\u09b2\u09be", english: "Bengali", code: "bn" },
  { native: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd", english: "Tamil", code: "ta" },
  { native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", english: "Telugu", code: "te" },
  { native: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0", english: "Gujarati", code: "gu" },
  { native: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40", english: "Punjabi", code: "pa" },
  { native: "\u0627\u0631\u062f\u0648", english: "Urdu", code: "ur" },
  { native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", english: "Arabic", code: "ar" },
  { native: "Espa\u00f1ol", english: "Spanish", code: "es" },
  { native: "Fran\u00e7ais", english: "French", code: "fr" },
  { native: "Deutsch", english: "German", code: "de" },
  { native: "Portugu\u00eas", english: "Portuguese", code: "pt" },
  { native: "\u4e2d\u6587", english: "Chinese", code: "zh" },
  { native: "\u65e5\u672c\u8a9e", english: "Japanese", code: "ja" },
  { native: "\ud55c\uad6d\uc5b4", english: "Korean", code: "ko" },
  { native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", english: "Russian", code: "ru" },
  { native: "\u092e\u0930\u093e\u0920\u0940", english: "Marathi", code: "mr" },
  { native: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02", english: "Malayalam", code: "ml" },
  { native: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1", english: "Kannada", code: "kn" },
  { native: "\u0b13\u0b21\u0b3c\u0b3f\u0b06", english: "Odia", code: "or" },
  { native: "\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be", english: "Assamese", code: "as" },
  { native: "\u0928\u0947\u092a\u093e\u0932\u0940", english: "Nepali", code: "ne" },
];

export default function Welcome() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const filteredLanguages = languages.filter((language) =>
    `${language.native} ${language.english}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function selectLanguage(language) {
    setSelectedLanguage(language);
    setLanguageOpen(false);
    setSearch("");
  }

  function toggleBodyClass(className) {
    document.body.classList.toggle(className);
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
            Ministry of Earth Sciences
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguageOpen(true)}
              title={`Language: ${selectedLanguage.english}`}
              className="flex items-center gap-2 rounded-xl bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              <Languages size={19} />

              <span className="hidden text-xs font-bold sm:inline">
                {selectedLanguage.code.toUpperCase()}
              </span>
            </button>

            <Link
              to="/assistant"
              title="Prithvi AI"
              className="rounded-xl bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              <Mic size={19} />
            </Link>

            <button
              onClick={() => setAccessOpen(true)}
              title="Accessibility"
              className="rounded-xl bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              <Accessibility size={19} />
            </button>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-6xl flex-col items-center justify-center px-6 pb-16 text-center">
          <Logo />

          <div className="mt-8 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300">
            PROTOTYPE · SIMULATED DATA
          </div>

          <h1 className="mt-8 text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Predict Early.

            <span className="block text-cyan-300">
              Warn Locally.
            </span>

            Act Faster.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
            AI-Driven Hyper-Local Severe Weather Nowcasting & Disaster Intelligence
          </p>

          <div className="mt-10 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              to="/home"
              className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Enter as Citizen
            </Link>

            <Link
              to="/login?role=authority"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold transition hover:border-cyan-400/40"
            >
              Authority Login
            </Link>

            <Link
              to="/login?role=responder"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-4 font-semibold transition hover:border-cyan-400/40"
            >
              Responder Login
            </Link>
          </div>

          <Link
            to="/emergency"
            className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-8 py-4 font-bold text-red-300 hover:bg-red-500/20"
          >
            <ShieldAlert size={20} />
            Emergency Access
          </Link>

          <p className="mt-8 max-w-2xl text-xs leading-5 text-slate-500">
            PrithviRakshak AI is a disaster decision-support prototype.
            It does not replace official meteorological or government emergency
            warning systems.
          </p>
        </section>
      </main>

      {languageOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[82vh] w-full max-w-2xl overflow-auto rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Language
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Search by native or English language name.
                </p>

                <p className="mt-2 text-xs text-cyan-300">
                  Current: {selectedLanguage.native} - {selectedLanguage.english}
                </p>
              </div>

              <button
                onClick={() => setLanguageOpen(false)}
                className="rounded-xl bg-slate-800 p-2"
              >
                <X />
              </button>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search languages..."
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none focus:border-cyan-400"
            />

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className={`rounded-xl border p-4 text-left ${
                    selectedLanguage.code === language.code
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-800 bg-slate-900 hover:border-cyan-400/40"
                  }`}
                >
                  <div className="text-lg font-bold">
                    {language.native}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    {language.english} - Text Supported
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
              Prototype selector. Full interface translation will be connected separately.
            </div>
          </div>
        </div>
      )}

      {accessOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Accessibility
              </h2>

              <button
                onClick={() => setAccessOpen(false)}
                className="rounded-xl bg-slate-800 p-2"
              >
                <X />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => toggleBodyClass("large-text")}
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Increase text size
              </button>

              <button
                onClick={() => toggleBodyClass("high-contrast")}
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                High contrast
              </button>

              <button
                onClick={() => toggleBodyClass("reduce-motion")}
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Reduce animations
              </button>

              <Link
                to="/emergency"
                className="block rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300"
              >
                Emergency accessibility mode
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

