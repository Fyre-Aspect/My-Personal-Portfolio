'use client';

import { projects } from '../../data/projects';
import ComicGrid, { type ComicItem, type ComicAction } from '../comic/ComicGrid';
import ProjectCarousel from './ProjectCarousel';
import { useIsMobile } from '../../hooks/useIsMobile';

function toItem(p: (typeof projects)[number]): ComicItem {
  const actions: ComicAction[] = [];
  if (p.liveUrl) actions.push({ key: 'E', label: p.demoLabel || 'Live Demo', href: p.liveUrl });
  if (p.githubUrl) actions.push({ key: 'Q', label: 'Code', href: p.githubUrl });
  if (p.videoUrl) actions.push({ key: 'X', label: 'Video', href: p.videoUrl });
  return {
    title: p.title,
    subtitle: p.role,
    badge: p.status ?? null,
    image: p.image,
    description: p.description,
    tags: p.technologies,
    actions,
    shape: p.size,
  };
}

export default function ProjectGrid() {
  // Phones get the swipeable one-card-at-a-time carousel — the comic grid's
  // hover-reveal panels don't exist on touch, so tiles there would open links
  // on first tap without ever showing the description.
  const isMobile = useIsMobile();
  if (isMobile) return <ProjectCarousel />;
  return <ComicGrid items={projects.map(toItem)} />;
}
