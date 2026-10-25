import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, CalendarDays, Heart, LayoutDashboard, LineChart, LogOut, Search, Settings, ShoppingBasket, UtensilsCrossed } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_authenticated")({
  component: AppLayout,
});

const nav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Meal Planner", url: "/planner", icon: CalendarDays },
  { title: "Recipes", url: "/recipes", icon: UtensilsCrossed },
  { title: "Grocery List", url: "/grocery", icon: ShoppingBasket },
  { title: "Nutrition", url: "/nutrition", icon: LineChart },
  { title: "Favorites", url: "/favorites", icon: Heart },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

function AppLayout() {
  const { ready, loggedIn, logout, prefs } = useStore();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !loggedIn) navigate({ to: "/login" });
  }, [ready, loggedIn, navigate]);

  if (!ready || !loggedIn) return <div className="min-h-screen bg-background" />;

  const doLogout = () => { logout(); navigate({ to: "/login" }); };
  const current = nav.find((n) => n.url === path);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader className="h-16 justify-center px-4 group-data-[collapsible=icon]:px-2">
            <div className="group-data-[collapsible=icon]:hidden"><Logo to="/dashboard" /></div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {nav.map((n) => (
                    <SidebarMenuItem key={n.url}>
                      <SidebarMenuButton asChild isActive={path === n.url} tooltip={n.title} className="h-10 rounded-xl font-medium data-[active=true]:bg-primary data-[active=true]:text-primary-foreground">
                        <Link to={n.url}><n.icon className="h-4 w-4" /><span>{n.title}</span></Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={doLogout} tooltip="Logout" className="h-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-4 w-4" /><span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-lg md:px-6">
            <SidebarTrigger />
            <h2 className="font-semibold">{current?.title}</h2>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search recipes…"
                  onKeyDown={(e) => { if (e.key === "Enter") navigate({ to: "/recipes", search: { q: (e.target as HTMLInputElement).value } }); }}
                  className="h-10 w-64 rounded-xl border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="relative grid h-10 w-10 place-items-center rounded-xl border bg-card" aria-label="Notifications">
                <Bell className="h-4 w-4" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-warm" />
              </button>
              <Link to="/settings" className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary font-bold text-primary-foreground">
                {prefs.name.charAt(0).toUpperCase()}
              </Link>
            </div>
          </header>
          <main key={path} className="page-enter flex-1 p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
