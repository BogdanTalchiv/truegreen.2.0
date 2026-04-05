<template>
  <!--
    ContactSection — two variants:
    • compact=false (default)  → full layout, only on /contacto and /contact
    • compact=true             → slim chip-strip shown on every other page
  -->
  <section
    id="contact"
    :class="compact ? 'contact-compact-section' : 'tg-section'"
  >
    <div class="container">

      <!-- ─── COMPACT STRIP ─── -->
      <template v-if="compact">
        <div class="compact-shell" data-aos="fade-up">
          <div class="compact-left">
            <i class="bi bi-headset compact-icon"></i>
            <div>
              <p class="compact-title mb-0">
                {{ locale === 'es' ? '¿Hablamos?' : 'Get in touch' }}
              </p>
              <p class="compact-sub mb-0">
                {{ locale === 'es'
                    ? 'Teléfono, WhatsApp o email — respuesta &lt;24 h.'
                    : 'Phone, WhatsApp or email — reply within 24 h.'
                }}
              </p>
            </div>
          </div>
          <div class="compact-chips">
            <a :href="PHONE_URL" class="chip chip--phone">
              <i class="bi bi-telephone-fill"></i>
              <span>{{ PHONE_NUMBER }}</span>
            </a>
            <a :href="WHATSAPP_URL" target="_blank" rel="noopener" class="chip chip--wa">
              <i class="bi bi-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <a :href="EMAIL_URL" class="chip chip--email">
              <i class="bi bi-envelope-fill"></i>
              <span class="d-none d-sm-inline">{{ EMAIL }}</span>
              <span class="d-sm-none">Email</span>
            </a>
            <router-link :to="eligibilityRoute" class="chip chip--cta">
              <i class="bi bi-file-earmark-check"></i>
              <span>{{ locale === 'es' ? 'Estudio gratuito' : 'Free study' }}</span>
            </router-link>
          </div>
        </div>
      </template>

      <!-- ─── FULL LAYOUT ─── -->
      <template v-else>
        <TgSectionHeader
          :title="$t('contact.sectionTitle')"
          :subtitle="$t('contact.sectionSubtitle')"
        />

        <div class="row g-4 mb-5">
          <!-- Info card -->
          <div class="col-12 col-md-6 col-lg-7" data-aos="fade-up">
            <div class="contact-info-card">
              <h3 class="fw-bold mb-4">{{ locale === 'es' ? 'Ponte en contacto' : 'Get in touch' }}</h3>

              <div class="contact-row">
                <a :href="PHONE_URL" class="contact-item">
                  <div class="contact-item-icon"><i class="bi bi-telephone-fill"></i></div>
                  <div>
                    <div class="contact-item-label">{{ $t('contact.phone.label') }}</div>
                    <div class="contact-item-value">{{ PHONE_NUMBER }}</div>
                    <div class="contact-item-sub">{{ $t('contact.phone.schedule') }}</div>
                  </div>
                </a>

                <a :href="WHATSAPP_URL" target="_blank" rel="noopener" class="contact-item contact-item--whatsapp">
                  <div class="contact-item-icon contact-item-icon--whatsapp"><i class="bi bi-whatsapp"></i></div>
                  <div>
                    <div class="contact-item-label">{{ $t('contact.whatsapp.label') }}</div>
                    <div class="contact-item-value">WhatsApp</div>
                    <div class="contact-item-sub">{{ $t('contact.whatsapp.subtitle') }}</div>
                  </div>
                </a>

                <a :href="EMAIL_URL" class="contact-item">
                  <div class="contact-item-icon"><i class="bi bi-envelope-fill"></i></div>
                  <div>
                    <div class="contact-item-label">{{ $t('contact.email.label') }}</div>
                    <div class="contact-item-value">{{ EMAIL }}</div>
                    <div class="contact-item-sub">{{ $t('contact.email.response') }}</div>
                  </div>
                </a>

                <div class="contact-item contact-item--static">
                  <div class="contact-item-icon"><i class="bi bi-geo-alt-fill"></i></div>
                  <div>
                    <div class="contact-item-label">{{ $t('contact.address.label') }}</div>
                    <div class="contact-item-value">{{ ADDRESS }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA card -->
          <div class="col-12 col-md-6 col-lg-5" data-aos="fade-up" data-aos-delay="100">
            <div class="contact-cta-card">
              <div class="contact-cta-icon"><i class="bi bi-telephone-outbound-fill"></i></div>
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
      </template>

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

  defineProps({
    compact: {
      type: Boolean,
      default: false
    }
  })

  const { locale } = useI18n()

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )
</script>

<style lang="scss" scoped>
  /* ─── Compact strip ─── */
  .contact-compact-section {
    padding: 1.75rem 0;
    background: linear-gradient(180deg, #f7faf8 0%, #fff 100%);
    border-top: 1px solid rgba($tg-primary, 0.1);
  }

  .compact-shell {
    background: #fff;
    border: 1px solid #e2eae4;
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 6px 24px rgba(13, 59, 15, 0.06);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 992px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .compact-left {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
  }

  .compact-icon {
    font-size: 1.75rem;
    color: $tg-primary;
    line-height: 1;
    flex-shrink: 0;
  }

  .compact-title {
    font-size: 1rem;
    font-weight: 700;
    color: $tg-text-primary;
  }

  .compact-sub {
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 0.15rem;
  }

  .compact-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    background: #f3f6f4;
    color: $tg-text-primary;

    i { font-size: 1rem; }

    &:hover {
      border-color: rgba($tg-primary, 0.3);
      background: rgba($tg-primary, 0.06);
    }

    &--wa i   { color: #128c7e; }
    &--phone i { color: $tg-primary; }
    &--email i { color: $tg-primary; }

    &--cta {
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      color: #fff;
      border-color: transparent;

      i { color: #fff; }

      &:hover {
        filter: brightness(1.06);
        box-shadow: 0 4px 14px rgba(27, 94, 32, 0.35);
        color: #fff;
      }
    }
  }

  /* ─── Full layout ─── */
  .contact-info-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 20px;
    padding: 2.5rem;
    height: 100%;

    @media (max-width: 575.98px) { padding: 1.5rem; }
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
      border-color: #25d366;
      background: rgba(37, 211, 102, 0.04);
    }

    &--static { cursor: default; &:hover { transform: none; } }
  }

  .contact-item-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1.2rem; flex-shrink: 0;

    &--whatsapp { background: linear-gradient(135deg, #25d366, #128c7e); }
  }

  .contact-item-label {
    font-weight: 600; font-size: 0.8125rem; color: $tg-text-secondary;
    text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.15rem;
  }

  .contact-item-value { font-weight: 600; font-size: 1rem; color: $tg-text-primary; word-break: break-word; }
  .contact-item-sub   { font-size: 0.8125rem; color: $tg-text-secondary; margin-top: 0.15rem; }

  .contact-cta-card {
    background: linear-gradient(135deg, #1b5e20, #2e7d32);
    border-radius: 20px; padding: 2.5rem; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;

    @media (max-width: 575.98px) { padding: 2rem 1.5rem; }
  }

  .contact-cta-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.75rem; color: #fff; margin-bottom: 1.25rem;
  }

  .text-white-75 { color: rgba(255,255,255,0.75); }

  .btn-call-now {
    background: #fff; color: #1b5e20; font-weight: 700; border: none;
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0.85rem 2rem; transition: all 0.2s ease;

    &:hover {
      background: #f0f0f0; color: #1b5e20;
      transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
  }
</style>
