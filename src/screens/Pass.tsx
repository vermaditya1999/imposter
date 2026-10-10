import { useEffect, useRef, useState } from 'preact/hooks';
import { buzz } from '../device';
import type { Round } from '../game/game';
import { Mascot, Sparkle } from '../ui/Mascot';
import { Btn, Icon, IconBtn } from '../ui/kit';
import { C, lookFor } from '../ui/theme';

const AUTO_HIDE_MS = 5000;

function wordSize(word: string) {
  const longest = Math.max(...word.split(' ').map((w) => w.length));
  if (longest > 11 || word.length > 18) return 'sm';
  if (longest > 8 || word.length > 12) return 'md';
  return 'lg';
}

/**
 * The word exists in the DOM only while revealed: hold to peek (default),
 * or tap to show / tap to hide with a 5 s auto-hide (accessibility setting).
 */
function PeekCard({
  round,
  isImposter,
  tapToReveal,
  onPeek,
}: {
  round: Round;
  isImposter: boolean;
  tapToReveal: boolean;
  onPeek: () => void;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number>();
  const look = lookFor(round.categoryId);

  const show = () => {
    if (!open) buzz(30);
    setOpen(true);
    onPeek();
    if (tapToReveal) {
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOpen(false), AUTO_HIDE_MS);
    }
  };
  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  // Hide the instant the app is backgrounded or loses focus.
  useEffect(() => {
    const onHidden = () => document.visibilityState === 'hidden' && hide();
    document.addEventListener('visibilitychange', onHidden);
    addEventListener('blur', hide);
    addEventListener('pagehide', hide);
    return () => {
      document.removeEventListener('visibilitychange', onHidden);
      removeEventListener('blur', hide);
      removeEventListener('pagehide', hide);
      clearTimeout(timer.current);
    };
  }, []);

  const spy = isImposter && round.mode === 'spy';
  const word = isImposter ? round.imposterWord : round.civilianWord;

  const holdHandlers = tapToReveal
    ? { onClick: () => (open ? hide() : show()) }
    : {
        onPointerDown: (e: PointerEvent) => {
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
          show();
        },
        onPointerUp: hide,
        onPointerCancel: hide,
        onLostPointerCapture: hide,
        onKeyDown: (e: KeyboardEvent) => {
          if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
            e.preventDefault();
            show();
          }
        },
        onKeyUp: (e: KeyboardEvent) => (e.key === ' ' || e.key === 'Enter') && hide(),
        onBlur: hide,
      };

  return (
    <div
      class={`peek ${open ? 'is-open' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={tapToReveal ? 'Tap to show your word' : 'Press and hold to see your word'}
      style={{ '--card': look.card, '--on': look.on } as Record<string, string>}
      onContextMenu={(e) => e.preventDefault()}
      {...holdHandlers}
    >
      <div class="peek-pattern" aria-hidden="true" />
      <Sparkle class="twinkle peek-s1" size={22} color="#fff" />
      <Sparkle class="twinkle peek-s2" size={14} color="#fff" />

      {open ? (
        <div class="peek-reveal" aria-live="assertive">
          <Mascot shape={spy ? 'ghost' : look.shape} color={spy ? C.purple : look.body} mood={spy ? 'sneaky' : 'shocked'} size={128} class="peek-mascot" />
          {spy ? (
            <div class="word-bubble imposter">
              <small>You're the imposter</small>
              <strong class={`word ${wordSize(word)}`}>{word}</strong>
              <span class="word-hint">The others have a word close to this. Blend in.</span>
            </div>
          ) : (
            <div class="word-bubble">
              <small>Your word</small>
              <strong class={`word ${wordSize(word)}`}>{word}</strong>
            </div>
          )}
        </div>
      ) : (
        <div class="peek-cover">
          <Mascot shape={look.shape} color={look.body} mood="peek" hands size={190} class="peek-mascot idle" />
          <span class="peek-cta">
            <Icon name="hand" size={20} />
            {tapToReveal ? 'Tap to peek' : 'Press & hold to peek'}
          </span>
        </div>
      )}
    </div>
  );
}

export function Pass({
  round,
  names,
  index,
  tapToReveal,
  onNext,
  onExit,
}: {
  round: Round;
  names: string[];
  index: number;
  tapToReveal: boolean;
  onNext: () => void;
  onExit: () => void;
}) {
  const [peeked, setPeeked] = useState(false);
  const last = index === names.length - 1;

  return (
    <div class="pass">
      <header class="topbar">
        <IconBtn name="x" label="End round" onClick={onExit} />
        <div class="progress" aria-label={`Player ${index + 1} of ${names.length}`}>
          {names.map((_, i) => (
            <span key={i} class={i < index ? 'done' : i === index ? 'now' : ''} />
          ))}
        </div>
        <span class="cat-pill" style={{ background: lookFor(round.categoryId).card, color: lookFor(round.categoryId).on }}>
          {round.categoryName}
        </span>
      </header>

      <div class="pass-who">
        <p class="eyebrow">
          Player {index + 1} of {names.length}
        </p>
        <h1 class="display name">{names[index]}</h1>
        <p class="fine">Only {names[index]} should look.</p>
      </div>

      <PeekCard
        key={index}
        round={round}
        isImposter={round.imposters.includes(index)}
        tapToReveal={tapToReveal}
        onPeek={() => setPeeked(true)}
      />

      <div class="pass-foot">
        <Btn variant={peeked ? 'ink' : 'ink'} icon="arrow" disabled={!peeked} onClick={onNext} class={`btn-xl ${peeked ? 'ready' : ''}`}>
          {last ? "Everyone's seen it — start" : `Done — pass to ${names[index + 1]}`}
        </Btn>
        <p class="fine center" aria-live="polite">
          {peeked ? 'Remember it, then pass the phone.' : 'Peek at least once to continue.'}
        </p>
      </div>
    </div>
  );
}
