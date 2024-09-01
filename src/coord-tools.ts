export function cube_to_oddq({ q, r }: { q: number; r: number }) {
  const x = q;
  const y = r + (q - (q & 1)) / 2;
  return { x, y };
}

export function oddq_to_cube({ x, y }: { x: number; y: number }) {
  const q = x;
  const r = y - (x - (x & 1)) / 2;
  const s = -q - r;
  return { q, r, s };
}
