export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "array"
  | "object"

export function isISODate(value: unknown): boolean {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}/.test(value)
  )
}

export function detectType(value: unknown): FieldType {
  if (value === null) return "string"

  if (typeof value === "string") {
    if (isISODate(value)) return "date"
    return "string"
  }

  if (typeof value === "number") return "number"
  if (typeof value === "boolean") return "boolean"
  if (Array.isArray(value)) return "array"
  if (typeof value === "object") return "object"

  return "string"
}