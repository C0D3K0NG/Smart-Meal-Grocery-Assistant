
import AppLayout from "@/components/AppLayout";
import AIRecipeGenerator from "@/components/AIRecipeGenerator";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import FoodItemCard from "@/components/FoodItemCard";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Calendar, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pantryItems, recipes } = useApp();
  
  // Get expiring soon items (next 7 days)
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  
  const expiringSoonItems = pantryItems
    .filter(item => {
      if (!item.expiryDate) return false;
      const expiryDate = new Date(item.expiryDate);
      return expiryDate > today && expiryDate < sevenDaysLater;
    })
    .slice(0, 4);

  // Get a few recipes for the dashboard
  const suggestedRecipes = recipes.slice(0, 3);

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
            <CardDescription>Items that will expire in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {expiringSoonItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expiringSoonItems.map(item => (
                  <FoodItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No items expiring soon.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/pantry")}
            >
              View All Items
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <AIRecipeGenerator />
          
          <Card>
            <CardHeader>
              <CardTitle>Meal Planning</CardTitle>
              <CardDescription>Plan your meals for the week</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Button 
                variant="outline" 
                className="w-full justify-between"
                onClick={() => navigate("/recipes")}
              >
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Start Planning
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recipe Suggestions</h2>
          <Button 
            variant="ghost" 
            className="flex items-center gap-1"
            onClick={() => navigate("/recipes")}
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              onSelect={() => navigate("/recipes")}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
