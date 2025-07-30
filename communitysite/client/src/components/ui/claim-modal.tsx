'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import {
  CheckCircle,
  FileText,
  Loader2,
  Rocket,
  Brain,
  Shield,
  Globe,
  Lock,
  Calendar,
  Star,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface Perk {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  terms: string[];
  value: string;
  category: string;
  status: 'available' | 'limited' | 'coming_soon';
  requirements: string[];
  validUntil?: string;
  highlights?: string[];
  tagline?: string;
}

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  perk: Perk;
}

interface FormData {
  projectName: string;
  currentStage: string;
  problemSolving: string;
  targetAudience: string;
  uniqueApproach: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  teamSize: string;
  dataSafety: string;
  privacyPolicyUrl: string;
  preferredSubdomain: string;
  additionalInfo: string;
  agreeToTerms: boolean;
}

const initialFormData: FormData = {
  projectName: '',
  currentStage: '',
  problemSolving: '',
  targetAudience: '',
  uniqueApproach: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  teamSize: '',
  dataSafety: '',
  privacyPolicyUrl: '',
  preferredSubdomain: '',
  additionalInfo: '',
  agreeToTerms: false
};

export function ClaimModal({ isOpen, onClose, perk }: ClaimModalProps) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          perkId: perk.id,
          projectName: formData.projectName,
          currentStage: formData.currentStage,
          problemSolving: formData.problemSolving,
          targetAudience: formData.targetAudience,
          uniqueApproach: formData.uniqueApproach,
          techStack: formData.techStack,
          githubUrl: formData.githubUrl,
          liveUrl: formData.liveUrl,
          teamSize: formData.teamSize,
          dataSafety: formData.dataSafety,
          privacyPolicyUrl: formData.privacyPolicyUrl,
          preferredSubdomain: formData.preferredSubdomain,
          additionalInfo: formData.additionalInfo,
          agreeToTerms: formData.agreeToTerms
        }),
      });

      if (response.ok) {
        toast.success('🎉 You&apos;ve successfully claimed your perk! Review in progress.');
        onClose();
        setCurrentStep(1);
        setFormData(initialFormData);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit application');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) {
      return (
        formData.projectName.trim() &&
        formData.currentStage &&
        formData.problemSolving.trim() &&
        formData.targetAudience.trim() &&
        formData.uniqueApproach.trim() &&
        formData.techStack.trim() &&
        formData.githubUrl.trim() &&
        formData.teamSize &&
        formData.dataSafety.trim() &&
        formData.preferredSubdomain.trim()
      );
    }
    if (currentStep === 3) {
      return formData.agreeToTerms;
    }
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Step 1: Unlock Your Perk */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Unlock Your Perk</h3>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">You&apos;re Eligible to Claim a Free Project Domain!</h4>
              <p className="text-lg text-zinc-300 mb-4">
                Boost your project&apos;s identity with a trusted subdomain like <code className="bg-zinc-800 px-2 py-1 rounded text-emerald-400">yourname.opengeek.in</code> — 100% Free.
              </p>
            </div>

            {/* Perk Highlights */}
            <div className="space-y-3">
              <h5 className="font-semibold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-emerald-400" />
                Perk Highlights
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-200">.opengeek.in subdomain – Free for 1 year</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Lock className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-200">Fully secure (HTTPS + DNS)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Rocket className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-200">Makes your project stand out</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Globe className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-200">Community exposure via OpenGeek</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Star className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-200">Valued at $12/year — Yours free!</span>
                </div>
              </div>
            </div>

            {/* Clickbait Tagline */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-4">
              <blockquote className="text-emerald-300 italic text-center font-medium">
                &quot;Why settle for a random link when you can launch your project on a domain that <em>sounds real</em>?&quot;
              </blockquote>
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-3">
              <h5 className="font-semibold text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Requirements (checklist-style)
              </h5>
              <div className="space-y-2">
                {perk.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <div className="w-4 h-4 border-2 border-emerald-500 rounded flex items-center justify-center bg-emerald-500/20">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Step 2: Tell Us About Your Project */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Tell Us About Your Project</h3>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">You&apos;re One Step Away From Going Live</h4>
              <p className="text-zinc-400">Fill out a few details to help us verify your project and assign your custom domain.</p>
              <div className="mt-2 text-sm text-zinc-500">Step 2 of 3 — Project Info</div>
            </div>

            {/* Form Fields in Cards */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                  <Label htmlFor="projectName" className="text-white font-medium">Project Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    placeholder="e.g., TaskMaster Pro"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                  <Label htmlFor="currentStage" className="text-white font-medium">Current Stage *</Label>
                  <Select value={formData.currentStage} onValueChange={(value) => handleInputChange('currentStage', value)}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Testing or Production only" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="problemSolving" className="text-white font-medium">What Problem Are You Solving? *</Label>
                <Textarea
                  id="problemSolving"
                  value={formData.problemSolving}
                  onChange={(e) => handleInputChange('problemSolving', e.target.value)}
                  placeholder="e.g., Helping small businesses manage their inventory efficiently..."
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]"
                />
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="targetAudience" className="text-white font-medium">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="e.g., Small business owners, Students, Developers"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="uniqueApproach" className="text-white font-medium">What Makes Your Project Special? (USP) *</Label>
                <Textarea
                  id="uniqueApproach"
                  value={formData.uniqueApproach}
                  onChange={(e) => handleInputChange('uniqueApproach', e.target.value)}
                  placeholder="e.g., First AI-powered solution that works offline, unique gamification approach..."
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]"
                />
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="techStack" className="text-white font-medium">Tech Stack *</Label>
                <Input
                  id="techStack"
                  value={formData.techStack}
                  onChange={(e) => handleInputChange('techStack', e.target.value)}
                  placeholder="e.g., React, Node.js, PostgreSQL, Docker"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                  <Label htmlFor="githubUrl" className="text-white font-medium">GitHub Repo * <span className="text-xs text-zinc-500">(must be public)</span></Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                  <Label htmlFor="liveUrl" className="text-white font-medium">Live Site <span className="text-xs text-zinc-500">(optional)</span></Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                    placeholder="https://yourproject.com"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="teamSize" className="text-white font-medium">Team Size *</Label>
                <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="2-5">2–5</SelectItem>
                    <SelectItem value="6-10">6–10</SelectItem>
                    <SelectItem value="10+">10+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="dataSafety" className="text-white font-medium">How are you keeping your users&apos; data safe? *</Label>
                <Textarea
                  id="dataSafety"
                  value={formData.dataSafety}
                  onChange={(e) => handleInputChange('dataSafety', e.target.value)}
                  placeholder="e.g., End-to-end encryption, GDPR compliance, no data collection, secure authentication..."
                  className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]"
                />
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="privacyPolicyUrl" className="text-white font-medium">Privacy Policy Link <span className="text-xs text-zinc-500">(required if user data is collected)</span></Label>
                <Input
                  id="privacyPolicyUrl"
                  value={formData.privacyPolicyUrl}
                  onChange={(e) => handleInputChange('privacyPolicyUrl', e.target.value)}
                  placeholder="https://yourproject.com/privacy"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="preferredSubdomain" className="text-white font-medium">Preferred Subdomain *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="preferredSubdomain"
                    value={formData.preferredSubdomain}
                    onChange={(e) => handleInputChange('preferredSubdomain', e.target.value)}
                    placeholder="myapp"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <span className="text-zinc-400">.opengeek.in</span>
                </div>
              </div>

              <div className="space-y-2 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <Label htmlFor="additionalInfo" className="text-white font-medium">Anything Else? <span className="text-xs text-zinc-500">(optional)</span></Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any additional information that might help us process your application..."
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Step 3: Final Step – Terms & Branding */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Final Step – Terms & Branding</h3>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">One Last Thing Before We Launch You 🚀</h4>
              <p className="text-zinc-400">Let&apos;s keep things transparent, secure, and community-focused.</p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-4">
              {/* About Your Domain */}
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <h5 className="font-semibold text-white flex items-center gap-2 mb-3">
                  <Globe className="h-5 w-5 text-emerald-400" />
                  About Your Domain
                </h5>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    You&apos;ll receive a domain like <code className="bg-zinc-700 px-1 rounded">projectname.opengeek.in</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    It&apos;s yours FREE for 1 year
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    DNS & HTTPS (SSL) fully included
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Managed under OpenGeek ecosystem
                  </li>
                </ul>
              </div>

              {/* Usage Rules */}
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <h5 className="font-semibold text-white flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-emerald-400" />
                  Usage Rules
                </h5>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Must be used for a <strong>real project</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Site must be live or GitHub-visible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    You may NOT use it for phishing, NSFW, scams, crypto fraud, etc.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    You may NOT transfer ownership of domain
                  </li>
                </ul>
              </div>

              {/* Branding Guidelines */}
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <h5 className="font-semibold text-white flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  Branding Guidelines
                </h5>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    A small footer badge: <em>&quot;🚀 Powered by OpenGeek&quot;</em> is required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Helps us keep perks sustainable and support more devs
                  </li>
                </ul>
              </div>

              {/* Security and Trust */}
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <h5 className="font-semibold text-white flex items-center gap-2 mb-3">
                  <Lock className="h-5 w-5 text-emerald-400" />
                  Security and Trust
                </h5>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    If your project collects data, you must provide a valid Privacy Policy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    We may audit or request changes if security flaws are found
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Domains may be revoked if guidelines are broken
                  </li>
                </ul>
              </div>

              {/* Renewal */}
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <h5 className="font-semibold text-white flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  Renewal
                </h5>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    Valid for 1 year. Renewal is optional at standard .in domain cost.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    No auto-renewals or billing surprises.
                  </li>
                </ul>
              </div>
            </div>

            {/* Summary Review Panel */}
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-emerald-400" />
                Summary (Review Panel)
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Project Name:</span>
                    <span className="text-white">{formData.projectName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Stage:</span>
                    <span className="text-white capitalize">{formData.currentStage || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Team Size:</span>
                    <span className="text-white">{formData.teamSize || 'Not set'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Subdomain:</span>
                    <span className="text-emerald-400">{formData.preferredSubdomain || 'Not set'}.opengeek.in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Perk Value:</span>
                    <span className="text-emerald-400">{perk.value}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                className="border-zinc-600 data-[state=checked]:bg-emerald-600 mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm text-zinc-300 leading-relaxed">
                <CheckCircle className="inline h-4 w-4 text-emerald-400 mr-1" />
                I confirm that this project is legitimate, meets all requirements, and I accept the above terms.
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <span>Claim Perk</span>
            <Badge variant="outline" className="text-xs">
              Step {currentStep} of 3
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-4">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-700 flex-shrink-0 bg-zinc-900">
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${step <= currentStep ? 'bg-emerald-400' : 'bg-zinc-600'
                  }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Previous
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isFormValid()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
              >
                Review & Accept Terms ➜
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit My Application ✅'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}