'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Clock, CheckCircle, Shield, Globe, Rocket, Star } from 'lucide-react';
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
                return <Badge variant="secondary" className="bg-zinc-800 text-zinc-200 border-zinc-700">Available</Badge>;
            case 'limited':
                return <Badge variant="outline" className="bg-yellow-900/20 text-yellow-400 border-yellow-600">Limited</Badge>;
            case 'coming_soon':
                return <Badge variant="outline" className="bg-zinc-800 text-zinc-400 border-zinc-600">Coming Soon</Badge>;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Development':
                return <Globe className="h-5 w-5" />;
            case 'Infrastructure':
                return <Shield className="h-5 w-5" />;
            default:
                return <Gift className="h-5 w-5" />;
        }
    };

    return (
        <div className="bg-zinc-900 text-white min-h-screen mt-0">
            {/* Header */}
            <div className="border-b border-zinc-800 bg-zinc-900 mt-0 ">
                <div className="px-6 py-8">
                    
                        <h1 className="text-3xl font-bold text-white ">
                            Community Perks
                        </h1>
                        <h3 className="text-zinc-400 max-w-2xl">
                            Exclusive benefits and services available to our community members
                        </h3>
                
                </div>
            </div>

            {/* Perks Grid */}
            <div className="px-7 py-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {perks.map((perk) => (
                        <Card key={perk.id} className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50 group relative overflow-hidden">
                            
                            
                            <CardHeader className="pb-4 relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700 group-hover:border-zinc-600 transition-colors">
                                            {getCategoryIcon(perk.category)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">
                                                {perk.title}
                                            </CardTitle>
                                            <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">{perk.category}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(perk.status)}
                                </div>
                                
                                {/* Tagline */}
                                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-zinc-300 italic font-medium leading-relaxed">
                                        &ldquo;{perk.tagline}&rdquo;
                                    </p>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0 space-y-4 relative z-10">
                                <CardDescription className="text-sm text-zinc-400 leading-relaxed">
                                    {perk.description}
                                </CardDescription>
                                
                                {/* Key Highlights */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wide flex items-center gap-1">
                                        <Star className="h-3 w-3" />
                                        Key Benefits
                                    </h4>
                                    <div className="space-y-1">
                                        {perk.highlights.slice(0, 3).map((highlight, index) => (
                                            <div key={index} className="flex items-center gap-2 text-xs">
                                                <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                                <span className="text-zinc-300">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                
                               
                                
                                <Button
                                    onClick={() => handleClaimClick(perk)}
                                    className="w-full bg-gradient-to-r from-white to-zinc-100 hover:from-zinc-100 hover:to-white text-black font-semibold text-sm py-3 transition-all duration-200 hover:shadow-lg hover:shadow-white/20 group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={perk.status === 'coming_soon'}
                                >
                                    {perk.status === 'coming_soon' ? (
                                        <>
                                            <Clock className="h-4 w-4 mr-2" />
                                            Coming Soon
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="h-4 w-4 mr-2" />
                                            Claim Now
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
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