"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { createClient } from '@supabase/supabase-js'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle, Info, Shield, Users, Bot } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { RealtimePresenceState } from '@supabase/supabase-js'

interface Message {
  id: number
  created_at: string
  content: string
  username: string
}

interface MessageGroup {
  username: string
  isOwn: boolean
  messages: Message[]
}

interface ActiveUser {
  username: string
  lastActive: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [showDialog, setShowDialog] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [activeUsers, setActiveUsers] = useState<Record<string, ActiveUser>>({})
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [initialScrollDone, setInitialScrollDone] = useState(false)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  const fetchMessages = useCallback(async () => {
    try {
      console.log('Fetching messages...')
      const { data, error } = await supabase
        .from('allchat')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
        throw error
      }

      console.log('Fetched messages:', data)
      setMessages(data || [])
      setLoading(false)
      
      // Only scroll on initial load
      if (!initialScrollDone) {
        setTimeout(scrollToBottom, 100)
        setInitialScrollDone(true)
      }
    } catch (error: any) {
      console.error('Error in fetchMessages:', error)
      setError(error.message)
      setLoading(false)
    }
  }, [supabase, scrollToBottom, initialScrollDone])

  useEffect(() => {
    console.log('Setting up subscription...')
    
    fetchMessages()

    const subscription = supabase
      .channel('any')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'allchat',
      }, (payload) => {
        console.log('Received new message:', payload)
        setMessages(current => [...current, payload.new as Message])
      })
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      console.log('Cleaning up subscription...')
      subscription.unsubscribe()
    }
  }, [supabase, fetchMessages])

  // Update active users whenever messages change
  useEffect(() => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const recentMessages = messages.filter(msg => msg.created_at > fiveMinutesAgo);
    
    const newActiveUsers = recentMessages.reduce((acc, msg) => {
      acc[msg.username] = {
        username: msg.username,
        lastActive: msg.created_at
      };
      return acc;
    }, {} as Record<string, ActiveUser>);

    setActiveUsers(newActiveUsers);
  }, [messages]);

  const sendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      console.log('Sending message...')
      const { data, error } = await supabase
        .from('allchat')
        .insert([{ 
          content: newMessage.trim(), 
          username: username.trim() 
        }])
        .select()

      if (error) {
        console.error('Error sending message:', error)
        throw error
      }

      console.log('Message sent:', data)
      setNewMessage("")
      // Only scroll when sending a message
      setTimeout(scrollToBottom, 100)
    } catch (error: any) {
      console.error('Error in sendMessage:', error)
      setError(error.message)
    }
  }, [newMessage, username, supabase, scrollToBottom])

  const handleDialogClose = (open: boolean) => {
    if (!open && (!username.trim() || !acceptedTerms)) {
      return
    }
    setShowDialog(open)
  }

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="bg-black/95 border-white/10 max-h-[500px] w-[700px] p-5" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader className="pb-1">
            <DialogTitle className="text-lg font-semibold text-white flex items-center gap-3">
              <Shield className="w-4 h-4 text-white/80" />
              Welcome to OpenGeek Public Chat
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Please enter your username and accept the community guidelines to join the chat.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-200">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="bg-white/5 border-white/10 text-white"
                autoFocus
              />
              {username.trim().length === 0 && (
                <p className="text-xs text-red-400">Username is required</p>
              )}
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-white/80 shrink-0" />
                <h4 className="font-medium text-white">Community Guidelines & Disclaimer</h4>
              </div>
              
              <div className="bg-[#1a1b1e] rounded-lg p-2">
                <p className="text-xs leading-relaxed text-gray-300">
                  This is a public chat space where messages are visible to all users. While we strive to maintain a respectful environment, we cannot guarantee or moderate all content in real-time. OpenGeek is not responsible for any messages, content, or interactions between users.
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-white/20"
                />
                <label htmlFor="terms" className="text-xs text-gray-300 leading-relaxed">
                  I understand that this is a public chat space and I am responsible for my own interactions. I agree to be respectful and acknowledge that OpenGeek is not liable for any content or interactions in the chat.
                </label>
              </div>
              {!acceptedTerms && (
                <p className="text-xs text-red-400">Please accept the community guidelines to continue</p>
              )}
            </div>

            <Button 
              onClick={() => username.trim() && acceptedTerms && setShowDialog(false)} 
              disabled={!username.trim() || !acceptedTerms}
              className="w-full bg-white/10 hover:bg-white/30 text-white transition-colors"
            >
              Start Chatting
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className={cn(
        "h-[calc(100vh-9rem)] flex flex-col bg-black/40 backdrop-blur-xl border-white/10 relative overflow-hidden p-0 rounded-xl",
        showDialog && "pointer-events-none select-none blur-lg"
      )}>
        {/* Header */}
        <div className="px-3 py-3 border-b border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <Bot className="h-5 w-5 text-white/80" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                  Public Live Chat
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    <div className="relative flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    </div>
                    <span className="text-xs font-medium text-white/90">
                      {Object.keys(activeUsers).length} active now
                    </span>
                  </div>
                </h2>
                <p className="text-xs text-gray-400">Connect with fellow developers in real-time</p>
              </div>
            </div>
            {username && (
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                <Avatar className="h-6 w-6 border border-white/20">
                  <AvatarFallback className="bg-white/10 text-white text-xs">
                    {username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/90">{username}</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mx-3 mt-2 bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        {/* Messages Container */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <div className="flex flex-col justify-end min-h-full">
            <div className="w-full px-3">
              {loading ? (
                <div className="space-y-4 py-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start gap-2 animate-pulse opacity-40">
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-24 bg-white/10 rounded-full" />
                        <div className="h-10 w-64 bg-white/10 rounded-2xl" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-3 space-y-4">
                  {messages.reduce<MessageGroup[]>((groups, msg, index) => {
                    const isOwnMessage = msg.username === username;
                    const prevMessage = messages[index - 1];
                    const isSameUser = prevMessage && prevMessage.username === msg.username;
                    
                    if (!isSameUser) {
                      groups.push({
                        username: msg.username,
                        isOwn: isOwnMessage,
                        messages: [msg]
                      });
                    } else {
                      groups[groups.length - 1].messages.push(msg);
                    }
                    
                    return groups;
                  }, []).map((group, groupIndex) => (
                    <div 
                      key={groupIndex} 
                      className={cn(
                        "flex items-start gap-2 animate-in fade-in-0 duration-300",
                        group.isOwn && "flex-row-reverse"
                      )}
                    >
                      <div className="pt-4">
                        <Avatar className={cn(
                          "h-7 w-7 border ring-1 ring-offset-1 ring-offset-black/40",
                          group.isOwn ? "border-white/20 ring-white/20" : "border-white/10 ring-white/10"
                        )}>
                          <AvatarFallback className={cn(
                            "text-xs font-medium",
                            group.isOwn ? "bg-white/20 text-white" : "bg-white/10 text-white/90"
                          )}>
                            {group.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className={cn(
                        "flex flex-col min-w-0 max-w-[75%] pt-0.5",
                        group.isOwn && "items-end"
                      )}>
                        <span className={cn(
                          "text-xs font-medium mb-1 px-0.5",
                          group.isOwn ? "text-white/90" : "text-white/80"
                        )}>
                          {group.username}
                        </span>

                        <div className="space-y-0.5">
                          {group.messages.map((msg, msgIndex) => (
                            <div key={msg.id} className="group relative animate-in slide-in-from-bottom-1">
                              <div className={cn(
                                "px-3 py-2 rounded-2xl text-[13px] break-words",
                                group.isOwn 
                                  ? "bg-gradient-to-br from-white/20 to-white/15 text-white shadow-sm shadow-white/5" 
                                  : "bg-gradient-to-br from-white/10 to-white/5 text-white/90",
                                msgIndex === 0 && (group.isOwn ? "rounded-tr-sm" : "rounded-tl-sm"),
                                "hover:translate-x-0 transition-all duration-200",
                                group.isOwn ? "hover:-translate-x-0.5" : "hover:translate-x-0.5"
                              )}>
                                <p className="whitespace-pre-wrap leading-relaxed">
                                  {msg.content}
                                </p>
                              </div>
                              <div className={cn(
                                "flex items-center gap-1 text-[10px] text-white/40 mt-0.5 px-1",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                group.isOwn && "justify-end"
                              )}>
                                <span>
                                  {new Date(msg.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-white/10 bg-black/40">
          <div className="w-full px-3 py-3">
            <form onSubmit={sendMessage} className="flex gap-2 items-center">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 text-[13px] h-10 rounded-full px-4 focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200"
              />
              <Button 
                type="submit"
                size="default"
                className={cn(
                  "bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full p-0 flex items-center justify-center shrink-0",
                  "transition-all duration-200 hover:scale-105 active:scale-95",
                  !newMessage.trim() && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}