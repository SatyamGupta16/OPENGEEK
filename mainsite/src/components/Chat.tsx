"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { createClient } from '@supabase/supabase-js'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle, Info, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  created_at: string
  content: string
  username: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [showDialog, setShowDialog] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

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
      setTimeout(scrollToBottom, 100)
    } catch (error: any) {
      console.error('Error in fetchMessages:', error)
      setError(error.message)
      setLoading(false)
    }
  }, [supabase, scrollToBottom])

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
        setTimeout(scrollToBottom, 100)
      })
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      console.log('Cleaning up subscription...')
      subscription.unsubscribe()
    }
  }, [supabase, fetchMessages, scrollToBottom])

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
      
      fetchMessages()
    } catch (error: any) {
      console.error('Error in sendMessage:', error)
      setError(error.message)
    }
  }, [newMessage, username, supabase, fetchMessages])

  const handleDialogClose = (open: boolean) => {
    if (!open && (!username.trim() || !acceptedTerms)) {
      return
    }
    setShowDialog(open)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-7">
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
        "h-[calc(100vh-9rem)] flex flex-col bg-black/40 backdrop-blur-xl border-white/10 relative overflow-hidden p-0",
        showDialog && "pointer-events-none select-none blur-lg"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Community Chat</h2>
              <p className="text-xs text-gray-400">Connect with fellow developers in real-time</p>
            </div>
            {username && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-white/10 text-white text-xs">
                    {username[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white">{username}</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="m-2 bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-white/10 rounded" />
                    <div className="h-4 w-48 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 group hover:bg-white/5 rounded-lg p-2 transition-colors"
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-white/10 text-white">
                      {msg.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white truncate max-w-[150px]">
                        {msg.username}
                      </span>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-200">
                      <span className="break-words whitespace-pre-wrap inline-block max-w-full">
                        {msg.content}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-white/10 bg-white/5 p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border-white/10 text-white text-sm h-10"
            />
            <Button 
              type="submit"
              size="default"
              className="bg-white/10 hover:bg-white/20 text-white px-4 h-10 transition-colors"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}