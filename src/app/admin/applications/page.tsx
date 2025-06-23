'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
  name: string
  email: string
  phone: string
  githubProfile: string
  course: string
  semester: string
  experience: string
  skills: string[]
  interests: string
  whyJoin: string
  expectations: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/join')
      if (!response.ok) throw new Error('Failed to fetch applications')
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/join/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')
      
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ))

      const statusConfig = {
        approved: { message: 'Application approved', icon: '✅' },
        rejected: { message: 'Application rejected', icon: '❌' },
        pending: { message: 'Application marked as pending', icon: '⏳' },
      }

      toast.success(statusConfig[newStatus].message)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const filteredApplications = applications.filter(app => 
    (statusFilter === 'all' || app.status === statusFilter) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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
            <SelectItem value="all">
              <div className="flex items-center gap-2 text-neutral-400">
                <span>All Status</span>
              </div>
            </SelectItem>
            <SelectItem value="pending">
              <div className="flex items-center gap-2 text-yellow-500">
                <Clock className="w-4 h-4" />
                <span>Pending</span>
              </div>
            </SelectItem>
            <SelectItem value="approved">
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Approved</span>
              </div>
            </SelectItem>
            <SelectItem value="rejected">
              <div className="flex items-center gap-2 text-rose-500">
                <XCircle className="w-4 h-4" />
                <span>Rejected</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications Table */}
      <div className="rounded-lg border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-neutral-900/50">
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
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
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-400">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application, index) => {
                  const status = statusConfig[application.status]
                  const StatusIcon = status.icon
                  
                  return (
                    <TableRow key={application.id} className="hover:bg-neutral-900/50">
                      <TableCell className="font-mono">{index + 1}</TableCell>
                      <TableCell className="font-medium text-white">
                        {application.name}
                        {application.githubProfile && (
                          <a
                            href={application.githubProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-blue-400 hover:text-blue-300 mt-1"
                          >
                            GitHub Profile ↗
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{application.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{application.phone}</TableCell>
                      <TableCell className="hidden lg:table-cell text-neutral-400">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value) => 
                            updateApplicationStatus(
                              application.id,
                              value as 'pending' | 'approved' | 'rejected'
                            )
                          }
                        >
                          <SelectTrigger 
                            className={cn(
                              "w-[130px] border",
                              status.bgColor,
                              status.borderColor
                            )}
                          >
                            <StatusIcon className={cn("w-4 h-4 mr-2", status.color)} />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900/95 backdrop-blur-sm border-neutral-800">
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2 text-yellow-500">
                                <Clock className="w-4 h-4" />
                                <span>Pending</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="approved">
                              <div className="flex items-center gap-2 text-emerald-500">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Approved</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="rejected">
                              <div className="flex items-center gap-2 text-rose-500">
                                <XCircle className="w-4 h-4" />
                                <span>Rejected</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application)
                            setIsDialogOpen(true)
                          }}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Application Details</DialogTitle>
            <DialogDescription className="text-white/70">
              Submitted on {selectedApplication && new Date(selectedApplication.submittedAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-white/90 mb-1">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-white/60">Name:</span> {selectedApplication.name}</p>
                    <p><span className="text-white/60">Email:</span> {selectedApplication.email}</p>
                    <p><span className="text-white/60">Phone:</span> {selectedApplication.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white/90 mb-1">Education</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-white/60">Course:</span> {selectedApplication.course}</p>
                    <p><span className="text-white/60">Semester:</span> {selectedApplication.semester}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white/90 mb-2">Technical Background</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-white/60">Experience Level:</span>{" "}
                    {selectedApplication.experience}
                  </p>
                  <div>
                    <span className="text-sm text-white/60">Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedApplication.skills.map((skill, index) => (
                        <span key={index} className="text-xs bg-white/10 text-white/90 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-white/60">Areas of Interest:</span>
                    <p className="mt-1 text-sm text-white/90">{selectedApplication.interests}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white/90 mb-2">Why Join OpenGeek?</h3>
                <p className="text-sm text-white/70 whitespace-pre-wrap">{selectedApplication.whyJoin}</p>
              </div>

              <div>
                <h3 className="font-medium text-white/90 mb-2">Expectations</h3>
                <p className="text-sm text-white/70 whitespace-pre-wrap">{selectedApplication.expectations}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <Select
                  value={selectedApplication.status}
                  onValueChange={(value) => {
                    updateApplicationStatus(
                      selectedApplication.id,
                      value as 'pending' | 'approved' | 'rejected'
                    )
                    setIsDialogOpen(false)
                  }}
                >
                  <SelectTrigger className={cn(
                    "w-full border",
                    statusConfig[selectedApplication.status].bgColor,
                    statusConfig[selectedApplication.status].borderColor
                  )}>
                    <div className="flex items-center gap-2">
                      {React.createElement(statusConfig[selectedApplication.status].icon, {
                        className: cn("w-4 h-4", statusConfig[selectedApplication.status].color)
                      })}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-800">
                    <SelectItem value="pending" className="text-yellow-500">Pending</SelectItem>
                    <SelectItem value="approved" className="text-green-500">Approved</SelectItem>
                    <SelectItem value="rejected" className="text-red-500">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 