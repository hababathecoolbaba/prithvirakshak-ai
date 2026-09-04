import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="font-black tracking-[0.14em]">
              PRITHVIRAKSHAK AI
            </div>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
              Hyper-local weather and disaster
              intelligence web platform.
            </p>

            <div className="mt-4 text-xs text-slate-500">
              Weather data: Open-Meteo
              <br />
              Maps: OpenStreetMap
              <br />
              Directions & nearby searches:
              Google Maps
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              to="/preparedness"
              className="text-slate-400"
            >
              Preparedness
            </Link>

            <Link
              to="/services"
              className="text-slate-400"
            >
              Emergency Services
            </Link>

            <Link
              to="/shelters"
              className="text-slate-400"
            >
              Find Shelter
            </Link>

            <Link
              to="/safe-route"
              className="text-slate-400"
            >
              Route Planner
            </Link>

            <Link
              to="/about"
              className="text-slate-400"
            >
              About
            </Link>

            <Link
              to="/sources"
              className="text-slate-400"
            >
              Data Sources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
