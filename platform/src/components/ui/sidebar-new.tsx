"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Constants
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_COLLAPSED = "4rem"

interface SidebarContextType {
  isOpen: boolean
  isCollapsed: boolean
  toggleSidebar: () => void
  toggleCollapse: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarProvider({ children, className, ...props }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggleSidebar = React.useCallback(() => setIsOpen(prev => !prev), [])
  const toggleCollapse = React.useCallback(() => setIsCollapsed(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ isOpen, isCollapsed, toggleSidebar, toggleCollapse }}>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const sidebarVariants = cva(
  "fixed left-0 top-0 z-40 h-full transform transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-[#0d1117] border-r border-[#21262d]",
        overlay: "bg-[#0d1117] shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "overlay"
}

export function Sidebar({ className, variant = "default", ...props }: SidebarProps) {
  const { isOpen, isCollapsed } = useSidebar()

  return (
    <>
      <aside
        style={{ 
          width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)"
        }}
        className={cn(
          sidebarVariants({ variant }),
          "lg:relative",
          className
        )}
        {...props}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => useSidebar().toggleSidebar()}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeftIcon className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div 
      className={cn(
        "h-full transition-all duration-200 ease-in-out",
        isCollapsed ? "px-2" : "px-4",
        className
      )} 
      {...props} 
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: React.ReactNode
}

export function SidebarHeader({ className, children, collapsed, ...props }: SidebarHeaderProps) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div 
      className={cn(
        "flex h-14 items-center border-b border-[#21262d] px-4",
        isCollapsed && "justify-center px-2",
        className
      )} 
      {...props}
    >
      {isCollapsed ? collapsed : children}
    </div>
  )
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("py-2", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div 
      className={cn(
        "relative",
        isCollapsed ? "px-1" : "px-2",
        className
      )} 
      {...props} 
    />
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  icon?: React.ReactNode
  collapsed?: React.ReactNode
}

export function SidebarMenuButton({ 
  className, 
  asChild = false, 
  icon,
  children,
  collapsed,
  ...props 
}: SidebarMenuButtonProps) {
  const Comp = asChild ? "span" : "button"
  const { isCollapsed } = useSidebar()

  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium",
        "text-[#c9d1d9] transition-colors hover:bg-[#1f2937] hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff] focus-visible:ring-offset-2",
        isCollapsed && "justify-center px-1",
        className
      )}
      {...props}
    >
      {icon && <span className={cn("mr-3", isCollapsed && "mr-0")}>{icon}</span>}
      {isCollapsed ? collapsed : children}
    </Comp>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  const { isCollapsed, isOpen } = useSidebar()
  
  return (
    <div 
      style={{
        marginLeft: isOpen ? (isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH) : "0"
      }}
      className={cn(
        "flex-1 overflow-auto transition-all duration-200 ease-in-out",
        className
      )} 
      {...props} 
    />
  )
}

interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return <div className={cn("my-2 h-px bg-[#21262d]", className)} {...props} />
} 