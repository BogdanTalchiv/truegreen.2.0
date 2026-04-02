<template>
  <section id="contact" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :title="$t('contact.sectionTitle')"
        :subtitle="$t('contact.sectionSubtitle')"
      />

      <div class="row g-4 mb-5">
        <div class="col-12 col-md-6 col-lg-7" data-aos="fade-up">
          <div class="contact-info-card">
            <h3 class="fw-bold mb-4">{{ locale === 'es' ? 'Ponte en contacto' : 'Get in touch' }}</h3>

            <div class="contact-row">
              <a :href="PHONE_URL" class="contact-item">
                <div class="contact-item-icon">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <div class="contact-item-label">{{ $t('contact.phone.label') }}</div>
                  <div class="contact-item-value">{{ PHONE_NUMBER }}</div>
                  <div class="contact-item-sub">{{ $t('contact.phone.schedule') }}</div>
                </div>
              </a>

              <a :href="WHATSAPP_URL" target="_blank" rel="noopener" class="contact-item contact-item--whatsapp">
                <div class="contact-item-icon contact-item-icon--whatsapp">
                  <i class="bi bi-whatsapp"></i>
                </div>
                <div>
                  <div class="contact-item-label">{{ $t('contact.whatsapp.label') }}</div>
                  <div class="contact-item-value">WhatsApp</div>
                  <div class="contact-item-sub">{{ $t('contact.whatsapp.subtitle') }}</div>
                </div>
              </a>

              <a :href="EMAIL_URL" class="contact-item">
                <div class="contact-item-icon">
                  <i class="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <div class="contact-item-label">{{ $t('contact.email.label') }}</div>
                  <div class="contact-item-value">{{ EMAIL }}</div>
                  <div class="contact-item-sub">{{ $t('contact.email.response') }}</div>
                </div>
              </a>

              <div class="contact-item contact-item--static">
                <div class="contact-item-icon">
                  <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <div class="contact-item-label">{{ $t('contact.address.label') }}</div>
                  <div class="contact-item-value">{{ ADDRESS }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-5" data-aos="fade-up" data-aos-delay="100">
          <div class="contact-cta-card">
            <div class="contact-cta-icon">
              <i class="bi bi-telephone-outbound-fill"></i>
            </div>
            <h4 class="fw-bold text-white mb-2">{{ $t('contact.ctaTitle') }}</h4>
            <p class="text-white-75 mb-4">{{ $t('contact.ctaSubtitle') }}</p>

            <a :href="PHONE_URL" class="btn btn-call-now btn-lg w-100 mb-3">
              <i class="bi bi-telephone me-2"></i>{{ $t('contact.ctaCall') }}
            </a>

            <router-link :to="eligibilityRoute" class="btn btn-outline-light btn-lg w-100">
              <i class="bi bi-file-earmark-check me-2"></i>{{ $t('contact.ctaButton') }}
            </router-link>
          </div>
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

<style lang="scss" scoped>
  .contact-info-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 20px;
    padding: 2.5rem;
    height: 100%;

    @media (max-width: 575.98px) {
      padding: 1.5rem;
    }
  }

  .contact-row {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 14px;
    border: 1px solid #f0f0f0;
    text-decoration: none;
    color: inherit;
    transition: all 0.25s ease;

    &:hover {
      border-color: $tg-primary;
      background: rgba($tg-primary, 0.03);
      transform: translateX(4px);
    }

    &--whatsapp:hover {
      border-color: #25D366;
      background: rgba(37, 211, 102, 0.04);
    }

    &--static {
      cursor: default;
      &:hover {
        transform: none;
      }
    }
  }

  .contact-item-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    flex-shrink: 0;

    &--whatsapp {
      background: linear-gradient(135deg, #25D366, #128C7E);
    }
  }

  .contact-item-label {
    font-weight: 600;
    font-size: 0.8125rem;
    color: $tg-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.15rem;
  }

  .contact-item-value {
    font-weight: 600;
    font-size: 1rem;
    color: $tg-text-primary;
  }

  .contact-item-sub {
    font-size: 0.8125rem;
    color: $tg-text-secondary;
    margin-top: 0.15rem;
  }

  .contact-cta-card {
    background: linear-gradient(135deg, #1B5E20, #2E7D32);
    border-radius: 20px;
    padding: 2.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (max-width: 575.98px) {
      padding: 2rem 1.5rem;
    }
  }

  .contact-cta-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: #fff;
    margin-bottom: 1.25rem;
  }

  .text-white-75 {
    color: rgba(255, 255, 255, 0.75);
  }

  .btn-call-now {
    background: #fff;
    color: #1B5E20;
    font-weight: 700;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2rem;
    transition: all 0.2s ease;

    &:hover {
      background: #f0f0f0;
      color: #1B5E20;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  }
</style>
