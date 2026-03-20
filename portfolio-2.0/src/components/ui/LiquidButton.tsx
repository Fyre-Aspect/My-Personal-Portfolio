'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    
    const baseStyles = 'relative inline-flex items-center justify-center overflow-hidden font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-xs rounded-md',
      md: 'h-10 px-4 py-2 rounded-md',
      lg: 'h-11 px-8 rounded-md text-lg',
      icon: 'h-10 w-10 rounded-md',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
      <>
        {/* Simple ripple overlay effect using framer-motion */}
        <motion.div
          className="absolute inset-0 z-0 bg-white/20 dark:bg-black/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: '50%' }}
        />
        <span className="relative z-10">{children}</span>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';