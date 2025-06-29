import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

function MainContent() {
  const { isOpen } = useSidebar()
  
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <AppSidebar />
          <main className={cn(
            "flex-1 overflow-y-auto bg-[#0d1117] transition-all duration-300",
            "w-full"
          )}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export function ClientLayout() {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  )
} 