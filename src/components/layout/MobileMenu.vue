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
              <li v-for="section in navSections" :key="section.id" class="mb-1">
                <a
                  class="mobile-nav-link d-block py-2 px-3 rounded"
                  :class="{ active: uiStore.currentSection === section.id }"
                  :href="`#${section.id}`"
                  @click.prevent="handleClick(section.id)"
                >
                  {{ $t(section.key) }}
                </a>
              </li>
            </ul>

            <hr />

            <a
              href="#contact"
              class="btn btn-tg-cta w-100"
              @click.prevent="handleClick('contact')"
            >
              {{ $t('nav.checkEligibility') }}
            </a>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { watch } from 'vue'
  import { useUiStore } from '@/stores/ui'
  import { useSmoothScroll } from '@/composables/useSmoothScroll'
  import { NAV_SECTIONS } from '@/utils/constants'

  const uiStore = useUiStore()
  const { scrollTo } = useSmoothScroll()
  const navSections = NAV_SECTIONS

  function close() {
    uiStore.closeMobileMenu()
  }

  function handleClick(id) {
    close()
    setTimeout(() => scrollTo(id), 300)
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
