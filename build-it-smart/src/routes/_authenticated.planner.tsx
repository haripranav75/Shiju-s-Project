import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Edit2, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleRecipes, getInitialMealPlan } from "@/lib/mockData";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/planner")({
  head: () => ({ meta: [{ title: "Meal Planner — MealMate" }] }),
  component: MealPlanner,
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

function MealPlanner() {
  const [mealPlan, setMealPlan] = useState<any>(() => {
    const saved = localStorage.getItem("mealPlan");
    return saved ? JSON.parse(saved) : getInitialMealPlan();
  });
  const [activeDay, setActiveDay] = useState("Monday");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMeal, setEditingMeal] = useState<{day: string, type: string} | null>(null);

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const handleRemoveMeal = (day: string, type: string) => {
    setMealPlan((prev: any) => ({
      ...prev,
      [day]: { ...prev[day], [type]: null }
    }));
    toast.success("Meal removed from plan");
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (editingMeal) {
      setMealPlan((prev: any) => ({
        ...prev,
        [editingMeal.day]: { ...prev[editingMeal.day], [editingMeal.type]: recipeId }
      }));
      toast.success("Meal updated successfully!");
      setIsDialogOpen(false);
      setEditingMeal(null);
    }
  };

  const generateGroceryList = () => {
    toast.success("Grocery list generated from your meal plan!");
  };

  const filteredRecipes = sampleRecipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Meal Planner</h1>
          <p className="text-muted-foreground mt-1">Plan your weekly meals to reach your goals.</p>
        </div>
        <Button onClick={generateGroceryList} className="gap-2">
          <ShoppingCart className="h-4 w-4" /> Generate Grocery List
        </Button>
      </div>

      <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-card border">
          {DAYS.map(day => (
            <TabsTrigger key={day} value={day} className="flex-1 py-2 px-4 rounded-md">
              {day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {DAYS.map(day => (
          <TabsContent key={day} value={day} className="mt-6 focus-visible:outline-none">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {MEAL_TYPES.map(type => {
                const recipeId = mealPlan[day]?.[type];
                const recipe = recipeId ? sampleRecipes.find(r => r.id === recipeId) : null;

                return (
                  <Card key={type} className="overflow-hidden shadow-soft border-0">
                    <div className="bg-secondary/40 px-4 py-2 border-b capitalize font-medium flex justify-between items-center text-sm">
                      <span>{type}</span>
                      {recipe && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => { setEditingMeal({day, type}); setIsDialogOpen(true); }}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveMeal(day, type)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-0">
                      {recipe ? (
                        <div className="flex p-4 gap-4">
                          <img src={recipe.image} alt={recipe.name} className="h-20 w-20 rounded-xl object-cover" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{recipe.name}</h4>
                            <div className="text-sm text-muted-foreground mt-1 flex gap-3">
                              <span>{recipe.time}</span>
                              <span>{recipe.calories} kcal</span>
                            </div>
                            <div className="flex gap-2 mt-2 text-xs">
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{recipe.protein}g P</span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{recipe.carbs}g C</span>
                              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{recipe.fat}g F</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center">
                          <Calendar className="h-8 w-8 mb-2 opacity-20" />
                          <p className="text-sm">No meal planned</p>
                          <Button variant="outline" size="sm" className="mt-4 gap-2 rounded-full" onClick={() => { setEditingMeal({day, type}); setIsDialogOpen(true); }}>
                            <Plus className="h-4 w-4" /> Add Meal
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Select a meal for {editingMeal?.day} {editingMeal?.type}</DialogTitle>
          </DialogHeader>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto pr-2 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="flex gap-3 p-3 rounded-xl border hover:border-primary/50 cursor-pointer transition-colors hover:bg-secondary/20"
                onClick={() => handleSelectRecipe(recipe.id)}
              >
                <img src={recipe.image} alt={recipe.name} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-sm line-clamp-1">{recipe.name}</h4>
                  <div className="text-xs text-muted-foreground mt-1">{recipe.calories} kcal • {recipe.category}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
