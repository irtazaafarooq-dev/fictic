# FicTic Editz website

Portfolio for @fictic_editz. Next.js 15 (App Router, fully static), GSAP, Lenis.

    npm install
    npm run dev        # http://localhost:5519

- `lib/edits.ts`: top Shorts (id, views, title parts) and tutorials, pulled from the YouTube channel.
  Thumbnails live in `public/edits/<id>.jpg` and `public/tutorials/<id>.jpg`.
- `lib/site.ts`: stats, socials, tools and the six techniques shown in the editing-suite section.
- `lib/sfx.ts`: synthesized UI sound effects (whoosh, tick, impact). Off by default, toggled in the nav.
- `components/Suite.tsx`: the scroll-driven editing timeline. It uses CSS sticky (no GSAP pin),
  so there are no extra DOM wrappers to break React navigation.
- Videos play in a modal via youtube-nocookie embeds; no footage is hosted on the site.

SEO URL comes from `NEXT_PUBLIC_SITE_URL` (default https://fictic-one.vercel.app).
