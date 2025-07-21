import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Sample project data
const sampleProjects = [
  {
    id: 1,
    title: "Lumon Pomodoro",
    description: "A minimal pomodoro timer with clean UI",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=500&fit=crop",
    user: {
      name: "jemappelleN",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      username: "jemappelleN"
    },
    likes: 30,
    views: 156,
    isStaffPick: true,
    tags: ["Python", "React"],
    timeAgo: "2mo"
  },
  {
    id: 2,
    title: "Garden Slot Machine",
    description: "A fun slot machine game with garden theme",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&h=500&fit=crop",
    user: {
      name: "alepo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      username: "alepo"
    },
    likes: 20,
    views: 89,
    isStaffPick: true,
    tags: ["JavaScript", "HTML/CSS"],
    timeAgo: "3mo"
  },
  {
    id: 3,
    title: "Design your own virtual garden",
    description: "Create and customize your dream garden",
    image: "https://images.unsplash.com/photo-1557090495917-afdab827c528?w=500&h=500&fit=crop",
    user: {
      name: "jlimsy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      username: "jlimsy"
    },
    likes: 22,
    views: 95,
    isStaffPick: true,
    tags: ["React", "Three.js"],
    timeAgo: "3mo"
  },
  {
    id: 4,
    title: "AI Code Assistant",
    description: "Smart coding companion powered by GPT-4",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=500&fit=crop",
    user: {
      name: "sarah_dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      username: "sarah_dev"
    },
    likes: 45,
    views: 210,
    isStaffPick: true,
    tags: ["Python", "ML"],
    timeAgo: "1mo"
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Real-time weather tracking with beautiful visualizations",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=500&fit=crop",
    user: {
      name: "weatherpro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Weather",
      username: "weatherpro"
    },
    likes: 38,
    views: 180,
    isStaffPick: false,
    tags: ["React", "D3.js"],
    timeAgo: "2mo"
  },
  {
    id: 6,
    title: "Task Flow",
    description: "Kanban board with real-time collaboration",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&h=500&fit=crop",
    user: {
      name: "taskmaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Task",
      username: "taskmaster"
    },
    likes: 28,
    views: 145,
    isStaffPick: false,
    tags: ["Vue", "Firebase"],
    timeAgo: "1mo"
  },
  {
    id: 7,
    title: "Code Snippets",
    description: "Save and share your favorite code snippets",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=500&fit=crop",
    user: {
      name: "codekeeper",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
      username: "codekeeper"
    },
    likes: 32,
    views: 168,
    isStaffPick: true,
    tags: ["Next.js", "MongoDB"],
    timeAgo: "2mo"
  },
  {
    id: 8,
    title: "DevMeet",
    description: "Connect with developers in your area",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=500&fit=crop",
    user: {
      name: "devconnect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
      username: "devconnect"
    },
    likes: 42,
    views: 195,
    isStaffPick: false,
    tags: ["React", "Node"],
    timeAgo: "3mo"
  },
  {
    id: 9,
    title: "Portfolio Builder",
    description: "Create stunning developer portfolios",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop",
    user: {
      name: "portfoliopro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Portfolio",
      username: "portfoliopro"
    },
    likes: 35,
    views: 175,
    isStaffPick: true,
    tags: ["React", "Tailwind"],
    timeAgo: "1mo"
  }
];

interface ProjectCardProps {
  project: typeof sampleProjects[0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group cursor-pointer relative border-0 overflow-hidden bg-[#0A0A0A] rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img 
          src={project.image} 
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-105"
          )}
        />
        {project.isStaffPick && (
          <Badge className="absolute top-3 left-3 bg-yellow-300 text-black font-medium hover:bg-yellow-300 px-3 py-0.5 rounded-sm">
            STAFF PICK
          </Badge>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-[#0A0A0A] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={project.user.avatar} alt={project.user.name} />
              <AvatarFallback>{project.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-white/90">@{project.user.username}</span>
              <span className="text-sm text-white/50">• {project.timeAgo}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-white/90">❤️ {project.likes}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function ProjectShowcase() {
  return (
    <div className="w-full mt-6">
      {/* Header */}
      <div className="flex flex-col gap-6 px-6 mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">Project Showcase</h1>
              <p className="text-zinc-400">Showcase something that you built (＞＜)＞</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Button>
        </div>
        <Separator className="bg-zinc-800/50" />
      </div>

      {/* Navigation */}
      <div className="px-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="h-10 p-0 bg-transparent">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-white text-base font-medium text-zinc-400"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="staff-picks"
                className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-white text-base font-medium text-zinc-400"
              >
                Staff Picks
              </TabsTrigger>
            </TabsList>

            <Badge
              variant="outline"
              className="rounded-full bg-transparent hover:bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            >
              Newest ▼
            </Badge>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sampleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="staff-picks" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sampleProjects.filter(p => p.isStaffPick).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 