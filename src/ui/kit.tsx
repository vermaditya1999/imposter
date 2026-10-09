import type { ComponentChildren, JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

const PATHS = {
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  help: 'M9.2 9.2a2.9 2.9 0 1 1 4.3 2.5c-.9.5-1.5 1.1-1.5 2.1v.4M12 17.6v.1',
  sliders: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5',
  home: 'M4 11l8-7 8 7M6.5 9.5V20h11V9.5',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  share: 'M12 15V4M8 8l4-4 4 4M6 12v7h12v-7',
  trash: 'M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13',
  hand: 'M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V5a1.5 1.5 0 0 1 3 0v6M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L4 15.5a1.6 1.6 0 0 1 2.4-2L8 15',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 22, stroke = 2.4 }: { name: IconName; size?: number; stroke?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

type BtnProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'ink' | 'teal' | 'white' | 'ghost';
  icon?: IconName;
  disabled?: boolean;
  type?: 'button' | 'submit';
};

export function Btn({ variant = 'ink', icon, children, class: cls = '', type = 'button', ...rest }: BtnProps) {
  return (
    <button type={type} class={`btn btn-${variant} ${cls}`} {...rest}>
      <span class="btn-label">{children}</span>
      {icon && (
        <span class="btn-icon">
          <Icon name={icon} size={20} />
        </span>
      )}
    </button>
  );
}

export function IconBtn({ name, label, onClick, class: cls = '' }: { name: IconName; label: string; onClick: () => void; class?: string }) {
  return (
    <button type="button" class={`icon-btn ${cls}`} aria-label={label} title={label} onClick={onClick}>
      <Icon name={name} />
    </button>
  );
}

/** Bottom sheet that animates out before unmounting. */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ComponentChildren }) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Drag down to dismiss: from the grip or header, or from the content when it's scrolled to the top.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const el = panel.current;
    if (!open || !el) return;
    const backdrop = el.previousElementSibling as HTMLElement;
    let startY = 0;
    let dy = 0;
    let lastY = 0;
    let lastT = 0;
    let velocity = 0;
    let armed = false;
    let dragging = false;

    const place = (y: number) => {
      el.style.transform = y ? `translateY(${y}px)` : '';
      backdrop.style.opacity = y ? String(Math.max(0, 1 - y / el.offsetHeight)) : '';
    };
    const begin = (y: number, target: EventTarget | null) => {
      startY = lastY = y;
      lastT = performance.now();
      dy = velocity = 0;
      dragging = false;
      armed = el.scrollTop <= 0 || !!(target as Element | null)?.closest?.('.sheet-grip, .sheet-head');
      el.style.transition = backdrop.style.transition = 'none';
    };
    const move = (y: number, e: Event) => {
      if (!armed) return;
      const d = y - startY;
      if (!dragging) {
        if (d < -4) armed = false; // scrolling up: let the content scroll
        if (d <= 6) return;
        dragging = true;
      }
      if (e.cancelable) e.preventDefault();
      const now = performance.now();
      velocity = (y - lastY) / Math.max(1, now - lastT);
      lastY = y;
      lastT = now;
      dy = Math.max(0, d);
      place(dy);
    };
    const end = () => {
      if (!armed) return;
      armed = false;
      if (!dragging) return;
      dragging = false;
      if (dy > el.offsetHeight * 0.25 || velocity > 0.5) {
        el.style.transition = backdrop.style.transition = '';
        closeRef.current();
      } else {
        el.style.transition = 'transform 0.28s var(--sheet-ease)';
        backdrop.style.transition = 'opacity 0.28s';
        place(0);
      }
    };

    const onTouchStart = (e: TouchEvent) => begin(e.touches[0].clientY, e.target);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientY, e);
    const onPointerMove = (e: PointerEvent) => move(e.clientY, e);
    const onPointerUp = () => {
      end();
      removeEventListener('pointermove', onPointerMove);
      removeEventListener('pointerup', onPointerUp);
    };
    const onPointerDown = (e: PointerEvent) => {
      // Mouse only (touch is handled above), and only from the grip or header.
      if (e.pointerType !== 'mouse' || !(e.target as Element).closest('.sheet-grip, .sheet-head') || (e.target as Element).closest('button'))
        return;
      begin(e.clientY, e.target);
      addEventListener('pointermove', onPointerMove);
      addEventListener('pointerup', onPointerUp);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', end);
    el.addEventListener('touchcancel', end);
    el.addEventListener('pointerdown', onPointerDown);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', end);
      el.removeEventListener('touchcancel', end);
      el.removeEventListener('pointerdown', onPointerDown);
      onPointerUp();
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open, mounted]);

  if (!mounted) return null;
  return (
    <div class={`sheet-root ${closing ? 'is-closing' : ''}`}>
      <div class="sheet-backdrop" onClick={onClose} />
      <div class="sheet" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={panel}>
        <div class="sheet-grip" />
        <div class="sheet-head">
          <h2>{title}</h2>
          <IconBtn name="x" label="Close" onClick={onClose} />
        </div>
        <div class="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export interface ToastMsg {
  id: number;
  text: string;
  action?: { label: string; run: () => void };
  sticky?: boolean;
}

export function Toast({ msg, onDone }: { msg: ToastMsg | null; onDone: () => void }) {
  useEffect(() => {
    if (!msg || msg.sticky) return;
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [msg?.id]);
  if (!msg) return null;
  return (
    <div class="toast" role="status" key={msg.id}>
      <span>{msg.text}</span>
      {msg.action && (
        <button type="button" class="toast-action" onClick={msg.action.run}>
          {msg.action.label}
        </button>
      )}
    </div>
  );
}

export function Switch({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label class="switch-row">
      <span>
        <strong>{label}</strong>
        {hint && <small>{hint}</small>}
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.currentTarget.checked)} />
      <span class="switch" aria-hidden="true" />
    </label>
  );
}
