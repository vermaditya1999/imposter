import type { Category } from './game';

const files = import.meta.glob<Category>('../../dataset/en/*.json', { eager: true, import: 'default' });

// v1 Category order follows the id blocks (Indian Food = en-00xx, Sweets = en-01xx, …).
const firstId = (c: Category) => c.pairs.map((p) => p.id).sort()[0];
export const categories: Category[] = Object.values(files).sort((a, b) => firstId(a).localeCompare(firstId(b)));
