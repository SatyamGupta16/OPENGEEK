import { JSXElementConstructor, ReactElement } from 'react';

interface AcceptanceEmailProps {
  name: string;
  email: string;
  password: string;
  whatsappLink: string;
}

const containerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#0a0a0a',
  color: '#ffffff',
};

const headerStyle = {
  textAlign: 'center' as const,
  padding: '20px 0',
  borderBottom: '1px solid #333',
};

const logoStyle = {
  width: '150px',
  height: 'auto',
  marginBottom: '20px',
};

const sectionStyle = {
  backgroundColor: '#1a1a1a',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #333',
};

const headingStyle = {
  fontSize: '24px',
  color: '#10b981',
  marginBottom: '16px',
  fontWeight: 'bold',
};

const textStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#e5e5e5',
  margin: '12px 0',
};

const credentialsStyle = {
  backgroundColor: '#262626',
  padding: '16px',
  borderRadius: '8px',
  margin: '16px 0',
  fontFamily: 'monospace',
};

const buttonStyle = {
  display: 'inline-block',
  backgroundColor: '#10b981',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '16px 0',
};

const footerStyle = {
  textAlign: 'center' as const,
  padding: '20px 0',
  borderTop: '1px solid #333',
  color: '#666',
  fontSize: '14px',
};

export const AcceptanceEmail = ({
  name,
  email,
  password,
  whatsappLink,
}: AcceptanceEmailProps): ReactElement<any, string | JSXElementConstructor<any>> => (
  <div style={containerStyle}>
    <div style={headerStyle}>
      <img 
        src="https://opengeek.in/banner.png" 
        alt="OpenGeek Logo" 
        style={logoStyle}
      />
      <h1 style={{ ...headingStyle, fontSize: '32px' }}>
        Welcome to OpenGeek Community! 🎉
      </h1>
    </div>

    <div style={sectionStyle}>
      <p style={textStyle}>
        Dear <strong>{name}</strong>,
      </p>
      <p style={textStyle}>
        We are thrilled to inform you that your application to join the OpenGeek Community has been approved! 
        Your passion for technology and eagerness to learn has impressed us, and we're excited to welcome you 
        to our growing community of tech enthusiasts.
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>🔐 Your Login Credentials</h2>
      <div style={credentialsStyle}>
        <p style={{ ...textStyle, margin: '8px 0' }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ ...textStyle, margin: '8px 0' }}>
          <strong>Password:</strong> {password}
        </p>
      </div>
      
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>📱 Join Our Community</h2>
      <p style={textStyle}>
        Connect with fellow tech enthusiasts in our WhatsApp community group. Share knowledge, 
        discuss the latest in tech, and grow together.
      </p>
      <a href={whatsappLink} style={buttonStyle}>
        Join WhatsApp Group →
      </a>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>🚀 What's Next?</h2>
      <ul style={{ ...textStyle, paddingLeft: '20px' }}>
        <li>Complete your profile on the OpenGeek platform</li>
        <li>Join our upcoming events and workshops</li>
        <li>Connect with other members</li>
        <li>Start exploring our learning resources</li>
      </ul>
    </div>

    <div style={footerStyle}>
      <p style={{ margin: '8px 0' }}>
        Need help? Reply to this email or reach out to us on WhatsApp.
      </p>
      <p style={{ margin: '8px 0' }}>
        Best regards,<br />
        <strong>The OpenGeek Team</strong>
      </p>
      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <p>© 2024 OpenGeek Community. All rights reserved.</p>
        <p>This email was sent to {email}</p>
      </div>
    </div>
  </div>
); 