
import { createContext, useContext, useState, ReactNode } from "react";
import { mockPantryItems, mockRecipes, mockShoppingList } from "@/data/mockData";

// Define types for our context
export type FoodItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  imageUrl?: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  imageUrl: string;
  tags: string[];
};

export type ShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type AppContextType = {
  pantryItems: FoodItem[];
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  chatHistory: ChatMessage[];
  addPantryItem: (item: Omit<FoodItem, "id">) => void;
  removePantryItem: (id: string) => void;
  updatePantryItem: (id: string, item: Partial<FoodItem>) => void;
  addToShoppingList: (item: Omit<ShoppingListItem, "id" | "checked">) => void;
  removeFromShoppingList: (id: string) => void;
  toggleShoppingListItem: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChatHistory: () => void;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pantryItems, setPantryItems] = useState<FoodItem[]>(mockPantryItems);
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(mockShoppingList);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const addPantryItem = (item: Omit<FoodItem, "id">) => {
    const newItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setPantryItems([...pantryItems, newItem]);
  };

  const removePantryItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

  const updatePantryItem = (id: string, item: Partial<FoodItem>) => {
    setPantryItems(
      pantryItems.map(existingItem => 
        existingItem.id === id ? { ...existingItem, ...item } : existingItem
      )
    );
  };

  const addToShoppingList = (item: Omit<ShoppingListItem, "id" | "checked">) => {
    const newItem = {
      ...item,
      id: `shopping-${Date.now()}`,
      checked: false,
    };
    setShoppingList([...shoppingList, newItem]);
  };

  const removeFromShoppingList = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const toggleShoppingListItem = (id: string) => {
    setShoppingList(
      shoppingList.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addChatMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };
    setChatHistory([...chatHistory, newMessage]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        pantryItems,
        recipes,
        shoppingList,
        chatHistory,
        addPantryItem,
        removePantryItem,
        updatePantryItem,
        addToShoppingList,
        removeFromShoppingList,
        toggleShoppingListItem,
        addChatMessage,
        clearChatHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
