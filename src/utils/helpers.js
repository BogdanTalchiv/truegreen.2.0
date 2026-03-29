/**
 * Get initials from a full name (e.g. "María Pérez" → "MP")
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format a number with locale separators
 */
export function formatNumber(num, locale = 'es-ES') {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generate localized route path
 */
export function localePath(path, lang) {
  return `/${lang}${path.startsWith('/') ? path : '/' + path}`
}
