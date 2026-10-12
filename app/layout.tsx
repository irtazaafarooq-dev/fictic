import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SfxProvider } from '@/components/SfxProvider';
import SmoothScroll from '@/components/SmoothScroll';
import { BRAND, HIDE_FROM_SEARCH, SITE_URL, SOCIALS } from '@/lib/site';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const TITLE = 'FicTic Editz: Cinematic Video Editor | 849M+ Views';
const DESC = 'FicTic Editz (@fictic_editz) makes cinematic movie and celebrity edits in After Effects: 849M+ views on YouTube Shorts, 719K subscribers. Tutorials, editing pack and paid promo.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  applicationName: BRAND.name,
  alternates: { canonical: '/' },
  robots: HIDE_FROM_SEARCH
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  openGraph: { type: 'website', siteName: BRAND.name, url: '/', locale: 'en_US', title: TITLE, description: DESC },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

export const viewport: Viewport = { themeColor: '#0a0a0b', width: 'device-width', initialScale: 1 };

const jsonLd = [
  {
    '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#fictic`,
    name: BRAND.name, alternateName: ['FicTic', 'fictic_editz'], url: `${SITE_URL}/`, image: `${SITE_URL}/avatar.jpg`,
    jobTitle: 'Video editor', description: DESC,
    knowsAbout: ['Video editing', 'Adobe After Effects', 'CapCut', 'Alight Motion', 'Topaz Video AI', 'Short-form video'],
    sameAs: [SOCIALS.youtube, SOCIALS.instagram, SOCIALS.threads],
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BRAND.name, publisher: { '@id': `${SITE_URL}/#fictic` }, inLanguage: 'en' },
];

const boot = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('ft-intro'))document.documentElement.dataset.intro='done'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}.intro{display:none!important}`}</style></noscript>
      </head>
      <body>
        <SfxProvider>
          <SmoothScroll />
          {children}
        </SfxProvider>
      </body>
    </html>
  );
}
