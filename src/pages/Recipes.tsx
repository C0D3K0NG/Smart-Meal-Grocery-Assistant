
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useApp, Recipe } from "@/contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Search, User } from "lucide-react";

const Recipes = () => {
  const { recipes, pantryItems } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);
  
  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Open recipe details dialog
  const openRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeDialogOpen(true);
  };
  
  // Check if user has all ingredients for a recipe
  const hasAllIngredients = (recipe: Recipe): boolean => {
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());
    
    return recipe.ingredients.every(ingredient => {
      // Simple check: see if any pantry item name is included in the ingredient string
      return pantryItemNames.some(pantryItem => 
        ingredient.toLowerCase().includes(pantryItem)
      );
    });
  };
  
  // Filter recipes that can be made with current pantry items
  const canMakeRecipes = recipes.filter(recipe => hasAllIngredients(recipe));
  const needsShoppingRecipes = recipes.filter(recipe => !hasAllIngredients(recipe));
  
  return (
    <AppLayout title="Recipes">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search recipes, ingredients, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Recipes ({recipes.length})</TabsTrigger>
          <TabsTrigger value="can-make">Can Make Now ({canMakeRecipes.length})</TabsTrigger>
          <TabsTrigger value="needs-shopping">Needs Shopping ({needsShoppingRecipes.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="animate-fade-in">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onSelect={() => openRecipeDetails(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No recipes found matching your search.</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="can-make" className="animate-fade-in">
          {canMakeRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {canMakeRecipes
                .filter(recipe => searchQuery === "" || 
                  recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
                .map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onSelect={() => openRecipeDetails(recipe)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found that you can make with your current pantry items.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="needs-shopping" className="animate-fade-in">
          {needsShoppingRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {needsShoppingRecipes
                .filter(recipe => searchQuery === "" || 
                  recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
                .map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onSelect={() => openRecipeDetails(recipe)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes that require additional shopping found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Recipe Details Dialog */}
      {selectedRecipe && (
        <Dialog open={isRecipeDialogOpen} onOpenChange={setIsRecipeDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedRecipe.title}</DialogTitle>
              <DialogDescription>{selectedRecipe.description}</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.title} 
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <div className="flex justify-between items-center my-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{selectedRecipe.prepTime + selectedRecipe.cookTime} min</span>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">{selectedRecipe.servings} servings</span>
                  </div>
                  
                  <div className="text-sm font-medium">
                    {selectedRecipe.calories} cal
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedRecipe.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <ol className="space-y-2 pl-5 list-decimal">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsRecipeDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Button className="w-full sm:w-auto">
                Add Missing Items to Shopping List
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
};

export default Recipes;
