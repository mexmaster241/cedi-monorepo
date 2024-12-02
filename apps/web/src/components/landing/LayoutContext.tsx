'use client'

import { usePathname } from 'next/navigation';
import { NavbarComponent } from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import { useEffect, useState } from 'react';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const isDashboard = pathname?.startsWith('/dashboard');
  const isLogin = pathname === '/login' || pathname === '/sign-up';

  if (isDashboard || isLogin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <NavbarComponent />
        {children}
        <Footer />
      </div>
    </>
  );
}