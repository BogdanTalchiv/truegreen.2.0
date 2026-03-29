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

  const currentFlag = computed(() => languages.find((l) => l.code === locale.value)?.flag || '🇪🇸')
  const currentLabel = computed(
    () => languages.find((l) => l.code === locale.value)?.label || 'Español'
  )

  function switchLang(code) {
    if (code === locale.value) return

    locale.value = code
    localStorage.setItem('tg-lang', code)
    document.documentElement.lang = code

    const currentPath = route.path
    const newPath = currentPath.replace(/^\/(es|en)/, `/${code}`)
    router.push(newPath)
  }
</script>
