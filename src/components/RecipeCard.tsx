
import { Recipe } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: () => void;
}

const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  return (
    <div className="recipe-card card-hover">
      <div className="relative h-48 w-full">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
          {recipe.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{recipe.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="text-sm font-medium">
            {recipe.calories} cal
          </div>
        </div>
        
        {onSelect && (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onSelect}
          >
            View Recipe
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
