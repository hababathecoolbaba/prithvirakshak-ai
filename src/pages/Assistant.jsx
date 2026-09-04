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
import { getWeatherByCity } from "../lib/weather";

const suggestions = [
  "What is the weather now?",
  "Is my area at risk?",
  "Will it rain?",
  "How strong is the wind?",
  "Explain my warning.",
  "Find nearby shelter.",
];

export default function Assistant() {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("Jaipur");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hello. I am Prithvi AI. Ask me about live weather, forecast risk, preparedness and emergency resources.",
    },
  ]);

  async function sendMessage(messageText) {
    const message = (messageText || input).trim();

    if (!message || loading) return;

    setMessages((current) => [
      ...current,
      { sender: "user", text: message },
    ]);

    setInput("");
    setLoading(true);

    try {
      const lower = message.toLowerCase();

      const weatherQuestion = [
        "weather",
        "temperature",
        "rain",
        "wind",
        "risk",
        "storm",
        "forecast",
        "humidity",
      ].some((word) => lower.includes(word));

      let responseText;

      if (weatherQuestion) {
        const weather = await getWeatherByCity(location);

        responseText =
          `${weather.location.displayName}: ` +
          `${weather.current.condition}, ` +
          `${weather.current.temperature_2m}°C, ` +
          `feels like ${weather.current.apparent_temperature}°C. ` +
          `Humidity ${weather.current.relative_humidity_2m}%. ` +
          `Wind ${weather.current.wind_speed_10m} km/h, ` +
          `gusts ${weather.current.wind_gusts_10m} km/h. ` +
          `Rain chance ${weather.current.precipitationProbability ?? 0}%. ` +
          `PRITHVIRAKSHAK forecast risk: ${weather.risk.level} - ${weather.risk.action}. ` +
          `This is forecast information, not an official warning.`;
      } else {
        const data = await api.assistant(
          message,
          location
        );

        responseText = data.response;
      }

      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: responseText,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: `Unable to retrieve information: ${error.message}`,
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
                Live Weather Intelligence Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
            <Wifi size={14} />
            LIVE WEATHER CONNECTED
          </div>
        </div>

        <div className="mt-7 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4">
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

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-7 min-h-[420px] rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[88%] rounded-2xl px-5 py-4 leading-6 ${
                  message.sender === "user"
                    ? "ml-auto bg-cyan-400 text-slate-950"
                    : "bg-slate-950 text-slate-300"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-slate-400">
                <LoaderCircle className="animate-spin text-cyan-300" />
                Fetching live data...
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
            onClick={() => sendMessage()}
            className="rounded-xl bg-cyan-400 px-6 text-slate-950"
          >
            <Send />
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-xs text-amber-200">
          <ShieldAlert className="mb-2" />
          Live forecast data does not replace official IMD or government emergency warnings.
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
