export type Quadratic = { a: number; b: number; c: number };

export function evaluate({ a, b, c }: Quadratic, x: number): number {
  return a * x * x + b * x + c;
}

export function discriminant({ a, b, c }: Quadratic): number {
  return b * b - 4 * a * c;
}

export function vertex({ a, b, c }: Quadratic): { x: number; y: number } {
  const x = -b / (2 * a);
  return { x, y: evaluate({ a, b, c }, x) };
}

/** Real roots of ax² + bx + c = 0. Returns [] when a = 0 is not a quadratic,
 *  one repeated root when D = 0, two distinct roots when D > 0, and an empty
 *  array (no real roots) when D < 0. */
export function realRoots({ a, b, c }: Quadratic): number[] {
  if (a === 0) return [];
  const d = discriminant({ a, b, c });
  if (d < 0) return [];
  const sqrtD = Math.sqrt(d);
  if (d === 0) return [-b / (2 * a)];
  return [(-b - sqrtD) / (2 * a), (-b + sqrtD) / (2 * a)].sort((p, q) => p - q);
}

export function sumOfRoots({ a, b }: Quadratic): number {
  return -b / a;
}

export function productOfRoots({ a, c }: Quadratic): number {
  return c / a;
}