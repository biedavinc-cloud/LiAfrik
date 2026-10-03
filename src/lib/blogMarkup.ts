// Tiny inline-markup helpers shared by the React blog pages and the
// pre-renderer: **bold** and [label](href). Pure module.

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'link'; text: string; href: string };

const INLINE_RE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function parseInline(src: string): InlineToken[] {
  const out: InlineToken[] = [];
  let last = 0;
  for (const m of src.matchAll(INLINE_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ type: 'text', text: src.slice(last, i) });
    if (m[1] !== undefined) out.push({ type: 'bold', text: m[1] });
    else out.push({ type: 'link', text: m[2], href: m[3] });
    last = i + m[0].length;
  }
  if (last < src.length) out.push({ type: 'text', text: src.slice(last) });
  return out;
}

/** Text without markup (for word counts, JSON-LD, meta checks). */
export const stripInline = (src: string) =>
  parseInline(src).map((t) => t.text).join('');

/** Anchor id for a heading ("Choisir son POS" → "choisir-son-pos"). */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
