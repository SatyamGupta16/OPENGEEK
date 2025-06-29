import { Button } from "@/components/ui/button"
import { 
  GraduationCapIcon,
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Learning Path</h1>
          <p className="text-[#8b949e]">Track your progress and continue learning</p>
        </div>
        <Button className="bg-[#1f6feb] hover:bg-[#388bfd] text-white">
          <GraduationCapIcon className="mr-2 h-4 w-4" />
          Browse Courses
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
          <Input 
            className="w-full bg-[#0d1117] border-[#30363d] pl-10 text-[#c9d1d9] placeholder:text-[#8b949e] focus:border-[#58a6ff]"
            placeholder="Search courses..."
          />
        </div>
        <Button variant="outline" className="border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* In Progress Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-6">In Progress</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Course Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#1f6feb]/10">
                <PlayCircleIcon className="h-6 w-6 text-[#58a6ff]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Full-Stack Development</h3>
                <p className="text-[#8b949e] mb-4">Learn to build modern web applications from start to finish</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8b949e]">
                    <ClockIcon className="h-4 w-4" />
                    <span>12 hours left</span>
                  </div>
                  <div className="text-[#2ea043]">60% Complete</div>
                </div>
                <div className="mt-3 h-1 bg-[#30363d] rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-[#2ea043] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#8957e5]/10">
                <BookOpenIcon className="h-6 w-6 text-[#a371f7]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">DevOps Fundamentals</h3>
                <p className="text-[#8b949e] mb-4">Master the tools and practices of modern DevOps</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8b949e]">
                    <ClockIcon className="h-4 w-4" />
                    <span>8 hours left</span>
                  </div>
                  <div className="text-[#2ea043]">40% Complete</div>
                </div>
                <div className="mt-3 h-1 bg-[#30363d] rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-[#2ea043] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Completed</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Completed Course Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#238636]/10">
                <CheckCircleIcon className="h-6 w-6 text-[#2ea043]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Git & GitHub Mastery</h3>
                <p className="text-[#8b949e] mb-4">Version control and collaboration with Git and GitHub</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#8b949e]">
                    <CheckCircleIcon className="h-4 w-4 text-[#2ea043]" />
                    <span>Completed</span>
                  </div>
                  <Button variant="ghost" className="text-[#58a6ff] hover:text-[#58a6ff] hover:bg-[#1f6feb]/10">
                    View Certificate
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 