import { Link } from "@tanstack/react-router";
import logo from "@/assets/pulso-logo.png";

export function PulsoLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Pulso, inicio">
      <img src={logo} alt="Pulso" width={40} height={40} className="h-9 w-9 object-contain" />
      <span className="text-2xl font-extrabold tracking-tight text-primary">Pulso</span>
    </Link>
  );
}
