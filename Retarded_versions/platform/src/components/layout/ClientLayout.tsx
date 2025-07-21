import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"

export function ClientLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <AppSidebar />
          <main className="flex-1 bg-[#0d1117] ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
} 