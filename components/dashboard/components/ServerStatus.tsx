"use client";

import { CheckCircle, WifiOff, Loader2 } from "lucide-react";

interface ServerStatusProps {
  status: "checking" | "online" | "offline";
}

export function ServerStatus({ status }: ServerStatusProps) {
  const config = {
    checking: {
      icon: Loader2,
      text: "Conectando...",
      className: "bg-wheatGold/10 text-wheatGold",
      animate: "animate-spin",
    },
    online: {
      icon: CheckCircle,
      text: "Sensores activos",
      className: "bg-oliveGreen/10 text-oliveGreen",
      animate: "",
    },
    offline: {
      icon: WifiOff,
      text: "Sensores desconectados",
      className: "bg-sicilian-red/10 text-sicilian-red",
      animate: "",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div
      className={`px-4 py-2 rounded-full flex items-center gap-2 ${current.className}`}
    >
      <Icon className={`w-4 h-4 ${current.animate}`} />
      <span className="font-medium">{current.text}</span>
    </div>
  );
}
