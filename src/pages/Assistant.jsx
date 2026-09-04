import { useState } from "react";

import {
  Bot,
  MapPin,
  Send,
} from "lucide-react";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../lib/weather";

import {
  getGPSPosition,
} from "../lib/locationLinks";

const suggestions = [
  "What is the weather now?",
  "Will it rain?",
  "How strong is the wind?",
  "Is there a weather risk?",
  "Find a shelter",
  "How do I get emergency help?",
];

export default function Assistant() {
  const [input, setInput] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [coords, setCoords] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "ai",
        text:
          "Hello. I am Prithvi AI. Select a location or enable GPS, then ask me about live weather, preparedness, shelters, routes or emergency services.",
      },
    ]);

  async function enableGPS() {
    try {
      const position =
        await getGPSPosition();

      setCoords(position);
      setLocation(
        "Current GPS Location"
      );
    } catch (err) {
      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: err.message,
        },
      ]);
    }
  }

  async function getSelectedWeather() {
    if (coords) {
      return getWeatherByCoords(
        coords.latitude,
        coords.longitude,
        {
          name:
            "Current GPS Location",
          displayName:
            "Current GPS Location",
        }
      );
    }

    const city = location.trim();

    if (!city) {
      throw new Error(
        "Choose a location or enable GPS first."
      );
    }

    return getWeatherByCity(city);
  }

  async function sendMessage(
    messageText
  ) {
    const message = (
      messageText || input
    ).trim();

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
      const lower =
        message.toLowerCase();

      let response = "";

      const weatherWords = [
        "weather",
        "temperature",
        "rain",
        "wind",
        "storm",
        "forecast",
        "humidity",
        "risk",
        "cloud",
      ];

      if (
        weatherWords.some((word) =>
          lower.includes(word)
        )
      ) {
        const data =
          await getSelectedWeather();

        response =
          `${data.location?.displayName || "Selected location"}: ` +
          `${data.current.condition}. ` +
          `Temperature ${data.current.temperature_2m}°C, ` +
          `feels like ${data.current.apparent_temperature}°C. ` +
          `Humidity ${data.current.relative_humidity_2m}%. ` +
          `Wind ${data.current.wind_speed_10m} km/h ` +
          `with gusts around ${data.current.wind_gusts_10m} km/h. ` +
          `Rain probability is ${data.current.precipitationProbability ?? 0}%. ` +
          `Forecast risk is ${data.risk.level} - ${data.risk.action}.`;
      } else if (
        lower.includes("shelter")
      ) {
        response =
          "Open Find Shelter to search live nearby shelter and relief-location listings.";
      } else if (
        lower.includes("route") ||
        lower.includes("direction")
      ) {
        response =
          "Open Route Planner to launch live directions from your current location.";
      } else if (
        lower.includes("emergency") ||
        lower.includes("help") ||
        lower.includes("police") ||
        lower.includes("hospital") ||
        lower.includes("fire")
      ) {
        response =
          "For emergencies in India, 112 is the nationwide emergency number. The Emergency Services page can also open nearby hospitals, police and fire services.";
      } else if (
        lower.includes("flood")
      ) {
        response =
          "During flooding, follow local authority instructions, avoid entering floodwater and move toward a safer location if directed.";
      } else if (
        lower.includes("lightning")
      ) {
        response =
          "During lightning, move indoors and avoid exposed outdoor areas. Follow official local weather warnings.";
      } else {
        response =
          "I can help with live weather, forecast risk, emergency services, shelters, routes and preparedness.";
      }

      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: response,
        },
      ]);
    } catch (err) {
      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: err.message,
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
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
            <Bot
              size={30}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              Prithvi AI
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Live Weather & Disaster Assistant
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4">
            <MapPin
              size={18}
              className="text-cyan-400"
            />

            <input
              value={location}
              onChange={(event) => {
                setLocation(
                  event.target.value
                );

                setCoords(null);
              }}
              placeholder="Enter city or enable GPS"
              className="w-full bg-transparent py-4 outline-none"
            />
          </div>

          <button
            onClick={enableGPS}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            Enable GPS
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestions.map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() =>
                  sendMessage(
                    suggestion
                  )
                }
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
              >
                {suggestion}
              </button>
            )
          )}
        </div>

        <div className="mt-7 min-h-[420px] rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="space-y-4">
            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`max-w-[88%] rounded-2xl px-5 py-4 ${
                    message.sender ===
                    "user"
                      ? "ml-auto bg-cyan-400 text-slate-950"
                      : "bg-slate-950 text-slate-300"
                  }`}
                >
                  {message.text}
                </div>
              )
            )}

            {loading && (
              <div className="text-slate-400">
                Fetching live weather...
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
              if (
                event.key === "Enter"
              ) {
                sendMessage();
              }
            }}
            placeholder="Ask Prithvi..."
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 outline-none"
          />

          <button
            onClick={() =>
              sendMessage()
            }
            className="rounded-xl bg-cyan-400 px-6 text-slate-950"
          >
            <Send />
          </button>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
