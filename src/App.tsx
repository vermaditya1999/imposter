import { useEffect, useMemo, useState } from 'preact/hooks';
import { useRegisterSW } from 'virtual:pwa-register/preact';
import { createWakeLock, isIOS, isStandalone } from './device';
import { categories } from './game/dataset';
import { deal, defaultImposters, type Round } from './game/game';
import {
  bannerDismissed,
  loadHistory,
  loadSettings,
  noteRoundPlayed,
  saveHistory,
  saveSettings,
  setBannerDismissed,
  type Settings,
} from './game/storage';
import { Pass } from './screens/Pass';
import { Discuss, Reveal } from './screens/Round';
import { playerName, Setup } from './screens/Setup';
import { Btn, Icon, Sheet, Switch, Toast, type ToastMsg } from './ui/kit';

type Phase = { name: 'setup' } | { name: 'pass'; index: number } | { name: 'discuss' } | { name: 'reveal' };

const DEFAULTS: Settings = {
  players: ['', '', '', ''],
  imposterCount: defaultImposters(4),
  mode: 'undercover',
  categories: categories.map((c) => c.id),
  difficulties: ['easy', 'medium', 'hard'],
  tapToReveal: false,
};

const wakeLock = createWakeLock();
let toastId = 0;

export function App() {
  const [settings, setSettings] = useState(() => {
    const loaded = loadSettings(DEFAULTS);
    // Blank mode was replaced by Spy mode.
    const s: Settings = (loaded.mode as string) === 'blank' ? { ...loaded, mode: 'spy' } : loaded;
    // Difficulty is one tier or Mixed (all three).
    return s.difficulties.length === 1 ? s : { ...s, difficulties: DEFAULTS.difficulties };
  });
  const [history, setHistory] = useState(loadHistory);
  const [phase, setPhase] = useState<Phase>({ name: 'setup' });
  const [round, setRound] = useState<Round | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [sheet, setSheet] = useState<'help' | 'settings' | 'exit' | 'reset' | null>(null);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const [showBanner, setShowBanner] = useState(() => isIOS && !isStandalone && !bannerDismissed());

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const say = (text: string, extra: Partial<ToastMsg> = {}) => setToast({ id: ++toastId, text, ...extra });

  useEffect(() => saveSettings(settings), [settings]);
  useEffect(() => saveHistory(history), [history]);

  // Screen stays awake from Deal to the end-of-Round Reveal.
  useEffect(() => {
    if (phase.name === 'setup') wakeLock.off();
    else wakeLock.on();
  }, [phase.name]);

  // Offer an update only between rounds, never mid-round.
  useEffect(() => {
    if (needRefresh && phase.name === 'setup')
      say('A new version is ready.', { sticky: true, action: { label: 'Update', run: () => updateServiceWorker(true) } });
  }, [needRefresh, phase.name]);

  function startRound() {
    const players = settings.players.map((_, i) => playerName(settings.players, i));
    const result = deal({
      categories,
      selection: settings,
      history,
      players: players.length,
      imposterCount: settings.imposterCount,
      mode: settings.mode,
    });
    setNames(players);
    setRound(result.round);
    setHistory(result.history);
    if (result.reshuffled) {
      say("You've played every pair in this selection — reshuffling.");
      if (isIOS && !isStandalone) {
        setBannerDismissed(false);
        setShowBanner(true);
      }
    } else setToast(null);
    setPhase({ name: 'pass', index: 0 });
    scrollTo(0, 0);
  }

  function endRound() {
    setSheet(null);
    setPhase({ name: 'setup' });
  }

  const banner = showBanner ? (
    <div class="banner" role="note">
      <Icon name="share" size={20} />
      <p>
        <strong>Add to Home Screen</strong> so your played-words history isn't lost. Tap Share → Add to Home Screen.
      </p>
      <button
        type="button"
        class="banner-x"
        aria-label="Dismiss"
        onClick={() => {
          setBannerDismissed(true);
          setShowBanner(false);
        }}
      >
        <Icon name="x" size={16} />
      </button>
    </div>
  ) : null;

  const screenKey = phase.name === 'pass' ? `pass-${phase.index}` : phase.name;
  const played = useMemo(() => new Set(history).size, [history]);
  const totalPairs = useMemo(() => categories.reduce((n, c) => n + c.pairs.length, 0), []);

  return (
    <main class={`app phase-${phase.name}`}>
      <div class="screen" key={screenKey}>
        {phase.name === 'setup' && (
          <Setup
            settings={settings}
            onChange={setSettings}
            onDeal={startRound}
            onHelp={() => setSheet('help')}
            onSettings={() => setSheet('settings')}
            banner={banner}
          />
        )}
        {phase.name === 'pass' && round && (
          <Pass
            round={round}
            names={names}
            index={phase.index}
            tapToReveal={settings.tapToReveal}
            onExit={() => setSheet('exit')}
            onNext={() => {
              setPhase(phase.index + 1 < names.length ? { name: 'pass', index: phase.index + 1 } : { name: 'discuss' });
            }}
          />
        )}
        {phase.name === 'discuss' && round && (
          <Discuss round={round} names={names} onExit={() => setSheet('exit')} onReveal={() => setPhase({ name: 'reveal' })} />
        )}
        {phase.name === 'reveal' && round && (
          <Reveal
            round={round}
            names={names}
            onNextRound={() => {
              noteRoundPlayed();
              startRound();
            }}
            onSetup={() => {
              noteRoundPlayed();
              setPhase({ name: 'setup' });
            }}
          />
        )}
      </div>

      <Toast msg={toast} onDone={() => setToast(null)} />

      <Sheet open={sheet === 'exit'} onClose={() => setSheet(null)} title="End this round?">
        <p class="sheet-text">The words won't be shown again. You'll go back to setup.</p>
        <div class="sheet-actions">
          <Btn variant="white" onClick={() => setSheet(null)}>
            Keep playing
          </Btn>
          <Btn variant="ink" onClick={endRound}>
            End round
          </Btn>
        </div>
      </Sheet>

      <Sheet open={sheet === 'help'} onClose={() => setSheet(null)} title="How to play">
        <HowToPlay />
      </Sheet>

      <Sheet open={sheet === 'settings' || sheet === 'reset'} onClose={() => setSheet(null)} title="Settings">
        <Switch
          label="Tap to reveal"
          hint="Tap to show, tap to hide (auto-hides after 5 s) instead of press and hold."
          checked={settings.tapToReveal}
          onChange={(v) => setSettings({ ...settings, tapToReveal: v })}
        />
        <div class="setting-row">
          <span>
            <strong>Word pairs</strong>
            <small>
              {played} of {totalPairs} played on this phone. Played pairs won't repeat until you've seen them all.
            </small>
          </span>
          {sheet === 'reset' ? (
            <div class="confirm-inline">
              <Btn variant="white" onClick={() => setSheet('settings')}>
                Cancel
              </Btn>
              <Btn
                variant="ink"
                onClick={() => {
                  setHistory([]);
                  setSheet('settings');
                  say('Played words reset.');
                }}
              >
                Reset
              </Btn>
            </div>
          ) : (
            <Btn variant="white" icon="trash" disabled={played === 0} onClick={() => setSheet('reset')}>
              Reset
            </Btn>
          )}
        </div>
        <p class="fine version">Imposter v{__APP_VERSION__}</p>
      </Sheet>
    </main>
  );
}

function HowToPlay() {
  return (
    <div class="howto">
      <ol class="steps">
        <li>
          <span>1</span>
          <p>
            <strong>Pass the phone.</strong> Each player presses and holds the card to see their word in secret. Civilians all get the same
            word.
          </p>
        </li>
        <li>
          <span>2</span>
          <p>
            <strong>The imposter's word is a little different</strong> — and in Undercover mode, they don't know they're the imposter. In
            Spy mode they're told.
          </p>
        </li>
        <li>
          <span>3</span>
          <p>
            <strong>Give clues.</strong> Starting with the player the app picks, each person gives one clue about their word, without saying
            it. Go round as many times as you like.
          </p>
        </li>
        <li>
          <span>4</span>
          <p>
            <strong>Vote out loud</strong>, then tap Reveal. If the most-voted player is an imposter, civilians win. Otherwise the imposters
            win.
          </p>
        </li>
      </ol>
      {isIOS && !isStandalone && (
        <p class="banner static">
          <Icon name="share" size={20} />
          <span>
            <strong>On iPhone, Add to Home Screen</strong> (Share → Add to Home Screen) so your played-words history isn't lost.
          </span>
        </p>
      )}
    </div>
  );
}
