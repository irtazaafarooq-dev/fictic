import Image from 'next/image';
import Counter from './Counter';
import { TOOLS, RESOURCES, SOCIALS, STATS } from '@/lib/site';
import { TUTORIALS } from '@/lib/edits';

const k = (n: number) => `${Math.round(n / 1000)}K`;

export function Toolkit() {
  return (
    <section id="tools" aria-labelledby="tools-title" style={{ paddingTop: 0 }}>
      <div className="eyebrow"><span className="label"><b>03</b> — The kit</span><span className="label">What’s on the timeline</span></div>
      <div className="sec-head">
        <h2 id="tools-title" className="h-lg" data-reveal>Four tools.<br /><span className="gold">Zero filler.</span></h2>
        <p className="lead" style={{ maxWidth: 380 }} data-reveal>Desktop power and mobile speed. Every edit starts in one of these.</p>
      </div>
      <div className="tools">
        {TOOLS.map((t, i) => (
          <div className="tool" key={t.name} data-reveal data-delay={i * 0.08}>
            <span className="mono" aria-hidden="true">{t.mono}</span>
            <h3>{t.name}</h3>
            <p>{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Learn() {
  const [big, ...rest] = [...TUTORIALS].sort((a, b) => (a.id === 'M3ChJQE9eQE' ? -1 : b.id === 'M3ChJQE9eQE' ? 1 : 0));
  return (
    <section id="learn" aria-labelledby="learn-title" style={{ paddingTop: 0 }}>
      <div className="eyebrow"><span className="label"><b>04</b> — Learn from him</span><a className="label" href={SOCIALS.youtube} target="_blank" rel="noopener">YouTube ↗</a></div>
      <div className="sec-head">
        <h2 id="learn-title" className="h-lg" data-reveal>Steal the<br /><span className="gold">techniques.</span></h2>
        <p className="lead" style={{ maxWidth: 400 }} data-reveal>Free After Effects, CapCut and Topaz tutorials, plus a free editing pack he dropped to celebrate 90K.</p>
      </div>
      <div className="tuts">
        {[big, ...rest].map((t, i) => (
          <a key={t.id} className={`tut-card ${i === 0 ? 'big' : ''}`} href={`https://www.youtube.com/watch?v=${t.id}`} target="_blank" rel="noopener" data-reveal data-delay={(i % 4) * 0.06}>
            <div className="th">
              <Image src={`/tutorials/${t.id}.jpg`} alt={`Tutorial: ${t.title}`} width={960} height={540} sizes={i === 0 ? '50vw' : '25vw'} />
              <span>{i === 0 ? 'FREE PACK' : `${k(t.views)} views`}</span>
            </div>
            <h3>{t.title}</h3>
          </a>
        ))}
      </div>
      <div className="res">
        {RESOURCES.map((r) => (
          <a key={r.label} href={r.href} target="_blank" rel="noopener">
            <span><b>{r.label}</b><small>{r.note}</small></span><span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Promo() {
  const avg = STATS.views / STATS.edits; // millions per edit
  return (
    <section className="promo" id="promo" aria-labelledby="promo-title">
      <div className="eyebrow"><span className="label">05 — Paid promo</span><span className="label">Artists · brands · apps</span></div>
      <h2 id="promo-title" className="h-lg" data-reveal>Put it in front<br />of millions.</h2>
      <p className="lead" style={{ marginTop: 26 }} data-reveal>
        Every FicTic edit is built to be replayed. Your <strong>song, product or page</strong> rides along with it, in front of an audience that's there for exactly this.
      </p>
      <div className="offers">
        <div className="offer" data-reveal><span className="n">01</span><h3>Song promotion</h3><p>Your track as the soundtrack of a new edit. Sound is half of every viral edit.</p></div>
        <div className="offer" data-reveal data-delay="0.08"><span className="n">02</span><h3>Brand &amp; app shoutouts</h3><p>A placement or story feature across YouTube and Instagram.</p></div>
        <div className="offer" data-reveal data-delay="0.16"><span className="n">03</span><h3>Custom edits</h3><p>A FicTic-style edit made for your launch, trailer or campaign.</p></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 30, flexWrap: 'wrap' }}>
        <div className="promo-stats">
          <div className="stat"><Counter value={STATS.subs + STATS.instagram} suffix="K" /><span>Combined followers</span></div>
          <div className="stat"><Counter value={Math.round(avg * 10) / 10} decimals={1} suffix="M" /><span>Avg. views per Short</span></div>
          <div className="stat"><Counter value={STATS.over1m} /><span>Edits over 1M views</span></div>
        </div>
        <div className="ctas">
          <a className="btn dark" href={SOCIALS.dm} target="_blank" rel="noopener">DM on Instagram <span className="arr">→</span></a>
          <a className="btn" href={SOCIALS.youtube} target="_blank" rel="noopener">See the channel</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span className="label">That’s a wrap</span>
      <span className="big glitch" data-text="FICTIC">FICTIC</span>
      <div className="foot-grid">
        <div>
          <h4>Paid promo &amp; collabs</h4>
          <a className="btn gold" href={SOCIALS.dm} target="_blank" rel="noopener">DM @fictic_editz <span className="arr">→</span></a>
        </div>
        <div>
          <h4>Watch</h4>
          <ul>
            <li><a href={SOCIALS.youtube} target="_blank" rel="noopener">YouTube</a></li>
            <li><a href={SOCIALS.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a href={SOCIALS.threads} target="_blank" rel="noopener">Threads</a></li>
          </ul>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li><a href="#edits">Edits</a></li>
            <li><a href="#suite">Techniques</a></li>
            <li><a href="#learn">Learn</a></li>
            <li><a href="#promo">Paid promo</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-small"><span>© {new Date().getFullYear()} FicTic Editz</span><span>Love you 3001 ♥</span></div>
    </footer>
  );
}
