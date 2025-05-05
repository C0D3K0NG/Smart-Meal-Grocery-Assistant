
import {
  Calendar,
  Home,
  MessageCircle,
  Search,
  Settings,
  ShoppingCart,
  User,
  ChefHat,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: Search,
  },
  {
    title: "Chat Assistant",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Shopping List",
    url: "/shopping-list",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-smga-purple to-smga-purple/80 flex items-center justify-center shadow-md">
            <ChefHat className="w-6 h-6 text-white" />
          </span>
          <div className="font-bold text-xl">
            <span className="text-smga-purple">SMGA</span>
            <div className="text-xs font-normal text-muted-foreground">Meal Assistant</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="w-full">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          Smart Meal & Grocery Assistant
          <div>© {new Date().getFullYear()}</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
