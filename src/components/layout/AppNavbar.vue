<template>
  <a class="skip-nav" href="#main-content">{{ $t('nav.home') }}</a>

  <nav
    class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-scrolled': uiStore.isScrolled }"
  >
    <div class="container">
      <router-link :to="`/${$i18n.locale}`" class="navbar-brand">
        <img
          src="/images/logo.jpg"
          alt="True Green Energy"
          class="navbar-logo"
        />
      </router-link>

      <div class="d-flex align-items-center gap-2 d-lg-none">
        <LanguageSwitcher />
        <button
          class="navbar-toggler border-0 p-2"
          type="button"
          @click="uiStore.toggleMobileMenu"
          :aria-label="uiStore.isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <div class="hamburger-animated" :class="{ active: uiStore.isMobileMenuOpen }">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto gap-1">
          <li v-for="item in navItems" :key="item.key" class="nav-item">
            <router-link
              :to="getNavRoute(item)"
              class="nav-link nav-link-animated"
              active-class="active"
            >
              {{ $t(item.key) }}
            </router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3">
          <LanguageSwitcher />
          <router-link
            :to="eligibilityRoute"
            class="btn btn-tg-primary btn-sm"
          >
            {{ $t('nav.checkEligibility') }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <MobileMenu />
</template>

<script setup>
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useUiStore } from '@/stores/ui'
  import { NAV_ITEMS } from '@/utils/constants'
  import LanguageSwitcher from './LanguageSwitcher.vue'
  import MobileMenu from './MobileMenu.vue'

  const { locale } = useI18n()
  const uiStore = useUiStore()
  const navItems = NAV_ITEMS

  function getNavRoute(item) {
    if (item.routeName === 'home') return `/${locale.value}`
    const path = locale.value === 'es' ? item.routeEs : item.routeEn
    return `/${locale.value}/${path}`
  }

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )

  function onScroll() {
    uiStore.setScrollState(window.scrollY > 50)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scoped>
  .navbar {
    transition: all 0.3s ease;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    &:not(.navbar-scrolled) {
      background: transparent;
    }

    &.navbar-scrolled {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  }

  .navbar-logo {
    height: 70px;
    width: auto;
    object-fit: contain;
    border-radius: 6px;
    transition: transform 0.2s ease, height 0.3s ease;

    @media (max-width: 575.98px) {
      height: 56px;
    }

    @media (min-width: 576px) and (max-width: 767.98px) {
      height: 60px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      height: 64px;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  .navbar-scrolled .navbar-logo {
    height: 50px;

    @media (max-width: 575.98px) {
      height: 44px;
    }

    @media (min-width: 576px) and (max-width: 991.98px) {
      height: 48px;
    }
  }

  .nav-link {
    font-weight: 500;
    color: $tg-text-primary;
    padding: 0.5rem 0.75rem !important;

    &.active,
    &.router-link-exact-active {
      color: $tg-primary;
    }
  }
</style>
