'use client';

import { projects } from '../../data/projects';
import ComicGrid, { type ComicItem, type ComicAction } from '../comic/ComicGrid';

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
  };
}

export default function ProjectGrid() {
  return <ComicGrid items={projects.map(toItem)} />;
}
