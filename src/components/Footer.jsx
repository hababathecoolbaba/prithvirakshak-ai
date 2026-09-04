import { Link } from "react-router";

const sections = [
  {
    title: "Weather",
    links: [
      ["Live Forecast", "/nowcast"],
      ["Weather Risk", "/alerts"],
      ["Live Map", "/map"],
    ],
  },
  {
    title: "Safety",
    links: [
      ["Emergency", "/emergency"],
      ["Preparedness", "/preparedness"],
      ["Shelters", "/shelters"],
    ],
  },
  {
    title: "Platform",
    links: [
      ["About", "/about"],
      ["Data Sources", "/sources"],
      ["Prithvi AI", "/assistant"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-black tracking-[0.16em]">
              PRITHVIRAKSHAK AI
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-500">
              Hyper-local weather and disaster intelligence platform.
            </p>

            <div className="mt-5 text-sm text-slate-400">
              Weather data:
              {" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:underline"
              >
                Open-Meteo
              </a>
              {" "}· CC BY 4.0
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="text-sm font-bold">
                  {section.title}
                </div>

                <div className="mt-4 space-y-3">
                  {section.links.map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="block text-sm text-slate-500 hover:text-cyan-300"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-600">
          Forecast data is informational. Official disaster warnings must come from authorized government sources.
        </div>
      </div>
    </footer>
  );
}
