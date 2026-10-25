import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save, LogOut, User, Bell, Shield, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — MealMate" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : {
      name: "Deva Prasath",
      email: "deva@example.com",
      diet: "None",
      calories: "2100",
      allergies: "None",
      notifications: true,
      weeklyReport: true,
      darkMode: false
    };
  });

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("userSettings", JSON.stringify(settings));
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate({ to: "/login" });
  };

  return (
    <div className="space-y-8 max-w-4xl pb-10">
      <div>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 bg-card border">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile & Diet</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="appearance"><Moon className="h-4 w-4 mr-2" /> Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="card-surface p-6 space-y-6">
            <h3 className="font-semibold text-lg border-b pb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={settings.name} onChange={(e) => handleChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={settings.email} onChange={(e) => handleChange("email", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card-surface p-6 space-y-6">
            <h3 className="font-semibold text-lg border-b pb-4">Dietary Preferences</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Diet Type</Label>
                <Select value={settings.diet} onValueChange={(v) => handleChange("diet", v)}>
                  <SelectTrigger><SelectValue placeholder="Select diet" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="Vegan">Vegan</SelectItem>
                    <SelectItem value="Keto">Keto</SelectItem>
                    <SelectItem value="Paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Daily Calorie Goal</Label>
                <Input id="calories" type="number" value={settings.calories} onChange={(e) => handleChange("calories", e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Allergies (comma separated)</Label>
                <Input id="allergies" value={settings.allergies} onChange={(e) => handleChange("allergies", e.target.value)} placeholder="e.g. Peanuts, Shellfish" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="card-surface p-6 space-y-6">
            <h3 className="font-semibold text-lg border-b pb-4">Notification Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive a notification to log your meals.</p>
              </div>
              <Switch checked={settings.notifications} onCheckedChange={(v) => handleChange("notifications", v)} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Report</Label>
                <p className="text-sm text-muted-foreground">Get a weekly summary of your nutrition.</p>
              </div>
              <Switch checked={settings.weeklyReport} onCheckedChange={(v) => handleChange("weeklyReport", v)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <div className="card-surface p-6 space-y-6">
            <h3 className="font-semibold text-lg border-b pb-4">Appearance</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark mode on or off.</p>
              </div>
              <Switch checked={settings.darkMode} onCheckedChange={(v) => handleChange("darkMode", v)} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto min-w-[120px]">
          {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
        </Button>
        <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto min-w-[120px]">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
