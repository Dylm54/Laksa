import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthButton } from "@/components/auth-button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar account={<Suspense fallback={null}><AuthButton /></Suspense>} />
      <SidebarInset className="min-w-0">{children}</SidebarInset>
    </SidebarProvider>
  );
}
