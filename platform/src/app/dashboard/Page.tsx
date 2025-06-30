import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  BookOpen, 
  Code2, 
  Users, 
  Star,
  GitPullRequest,
  Clock,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <ScrollArea className="flex-1 h-full mb-20">
      <div className="min-h-full flex flex-col">
        {/* Fixed Header */}
        <div className="flex-none border-b border-[#21262d] bg-[#161b22] px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 text-[#1f6feb]">
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleColor="#1f6feb"
                  className="h-full w-full"
                  particleDensity={100}
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                <p className="text-[#8b949e] mt-1">Welcome back! Here's an overview of your learning journey.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  title: "Learning Hours", 
                  value: "24.5", 
                  change: "+2.5 this week",
                  icon: Clock,
                  tooltip: "Total hours spent learning across all courses"
                },
                { 
                  title: "Courses Started", 
                  value: "5", 
                  change: "2 in progress",
                  icon: BookOpen,
                  tooltip: "Number of courses you've started"
                },
                { 
                  title: "Projects Created", 
                  value: "8", 
                  change: "3 this month",
                  icon: Code2,
                  tooltip: "Total projects you've created"
                },
                { 
                  title: "Community Points", 
                  value: "350", 
                  change: "+50 this week",
                  icon: Users,
                  tooltip: "Points earned from community participation"
                }
              ].map((stat, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <Card className="bg-[#161b22] border-[#30363d] p-4 hover:border-[#1f6feb] transition-all duration-200 cursor-default w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[#8b949e] text-sm font-medium">{stat.title}</p>
                          <h3 className="text-2xl font-semibold text-white mt-1">{stat.value}</h3>
                          <p className="text-[#1f6feb] text-sm mt-1 font-medium">{stat.change}</p>
                        </div>
                        <div className="p-2 bg-[#1f6feb]/10 rounded-lg">
                          <stat.icon className="h-5 w-5 text-[#1f6feb]" />
                        </div>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <Separator className="border-[#21262d]" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                  <Button variant="ghost" className="text-[#8b949e] hover:text-white">
                    View all <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: BookOpen,
                      title: "Started HTML Course",
                      time: "2 hours ago",
                      description: "Began the Introduction to HTML module",
                      color: "text-green-400"
                    },
                    {
                      icon: GitPullRequest,
                      title: "Completed Project Exercise",
                      time: "5 hours ago",
                      description: "Submitted solution for JavaScript basics challenge",
                      color: "text-purple-400"
                    },
                    {
                      icon: Star,
                      title: "Earned Badge",
                      time: "1 day ago",
                      description: "Received 'Quick Learner' badge for completing 5 lessons in a day",
                      color: "text-yellow-400"
                    },
                    {
                      icon: Users,
                      title: "Joined Discussion",
                      time: "2 days ago",
                      description: "Participated in 'Web Development Best Practices' forum",
                      color: "text-blue-400"
                    }
                  ].map((activity, index) => (
                    <Card key={index} className="bg-[#161b22] border-[#30363d] p-4 hover:border-[#1f6feb] transition-all duration-200">
                      <div className="flex items-start">
                        <div className={`p-2 bg-opacity-10 rounded-lg ${activity.color.replace('text-', 'bg-')}`}>
                          <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-[#c9d1d9] font-medium">{activity.title}</h3>
                            <span className="text-[#8b949e] text-sm">{activity.time}</span>
                          </div>
                          <p className="text-[#8b949e] text-sm mt-1">{activity.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Progress & Recommendations */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Learning Progress</h2>
                  <Card className="bg-[#161b22] border-[#30363d] p-4 hover:border-[#1f6feb] transition-all duration-200">
                    <div className="space-y-6">
                      {[
                        { course: "HTML Fundamentals", progress: 60, color: "bg-green-500" },
                        { course: "CSS Basics", progress: 40, color: "bg-blue-500" },
                        { course: "JavaScript Intro", progress: 25, color: "bg-yellow-500" }
                      ].map((course, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#c9d1d9] font-medium">{course.course}</span>
                            <span className="text-[#8b949e]">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-[#30363d] rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${course.color} rounded-full transition-all duration-500 ease-in-out`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Recommended Next</h2>
                    <Button variant="ghost" size="sm" className="text-[#8b949e] hover:text-white">
                      View all
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: "CSS Grid Layout",
                        type: "Course",
                        icon: BookOpen,
                        color: "text-blue-400"
                      },
                      {
                        title: "Build a Portfolio",
                        type: "Project",
                        icon: Code2,
                        color: "text-green-400"
                      },
                      {
                        title: "React Fundamentals",
                        type: "Course",
                        icon: BookOpen,
                        color: "text-purple-400"
                      }
                    ].map((item, index) => (
                      <Card key={index} className="bg-[#161b22] border-[#30363d] p-3 hover:border-[#1f6feb] transition-all duration-200 cursor-pointer">
                        <div className="flex items-center">
                          <div className={`p-2 bg-opacity-10 rounded-lg ${item.color.replace('text-', 'bg-')}`}>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-[#c9d1d9] text-sm font-medium">{item.title}</h3>
                            <p className="text-[#8b949e] text-xs">{item.type}</p>
                          </div>
                          <ChevronRight className="ml-auto h-4 w-4 text-[#8b949e]" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

