import { useRef, useState } from 'preact/hooks';
import { categories } from '../game/dataset';
import { defaultImposters, maxImposters, MAX_PLAYERS, MIN_PLAYERS, type Difficulty } from '../game/game';
import type { Settings } from '../game/storage';
import { Mascot, Sparkle, type Mood } from '../ui/Mascot';
import { Btn, Icon, IconBtn } from '../ui/kit';
import { C, lookFor, PLAYER_COLORS } from '../ui/theme';

const ALL_LEVELS: Difficulty[] = ['easy', 'medium', 'hard'];

// One choice: a single tier, or Mixed (all tiers). Examples are real Pairs from the Dataset.
const LEVELS: { id: Difficulty | 'mixed'; label: string; hint: string; example?: [string, string]; bars: number }[] = [
  { id: 'mixed', label: 'Mixed', hint: 'A bit of everything', bars: 0 },
  { id: 'easy', label: 'Easy', hint: 'Words are clearly different', example: ['Pizza', 'Burger'], bars: 1 },
  { id: 'medium', label: 'Medium', hint: 'Similar, with a clear difference', example: ['Lion', 'Tiger'], bars: 2 },
  { id: 'hard', label: 'Hard', hint: 'Nearly the same thing', example: ['Frog', 'Toad'], bars: 3 },
];

const STEPS: { label: string; title: [string, string]; color: string; mood: Mood }[] = [
  { label: 'Players', title: ["Who's", 'playing?'], color: C.yellow, mood: 'happy' },
  { label: 'Rules', title: ['How', 'sneaky?'], color: C.purple, mood: 'sneaky' },
  { label: 'Words', title: ['Pick the', 'words'], color: C.sky, mood: 'shocked' },
];

export const playerName = (names: string[], i: number) => names[i]?.trim() || `Player ${i + 1}`;

