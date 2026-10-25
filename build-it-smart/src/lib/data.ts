export type Category = "Breakfast" | "Lunch" | "Dinner" | "Snacks";
export type GroceryCategory = "Vegetables" | "Fruits" | "Dairy" | "Meat & Protein" | "Grains" | "Pantry";

export interface Ingredient {
  name: string;
  qty: string;
  category: GroceryCategory;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  time: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  rating: number;
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
}

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const RECIPES: Recipe[] = [
  {
    id: "avocado-toast", name: "Avocado Toast & Poached Egg", category: "Breakfast", tags: ["Vegetarian"],
    time: 10, calories: 380, protein: 16, carbs: 32, fat: 22, fiber: 9, rating: 4.8, image: u("photo-1525351484163-7529414344d8"),
    description: "Crisp sourdough, smashed avocado, a jammy poached egg and chili flakes.",
    ingredients: [
      { name: "Sourdough bread", qty: "2 slices", category: "Grains" },
      { name: "Avocado", qty: "1", category: "Fruits" },
      { name: "Eggs", qty: "2", category: "Meat & Protein" },
      { name: "Chili flakes", qty: "1 pinch", category: "Pantry" },
    ],
    instructions: ["Toast the sourdough until golden.", "Mash avocado with lemon, salt and pepper.", "Poach eggs for 3 minutes in simmering water.", "Spread avocado, top with egg and chili flakes."],
  },
  {
    id: "berry-parfait", name: "Greek Yogurt Berry Parfait", category: "Breakfast", tags: ["Vegetarian", "High Protein"],
    time: 5, calories: 290, protein: 20, carbs: 38, fat: 7, fiber: 6, rating: 4.7, image: u("photo-1488477181946-6428a0291777"),
    description: "Layers of thick Greek yogurt, mixed berries, honey and crunchy granola.",
    ingredients: [
      { name: "Greek yogurt", qty: "200 g", category: "Dairy" },
      { name: "Mixed berries", qty: "1 cup", category: "Fruits" },
      { name: "Granola", qty: "40 g", category: "Grains" },
      { name: "Honey", qty: "1 tbsp", category: "Pantry" },
    ],
    instructions: ["Spoon yogurt into a glass.", "Add a layer of berries and granola.", "Repeat layers and drizzle with honey."],
  },
  {
    id: "fluffy-pancakes", name: "Banana Oat Pancakes", category: "Breakfast", tags: ["Vegetarian"],
    time: 20, calories: 420, protein: 14, carbs: 64, fat: 11, fiber: 7, rating: 4.6, image: u("photo-1567620905732-2d1ec7ab7445"),
    description: "Fluffy, naturally sweet pancakes made with oats and ripe banana.",
    ingredients: [
      { name: "Rolled oats", qty: "1 cup", category: "Grains" },
      { name: "Banana", qty: "2", category: "Fruits" },
      { name: "Eggs", qty: "2", category: "Meat & Protein" },
      { name: "Milk", qty: "120 ml", category: "Dairy" },
      { name: "Maple syrup", qty: "2 tbsp", category: "Pantry" },
    ],
    instructions: ["Blend oats, banana, eggs and milk until smooth.", "Rest batter 5 minutes.", "Cook ladlefuls on a hot pan, 2 minutes per side.", "Serve with maple syrup."],
  },
  {
    id: "green-smoothie", name: "Green Power Smoothie", category: "Snacks", tags: ["Vegetarian"],
    time: 5, calories: 210, protein: 8, carbs: 36, fat: 5, fiber: 7, rating: 4.5, image: u("photo-1505252585461-04db1eb84625"),
    description: "Spinach, mango, banana and almond milk blended bright and creamy.",
    ingredients: [
      { name: "Spinach", qty: "2 cups", category: "Vegetables" },
      { name: "Mango", qty: "1 cup", category: "Fruits" },
      { name: "Banana", qty: "1", category: "Fruits" },
      { name: "Almond milk", qty: "250 ml", category: "Dairy" },
    ],
    instructions: ["Add all ingredients to blender.", "Blend on high for 60 seconds.", "Serve immediately over ice."],
  },
  {
    id: "quinoa-bowl", name: "Mediterranean Quinoa Bowl", category: "Lunch", tags: ["Vegetarian"],
    time: 25, calories: 520, protein: 18, carbs: 62, fat: 22, fiber: 12, rating: 4.9, image: u("photo-1512621776951-a57141f2eefd"),
    description: "Fluffy quinoa with chickpeas, cucumber, tomato, olives and lemon-tahini.",
    ingredients: [
      { name: "Quinoa", qty: "1 cup", category: "Grains" },
      { name: "Chickpeas", qty: "1 can", category: "Pantry" },
      { name: "Cucumber", qty: "1", category: "Vegetables" },
      { name: "Cherry tomatoes", qty: "200 g", category: "Vegetables" },
      { name: "Feta cheese", qty: "60 g", category: "Dairy" },
      { name: "Tahini", qty: "2 tbsp", category: "Pantry" },
    ],
    instructions: ["Cook quinoa and let cool slightly.", "Chop cucumber and halve tomatoes.", "Whisk tahini with lemon and water.", "Assemble bowl and drizzle with dressing."],
  },
  {
    id: "chicken-salad", name: "Grilled Chicken Caesar Salad", category: "Lunch", tags: ["High Protein"],
    time: 20, calories: 480, protein: 42, carbs: 18, fat: 26, fiber: 5, rating: 4.7, image: u("photo-1546069901-ba9599a7e63c"),
    description: "Charred chicken breast over crisp romaine with a light yogurt Caesar.",
    ingredients: [
      { name: "Chicken breast", qty: "300 g", category: "Meat & Protein" },
      { name: "Romaine lettuce", qty: "1 head", category: "Vegetables" },
      { name: "Parmesan", qty: "30 g", category: "Dairy" },
      { name: "Whole grain croutons", qty: "1 cup", category: "Grains" },
    ],
    instructions: ["Season and grill chicken 6 minutes per side.", "Chop romaine.", "Toss with dressing, parmesan and croutons.", "Slice chicken and serve on top."],
  },
  {
    id: "lentil-soup", name: "Red Lentil Tomato Soup", category: "Lunch", tags: ["Vegetarian", "High Protein"],
    time: 35, calories: 340, protein: 19, carbs: 52, fat: 6, fiber: 15, rating: 4.6, image: u("photo-1547592180-85f173990554"),
    description: "Warming, spiced lentil soup finished with a swirl of yogurt.",
    ingredients: [
      { name: "Red lentils", qty: "1 cup", category: "Pantry" },
      { name: "Onion", qty: "1", category: "Vegetables" },
      { name: "Carrots", qty: "2", category: "Vegetables" },
      { name: "Crushed tomatoes", qty: "1 can", category: "Pantry" },
    ],
    instructions: ["Sauté onion and carrot until soft.", "Add lentils, tomatoes and stock.", "Simmer 20 minutes and blend half.", "Season and serve."],
  },
  {
    id: "salmon", name: "Lemon Herb Salmon & Greens", category: "Dinner", tags: ["High Protein"],
    time: 25, calories: 560, protein: 40, carbs: 20, fat: 34, fiber: 6, rating: 4.9, image: u("photo-1467003909585-2f8a72700288"),
    description: "Oven-roasted salmon with lemon, dill and garlicky green beans.",
    ingredients: [
      { name: "Salmon fillet", qty: "2 pcs", category: "Meat & Protein" },
      { name: "Green beans", qty: "250 g", category: "Vegetables" },
      { name: "Lemon", qty: "1", category: "Fruits" },
      { name: "Olive oil", qty: "2 tbsp", category: "Pantry" },
    ],
    instructions: ["Heat oven to 200°C.", "Season salmon with lemon, dill and oil.", "Roast with green beans 12–14 minutes.", "Finish with lemon zest."],
  },
  {
    id: "pasta-primavera", name: "Pasta Primavera", category: "Dinner", tags: ["Vegetarian"],
    time: 30, calories: 610, protein: 20, carbs: 88, fat: 18, fiber: 9, rating: 4.5, image: u("photo-1473093295043-cdd812d0e601"),
    description: "Whole wheat pasta tossed with spring vegetables and parmesan.",
    ingredients: [
      { name: "Whole wheat pasta", qty: "250 g", category: "Grains" },
      { name: "Zucchini", qty: "1", category: "Vegetables" },
      { name: "Bell pepper", qty: "1", category: "Vegetables" },
      { name: "Parmesan", qty: "40 g", category: "Dairy" },
    ],
    instructions: ["Boil pasta until al dente.", "Sauté vegetables in olive oil.", "Toss with pasta and pasta water.", "Top with parmesan."],
  },
  {
    id: "steak-bowl", name: "Steak & Sweet Potato Bowl", category: "Dinner", tags: ["High Protein"],
    time: 35, calories: 650, protein: 45, carbs: 48, fat: 28, fiber: 8, rating: 4.8, image: u("photo-1504674900247-0877df9cc836"),
    description: "Seared sirloin, roasted sweet potato and chimichurri.",
    ingredients: [
      { name: "Sirloin steak", qty: "300 g", category: "Meat & Protein" },
      { name: "Sweet potato", qty: "2", category: "Vegetables" },
      { name: "Parsley", qty: "1 bunch", category: "Vegetables" },
      { name: "Olive oil", qty: "3 tbsp", category: "Pantry" },
    ],
    instructions: ["Roast cubed sweet potato 25 minutes.", "Sear steak 3–4 minutes per side and rest.", "Blend parsley, garlic, oil for chimichurri.", "Slice and assemble."],
  },
  {
    id: "veggie-pizza", name: "Garden Veggie Flatbread", category: "Dinner", tags: ["Vegetarian"],
    time: 20, calories: 540, protein: 22, carbs: 64, fat: 20, fiber: 6, rating: 4.4, image: u("photo-1565299624946-b28f40a0ae38"),
    description: "Crispy flatbread with tomato, mozzarella, basil and seasonal veg.",
    ingredients: [
      { name: "Flatbread", qty: "2", category: "Grains" },
      { name: "Mozzarella", qty: "125 g", category: "Dairy" },
      { name: "Tomato sauce", qty: "1/2 cup", category: "Pantry" },
      { name: "Basil", qty: "1 bunch", category: "Vegetables" },
    ],
    instructions: ["Heat oven to 230°C.", "Spread sauce over flatbread.", "Top with mozzarella and veg.", "Bake 8–10 minutes, finish with basil."],
  },
  {
    id: "rainbow-salad", name: "Rainbow Crunch Salad", category: "Snacks", tags: ["Vegetarian"],
    time: 10, calories: 230, protein: 7, carbs: 24, fat: 12, fiber: 8, rating: 4.5, image: u("photo-1540189549336-e6e99c3679fe"),
    description: "Crunchy red cabbage, carrot, edamame and toasted seeds.",
    ingredients: [
      { name: "Red cabbage", qty: "1/4 head", category: "Vegetables" },
      { name: "Carrots", qty: "2", category: "Vegetables" },
      { name: "Edamame", qty: "1 cup", category: "Meat & Protein" },
      { name: "Pumpkin seeds", qty: "2 tbsp", category: "Pantry" },
    ],
    instructions: ["Shred cabbage and carrots.", "Toss with edamame.", "Dress with sesame-lime vinaigrette.", "Top with seeds."],
  },
  {
    id: "overnight-oats", name: "Peanut Butter Overnight Oats", category: "Breakfast", tags: ["Vegetarian", "High Protein"],
    time: 5, calories: 410, protein: 22, carbs: 48, fat: 15, fiber: 8, rating: 4.7, image: u("photo-1490645935967-10de6ba17061"),
    description: "Creamy no-cook oats with peanut butter, chia and protein.",
    ingredients: [
      { name: "Rolled oats", qty: "1/2 cup", category: "Grains" },
      { name: "Peanut butter", qty: "1 tbsp", category: "Pantry" },
      { name: "Chia seeds", qty: "1 tbsp", category: "Pantry" },
      { name: "Milk", qty: "200 ml", category: "Dairy" },
    ],
    instructions: ["Combine all ingredients in a jar.", "Stir well and refrigerate overnight.", "Top with banana in the morning."],
  },
];

