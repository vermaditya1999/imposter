import type { Difficulty, Mode } from './game';

export interface Settings {
  players: string[];
  imposterCount: number;
  mode: Mode;
  categories: string[];
  difficulties: Difficulty[];
  /** Accessibility fallback: tap to show / tap to hide instead of hold to peek. */
  tapToReveal: boolean;
}

const SETTINGS = 'imposter.settings.v1';
const HISTORY = 'imposter.history.v1';
const BANNER = 'imposter.a2hs-dismissed';
const PLAYED = 'imposter.rounds-played';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: play on without saving */
  }
}

export function loadSettings(defaults: Settings): Settings {
  return read(SETTINGS, defaults);
}
export const saveSettings = (s: Settings) => write(SETTINGS, s);

export function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}
export const saveHistory = (ids: string[]) => write(HISTORY, ids);

const DAY = 86_400_000;
export function bannerDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(BANNER));
    return at > 0 && Date.now() - at < 30 * DAY;
  } catch {
    return false;
  }
}
export function setBannerDismissed(dismissed: boolean) {
  try {
    if (dismissed) localStorage.setItem(BANNER, String(Date.now()));
    else localStorage.removeItem(BANNER);
  } catch {
    /* ignore */
  }
}

/** Ask for persistent storage once, after the first completed Round. */
export function noteRoundPlayed() {
  try {
    const n = Number(localStorage.getItem(PLAYED)) || 0;
    localStorage.setItem(PLAYED, String(n + 1));
    if (n === 0) navigator.storage?.persist?.();
  } catch {
    /* ignore */
  }
}
