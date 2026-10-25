import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { INITIAL_PLAN, groceryFromPlan, type GroceryItem, type MealPlan } from "./data";

export interface Prefs {
  name: string;
  email: string;
  diet: string;
  calorieGoal: number;
  proteinGoal: number;
  waterGoal: number;
  allergies: string;
  foodPrefs: string;
  notifyMeals: boolean;
  notifyGrocery: boolean;
  notifyWeekly: boolean;
  theme: "light" | "dark";
}

const DEFAULT_PREFS: Prefs = {
  name: "Deva", email: "deva@mealmate.app", diet: "Balanced", calorieGoal: 2100, proteinGoal: 120, waterGoal: 8,
  allergies: "Peanuts", foodPrefs: "Mediterranean, Indian, high-fiber", notifyMeals: true, notifyGrocery: true, notifyWeekly: false, theme: "light",
};

interface Store {
  ready: boolean;
  loggedIn: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  plan: MealPlan;
  setPlan: (p: MealPlan) => void;
  grocery: GroceryItem[];
  setGrocery: (g: GroceryItem[]) => void;
  prefs: Prefs;
  setPrefs: (p: Prefs) => void;
  water: number;
  setWater: (n: number) => void;
}

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem("mealmate:" + key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["salmon", "quinoa-bowl", "berry-parfait"]);
  const [plan, setPlan] = useState<MealPlan>(INITIAL_PLAN);
  const [grocery, setGrocery] = useState<GroceryItem[]>(() => groceryFromPlan(INITIAL_PLAN));
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [water, setWater] = useState(5);

  useEffect(() => {
    setLoggedIn(load("auth", false));
    setFavorites((f) => load("favorites", f));
    setPlan((p) => load("plan", p));
    setGrocery((g) => load("grocery", g));
    setPrefs((p) => ({ ...p, ...load("prefs", {}) }));
    setWater((w) => load("water", w));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const save = (k: string, v: unknown) => localStorage.setItem("mealmate:" + k, JSON.stringify(v));
    save("auth", loggedIn);
    save("favorites", favorites);
    save("plan", plan);
    save("grocery", grocery);
    save("prefs", prefs);
    save("water", water);
  }, [ready, loggedIn, favorites, plan, grocery, prefs, water]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", prefs.theme === "dark");
  }, [prefs.theme]);

  const value: Store = {
    ready, loggedIn,
    login: (email, name) => {
      setLoggedIn(true);
      if (email || name) setPrefs((p) => ({ ...p, email: email || p.email, name: name || p.name }));
    },
    logout: () => setLoggedIn(false),
    favorites,
    toggleFavorite: (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    plan, setPlan, grocery, setGrocery, prefs, setPrefs, water, setWater,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
