'use client'

import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { LayoutContent } from '@/components/landing/LayoutContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}