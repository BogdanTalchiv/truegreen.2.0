<template>
  <a class="skip-nav" href="#main-content">{{ $t('nav.home') }}</a>

  <nav
    class="navbar navbar-expand-lg fixed-top"
    :class="{
      'navbar-scrolled': uiStore.isScrolled,
      'navbar-inner': !isHomePage
    }"
  >
    <div class="container">
      <router-link :to="`/${$i18n.locale}`" class="navbar-brand d-flex align-items-center gap-2">
        <img
          src="/images/tge_logo_nobg.png"
          alt="Truegreen Energy"
          class="navbar-logo"
        />
        <span class="brand-text">
          <span class="brand-line brand-line--top">Truegreen</span>
          <span class="brand-line brand-line--bottom">Energy</span>
        </span>
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
              :class="{ active: isActive(item) }"
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
  import { useRoute } from 'vue-router'
  import { useUiStore } from '@/stores/ui'
  import { NAV_ITEMS } from '@/utils/constants'
  import LanguageSwitcher from './LanguageSwitcher.vue'
  import MobileMenu from './MobileMenu.vue'

  const { locale } = useI18n()
  const route = useRoute()
  const uiStore = useUiStore()
  const navItems = NAV_ITEMS

  const isHomePage = computed(() => {
    const p = route.path
    return p === `/${locale.value}` || p === `/${locale.value}/`
  })

  function getNavRoute(item) {
    if (item.routeName === 'home') return `/${locale.value}`
    const path = locale.value === 'es' ? item.routeEs : item.routeEn
    return `/${locale.value}/${path}`
  }

  function isActive(item) {
    const currentPath = route.path
    const navPath = getNavRoute(item)
    if (item.routeName === 'home') {
      return currentPath === `/${locale.value}` || currentPath === `/${locale.value}/`
    }
    return currentPath.startsWith(navPath)
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
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;

    &:not(.navbar-scrolled) {
      background: transparent;
    }

    &.navbar-scrolled {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      background: rgba(26, 46, 26, 0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    }
  }

  // ─── Inner page (non-home) overrides ───
  .navbar-inner {
    .nav-link {
      color: rgba(0, 0, 0, 0.7) !important;

      &:hover {
        color: #000 !important;
      }

      &.active {
        color: $tg-primary !important;
      }
    }

    .brand-text {
      color: $tg-text-primary;
      text-shadow: none;
    }

    .hamburger-animated .bar {
      background-color: $tg-text-primary !important;
    }

    &:not(.navbar-scrolled) {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
    }

    &.navbar-scrolled {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);

      .nav-link {
        color: rgba(0, 0, 0, 0.7) !important;

        &:hover {
          color: #000 !important;
        }

        &.active {
          color: $tg-primary !important;
        }
      }

      .brand-text {
        color: $tg-text-primary;
        text-shadow: none;
      }
    }
  }

  .navbar-logo {
    height: 48px;
    width: auto;
    object-fit: contain;
    transition: transform 0.2s ease, height 0.3s ease;

    @media (max-width: 575.98px) {
      height: 38px;
    }

    @media (min-width: 576px) and (max-width: 991.98px) {
      height: 42px;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  .navbar-scrolled .navbar-logo {
    height: 40px;

    @media (max-width: 575.98px) {
      height: 32px;
    }

    @media (min-width: 576px) and (max-width: 991.98px) {
      height: 36px;
    }
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: color 0.3s ease;
  }

  .brand-line {
    display: block;

    &--top {
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.02em;

      @media (max-width: 575.98px) {
        font-size: 0.8rem;
      }
    }

    &--bottom {
      font-weight: 400;
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.8;

      @media (max-width: 575.98px) {
        font-size: 0.6rem;
      }
    }
  }

  .nav-link {
    font-weight: 500;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.85) !important;
    padding: 0.5rem 0.75rem !important;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: #fff !important;
    }

    &.active {
      color: #69F0AE !important;
      font-weight: 600;
    }
  }

  .hamburger-animated .bar {
    background-color: #fff;
    transition: background-color 0.3s ease;
  }

  :deep(.btn-tg-primary) {
    background: $tg-primary;
    border-color: $tg-primary;
    color: #fff;
    white-space: nowrap;
    font-size: 0.85rem;
    padding: 0.4rem 1rem;
  }
</style>
