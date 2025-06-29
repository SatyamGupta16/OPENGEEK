import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-mobile"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  return (
    <div>
      <div className="px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7d8590]">Projects</h2>
      </div>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                <item.icon className="mr-3 h-4 w-4" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 bg-[#161b22] border-[#21262d]"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                  <Folder className="mr-2 h-4 w-4" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                  <Share className="mr-2 h-4 w-4" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#21262d]" />
                <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/more" className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
              <MoreHorizontal className="mr-3 h-4 w-4" />
              <span>More</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
