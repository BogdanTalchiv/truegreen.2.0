<template>
  <Teleport to="body">
    <Transition name="offcanvas">
      <div v-if="uiStore.isMobileMenuOpen" class="mobile-menu-backdrop" @click="close">
        <div class="mobile-menu-panel" @click.stop>
          <div class="mobile-menu-header d-flex justify-content-between align-items-center p-3">
            <div class="d-flex align-items-center gap-2">
              <img
                src="/images/tge_logo_nobg.png"
                alt="Truegreen Energy"
                style="height: 40px; width: auto; object-fit: contain;"
              />
              <span class="mobile-brand-text">
                <span class="mobile-brand-top">Truegreen</span>
                <span class="mobile-brand-bottom">Energy</span>
              </span>
            </div>
            <button class="btn-close" @click="close" aria-label="Close"></button>
          </div>

          <nav class="mobile-menu-nav p-3">
            <ul class="list-unstyled mb-0">
              <li v-for="item in navItems" :key="item.key" class="mb-1">
                <router-link
                  :to="getNavRoute(item)"
                  class="mobile-nav-link d-block py-2 px-3 rounded"
                  :class="{ active: isActive(item) }"
                  @click="close"
                >
                  {{ $t(item.key) }}
                </router-link>
              </li>
            </ul>

            <hr />

            <router-link
              :to="eligibilityRoute"
              class="btn btn-tg-cta w-100"
              @click="close"
            >
              {{ $t('nav.checkEligibility') }}
            </router-link>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useUiStore } from '@/stores/ui'
  import { NAV_ITEMS } from '@/utils/constants'

  const { locale } = useI18n()
  const route = useRoute()
  const uiStore = useUiStore()
  const navItems = NAV_ITEMS

  function getNavRoute(item) {
    if (item.routeName === 'home') return `/${locale.value}`
    const path = locale.value === 'es' ? item.routeEs : item.routeEn
    return `/${locale.value}/${path}`
  }

  function isActive(item) {
    const currentPath = route.path
    if (item.routeName === 'home') {
      return currentPath === `/${locale.value}` || currentPath === `/${locale.value}/`
    }
    const navPath = getNavRoute(item)
    return currentPath.startsWith(navPath)
  }

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )

  function close() {
    uiStore.closeMobileMenu()
  }

  watch(
    () => uiStore.isMobileMenuOpen,
    (open) => {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  )
</script>

<style lang="scss" scoped>
  .mobile-menu-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1045;
  }

  .mobile-menu-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: $tg-bg-white;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    z-index: 1046;
  }

  .mobile-brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: 'Montserrat', sans-serif;
  }

  .mobile-brand-top {
    font-weight: 700;
    font-size: 0.9rem;
    color: $tg-primary-dark;
    letter-spacing: 0.02em;
  }

  .mobile-brand-bottom {
    font-weight: 400;
    font-size: 0.65rem;
    color: $tg-text-secondary;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mobile-nav-link {
    color: $tg-text-primary;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover,
    &.active {
      background: rgba($tg-primary, 0.08);
      color: $tg-primary;
    }
  }

  .offcanvas-enter-active,
  .offcanvas-leave-active {
    transition: opacity 0.3s ease;

    .mobile-menu-panel {
      transition: transform 0.3s ease;
    }
  }

  .offcanvas-enter-from,
  .offcanvas-leave-to {
    opacity: 0;

    .mobile-menu-panel {
      transform: translateX(100%);
    }
  }
</style>
