'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TECHNIQUES } from '@/lib/site';
import { EDITS } from '@/lib/edits';
import { sfx } from '@/lib/sfx';

const N = TECHNIQUES.length;
const FRAMES = [EDITS[3], EDITS[1], EDITS[11], EDITS[14], EDITS[5], EDITS[2]];
const KNOBS: Record<string, [string, number][]> = {
  twitch: [['Shake amp', 82], ['RGB split', 64], ['Frequency', 90]],
  microwave: [['Rotation', 100], ['Zoom', 76], ['Motion blur', 58]],
  bars: [['Letterbox', 26], ['Contrast', 70], ['Warmth', 48]],
  blob: [['Track points', 88], ['Line weight', 30], ['Desaturate', 100]],
  text: [['Extrude', 72], ['Perspective', 54], ['Shadow', 66]],
  topaz: [['Upscale', 100], ['Sharpen', 61], ['Denoise', 45]],
};
const WAVE = Array.from({ length: 120 }, (_, i) => Math.round(20 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 80));

/**
 * A scroll-driven editing suite: the section is tall, its inner panel sticks to the screen,
 * and scrolling drags the playhead across six of his signature effects.
 * Uses CSS sticky instead of a GSAP pin, so there are no extra DOM wrappers.
 */
export default function Suite() {
  const box = useRef<HTMLElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(50);
  const last = useRef(0);

  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = 0;
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      if (head.current) head.current.style.left = `${p * 100}%`;
      const i = Math.min(N - 1, Math.floor(p * N));
      if (i !== last.current) {
        last.current = i;
        setActive(i);
        sfx.whoosh(0.35);
      }
      const local = p * N - i;
      setSplit(Math.round(85 - local * 70));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  const t = TECHNIQUES[active];
  const frame = FRAMES[active];

  return (
    <section className="suite" id="suite" ref={box} aria-labelledby="suite-title">
      <div className="suite-sticky">
        <div className="suite-head">
          <div>
            <span className="label"><b>02</b> — In the suite · scroll to scrub</span>
            <h2 id="suite-title" className="h-lg" style={{ marginTop: 10 }}>Signature <span className="gold">techniques.</span></h2>
          </div>
          <span className="label">FX {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
        </div>

        <div className="suite-main">
          <div className={`monitor fx-${t.key}`} style={{ ['--split' as string]: `${split}%` }}>
            <div className="frame" key={t.key}>
              {t.key === 'topaz' ? (
                <>
                  <Image className="low" src={`/edits/${frame.id}.jpg`} alt="" fill sizes="60vw" />
                  <Image className="hi" src={`/edits/${frame.id}.jpg`} alt="" fill sizes="60vw" />
                  <span className="split" />
                </>
              ) : (
                <Image src={`/edits/${frame.id}.jpg`} alt={`${t.name} applied to a frame from the “${frame.hook}” edit`} fill sizes="60vw" style={{ objectPosition: '50% 30%' }} />
              )}
              {t.key === 'blob' && (
                <div className="boxes" aria-hidden="true">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M22 30 L58 48 L40 72 L76 26" stroke="#fff" strokeWidth=".3" fill="none" /></svg>
                  <i data-l="ID_01" style={{ left: '18%', top: '26%', width: '9%', height: '10%' }} />
                  <i data-l="ID_02" style={{ left: '54%', top: '44%', width: '8%', height: '9%', animationDelay: '-.8s' }} />
                  <i data-l="ID_03" style={{ left: '36%', top: '68%', width: '10%', height: '8%', animationDelay: '-1.4s' }} />
                  <i data-l="ID_04" style={{ left: '72%', top: '22%', width: '7%', height: '9%', animationDelay: '-.4s' }} />
                </div>
              )}
              {t.key === 'text' && <span className="t3d" aria-hidden="true">{frame.hook.toUpperCase()}</span>}
            </div>
            <div className="hud" aria-hidden="true"><span>● PROGRAM · “{frame.hook}” edit</span><span>{t.tc}</span></div>
          </div>

          <div className="inspector" aria-live="polite">
            <span className="fx-n">EFFECT {String(active + 1).padStart(2, '0')}</span>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
            <a className="tut" href={`https://www.youtube.com/watch?v=${t.tut}`} target="_blank" rel="noopener">Learn it: watch his tutorial ↗</a>
            <div className="knobs" aria-hidden="true">
              {KNOBS[t.key].map(([k, v]) => (
                <div className="knob" key={k}><span>{k}</span><span className="rail"><i style={{ width: `${v}%` }} /></span><span>{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="tracks" aria-hidden="true">
          <div className="lanes">
          <div className="ruler">{['00:00', '00:02', '00:04', '00:06', '00:08', '00:10'].map((r) => <span key={r}>{r}</span>)}</div>
          <div className="track" data-name="FX">
            {TECHNIQUES.map((x, i) => (
              <span key={x.key} className={`tclip ${i === active ? 'active' : ''}`} style={{ left: `${(i / N) * 100}%`, width: `calc(${100 / N}% - 4px)` }}>{x.name}</span>
            ))}
          </div>
          <div className="track" data-name="V1">
            {FRAMES.map((f, i) => (
              <span key={f.id} className="tclip v" style={{ left: `${(i / N) * 100}%`, width: `calc(${100 / N}% - 4px)` }}>{f.subject}</span>
            ))}
          </div>
          <div className="track" data-name="A1">
            <span className="tclip a" style={{ left: 0, width: '100%' }}>
              <span className="wavefm">{WAVE.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</span>
            </span>
          </div>
          <span className="playhead" ref={head} style={{ left: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
