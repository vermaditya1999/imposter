// Pure game rules: see docs/wayfinder tickets 007 (rules), 009 (flow) and 010 (repeat avoidance).

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Mode = 'undercover' | 'blank';

export interface Pair {
  id: string;
  words: [string, string];
  difficulty: Difficulty;
  difference: string;
}

export interface Category {
  id: string;
  name: string;
  pairs: Pair[];
}

export interface Selection {
  categories: string[];
  difficulties: Difficulty[];
}

export interface Round {
  pairId: string;
  categoryId: string;
  categoryName: string;
  civilianWord: string;
  /** null in Blank mode: imposters get no word. */
  imposterWord: string | null;
  mode: Mode;
  /** Indexes into the player list. */
  imposters: number[];
  firstSpeaker: number;
}

export interface DealResult {
  round: Round;
  history: string[];
  /** True when the selection was exhausted and its history was cleared to deal this Round. */
  reshuffled: boolean;
}

export type Rng = () => number;

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 12;

/** Civilians always outnumber imposters. */
export function maxImposters(players: number): number {
  return Math.max(1, Math.floor((players - 1) / 2));
}

export function defaultImposters(players: number): number {
  const preferred = players <= 7 ? 1 : players <= 11 ? 2 : 3;
  return Math.min(preferred, maxImposters(players));
}

/** Every Pair matching the selection, played or not. */
export function selectedPairs(categories: Category[], selection: Selection): { pair: Pair; category: Category }[] {
  const cats = new Set(selection.categories);
  const diffs = new Set(selection.difficulties);
  return categories
    .filter((c) => cats.has(c.id))
    .flatMap((category) => category.pairs.filter((p) => diffs.has(p.difficulty)).map((pair) => ({ pair, category })));
}

/** The Deck: the selection minus the dealt history. */
export function deck(categories: Category[], selection: Selection, history: Iterable<string>) {
  const played = new Set(history);
  return selectedPairs(categories, selection).filter(({ pair }) => !played.has(pair.id));
}

function pick<T>(items: T[], rng: Rng): T {
  return items[Math.floor(rng() * items.length)];
}

function sample(count: number, size: number, rng: Rng): number[] {
  const pool = Array.from({ length: size }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}

export function deal(opts: {
  categories: Category[];
  selection: Selection;
  history: string[];
  players: number;
  imposterCount: number;
  mode: Mode;
  rng?: Rng;
}): DealResult {
  const rng = opts.rng ?? Math.random;
  const { players, mode } = opts;
  if (players < MIN_PLAYERS || players > MAX_PLAYERS) throw new Error(`Need ${MIN_PLAYERS}–${MAX_PLAYERS} players`);
  const imposterCount = Math.min(Math.max(1, opts.imposterCount), maxImposters(players));

  let history = opts.history;
  let reshuffled = false;
  let available = deck(opts.categories, opts.selection, history);
  if (available.length === 0) {
    const inSelection = new Set(selectedPairs(opts.categories, opts.selection).map(({ pair }) => pair.id));
    if (inSelection.size === 0) throw new Error('No Pairs match the selection');
    // Clear history for just this selection; other Categories keep theirs.
    history = history.filter((id) => !inSelection.has(id));
    available = deck(opts.categories, opts.selection, history);
    reshuffled = true;
  }

  const { pair, category } = pick(available, rng);
  const flip = rng() >= 0.5;
  const [civilianWord, otherWord] = flip ? [pair.words[1], pair.words[0]] : pair.words;
  const imposters = sample(imposterCount, players, rng);

  // In Blank mode an imposter never speaks first.
  const speakers = Array.from({ length: players }, (_, i) => i).filter(
    (i) => mode === 'undercover' || !imposters.includes(i),
  );

  return {
    round: {
      pairId: pair.id,
      categoryId: category.id,
      categoryName: category.name,
      civilianWord,
      imposterWord: mode === 'blank' ? null : otherWord,
      mode,
      imposters,
      firstSpeaker: pick(speakers, rng),
    },
    history: [...history, pair.id],
    reshuffled,
  };
}
