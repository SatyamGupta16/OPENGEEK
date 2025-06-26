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
  username: string;
  password: string;
}

export const WelcomeEmail = ({
  name,
  username,
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
                Welcome to OpenGeek Community! 🎉
              </Heading>
              <Text className="text-lg text-white mt-5 font-medium">
                Hello <span className="text-blue-400">{name}</span>,
              </Text>
              <Text className="mt-3 text-[#e1e1e1] leading-relaxed">
                We're thrilled to have you join our community of passionate developers, innovators, and tech enthusiasts. Your application has been approved, and we're excited to begin this journey together.
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
                Username: <span className="text-blue-400">{username}</span>
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
              
              {/* WhatsApp Box */}
              <div className="mt-4 rounded-lg bg-[#252525] p-6 border border-[#333333]">
                

                <Link 
                  href="https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7" 
                  className="block"
                >
                  <div className="bg-[#25D366] hover:bg-[#128C7E] rounded-lg p-4 flex items-center justify-center gap-3 transition-colors duration-200 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-white font-semibold text-center text-lg">Join our WhatsApp community group</span>
                  </div>
                </Link>

                <Text className="mt-4 text-[#e1e1e1] leading-relaxed">
                  This group is our primary communication channel where you'll get:
                  <br />• Early access to platform updates
                  <br />• Community announcements
                  <br />• Direct interaction with the team
                </Text>
              </div>

              {/* Other Steps */}
              <div className="mt-4 rounded-lg bg-[#252525] p-6 border border-[#333333]">
                <Text className="text-[#e1e1e1] leading-relaxed">
                  Additional steps:
                  <br />
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
                • <Link href="https://opengeek.in/community" className="text-blue-400 hover:text-blue-300">Community Guidelines</Link> - Learn about our values and practices
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