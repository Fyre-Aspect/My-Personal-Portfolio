'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Folder,
  Frame,
  Home,
  Mail,
  User,
  Medal,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeProvider';

const NAV_ITEMS = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Projects', url: '/projects', icon: Frame },
  { title: 'Achievements', url: '/achievements', icon: Medal },
  { title: 'Activities', url: '/activities', icon: Activity },
  { title: 'Contact', url: '/contact', icon: Mail },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-background border rounded-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen w-64 border-r bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
              <img src="/Aamir Pic.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold tracking-tight text-foreground">Aamir Tinwala</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
            <User size={16} /> Portfolio 2.0
          </div>
          {/* We'll need a ThemeToggle component if they don't have one, or just hardcode it */}
        </div>
      </aside>
    </>
  );
};