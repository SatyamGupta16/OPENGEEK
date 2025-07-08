'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useAdminAuth } from '@/lib/admin-auth'
import { readApplications, updateApplicationStatus } from '@/lib/application-utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { Search, Eye, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    label: 'Pending',
    description: 'Application is under review'
  },
  approved: {
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    label: 'Approved',
    description: 'Application has been accepted'
  },
  rejected: {
    icon: XCircle,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    label: 'Rejected',
    description: 'Application was not accepted'
  }
}

interface Application {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: string
  last_updated?: string
  
  // Personal Information
  name: string
  email: string
  phone: string
  gender: string
  github_profile: string
  has_laptop: boolean
  
  // Academic Information
  course: string
  semester: string
  
  // Login Credentials
  username: string
  hashed_password: string
  temp_password?: string
  
  // Technical Background
  experience: string
  skills: string[]
  additional_skills: string[]
  interests: string
  
  // Community Interest
  why_join: string
  expectations: string
  
  // Email Status
  is_email_sent?: boolean
  email_sent_at?: string
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const { isAuthenticated } = useAdminAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications()
    }
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      console.log('Fetching applications...')
      
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error('Error fetching applications:', error)
        toast.error('Failed to load applications')
        return
      }
      
      setApplications(data || [])
      console.log('Applications loaded:', data?.length || 0, 'items')
    } catch (error) {
      console.error('Error in fetchApplications:', error)
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      console.log('Updating status:', { id, newStatus })
      
      const response = await fetch(`/api/join/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update status')
      }

      const { application } = await response.json()

      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus, last_updated: application.last_updated } : app
      ))

      const statusConfig = {
        approved: { message: 'Application approved and welcome email sent', icon: '✅' },
        rejected: { message: 'Application rejected', icon: '❌' },
        pending: { message: 'Application marked as pending', icon: '⏳' },
      }

      toast.success(statusConfig[newStatus].message)
    } catch (error) {
      console.error('Error in handleUpdateStatus:', error)
      toast.error('Failed to update status')
    }
  }

  const filteredApplications = applications.filter(app => 
    (statusFilter === 'all' || app.status === statusFilter) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // If not authenticated, show nothing
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">
            Applications
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage and review community membership applications
          </p>
        </div>

        {/* Status Overview */}
        <div className="flex gap-3 self-stretch sm:self-auto">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = applications.filter(app => app.status === status).length
            const StatusIcon = config.icon
            
            return (
              <div
                key={status}
                className={cn(
                  "flex-1 sm:flex-initial px-4 py-2 rounded-lg border",
                  config.bgColor,
                  config.borderColor
                )}
              >
                <div className="flex items-center gap-2">
                  <StatusIcon className={cn("w-4 h-4", config.color)} />
                  <span className={cn("text-sm font-medium", config.color)}>
                    {count}
                  </span>
                </div>
                <div className="text-xs font-medium mt-1">
                  <span className={config.color}>{config.label}</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 opacity-80">
                  {config.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-neutral-900 border-neutral-800 text-white w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-neutral-900 border-neutral-800">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900/95 backdrop-blur-sm border-neutral-800">
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications Table */}
      <div className="rounded-lg border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800 hover:bg-neutral-900">
                <TableHead className="text-neutral-400">Name</TableHead>
                <TableHead className="text-neutral-400">Email</TableHead>
                <TableHead className="text-neutral-400">Course</TableHead>
                <TableHead className="text-neutral-400">Status</TableHead>
                <TableHead className="text-neutral-400">Submitted</TableHead>
                <TableHead className="text-neutral-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center text-neutral-400">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Loading applications...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-neutral-400">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="border-neutral-800 hover:bg-neutral-900"
                  >
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {React.createElement(statusConfig[application.status].icon, {
                          className: cn("w-4 h-4", statusConfig[application.status].color)
                        })}
                        <span className={cn("text-sm", statusConfig[application.status].color)}>
                          {statusConfig[application.status].label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(application.submitted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Select
                          value={application.status}
                          onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                            handleUpdateStatus(application.id, value)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approve</SelectItem>
                            <SelectItem value="rejected">Reject</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                  Application Details
                  <span className={cn(
                    "text-sm px-2 py-1 rounded",
                    statusConfig[selectedApplication.status].bgColor,
                    statusConfig[selectedApplication.status].color
                  )}>
                    {statusConfig[selectedApplication.status].label}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedApplication.submitted_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedApplication.name}</p>
                    <p><strong>Email:</strong> {selectedApplication.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                    <p><strong>Gender:</strong> {selectedApplication.gender}</p>
                    <p><strong>GitHub:</strong> <a href={selectedApplication.github_profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selectedApplication.github_profile}</a></p>
                    <p><strong>Has Laptop:</strong> {selectedApplication.has_laptop ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Academic Information</h3>
                  <div className="space-y-2">
                    <p><strong>Course:</strong> {selectedApplication.course}</p>
                    <p><strong>Semester:</strong> {selectedApplication.semester}</p>
                  </div>
                </div>

                {/* Technical Background */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Background</h3>
                  <div className="space-y-2">
                    <p><strong>Experience Level:</strong> {selectedApplication.experience}</p>
                    <div>
                      <strong>Skills:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedApplication.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-neutral-800 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Additional Skills:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedApplication.additional_skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-neutral-800 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p><strong>Interests:</strong> {selectedApplication.interests}</p>
                  </div>
                </div>

                {/* Community Interest */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Community Interest</h3>
                  <div className="space-y-2">
                    <div>
                      <strong>Why Join:</strong>
                      <p className="mt-1 text-neutral-300">{selectedApplication.why_join}</p>
                    </div>
                    <div>
                      <strong>Expectations:</strong>
                      <p className="mt-1 text-neutral-300">{selectedApplication.expectations}</p>
                    </div>
                  </div>
                </div>

                {/* Login & Email Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Information</h3>
                  <div className="space-y-2">
                    <p><strong>Username:</strong> {selectedApplication.username}</p>
                    {selectedApplication.temp_password && (
                      <p><strong>Temporary Password:</strong> {selectedApplication.temp_password}</p>
                    )}
                    <p><strong>Email Status:</strong> {selectedApplication.is_email_sent ? 'Sent' : 'Not Sent'}</p>
                    {selectedApplication.email_sent_at && (
                      <p><strong>Email Sent At:</strong> {new Date(selectedApplication.email_sent_at).toLocaleString()}</p>
                    )}
                  </div>
                </div>

                {/* Timestamps */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Timestamps</h3>
                  <div className="space-y-2">
                    <p><strong>Submitted At:</strong> {new Date(selectedApplication.submitted_at).toLocaleString()}</p>
                    {selectedApplication.last_updated && (
                      <p><strong>Last Updated:</strong> {new Date(selectedApplication.last_updated).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => {
                    handleUpdateStatus(selectedApplication.id, 'rejected')
                    setIsDialogOpen(false)
                  }}
                  className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    handleUpdateStatus(selectedApplication.id, 'approved')
                    setIsDialogOpen(false)
                  }}
                  className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                >
                  Approve
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 