import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, BrainCircuit, Database, Palette } from "lucide-react";

const skillCategories = [
  {
    name: "Frontend Development",
    icon: Code2,
    skills: ["HTML/CSS", "JavaScript", "React", "Vue", "Angular", "TypeScript", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    icon: Database,
    skills: ["Node.js", "Python", "Java", "PHP", "Ruby", "C#", "SQL"]
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Wireframing", "Prototyping"]
  },
  {
    name: "Machine Learning",
    icon: BrainCircuit,
    skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Computer Vision", "NLP"]
  }
];

export function SkillsForm() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Find Internships Matching Your Skills</h2>
      
      {/* Category Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          const isSelected = category.name === selectedCategory.name;
          
          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category)}
              className={`relative group p-4 rounded-xl border transition-all duration-300 ${
                isSelected 
                  ? "border-white/30 bg-white/10" 
                  : "border-white/10 hover:border-white/20 bg-white/5"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-white/70"}`} />
                <span className={`text-sm ${isSelected ? "text-white" : "text-white/70"}`}>
                  {category.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Skills Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Select Your Skills</h3>
        <div className="flex flex-wrap gap-3">
          {selectedCategory.skills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            
            return (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  isSelected 
                    ? "bg-white text-black" 
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Skills Summary */}
      {selectedSkills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Your Selected Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button 
        className="w-full group relative text-sm font-medium bg-gradient-to-r from-white/90 via-white/90 to-white/90 text-black hover:from-white hover:via-white hover:to-white transition-all duration-300 h-12"
      >
        Find Matching Internships
      </Button>
    </motion.div>
  );
} 