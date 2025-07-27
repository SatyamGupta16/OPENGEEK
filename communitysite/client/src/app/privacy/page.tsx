'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
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
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Welcome to OPENGEEK Community (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p>
                  By using OPENGEEK Community, you agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <div className="text-zinc-300 space-y-4">
                <h3 className="text-lg font-medium text-white">2.1 Personal Information</h3>
                <p>We may collect the following personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Profile information (bio, location, website, social media links)</li>
                  <li>Profile picture and uploaded content</li>
                  <li>Account credentials and authentication data</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">2.2 Usage Information</h3>
                <p>We automatically collect certain information when you use our platform:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns and interaction data</li>
                  <li>Log files and analytics data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">2.3 Content Information</h3>
                <p>Information you provide when using our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posts, comments, and messages</li>
                  <li>Project descriptions and code repositories</li>
                  <li>Images and files you upload</li>
                  <li>Interactions with other users (likes, follows, shares)</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <div className="text-zinc-300 space-y-4">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our services</li>
                  <li>Create and manage your account</li>
                  <li>Enable communication between users</li>
                  <li>Personalize your experience</li>
                  <li>Send notifications and updates</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze usage patterns and performance</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
              <div className="text-zinc-300 space-y-4">
                <h3 className="text-lg font-medium text-white">4.1 Public Information</h3>
                <p>
                  Certain information is public by default, including your profile information, posts, comments, and project descriptions. This information is visible to all users and may be indexed by search engines.
                </p>

                <h3 className="text-lg font-medium text-white mt-6">4.2 Third-Party Services</h3>
                <p>We may share information with trusted third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Authentication:</strong> Clerk for user authentication and management</li>
                  <li><strong>Cloud Storage:</strong> Cloudinary for image and file storage</li>
                  <li><strong>Analytics:</strong> Service providers for usage analytics</li>
                  <li><strong>Infrastructure:</strong> Hosting and database providers</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6">4.3 Legal Requirements</h3>
                <p>We may disclose your information if required by law or to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Comply with legal processes or government requests</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Prevent fraud or security threats</li>
                  <li>Enforce our Terms of Service</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>Security measures include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular backups and disaster recovery procedures</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
              <div className="text-zinc-300 space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@opengeek.community. We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking Technologies</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small data files stored on your device.
                </p>
                <p>We use cookies for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Authentication and session management</li>
                  <li>Remembering your preferences</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Security and fraud prevention</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our platform.
                </p>
              </div>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Links</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party services you visit.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Children&apos;s Privacy</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </div>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Data Retention</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We may retain certain information for longer periods as required by law or for legitimate business purposes.
                </p>
                <p>When you delete your account:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your profile and personal information will be deleted</li>
                  <li>Your posts and content may be anonymized or deleted</li>
                  <li>Some information may be retained for legal or security purposes</li>
                </ul>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Privacy Policy</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
                <p>
                  Your continued use of our platform after any changes constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
              <div className="text-zinc-300 space-y-4">
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@opengeek.community</p>
                  <p><strong>Website:</strong> https://community.opengeek.in</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                </div>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}