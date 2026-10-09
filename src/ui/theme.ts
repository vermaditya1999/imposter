import type { Shape } from './Mascot';

export const C = {
  yellow: '#FFD23F',
  orange: '#F9A03F',
  pink: '#FF7EB3',
  sky: '#7CC8F4',
  purple: '#7B5CE5',
  green: '#8ED68F',
  tomato: '#F46A45',
  lilac: '#BBA6FF',
  ink: '#17161B',
};

export interface CategoryLook {
  card: string;
  body: string;
  shape: Shape;
  /** Text colour that passes contrast on `card`. */
  on: string;
}

export const LOOKS: Record<string, CategoryLook> = {
  'indian-food': { card: C.orange, body: C.pink, shape: 'lens', on: C.ink },
  'sweets-desserts': { card: C.pink, body: C.yellow, shape: 'flower', on: C.ink },
  'world-food': { card: C.yellow, body: C.tomato, shape: 'bean', on: C.ink },
  animals: { card: C.green, body: C.yellow, shape: 'cat', on: C.ink },
  'places-around-town': { card: C.sky, body: C.purple, shape: 'house', on: C.ink },
  'travel-destinations': { card: C.lilac, body: C.sky, shape: 'lens', on: C.ink },
  jobs: { card: C.tomato, body: C.yellow, shape: 'blob', on: C.ink },
  'sports-games': { card: C.yellow, body: C.purple, shape: 'bean', on: C.ink },
  'movies-shows': { card: C.ink, body: C.yellow, shape: 'flower', on: '#fff' },
  characters: { card: C.sky, body: C.yellow, shape: 'cat', on: C.ink },
  'brands-apps': { card: C.pink, body: C.sky, shape: 'blob', on: C.ink },
  'around-the-house': { card: C.green, body: C.orange, shape: 'house', on: C.ink },
  'clothes-accessories': { card: C.lilac, body: C.pink, shape: 'lens', on: C.ink },
  gadgets: { card: C.orange, body: C.purple, shape: 'blob', on: C.ink },
};

export const lookFor = (categoryId: string): CategoryLook =>
  LOOKS[categoryId] ?? { card: C.yellow, body: C.pink, shape: 'blob', on: C.ink };

/** Player badge colours, cycled in entry order. */
export const PLAYER_COLORS = [C.yellow, C.pink, C.sky, C.green, C.orange, C.lilac];
