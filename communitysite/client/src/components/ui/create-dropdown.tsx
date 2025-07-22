import { Plus, PenLine, Code } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"

export function CreateDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-800/50"
        >
          <Plus className="h-5 w-5 text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black border-zinc-800">
        <DropdownMenuItem className="flex items-center gap-2 text-zinc-200 focus:bg-zinc-800 focus:text-zinc-200">
          <PenLine className="h-4 w-4" />
          <span>New Post</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-zinc-200 focus:bg-zinc-800 focus:text-zinc-200">
          <Code className="h-4 w-4" />
          <span>New Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 