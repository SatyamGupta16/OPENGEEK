'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import {
  X,
  Plus,
  Github as GithubIcon,
  ExternalLink,
  Code,
  Tag,
  Upload,
  Image as ImageIcon,
  Trash2,
  Camera
} from 'lucide-react';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';
import Image from 'next/image';


interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  language: string;
  starsCount: number;
  forksCount: number;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    fullName: string;
    imageUrl: string;
    isVerified: boolean;
  };
  isStarredByUser: boolean;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated?: (project: Project) => void;
}

export function CreateProjectModal({ isOpen, onClose, onProjectCreated }: CreateProjectModalProps) {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    language: '',
    tags: [] as string[]
  });

  // Popular programming languages
  const popularLanguages = [
    'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java',
    'C++', 'React', 'Vue', 'Angular', 'Node.js', 'Next.js'
  ];

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        githubUrl: '',
        liveUrl: '',
        language: '',
        tags: []
      });
      setCurrentTag('');
      setImagePreview(null);
      setSelectedImageFile(null);
    }
  }, [isOpen]);

  // Upload image to backend (which will handle Cloudinary upload)
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Get the authentication token
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Upload error response:', errorData);
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success || !data.imageUrl) {
        throw new Error('Invalid response from upload service');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Handle image selection (no upload yet)
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      // Store the file and create preview
      setSelectedImageFile(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim()) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error('Please sign in to submit a project');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.githubUrl.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.tags.length === 0) {
      toast.error('Please add at least one tag');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = undefined;

      // Upload image if one is selected
      if (selectedImageFile) {
        toast.info('Uploading image...');
        try {
          imageUrl = await uploadImageToCloudinary(selectedImageFile);
          toast.success('Image uploaded successfully!');
        } catch (error) {
          toast.error('Failed to upload image. Submitting project without image.');
          console.error('Image upload error:', error);
          // Continue without image
        }
      }

      // Create project with or without image
      const response = await projectsAPI.createProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        githubUrl: formData.githubUrl.trim(),
        liveUrl: formData.liveUrl.trim() || undefined,
        imageUrl: imageUrl,
        tags: formData.tags,
        language: formData.language || 'Other'
      });

      if (response.success) {
        toast.success('Project submitted successfully! It will be reviewed before being published.');
        onProjectCreated?.(response.data.project);
        onClose();
      } else {
        toast.error('Failed to submit project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] min-h-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full bg-zinc-900 border-zinc-800 shadow-xl flex flex-col min-h-0 h-full">
          <CardHeader className="border-b border-zinc-800 bg-zinc-900 p-3 sm:p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                Submit Your Project
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 w-7 p-0"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Share your amazing project with the community
            </p>
          </CardHeader>

          <CardContent className="p-0 flex-1 min-h-0 overflow-hidden">
            <div
              className="overflow-y-auto p-3 sm:p-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#52525b #27272a',
                height: 'calc(90vh - 140px)', // Fixed height to ensure scrolling
                minHeight: '400px'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Title - Full Width */}
                <div>
                  <Label htmlFor="title" className="text-white font-medium text-xs sm:text-sm">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="My Awesome Project"
                    className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-8 sm:h-9 text-sm"
                    maxLength={200}
                    required
                  />
                </div>

                {/* Description - Full Width */}
                <div>
                  <Label htmlFor="description" className="text-white font-medium text-xs sm:text-sm">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what your project does, what technologies you used, and what makes it special..."
                    className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 resize-none focus:border-zinc-600 focus:ring-zinc-600 text-sm"
                    rows={3}
                    maxLength={1000}
                    required
                  />
                  <div className="text-xs text-zinc-500 mt-1">
                    {formData.description.length}/1000 characters
                  </div>
                </div>

                {/* Project Image Upload */}
                <div>
                  <Label className="text-white font-medium flex items-center gap-1 mb-2 text-xs sm:text-sm">
                    <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    Project Image (Optional)
                  </Label>

                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-4 sm:p-6 text-center hover:border-zinc-600 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="p-2 sm:p-3 bg-zinc-800 rounded-full">
                          <Camera className="h-4 w-4 sm:h-6 sm:w-6 text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-medium mb-1">
                            Upload a project screenshot
                          </p>
                          <p className="text-zinc-400 text-xs">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-7"
                        >
                          <Upload className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
                          Choose Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative aspect-video w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={imagePreview}
                          alt="Project preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-center gap-2 mt-2 sm:mt-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs h-7"
                        >
                          <Upload className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
                          Change
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="border-red-700 text-red-400 hover:bg-red-900/20 hover:text-red-300 text-xs h-7"
                        >
                          <Trash2 className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
                          Remove
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* URLs Section - Two Column Layout on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* GitHub URL */}
                  <div>
                    <Label htmlFor="githubUrl" className="text-white font-medium flex items-center gap-1 text-xs sm:text-sm">
                      <GithubIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      GitHub Repository *
                    </Label>
                    <Input
                      id="githubUrl"
                      value={formData.githubUrl}
                      onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-8 sm:h-9 text-sm"
                      required
                    />
                  </div>

                  {/* Live URL */}
                  <div>
                    <Label htmlFor="liveUrl" className="text-white font-medium flex items-center gap-1 text-xs sm:text-sm">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      Live Demo URL (Optional)
                    </Label>
                    <Input
                      id="liveUrl"
                      value={formData.liveUrl}
                      onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                      placeholder="https://myproject.com"
                      className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-8 sm:h-9 text-sm"
                    />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <Label htmlFor="language" className="text-white font-medium text-xs sm:text-sm">
                    Primary Language/Framework
                  </Label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="mt-1 w-full px-2 sm:px-3 py-1 sm:py-2 h-8 sm:h-9 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600"
                  >
                    <option value="">Select a language...</option>
                    {popularLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {formData.language === 'Other' && (
                    <Input
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      placeholder="Enter custom language/framework"
                      className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-8 sm:h-9 text-sm"
                    />
                  )}
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-white font-medium flex items-center gap-1 text-xs sm:text-sm">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    Tags * (1-10 tags)
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Add a tag (e.g., web, mobile, ai)"
                      className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-8 sm:h-9 text-sm"
                      maxLength={20}
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!currentTag.trim() || formData.tags.length >= 10}
                      className="bg-white hover:bg-zinc-100 text-black px-2 sm:px-3 h-8 sm:h-9 text-xs sm:text-sm"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>

                  {/* Tags Display */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer border-0 font-medium text-xs px-2 py-1"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <X className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-zinc-500">
                    {formData.tags.length}/10 tags • Click on a tag to remove it
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-zinc-800 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 sm:h-9 text-xs sm:text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.title.trim() || !formData.description.trim() || !formData.githubUrl.trim() || formData.tags.length === 0}
                    className="flex-1 bg-white hover:bg-zinc-100 text-black font-medium shadow-sm disabled:opacity-50 h-8 sm:h-9 text-xs sm:text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-1 sm:mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Submit Project
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}