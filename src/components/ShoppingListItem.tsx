
import { ShoppingListItem as ShoppingListItemType } from "@/contexts/AppContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ShoppingListItem = ({ item, onToggle, onRemove }: ShoppingListItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={item.checked} 
          onCheckedChange={() => onToggle(item.id)}
          id={`item-${item.id}`}
        />
        <div>
          <label 
            htmlFor={`item-${item.id}`} 
            className={`font-medium cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
          >
            {item.name}
          </label>
          <p className="text-xs text-muted-foreground">
            {item.quantity} {item.unit} · {item.category}
          </p>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ShoppingListItem;
