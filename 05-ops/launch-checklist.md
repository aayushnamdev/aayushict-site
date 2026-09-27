# Launch checklist

## First deploy
- [ ] `cd 04-site && npm run build` passes clean
- [ ] `vercel` (link project, first deploy goes to a preview `*.vercel.app` URL)
- [ ] Check the preview URL on phone width and desktop
- [ ] `vercel --prod` for the production deploy

## Connect the domain (aayushict.space)
- [ ] Buy the domain (any registrar — Vercel also sells domains directly if easier)
- [ ] In the Vercel project → Settings → Domains → add `aayushict.space` and `www.aayushict.space`
- [ ] Point DNS at the registrar to Vercel's nameservers or A/CNAME records (Vercel shows the
      exact records once you add the domain)
- [ ] Wait for DNS propagation, confirm HTTPS certificate issued automatically
- [ ] Set `www` → redirect to apex (or the reverse, pick one canonical version) in Vercel Domains

## Post-launch, same day
- [ ] Test `/go/fundednext` and `/go/mrkt` redirects on the live domain
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Post the launch link from @aayush_ict

## Recurring
- [ ] Re-verify affiliate codes and update "last verified" dates in `05-ops/affiliate-links.md`
      whenever a firm changes terms
