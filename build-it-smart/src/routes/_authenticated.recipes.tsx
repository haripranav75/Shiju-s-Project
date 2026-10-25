import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Heart, Clock, Flame, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { sampleRecipes } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/recipes")({
  head: () => ({ meta: [{ title: "Recipes — MealMate" }] }),
  component: RecipesPage,
});

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegetarian", "High Protein"];

function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const newFavs = isFav ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      toast.success(isFav ? "Removed from favorites" : "Added to favorites");
      return newFavs;
    });
  };

  const filteredRecipes = sampleRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === "All") return matchesSearch;
    if (activeCategory === "Vegetarian") return matchesSearch && !recipe.ingredients.some(i => i.toLowerCase().includes("chicken") || i.toLowerCase().includes("salmon") || i.toLowerCase().includes("turkey"));
    if (activeCategory === "High Protein") return matchesSearch && recipe.protein >= 20;
    return matchesSearch && recipe.category === activeCategory;
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Discover Recipes</h1>
          <p className="text-muted-foreground mt-1">Find healthy and delicious meals for your plan.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for recipes, ingredients..." 
            className="pl-9 bg-card h-12 rounded-xl border-border/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0 md:max-w-xl lg:max-w-3xl">
          {CATEGORIES.map(c => (
            <Button 
              key={c} 
              variant={activeCategory === c ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id} 
            className="card-surface hover-lift group cursor-pointer overflow-hidden flex flex-col"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <button 
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm grid place-items-center text-muted-foreground hover:text-rose-500 transition-colors"
                onClick={(e) => toggleFavorite(e, recipe.id)}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(recipe.id) ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-500" />
                {recipe.rating}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{recipe.category}</div>
              <h3 className="font-semibold text-lg line-clamp-1 mb-3">{recipe.name}</h3>
              <div className="mt-auto flex justify-between items-center text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {recipe.calories} kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">No recipes found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
        </div>
      )}

      <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
        {selectedRecipe && (
          <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 max-h-[90vh]">
            <div className="relative h-64 w-full">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
              <button 
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm grid place-items-center shadow-sm hover:scale-105 transition-transform"
                onClick={(e) => toggleFavorite(e, selectedRecipe.id)}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(selectedRecipe.id) ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{selectedRecipe.category}</div>
                  <DialogTitle className="text-2xl md:text-3xl font-display leading-tight">{selectedRecipe.name}</DialogTitle>
                </div>
                <Button onClick={() => { toast.success("Added to meal plan"); setSelectedRecipe(null); }} className="shrink-0 gap-2 rounded-full">
                  <Plus className="h-4 w-4" /> Add to Plan
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 border-y py-4 mb-8 text-sm">
                <div><span className="text-muted-foreground block mb-1">Time</span><span className="font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {selectedRecipe.time}</span></div>
                <div><span className="text-muted-foreground block mb-1">Calories</span><span className="font-semibold flex items-center gap-1.5"><Flame className="h-4 w-4 text-orange-500" /> {selectedRecipe.calories} kcal</span></div>
                <div><span className="text-muted-foreground block mb-1">Protein</span><span className="font-semibold">{selectedRecipe.protein}g</span></div>
                <div><span className="text-muted-foreground block mb-1">Carbs</span><span className="font-semibold">{selectedRecipe.carbs}g</span></div>
                <div><span className="text-muted-foreground block mb-1">Fat</span><span className="font-semibold">{selectedRecipe.fat}g</span></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 font-display">Ingredients</h3>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ing: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 border-b border-border/50 pb-3 last:border-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 font-display">Instructions</h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((inst: string, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-primary text-xs font-bold">{i + 1}</span>
                        <span className="pt-0.5">{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
