// Flat, big-eyed characters in the spirit of the reference art. Pure SVG, themed per Category.

export type Shape = 'cat' | 'house' | 'lens' | 'bean' | 'flower' | 'blob' | 'ghost';
export type Mood = 'happy' | 'worried' | 'shocked' | 'sneaky' | 'peek' | 'calm';

const BODIES: Record<Shape, string> = {
  cat: 'M38 70 L52 28 Q55 20 62 26 L86 52 L114 52 L138 26 Q145 20 148 28 L162 70 Q170 96 166 130 Q160 172 100 174 Q40 172 34 130 Q30 96 38 70 Z',
  house: 'M34 92 Q34 80 44 72 L92 32 Q100 26 108 32 L132 52 L132 34 Q132 28 138 28 L150 28 Q156 28 156 34 L156 72 Q166 80 166 92 L166 152 Q166 172 146 172 L54 172 Q34 172 34 152 Z',
  lens: 'M18 104 Q60 40 100 40 Q140 40 182 104 Q140 168 100 168 Q60 168 18 104 Z',
  bean: 'M44 64 Q60 26 108 30 Q160 34 166 84 Q172 130 150 156 Q124 182 82 172 Q38 162 32 118 Q28 88 44 64 Z',
  flower:
    'M100 26 Q120 26 126 42 Q142 34 154 46 Q166 58 158 74 Q174 80 174 100 Q174 120 158 126 Q166 142 154 154 Q142 166 126 158 Q120 174 100 174 Q80 174 74 158 Q58 166 46 154 Q34 142 42 126 Q26 120 26 100 Q26 80 42 74 Q34 58 46 46 Q58 34 74 42 Q80 26 100 26 Z',
  blob: 'M40 58 Q40 30 68 30 L132 30 Q160 30 160 58 L162 142 Q162 172 132 172 L68 172 Q38 172 38 142 Z',
  ghost: 'M36 100 Q36 30 100 30 Q164 30 164 100 L164 168 Q152 178 140 166 Q128 154 116 168 Q104 180 92 168 Q80 156 68 168 Q56 178 44 168 L36 160 Z',
};

// Where the face sits on each body (centre x/y).
const FACE: Record<Shape, [number, number]> = {
  cat: [100, 110],
  house: [100, 120],
  lens: [100, 108],
  bean: [100, 106],
  flower: [100, 104],
  blob: [100, 104],
  ghost: [100, 100],
};

function Eye({ x, y, mood, side }: { x: number; y: number; mood: Mood; side: -1 | 1 }) {
  if (mood === 'peek') {
    // Squeezed shut: ^ ^
    return <path d={`M${x - 11} ${y + 3} Q${x} ${y - 9} ${x + 11} ${y + 3}`} class="m-line" stroke-width="6" />;
  }
  const lid = mood === 'sneaky';
  const ry = mood === 'shocked' ? 17 : 15;
  return (
    <g class="m-eye">
      <ellipse cx={x} cy={y} rx={12.5} ry={ry} class="m-ink" />
      <circle cx={x + 4 * side * -1 + 2} cy={y - 6} r={4.6} fill="#fff" />
      <circle cx={x - 4} cy={y + 6} r={2} fill="#fff" opacity=".8" />
      {lid && <path d={`M${x - 15} ${y - 2} L${x + 15} ${y - 2} L${x + 15} ${y - 20} L${x - 15} ${y - 20} Z`} class="m-lid" />}
    </g>
  );
}

function Brow({ x, y, mood, side }: { x: number; y: number; mood: Mood; side: -1 | 1 }) {
  if (mood === 'peek' || mood === 'calm') return null;
  const tilt = mood === 'worried' ? 7 * side : mood === 'sneaky' ? -6 * side : 0;
  const lift = mood === 'shocked' ? -8 : 0;
  return (
    <path
      d={`M${x - 13} ${y - 24 + lift - tilt} Q${x} ${y - 32 + lift} ${x + 13} ${y - 24 + lift + tilt}`}
      class="m-line"
      stroke-width="5"
    />
  );
}

