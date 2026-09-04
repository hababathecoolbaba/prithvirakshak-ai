import { Earth, MapPin, Radio, Shield } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
        <Earth className="h-8 w-8 text-cyan-300" />
        <Shield className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-400" />
        <Radio className="absolute -top-1 -right-1 h-4 w-4 text-cyan-400" />
        <MapPin className="absolute -bottom-1 -left-1 h-4 w-4 text-sky-300" />
      </div>

      <div>
        <div className="font-bold tracking-[0.16em] text-white">
          PRITHVIRAKSHAK AI
        </div>
        <div className="text-xs text-cyan-300">
          Hyper-Local Disaster Intelligence
        </div>
      </div>
    </div>
  );
}