export const getRecipe = (id: string) => RECIPES.find((r) => r.id === id);

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];
export const SLOTS: Category[] = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export type MealPlan = Record<Day, Record<Category, string[]>>;

const rotate = (arr: string[], i: number) => arr[i % arr.length];
const B = ["avocado-toast", "berry-parfait", "overnight-oats", "fluffy-pancakes"];
const L = ["quinoa-bowl", "chicken-salad", "lentil-soup"];
const D = ["salmon", "steak-bowl", "pasta-primavera", "veggie-pizza"];
const S = ["green-smoothie", "rainbow-salad"];

export const INITIAL_PLAN: MealPlan = Object.fromEntries(
  DAYS.map((d, i) => [
    d,
    {
      Breakfast: [rotate(B, i)],
      Lunch: [rotate(L, i)],
      Dinner: i === 6 ? [] : [rotate(D, i)],
      Snacks: i % 2 === 0 ? [rotate(S, i)] : [],
    },
  ]),
) as MealPlan;

export interface GroceryItem {
  id: string;
  name: string;
  qty: string;
  category: GroceryCategory;
  purchased: boolean;
}

export const GROCERY_CATEGORIES: GroceryCategory[] = ["Vegetables", "Fruits", "Dairy", "Meat & Protein", "Grains", "Pantry"];

