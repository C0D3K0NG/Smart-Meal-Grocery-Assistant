
import { FoodItem, Recipe, ShoppingListItem } from "../contexts/AppContext";

export const mockPantryItems: FoodItem[] = [
  {
    id: "item-1",
    name: "Eggs",
    category: "Dairy",
    quantity: 6,
    unit: "pcs",
    expiryDate: "2025-05-15",
    imageUrl: "https://images.unsplash.com/photo-1552663651-2e4250e6c7ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-2",
    name: "Milk",
    category: "Dairy",
    quantity: 1,
    unit: "liter",
    expiryDate: "2025-05-10",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-3",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 2,
    unit: "pcs",
    expiryDate: "2025-05-07",
    imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-4",
    name: "Rice",
    category: "Grains",
    quantity: 1.5,
    unit: "kg",
    expiryDate: "2025-12-31",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-5",
    name: "Onions",
    category: "Vegetables",
    quantity: 5,
    unit: "pcs",
    expiryDate: "2025-05-20",
    imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-6",
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 4,
    unit: "pcs",
    expiryDate: "2025-05-12",
    imageUrl: "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-7",
    name: "Olive Oil",
    category: "Oils",
    quantity: 0.5,
    unit: "liter",
    expiryDate: "2025-12-15",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "item-8",
    name: "Garlic",
    category: "Vegetables",
    quantity: 1,
    unit: "bulb",
    expiryDate: "2025-05-25",
    imageUrl: "https://images.unsplash.com/photo-1615477550927-9a8650cedddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: "recipe-1",
    title: "Chicken Stir Fry",
    description: "A quick and healthy dinner option with fresh vegetables and tender chicken.",
    ingredients: [
      "2 chicken breasts, sliced",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "1 bell pepper, sliced",
      "2 carrots, julienned",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "1 tsp ginger, grated"
    ],
    instructions: [
      "Heat olive oil in a large pan over medium-high heat.",
      "Add chicken and cook until golden brown, about 5-6 minutes.",
      "Add garlic and ginger, cook for 30 seconds until fragrant.",
      "Add vegetables and stir fry for 3-4 minutes until crisp-tender.",
      "Pour in soy sauce and toss to coat.",
      "Serve hot over rice or noodles."
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    calories: 320,
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    tags: ["dinner", "quick", "healthy", "asian"]
  },
  {
    id: "recipe-2",
    title: "Classic Omelette",
    description: "A simple yet delicious breakfast option that's ready in minutes.",
    ingredients: [
      "3 eggs",
      "2 tbsp milk",
      "1/4 onion, finely chopped",
      "1/4 bell pepper, finely chopped",
      "30g cheese, grated",
      "1 tbsp butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Whisk eggs, milk, salt, and pepper in a bowl.",
      "Melt butter in a non-stick pan over medium heat.",
      "Add onions and peppers, sauté for 2 minutes until softened.",
      "Pour egg mixture into the pan and cook for 2 minutes until bottom is set.",
      "Sprinkle cheese on one half of the omelette.",
      "Fold the other half over the cheese and cook for another minute.",
      "Serve hot with toast."
    ],
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    calories: 290,
    imageUrl: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    tags: ["breakfast", "quick", "vegetarian"]
  },
  {
    id: "recipe-3",
    title: "Garlic Butter Rice",
    description: "Aromatic and flavorful rice that pairs perfectly with any main dish.",
    ingredients: [
      "2 cups rice, rinsed",
      "3 cups water or broth",
      "3 cloves garlic, minced",
      "2 tbsp butter",
      "1 tsp salt",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Melt butter in a pot over medium heat.",
      "Add garlic and sauté until fragrant, about 1 minute.",
      "Add rice and stir to coat with butter.",
      "Pour in water or broth and add salt.",
      "Bring to a boil, then reduce heat to low.",
      "Cover and simmer for 15-18 minutes until water is absorbed.",
      "Fluff with a fork and garnish with parsley before serving."
    ],
    prepTime: 5,
    cookTime: 20,
    servings: 4,
    calories: 220,
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    tags: ["side dish", "easy", "vegetarian"]
  },
  {
    id: "recipe-4",
    title: "Tomato & Egg Stir Fry",
    description: "A simple Chinese home-style dish that's comforting and quick to make.",
    ingredients: [
      "4 eggs",
      "4 tomatoes, cut into wedges",
      "2 green onions, chopped",
      "2 tbsp vegetable oil",
      "1 tbsp sugar",
      "1/2 tsp salt",
      "1 tbsp ketchup (optional)"
    ],
    instructions: [
      "Beat eggs with a pinch of salt.",
      "Heat 1 tbsp oil in a wok over medium heat.",
      "Pour in eggs and scramble until just cooked. Remove and set aside.",
      "Add remaining oil to wok and add tomatoes.",
      "Stir-fry tomatoes for 2 minutes until they start to soften.",
      "Add sugar, salt, and ketchup if using. Mix well.",
      "Return eggs to the wok and stir to combine with tomatoes.",
      "Garnish with green onions and serve hot with rice."
    ],
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    calories: 250,
    imageUrl: "https://images.unsplash.com/photo-1505575967455-40e256f73376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    tags: ["lunch", "quick", "chinese", "vegetarian"]
  }
];

export const mockShoppingList: ShoppingListItem[] = [
  {
    id: "shopping-1",
    name: "Apples",
    quantity: 6,
    unit: "pcs",
    category: "Fruits",
    checked: false,
  },
  {
    id: "shopping-2",
    name: "Yogurt",
    quantity: 1,
    unit: "pack",
    category: "Dairy",
    checked: true,
  },
  {
    id: "shopping-3",
    name: "Pasta",
    quantity: 2,
    unit: "packs",
    category: "Grains",
    checked: false,
  },
  {
    id: "shopping-4",
    name: "Beef Mince",
    quantity: 0.5,
    unit: "kg",
    category: "Meat",
    checked: false,
  },
  {
    id: "shopping-5",
    name: "Bell Peppers",
    quantity: 3,
    unit: "pcs",
    category: "Vegetables",
    checked: true,
  }
];

export const mockChatResponses = {
  greetings: [
    "Hello! How can I help with your meal planning today?",
    "Hi there! Need recipe ideas or help with your grocery list?",
    "Welcome to SMGA! I'm here to assist with your kitchen needs."
  ],
  recipeIdeas: [
    "Based on your pantry items, you could make a delicious stir fry with chicken, rice, and vegetables.",
    "With eggs, milk, and vegetables you have, an omelette would be a quick and nutritious option.",
    "I see you have chicken and rice - you could make a simple chicken rice bowl with some of your vegetables."
  ],
  nutritionInfo: [
    "Eggs are high in protein and contain all nine essential amino acids.",
    "Chicken breast is a lean protein source with about 165 calories per 100g.",
    "Rice is a good source of carbohydrates and provides energy for your daily activities."
  ]
};
