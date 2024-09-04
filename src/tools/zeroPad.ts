export default function zeroPad(n: number, len = 2) {
  let s = String(n);
  while (s.length < len) s = "0" + s;

  return s;
}
