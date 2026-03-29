import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useHead(options = {}) {
  const { locale } = useI18n()

  watchEffect(() => {
    if (options.title) {
      document.title = `${options.title.value || options.title} — TrueGreen`
    }

    if (options.description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', options.description.value || options.description)
    }

    document.documentElement.lang = locale.value

    updateMetaTag('og:locale', locale.value === 'es' ? 'es_ES' : 'en_US')

    const alternateLocale = locale.value === 'es' ? 'en_US' : 'es_ES'
    updateMetaTag('og:locale:alternate', alternateLocale)
  })
}

function updateMetaTag(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}
