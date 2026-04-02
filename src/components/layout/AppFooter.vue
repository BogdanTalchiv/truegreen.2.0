<template>
  <footer class="bg-tg-dark py-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="mb-3">
            <img
              src="/images/vector.png"
              alt="Truegreen Energy"
              class="footer-logo"
            />
          </div>
          <p class="text-white-50 small">{{ $t('footer.description') }}</p>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <h6 class="text-white fw-bold mb-3">{{ $t('footer.quickLinks') }}</h6>
          <ul class="list-unstyled">
            <li v-for="item in navItems" :key="item.key" class="mb-2">
              <router-link
                :to="getNavRoute(item)"
                class="footer-link text-white-50 small text-decoration-none"
              >
                {{ $t(item.key) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <h6 class="text-white fw-bold mb-3">{{ $t('footer.contactInfo') }}</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a :href="PHONE_URL" class="footer-link text-white-50 small text-decoration-none">
                <i class="bi bi-telephone me-2"></i>{{ PHONE_NUMBER }}
              </a>
            </li>
            <li class="mb-2">
              <a :href="WHATSAPP_URL" target="_blank" rel="noopener" class="footer-link text-white-50 small text-decoration-none">
                <i class="bi bi-whatsapp me-2"></i>WhatsApp
              </a>
            </li>
            <li class="mb-2">
              <a :href="EMAIL_URL" class="footer-link text-white-50 small text-decoration-none">
                <i class="bi bi-envelope me-2"></i>{{ EMAIL }}
              </a>
            </li>
            <li class="mb-2">
              <span class="text-white-50 small">
                <i class="bi bi-geo-alt me-2"></i>{{ ADDRESS }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-white-50 my-4" />

      <div class="row align-items-center">
        <div class="col-12 col-md-6 text-center text-md-start">
          <p class="text-white-50 small mb-0">{{ $t('footer.copyright') }}</p>
        </div>
        <div class="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
          <router-link
            :to="privacyRoute"
            class="text-white-50 small text-decoration-none me-3 footer-link"
          >
            {{ $t('footer.privacy') }}
          </router-link>
          <span class="text-white-50 small">{{ $t('footer.terms') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import {
    NAV_ITEMS,
    PHONE_NUMBER,
    PHONE_URL,
    EMAIL,
    EMAIL_URL,
    WHATSAPP_URL,
    ADDRESS
  } from '@/utils/constants'

  const { locale } = useI18n()
  const navItems = NAV_ITEMS

  function getNavRoute(item) {
    if (item.routeName === 'home') return `/${locale.value}`
    const path = locale.value === 'es' ? item.routeEs : item.routeEn
    return `/${locale.value}/${path}`
  }

  const privacyRoute = computed(() =>
    locale.value === 'es' ? '/es/politica-privacidad' : '/en/privacy-policy'
  )
</script>

<style lang="scss" scoped>
  .footer-logo {
    height: 64px;
    width: auto;
    object-fit: contain;

    @media (max-width: 575.98px) {
      height: 52px;
    }
  }

  .footer-link {
    transition: color 0.2s ease;

    &:hover {
      color: $tg-primary-light !important;
    }
  }
</style>
