import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7 bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e] focus:border-[#58a6ff]"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 opacity-50 select-none text-[#8b949e]" />
      </div>
    </form>
  )
}