export function groceryFromPlan(plan: MealPlan): GroceryItem[] {
  const map = new Map<string, GroceryItem>();
  Object.values(plan).forEach((day) =>
    Object.values(day).forEach((ids) =>
      ids.forEach((id) => {
        const r = getRecipe(id);
        r?.ingredients.forEach((ing) => {
          const key = ing.name.toLowerCase();
          const existing = map.get(key);
          if (existing) {
            const n = (existing.qty.match(/^×(\d+)/)?.[1] ?? "1");
            existing.qty = `×${Number(n) + 1} · ${ing.qty}`;
          } else {
            map.set(key, { id: key, name: ing.name, qty: ing.qty, category: ing.category, purchased: false });
          }
        });
      }),
    ),
  );
  return [...map.values()];
}

export const todayName = (): Day => DAYS[(new Date().getDay() + 6) % 7] as Day;

export function dayTotals(plan: MealPlan, day: Day) {
  const ids = Object.values(plan[day]).flat();
  return ids.reduce(
    (a, id) => {
      const r = getRecipe(id);
      if (!r) return a;
      return { calories: a.calories + r.calories, protein: a.protein + r.protein, carbs: a.carbs + r.carbs, fat: a.fat + r.fat, fiber: a.fiber + r.fiber, meals: a.meals + 1 };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, meals: 0 },
  );
}
