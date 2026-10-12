'use client';

import { useEffect, useRef } from 'react';

/** Camera-viewfinder corners plus a timecode that runs with the scroll position. */
export default function Viewfinder() {
  const tcRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = 0;
      const f = Math.floor(window.scrollY / 6);
      const ff = f % 24, s = Math.floor(f / 24) % 60, m = Math.floor(f / 1440) % 60;
      if (tcRef.current) tcRef.current.textContent = `TC 00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="vf" aria-hidden="true">
      <i /><i /><i /><i />
      <span className="tc" ref={tcRef}>TC 00:00:00:00</span>
      <span className="fps">4K · 24 FPS · ISO 800</span>
    </div>
  );
}
