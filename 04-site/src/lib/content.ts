import { getCollection, type CollectionEntry } from 'astro:content';

type Name = 'macro' | 'learn' | 'journal';

// Every page asks for posts here, never from getCollection directly.
// A post with `draft: true` is hidden on the live site and visible in `npm run dev`.
export async function published<N extends Name>(name: N): Promise<CollectionEntry<N>[]> {
  return getCollection(name, (entry) => import.meta.env.DEV || !entry.data.draft);
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Whole minutes at 200 words a minute, never less than 1.
export const minutesToRead = (body: string | undefined) =>
  Math.max(1, Math.round((body ?? '').split(/\s+/).filter(Boolean).length / 200));
