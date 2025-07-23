'use client';

import { usePathname } from 'next/navigation';
import { ClientLayout } from './ClientLayout';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  if (isAuthPage) {
    return children;
  }

  return <ClientLayout>{children}</ClientLayout>;
} 