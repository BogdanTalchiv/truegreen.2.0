<template>
  <Teleport to="body">
    <Transition name="offcanvas">
      <div v-if="uiStore.isMobileMenuOpen" class="mobile-menu-backdrop" @click="close">
        <div class="mobile-menu-panel" @click.stop>
          <div class="mobile-menu-header d-flex justify-content-between align-items-center p-3">
            <img
              src="/images/logo.jpg"
              alt="True Green Energy"
              style="height: 60px; width: auto; object-fit: contain; border-radius: 6px;"
            />
            <button class="btn-close" @click="close" aria-label="Close"></button>
          </div>

          <nav class="mobile-menu-nav p-3">
            <ul class="list-unstyled mb-0">
              <li v-for="item in navItems" :key="item.key" class="mb-1">
                <router-link
                  :to="getNavRoute(item)"
                  class="mobile-nav-link d-block py-2 px-3 rounded"
                  active-class="active"
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
  import { useUiStore } from '@/stores/ui'
  import { NAV_ITEMS } from '@/utils/constants'

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
