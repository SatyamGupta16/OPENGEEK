import { Metadata } from "next"
import dynamic from "next/dynamic"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

// Import Chat component dynamically with no SSR to avoid React hooks errors
const Chat = dynamic(() => import("@/components/Chat"), { ssr: true })

export const metadata: Metadata = {
  title: "OpenGeek Community Chat",
  description: "Join the OpenGeek community chat and connect with fellow developers",
}

export default function ChatPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black mt-10">
      {/* Stars Background */}
      <StarsBackground starDensity={0.0002} />
      <ShootingStars starColor="#ffffff" trailColor="#ffffff" />
      
      {/* Main content */}
      <div className="relative z-10 overflow-hidden flex flex-col">
        <div className="flex-1 mt-10 container max-w-6xl mx-auto px-4 py-8">
          
          
          
            <Chat />
          
        </div>
      </div>
    </div>
  )
} 