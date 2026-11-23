/**
 * Returns a new array containing all elements of `items` in an unbiased
 * random order using the Fisher-Yates (Knuth) shuffle algorithm.
 *
 * The input array is never mutated. Call once on initial mount (e.g. inside
 * `useState(() => shuffleArray(creators))` or `useMemo`) so directory order
 * randomizes on each page load while remaining stable across category filters.
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

