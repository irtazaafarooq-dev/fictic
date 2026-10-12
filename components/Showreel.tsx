'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { EDITS, type Edit } from '@/lib/edits';
import { SOCIALS } from '@/lib/site';
import { sfx } from '@/lib/sfx';

const fmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M` : `${Math.round(n / 1e3)}K`);

export default function Showreel() {
  const [open, setOpen] = useState<Edit | null>(null);
  const top = EDITS.slice(0, 13);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); window.__lenis?.start(); };
  }, [open]);

  const play = (e: Edit) => { sfx.impact(); setOpen(e); };

  return (
    <section id="edits" aria-labelledby="edits-title">
      <div className="eyebrow"><span className="label"><b>01</b> — The cut</span><a className="label" href={SOCIALS.youtube} target="_blank" rel="noopener">All 523 edits ↗</a></div>
      <div className="sec-head">
        <h2 id="edits-title" className="h-lg" data-reveal>The biggest<br /><span className="gold">hits.</span></h2>
        <p className="lead" style={{ maxWidth: 400 }} data-reveal>
          <strong>258 edits</strong> passed a million views. Ten passed ten million. Tap any one to watch it here.
        </p>
      </div>
      <div className="reel">
        {top.map((e, i) => (
          <button key={e.id} className={`clip ${i === 0 ? 'feature' : ''}`} onClick={() => play(e)} onMouseEnter={() => sfx.tick()} aria-label={`Play: ${e.hook}, ${e.subject} edit, ${fmt(e.views)} views`} data-reveal data-delay={(i % 4) * 0.06}>
            <Image src={`/edits/${e.id}.jpg`} alt={`${e.subject} edit by FicTic Editz`} width={810} height={1080} sizes={i === 0 ? '(max-width: 1000px) 100vw, 50vw' : '(max-width: 1000px) 50vw, 25vw'} />
            <span className="rank">#{String(i + 1).padStart(2, '0')}</span>
            <span className="views">{fmt(e.views)} views</span>
            <span className="play" aria-hidden="true">▶</span>
            <span className="meta">
              <h3>{e.hook}</h3>
              <p>{e.subject}{e.song ? ` · ♪ ${e.song}` : ''}</p>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div className="player" role="dialog" aria-modal="true" aria-label={`${open.hook} edit`} onClick={() => setOpen(null)}>
          <button className="player-close" onClick={() => setOpen(null)} aria-label="Close video">×</button>
          <div className="player-inner" onClick={(ev) => ev.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${open.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
              title={`${open.hook}: ${open.subject} edit`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <span className="player-cap">{open.hook} · {fmt(open.views)} views · Esc to close</span>
        </div>
      )}
    </section>
  );
}
