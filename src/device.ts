// Thin wrappers over the browser APIs the reveal flow leans on (ticket 024).

export const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Android only: iPhone has no Vibration API. */
export function buzz(ms: number) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}

/** Keeps the screen awake while active; re-acquires after the page is shown again. */
export function createWakeLock() {
  let sentinel: WakeLockSentinel | null = null;
  let wanted = false;

  async function acquire() {
    if (!wanted || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
    try {
      sentinel = await navigator.wakeLock.request('screen');
    } catch {
      /* unsupported here (e.g. iOS < 18.4 on the home screen): carry on silently */
    }
  }
  const onVisible = () => {
    if (document.visibilityState === 'visible') acquire();
  };

  return {
    on() {
      if (wanted) return;
      wanted = true;
      document.addEventListener('visibilitychange', onVisible);
      acquire();
    },
    off() {
      wanted = false;
      document.removeEventListener('visibilitychange', onVisible);
      sentinel?.release().catch(() => {});
      sentinel = null;
    },
  };
}
