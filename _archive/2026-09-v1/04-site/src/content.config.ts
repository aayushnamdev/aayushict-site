import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schemas follow build-plan-v2.md §9 (Content model). Keep frontmatter shapes in sync with
// the templates in 03-content/templates/.

const macro = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/macro' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.enum(['preview', 'post-release', 'review']),
    event: z.string(),
    series: z.string().optional(),
    releaseAt: z.coerce.date(),
    updated: z.coerce.date(),
    assets: z.array(z.enum(['gold', 'nq', 'dxy'])),
    route: z.array(z.string()),
    numbers: z.array(
      z.object({
        label: z.string(),
        expected: z.string().nullable(),
        previous: z.string().nullable(),
        actual: z.string().nullable(),
      })
    ),
    pricedIn: z
      .object({
        label: z.string(),
        path: z.array(z.number()),
      })
      .optional(),
    scenarios: z.array(
      z.object({
        condition: z.string(),
        meaning: z.string(),
        gold: z.enum(['up', 'down', 'flat']),
        nq: z.enum(['up', 'down', 'flat']),
        dxy: z.enum(['up', 'down', 'flat']),
      })
    ),
    call: z.string().nullable().default(null),
    learn: z.string().optional(),
    reel: z.string().optional(),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    updated: z.coerce.date(),
    readTime: z.number(),
    order: z.number().default(1),
    route: z.array(z.string()).optional(),
    anchorBriefing: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal' }),
  schema: z.object({
    kind: z.enum(['call', 'day']),
    date: z.coerce.date(),
    asset: z.string().optional(),
    direction: z.enum(['up', 'down']).optional(),
    target: z.number().optional(),
    invalidation: z.string().optional(),
    status: z.enum(['hit', 'invalidated', 'open', 'dropped']).default('open'),
    briefing: z.string().optional(),
    title: z.string().optional(),
  }),
});

export const collections = { macro, learn, journal };
