'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { PhoneInput } from './phone-input'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, X } from "lucide-react"

interface FormData {
  // Personal Details
  name: string
  email: string
  phone: string
  githubProfile: string
  course: string
  semester: string
  
  // Login Credentials
  username: string
  password: string
  confirmPassword: string

  // Technical Background
  experience: string
  skills: string[]
  interests: string
  
  // Community Interest
  whyJoin: string
  expectations: string
  
  // Privacy
  acceptPrivacy: boolean
}

const SKILL_CATEGORIES = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Tailwind CSS",
    "SASS/SCSS",
  ],
  backend: [
    "Node.js",
    "Python",
    "Java",
    "C++",
    "PHP",
    "Ruby",
    "Go",
    "Express.js",
    "Django",
    "Spring Boot",
  ],
  database: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Firebase",
    "SQLite",
    "Oracle",
  ],
  mobile: [
    "React Native",
    "Flutter",
    "iOS (Swift)",
    "Android (Kotlin)",
    "Ionic",
  ],
  devops: [
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Jenkins",
    "Git",
    "GitHub Actions",
  ],
  other: [
    "AI/ML",
    "Data Science",
    "Blockchain",
    "GraphQL",
    "WebSocket",
    "REST API",
    "UI/UX Design",
    "Testing",
  ],
}

export function JoinForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    githubProfile: '',
    course: '',
    semester: '',
    username: '',
    password: '',
    confirmPassword: '',
    experience: 'beginner',
    skills: [],
    interests: '',
    whyJoin: '',
    expectations: '',
    acceptPrivacy: false,
  })
  const [skillSearch, setSkillSearch] = useState("")
  const [skillPopoverOpen, setSkillPopoverOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      toast.success('Welcome to the OpenGeek Community!')
      
      // Open WhatsApp group in new tab
      window.open('https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7', '_blank')
      
      // Redirect to thank you page
      router.push('/join/thank-you')
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTechStackChange = (category: keyof typeof formData.skills, value: string) => {
    const currentTech = formData.skills
    const updatedTech = currentTech.includes(value)
      ? currentTech.filter(tech => tech !== value)
      : [...currentTech, value]

    setFormData(prev => ({
      ...prev,
      skills: updatedTech
    }))
  }

  // Function to handle skill selection
  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  // Filter skills based on search
  const filteredSkills = Object.entries(SKILL_CATEGORIES)
    .flatMap(([category, skills]) => 
      skills.filter(skill => 
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      ).map(skill => ({
        category,
        skill
      }))
    )

  return (
    <div className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-4 sm:p-6 md:p-8">
      <div className="space-y-2 text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">Community Application Form</h2>
        <p className="text-sm sm:text-base text-white/70">
          Turn your passion for technology into opportunities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubProfile">GitHub Profile</Label>
              <Input
                id="githubProfile"
                value={formData.githubProfile}
                onChange={(e) => handleChange('githubProfile', e.target.value)}
                placeholder="https://github.com/username"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => handleChange('course', value)}
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="btech" className="text-white">B.Tech</SelectItem>
                  <SelectItem value="bca" className="text-white">BCA</SelectItem>
                  <SelectItem value="bba" className="text-white">BBA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => handleChange('semester', value)}
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Select your semester" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="1" className="text-white">I</SelectItem>
                  <SelectItem value="2" className="text-white">II</SelectItem>
                  <SelectItem value="3" className="text-white">III</SelectItem>
                  <SelectItem value="4" className="text-white">IV</SelectItem>
                  <SelectItem value="5" className="text-white">V</SelectItem>
                  <SelectItem value="6" className="text-white">VI</SelectItem>
                  <SelectItem value="7" className="text-white">VII</SelectItem>
                  <SelectItem value="8" className="text-white">VIII</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Login Credentials Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Login Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Choose a username"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Choose a strong password"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* Technical Background Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Technical Background</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleChange('experience', value)}
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="beginner" className="text-white">Beginner</SelectItem>
                  <SelectItem value="intermediate" className="text-white">Intermediate</SelectItem>
                  <SelectItem value="advanced" className="text-white">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Popover open={skillPopoverOpen} onOpenChange={setSkillPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={skillPopoverOpen}
                      className="w-full justify-between bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                    >
                      Select your skills
                      <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-neutral-800 border-neutral-700">
                    <Command>
                      <CommandInput 
                        placeholder="Search skills..." 
                        value={skillSearch}
                        onValueChange={setSkillSearch}
                        className="bg-neutral-800 text-white placeholder:text-neutral-400"
                      />
                      <CommandEmpty>No skills found.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {filteredSkills.map(({ category, skill }) => (
                          <CommandItem
                            key={skill}
                            value={skill}
                            onSelect={() => toggleSkill(skill)}
                            className="text-white hover:bg-neutral-700 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.skills.includes(skill) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {skill}
                            <span className="ml-auto text-xs text-neutral-400 capitalize">
                              {category}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected Skills Display */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-white/10 text-white/90 hover:bg-white/20 transition-colors"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="text-white/60 hover:text-white/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {formData.skills.length === 0 && (
                  <p className="text-sm text-neutral-400 mt-2">
                    No skills selected. Click above to add your skills.
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Areas of Interest</Label>
              <Textarea
                id="interests"
                required
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="What areas of technology interest you the most? (e.g., Web Development, AI/ML, Mobile Apps, etc.)"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Community Interest Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Community Interest</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whyJoin">Why Join OpenGeek?</Label>
              <Textarea
                id="whyJoin"
                required
                value={formData.whyJoin}
                onChange={(e) => handleChange('whyJoin', e.target.value)}
                placeholder="Tell us why you want to join OpenGeek and what motivates you"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectations">What do you expect to achieve?</Label>
              <Textarea
                id="expectations"
                required
                value={formData.expectations}
                onChange={(e) => handleChange('expectations', e.target.value)}
                placeholder="What are your goals and expectations from joining OpenGeek?"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.acceptPrivacy}
              onCheckedChange={(checked) => handleChange('acceptPrivacy', checked as boolean)}
              required
            />
            <Label htmlFor="privacy" className="text-sm leading-tight">
              I agree to the{" "}
              <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                privacy policy
              </a>{" "}
              and consent to the processing of my personal information
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.acceptPrivacy}
          className={cn(
            "w-full transition-colors duration-200",
            formData.acceptPrivacy
              ? "bg-white text-black hover:bg-neutral-200"
              : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  )
} 