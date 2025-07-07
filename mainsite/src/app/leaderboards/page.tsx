"use client";

import { useState, useEffect } from "react";
import { Github, Trophy, Star, Award, Code2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from '@/lib/supabase';
import Squares from "@/components/ui/Squares";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tierInfo = {
  Pro: {
    icon: Trophy,
    color: "text-amber-500",
    description: "Elite developers leading innovation"
  },
  Classic: {
    icon: Star,
    color: "text-blue-500",
    description: "Experienced developers making impact"
  },
  Beginner: {
    icon: Award,
    color: "text-emerald-500",
    description: "Rising talents shaping the future"
  }
};

export default function LeaderboardsPage() {
  const [leaderboards, setLeaderboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  async function fetchLeaderboards() {
    try {
      const { data, error } = await supabase
        .from("leaderboards")
        .select("*")
        .order("rank", { ascending: true });

      if (error) throw error;
      setLeaderboards(data || []);
    } catch (error) {
      console.error("Error fetching leaderboards:", error);
    } finally {
      setLoading(false);
    }
  }

  const getGithubAvatar = (githubUrl: string) => {
    const username = githubUrl.split('/').pop();
    return `https://github.com/${username}.png`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} borderColor="rgba(255,255,255,0.1)" squareSize={50} hoverFillColor="rgba(255,255,255,0.05)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header + Tier Cards in Row */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 animate-fade-in">
              <Terminal className="w-8 h-8 text-white/80" strokeWidth={1.5} />
              <Code2 className="w-7 h-7 text-white/60" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-bold font-mono tracking-tight mb-3 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 animate-gradient">
                &lt;Leaderboard /&gt;
              </span>
            </h1>
            <p className="text-white/70 text-sm animate-fade-in">
              Celebrating excellence and growth in our developer community 🚀
            </p>
          </div>

          <div className="flex gap-4">
            {Object.entries(tierInfo).map(([tier, info]) => {
              const TierIcon = info.icon;
              return (
                <div key={tier} className="p-4 w-44 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <TierIcon className={`w-5 h-5 ${info.color}`} />
                    <span className="text-sm font-medium">{tier}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 bg-white/10 ">
                <TableHead className="text-white/60 w-16">Rank</TableHead>
                <TableHead className="text-white/60">Developer</TableHead>
                <TableHead className="text-white/60">Tier</TableHead>
                <TableHead className="text-white/60">Tag</TableHead>
                <TableHead className="text-white/60 text-right">GitHub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-white/60 py-5">
                    Loading rankings...
                  </TableCell>
                </TableRow>
              ) : leaderboards.map((member) => {
                const tier = tierInfo[member.tier as keyof typeof tierInfo];
                const TierIcon = tier.icon;

                return (
                  <TableRow
                    key={member.id}
                    className="border-white/5 hover:bg-white/5 transition-all duration-200"
                  >
                    <TableCell className="py-4 px-3 font-mono text-base font-semibold text-white/90">
                      #{member.rank}
                    </TableCell>
                    <TableCell className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10 ring-1 ring-white/5">
                          <AvatarImage
                            src={member.github_url ? getGithubAvatar(member.github_url) : undefined}
                            alt={member.name}
                          />
                          <AvatarFallback className="bg-white/5">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-white">{member.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <TierIcon className={`w-5 h-5 ${tier.color}`} />
                        <span className="text-white/90">{member.tier}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-3">
                      <Badge variant="outline" className="bg-white/5 text-white/90 border-white/10">
                        {member.tag}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-3 text-right">
                      {member.github_url && (
                        <a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
