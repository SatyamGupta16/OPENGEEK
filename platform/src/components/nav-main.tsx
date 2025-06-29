"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <div>
      <div className="px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7d8590]">Platform</h2>
      </div>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={item.url} className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                  <item.icon className="mr-3 h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-transparent",
                        "data-[state=open]:rotate-90 transition-transform"
                      )}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 mt-2 space-y-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuButton key={subItem.title} asChild>
                          <a href={subItem.url} className="flex items-center text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white rounded-md">
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </div>
  )
}
