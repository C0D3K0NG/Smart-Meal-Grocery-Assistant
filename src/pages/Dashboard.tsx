
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useApp, FoodItem } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FoodItemCard from "@/components/FoodItemCard";
import RecipeCard from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus } from "lucide-react";

const Dashboard = () => {
  const { pantryItems, recipes, removePantryItem, addPantryItem } = useApp();
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState<Omit<FoodItem, "id">>({
    name: "",
    category: "Other",
    quantity: 1,
    unit: "pcs",
  });

  // Filter pantry items based on search query
  const filteredPantryItems = pantryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredPantryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  // Sort categories by name
  const sortedCategories = Object.keys(groupedItems).sort();

  // Handle adding a new item
  const handleAddItem = () => {
    if (newItem.name.trim() === "") return;
    
    addPantryItem(newItem);
    setNewItem({
      name: "",
      category: "Other",
      quantity: 1,
      unit: "pcs",
    });
    setIsAddItemDialogOpen(false);
  };

  // Calculate expiring soon items
  const expiringItems = pantryItems.filter(item => {
    if (!item.expiryDate) return false;
    
    const today = new Date();
    const expiryDate = new Date(item.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 7 && diffDays > 0;
  });

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pantryItems.length}</div>
            <p className="text-muted-foreground text-sm">items in your pantry</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{expiringItems.length}</div>
            <p className="text-muted-foreground text-sm">items expiring within 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recipe Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recipes.length}</div>
            <p className="text-muted-foreground text-sm">recipes you can make</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold">Your Pantry</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search items..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-60"
                  />
                </div>
                <Button 
                  onClick={() => setIsAddItemDialogOpen(true)}
                  className="whitespace-nowrap"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {sortedCategories.length > 0 ? (
                sortedCategories.map(category => (
                  <div key={category}>
                    <h3 className="text-sm font-medium mb-2 text-muted-foreground">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {groupedItems[category].map(item => (
                        <FoodItemCard 
                          key={item.id} 
                          item={item} 
                          onRemove={removePantryItem}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No items found in your pantry.</p>
                  <Button onClick={() => setIsAddItemDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Item
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended Recipes</h2>
            </div>
            
            {recipes.length > 0 ? (
              <div className="space-y-4">
                {recipes.slice(0, 3).map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe}
                  />
                ))}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/recipes'}
                >
                  View All Recipes
                </Button>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No recipes available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Eggs" 
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Oils">Oils</SelectItem>
                    <SelectItem value="Spices">Spices</SelectItem>
                    <SelectItem value="Baking">Baking</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Canned">Canned</SelectItem>
                    <SelectItem value="Frozen">Frozen</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="0" 
                    step="0.5" 
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select 
                    value={newItem.unit} 
                    onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                  >
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">pcs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
                      <SelectItem value="liter">liter</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="cup">cup</SelectItem>
                      <SelectItem value="tbsp">tbsp</SelectItem>
                      <SelectItem value="tsp">tsp</SelectItem>
                      <SelectItem value="pack">pack</SelectItem>
                      <SelectItem value="can">can</SelectItem>
                      <SelectItem value="bottle">bottle</SelectItem>
                      <SelectItem value="box">box</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input 
                id="expiryDate" 
                type="date" 
                value={newItem.expiryDate || ""}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Image (Optional)</Label>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Camera className="h-6 w-6" />
                <span>Take a Photo</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddItemDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Dashboard;
