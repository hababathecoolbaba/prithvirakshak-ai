import { Link, NavLink } from "react-router";
import {
  BarChart3,
  Building2,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Radio,
  Server,
  ShieldAlert,
  Truck,
  Users,
} from "lucide-react";

const links = [
  ["Overview", "/authority/dashboard", LayoutDashboard],
  ["Alert Management", "/authority/alerts", Radio],
  ["Incidents", "/authority/incidents", ShieldAlert],
  ["Resources", "/authority/resources", Truck],
  ["Responders", "/authority/responders", Users],
  ["Infrastructure", "/authority/infrastructure", Building2],
  ["Disaster Pulse", "/authority/pulse", HeartPulse],
  ["Analytics", "/authority/analytics", BarChart3],
  ["System Health", "/authority/system-health", Server],
  ["Audit Logs", "/authority/audit", ClipboardList],
];

export default function AuthoritySidebar() {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="border-b border-slate-800 p-6">
        <div className="font-black tracking-[0.14em] text-white">
          PRITHVIRAKSHAK
        </div>

        <div className="mt-1 text-xs font-bold text-cyan-300">
          COMMAND CENTRE
        </div>
      </div>

      <nav className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:block lg:space-y-1">
        {links.map(([name, path, Icon]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-cyan-400/10 font-bold text-cyan-300"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <Link
          to="/home"
          className="flex items-center gap-3 rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-400 hover:text-white"
        >
          <LogOut size={18} />
          Citizen View
        </Link>
      </div>
    </aside>
  );
}

