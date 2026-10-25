import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getInitialGroceryList } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/grocery")({
  head: () => ({ meta: [{ title: "Grocery List — MealMate" }] }),
  component: GroceryPage,
});

const CATEGORIES = ["Vegetables", "Fruits", "Dairy", "Meat & Protein", "Grains", "Pantry", "Other"];

function GroceryPage() {
  const [items, setItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("groceryList");
    return saved ? JSON.parse(saved) : getInitialGroceryList();
  });
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Other");

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    const newItem = {
      id: `g${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      checked: false
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
  };

  const clearPurchased = () => {
    setItems(items.filter(item => !item.checked));
  };

  const purchasedCount = items.filter(i => i.checked).length;
  const totalCount = items.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((purchasedCount / totalCount) * 100);

  // Group items by category
  const groupedItems = CATEGORIES.reduce((acc: any, category) => {
    const categoryItems = items.filter(item => item.category === category || (category === "Other" && !CATEGORIES.includes(item.category)));
    if (categoryItems.length > 0) acc[category] = categoryItems;
    return acc;
  }, {});

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Grocery List</h1>
          <p className="text-muted-foreground mt-1">Smart list auto-generated from your meal plan.</p>
        </div>
        {purchasedCount > 0 && (
          <Button variant="outline" onClick={clearPurchased} className="shrink-0 text-muted-foreground">
            Clear Purchased
          </Button>
        )}
      </div>

      <div className="card-surface p-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Shopping Progress</span>
          <span>{purchasedCount} of {totalCount} items purchased</span>
        </div>
        <Progress value={progressPercent} className="h-2.5" />
      </div>

      <form onSubmit={addItem} className="flex flex-col sm:flex-row gap-3">
        <Input 
          placeholder="Add an item..." 
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 bg-card h-11"
        />
        <div className="flex gap-3">
          <Select value={newItemCategory} onValueChange={setNewItemCategory}>
            <SelectTrigger className="w-[140px] bg-card h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button type="submit" className="h-11 px-6"><Plus className="h-4 w-4 mr-2" /> Add</Button>
        </div>
      </form>

      {totalCount === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>Your grocery list is empty.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, catItems]: [string, any]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {category} <span className="bg-secondary text-muted-foreground text-xs px-2 py-0.5 rounded-full">{catItems.length}</span>
              </h3>
              <div className="grid gap-2">
                {catItems.map((item: any) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${item.checked ? 'bg-secondary/40 border-transparent' : 'bg-card border-border/50 shadow-sm'}`}
                  >
                    <button 
                      className="flex items-center gap-3 flex-1 text-left"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.checked ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className={`${item.checked ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {item.name}
                      </span>
                    </button>
                    <button 
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-secondary/80"
                      onClick={() => deleteItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
