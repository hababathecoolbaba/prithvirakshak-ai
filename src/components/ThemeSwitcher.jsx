import {
  Leaf,
  Moon,
  Palette,
  Sun,
  Waves,
  X,
} from "lucide-react";

import { useState } from "react";
import {
  useTheme,
} from "../context/ThemeContext";

const icons = {
  light: Sun,
  dark: Moon,
  ocean: Waves,
  forest: Leaf,
};

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);

  const {
    theme,
    setTheme,
    themes,
  } = useTheme();

  return (
    <div className="fixed bottom-5 left-5 z-[5000]">
      {open && (
        <div className="mb-3 w-52 rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="font-bold text-white">
              Theme
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-400"
            >
              <X size={17} />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {themes.map((item) => {
              const Icon =
                icons[item.id] || Palette;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold ${
                    theme === item.id
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  <Icon size={17} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        title="Change theme"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-xl"
      >
        <Palette size={21} />
      </button>
    </div>
  );
}
