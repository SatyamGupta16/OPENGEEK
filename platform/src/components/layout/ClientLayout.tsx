import { Outlet } from "react-router-dom"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"

export function ClientLayout() {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto bg-[#0d1117] p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
} 