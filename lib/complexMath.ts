export type Rect = { re: number; im: number };
export type Polar = { r: number; thetaDeg: number };

export const toRad = (deg: number) => (deg * Math.PI) / 180;
export const toDeg = (rad: number) => (rad * 180) / Math.PI;

export function rectToPolar({ re, im }: Rect): Polar {
  const r = Math.sqrt(re * re + im * im);
  // atan2 handles all four quadrants correctly, which is the usual student pitfall
  const thetaDeg = toDeg(Math.atan2(im, re));
  return { r, thetaDeg };
}

export function polarToRect({ r, thetaDeg }: Polar): Rect {
  const rad = toRad(thetaDeg);
  return { re: r * Math.cos(rad), im: r * Math.sin(rad) };
}

export function addRect(a: Rect, b: Rect): Rect {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function multiplyRect(a: Rect, b: Rect): Rect {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

export function formatComplex({ re, im }: Rect, digits = 3): string {
  const r = Number(re.toFixed(digits));
  const i = Number(im.toFixed(digits));
  if (i === 0) return `${r}`;
  const sign = i < 0 ? "-" : "+";
  return `${r} ${sign} ${Math.abs(i)}i`;
}

/** Keeps an angle within (-180, 180] so labels don't show 370° etc. */
export function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}