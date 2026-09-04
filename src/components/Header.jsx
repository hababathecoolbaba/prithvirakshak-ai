import { useState } from "react";
import { Link, NavLink } from "react-router";

import {
  Accessibility,
  Languages,
  LogIn,
  Menu,
  Mic,
  ShieldAlert,
  User,
  X,
} from "lucide-react";

import Logo from "./Logo";
import {
  useLanguage,
} from "../context/LanguageContext";

const navItems = [
  ["home", "/home"],
  ["liveMap", "/map"],
  ["nowcast", "/nowcast"],
  ["alerts", "/alerts"],
  ["preparedness", "/preparedness"],
  ["services", "/services"],
];

export default function Header() {
  const {
    language,
    setLanguage,
    languages,
    t,
  } = useLanguage();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [accessOpen, setAccessOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const currentUser = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "prithvirakshak-current-user"
        )
      );
    } catch {
      return null;
    }
  })();

  const filteredLanguages =
    languages.filter((item) =>
      `${item.native} ${item.english}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  function selectLanguage(code) {
    setLanguage(code);
    setLanguageOpen(false);
    setSearch("");
  }

  function toggleBodyClass(name) {
    document.body.classList.toggle(name);
  }

  function signOut() {
    localStorage.removeItem(
      "prithvirakshak-current-user"
    );

    window.location.href = "/";
  }

  return (
    <>
      <header className="sticky top-0 z-[1500] border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map(([key, path]) => (
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
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLanguageOpen(true)
              }
              className="flex items-center gap-2 rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
              title={t("language")}
            >
              <Languages size={19} />

              <span className="hidden text-xs font-bold 2xl:inline">
                {language.toUpperCase()}
              </span>
            </button>

            <Link
              to="/assistant"
              className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            >
              <Mic size={19} />
            </Link>

            <button
              onClick={() =>
                setAccessOpen(true)
              }
              className="rounded-xl p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
            >
              <Accessibility size={19} />
            </button>

            {currentUser ? (
              <button
                onClick={signOut}
                className="hidden items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 hover:border-cyan-400/40 sm:flex"
              >
                <User size={15} />
                {t("logout")}
              </button>
            ) : (
              <Link
                to="/login?mode=signin&role=citizen"
                className="hidden items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-300 sm:flex"
              >
                <LogIn size={15} />
                {t("signIn")}
              </Link>
            )}

            <Link
              to="/emergency"
              className="rounded-xl p-2 text-red-300 hover:bg-red-500/10"
            >
              <ShieldAlert size={19} />
            </Link>

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="rounded-xl p-2 xl:hidden"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-800 px-4 py-3 xl:hidden">
            {navItems.map(([key, path]) => (
              <Link
                key={path}
                to={path}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-slate-900"
              >
                {t(key)}
              </Link>
            ))}

            {!currentUser && (
              <Link
                to="/login?mode=signin&role=citizen"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 text-sm font-bold text-cyan-300"
              >
                {t("signIn")}
              </Link>
            )}
          </nav>
        )}
      </header>

      {languageOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[82vh] w-full max-w-2xl overflow-auto rounded-3xl border border-slate-700 bg-slate-950 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  {t("language")}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your selection is saved on this device.
                </p>
              </div>

              <button
                onClick={() =>
                  setLanguageOpen(false)
                }
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
              {filteredLanguages.map(
                (item) => (
                  <button
                    key={item.code}
                    onClick={() =>
                      selectLanguage(
                        item.code
                      )
                    }
                    className={`rounded-xl border p-4 text-left ${
                      language === item.code
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-slate-800 bg-slate-900 hover:border-cyan-400/40"
                    }`}
                  >
                    <div className="text-lg font-bold">
                      {item.native}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {item.english}
                    </div>
                  </button>
                )
              )}
            </div>

            <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-slate-400">
              English and Hindi currently have complete core-interface translations.
              Other language packs will fall back to English until their reviewed
              translations are added.
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
