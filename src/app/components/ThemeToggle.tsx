'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { LuSun, LuMoon, LuMonitor } from 'react-icons/lu';

type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';
const STORE_EVENT = 'pesto:theme-change';

function readTheme(): Theme {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return 'system';
}

function subscribe(callback: () => void) {
  // 'storage' covers cross-tab changes; our custom event covers same-tab.
  window.addEventListener('storage', callback);
  window.addEventListener(STORE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORE_EVENT, callback);
  };
}

function getServerSnapshot(): Theme {
  return 'system';
}

function writeTheme(theme: Theme) {
  try {
    if (theme === 'system') {
      window.localStorage.removeItem(STORAGE_KEY);
      document.documentElement.removeAttribute('data-theme');
    } else {
      window.localStorage.setItem(STORAGE_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(STORE_EVENT));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  const cycle = useCallback(() => {
    const next: Theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    writeTheme(next);
  }, [theme]);

  const Icon = theme === 'light' ? LuSun : theme === 'dark' ? LuMoon : LuMonitor;
  const label = `Theme: ${theme}. Click to switch.`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-border shadow-md text-foreground transition-transform duration-200 hover:-translate-y-0.5"
    >
      <Icon className="text-lg" aria-hidden="true" />
    </button>
  );
}
