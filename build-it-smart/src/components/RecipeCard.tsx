import { Clock, Flame, Heart, Plus, Star } from "lucide-react";
import type { Recipe } from "@/lib/data";
import { useStore } from "@/lib/store";
import { RecipeImage } from "./RecipeImage";
import { useAddToPlan } from "./RecipeDialog";
import { cn } from "@/lib/utils";

export function RecipeCard({ recipe, onView, onRemove }: { recipe: Recipe; onView: () => void; onRemove?: () => void }) {
  const { favorites, toggleFavorite } = useStore();
  const add = useAddToPlan();
  const fav = favorites.includes(recipe.id);
  return (
    <div className="group card-surface hover-lift overflow-hidden">
      <button onClick={onView} className="relative block w-full overflow-hidden">
        <RecipeImage src={recipe.image} alt={recipe.name} className="h-44 w-full transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium backdrop-blur">{recipe.category}</span>
      </button>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onView} className="text-left font-semibold leading-snug hover:text-primary">{recipe.name}</button>
          <button
            onClick={() => (onRemove ? onRemove() : toggleFavorite(recipe.id))}
            aria-label={fav ? "Remove favorite" : "Add favorite"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-berry-soft"
          >
            <Heart className={cn("h-4 w-4", fav ? "fill-berry text-berry" : "text-muted-foreground")} />
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.time}m</span>
          <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" />{recipe.calories} kcal</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-sun text-sun" />{recipe.rating}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onView} className="flex-1 rounded-xl bg-muted py-2 text-xs font-semibold transition-colors hover:bg-accent">View</button>
          <button onClick={() => add(recipe)} className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary-soft py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            <Plus className="h-3.5 w-3.5" /> Plan
          </button>
        </div>
      </div>
    </div>
  );
}