function Mouth({ x, y, mood }: { x: number; y: number; mood: Mood }) {
  switch (mood) {
    case 'happy':
      return (
        <g>
          <path d={`M${x - 14} ${y} Q${x} ${y + 2} ${x + 14} ${y} Q${x + 12} ${y + 18} ${x} ${y + 18} Q${x - 12} ${y + 18} ${x - 14} ${y} Z`} class="m-ink" />
          <path d={`M${x - 7} ${y + 13} Q${x} ${y + 8} ${x + 7} ${y + 13} Q${x} ${y + 18} ${x - 7} ${y + 13} Z`} fill="#FF5C8A" />
        </g>
      );
    case 'shocked':
      return (
        <g>
          <ellipse cx={x} cy={y + 8} rx={8} ry={10} class="m-ink" />
          <ellipse cx={x} cy={y + 13} rx={5} ry={4} fill="#FF5C8A" />
        </g>
      );
    case 'worried':
      return <path d={`M${x - 10} ${y + 10} Q${x} ${y} ${x + 10} ${y + 10}`} class="m-line" stroke-width="5" />;
    case 'sneaky':
      return <path d={`M${x - 12} ${y + 4} Q${x + 2} ${y + 14} ${x + 14} ${y}`} class="m-line" stroke-width="5" />;
    case 'peek':
      return <ellipse cx={x} cy={y + 8} rx={6} ry={5} class="m-ink" />;
    default:
      return <path d={`M${x - 10} ${y + 4} Q${x} ${y + 12} ${x + 10} ${y + 4}`} class="m-line" stroke-width="5" />;
  }
}

function Blush({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={13} ry={8} fill="#FF8FB3" opacity=".75" />
      <path d={`M${x - 7} ${y + 4} l4 -8 M${x - 1} ${y + 4} l4 -8 M${x + 5} ${y + 4} l4 -8`} stroke="#E0457B" stroke-width="2.4" stroke-linecap="round" />
    </g>
  );
}

export function Mascot({
  shape,
  color,
  mood = 'happy',
  size = 120,
  class: cls = '',
  hands,
}: {
  shape: Shape;
  color: string;
  mood?: Mood;
  size?: number;
  class?: string;
  /** Little hands over the eyes, for the "no peeking" pose. */
  hands?: boolean;
}) {
  const [fx, fy] = FACE[shape];
  const gap = 25;
  return (
    <svg class={`mascot ${cls}`} viewBox="0 0 200 200" width={size} height={size} aria-hidden="true">
      <path d={BODIES[shape]} fill={color} />
      <g class="m-face">
        <Brow x={fx - gap} y={fy} mood={mood} side={-1} />
        <Brow x={fx + gap} y={fy} mood={mood} side={1} />
        <g class={mood === 'peek' ? '' : 'm-blink'}>
          <Eye x={fx - gap} y={fy} mood={mood} side={-1} />
          <Eye x={fx + gap} y={fy} mood={mood} side={1} />
        </g>
        <Blush x={fx - gap - 14} y={fy + 22} />
        <Blush x={fx + gap + 14} y={fy + 22} />
        <Mouth x={fx} y={fy + 16} mood={mood} />
      </g>
      {hands && (
        <g class="m-hands">
          {[-1, 1].map((side) => (
            <g key={side}>
              <ellipse cx={fx + side * gap} cy={fy + 2} rx={21} ry={17} fill={color} />
              <ellipse cx={fx + side * gap} cy={fy + 2} rx={21} ry={17} fill="rgba(23,22,27,.14)" />
              <path
                d={`M${fx + side * gap - 9} ${fy - 9} v9 M${fx + side * gap} ${fy - 12} v11 M${fx + side * gap + 9} ${fy - 9} v9`}
                class="m-line m-shade"
                stroke-width="3"
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export function Sparkle({ size = 22, class: cls = '', color = 'currentColor' }: { size?: number; class?: string; color?: string }) {
  return (
    <svg class={`sparkle ${cls}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill={color} />
    </svg>
  );
}
