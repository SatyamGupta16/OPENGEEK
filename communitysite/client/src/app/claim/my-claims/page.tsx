'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  GitBranch,
  Globe,
  Calendar,
  User,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Claim {
  id: number;
  perk_id: string;
  project_name: string;
  current_stage: string;
  preferred_subdomain: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  reviewer_notes?: string;
}

export default function MyClaimsPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClaims();
  }, [user]);

  const fetchClaims = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/claims/my-claims`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setClaims(data.data);
      } else {
        const error = await response.json();
        setError(error.message || 'Failed to fetch claims');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const getStatusMessage = (claim: Claim) => {
    switch (claim.status) {
      case 'pending':
        return 'Your application is being reviewed. We\'ll notify you within 24-48 hours.';
      case 'approved':
        return `Congratulations! Your domain ${claim.preferred_subdomain}.opengeek.in is ready to use.`;
      case 'rejected':
        return claim.reviewer_notes || 'Your application was rejected. Please review the requirements and try again.';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
            <span className="ml-2 text-zinc-400">Loading your claims...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Claims</h2>
            <p className="text-zinc-400 mb-4">{error}</p>
            <Button onClick={fetchClaims} className="bg-emerald-600 hover:bg-emerald-700">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">My Claims</h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Track the status of your perk applications and manage your claimed benefits.
          </p>
        </div>

        {/* Claims List */}
        {claims.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Claims Yet</h2>
            <p className="text-zinc-400 mb-6">
              You haven&apos;t submitted any perk applications yet. Start by claiming your first perk!
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/claim">
                Claim Your First Perk
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {claims.map((claim) => (
              <Card key={claim.id} className="bg-zinc-900/50 border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-white">{claim.project_name}</CardTitle>
                        {getStatusBadge(claim.status)}
                      </div>
                      <CardDescription className="text-zinc-400">
                        Subdomain: <code className="bg-zinc-800 px-2 py-1 rounded text-emerald-400">
                          {claim.preferred_subdomain}.opengeek.in
                        </code>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Status Message */}
                  <div className={`p-4 rounded-lg border ${claim.status === 'approved'
                    ? 'bg-green-500/10 border-green-500/20 text-green-300'
                    : claim.status === 'rejected'
                      ? 'bg-red-500/10 border-red-500/20 text-red-300'
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                    }`}>
                    <p className="text-sm">{getStatusMessage(claim)}</p>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Stage:</span>
                      <span className="text-white capitalize">{claim.current_stage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Applied:</span>
                      <span className="text-white">
                        {new Date(claim.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Updated:</span>
                      <span className="text-white">
                        {new Date(claim.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {claim.status === 'approved' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => {
                          navigator.clipboard.writeText(`${claim.preferred_subdomain}.opengeek.in`);
                          toast.success('Domain copied to clipboard!');
                        }}
                      >
                        Copy Domain
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                        asChild
                      >
                        <a
                          href={`https://${claim.preferred_subdomain}.opengeek.in`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Site
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {claim.status === 'rejected' && (
                    <div className="pt-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        asChild
                      >
                        <Link href="/claim">
                          Apply Again
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-zinc-900/30 border border-zinc-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-white mb-2">Application Status</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• <span className="text-yellow-400">Under Review</span>: We&apos;re reviewing your application</li>
                <li>• <span className="text-green-400">Approved</span>: Your domain is ready to use</li>
                <li>• <span className="text-red-400">Rejected</span>: Application needs improvements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Next Steps</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Configure your DNS settings</li>
                <li>• Add the required footer badge</li>
                <li>• Ensure your privacy policy is accessible</li>
                <li>• Keep your project active and updated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}