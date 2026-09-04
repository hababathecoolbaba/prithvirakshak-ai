import { Link } from "react-router";

const sections = [
  {
    title: "Weather",
    links: [
      ["Live Map", "/map"],
      ["Nowcast", "/nowcast"],
      ["Warnings", "/alerts"],
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
      ["Lite Mode", "/lite"],
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

            <div className="mt-1 text-sm text-cyan-300">
              Ministry of Earth Sciences
            </div>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-500">
              Hyper-local disaster intelligence prototype designed to transform
              verified weather information into local risk, expected impact
              and recommended action.
            </p>

            <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
              Prototype platform. Simulated information is not an official warning.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
          Data Sources: IMD | MoES | Authorized Disaster Systems | Prototype Simulation
        </div>
      </div>
    </footer>
  );
}

