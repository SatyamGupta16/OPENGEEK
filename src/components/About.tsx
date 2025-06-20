"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Target, Users2, Rocket, BookOpen, DollarSign, Award } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative w-full py-24 bg-black overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="rounded-full bg-blue-600/10 px-3 py-1 text-sm leading-6 text-blue-400 ring-1 ring-blue-400/20">
            Why Choose OpenGeek?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Empowering Student Developers</h2>
          <p className="max-w-[85%] md:max-w-[65%] text-white/70 text-lg md:text-xl">
            We bridge the gap between learning and real-world experience, helping students and aspiring developers kickstart their careers through hands-on projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Curated Projects</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Access vetted, real-world projects from startups and businesses looking for fresh talent.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Fair Compensation</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Get paid fairly for your work while building your portfolio with meaningful projects.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Guided Learning</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Learn from experienced mentors and get feedback on your work to improve your skills.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <Users2 className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Active Community</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Join a supportive community of like-minded developers, share experiences, and grow together.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <Code2 className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Modern Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Work with the latest technologies and frameworks used in the industry today.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border border-white/[0.1] backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
            <CardHeader className="space-y-1 pb-4">
              <div className="bg-blue-600/10 rounded-full p-3 w-fit group-hover:bg-blue-600/20 transition-colors">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Recognition</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Earn certificates and badges as you complete projects and develop new skills.
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center space-y-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to Start Your Journey?</h3>
          <p className="max-w-[85%] md:max-w-[65%] text-white/70">
            Join thousands of students who are already building their careers through real-world projects.
          </p>
          <Button 
            size="lg"
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
} 