export function Setup({
  settings,
  onChange,
  onDeal,
  onHelp,
  onSettings,
  banner,
}: {
  settings: Settings;
  onChange: (s: Settings | ((prev: Settings) => Settings)) => void;
  onDeal: () => void;
  onHelp: () => void;
  onSettings: () => void;
  banner?: preact.ComponentChildren;
}) {
  const { players, imposterCount, mode } = settings;
  const listRef = useRef<HTMLOListElement>(null);
  const [rollDir, setRollDir] = useState<'up' | 'down'>('up');
  const [justAdded, setJustAdded] = useState(-1);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'next' | 'back'>('next');
  const body = useRef<HTMLDivElement>(null);

  function go(to: number) {
    setDir(to > step ? 'next' : 'back');
    setStep(to);
    (document.activeElement as HTMLElement | null)?.blur();
    body.current?.scrollTo(0, 0);
  }

  const max = maxImposters(players.length);

  function setPlayers(next: string[]) {
    // Follow the size-based default unless the group picked its own count.
    const wasDefault = imposterCount === defaultImposters(players.length);
    const count = wasDefault ? defaultImposters(next.length) : Math.min(imposterCount, maxImposters(next.length));
    onChange({ ...settings, players: next, imposterCount: count });
  }

  function addPlayer() {
    if (players.length >= MAX_PLAYERS) return;
    setJustAdded(players.length);
    setPlayers([...players, '']);
    requestAnimationFrame(() => listRef.current?.querySelector<HTMLInputElement>('li:last-child input')?.focus());
  }

  function toggle<T extends string>(list: T[], item: T): T[] {
    return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
  }

  const allCats = settings.categories.length === categories.length;
  const level = settings.difficulties.length === 1 ? settings.difficulties[0] : 'mixed';
  const blocked = settings.categories.length === 0;

  return (
    <div class="setup">
      <header class="topbar">
        <div class="progress" role="list" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((_, i) => (
            <button
              type="button"
              role="listitem"
              key={i}
              class={i < step ? 'done' : i === step ? 'now' : ''}
              aria-label={`Step ${i + 1}: ${STEPS[i].label}`}
              disabled={i >= step}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div class="topbar-actions">
          <IconBtn name="help" label="How to play" onClick={onHelp} />
          <IconBtn name="sliders" label="Settings" onClick={onSettings} />
        </div>
      </header>

      <div class="setup-body" ref={body}>
        <div class={`step slide-${dir}`} key={step}>
          <section class="hero">
            <div>
              <p class="eyebrow">
                Step {step + 1} of {STEPS.length}
              </p>
              <h1 class="display">
                {STEPS[step].title[0]}
                <br />
                <span class="hero-accent">{STEPS[step].title[1]}</span>
              </h1>
            </div>
            <div class="hero-mascot">
              <Mascot shape="ghost" color={STEPS[step].color} mood={STEPS[step].mood} size={96} class="bob" />
              <Sparkle class="twinkle s1" size={18} color={C.pink} />
              <Sparkle class="twinkle s2" size={12} color={C.purple} />
            </div>
          </section>

          {step === 0 && banner}

          {step === 0 && (
            <section class="panel">
              <div class="panel-head">
                <h2>Players</h2>
                <span class="count-chip">{players.length}</span>
              </div>
              <ol class="players" ref={listRef}>
                {players.map((name, i) => (
                  <li key={i} class={i === justAdded ? 'enter' : ''}>
                    <span class="badge" style={{ background: PLAYER_COLORS[i % PLAYER_COLORS.length] }}>
                      {i + 1}
                    </span>
                    <input
                      value={name}
                      placeholder={`Player ${i + 1}`}
                      maxLength={16}
                      autocomplete="off"
                      autocapitalize="words"
                      enterkeyhint={i === players.length - 1 ? 'done' : 'next'}
                      aria-label={`Player ${i + 1} name`}
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        onChange((prev) => ({ ...prev, players: prev.players.map((p, j) => (j === i ? value : p)) }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter') return;
                        const inputs = listRef.current?.querySelectorAll('input');
                        if (inputs && i < inputs.length - 1) inputs[i + 1].focus();
                        else e.currentTarget.blur();
                      }}
                    />
                    <button
                      type="button"
                      class="remove"
                      aria-label={`Remove ${playerName(players, i)}`}
                      disabled={players.length <= MIN_PLAYERS}
                      onClick={() => setPlayers(players.filter((_, j) => j !== i))}
                    >
                      <Icon name="x" size={18} />
                    </button>
                  </li>
                ))}
              </ol>
              {players.length < MAX_PLAYERS ? (
                <button type="button" class="add-player" onClick={addPlayer}>
                  <Icon name="plus" size={18} /> Add player
                </button>
              ) : (
                <p class="fine">That's the max — 12 players.</p>
              )}
            </section>
          )}

          {step === 1 && (
            <>
              <section class="panel panel-row">
                <div>
                  <h2>Imposters</h2>
                  <p class="fine">
                    Up to {max} for {players.length} players
                  </p>
                </div>
                <div class="stepper" role="group" aria-label="Number of imposters">
                  <button
                    type="button"
                    aria-label="Fewer imposters"
                    disabled={imposterCount <= 1}
                    onClick={() => {
                      setRollDir('down');
                      onChange({ ...settings, imposterCount: imposterCount - 1 });
                    }}
                  >
                    <Icon name="minus" size={18} />
                  </button>
                  <span class="stepper-value" aria-live="polite">
                    <span key={imposterCount} class={`roll-${rollDir}`}>
                      {imposterCount}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label="More imposters"
                    disabled={imposterCount >= max}
                    onClick={() => {
                      setRollDir('up');
                      onChange({ ...settings, imposterCount: imposterCount + 1 });
                    }}
                  >
                    <Icon name="plus" size={18} />
                  </button>
                </div>
              </section>

              <section class="panel">
                <h2>Mode</h2>
                <div class={`segmented ${mode === 'spy' ? 'right' : ''}`} role="radiogroup" aria-label="Mode">
                  <span class="segmented-thumb" aria-hidden="true" />
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'undercover'}
                    onClick={() => onChange({ ...settings, mode: 'undercover' })}
                  >
                    Undercover
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'spy'}
                    onClick={() => onChange({ ...settings, mode: 'spy' })}
                  >
                    Spy
                  </button>
                </div>
                <p class="fine mode-hint" key={mode}>
                  {mode === 'undercover'
                    ? "Imposters get a similar word — and don't know they're the imposter."
                    : "Imposters get a similar word — and know they're the imposter."}
                </p>
              </section>

              <section class="panel">
                <h2>Difficulty</h2>
                <div class="levels" role="radiogroup" aria-label="Difficulty">
                  {LEVELS.map((l) => (
                    <button
                      type="button"
                      role="radio"
                      key={l.id}
                      aria-checked={level === l.id}
                      class={`level level-${l.id}`}
                      onClick={() => onChange({ ...settings, difficulties: l.id === 'mixed' ? ALL_LEVELS : [l.id] })}
                    >
                      <span class={`bars bars-${l.bars}`} aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span class="level-text">
                        <strong>{l.label}</strong>
                        <small>{l.hint}</small>
                      </span>
                      {l.example && (
                        <span class="level-example" aria-label={`For example ${l.example[0]} and ${l.example[1]}`}>
                          {l.example[0]}
                          <em>vs</em>
                          {l.example[1]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {step === 2 && (
            <>
              <section class="panel">
                <div class="panel-head">
                  <h2>Categories</h2>
                  <button
                    type="button"
                    class="text-btn"
                    onClick={() => onChange({ ...settings, categories: allCats ? [] : categories.map((c) => c.id) })}
                  >
                    {allCats ? 'Clear' : 'Select all'}
                  </button>
                </div>
                <div class="cat-grid">
                  {categories.map((c) => {
                    const on = settings.categories.includes(c.id);
                    const look = lookFor(c.id);
                    return (
                      <button
                        type="button"
                        key={c.id}
                        class={`cat ${on ? 'on' : ''}`}
                        aria-pressed={on}
                        style={{ '--card': look.card, '--on': look.on } as Record<string, string>}
                        onClick={() => onChange({ ...settings, categories: toggle(settings.categories, c.id) })}
                      >
                        <span class="cat-face">
                          <Mascot shape={look.shape} color={look.body} mood={on ? 'happy' : 'calm'} size={40} />
                        </span>
                        <span class="cat-name">{c.name}</span>
                        <span class="cat-check" aria-hidden="true">
                          <Icon name="check" size={14} stroke={3.2} />
                        </span>
                      </button>
                    );
                  })}
                </div>
                {blocked && <p class="fine warn">Pick at least one category to play.</p>}
              </section>
            </>
          )}
        </div>
      </div>

      <div class="dock">
        <div class="dock-row">
          <span class={`back-slot ${step > 0 ? 'show' : ''}`}>
            <button type="button" class="back-btn" aria-label="Back" tabIndex={step > 0 ? 0 : -1} onClick={() => go(step - 1)}>
              <Icon name="back" size={22} />
            </button>
          </span>
          {step < STEPS.length - 1 ? (
            <Btn variant="ink" icon="arrow" onClick={() => go(step + 1)} class="btn-xl">
              Next
            </Btn>
          ) : (
            <Btn variant="ink" icon="arrow" disabled={blocked} onClick={onDeal} class="btn-xl">
              Deal words
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}
