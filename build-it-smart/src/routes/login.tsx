import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/Logo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { signup?: boolean } => (s["signup"] ? { signup: true } : {}),
  head: () => ({
    meta: [
      { title: "Log in — MealMate" },
      { name: "description", content: "Log in to MealMate to plan meals, track nutrition and manage your grocery list." },
      { property: "og:title", content: "Log in — MealMate" },
      { property: "og:description", content: "Welcome back to your MealMate meal planner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signup } = Route.useSearch();
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [signOpen, setSignOpen] = useState(!!signup);
  const [s, setS] = useState({ name: "", email: "", pw: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !pw.trim()) { toast.error("Please enter your email and password"); return; }
    login(email);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };
  const signUp = (e: FormEvent) => {
    e.preventDefault();
    if (!s.name.trim() || !s.email.trim() || !s.pw.trim()) { toast.error("Please fill in all fields"); return; }
    login(s.email, s.name.trim().split(" ")[0]);
    toast.success("Account created — welcome to MealMate!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-hero px-4 py-10">
      <div className="page-enter w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="card-surface p-8 shadow-lift">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="font-display mt-6 text-center text-3xl font-semibold">Welcome Back</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">Log in to continue planning your meals.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label htmlFor="pw">Password</Label>
                <button type="button" onClick={() => toast.info("Password reset link sent (demo)")} className="text-xs font-medium text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Input id="pw" type={show ? "text" : "password"} placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} className="h-11 rounded-xl pr-10" />
                <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="h-11 w-full rounded-xl">Login</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button onClick={() => setSignOpen(true)} className="font-semibold text-primary hover:underline">Sign up</button>
          </p>
        </div>
      </div>

      <Dialog open={signOpen} onOpenChange={setSignOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogTitle className="font-display text-2xl">Create your account</DialogTitle>
          <DialogDescription>Start planning healthier meals in seconds.</DialogDescription>
          <form onSubmit={signUp} className="mt-2 space-y-4">
            <div className="space-y-1.5"><Label>Full name</Label><Input value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} placeholder="Deva Prasath" className="h-11 rounded-xl" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} placeholder="you@example.com" className="h-11 rounded-xl" /></div>
            <div className="space-y-1.5"><Label>Password</Label><Input type="password" value={s.pw} onChange={(e) => setS({ ...s, pw: e.target.value })} placeholder="Create a password" className="h-11 rounded-xl" /></div>
            <Button type="submit" className="h-11 w-full rounded-xl">Sign up & continue</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
