import { Link } from "react-router";
import {
  Bot,
  Home,
  Map,
  ShieldAlert,
  Siren,
} from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1400] border-t border-slate-800 bg-slate-950/95 px-2 py-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        <NavItem to="/home" icon={Home} text="Home" />
        <NavItem to="/map" icon={Map} text="Map" />
        <NavItem to="/alerts" icon={Siren} text="Alerts" />
        <NavItem to="/assistant" icon={Bot} text="Prithvi" />
        <NavItem to="/emergency" icon={ShieldAlert} text="Emergency" emergency />
      </div>
    </nav>
  );
}

function NavItem({ to, icon: Icon, text, emergency = false }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] ${
        emergency ? "text-red-300" : "text-slate-400"
      }`}
    >
      <Icon size={19} />
      {text}
    </Link>
  );
}

