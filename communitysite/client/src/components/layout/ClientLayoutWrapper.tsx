'use client';

import { usePathname } from 'next/navigation';
import { ClientLayout } from './ClientLayout';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return children;
  }

  return <ClientLayout>{children}</ClientLayout>;
} 