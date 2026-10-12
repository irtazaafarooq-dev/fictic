'use client';

import { useEffect, useRef, useState } from 'react';

const FPS = 24;
const tc = (f: number) => {
  const ff = f % FPS, s = Math.floor(f / FPS) % 60, m = Math.floor(f / (FPS * 60)) % 60;
  return `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
};

/** "Rendering" intro: a render-queue progress bar and running timecode, then a microwave-zoom exit. */
export default function Intro() {
  const [out, setOut] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const code = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'done') return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DUR = reduce ? 200 : 1500;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / DUR);
      const e = 1 - Math.pow(1 - p, 3);
      if (bar.current) bar.current.style.transform = `scaleX(${e})`;
      if (code.current) code.current.textContent = tc(Math.round(e * 63));
      if (pct.current) pct.current.textContent = `${Math.round(e * 100)}%`;
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setOut(true);
        try { sessionStorage.setItem('ft-intro', '1'); } catch {}
        setTimeout(() => {
          document.documentElement.dataset.intro = 'done';
          window.__lenis?.start();
          window.dispatchEvent(new Event('ft:entered'));
        }, 900);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`intro ${out ? 'out' : ''}`} aria-hidden="true">
      <div className="intro-top">
        <span className="label rec">REC</span>
        <span className="label">FicTic Editz · 24 fps</span>
      </div>
      <div className="intro-mid">
        <div className="word">FICTIC</div>
        <div className="intro-tc" ref={code}>00:00:00:00</div>
      </div>
      <div className="intro-bottom">
        <div className="render">
          <div className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Rendering FICTIC_FINAL_v27.mp4</span><span ref={pct}>0%</span>
          </div>
          <div className="bar"><i ref={bar} style={{ transform: 'scaleX(0)' }} /></div>
        </div>
        <span className="label" style={{ alignSelf: 'flex-end' }}>H.264 · 4K</span>
      </div>
    </div>
  );
}
