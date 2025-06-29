import * as React from "react"
import { cn } from "@/lib/utils"
import { PanelLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarProvider({ children, className, ...props }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const toggleSidebar = React.useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
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

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "overlay"
}

export function Sidebar({ className, variant = "default", ...props }: SidebarProps) {
  const { isOpen } = useSidebar()

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-14 z-40 w-64 h-[calc(100vh-3.5rem)] bg-[#0d1117] border-r border-[#21262d] transition-transform duration-200 ease-in-out lg:relative lg:top-0 lg:h-full lg:translate-x-0",
          !isOpen && "-translate-x-full",
          className
        )}
        {...props}
      />
      {isOpen && variant === "overlay" && (
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
  return (
    <div 
      className={cn(
        "h-full overflow-y-auto",
        className
      )} 
      {...props} 
    />
  )
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("py-2", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("px-2", className)} {...props} />
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function SidebarMenuButton({ className, asChild = false, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? "span" : "button"
  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium",
        "text-[#c9d1d9] transition-colors hover:bg-[#1f2937] hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <div 
      className={cn(
        "flex-1 overflow-y-auto",
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