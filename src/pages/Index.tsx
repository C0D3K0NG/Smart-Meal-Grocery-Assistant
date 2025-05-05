
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-smga-purple/10 p-6">
      <div className="max-w-3xl text-center animate-fade-in">
        <div className="w-20 h-20 mb-6 bg-smga-purple rounded-2xl mx-auto flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M14 5c1.5-1 2-2 2-2s.5 1 2 2c1.6 1 3 1 3 1s0 1-1 2c-1 1-1 3-1 3s-1-1-2.5-2-3.5-1-3.5-1 0-2-1-3c-1-1-2-1-2-1s1.5 0 3 1z" />
            <path d="M11 8c-.5-.5-1-1-1-1s-.5.5-1 1c-.5.5-1 1-1 1s0 .5.5 1c.5.5.5 1.5.5 1.5s.5-.5 1-1 1.5-.5 1.5-.5 0-1-.5-1.5c-.5-.5-1-.5-1-.5s.5 0 1 .5z" />
            <path d="M14 15c2-1 2-3 2-3s1 1 3 2c2 1 3 1 3 1s0 2-2 3c-2 1-2 4-2 4s-1-2-3-3c-2-1-4-1-4-1s1-2 3-3z" />
            <path d="M5 10c-2-1-4-1-4-1s1-1 3-2c2-1 2-3 2-3s1 1 3 2c2 1 4 1 4 1s0 2-2 3c-2 1-2 4-2 4s-2-2-4-4z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Smart Meal & Grocery Assistant
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          AI-powered kitchen management, meal planning, and grocery shopping
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg py-6 px-8 bg-smga-purple hover:bg-smga-purple/90"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            className="text-lg py-6 px-8" 
            variant="outline"
            onClick={() => navigate('/recipes')}
          >
            Browse Recipes
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="rounded-full w-12 h-12 bg-smga-purple/10 text-smga-purple flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Your Pantry</h3>
            <p className="text-muted-foreground">
              Keep track of everything in your kitchen and get notified about expiring items.
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="rounded-full w-12 h-12 bg-smga-purple/10 text-smga-purple flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Recipe Suggestions</h3>
            <p className="text-muted-foreground">
              Get personalized recipe recommendations based on what's in your kitchen.
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="rounded-full w-12 h-12 bg-smga-purple/10 text-smga-purple flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Shopping List</h3>
            <p className="text-muted-foreground">
              Generate shopping lists automatically and export them to your favorite grocery delivery service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
