import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schemas follow 00-strategy/BUILD-PLAN.md section 3. A new post is one new file.

const macro = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/macro' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    kind: z.enum(['week-ahead', 'briefing', 'review']),
    date: z.coerce.date(),
    eventTimeIST: z.string().optional(),
    eventTimeET: z.string().optional(),
    badges: z.array(z.string()).default([]),
    route: z.array(z.string()).default([]),
    readMinutes: z.number(),
    relatedJournal: reference('journal').optional(),
    og: z.string().optional(), // own link preview image in /public, falls back to the shared card
    cover: image().optional(), // chart shown on the home page card
    draft: z.boolean().default(false), // true hides the post on the live site
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum([
      'macro-events',
      'ict-with-macro',
      'prop-firms',
      'payouts',
      'tools',
      'psychology',
    ]),
    updated: z.coerce.date(),
    readMinutes: z.number(),
    route: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Losing calls are never hidden: status 'invalidated' is a first class value.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(), // one line for search and link previews
    kind: z.enum(['call', 'trading-day', 'story']),
    date: z.coerce.date(),
    readMinutes: z.number().optional(), // worked out from the word count when left out
    draft: z.boolean().default(false),
    cover: image().optional(), // chart or photo shown on the home page card
    og: z.string().optional(), // own link preview image in /public, falls back to the shared card
    signOff: z.boolean().optional(), // false when the post ends with his own lines
    // Calls only
    asset: z.literal('NQ').optional(),
    direction: z.enum(['long', 'short']).optional(),
    target: z.string().optional(),
    invalidation: z.string().optional(),
    status: z.enum(['hit', 'invalidated', 'open', 'dropped']).optional(),
    // Trading days link to their review
    review: reference('macro').optional(),
  }),
});

export const collections = { macro, learn, journal };
