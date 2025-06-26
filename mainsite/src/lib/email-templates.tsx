import { JSXElementConstructor, ReactElement } from 'react';

interface AcceptanceEmailProps {
  name: string;
  email: string;
  password: string;
  whatsappLink: string;
}

export const AcceptanceEmail = ({
  name,
  email,
  password,
  whatsappLink,
}: AcceptanceEmailProps): ReactElement<any, string | JSXElementConstructor<any>> => (
  <div>
    <h1>Welcome to OpenGeek Community! 🎉</h1>
    <p>Dear {name},</p>
    <p>
      We are excited to inform you that your application to join the OpenGeek Community has been approved! 
      We were impressed by your enthusiasm and look forward to having you as part of our community.
    </p>
    
    <h2>Your Login Credentials</h2>
    <p>Here are your credentials to access the OpenGeek platform:</p>
    <ul>
      <li>Email: {email}</li>
      <li>Password: {password}</li>
    </ul>
    
    <h2>Join Our WhatsApp Group</h2>
    <p>
      You can now join our WhatsApp community group where we share updates, discuss tech, and help each other grow.
      Click the link below to join:
    </p>
    <a href={whatsappLink} style={{ 
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#25D366',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      marginTop: '10px'
    }}>
      Join WhatsApp Group
    </a>
    
    <div style={{ marginTop: '20px' }}>
      <p>
        If you have any questions or need assistance, feel free to reach out to our team.
        We're here to help!
      </p>
      
      <p>Best regards,<br />The OpenGeek Team</p>
    </div>
  </div>
); 