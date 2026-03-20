'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const StarsBackground = ({
  starColor,
  className,
}: {
  starColor?: string;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; r: number; dx: number; dy: number }[] = [];
    const numStars = 100;
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = starColor || (resolvedTheme === 'dark' ? '#FFF' : '#000');
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        
        star.x += star.dx;
        star.y += star.dy;
        
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;
      });
      requestAnimationFrame(draw);
    };
    
    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resolvedTheme, starColor]);

  return <canvas ref={canvasRef} className={cn('absolute inset-0 z-0 pointer-events-none opacity-50', className)} />;
};