export const parseDomSizeValue = (value: string | number, unit = "px") => {
  if (!Number.isNaN(Number(value))) return `${value}${unit}`
  return value
}