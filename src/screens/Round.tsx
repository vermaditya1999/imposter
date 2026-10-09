import { useState } from 'preact/hooks';
import type { Round } from '../game/game';
import { Mascot, Sparkle } from '../ui/Mascot';
import { Btn, IconBtn } from '../ui/kit';
import { C, lookFor } from '../ui/theme';

export function Discuss({ round, names, onReveal, onExit }: { round: Round; names: string[]; onReveal: () => void; onExit: () => void }) {
  const look = lookFor(round.categoryId);
  return (
    <div class="discuss">
      <header class="topbar">
        <IconBtn name="x" label="End round" onClick={onExit} />
        <span class="cat-pill" style={{ background: look.card, color: look.on }}>
          {round.categoryName}
        </span>
      </header>

      <h1 class="display">
        Time to
        <br />
        talk it out
      </h1>

      <div class="speaker-card" style={{ '--card': look.card, '--on': look.on } as Record<string, string>}>
        <div class="peek-pattern" aria-hidden="true" />
        <Sparkle class="twinkle peek-s1" size={20} color="#fff" />
        <Mascot shape={look.shape} color={look.body} mood="happy" size={120} class="bob" />
        <div class="speaker-bubble">
          <small>First clue</small>
          <strong>{names[round.firstSpeaker]}</strong>
        </div>
        <p class="speaker-then">then go round in order</p>
      </div>

      <ol class="steps">
        <li>
          <span>1</span>One clue each about your word — don't say it.
        </li>
        <li>
          <span>2</span>Go round as many times as you like.
        </li>
        <li>
          <span>3</span>Vote out loud. Most votes is out.
        </li>
      </ol>

      <div class="pass-foot">
        <Btn variant="ink" icon="arrow" class="btn-xl" onClick={onReveal}>
          Votes are in — reveal
        </Btn>
      </div>
    </div>
  );
}

export function Reveal({
  round,
  names,
  onNextRound,
  onSetup,
}: {
  round: Round;
  names: string[];
  onNextRound: () => void;
  onSetup: () => void;
}) {
  const [step, setStep] = useState(0);
  const many = round.imposters.length > 1;
  const blank = round.mode === 'blank';
  const look = lookFor(round.categoryId);

  return (
    <div class={`reveal step-${step}`}>
      <div class="spotlight" aria-hidden="true" />

      {step === 0 && (
        <button type="button" class="reveal-tap" onClick={() => setStep(1)}>
          <Mascot shape="ghost" color={C.purple} mood="peek" hands size={150} class="bob" />
          <h1 class="display light">
            Who was the
            <br />
            {many ? 'imposters?' : 'imposter?'}
          </h1>
          <span class="tap-hint">Tap to find out</span>
        </button>
      )}

      {step === 1 && (
        <button type="button" class="reveal-tap" onClick={() => setStep(2)}>
          <div class="reveal-stage">
            <Sparkle class="burst b1" size={26} color={C.yellow} />
            <Sparkle class="burst b2" size={16} color={C.pink} />
            <Sparkle class="burst b3" size={20} color={C.sky} />
            <Mascot shape="ghost" color={C.sky} mood="sneaky" size={150} class="pop" />
          </div>
          <p class="eyebrow light">{many ? 'The imposters were' : 'The imposter was'}</p>
          <div class="names">
            {round.imposters.map((i, n) => (
              <span class="name-tag" style={{ animationDelay: `${180 + n * 120}ms` }} key={i}>
                {names[i]}
              </span>
            ))}
          </div>
          <span class="tap-hint">Tap to see the words</span>
        </button>
      )}

      {step === 2 && (
        <div class="reveal-words">
          <p class="eyebrow light">{round.categoryName}</p>
          <div class="word-row">
            <div class="word-card civ">
              <small>Civilians had</small>
              <strong>{round.civilianWord}</strong>
              <Mascot shape={look.shape} color={look.body} mood="happy" size={64} class="card-mascot" />
            </div>
            <div class={`word-card imp ${blank ? 'blank' : ''}`}>
              <small>{many ? 'Imposters had' : 'Imposter had'}</small>
              <strong>{blank ? 'Nothing' : round.imposterWord}</strong>
              <Mascot shape="ghost" color={blank ? C.purple : C.sky} mood="sneaky" size={64} class="card-mascot" />
            </div>
          </div>
          {blank && <p class="last-guess">Caught? The imposter gets one Last Guess at the civilians' word. Right = imposters win.</p>}
          <div class="reveal-actions">
            <Btn variant="teal" icon="refresh" class="btn-xl" onClick={onNextRound}>
              Next round
            </Btn>
            <Btn variant="ghost" icon="home" class="btn-xl" onClick={onSetup}>
              Change setup
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}
