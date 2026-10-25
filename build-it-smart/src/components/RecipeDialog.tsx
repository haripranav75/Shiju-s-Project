import { useState } from "react";
import { Clock, Flame, Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DAYS, SLOTS, todayName, type Category, type Day, type Recipe } from "@/lib/data";
import { useStore } from "@/lib/store";
import { RecipeImage } from "./RecipeImage";
import { cn } from "@/lib/utils";

export function useAddToPlan() {
  const { plan, setPlan } = useStore();
  return (recipe: Recipe, day: Day = todayName(), slot: Category = recipe.category) => {
    setPlan({ ...plan, [day]: { ...plan[day], [slot]: [...plan[day][slot], recipe.id] } });
    toast.success(`${recipe.name} added`, { description: `${day} · ${slot}` });
  };
}

export function RecipeDialog({ recipe, onOpenChange }: { recipe: Recipe | null; onOpenChange: (o: boolean) => void }) {
  const { favorites, toggleFavorite } = useStore();
  const add = useAddToPlan();
  const [day, setDay] = useState<Day>(todayName());
  const [slot, setSlot] = useState<Category | "">("");
  if (!recipe) return null;
  const fav = favorites.includes(recipe.id);
  const macros = [
    { l: "Calories", v: recipe.calories, u: "kcal", c: "bg-warm-soft text-warm" },
    { l: "Protein", v: recipe.protein, u: "g", c: "bg-primary-soft text-primary" },
    { l: "Carbs", v: recipe.carbs, u: "g", c: "bg-sun-soft text-foreground" },
    { l: "Fat", v: recipe.fat, u: "g", c: "bg-berry-soft text-berry" },
    { l: "Fiber", v: recipe.fiber, u: "g", c: "bg-sky-soft text-sky" },
  ];
  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl p-0">
        <div className="relative">
          <RecipeImage src={recipe.image} alt={recipe.name} className="h-60 w-full rounded-t-3xl" />
          <button
            onClick={() => toggleFavorite(recipe.id)}
            aria-label="Toggle favorite"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur"
          >
            <Heart className={cn("h-5 w-5", fav ? "fill-berry text-berry" : "text-muted-foreground")} />
          </button>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary">{recipe.category}</span>
              {recipe.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{t}</span>
              ))}
            </div>
            <DialogTitle className="font-display text-3xl font-semibold">{recipe.name}</DialogTitle>
            <DialogDescription className="mt-1">{recipe.description}</DialogDescription>
            <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{recipe.time} min</span>
              <span className="flex items-center gap-1"><Flame className="h-4 w-4" />{recipe.calories} kcal</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-sun text-sun" />{recipe.rating}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {macros.map((m) => (
              <div key={m.l} className={cn("rounded-2xl p-3 text-center", m.c)}>
                <div className="text-lg font-bold">{m.v}<span className="text-xs font-medium">{m.u}</span></div>
                <div className="text-xs opacity-80">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold">Ingredients</h4>
              <ul className="space-y-2 text-sm">
                {recipe.ingredients.map((i) => (
                  <li key={i.name} className="flex justify-between border-b border-dashed pb-2">
                    <span>{i.name}</span><span className="text-muted-foreground">{i.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Instructions</h4>
              <ol className="space-y-3 text-sm">
                {recipe.instructions.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">{i + 1}</span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-muted p-4 sm:flex-row">
            <Select value={day} onValueChange={(v) => setDay(v as Day)}>
              <SelectTrigger className="bg-card"><SelectValue /></SelectTrigger>
              <SelectContent>{DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={slot || recipe.category} onValueChange={(v) => setSlot(v as Category)}>
              <SelectTrigger className="bg-card"><SelectValue /></SelectTrigger>
              <SelectContent>{SLOTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Button className="shrink-0" onClick={() => { add(recipe, day, (slot || recipe.category) as Category); onOpenChange(false); }}>
              <Plus className="h-4 w-4" /> Add to Meal Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
