import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, Clock, Flame, Star, HeartCrack, ArrowRight } from "lucide-react";
import { sampleRecipes } from "@/lib/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/favorites")({
  head: () => ({ meta: [{ title: "Favorites — MealMate" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
    setMounted(true);
  }, []);

  const removeFavorite = (id: string) => {
    const newFavs = favorites.filter(f => f !== id);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    toast.success("Removed from favorites");
  };

  if (!mounted) return null;

  const favoriteRecipes = sampleRecipes.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="font-display text-3xl font-semibold">Your Favorites</h1>
        <p className="text-muted-foreground mt-1">Recipes you've loved and saved for later.</p>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-24 px-4 card-surface rounded-[2rem] flex flex-col items-center">
          <div className="inline-grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground mb-6">
            <HeartCrack className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-display font-semibold">No favorites yet</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            When you find a recipe you love, click the heart icon to save it here for quick access later.
          </p>
          <Button asChild className="mt-8 rounded-full" size="lg">
            <Link to="/recipes">Discover Recipes <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="card-surface hover-lift group overflow-hidden flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button 
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm grid place-items-center text-rose-500 hover:text-muted-foreground transition-colors"
                  onClick={() => removeFavorite(recipe.id)}
                >
                  <Heart className="h-4 w-4 fill-rose-500" />
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
      )}
    </div>
  );
}
