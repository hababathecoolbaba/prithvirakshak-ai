import { useState } from "react";
import {
  Circle,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";

import Header from "../components/Header";
import FloatingAssistant from "../components/FloatingAssistant";

const times = [
  {
    time: "NOW",
    message: "Storm cell detected west of demo location",
    severity: "ORANGE",
  },
  {
    time: "+15 MIN",
    message: "Projected eastward movement",
    severity: "ORANGE",
  },
  {
    time: "+30 MIN",
    message: "Highest simulated impact period",
    severity: "RED",
  },
  {
    time: "+60 MIN",
    message: "Storm moving through locality",
    severity: "ORANGE",
  },
  {
    time: "+120 MIN",
    message: "Simulated risk decreasing",
    severity: "YELLOW",
  },
];

const layers = [
  "Weather Risk",
  "Rainfall",
  "Radar",
  "Storm Cells",
  "Lightning",
  "Wind",
  "Flood Risk",
  "Hospitals",
  "Shelters",
  "Citizen Reports",
  "Road Closures",
];

export default function LiveMap() {
  const [selected, setSelected] = useState(0);
  const [activeLayers, setActiveLayers] = useState([
    "Weather Risk",
    "Storm Cells",
  ]);

  const jaipur = [26.9124, 75.7873];

  function toggleLayer(layer) {
    setActiveLayers((current) =>
      current.includes(layer)
        ? current.filter((item) => item !== layer)
        : [...current, layer]
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="flex flex-col lg:flex-row">
        <aside className="border-b border-slate-800 bg-slate-950 p-5 lg:w-80 lg:border-b-0 lg:border-r">
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs font-bold text-amber-300">
            SIMULATED MAP DATA
          </div>

          <h1 className="mt-5 text-xl font-black">
            Live Hyper-Local Risk Map
          </h1>

          <div className="mt-6 text-xs font-bold tracking-widest text-slate-500">
            MAP LAYERS
          </div>

          <div className="mt-3 grid gap-2">
            {layers.map((layer) => (
              <label
                key={layer}
                className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-900 px-3 py-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={activeLayers.includes(layer)}
                  onChange={() => toggleLayer(layer)}
                />
                {layer}
              </label>
            ))}
          </div>
        </aside>

        <section className="relative min-h-[700px] flex-1">
          <MapContainer
            center={jaipur}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: "700px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {activeLayers.includes("Weather Risk") && (
              <Circle
                center={jaipur}
                radius={7000 + selected * 900}
                pathOptions={{
                  color: "#fb923c",
                  fillColor: "#fb923c",
                  fillOpacity: 0.16,
                }}
              >
                <Popup>
                  SIMULATED ORANGE RISK ZONE
                </Popup>
              </Circle>
            )}

            {activeLayers.includes("Storm Cells") && (
              <Circle
                center={[
                  26.94 - selected * 0.006,
                  75.71 + selected * 0.018,
                ]}
                radius={3400}
                pathOptions={{
                  color: "#ef4444",
                  fillColor: "#ef4444",
                  fillOpacity: 0.2,
                }}
              >
                <Popup>
                  SIMULATED STORM CELL
                </Popup>
              </Circle>
            )}
          </MapContainer>

          <div className="absolute bottom-5 left-1/2 z-[1000] w-[calc(100%-40px)] max-w-4xl -translate-x-1/2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/95 p-4 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-cyan-300">
                    NOWCAST
                  </div>
                  <div className="mt-1 text-sm sm:text-base">
                    {times[selected].message}
                  </div>
                </div>

                <div
                  className={`text-sm font-black ${
                    times[selected].severity === "RED"
                      ? "text-red-300"
                      : times[selected].severity === "ORANGE"
                        ? "text-orange-300"
                        : "text-yellow-300"
                  }`}
                >
                  {times[selected].severity}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {times.map((item, index) => (
                  <button
                    key={item.time}
                    onClick={() => setSelected(index)}
                    className={`rounded-xl px-2 py-3 text-[10px] font-bold sm:text-xs ${
                      selected === index
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-slate-900 text-slate-300"
                    }`}
                  >
                    {item.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FloatingAssistant />
    </div>
  );
}

