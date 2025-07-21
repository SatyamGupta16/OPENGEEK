import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpen, Clock, ChevronRight } from 'lucide-react';

const courses = [
  {
    id: 'html',
    title: 'HTML Tutorial',
    description: 'Learn HTML from basics to advanced concepts. Create the structure of web pages with semantic HTML5.',
    topics: ['Structure', 'Elements', 'Forms', 'Media', 'Semantic HTML'],
    level: 'Beginner',
    modules: 12,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    coverBg: 'from-orange-500/20 to-transparent',
    duration: '6 hours',
    students: '2.5k',
    progress: 0,
    popular: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 452 520">
        <path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52" />
        <path fill="#ef652a" d="M226 472l149-41 35-394H226" />
        <path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"/>
        <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"/>
      </svg>
    )
  },
  {
    id: 'css',
    title: 'CSS Mastery',
    description: 'Master CSS styling, layouts, animations, and responsive design principles.',
    topics: ['Selectors', 'Box Model', 'Flexbox', 'Grid', 'Animations'],
    level: 'Intermediate',
    modules: 15,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    coverBg: 'from-blue-500/20 to-transparent',
    duration: '8 hours',
    students: '1.8k',
    progress: 25,
    popular: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 452 520">
        <path fill="#0c73b8" d="M41 460L0 0h451l-41 460-185 52"/>
        <path fill="#30a9dc" d="M226 472l149-41 35-394H226"/>
        <path fill="#ecedee" d="M226 208H94l5 57h127zm0-114H84l5 56h137zm0 261l-124-33 7 60 117 32z"/>
        <path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 26-288H226v56h80l-6 58h-74z"/>
      </svg>
    )
  },
  {
    id: 'javascript',
    title: 'JavaScript Essentials',
    description: 'Learn modern JavaScript programming with practical examples and projects.',
    topics: ['Basics', 'DOM', 'Async', 'ES6+', 'APIs'],
    level: 'Intermediate',
    modules: 20,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    coverBg: 'from-yellow-500/20 to-transparent',
    duration: '10 hours',
    students: '3.2k',
    progress: 0,
    popular: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 452 520">
        <path fill="#e4a126" d="M0 0h451v512H0z"/>
        <path fill="#fff" d="M226 208v74c0 54-28 79-69 79-37 0-59-24-70-43l38-23c7 13 14 23 32 23 16 0 27-8 27-36V208h42zm99 74c0 59-35 86-85 86-46 0-79-22-94-51l38-22c10 17 23 29 45 29 19 0 31-9 31-23 0-16-13-22-35-32l-12-5c-35-15-58-33-58-72 0-36 27-64 70-64 31 0 53 11 69 39l-38 24c-8-15-17-21-31-21-14 0-23 9-23 21 0 14 9 20 30 29l12 5c41 18 64 35 64 76z"/>
      </svg>
    )
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Build modern web applications with React and its ecosystem.',
    topics: ['Components', 'Hooks', 'State', 'Router', 'APIs'],
    level: 'Advanced',
    modules: 18,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    coverBg: 'from-cyan-500/20 to-transparent',
    duration: '12 hours',
    students: '2.1k',
    progress: 15,
    popular: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 452 520">
        <path fill="#61dafb" d="M226 93c67 0 119 13 119 29s-52 29-119 29-119-13-119-29 52-29 119-29m0-12c-74 0-131 16-131 41s57 41 131 41 131-16 131-41-57-41-131-41z"/>
        <path fill="#61dafb" d="M226 354c-67 0-119-13-119-29s52-29 119-29 119 13 119 29-52 29-119 29m0 12c74 0 131-16 131-41s-57-41-131-41-131 16-131 41 57 41 131 41z"/>
        <path fill="#61dafb" d="M226 171c16 67 13 119-3 119s-35-52-51-119-13-119 3-119 35 52 51 119m12 0c18-74 16-131-9-131s-45 57-63 131-16 131 9 131 45-57 63-131z"/>
        <path fill="#61dafb" d="M226 171c-16 67-29 119-45 119s-19-52-3-119 29-119 45-119 19 52 3 119m-12 0c-18-74-37-131-62-131s-26 57-8 131 37 131 62 131 26-57 8-131z"/>
        <circle fill="#61dafb" cx="226" cy="256" r="34"/>
      </svg>
    )
  }
];

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return 'bg-green-500/10 text-green-500';
    case 'intermediate':
      return 'bg-blue-500/10 text-blue-500';
    case 'advanced':
      return 'bg-purple-500/10 text-purple-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

export default function LearnPage() {
  return (
    <ScrollArea className="flex-1 h-full">
      <div className="min-h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-[#21262d] bg-[#161b22] px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Learning Path</h1>
                <p className="text-gray-400 mt-1">Choose a course to start your web development journey</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#1f6feb]" />
                  <span>{courses.length} Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1f6feb]" />
                  <span>36 Hours</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className="bg-[#1f2937] border-[#374151] hover:border-[#1f6feb] transition-all duration-200 group overflow-hidden"
                >
                  <div className={`aspect-[2/1] relative bg-gradient-to-tr ${course.coverBg} flex items-center justify-center p-6`}>
                    {course.icon}
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <Badge className={`${getLevelColor(course.level)} text-xs`}>
                        {course.level}
                      </Badge>
                      {course.popular && (
                        <Badge className="bg-yellow-500/20 text-yellow-500 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-[#1f6feb] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{course.modules} Modules</span>
                      </div>
                    </div>

                    {course.progress > 0 && (
                      <div className="h-1 bg-[#30363d] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1f6feb] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}

                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full border-[#374151] hover:border-[#1f6feb] hover:text-white text-sm h-8"
                    >
                      <Link to={`/learn/${course.id}/introduction`} className="flex items-center justify-center">
                        {course.progress > 0 ? 'Continue' : 'Start Course'}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
} 