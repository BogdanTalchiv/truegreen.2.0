<template>
  <div class="dropdown">
    <button
      class="btn btn-sm btn-tg-ghost dropdown-toggle d-flex align-items-center gap-1"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span>{{ currentFlag }}</span>
      <span class="d-none d-lg-inline">{{ currentLabel }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li v-for="lang in languages" :key="lang.code">
        <button
          class="dropdown-item d-flex align-items-center gap-2"
          :class="{ active: locale === lang.code }"
          @click="switchLang(lang.code)"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ lang.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter, useRoute } from 'vue-router'

  const { locale } = useI18n()
  const router = useRouter()
  const route = useRoute()

  const languages = [
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'en', flag: '🇬🇧', label: 'English' }
  ]

  const pathMap = {
    'por-que-nosotros': 'why-us',
    'why-us': 'por-que-nosotros',
    'como-funciona': 'how-it-works',
    'how-it-works': 'como-funciona',
    'soluciones': 'solutions',
    'solutions': 'soluciones',
    'testimonios': 'testimonials',
    'testimonials': 'testimonios',
    'contacto': 'contact',
    'contact': 'contacto',
    'sobre-nosotros': 'about-us',
    'about-us': 'sobre-nosotros',
    'servicios': 'services',
    'services': 'servicios',
    'preguntas-frecuentes': 'faq',
    'faq': 'preguntas-frecuentes',
    'verificar-elegibilidad': 'check-eligibility',
    'check-eligibility': 'verificar-elegibilidad',
    'provincias': 'provinces',
    'provinces': 'provincias',
    'politica-privacidad': 'privacy-policy',
    'privacy-policy': 'politica-privacidad'
  }

  const currentFlag = computed(() => languages.find((l) => l.code === locale.value)?.flag || '🇪🇸')
  const currentLabel = computed(
    () => languages.find((l) => l.code === locale.value)?.label || 'Español'
  )

  function switchLang(code) {
    if (code === locale.value) return

    locale.value = code
    localStorage.setItem('tg-lang', code)
    document.documentElement.lang = code

    const segments = route.path.split('/')
    segments[1] = code

    if (segments[2] && pathMap[segments[2]]) {
      segments[2] = pathMap[segments[2]]
    }

    router.push(segments.join('/'))
  }
</script>
