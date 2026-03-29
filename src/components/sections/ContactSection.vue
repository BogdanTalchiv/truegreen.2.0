<template>
  <section id="contact" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :title="$t('contact.sectionTitle')"
        :subtitle="$t('contact.sectionSubtitle')"
      />

      <div class="row g-3 mb-5">
        <div class="col-12 col-sm-6 col-xl-3" data-aos="fade-up" data-aos-delay="0">
          <a :href="PHONE_URL" class="text-decoration-none">
            <div class="tg-contact-card h-100">
              <div class="tg-contact-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <h4 class="fw-semibold fs-6 mb-1">{{ $t('contact.phone.label') }}</h4>
              <p class="fw-medium text-success mb-1">{{ PHONE_NUMBER }}</p>
              <p class="text-muted small mb-0">{{ $t('contact.phone.schedule') }}</p>
            </div>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-xl-3" data-aos="fade-up" data-aos-delay="100">
          <a :href="EMAIL_URL" class="text-decoration-none">
            <div class="tg-contact-card h-100">
              <div class="tg-contact-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <h4 class="fw-semibold fs-6 mb-1">{{ $t('contact.email.label') }}</h4>
              <p class="fw-medium text-success mb-1">{{ EMAIL }}</p>
              <p class="text-muted small mb-0">{{ $t('contact.email.response') }}</p>
            </div>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-xl-3" data-aos="fade-up" data-aos-delay="200">
          <a :href="WHATSAPP_URL" target="_blank" rel="noopener" class="text-decoration-none">
            <div class="tg-contact-card h-100">
              <div class="tg-contact-icon">
                <i class="bi bi-whatsapp"></i>
              </div>
              <h4 class="fw-semibold fs-6 mb-1">{{ $t('contact.whatsapp.label') }}</h4>
              <p class="fw-medium text-success mb-1">{{ PHONE_NUMBER }}</p>
              <p class="text-muted small mb-0">{{ $t('contact.whatsapp.subtitle') }}</p>
            </div>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-xl-3" data-aos="fade-up" data-aos-delay="300">
          <div class="tg-contact-card h-100">
            <div class="tg-contact-icon">
              <i class="bi bi-geo-alt"></i>
            </div>
            <h4 class="fw-semibold fs-6 mb-1">{{ $t('contact.address.label') }}</h4>
            <p class="fw-medium mb-0">{{ ADDRESS }}</p>
          </div>
        </div>
      </div>

      <div class="tg-cta-box" data-aos="fade-up">
        <h3 class="fw-bold mb-2">{{ $t('contact.ctaTitle') }}</h3>
        <p class="mb-4 opacity-75">{{ $t('contact.ctaSubtitle') }}</p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <router-link :to="eligibilityRoute" class="btn btn-tg-white btn-lg">
            <i class="bi bi-file-earmark-check me-2"></i>{{ $t('contact.ctaButton') }}
          </router-link>
          <a :href="PHONE_URL" class="btn btn-outline-light btn-lg">
            <i class="bi bi-telephone me-2"></i>{{ $t('contact.ctaCall') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'
  import {
    PHONE_NUMBER,
    PHONE_URL,
    EMAIL,
    EMAIL_URL,
    WHATSAPP_URL,
    ADDRESS
  } from '@/utils/constants'

  const { locale } = useI18n()

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )
</script>
