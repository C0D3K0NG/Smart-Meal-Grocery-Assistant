
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 animate-fade-in">
          {title && (
            <header className="mb-8">
              <h1 className="text-3xl font-semibold">{title}</h1>
            </header>
          )}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
