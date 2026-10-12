'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Counter from './Counter';
import { EDITS } from '@/lib/edits';
import { STATS, SOCIALS } from '@/lib/site';
import { sfx } from '@/lib/sfx';

const COLS = 5;

export default function Hero() {
  const [twitch, setTwitch] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // the title "twitch shakes" every few seconds, like his edits on the beat
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setTwitch(true);
      timer.current = setTimeout(() => setTwitch(false), 340);
    }, 3200);
    return () => { clearInterval(id); if (timer.current) clearTimeout(timer.current); };
  }, []);

  const cols = Array.from({ length: COLS }, (_, c) => EDITS.filter((_, i) => i % COLS === c));

  return (
    <section className="hero" id="top">
      <div className="wall" aria-hidden="true">
        {cols.map((col, c) => (
          <div className="col" key={c}>
            {[...col, ...col].map((e, i) => (
              <Image key={`${e.id}-${i}`} src={`/edits/${e.id}.jpg`} alt="" width={405} height={540} sizes="20vw" loading={i < 3 ? 'eager' : 'lazy'} />
            ))}
          </div>
        ))}
      </div>

      <div className="hero-tag">
        <span className="label rec">Now editing</span>
        <span className="label"><b>@fictic_editz</b> · YouTube · Instagram</span>
      </div>
      <h1>
        <span className="sr-only">FicTic Editz, cinematic video editor: </span>
        <span className={`glitch ${twitch ? 'twitch' : ''}`} data-text="FICTIC" onMouseEnter={() => sfx.whoosh(0.3)}>FICTIC</span>
      </h1>
      <p className="lead" style={{ marginTop: 40 }}>
        Cinematic edits with <strong>849 million views</strong> on YouTube Shorts alone. Movie scenes, icons and athletes cut to the beat, with the techniques people try to copy.
      </p>

      <div className="hero-foot">
        <div className="stats">
          <div className="stat gold"><Counter value={STATS.views} suffix="M+" /><span>Views on Shorts</span></div>
          <div className="stat"><Counter value={STATS.subs} suffix="K" /><span>YouTube subs</span></div>
          <div className="stat"><Counter value={STATS.instagram} suffix="K" /><span>Instagram</span></div>
          <div className="stat"><Counter value={STATS.edits} /><span>Edits published</span></div>
        </div>
        <div className="ctas">
          <a className="btn gold" href="#edits" onClick={() => sfx.whoosh()}>Watch the edits <span className="arr">→</span></a>
          <a className="btn" href={SOCIALS.dm} target="_blank" rel="noopener">Paid promo</a>
        </div>
      </div>
    </section>
  );
}
