import { Link } from "react-router-dom"
import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  CodeIcon,
  UsersIcon,
  BookOpenIcon,
  RocketIcon,
  MessagesSquareIcon,
  SettingsIcon,
  HelpCircleIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-mobile"

function SidebarNavigation() {
  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Platform Section */}
      <div>
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7d8590]">Platform</h2>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <LayoutDashboardIcon className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/learn" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <GraduationCapIcon className="mr-3 h-4 w-4" />
                Learn
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/projects" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <CodeIcon className="mr-3 h-4 w-4" />
                Projects
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/community" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <UsersIcon className="mr-3 h-4 w-4" />
                Community
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/documentation" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <BookOpenIcon className="mr-3 h-4 w-4" />
                Documentation
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
                </div>

      {/* Projects Section */}
      <div>
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7d8590]">Projects</h2>
                </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/recent-updates" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <RocketIcon className="mr-3 h-4 w-4" />
                Recent Updates
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/discussions" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <MessagesSquareIcon className="mr-3 h-4 w-4" />
                Discussions
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/more" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <MoreHorizontalIcon className="mr-3 h-4 w-4" />
                More
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <SidebarSeparator className="bg-[#21262d]" />

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/settings" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
              <SettingsIcon className="mr-3 h-4 w-4" />
              Settings
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/help" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
              <HelpCircleIcon className="mr-3 h-4 w-4" />
              Help Center
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}

export function AppSidebar() {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  if (isMobile) {
    return (
      <Sheet>
        <SheetContent side="left" className="w-64 p-0 bg-[#0d1117] border-r border-[#21262d]">
          <SidebarNavigation />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sidebar className="border-r border-[#21262d] bg-[#0d1117] w-64">
      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>
    </Sidebar>
  )
}
