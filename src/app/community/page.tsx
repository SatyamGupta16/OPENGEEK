'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, Medal, Award, Star, Github, Users2, Sparkles, Info } from 'lucide-react'
import { toast } from 'sonner'

interface Member {
  id: string
  name: string
  github_profile: string
  experience: string
  skills: string[]
  rank?: number
  points?: number
}

const experiencePoints = {
  'beginner': 10,
  'intermediate': 20,
  'advanced': 30,
  'expert': 40
}

const skillPoints = 5 // Points per skill

const experienceColors = {
  'beginner': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'intermediate': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'advanced': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'expert': 'bg-amber-500/10 text-amber-500 border-amber-500/20'
}

export default function CommunityPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    experts: 0,
    totalSkills: 0
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/join')
      if (!response.ok) throw new Error('Failed to fetch members')
      
      const data = await response.json()
      
      // Calculate points and rank members
      const membersWithPoints = data.map((member: Member) => ({
        ...member,
        points: calculatePoints(member)
      }))
      
      // Sort by points and assign ranks
      const rankedMembers = membersWithPoints
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .map((member, index) => ({
          ...member,
          rank: index + 1
        }))

      // Calculate stats
      const stats = {
        total: rankedMembers.length,
        experts: rankedMembers.filter(m => m.experience.toLowerCase() === 'expert').length,
        totalSkills: [...new Set(rankedMembers.flatMap(m => m.skills || []))].length
      }

      setStats(stats)
      setMembers(rankedMembers)
    } catch (error) {
      console.error('Error fetching members:', error)
      toast.error('Failed to load community members')
    } finally {
      setLoading(false)
    }
  }

  const calculatePoints = (member: Member) => {
    const basePoints = experiencePoints[member.experience.toLowerCase() as keyof typeof experiencePoints] || 0
    const skillsPoints = (member.skills?.length || 0) * skillPoints
    return basePoints + skillsPoints
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <Star className="w-5 h-5 text-neutral-400" />
    }
  }

  const StatCard = ({ icon: Icon, title, value, description }: any) => (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutral-200">{title}</CardTitle>
        <Icon className="h-4 w-4 text-neutral-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-neutral-100">{value}</div>
        <p className="text-xs text-neutral-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  )

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen mt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-400 flex items-center gap-3">
          Community Leaderboard
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </h1>
        <p className="text-neutral-400 mt-2 max-w-2xl">
          Discover and celebrate our community's top contributors. Points are awarded based on experience level and skill diversity.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatCard
          icon={Users2}
          title="Total Members"
          value={stats.total}
          description="Active community members"
        />
        <StatCard
          icon={Award}
          title="Expert Members"
          value={stats.experts}
          description="Members with expert level experience"
        />
        <StatCard
          icon={Sparkles}
          title="Unique Skills"
          value={stats.totalSkills}
          description="Different skills across all members"
        />
      </div>

      {/* Main Leaderboard */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-xl text-neutral-200">Rankings</CardTitle>
          <CardDescription>
            Members ranked by experience and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-neutral-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-neutral-900/50">
                  <TableHead className="w-16 text-neutral-400">#</TableHead>
                  <TableHead className="text-neutral-400">Member</TableHead>
                  <TableHead className="text-neutral-400">Experience</TableHead>
                  <TableHead className="text-neutral-400">Skills</TableHead>
                  <TableHead className="text-right text-neutral-400">
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex items-center justify-end gap-1 cursor-help">
                          Points
                          <Info className="w-3 h-3" />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">How points are calculated:</h4>
                          <div className="text-sm">
                            <p className="text-neutral-400">Experience Level:</p>
                            <ul className="list-disc pl-4 space-y-1 text-xs">
                              <li>Beginner: 10 points</li>
                              <li>Intermediate: 20 points</li>
                              <li>Advanced: 30 points</li>
                              <li>Expert: 40 points</li>
                            </ul>
                            <p className="text-neutral-400 mt-2">Skills: 5 points per skill</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96">
                      <LoadingSkeleton />
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-96">
                      <div className="flex flex-col items-center justify-center text-neutral-400">
                        <Users2 className="w-12 h-12 mb-4" />
                        <p>No members found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow
                      key={member.id}
                      className="border-neutral-800 hover:bg-neutral-900/50 transition-colors"
                    >
                      <TableCell className="font-mono">
                        <div className="flex items-center gap-2">
                          {getRankIcon(member.rank || 0)}
                          <span className="text-sm text-neutral-400">#{member.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-neutral-200">{member.name}</div>
                          <a
                            href={member.github_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-300 mt-1 group"
                          >
                            <Github className="w-3 h-3 group-hover:text-neutral-300" />
                            {member.github_profile.split('/').pop()}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${experienceColors[member.experience.toLowerCase() as keyof typeof experienceColors]}`}
                        >
                          {member.experience}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.skills?.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-neutral-800/50 text-neutral-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {(member.skills?.length || 0) > 3 && (
                            <Badge variant="secondary" className="bg-neutral-800/50 text-neutral-200">
                              +{member.skills!.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-neutral-200">
                        {member.points}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 