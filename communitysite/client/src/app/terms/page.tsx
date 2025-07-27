'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Welcome to OPENGEEK Community (&quot;Platform,&quot; &quot;Service,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our platform and services.
                </p>
                <p>
                  By accessing or using OPENGEEK Community, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  OPENGEEK Community is a platform for developers to connect, share projects, collaborate, and learn together. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>User profiles and social networking features</li>
                  <li>Content sharing (posts, projects, code)</li>
                  <li>Community discussions and forums</li>
                  <li>Project collaboration tools</li>
                  <li>Educational resources and learning paths</li>
                  <li>Developer tools and integrations</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
              <div className="text-zinc-300 space-y-4">
                <h3 className="text-lg font-medium text-white">3.1 Account Creation</h3>
                <p>
                  To use certain features of our Service, you must create an account. You may create an account by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing a valid email address and password</li>
                  <li>Using third-party authentication (Google, GitHub, Apple)</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">3.2 Account Responsibilities</h3>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and up-to-date information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">3.3 Account Termination</h3>
                <p>
                  You may terminate your account at any time. We may suspend or terminate your account if you violate these Terms or engage in harmful activities.
                </p>
              </div>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Content</h2>
              <div className="text-zinc-300 space-y-4">
                <h3 className="text-lg font-medium text-white">4.1 Content Ownership</h3>
                <p>
                  You retain ownership of all content you post, upload, or share on our Platform (&quot;User Content&quot;). By posting User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on the Platform.
                </p>

                <h3 className="text-lg font-medium text-white mt-6">4.2 Content Standards</h3>
                <p>User Content must not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Contain harmful, offensive, or inappropriate material</li>
                  <li>Include spam, malware, or malicious code</li>
                  <li>Harass, threaten, or harm other users</li>
                  <li>Contain false or misleading information</li>
                  <li>Violate privacy rights of others</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">4.3 Content Moderation</h3>
                <p>
                  We reserve the right to review, modify, or remove User Content that violates these Terms or our community guidelines. We may take action without prior notice.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Acceptable Use Policy</h2>
              <div className="text-zinc-300 space-y-4">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Create multiple accounts to evade restrictions</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Collect user information without consent</li>
                  <li>Use automated tools to access the Service</li>
                  <li>Reverse engineer or attempt to extract source code</li>
                  <li>Distribute viruses or harmful software</li>
                  <li>Engage in any form of harassment or abuse</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property Rights</h2>
              <div className="text-zinc-300 space-y-4">
                <h3 className="text-lg font-medium text-white">6.1 Platform Rights</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by OPENGEEK Community and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h3 className="text-lg font-medium text-white mt-6">6.2 User Rights</h3>
                <p>
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes.
                </p>

                <h3 className="text-lg font-medium text-white mt-6">6.3 DMCA Policy</h3>
                <p>
                  We respect intellectual property rights and will respond to valid DMCA takedown notices. If you believe your copyright has been infringed, please contact us at dmca@opengeek.community.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Privacy</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
                <p>
                  By using our Service, you consent to the collection and use of information as outlined in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Our Service may integrate with third-party services such as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Authentication providers (Google, GitHub, Apple)</li>
                  <li>Cloud storage services</li>
                  <li>Analytics and monitoring tools</li>
                  <li>Payment processors</li>
                </ul>
                <p>
                  Your use of third-party services is subject to their respective terms and privacy policies. We are not responsible for third-party services.
                </p>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Disclaimers</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</li>
                  <li>UNINTERRUPTED OR ERROR-FREE OPERATION</li>
                  <li>SECURITY OR ACCURACY OF INFORMATION</li>
                  <li>COMPATIBILITY WITH YOUR SYSTEMS</li>
                </ul>
                <p>
                  We do not warrant that the Service will meet your requirements or that any defects will be corrected.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Limitation of Liability</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, OPENGEEK COMMUNITY SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES</li>
                  <li>LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES</li>
                  <li>DAMAGES RESULTING FROM USER CONTENT OR THIRD-PARTY ACTIONS</li>
                  <li>DAMAGES EXCEEDING THE AMOUNT PAID FOR THE SERVICE</li>
                </ul>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above limitations may not apply to you.
                </p>
              </div>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Indemnification</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  You agree to indemnify and hold harmless OPENGEEK Community, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your User Content</li>
                  <li>Your violation of any rights of another party</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Termination</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Harm to other users or the platform</li>
                  <li>Extended periods of inactivity</li>
                </ul>
                <p>
                  Upon termination, your right to use the Service will cease immediately. Provisions that should survive termination will remain in effect.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of [Your Jurisdiction].
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to Terms</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated Terms on our platform</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices on the Service</li>
                </ul>
                <p>
                  Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
                </p>
              </div>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Severability</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </div>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">16. Entire Agreement</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and OPENGEEK Community regarding the use of the Service.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">17. Contact Information</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@opengeek.community</p>
                  <p><strong>Website:</strong> https://community.opengeek.in</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                </div>
                <p className="text-sm text-zinc-400 mt-4">
                  For DMCA takedown requests: dmca@opengeek.community
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}