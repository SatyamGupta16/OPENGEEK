import { Button } from "@/components/ui/button"
import {
  RocketIcon, 
  BookOpenIcon, 
  UsersIcon, 
  StarIcon,
  GitForkIcon,
  ActivityIcon
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1f2937] to-[#0d1117] rounded-lg border border-[#30363d] p-8">
        <h1 className="text-2xl font-bold text-white mb-3">Welcome to OpenGeek Community</h1>
        <p className="text-[#8b949e] text-lg max-w-2xl">
          Your hub for learning, collaboration, and growth. Explore resources, connect with developers, and build amazing projects.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6 hover:border-[#58a6ff] transition-all hover:shadow-lg hover:shadow-[#1f2937]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-[#1f6feb]/10">
              <RocketIcon className="h-6 w-6 text-[#58a6ff]" />
            </div>
            <h2 className="text-xl font-semibold text-white">My Projects</h2>
          </div>
          <div className="flex items-center gap-4 text-[#8b949e]">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4" />
              <span>12 Stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitForkIcon className="h-4 w-4" />
              <span>5 Forks</span>
            </div>
          </div>
        </div>

        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6 hover:border-[#58a6ff] transition-all hover:shadow-lg hover:shadow-[#1f2937]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-[#238636]/10">
              <BookOpenIcon className="h-6 w-6 text-[#2ea043]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Learning Path</h2>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e]">
            <ActivityIcon className="h-4 w-4" />
            <span>4 Courses in Progress</span>
          </div>
        </div>

        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6 hover:border-[#58a6ff] transition-all hover:shadow-lg hover:shadow-[#1f2937]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-[#8957e5]/10">
              <UsersIcon className="h-6 w-6 text-[#a371f7]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Community</h2>
          </div>
          <div className="flex items-center gap-2 text-[#8b949e]">
            <span>128 Active Members</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-[#161b22] rounded-lg border border-[#30363d] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Button variant="outline" className="text-[#8b949e] border-[#30363d] hover:bg-[#30363d] hover:text-white">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-[#1f2937] transition-colors">
            <div className="p-2 rounded-full bg-[#1f6feb]/10">
              <StarIcon className="h-5 w-5 text-[#58a6ff]" />
            </div>
            <div>
              <p className="text-[#c9d1d9]">You starred <span className="text-[#58a6ff]">opengeek/platform</span></p>
              <p className="text-sm text-[#8b949e]">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-[#1f2937] transition-colors">
            <div className="p-2 rounded-full bg-[#238636]/10">
              <GitForkIcon className="h-5 w-5 text-[#2ea043]" />
              </div>
            <div>
              <p className="text-[#c9d1d9]">You forked <span className="text-[#58a6ff]">awesome/project</span></p>
              <p className="text-sm text-[#8b949e]">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

