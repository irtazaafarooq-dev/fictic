export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://fictic-one.vercel.app').replace(/\/$/, '');

// Pitch site: keep it out of Google until the creator approves it. Set to false to go public.
export const HIDE_FROM_SEARCH = true;

export const BRAND = { name: 'FicTic Editz', handle: '@fictic_editz' };

export const SOCIALS = {
  youtube: 'https://www.youtube.com/@fictic_editz',
  instagram: 'https://www.instagram.com/fictic_editz',
  threads: 'https://www.threads.com/@fictic_editz',
  dm: 'https://ig.me/m/fictic_editz',
};

// Instagram story highlights from his bio
export const RESOURCES = [
  { label: 'Editing Pack', note: 'Presets, overlays & SFX', href: 'https://www.instagram.com/stories/highlights/18074281861782903/' },
  { label: 'CCs', note: 'His colour corrections', href: 'https://www.instagram.com/stories/highlights/18083761069651063/' },
  { label: 'Tutorials', note: 'Step-by-step breakdowns', href: 'https://www.instagram.com/stories/highlights/18052623448792166/' },
  { label: 'Discord', note: 'Join the community', href: 'https://www.instagram.com/stories/highlights/17887570218267124/' },
];

export const STATS = {
  views: 849, // millions, YouTube Shorts total
  subs: 719, // thousands
  instagram: 241, // thousands
  edits: 523,
  over1m: 258,
  over10m: 10,
};

export const TOOLS = [
  { mono: 'Ae', name: 'After Effects', role: 'The main weapon: tracking, 3D, transitions' },
  { mono: 'Cc', name: 'CapCut', role: 'Fast cuts and smooth zooms on the go' },
  { mono: 'Am', name: 'Alight Motion', role: 'Mobile motion graphics' },
  { mono: 'Tz', name: 'Topaz', role: 'Upscaling for that 4K-sharp finish' },
];

/** Signature techniques, each one he has a tutorial for. */
export const TECHNIQUES = [
  { key: 'twitch', name: 'Twitch shake', tc: '00:00:01:12', tut: 'hDrw2ufKsi0', desc: 'A violent, beat-synced shake with RGB split that snaps your eyes to the cut.' },
  { key: 'microwave', name: 'Microwave zoom', tc: '00:00:03:04', tut: 'cjFWhjcywOg', desc: 'A spinning zoom-through that whips one shot into the next.' },
  { key: 'bars', name: 'Black bars CC', tc: '00:00:04:20', tut: 'ZJaU_e8MVgc', desc: 'Letterbox bars and a cinematic grade that make any clip look like a film.' },
  { key: 'blob', name: 'Blob tracking', tc: '00:00:06:08', tut: 'xE1wIB-v4XU', desc: 'Tracked boxes and lines that lock onto movement, straight out of a thriller.' },
  { key: 'text', name: '3D text', tc: '00:00:07:16', tut: 'MFJGL6aL8oA', desc: 'Titles that live inside the scene instead of floating on top of it.' },
  { key: 'topaz', name: 'Topaz 4K', tc: '00:00:09:02', tut: '5r43QGsQxww', desc: 'Upscaled and sharpened until every frame looks shot yesterday.' },
] as const;

export type TechniqueKey = (typeof TECHNIQUES)[number]['key'];
