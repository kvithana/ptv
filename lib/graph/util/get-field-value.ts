export function getFieldValue<T extends object, K extends keyof T>(
  field: K,
  obj: T
): T[K] | null {
  return field in obj ? obj[field] : null
}
