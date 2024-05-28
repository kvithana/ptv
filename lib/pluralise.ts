export function pluralise(
  count: number,
  singular: string,
  plural?: string
): string {
  return count + " " + (count === 1 ? singular : plural ?? singular + "s")
}
