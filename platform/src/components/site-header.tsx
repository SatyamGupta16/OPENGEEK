import { SearchIcon, BellIcon, PlusIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { signOut } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-mobile"

export function SiteHeader() {
  const { user } = useAuth()
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0d1117]">
      <div className="flex h-14 w-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          )}
          <div className="text-lg font-semibold text-[#c9d1d9] flex items-center gap-2">
            <span className="hidden sm:inline">OpenGeek Community Platform</span>
            <span className="sm:hidden">OG</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden md:block max-w-[24rem] min-w-[20rem] relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
            <Input 
              className="w-full bg-[#0d1117] border-[#30363d] pl-10 text-[#c9d1d9] placeholder:text-[#8b949e] focus:border-[#58a6ff] h-8"
              placeholder="Search or jump to..."
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-[#30363d] bg-[#161b22] px-1.5 font-mono text-[10px] font-medium text-[#8b949e]">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9]"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Create new</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#161b22] border-[#21262d]" align="end">
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    New Project
                    <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    New Discussion
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#21262d]" />
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    Import Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
                className="h-8 w-8 text-[#8b949e] hover:text-[#c9d1d9] relative"
              >
                <BellIcon className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#1f6feb]" />
                <span className="sr-only">Notifications</span>
              </Button>
            </>
          )}

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={user.user_metadata?.full_name || user.email}
                      />
                      <AvatarFallback className="bg-[#1f6feb] text-white">
                        {(user.user_metadata?.full_name?.[0] ||
                          user.email?.[0] ||
                          "U").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-[#161b22] border-[#21262d]" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-[#c9d1d9]">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs leading-none text-[#8b949e]">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#21262d]" />
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    Your Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    Your Stars
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#21262d]" />
                  <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                    Settings
                    <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#21262d]" />
                  <DropdownMenuItem
                    className="text-red-500 focus:bg-red-500/10 focus:text-red-500"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="border-[#21262d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#30363d]"
                asChild
              >
                <a href="/login">Sign in</a>
        </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
