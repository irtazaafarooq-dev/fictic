'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { sfx } from '@/lib/sfx';

type Ctx = { on: boolean; toggle: () => void };
const SfxCtx = createContext<Ctx>({ on: false, toggle: () => {} });
const KEY = 'ft-sfx';

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  // a remembered "on" waits for the first click (browsers need a gesture before audio)
  useEffect(() => {
    let wanted = false;
    try { wanted = localStorage.getItem(KEY) === 'on'; } catch {}
    if (!wanted) return;
    const arm = async () => { await sfx.init(); sfx.on = true; setOn(true); };
    window.addEventListener('pointerdown', arm, { once: true });
    return () => window.removeEventListener('pointerdown', arm);
  }, []);

  const toggle = useCallback(async () => {
    const next = !sfx.on;
    if (next) await sfx.init();
    sfx.on = next;
    setOn(next);
    try { localStorage.setItem(KEY, next ? 'on' : 'off'); } catch {}
    if (next) sfx.impact();
  }, []);

  const value = useMemo(() => ({ on, toggle: () => void toggle() }), [on, toggle]);
  return <SfxCtx.Provider value={value}>{children}</SfxCtx.Provider>;
}

export const useSfx = () => useContext(SfxCtx);
