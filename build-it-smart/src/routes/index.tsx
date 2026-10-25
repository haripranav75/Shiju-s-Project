import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, HeartPulse, LineChart, Menu, ShoppingBasket, Sparkles, UtensilsCrossed, Clock, Wallet, Leaf, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import hero from "@/assets/hero-meals.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MealMate — Plan Your Meals. Eat Better. Live Smarter." },
      { name: "description", content: "MealMate helps you plan weekly meals, discover healthy recipes, track nutrition and auto-build your grocery list." },
      { property: "og:title", content: "MealMate — Smart Meal Planning" },
      { property: "og:description", content: "Plan your week, track nutrition and shop with an auto-generated grocery list." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: CalendarDays, title: "Weekly Planner", text: "Drag your week into shape with breakfast-to-dinner slots for every day.", c: "bg-primary-soft text-primary" },
  { icon: UtensilsCrossed, title: "Recipe Library", text: "Hand-picked, nutritionist-approved recipes with step-by-step guides.", c: "bg-warm-soft text-warm" },
  { icon: ShoppingBasket, title: "Smart Grocery Lists", text: "Ingredients are merged and grouped by aisle automatically.", c: "bg-sky-soft text-sky" },
  { icon: LineChart, title: "Nutrition Insights", text: "See calories, macros and water at a glance with beautiful charts.", c: "bg-berry-soft text-berry" },
];

const steps = [
  { n: "01", title: "Choose your meals", text: "Browse recipes by category, diet or protein and favorite what you love." },
  { n: "02", title: "Plan your week", text: "Slot meals into each day — MealMate tracks your calories as you go." },
  { n: "03", title: "Shop with your grocery list", text: "One tap builds a categorized list. Tick items off as you shop." },
];

function Landing() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", l: "Home" },
    { href: "#features", l: "Features" },
    { href: "#how", l: "How It Works" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {links.map((l) => <a key={l.l} href={l.href} className="transition-colors hover:text-foreground">{l.l}</a>)}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild><Link to="/login">Login</Link></Button>
            <Button asChild className="rounded-full"><Link to="/login" search={{ signup: true }}>Get Started</Link></Button>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Menu /></button>
        </div>
        {open && (
          <div className="space-y-3 border-t px-5 py-4 md:hidden">
            {links.map((l) => <a key={l.l} href={l.href} onClick={() => setOpen(false)} className="block font-medium">{l.l}</a>)}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1"><Link to="/login">Login</Link></Button>
              <Button asChild className="flex-1"><Link to="/login" search={{ signup: true }}>Get Started</Link></Button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <div className="page-enter">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-primary shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Your personal nutrition co-pilot
            </span>
            <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
              Plan Your Meals. <span className="text-primary">Eat Better.</span> Live Smarter.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              MealMate turns healthy eating into a simple weekly ritual — curated recipes, a beautiful planner, nutrition tracking and a grocery list that writes itself.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="h-12 rounded-full px-7 shadow-lift">
                <Link to="/login" search={{ signup: true }}>Get Started Free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 rounded-full px-7">
                <a href="#how">See how it works</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              {["No credit card", "Free forever plan", "Cancel anytime"].map((t) => (
                <span key={t} className="hidden items-center gap-1.5 sm:flex"><Check className="h-4 w-4 text-primary" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={hero} alt="Colorful healthy meal bowls" width={1280} height={1024} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-lift" />
            <div className="card-surface absolute -left-4 bottom-8 flex items-center gap-3 p-4 md:-left-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-warm-soft text-warm"><Flame className="h-5 w-5" /></span>
              <div><div className="text-xs text-muted-foreground">Today</div><div className="font-bold">1,840 / 2,100 kcal</div></div>
            </div>
            <div className="card-surface absolute -right-3 top-8 flex items-center gap-3 p-4 md:-right-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><Check className="h-5 w-5" /></span>
              <div><div className="text-xs text-muted-foreground">This week</div><div className="font-bold">21 meals planned</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="font-display mt-3 text-4xl font-semibold md:text-5xl">Everything you need to eat well</h2>
          <p className="mt-4 text-muted-foreground">Thoughtfully designed tools that take the guesswork out of every meal.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card-surface hover-lift p-6">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${f.c}`}><f.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="font-display mt-3 text-4xl font-semibold md:text-5xl">Three steps to a better week</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card-surface relative p-8">
                <span className="font-display text-5xl font-semibold text-primary/25">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Benefits</p>
          <h2 className="font-display mt-3 text-4xl font-semibold md:text-5xl">Healthier habits, less effort</h2>
          <p className="mt-4 text-muted-foreground">Our members save hours every week and finally hit their nutrition goals.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { i: Clock, t: "Save 4+ hours weekly", d: "No more daily 'what's for dinner?'" },
            { i: Wallet, t: "Cut grocery spend 25%", d: "Buy only what your plan needs." },
            { i: HeartPulse, t: "Hit your macros", d: "Balanced plans tuned to your goals." },
            { i: Leaf, t: "Reduce food waste", d: "Ingredients shared across meals." },
          ].map((b) => (
            <div key={b.t} className="card-surface p-5">
              <b.i className="h-6 w-6 text-primary" />
              <h4 className="mt-3 font-semibold">{b.t}</h4>
              <p className="text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary px-8 py-16 text-center text-primary-foreground shadow-lift">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Start planning smarter today</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Join thousands of people eating better with MealMate. It takes less than a minute to get started.</p>
          <Button size="lg" variant="secondary" asChild className="mt-8 h-12 rounded-full px-8">
            <Link to="/login" search={{ signup: true }}>Create your free account <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} MealMate. Eat well, every day.</p>
          <div className="flex gap-5"><a href="#features">Features</a><a href="#how">How it works</a><Link to="/login">Login</Link></div>
        </div>
      </footer>
    </div>
  );
}
