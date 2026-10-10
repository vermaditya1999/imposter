import { describe, expect, it } from 'vitest';
import { deal, deck, defaultImposters, maxImposters, type Category, type Selection } from './game';
import { categories as dataset } from './dataset';
import registry from '../../dataset/categories.json';

const cats: Category[] = [
  {
    id: 'food',
    name: 'Food',
    pairs: [
      { id: 'en-0001', words: ['Samosa', 'Kachori'], difficulty: 'medium', difference: '' },
      { id: 'en-0002', words: ['Idli', 'Dhokla'], difficulty: 'hard', difference: '' },
    ],
  },
  {
    id: 'animals',
    name: 'Animals',
    pairs: [{ id: 'en-0301', words: ['Frog', 'Toad'], difficulty: 'hard', difference: '' }],
  },
];
const all: Selection = { categories: ['food', 'animals'], difficulties: ['easy', 'medium', 'hard'] };

function seq(...values: number[]) {
  let i = 0;
  return () => values[i++ % values.length];
}

describe('imposter counts', () => {
  it('keeps civilians in the majority', () => {
    expect(maxImposters(3)).toBe(1);
    expect(maxImposters(4)).toBe(1);
    expect(maxImposters(5)).toBe(2);
    expect(maxImposters(12)).toBe(5);
  });
  it('defaults to 1 / 2 / 3 by group size', () => {
    expect(defaultImposters(3)).toBe(1);
    expect(defaultImposters(7)).toBe(1);
    expect(defaultImposters(8)).toBe(2);
    expect(defaultImposters(11)).toBe(2);
    expect(defaultImposters(12)).toBe(3);
  });
});

describe('deck', () => {
  it('is the selection minus history', () => {
    const ids = deck(cats, all, ['en-0001']).map(({ pair }) => pair.id);
    expect(ids).toEqual(['en-0002', 'en-0301']);
  });
  it('filters by category and difficulty', () => {
    const ids = deck(cats, { categories: ['food'], difficulties: ['hard'] }, []).map(({ pair }) => pair.id);
    expect(ids).toEqual(['en-0002']);
  });
});

describe('deal', () => {
  const base = { categories: cats, selection: all, history: [] as string[], players: 5, imposterCount: 2, mode: 'undercover' as const };

  it('deals an unplayed pair and records it in history', () => {
    const { round, history, reshuffled } = deal({ ...base, history: ['en-0001', 'en-0002'], rng: seq(0) });
    expect(round.pairId).toBe('en-0301');
    expect(history).toEqual(['en-0001', 'en-0002', 'en-0301']);
    expect(reshuffled).toBe(false);
  });

  it('flips a coin for the civilian word', () => {
    const a = deal({ ...base, rng: seq(0, 0.1) }).round;
    const b = deal({ ...base, rng: seq(0, 0.9) }).round;
    expect([a.civilianWord, a.imposterWord]).toEqual(['Samosa', 'Kachori']);
    expect([b.civilianWord, b.imposterWord]).toEqual(['Kachori', 'Samosa']);
  });

  it('chooses the requested number of distinct imposters', () => {
    for (let i = 0; i < 50; i++) {
      const { round } = deal({ ...base });
      expect(new Set(round.imposters).size).toBe(2);
      round.imposters.forEach((p) => expect(p).toBeGreaterThanOrEqual(0));
      round.imposters.forEach((p) => expect(p).toBeLessThan(5));
    }
  });

  it('clamps the imposter count to the maximum', () => {
    expect(deal({ ...base, players: 4, imposterCount: 3 }).round.imposters).toHaveLength(1);
  });

  it('gives spy-mode imposters the other word of the Pair', () => {
    for (let i = 0; i < 100; i++) {
      const { round } = deal({ ...base, mode: 'spy' });
      expect(round.imposterWord).not.toBe(round.civilianWord);
      expect(round.imposterWord).toBeTruthy();
    }
  });

  it('reshuffles only the exhausted selection', () => {
    const { round, history, reshuffled } = deal({
      ...base,
      selection: { categories: ['food'], difficulties: ['easy', 'medium', 'hard'] },
      history: ['en-0001', 'en-0002', 'en-0301'],
    });
    expect(reshuffled).toBe(true);
    expect(history).toContain('en-0301');
    expect(history).toHaveLength(2);
    expect(round.categoryId).toBe('food');
  });

  it('throws when nothing matches', () => {
    expect(() => deal({ ...base, selection: { categories: [], difficulties: ['easy'] } })).toThrow();
  });
});

describe('bundled dataset', () => {
  it('loads every registered category in id-block order', () => {
    expect(dataset.map((c) => c.id)).toEqual(registry.order);
    expect(dataset.reduce((n, c) => n + c.pairs.length, 0)).toBeGreaterThanOrEqual(400);
  });
});
