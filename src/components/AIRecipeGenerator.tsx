
import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Recipe, Robot } from 'lucide-react';

const AIRecipeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { pantryItems } = useApp();
  const { toast } = useToast();

  const pantryItemNames = pantryItems.map(item => item.name.toLowerCase()).join(', ');
  const defaultPrompt = `I have these ingredients: ${pantryItemNames}. What can I make?`;

  const handleGenerateRecipe = () => {
    setIsGenerating(true);
    
    // Simulate AI generation - in a real app, this would call an API
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Recipe Generated!",
        description: "Check the Recipes tab to see your new personalized recipe.",
        action: <Button variant="outline">View Recipe</Button>,
      });
    }, 2000);
  };

  return (
    <Card className="w-full shadow-md border-t-4 border-t-smga-purple">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Robot className="h-5 w-5 text-smga-purple" />
          AI Recipe Generator
        </CardTitle>
        <CardDescription>
          Let AI create custom recipes based on your pantry items and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder={defaultPrompt}
            className="min-h-[100px]"
            value={prompt || defaultPrompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex items-center flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setPrompt(defaultPrompt + " Make it quick and easy.")}
            >
              Quick & Easy
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setPrompt(defaultPrompt + " Make it vegetarian.")}
            >
              Vegetarian
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setPrompt(defaultPrompt + " Make it low-calorie.")}
            >
              Low Calorie
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setPrompt(defaultPrompt + " Make it kid-friendly.")}
            >
              Kid-Friendly
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex gap-2 items-center" 
          onClick={handleGenerateRecipe}
          disabled={isGenerating}
        >
          <Recipe className="h-5 w-5" />
          {isGenerating ? "Generating Recipe..." : "Generate Recipe"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIRecipeGenerator;
