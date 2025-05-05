
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [dietPreference, setDietPreference] = useState("none");
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your preferences have been saved successfully.",
    });
  };
  
  return (
    <AppLayout title="Profile & Preferences">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>Set your dietary preferences for better recipe recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={dietPreference} onValueChange={setDietPreference} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="diet-none" />
                  <Label htmlFor="diet-none">No Specific Diet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="diet-vegetarian" />
                  <Label htmlFor="diet-vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="diet-vegan" />
                  <Label htmlFor="diet-vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pescatarian" id="diet-pescatarian" />
                  <Label htmlFor="diet-pescatarian">Pescatarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keto" id="diet-keto" />
                  <Label htmlFor="diet-keto">Keto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paleo" id="diet-paleo" />
                  <Label htmlFor="diet-paleo">Paleo</Label>
                </div>
              </RadioGroup>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <h3 className="font-medium">Allergies & Restrictions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gluten-free">Gluten Free</Label>
                    <Switch id="gluten-free" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dairy-free">Dairy Free</Label>
                    <Switch id="dairy-free" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="nut-free">Nut Free</Label>
                    <Switch id="nut-free" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="soy-free">Soy Free</Label>
                    <Switch id="soy-free" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="low-sodium">Low Sodium</Label>
                    <Switch id="low-sodium" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="expiry-notifications" className="block">Expiry Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when items are about to expire</p>
                  </div>
                  <Switch id="expiry-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="recipe-notifications" className="block">Recipe Suggestions</Label>
                    <p className="text-sm text-muted-foreground">Get weekly recipe ideas based on your pantry</p>
                  </div>
                  <Switch id="recipe-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="restock-notifications" className="block">Restock Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you're running low on essentials</p>
                  </div>
                  <Switch id="restock-notifications" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Connect to other services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      A
                    </div>
                    <div>
                      <h4 className="font-medium">Amazon</h4>
                      <p className="text-sm text-muted-foreground">Export shopping lists</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      I
                    </div>
                    <div>
                      <h4 className="font-medium">Instacart</h4>
                      <p className="text-sm text-muted-foreground">Order groceries directly</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full"
            onClick={handleSaveProfile}
          >
            Save All Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
