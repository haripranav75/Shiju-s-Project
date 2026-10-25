import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CalendarDays, Check, Droplets, Flame, Minus, Plus, ShoppingBasket, Sparkles, Beef, UtensilsCrossed, Heart, LineChart, ArrowRight, Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RecipeImage } from "@/components/RecipeImage";
import { RecipeDialog } from "@/components/RecipeDialog";
import { DAYS, SLOTS, dayTotals, getRecipe, groceryFromPlan, todayName, type Category, type Recipe } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MealMate" }, { name: "description", content: "Your daily meals, nutrition and groceries at a glance." }, { property: "og:title", content: "Dashboard — MealMate" }, { property: "og:description", content: "Your daily meals, nutrition and groceries at a glance." }] }),
  component: Page,
});

const SLOT_LABEL: Record<Category, string> = { Breakfast: "Breakfast", Lunch: "Lunch", Dinner: "Dinner", Snacks: "Snack" };
const SLOT_TIME: Record<Category, string> = { Breakfast: "8:00 AM", Lunch: "1:00 PM", Dinner: "7:30 PM", Snacks: "4:30 PM" };

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

function Page() {
  const { plan, setPlan, prefs, water, setWater, grocery, setGrocery, favorites } = useStore();
  const [open, setOpen] = useState<Recipe | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const today = todayName();
  const totals = dayTotals(plan, today);
  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const week = useMemo(() => DAYS.map((d) => ({ day: d, short: d.slice(0, 3), ...dayTotals(plan, d) })), [plan]);
  const weekMeals = week.reduce((a, d) => a + d.meals, 0);

  const pct = (v: number, goal: number) => Math.min(100, Math.round((v / Math.max(goal, 1)) * 100));
  const calPct = pct(totals.calories, prefs.calorieGoal);
  const proteinPct = pct(totals.protein, prefs.proteinGoal);

  const summary = [
    { label: "Calories", value: totals.calories.toLocaleString(), unit: `/ ${prefs.calorieGoal.toLocaleString()} kcal`, pct: calPct, icon: Flame, tone: "bg-warm-soft text-warm" },
    { label: "Protein", value: `${totals.protein}`, unit: `/ ${prefs.proteinGoal} g`, pct: proteinPct, icon: Beef, tone: "bg-primary-soft text-primary" },
    { label: "Meals Planned", value: `${totals.meals}`, unit: "today", pct: pct(totals.meals, 4), icon: UtensilsCrossed, tone: "bg-sky-soft text-sky" },
    { label: "Water", value: `${water}`, unit: `/ ${prefs.waterGoal} glasses`, pct: pct(water, prefs.waterGoal), icon: Droplets, tone: "bg-berry-soft text-berry" },
  ];

  const removeMeal = (slot: Category, id: string) => {
    const list = plan[today][slot];
    const i = list.indexOf(id);
    if (i < 0) return;
    setPlan({ ...plan, [today]: { ...plan[today], [slot]: list.filter((_, idx) => idx !== i) } });
    toast(`Removed from ${SLOT_LABEL[slot].toLowerCase()}`);
  };

  const toggleItem = (id: string) => setGrocery(grocery.map((g) => (g.id === id ? { ...g, purchased: !g.purchased } : g)));
  const generateGrocery = () => {
    setGrocery(groceryFromPlan(plan));
    toast.success("Grocery list updated from your meal plan");
  };
  const remaining = grocery.filter((g) => !g.purchased);
  const bought = grocery.length - remaining.length;

  const macros = [
    { label: "Carbs", value: totals.carbs, goal: 250, bar: "bg-sun" },
    { label: "Fat", value: totals.fat, goal: 70, bar: "bg-berry" },
    { label: "Fiber", value: totals.fiber, goal: 30, bar: "bg-sky" },
    { label: "Protein", value: totals.protein, goal: prefs.proteinGoal, bar: "bg-primary" },
  ];

  const quick = [
    { label: "Add a meal", icon: Plus, to: "/planner" as const },
    { label: "Browse recipes", icon: UtensilsCrossed, to: "/recipes" as const },
    { label: "Favorites", icon: Heart, to: "/favorites" as const },
    { label: "Nutrition", icon: LineChart, to: "/nutrition" as const },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{dateLabel}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">{greeting()}, {prefs.name}! 👋</h1>
          <p className="mt-1 text-muted-foreground">
            {totals.meals > 0 ? `You have ${totals.meals} meal${totals.meals > 1 ? "s" : ""} planned — ${Math.max(prefs.calorieGoal - totals.calories, 0).toLocaleString()} kcal left in your goal.` : "Nothing planned yet — let's fix that."}
          </p>
        </div>
        <Button asChild size="lg" className="rounded-xl bg-gradient-primary shadow-soft">
          <Link to="/planner"><Sparkles className="mr-2 h-4 w-4" />Plan Your Day</Link>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="card-surface hover-lift p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl", s.tone)}><s.icon className="h-4 w-4" /></span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.unit}</span>
            </div>
            <Progress value={s.pct} className="mt-3 h-2" />
            {s.label === "Water" && (
              <div className="mt-3 flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg" aria-label="Remove a glass" onClick={() => setWater(Math.max(0, water - 1))}><Minus className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="h-8 flex-1 rounded-lg" onClick={() => { setWater(water + 1); if (water + 1 === prefs.waterGoal) toast.success("Hydration goal reached! 💧"); }}>
                  <Plus className="mr-1 h-3.5 w-3.5" />Add glass
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's meals */}
        <section className="card-surface p-5 md:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Today's Meals</h2>
              <p className="text-sm text-muted-foreground">{today}</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-lg text-primary"><Link to="/planner">Open planner<ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="space-y-5">
            {SLOTS.map((slot) => {
              const items = plan[today][slot];
              return (
                <div key={slot}>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{SLOT_LABEL[slot]}</h3>
                    <span className="text-xs text-muted-foreground">{SLOT_TIME[slot]}</span>
                  </div>
                  {items.length === 0 ? (
                    <Link to="/recipes" className="flex items-center justify-center gap-2 rounded-2xl border border-dashed p-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary">
                      <Plus className="h-4 w-4" />Nothing planned — add a {SLOT_LABEL[slot].toLowerCase()}
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      {items.map((id, i) => {
                        const r = getRecipe(id);
                        if (!r) return null;
                        return (
                          <div key={`${id}-${i}`} className="group flex items-center gap-3 rounded-2xl border bg-background p-2.5 transition-shadow hover:shadow-soft">
                            <button onClick={() => setOpen(r)} className="flex min-w-0 flex-1 items-center gap-3 text-left" aria-label={`View ${r.name}`}>
                              <RecipeImage src={r.image} alt={r.name} className="h-16 w-16 shrink-0 rounded-xl" />
                              <div className="min-w-0">
                                <p className="truncate font-medium">{r.name}</p>
                                <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                                  <span className="font-semibold text-warm">{r.calories} kcal</span>
                                  <span>P {r.protein}g</span><span>C {r.carbs}g</span><span>F {r.fat}g</span>
                                </p>
                              </div>
                            </button>
                            <Button size="sm" variant="ghost" className="rounded-lg text-muted-foreground hover:text-destructive" onClick={() => removeMeal(slot, id)}>Remove</Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="space-y-6">
          {/* Quick actions */}
          <section className="card-surface p-5 md:p-6">
            <h2 className="font-display text-xl font-semibold">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quick.map((q) => (
                <Link key={q.label} to={q.to} className="hover-lift flex flex-col items-start gap-2 rounded-2xl border bg-background p-3.5 text-sm font-medium">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><q.icon className="h-4 w-4" /></span>
                  {q.label}
                </Link>
              ))}
              <button onClick={generateGrocery} className="hover-lift col-span-2 flex items-center gap-3 rounded-2xl border bg-background p-3.5 text-left text-sm font-medium">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-warm-soft text-warm"><Wand2 className="h-4 w-4" /></span>
                Generate grocery list from plan
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{favorites.length} saved favorite{favorites.length === 1 ? "" : "s"}</p>
          </section>

          {/* Macro progress */}
          <section className="card-surface p-5 md:p-6">
            <h2 className="font-display text-xl font-semibold">Today's Nutrition</h2>
            <div className="mt-4 space-y-4">
              {macros.map((m) => (
                <div key={m.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{m.label}</span>
                    <span className="text-muted-foreground">{m.value}g / {m.goal}g</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full transition-all duration-500", m.bar)} style={{ width: `${pct(m.value, m.goal)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly overview */}
        <section className="card-surface p-5 md:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Weekly Overview</h2>
              <p className="text-sm text-muted-foreground">{weekMeals} meals planned this week</p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {week.map((d) => (
              <Link key={d.day} to="/planner" className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border p-2 py-3 text-center transition-colors hover:border-primary",
                d.day === today ? "border-primary bg-primary-soft" : "bg-background",
              )}>
                <span className={cn("text-xs font-semibold", d.day === today ? "text-primary" : "text-muted-foreground")}>{d.short}</span>
                <span className="font-display text-lg font-semibold leading-none">{d.meals}</span>
                <span className="hidden text-[10px] text-muted-foreground sm:block">meals</span>
                {d.meals >= 3 && <Check className="h-3.5 w-3.5 text-primary" />}
              </Link>
            ))}
          </div>

          <h3 className="mb-2 mt-6 text-sm font-semibold">Calories per day</h3>
          <div className="h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={week} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="short" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, Math.ceil((Math.max(prefs.calorieGoal, ...week.map((d) => d.calories)) * 1.1) / 500) * 500]} />
                  <Tooltip cursor={{ fill: "var(--color-muted)" }} formatter={(v) => [`${v} kcal`, "Calories"]} contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                  <ReferenceLine y={prefs.calorieGoal} stroke="var(--color-warm)" strokeDasharray="4 4" label={{ value: "Goal", position: "insideTopRight", fontSize: 11, fill: "var(--color-warm)" }} />
                  <Bar dataKey="calories" radius={[8, 8, 0, 0]}>
                    {week.map((d) => <Cell key={d.day} fill={d.day === today ? "var(--color-chart-1)" : "var(--color-primary-soft)"} stroke="var(--color-chart-1)" />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Grocery preview */}
        <section className="card-surface p-5 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Grocery List</h2>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-warm-soft text-warm"><ShoppingBasket className="h-4 w-4" /></span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{bought} of {grocery.length} items purchased</p>
          <Progress value={grocery.length ? (bought / grocery.length) * 100 : 0} className="mt-2 h-2" />
          {remaining.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-primary-soft p-4 text-center text-sm text-primary">{grocery.length ? "All done — everything's in the basket! 🎉" : "Your list is empty."}</p>
          ) : (
            <ul className="mt-4 space-y-1">
              {remaining.slice(0, 6).map((g) => (
                <li key={g.id}>
                  <button onClick={() => toggleItem(g.id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-muted">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border" aria-hidden />
                    <span className="min-w-0 flex-1 truncate">{g.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{g.qty}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
            <Link to="/grocery">View full list{remaining.length > 6 ? ` (+${remaining.length - 6} more)` : ""}</Link>
          </Button>
        </section>
      </div>

      <RecipeDialog recipe={open} onOpenChange={(o) => !o && setOpen(null)} />
    </div>
  );
}
