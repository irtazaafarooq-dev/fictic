import { EDITS } from '@/lib/edits';

/** "Now playing": the songs behind his biggest edits. */
export default function Ticker() {
  const songs = [...new Set(EDITS.map((e) => e.song).filter(Boolean))].slice(0, 14);
  const row = songs.map((s) => (
    <span key={s}><i>♪</i><b>{s}</b> · slowed &amp; reverb</span>
  ));
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">{row}{row}</div>
    </div>
  );
}
