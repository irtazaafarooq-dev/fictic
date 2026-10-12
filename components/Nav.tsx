'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSfx } from './SfxProvider';
import { sfx } from '@/lib/sfx';
import { SOCIALS } from '@/lib/site';

const LINKS = [
  { href: '#edits', label: 'Edits' },
  { href: '#suite', label: 'Techniques' },
  { href: '#learn', label: 'Learn' },
  { href: '#promo', label: 'Paid promo' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { on, toggle } = useSfx();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="FicTic Editz home">
        <Image src="/avatar.jpg" alt="FicTic Editz" width={40} height={40} priority />
        <span>FICTIC <small>EDITZ</small></span>
      </a>
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((l, i) => (
          <a key={l.href} href={l.href} data-n={`0${i + 1}`} onMouseEnter={() => sfx.tick(2200)} onClick={() => sfx.whoosh()}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-right">
        <button className={`sfx-btn ${on ? 'on' : ''}`} onClick={toggle} aria-pressed={on} aria-label={on ? 'Turn sound effects off' : 'Turn sound effects on'}>
          <span className="wave" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>{on ? 'SFX on' : 'SFX off'}</span>
        </button>
        <a className="btn gold" href={SOCIALS.dm} target="_blank" rel="noopener" style={{ height: 40, padding: '0 18px', fontSize: 14 }}>DM for promo <span className="arr">→</span></a>
      </div>
    </header>
  );
}
