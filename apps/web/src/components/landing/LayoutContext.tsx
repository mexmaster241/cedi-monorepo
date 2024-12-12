'use client'

import { usePathname, useRouter } from 'next/navigation';
import { NavbarComponent } from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
    checkAuthAndRedirect();
  }, [pathname]);

  async function checkAuthAndRedirect() {
    try {
      const user = await getCurrentUser();
      
      if (user && (pathname === '/login' || pathname === '/sign-up')) {
        router.replace('/dashboard');
      }
    } catch (err) {
     
    }
  }

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