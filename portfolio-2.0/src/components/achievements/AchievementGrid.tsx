'use client';

import type { AchievementItem } from '../../data/achievements';
import ComicGrid, { type ComicItem } from '../comic/ComicGrid';

function toItem(a: AchievementItem): ComicItem {
  return {
    title: a.title,
    subtitle: a.date,
    badge: a.growthAspect,
    image: a.image ?? null,
    description: a.description,
    tags: [a.growthAspect, a.date],
    actions: a.link ? [{ key: 'E', label: a.linkLabel || 'View', href: a.link }] : [],
  };
}

export default function AchievementGrid({ items }: { items: AchievementItem[] }) {
  return <ComicGrid items={items.map(toItem)} />;
}
