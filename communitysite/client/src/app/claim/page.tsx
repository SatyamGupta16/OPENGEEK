'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, ExternalLink, Clock, CheckCircle, Shield, Globe, Rocket, Zap } from 'lucide-react';
import { ClaimModal } from '@/components/ui/claim-modal';

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
    highlights: string[];
    tagline: string;
}

const perks: Perk[] = [
    {
        id: 'domain-claim',
        title: 'Free Project Domain',
        description: 'Boost your project\'s identity with a trusted subdomain like yourname.opengeek.in — 100% Free.',
        detailedDescription: `Get a premium .opengeek.in subdomain absolutely free for your project! This offer includes:
    
• Free .opengeek.in subdomain registration for 1 full year
• DNS management and HTTPS configuration included
• SSL certificate and security features
• Community exposure via OpenGeek platform
• Priority support for domain-related issues

Perfect for developers launching new projects, startups building their online presence, or anyone looking to establish a professional web identity with community backing.`,
        terms: [
            'You\'ll receive a domain like projectname.opengeek.in',
            'It\'s yours FREE for 1 year with DNS & HTTPS (SSL) fully included',
            'Must be used for a real project - Site must be live or GitHub-visible',
            'You may NOT use it for phishing, NSFW, scams, crypto fraud, etc.',
            'You may NOT transfer ownership of domain',
            'A small footer badge: "🚀 Powered by OpenGeek" is required',
            'If your project collects data, you must provide a valid Privacy Policy',
            'We may audit or request changes if security flaws are found',
            'Domains may be revoked if guidelines are broken',
            'Valid for 1 year. Renewal is optional at standard .in domain cost',
            'No auto-renewals or billing surprises'
        ],
        value: '$12/year',
        category: 'Development',
        status: 'available',
        requirements: [
            'Project is in Testing or Production',
            'Solves a real-world problem',
            'Uses a unique approach',
            'Has both frontend + backend',
            'Is secure (no leaks or public data)',
            'Includes a Privacy Policy',
            'Public GitHub repo exists'
        ],
        highlights: [
            '.opengeek.in subdomain – Free for 1 year',
            'Fully secure (HTTPS + DNS)',
            'Makes your project stand out',
            'Community exposure via OpenGeek',
            'Valued at $12/year — Yours free!'
        ],
        tagline: 'Why settle for a random link when you can launch your project on a domain that sounds real?',
        validUntil: '2025-12-31'
    }
];

export default function ClaimPage() {
    const [selectedPerk, setSelectedPerk] = useState<Perk | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClaimClick = (perk: Perk) => {
        setSelectedPerk(perk);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status: Perk['status']) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>;
            case 'limited':
                return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Limited</Badge>;
            case 'coming_soon':
                return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Coming Soon</Badge>;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Development':
                return '💻';
            case 'Infrastructure':
                return '☁️';
            default:
                return '🎁';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Main Perk Card - Step 1 Design */}
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 shadow-2xl shadow-emerald-500/10">
                        <CardHeader className="text-center pb-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Rocket className="h-8 w-8 text-emerald-400" />
                                <h1 className="text-3xl font-bold text-white">Unlock Your Perk</h1>
                            </div>
                            <CardTitle className="text-2xl font-bold text-white mb-2">
                                You&apos;re Eligible to Claim a Free Project Domain!
                            </CardTitle>
                            <CardDescription className="text-lg text-zinc-300 font-medium">
                                Boost your project&apos;s identity with a trusted subdomain like <code className="bg-zinc-800 px-2 py-1 rounded text-emerald-400">yourname.opengeek.in</code> — 100% Free.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Perk Highlights */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-emerald-400" />
                                    Perk Highlights
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {perks[0].highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                                            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                            <span className="text-zinc-200">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clickbait Tagline */}
                            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-4">
                                <blockquote className="text-emerald-300 italic text-center font-medium">
                                    &quot;{perks[0].tagline}&quot;
                                </blockquote>
                            </div>

                            {/* Requirements Checklist */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-emerald-400" />
                                    Requirements
                                </h3>
                                <div className="space-y-2">
                                    {perks[0].requirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2">
                                            <div className="w-4 h-4 border-2 border-zinc-600 rounded flex items-center justify-center">
                                                <CheckCircle className="h-3 w-3 text-emerald-400" />
                                            </div>
                                            <span className="text-zinc-300">{req}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={() => handleClaimClick(perks[0])}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 text-lg transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                >
                                    Claim My Domain ➜
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works Section */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
                        <p className="text-zinc-400">Simple 3-step process to claim your free domain</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-emerald-400">1</span>
                            </div>
                            <h3 className="font-semibold text-white mb-2">Unlock Your Perk</h3>
                            <p className="text-sm text-zinc-400">Click the claim button and verify you meet our simple requirements.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-emerald-400">2</span>
                            </div>
                            <h3 className="font-semibold text-white mb-2">Tell Us About Your Project</h3>
                            <p className="text-sm text-zinc-400">Fill out project details to help us verify and assign your custom domain.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-emerald-400">3</span>
                            </div>
                            <h3 className="font-semibold text-white mb-2">Final Step – Terms & Branding</h3>
                            <p className="text-sm text-zinc-400">Review terms, accept guidelines, and launch your project with style!</p>
                        </div>
                    </div>
                </div>

                {/* Success Stories or Community Section */}
                <div className="mt-16 bg-zinc-900/30 border border-zinc-700/50 rounded-lg p-8">
                    <div className="text-center">
                        <Globe className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Join the OpenGeek Community</h3>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Get your project the recognition it deserves. Our community-backed domains help developers
                            showcase their work professionally while building trust with users.
                        </p>
                    </div>
                </div>
            </div>

            {/* Claim Modal */}
            {selectedPerk && (
                <ClaimModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    perk={selectedPerk}
                />
            )}
        </div>
    );
}