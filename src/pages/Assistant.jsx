import { useState } from "react";
import {
  Bot,
  LoaderCircle,
  MapPin,
  Send,
  ShieldAlert,
  Wifi,
} from "lucide-react";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import { api } from "../lib/api";

const suggestions = [
  "Is my area at risk?",
  "Explain my warning.",
  "Where is the storm moving?",
  "Find nearby shelter.",
  "What should I do?",
  "Show emergency contacts.",
];

export default function Assistant() {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("Jaipur");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hello. I am Prithvi AI. I can explain prototype weather warnings, local risk, preparedness and emergency resources.",
    },
  ]);

  async function sendMessage(messageText) {
    const message = (messageText || input).trim();

    if (!message || loading) return;

    setMessages((current) => [
      ...current,
      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await api.assistant(message, location);

      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text:
            `Backend connection failed: ${error.message}. ` +
            "Check that the FastAPI terminal is still running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
              <Bot size={30} className="text-cyan-300" />
            </div>

            <div>
              <h1 className="text-4xl font-black">
                Prithvi AI
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Disaster Intelligence Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
            <Wifi size={14} />
            FASTAPI CONNECTED
          </div>
        </div>

        <div className="mt-7 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">
          Prototype assistant. Responses are generated from demonstration
          disaster data and are not official emergency warnings.
        </div>

        <div className="mt-6">
          <label className="text-xs font-bold text-slate-500">
            LOCATION CONTEXT
          </label>

          <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4">
            <MapPin size={18} className="text-cyan-300" />

            <input
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              className="w-full bg-transparent py-3 outline-none"
              placeholder="Location"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              disabled={loading}
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300 disabled:opacity-40"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-7 min-h-[420px] rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`max-w-[88%] rounded-2xl px-5 py-4 leading-6 ${
                  message.sender === "user"
                    ? "ml-auto bg-cyan-400 font-medium text-slate-950"
                    : "bg-slate-950 text-slate-300"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <Bot size={14} />
                    PRITHVI AI
                  </div>
                )}

                {message.text}
              </div>
            ))}

            {loading && (
              <div className="flex max-w-[88%] items-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-slate-400">
                <LoaderCircle
                  size={18}
                  className="animate-spin text-cyan-300"
                />

                Contacting PRITHVIRAKSHAK backend...
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask Prithvi..."
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none focus:border-cyan-400"
          />

          <button
            disabled={loading}
            onClick={() => sendMessage()}
            className="flex items-center justify-center rounded-xl bg-cyan-400 px-6 font-bold text-slate-950 disabled:opacity-50"
          >
            <Send size={21} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <ShieldAlert className="text-cyan-300" />

          <div className="mt-4 font-bold">
            Information Hierarchy
          </div>

          <div className="mt-2 text-sm leading-6 text-slate-400">
            Official Warning → Observed Weather → Verified Platform Data →
            Approved Guidance → AI Explanation
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

