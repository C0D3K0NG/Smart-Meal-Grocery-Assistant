
import {
  Calendar,
  Home,
  MessageCircle,
  Search,
  Settings,
  ShoppingCart,
  User,
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
          <span className="w-8 h-8 rounded-lg bg-smga-purple flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </span>
          <span className="font-semibold text-xl">SMGA</span>
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
