<template>
  <AppNavbar />

  <main id="main-content">
    <router-view v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>

  <ContactSection />
  <AppFooter />
  <TgScrollTopButton />
  <TgCookieBanner />
  <TgAiChat />
</template>

<script setup>
  import AppNavbar from '@/components/layout/AppNavbar.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'
  import ContactSection from '@/components/sections/ContactSection.vue'
  import TgScrollTopButton from '@/components/ui/TgScrollTopButton.vue'
  import TgCookieBanner from '@/components/ui/TgCookieBanner.vue'
  import TgAiChat from '@/components/ui/TgAiChat.vue'
</script>
