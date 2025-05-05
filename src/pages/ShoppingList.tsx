
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useApp, ShoppingListItem as ShoppingListItemType } from "@/contexts/AppContext";
import ShoppingListItem from "@/components/ShoppingListItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Share, ShoppingCart, Trash2 } from "lucide-react";

const ShoppingList = () => {
  const { shoppingList, addToShoppingList, removeFromShoppingList, toggleShoppingListItem } = useApp();
  const [isAddItemSheetOpen, setIsAddItemSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<ShoppingListItemType, "id" | "checked">>({
    name: "",
    quantity: 1,
    unit: "pcs",
    category: "Other"
  });
  const { toast } = useToast();
  
  // Group shopping list by category
  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingListItemType[]>);
  
  // Sort categories by name
  const sortedCategories = Object.keys(groupedItems).sort();
  
  // Handle adding a new item
  const handleAddItem = () => {
    if (newItem.name.trim() === "") return;
    
    addToShoppingList(newItem);
    setNewItem({
      name: "",
      quantity: 1,
      unit: "pcs",
      category: "Other"
    });
    setIsAddItemSheetOpen(false);
    
    toast({
      description: "Item added to shopping list",
    });
  };
  
  // Handle clearing checked items
  const handleClearCheckedItems = () => {
    shoppingList.forEach(item => {
      if (item.checked) {
        removeFromShoppingList(item.id);
      }
    });
    
    toast({
      description: "Checked items removed from shopping list",
    });
  };
  
  // Handle sharing shopping list
  const handleShareList = () => {
    // In a real app, this would share the list
    toast({
      description: "Shopping list shared successfully",
    });
    setIsShareSheetOpen(false);
  };
  
  // Count checked and total items
  const checkedItemsCount = shoppingList.filter(item => item.checked).length;
  const totalItemsCount = shoppingList.length;
  
  return (
    <AppLayout title="Shopping List">
      <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {checkedItemsCount} of {totalItemsCount} items checked
            </p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => setIsShareSheetOpen(true)}
              className="flex-1 sm:flex-auto"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleClearCheckedItems}
              disabled={checkedItemsCount === 0}
              className="flex-1 sm:flex-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Checked
            </Button>
            
            <Button 
              onClick={() => setIsAddItemSheetOpen(true)}
              className="flex-1 sm:flex-auto"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
        
        {shoppingList.length > 0 ? (
          <div>
            {sortedCategories.map(category => (
              <div key={category}>
                <div className="px-4 py-2 bg-muted font-medium text-sm">
                  {category}
                </div>
                <div>
                  {groupedItems[category].map(item => (
                    <ShoppingListItem 
                      key={item.id} 
                      item={item}
                      onToggle={toggleShoppingListItem}
                      onRemove={removeFromShoppingList}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Your Shopping List is Empty</h3>
            <p className="text-muted-foreground mb-4">
              Add items to your shopping list to keep track of what you need to buy.
            </p>
            <Button onClick={() => setIsAddItemSheetOpen(true)}>
              Add Your First Item
            </Button>
          </div>
        )}
      </div>
      
      {/* Add Item Sheet */}
      <Sheet open={isAddItemSheetOpen} onOpenChange={setIsAddItemSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Item to Shopping List</SheetTitle>
          </SheetHeader>
          
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input 
                id="item-name" 
                placeholder="e.g., Apples" 
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item-quantity">Quantity</Label>
                <Input 
                  id="item-quantity" 
                  type="number" 
                  min="0" 
                  step="0.5" 
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div>
                <Label htmlFor="item-unit">Unit</Label>
                <Select 
                  value={newItem.unit} 
                  onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                >
                  <SelectTrigger id="item-unit">
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
            
            <div>
              <Label htmlFor="item-category">Category</Label>
              <Select 
                value={newItem.category} 
                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger id="item-category">
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
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleAddItem}>Add Item</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Share Sheet */}
      <Sheet open={isShareSheetOpen} onOpenChange={setIsShareSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Share Shopping List</SheetTitle>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div>
              <Label className="block mb-2">Export To</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">A</div>
                  <span>Amazon</span>
                </Button>
                
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <div className="w-8 h-8 bg-smga-green/10 text-smga-green rounded-full flex items-center justify-center">I</div>
                  <span>Instacart</span>
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="block mb-2">Share With</Label>
              <div className="grid gap-4">
                <Button variant="outline" className="justify-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  Messages
                </Button>
                
                <Button variant="outline" className="justify-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </div>
                  Email
                </Button>
                
                <Button variant="outline" className="justify-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                      <path d="M10 2c1 .5 2 2 2 5" />
                    </svg>
                  </div>
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleShareList}>Share</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default ShoppingList;
