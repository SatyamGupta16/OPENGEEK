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

import { toast } from 'sonner'

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
  gender: string
  hasLaptop: boolean
  
  // Login Credentials
  username: string
  password: string
  confirmPassword: string

  // Technical Background
  experience: string
  skills: string[]
  additionalSkills: string[]
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
    "Supabase",
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
    gender: '',
    hasLaptop: false,
    username: '',
    password: '',
    confirmPassword: '',
    experience: 'beginner',
    skills: [],
    additionalSkills: [],
    interests: '',
    whyJoin: '',
    expectations: '',
    acceptPrivacy: false,
  })
  const [skillSearch, setSkillSearch] = useState("")
  const [additionalSkillInput, setAdditionalSkillInput] = useState("")
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
      
      
      
      // Redirect to thank you page
      router.push('/join/thank-you')
    } catch (error) {
      console.error('Failed to submit application. Please try again.');
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addAdditionalSkill = () => {
    if (additionalSkillInput.trim() && !formData.additionalSkills.includes(additionalSkillInput.trim())) {
      handleChange('additionalSkills', [...formData.additionalSkills, additionalSkillInput.trim()])
      setAdditionalSkillInput('')
    }
  }

  const removeAdditionalSkill = (skill: string) => {
    handleChange('additionalSkills', formData.additionalSkills.filter(s => s !== skill))
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
    <div className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
              
                value={formData.githubProfile}
                onChange={(e) => handleChange('githubProfile', e.target.value)}
                placeholder="https://github.com/username"
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Third row - Course and Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course">Course/Degree</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => handleChange('course', value)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                  <SelectItem value="mtech">M.Tech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="semester">Current Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => handleChange('semester', value)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Semester</SelectItem>
                  <SelectItem value="2">2nd Semester</SelectItem>
                  <SelectItem value="3">3rd Semester</SelectItem>
                  <SelectItem value="4">4th Semester</SelectItem>
                  <SelectItem value="5">5th Semester</SelectItem>
                  <SelectItem value="6">6th Semester</SelectItem>
                  <SelectItem value="7">7th Semester</SelectItem>
                  <SelectItem value="8">8th Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fourth row - Gender and Laptop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange('gender', value)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Laptop Availability</Label>
              <div className="mt-1.5 p-3 bg-black/20 border border-white/10 rounded-md">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.hasLaptop}
                    onCheckedChange={(checked) => handleChange('hasLaptop', checked)}
                  />
                  <span className="text-sm">I have my own laptop</span>
                </label>
                {!formData.hasLaptop && (
                  <p className="mt-2 text-xs text-red-400">
                    Having a laptop is important for participating in community activities
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Login Credentials */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white">Login Credentials</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Choose a username"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Choose a password"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Background */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white">Technical Background</h3>
          <div className="space-y-4">
            <div>
              <Label>Experience Level</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleChange('experience', value)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Technical Skills</Label>
              <Popover open={skillPopoverOpen} onOpenChange={setSkillPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={skillPopoverOpen}
                    className="w-full justify-between mt-1.5"
                  >
                    Select your skills
                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {formData.skills.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search skills..."
                      value={skillSearch}
                      onValueChange={setSkillSearch}
                    />
                    <CommandEmpty>No skills found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {filteredSkills.map(({ category, skill }) => (
                        <CommandItem
                          key={skill}
                          value={skill}
                          onSelect={() => toggleSkill(skill)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.skills.includes(skill)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {skill}
                          <span className="ml-auto text-xs text-neutral-400">
                            {category}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-white/10"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="ml-1.5 hover:text-white/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Additional Skills</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={additionalSkillInput}
                  onChange={(e) => setAdditionalSkillInput(e.target.value)}
                  placeholder="Enter a custom skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addAdditionalSkill();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addAdditionalSkill}
                  variant="outline"
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>

              {formData.additionalSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.additionalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-white/10"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeAdditionalSkill(skill)}
                        className="ml-1.5 hover:text-white/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="interests">Areas of Interest</Label>
              <Textarea
                id="interests"
                required
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="What areas of technology interest you the most?"
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </div>
        </section>

        {/* Community Interest */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-white">Community Interest</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="whyJoin">Why do you want to join?</Label>
              <Textarea
                id="whyJoin"
                required
                value={formData.whyJoin}
                onChange={(e) => handleChange('whyJoin', e.target.value)}
                placeholder="Tell us why you want to join our community"
                className="mt-1.5 min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="expectations">What are your expectations?</Label>
              <Textarea
                id="expectations"
                required
                value={formData.expectations}
                onChange={(e) => handleChange('expectations', e.target.value)}
                placeholder="What do you hope to achieve by joining?"
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </div>
        </section>

        {/* Privacy and Submit */}
        <section className="space-y-4 pt-2">
          <div className="flex items-start gap-2 sm:gap-3">
            <Checkbox
              id="privacy"
              checked={formData.acceptPrivacy}
              onCheckedChange={(checked) => handleChange('acceptPrivacy', checked as boolean)}
              required
              className="mt-0.5 flex-shrink-0"
            />
            <div className="space-y-1.5">
              <label 
                htmlFor="privacy" 
                className="text-sm text-neutral-200 leading-relaxed cursor-pointer block"
              >
                I agree to the{" "}
                <a 
                  href="/privacy-policy" 
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  privacy policy
                </a>{" "}
                and consent to the processing of my personal information
              </label>
              {!formData.acceptPrivacy && (
                <p className="text-xs text-neutral-400">
                  Please accept the privacy policy to submit your application
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.acceptPrivacy}
            className={cn(
              "w-full transition-all duration-200",
              formData.acceptPrivacy
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-neutral-800 text-white/50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Application'
            )}
          </Button>
        </section>
      </form>
    </div>
  )
} 