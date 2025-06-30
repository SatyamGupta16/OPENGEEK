"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'
import { signOut } from '@/lib/supabase'

export function NavUser() {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { user: authUser } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (!authUser) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton asChild>
              <button className="flex w-full items-center gap-3 rounded-md p-2 text-[#c9d1d9] hover:bg-[#1f2937] hover:text-white">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={authUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${authUser.email}`} alt={authUser.email || ''} />
                  <AvatarFallback className="rounded-lg bg-[#1f6feb] text-white">
                    {authUser.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{authUser.user_metadata?.full_name || 'User'}</span>
                  <span className="truncate text-xs text-[#8b949e]">{authUser.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4" />
              </button>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-[#161b22] border-[#21262d]"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={authUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${authUser.email}`} alt={authUser.email || ''} />
                  <AvatarFallback className="rounded-lg bg-[#1f6feb] text-white">
                    {authUser.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-[#c9d1d9]">{authUser.user_metadata?.full_name || 'User'}</span>
                  <span className="truncate text-xs text-[#8b949e]">{authUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#21262d]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#21262d]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#21262d]" />
            <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
              <Link to="/profile">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
              <Link to="/dashboard">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#1f6feb] focus:text-white">
              <Link to="/settings">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#21262d]" />
            <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
