'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Sidebar />}
      <main className="flex-1 p- bg-white min-h-screen overflow-auto">
        {children}
      </main>
    </>
  );
}
