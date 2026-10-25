import { createFileRoute } from "@tanstack/react-router";
import { Activity, Flame, Droplets, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/_authenticated/nutrition")({
  head: () => ({ meta: [{ title: "Nutrition Analytics — MealMate" }] }),
  component: NutritionPage,
});

const weeklyData = [
  { day: "Mon", calories: 1950 },
  { day: "Tue", calories: 2100 },
  { day: "Wed", calories: 1850 },
  { day: "Thu", calories: 2050 },
  { day: "Fri", calories: 2200 },
  { day: "Sat", calories: 2400 },
  { day: "Sun", calories: 2000 },
];

const macroData = [
  { name: "Protein", value: 120, color: "hsl(var(--primary))" },
  { name: "Carbs", value: 200, color: "#3b82f6" },
  { name: "Fat", value: 65, color: "#f59e0b" },
];

function NutritionPage() {
  const dailyGoal = 2100;
  const consumed = 1840;
  const remaining = dailyGoal - consumed;
  const progress = Math.round((consumed / dailyGoal) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Nutrition Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your progress and stay on top of your goals.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft border-0 bg-gradient-to-br from-card to-secondary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium text-muted-foreground flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" /> Calories
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold font-display">{consumed}</h2>
              <span className="text-sm text-muted-foreground">/ {dailyGoal} kcal</span>
            </div>
            <Progress value={progress} className="h-2 mt-4 bg-secondary/50" indicatorClassName="bg-orange-500" />
            <p className="text-xs text-muted-foreground mt-2">{remaining} kcal remaining today</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <div className="font-medium text-muted-foreground">Protein</div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold font-display">95g</h2>
              <span className="text-sm text-muted-foreground">/ 140g</span>
            </div>
            <Progress value={68} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <div className="font-medium text-muted-foreground">Carbs & Fats</div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Carbs (150g/220g)</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-1.5" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Fats (45g/65g)</span>
                  <span className="font-medium">70%</span>
                </div>
                <Progress value={70} className="h-1.5" indicatorClassName="bg-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <div className="font-medium text-muted-foreground flex items-center gap-2">
                <Droplets className="h-4 w-4 text-cyan-500" /> Water
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold font-display">1.5</h2>
              <span className="text-sm text-muted-foreground">/ 2.5 L</span>
            </div>
            <Progress value={60} className="h-2 mt-4" indicatorClassName="bg-cyan-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Calories</CardTitle>
            <CardDescription>Your calorie intake over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <RechartsTooltip cursor={{ fill: 'hsl(var(--secondary))' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-lg">Today's Macronutrients</CardTitle>
            <CardDescription>Breakdown of your daily macros</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="h-[200px] w-[200px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold font-display">{consumed}</span>
                <span className="text-xs text-muted-foreground">kcal</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {macroData.map((macro) => (
                <div key={macro.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: macro.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{macro.name}</div>
                    <div className="text-xs text-muted-foreground">{macro.value}g</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
