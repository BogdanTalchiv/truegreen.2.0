<template>
  <AppNavbar />

  <main id="main-content">
    <router-view v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>

  <!-- Full layout only on dedicated contact page; compact strip on every other route -->
  <ContactSection :compact="!isContactPage" />
  <AppFooter />
  <TgScrollTopButton />
  <TgCookieBanner />
  <TgAiChat />
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import AppNavbar from '@/components/layout/AppNavbar.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'
  import ContactSection from '@/components/sections/ContactSection.vue'
  import TgScrollTopButton from '@/components/ui/TgScrollTopButton.vue'
  import TgCookieBanner from '@/components/ui/TgCookieBanner.vue'
  import TgAiChat from '@/components/ui/TgAiChat.vue'

  const route = useRoute()

  // Show full contact layout only on /es/contacto and /en/contact
  const isContactPage = computed(() => {
    const name = route.name || ''
    return name === 'contact-es' || name === 'contact-en'
  })
</script>
