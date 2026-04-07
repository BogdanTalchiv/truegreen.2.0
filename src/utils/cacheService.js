/**
 * TrueGreen Cache Service
 *
 * Activated when the user clicks "Accept all" in the cookie banner.
 * Strategy:
 *   - Static assets (images, fonts, js, css) → Cache-first via Cache API
 *   - User preferences / partial form data   → localStorage
 *   - Session continuity (last visited route) → sessionStorage
 *
 * No tracking or analytics cookies are set; only performance caching.
 */

const CACHE_NAME = 'tg-static-v1'

/** Assets that are safe to cache indefinitely (change when file hash changes) */
const PRECACHE_URLS = [
  '/',
  '/images/vector.png',
  '/images/howitworks.jpg',
  '/images/before.jpg',
  '/images/after.jpg',
  '/images/avant-g.jpg',
  '/images/apres-g.jpg',
  '/images/avant1-d.jpg',
  '/images/apres1-d.jpg'
]

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Called when user accepts all cookies.
 * Pre-caches key static assets so repeat visits load instantly.
 */
export async function activateFullCaching() {
  if (!('caches' in window)) return

  try {
    const cache = await caches.open(CACHE_NAME)
    // Warm the cache in the background – don't block the UI
    cache.addAll(PRECACHE_URLS).catch(() => {
      // Non-critical: silently ignore if an asset is missing
    })
  } catch {
    // Cache API unavailable in some private-browsing modes – ignore
  }

  // Persist preference in localStorage so the service is re-activated on
  // every future visit without showing the banner again
  localStorage.setItem('tg-cookies-accepted', 'true')
  localStorage.setItem('tg-cache-activated', Date.now().toString())
}

/**
 * Called when user accepts essential cookies only.
 * Clears any previously cached assets.
 */
export async function deactivateFullCaching() {
  if ('caches' in window) {
    try {
      await caches.delete(CACHE_NAME)
    } catch { /* ignore */ }
  }
  localStorage.setItem('tg-cookies-accepted', 'essential')
  localStorage.removeItem('tg-cache-activated')
}

/**
 * Re-activates caching silently on page load if the user previously accepted.
 * Call this once from main.js.
 */
export function rehydrateCacheIfConsented() {
  if (localStorage.getItem('tg-cookies-accepted') === 'true') {
    activateFullCaching()
  }
}

// ─── Persistent form progress ────────────────────────────────────────────────

const FORM_KEY = 'tg-form-draft'

/** Save eligibility form draft to localStorage (only if user consented) */
export function saveFormDraft(formData) {
  if (localStorage.getItem('tg-cookies-accepted') !== 'true') return
  try {
    localStorage.setItem(FORM_KEY, JSON.stringify({ data: formData, ts: Date.now() }))
  } catch { /* quota exceeded – ignore */ }
}

/** Load a previously saved form draft (max 24 h old) */
export function loadFormDraft() {
  try {
    const raw = localStorage.getItem(FORM_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    const MAX_AGE_MS = 24 * 60 * 60 * 1000
    if (Date.now() - ts > MAX_AGE_MS) {
      localStorage.removeItem(FORM_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

/** Remove saved form draft (call after successful submission) */
export function clearFormDraft() {
  localStorage.removeItem(FORM_KEY)
}
