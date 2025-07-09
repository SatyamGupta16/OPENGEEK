import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import { Bold } from 'lucide-react';

interface WelcomeEmailProps {
  name: string;
  email: string;
  password: string;
}

export const WelcomeEmail = ({
  name,
  email,
  password,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to OpenGeek - Your Journey Begins Here`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#111111] font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded-lg bg-[#1d1d1d] p-[20px] border border-[#333333] shadow-xl">
            {/* Header with Logo */}
            <Section className="mt-6 mx-[-20px]">
              <div className="overflow-hidden rounded-lg">
                <Img
                  src="https://opengeek.in/banner.png"
                  width="600"
                  alt="OpenGeek"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Welcome Message */}
            <Section className="mt-8 px-2">
              <Heading className="text-2xl font-bold text-white tracking-tight">
                Welcome to OPENGEEK Community! 🎉
              </Heading>
              <Text className="text-lg text-white mt-5 font-medium">
                Hello <span className="text-blue-400">{name}</span>,
              </Text>
              <Text className="mt-3 text-[#e1e1e1] leading-relaxed">
                We're thrilled to have you join our community of passionate developers, innovators, and tech enthusiasts. Your application has been approved, and we're excited to begin this journey together.
              </Text>
            </Section>

            {/* Community Chat Section */}
            <Section className="mt-8 rounded-lg bg-[#252525] p-6 border border-[#333333]">
              <Heading className="text-xl font-semibold text-white mb-2">
                Join Our Community Chat 💬
              </Heading>
              
              <Text className="text-[#e1e1e1] mb-4 font-medium">
                ⚠️ Important: Joining both our WhatsApp and Discord communities is mandatory for all members. These platforms are essential for:
              </Text>

              <div className="space-y-4">
                {/* WhatsApp Button */}
                <Link 
                  href="https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7" 
                  className="block"
                >
                  <div className="bg-[#25D366] hover:bg-[#128C7E] rounded-lg px-6 py-4 transition-colors duration-200 cursor-pointer">
                    <div className="text-white font-semibold text-xl">Join WhatsApp Community</div>
                    <div className="text-white/80 text-sm mt-1">Quick updates & announcements</div>
                  </div>
                </Link>
                <br />

                {/* Discord Button */}
                <Link 
                  href="https://discord.gg/WsmZ6eupnk" 
                  className="block"
                >
                  <div className="bg-[#5865F2] hover:bg-[#4752C4] rounded-lg px-6 py-4 transition-colors duration-200 cursor-pointer">
                    <div className="text-white font-semibold text-xl">Join Discord Community</div>
                    <div className="text-white/80 text-sm mt-1">Discussions & voice channels</div>
                  </div>
                </Link>
              </div>

              <Text className="mt-6 text-[#e1e1e1] leading-relaxed">
                By joining our communities, you'll get:
                <br />• Instant updates and important announcements
                <br />• Direct connection with fellow members
                <br />• Access to exclusive discussions and events
                <br />• Quick help and support when needed
                <br />• Opportunities for networking and collaboration
              </Text>

              <Text className="mt-4 text-[#ff9966] font-medium">
                Note: Please make sure to join both platforms within 24 hours of receiving this email to stay connected with the community.
              </Text>
            </Section>

            {/* Login Credentials */}
            <Section className="mt-8 rounded-lg bg-[#252525] p-6 border border-[#333333]">
              <Heading className="text-xl font-semibold text-white">
                Your Login Credentials
              </Heading>
              <Text className="mt-4 font-mono text-[#e1e1e1]">
                Platform URL: <Link href="https://platform.opengeek.in" className="text-blue-400 hover:text-blue-300">https://platform.opengeek.in</Link> (beta)
                <br />
                Email: <span className="text-blue-400">{email}</span>
                <br />
                Password: <span className="text-blue-400">{password}</span>
              </Text>
            </Section>

            {/* Next Steps */}
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-white">
                Here's What's Next
              </Heading>
              <Text className="mt-4 text-[#e1e1e1] leading-relaxed">
                Our platform is currently under active development, and we're working hard to bring you an amazing experience. In the meantime:
              </Text>
              
              {/* Other Steps */}
              <div className="mt-4 rounded-lg bg-[#252525] p-6 border border-[#333333]">
                <Text className="text-[#e1e1e1] leading-relaxed">
                  1. Keep an eye on your email for platform launch updates
                  <br />
                  2. Get ready to explore projects and connect with fellow members
                </Text>
              </div>
            </Section>

            {/* Resources */}
            <Section className="mt-8 rounded-lg bg-[#252525] p-6 border border-[#333333]">
              <Heading className="text-xl font-semibold text-white">
                Helpful Resources
              </Heading>
              <Text className="mt-4 text-[#e1e1e1] leading-relaxed">
                • <Link href="https://opengeek.in/blog" className="text-blue-400 hover:text-blue-300">OpenGeek Blog</Link> - Stay updated with our latest articles
                <br />
                • <Link href="https://opengeek.in/events" className="text-blue-400 hover:text-blue-300">Events Calendar</Link> - Don't miss our upcoming events
                <br />
                • <Link href="https://opengeek.in/terms" className="text-blue-400 hover:text-blue-300">Community Guidelines</Link> - Learn about our values and practices
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="mx-0 my-8 w-full border border-[#333333]" />
            <Section>
              <Text className="text-sm text-[#a1a1a1]">
                If you have any questions or need assistance, feel free to reach out to our team at{' '}
                <Link href="mailto:support@opengeek.in" className="text-blue-400 hover:text-blue-300">
                  support@opengeek.in
                </Link>
              </Text>
              <Text className="text-sm text-[#a1a1a1]">
                Best regards,
                <br />
                The OpenGeek Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;