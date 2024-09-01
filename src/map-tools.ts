export function zeroPad(n: number, len = 2) {
  let s = String(n);
  while (s.length < len) s = "0" + s;

  return s;
}

export function autoHexes(mapping: Record<string, string>, rows: string[]) {
  const lines: string[] = [];
  let r = 0;

  for (const row of rows) {
    r++;
    let q = 0;
    for (const ch of row) {
      q++;

      const mapped = mapping[ch];
      lines.push(`${zeroPad(q)}${zeroPad(r)} ${mapped}`);
    }
  }

  return lines.join("\n");
}
