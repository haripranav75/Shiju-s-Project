import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecipeImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div className={cn("grid place-items-center bg-primary-soft text-primary", className)}>
        <UtensilsCrossed className="h-1/3 w-1/3 max-h-10 max-w-10" />
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={cn("object-cover", className)} />;
}
