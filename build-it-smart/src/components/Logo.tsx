import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="text-xl font-bold tracking-tight">
        Meal<span className="text-primary">Mate</span>
      </span>
    </Link>
  );
}
