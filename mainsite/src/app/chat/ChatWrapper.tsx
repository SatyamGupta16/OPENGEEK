"use client"

import dynamic from "next/dynamic"

const Chat = dynamic(() => import("@/components/Chat"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading chat...</div>
    </div>
  )
})

export function ChatWrapper() {
  return <Chat />
} 