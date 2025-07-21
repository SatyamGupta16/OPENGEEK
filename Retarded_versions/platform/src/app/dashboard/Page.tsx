import { Link } from 'react-router-dom';
import { 
  BookOpen,
  Globe,
  Code,
  MessageSquare,
  AlertTriangle,
  Mail,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Users,
  Clock
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/lib/auth-context';
import { Badge } from '@/components/ui/badge';


const learningPaths = [
  {
    title: "HTML & CSS Mastery",
    description: "Master modern web development fundamentals",
    icon: Code,
    color: "text-orange-400"
  },
  {
    title: "JavaScript Fundamentals",
    description: "Build dynamic web applications",
    icon: Code,
    color: "text-yellow-400"
  },
  {
    title: "React Development",
    description: "Create powerful user interfaces",
    icon: Code,
    color: "text-blue-400"
  }
];

const platformFeatures = [
  {
    title: "Interactive Learning",
    description: "Step-by-step tutorials with hands-on coding exercises",
    icon: BookOpen,
    color: "text-blue-400"
  },
  {
    title: "Community Support",
    description: "Connect with fellow developers and mentors",
    icon: Globe,
    color: "text-green-400"
  },
  {
    title: "Project-Based Learning",
    description: "Apply your skills to real-world projects",
    icon: Code,
    color: "text-purple-400"
  },
  {
    title: "Knowledge Sharing",
    description: "Learn from community discussions and resources",
    icon: MessageSquare,
    color: "text-orange-400"
  }
];

const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Beta Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-500">Beta Version Notice</h3>
              <p className="text-sm text-amber-500/90 mt-1">
                OpenGeek Platform is currently in beta. We're actively enhancing the platform with new features and improvements. 
                For support or feedback, please contact us at{' '}
                <a href="mailto:support@opengeek.in" className="underline hover:text-amber-400">
                  support@opengeek.in
                </a>
                {' '}or through our community channels.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1f2937] to-[#111827] border border-[#374151]">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Welcome to OpenGeek Platform, {user?.user_metadata?.full_name || 'Developer'} 👋
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mb-4">
              Your gateway to professional tech education and community-driven learning. We're building a platform where 
              developers of all levels can learn, collaborate, and grow together.
            </p>
            <p className="text-gray-400 max-w-3xl mb-6">
              Get started with our structured learning paths, engage in hands-on projects, and connect with fellow developers 
              in our thriving community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                to="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1f6feb] text-white hover:bg-[#388bfd] transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Link>
              <a 
                href="https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white hover:bg-[#22c55e] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp
              </a>
              <a 
                href="https://discord.gg/45pTt3Eh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752c4] transition-colors"
              >
                <DiscordIcon />
                Join Discord
              </a>
            </div>
          </div>
        </div>

        {/* Community Launch Workshop */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-purple-500/20">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-white">Community Launch Workshop</h2>
                <Badge className="bg-purple-500/20 text-purple-400 uppercase text-xs tracking-wider">Required</Badge>
              </div>
              <p className="text-gray-400 mt-1">Join us for the official launch of OpenGeek Community</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white">July 5th, 2024</p>
                      <p className="text-sm text-gray-400">2:00 PM UTC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white">Duration: 2 hours</p>
                      <p className="text-sm text-gray-400">Interactive session</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white">Platform: Discord</p>
                      <p className="text-sm text-gray-400">Live streaming & Q&A</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link 
                to="/events/community-launch"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Add to Calendar
              </Link>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-white mb-4">Workshop Agenda</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Platform Overview</h4>
                      <p className="text-sm text-gray-400">Introduction to OpenGeek's vision and mission</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Learning Paths</h4>
                      <p className="text-sm text-gray-400">Detailed walkthrough of available courses and resources</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Community Guidelines</h4>
                      <p className="text-sm text-gray-400">Best practices for collaboration and communication</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Project Showcase</h4>
                      <p className="text-sm text-gray-400">Preview of upcoming hands-on projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Networking Session</h4>
                      <p className="text-sm text-gray-400">Connect with fellow developers and mentors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Q&A Session</h4>
                      <p className="text-sm text-gray-400">Interactive discussion and doubt clearing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="bg-[#1f2937] border-[#374151] p-6 hover:border-[#4b5563] transition-all">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-800 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-gray-400 mt-1">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="bg-[#1f2937] border-[#374151] p-6 hover:border-[#4b5563] transition-all">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-800 ${path.color}`}>
                    <path.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{path.title}</h3>
                    <p className="text-gray-400 mt-1">{path.description}</p>
                    <Link 
                      to="/learn" 
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 mt-2 text-sm"
                    >
                      Start learning <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Get Help Section */}
        <Card className="bg-[#1f2937] border-[#374151] p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-gray-800 text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-white">Need Assistance?</h3>
              <p className="text-gray-400 mt-1">
                Our dedicated support team is ready to help you with any questions or technical issues. 
                Reach out to us at{' '}
                <a href="mailto:support@opengeek.in" className="text-blue-400 hover:text-blue-300">
                  support@opengeek.in
                </a>
                {' '}or connect through our community channels for real-time assistance.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}

