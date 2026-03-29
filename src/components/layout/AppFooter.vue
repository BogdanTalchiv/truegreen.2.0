<template>
  <footer class="bg-tg-dark py-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="mb-3">
            <img
              src="/images/logo.jpg"
              alt="True Green Energy"
              class="footer-logo"
            />
          </div>
          <p class="text-white-50 small">{{ $t('footer.description') }}</p>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <h6 class="text-white fw-bold mb-3">{{ $t('footer.quickLinks') }}</h6>
          <ul class="list-unstyled">
            <li v-for="section in navSections" :key="section.id" class="mb-2">
              <a
                :href="`#${section.id}`"
                class="footer-link text-white-50 small text-decoration-none"
                @click.prevent="scrollTo(section.id)"
              >
                {{ $t(section.key) }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <h6 class="text-white fw-bold mb-3">{{ $t('footer.contactInfo') }}</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a :href="PHONE_URL" class="footer-link text-white-50 small text-decoration-none">
                <i class="bi bi-telephone me-2"></i>{{ PHONE_NUMBER }}
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

        <div class="col-12 col-md-6 col-lg-3">
          <h6 class="text-white fw-bold mb-3">{{ $t('footer.followUs') }}</h6>
          <div class="d-flex gap-2">
            <a
              v-for="(url, platform) in SOCIAL_LINKS"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              :aria-label="platform"
            >
              <i :class="`bi bi-${platform}`"></i>
            </a>
          </div>
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
  import { useSmoothScroll } from '@/composables/useSmoothScroll'
  import {
    NAV_SECTIONS,
    PHONE_NUMBER,
    PHONE_URL,
    EMAIL,
    EMAIL_URL,
    ADDRESS,
    SOCIAL_LINKS
  } from '@/utils/constants'

  const { locale } = useI18n()
  const { scrollTo } = useSmoothScroll()
  const navSections = NAV_SECTIONS

  const privacyRoute = computed(() =>
    locale.value === 'es' ? '/es/politica-privacidad' : '/en/privacy-policy'
  )
</script>

<style lang="scss" scoped>
  .footer-logo {
    height: 72px;
    width: auto;
    object-fit: contain;
    border-radius: 8px;
    background: white;
    padding: 6px 10px;

    @media (max-width: 575.98px) {
      height: 60px;
    }
  }

  .footer-link {
    transition: color 0.2s ease;

    &:hover {
      color: $tg-primary-light !important;
    }
  }

  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: $tg-primary;
      border-color: $tg-primary;
      color: white;
    }
  }
</style>
