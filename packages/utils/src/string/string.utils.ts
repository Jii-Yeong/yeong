export const parseDomSizeValue = (value: string | number, unit = 'px') => {
  if (typeof value === 'string') return value
  return `${value}${unit}`
}