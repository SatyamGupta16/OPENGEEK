import { Button } from "@/components/ui/button"
import { 
  GitForkIcon, 
  StarIcon, 
  CodeIcon,
  SearchIcon,
  FilterIcon,
  BookOpenIcon
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Button className="bg-[#238636] hover:bg-[#2ea043] text-white">
          <CodeIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
          <Input 
            className="w-full bg-[#0d1117] border-[#30363d] pl-10 text-[#c9d1d9] placeholder:text-[#8b949e] focus:border-[#58a6ff]"
            placeholder="Find a project..."
          />
        </div>
        <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {/* Project Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-all">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CodeIcon className="h-5 w-5 text-[#58a6ff]" />
                <h3 className="text-[#58a6ff] text-lg font-semibold hover:underline">opengeek/platform</h3>
              </div>
              <p className="text-[#8b949e] mb-4">
                A modern platform for developer community and learning resources
              </p>
              <div className="flex items-center gap-4 text-[#8b949e]">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#238636]" />
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4" />
                  <span>12</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitForkIcon className="h-4 w-4" />
                  <span>5</span>
                </div>
                <span>Updated 2 days ago</span>
              </div>
            </div>
            <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white">
              <StarIcon className="mr-2 h-4 w-4" />
              Star
            </Button>
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-all">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpenIcon className="h-5 w-5 text-[#58a6ff]" />
                <h3 className="text-[#58a6ff] text-lg font-semibold hover:underline">opengeek/docs</h3>
              </div>
              <p className="text-[#8b949e] mb-4">
                Official documentation and guides for the OpenGeek platform
              </p>
              <div className="flex items-center gap-4 text-[#8b949e]">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#f1e05a]" />
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4" />
                  <span>8</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitForkIcon className="h-4 w-4" />
                  <span>3</span>
                </div>
                <span>Updated 5 days ago</span>
              </div>
            </div>
            <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white">
              <StarIcon className="mr-2 h-4 w-4" />
              Star
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 