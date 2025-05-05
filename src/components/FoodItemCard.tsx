
import { FoodItem } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FoodItemCardProps {
  item: FoodItem;
  onRemove?: (id: string) => void;
}

const FoodItemCard = ({ item, onRemove }: FoodItemCardProps) => {
  // Calculate days until expiry
  const getDaysUntilExpiry = () => {
    if (!item.expiryDate) return null;
    
    const today = new Date();
    const expiryDate = new Date(item.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysUntilExpiry = getDaysUntilExpiry();
  
  return (
    <div className="food-item card-hover">
      {item.imageUrl && (
        <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          
          {onRemove && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex justify-between mt-1">
          <p className="text-sm">
            {item.quantity} {item.unit}
          </p>
          
          {daysUntilExpiry !== null && (
            <p className={`text-xs px-2 py-0.5 rounded-full ${
              daysUntilExpiry <= 3 
                ? 'bg-destructive/10 text-destructive' 
                : daysUntilExpiry <= 7 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-600' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-600'
            }`}>
              {daysUntilExpiry <= 0 
                ? 'Expired' 
                : daysUntilExpiry === 1 
                  ? '1 day left' 
                  : `${daysUntilExpiry} days left`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
