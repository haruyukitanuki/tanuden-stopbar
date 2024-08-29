export const roundNumber = (value: number, precision: number): string => {
  if (isNaN(value)) {
    value = 0
  }

  let multiplier: number = Math.pow(10, precision || 0)
  multiplier = Math.round(value * multiplier) / multiplier

  let result: string = multiplier.toString()

  // Keep decimal places with trailing zeros even if decimal places are not needed.
  // e.g. 1.0 -> 1.0 instead of 1
  if (precision > 0) {
    const parts = multiplier.toString().split('.')
    if (parts.length === 1) {
      parts.push('')
    }
    while (parts[1].length < precision) {
      parts[1] += '0'
    }
    result = parts.join('.')
  }

  return result.toString()
}
