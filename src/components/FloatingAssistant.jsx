import { useState } from "react";
import { Link } from "react-router";
import {
  Bot,
  MapPin,
  MessageSquareText,
  Mic,
  Volume2,
  X,
} from "lucide-react";

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[2000]">
      {open && (
        <div className="mb-4 w-[330px] rounded-3xl border border-slate-700 bg-slate-900/95 p-5 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold">
                <Bot
                  className="text-cyan-300"
                  size={20}
                />
                Prithvi AI
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Disaster Intelligence Assistant
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-cyan-400 px-4 py-3 text-left font-bold text-slate-950">
              <Mic size={17} />
              Start Listening
            </button>

            <Link
              to="/assistant"
              className="flex w-full items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-left text-slate-300 transition hover:text-cyan-300"
            >
              <MessageSquareText size={17} />
              Chat with Assistant
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-left text-slate-300">
              <Volume2 size={17} />
              Read Current Alert
            </button>

            <Link
              to="/shelters"
              className="flex w-full items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-left text-slate-300 transition hover:text-cyan-300"
            >
              <MapPin size={17} />
              Show Nearby Shelters
            </Link>
          </div>

          <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
            Prototype assistant — not official emergency guidance.
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-105"
        title="Prithvi AI"
      >
        <Mic size={27} />
      </button>
    </div>
  );
}

