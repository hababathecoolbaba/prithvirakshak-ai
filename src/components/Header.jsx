import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  Accessibility,
  Languages,
  Menu,
  Mic,
  ShieldAlert,
  X,
} from "lucide-react";

import Logo from "./Logo";

const links = [
  ["Home", "/home"],
  ["Live Map", "/map"],
  ["Nowcast", "/nowcast"],
  ["Alerts", "/alerts"],
  ["Preparedness", "/preparedness"],
  ["Services", "/services"],
];

const languages = [
  {
    native: "English",
    english: "English",
    code: "en",
  },
  {
    native: "\u0939\u093f\u0928\u094d\u0926\u0940",
    english: "Hindi",
    code: "hi",
  },
  {
    native: "\u09ac\u09be\u0982\u09b2\u09be",
    english: "Bengali",
    code: "bn",
  },
  {
    native: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",
    english: "Tamil",
    code: "ta",
  },
  {
    native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",
    english: "Telugu",
    code: "te",
  },
  {
    native: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
    english: "Gujarati",
    code: "gu",
  },
  {
    native: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",
    english: "Punjabi",
    code: "pa",
  },
  {
    native: "\u0627\u0631\u062f\u0648",
    english: "Urdu",
    code: "ur",
  },
  {
    native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
    english: "Arabic",
    code: "ar",
  },
  {
    native: "Espa\u00f1ol",
    english: "Spanish",
    code: "es",
  },
  {
    native: "Fran\u00e7ais",
    english: "French",
    code: "fr",
  },
  {
    native: "Deutsch",
    english: "German",
    code: "de",
  },
  {
    native: "Portugu\u00eas",
    english: "Portuguese",
    code: "pt",
  },
  {
    native: "\u4e2d\u6587",
    english: "Chinese",
    code: "zh",
  },
  {
    native: "\u65e5\u672c\u8a9e",
    english: "Japanese",
    code: "ja",
  },
  {
    native: "\ud55c\uad6d\uc5b4",
    english: "Korean",
    code: "ko",
  },
  {
    native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
    english: "Russian",
    code: "ru",
  },
  {
    native: "\u092e\u0930\u093e\u0920\u0940",
    english: "Marathi",
    code: "mr",
  },
  {
    native: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",
    english: "Malayalam",
    code: "ml",
  },
  {
    native: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1",
    english: "Kannada",
    code: "kn",
  },
  {
    native: "\u0b13\u0b21\u0b3c\u0b3f\u0b06",
    english: "Odia",
    code: "or",
  },
  {
    native: "\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be",
    english: "Assamese",
    code: "as",
  },
  {
    native: "\u0928\u0947\u092a\u093e\u0932\u0940",
    english: "Nepali",
    code: "ne",
  },
  {
    native: "T\u00fcrk\u00e7e",
    english: "Turkish",
    code: "tr",
  },
  {
    native: "Italiano",
    english: "Italian",
    code: "it",
  },
  {
    native: "Nederlands",
    english: "Dutch",
    code: "nl",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] =
    useState(languages[0]);

  function toggleBodyClass(name) {
    document.body.classList.toggle(name);
  }

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

  return (
    <>
      <header className="sticky top-0 z-[1500] border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {links.map(([name, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm transition ${
                    isActive
                      ? "font-semibold text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguageOpen(true)}
              title={`Language: ${selectedLanguage.english}`}
              className="flex items-center gap-2 rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            >
              <Languages size={19} />

              <span className="hidden text-xs font-semibold 2xl:inline">
                {selectedLanguage.code.toUpperCase()}
              </span>
            </button>

            <Link
              to="/assistant"
              title="Prithvi AI"
              className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            >
              <Mic size={19} />
            </Link>

            <button
              onClick={() => setAccessOpen(true)}
              title="Accessibility"
              className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            >
              <Accessibility size={19} />
            </button>

            <Link
              to="/emergency"
              title="Emergency"
              className="rounded-xl p-2 text-red-300 hover:bg-red-500/10"
            >
              <ShieldAlert size={19} />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl p-2 xl:hidden"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-800 px-4 py-3 xl:hidden">
            {links.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-slate-900"
              >
                {name}
              </Link>
            ))}

            <Link
              to="/report"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-cyan-300"
            >
              Report Incident
            </Link>
          </nav>
        )}
      </header>

      {languageOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[82vh] w-full max-w-2xl overflow-auto rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">
                  Language
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Search by native or English language name.
                </p>

                <div className="mt-2 text-xs text-cyan-300">
                  Current: {selectedLanguage.native} -{" "}
                  {selectedLanguage.english}
                </div>
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
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search languages..."
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none focus:border-cyan-400"
            />

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() =>
                    selectLanguage(language)
                  }
                  className={`rounded-xl border p-4 text-left transition ${
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

                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-400">
                      Text
                    </span>

                    {["en", "hi"].includes(
                      language.code
                    ) && (
                      <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-300">
                        Voice Demo
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {filteredLanguages.length === 0 && (
              <div className="py-10 text-center text-slate-500">
                No language found.
              </div>
            )}

            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
              Prototype selector. Production translation and voice availability must be verified per language.
            </div>
          </div>
        </div>
      )}

      {accessOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/75 p-4">
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
                onClick={() =>
                  toggleBodyClass("large-text")
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Increase text size
              </button>

              <button
                onClick={() =>
                  toggleBodyClass("high-contrast")
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                High contrast
              </button>

              <button
                onClick={() =>
                  toggleBodyClass("reduce-motion")
                }
                className="w-full rounded-xl bg-slate-900 p-4 text-left"
              >
                Reduce animations
              </button>

              <Link
                to="/emergency"
                onClick={() => setAccessOpen(false)}
                className="block w-full rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300"
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

