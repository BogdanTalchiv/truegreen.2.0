<template>
  <section id="hero" class="hero-section d-flex align-items-center position-relative">
    <div class="hero-overlay"></div>
    <div class="container position-relative" style="z-index: 2">
      <div class="row align-items-center">
        <div class="col-12 col-lg-7 text-center text-lg-start">
          <h1 class="hero-title mb-3" data-aos="fade-up">
            {{ $t('hero.title') }}
            <span class="text-gradient d-inline-block">{{ $t('hero.titleHighlight') }}</span>
            {{ $t('hero.titleEnd') }}
          </h1>

          <p class="hero-subtitle lead mb-4" data-aos="fade-up" data-aos-delay="100">
            {{ $t('hero.subtitle') }}
          </p>

          <div class="d-flex flex-wrap align-items-center gap-3 mb-4 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="200">
            <div class="d-flex align-items-center gap-2">
              <TgRating :score="4.9" />
              <span class="fw-bold hero-text">{{ $t('hero.rating') }}</span>
              <span class="hero-text-muted small">({{ $t('hero.ratingCount') }})</span>
            </div>
            <span class="hero-text-muted d-none d-sm-inline">|</span>
            <span class="fw-semibold hero-highlight">
              <i class="bi bi-check-circle-fill me-1"></i>{{ $t('hero.installations') }}
            </span>
          </div>

          <div class="mb-4" data-aos="fade-up" data-aos-delay="300">
            <TgButton variant="cta" size="lg" icon="arrow-right" icon-position="end" @click="goToContact">
              {{ $t('hero.cta') }}
            </TgButton>
          </div>

          <div class="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="400">
            <span v-for="(label, key) in badges" :key="key" class="tg-badge tg-badge--primary">
              <i :class="badgeIcons[key]"></i>
              {{ label }}
            </span>
          </div>
        </div>

        <div class="col-lg-5 d-none d-lg-block"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import TgButton from '@/components/ui/TgButton.vue'
  import TgRating from '@/components/ui/TgRating.vue'

  const { t, locale } = useI18n()
  const router = useRouter()

  const badges = computed(() => t('hero.badges', {}, { returnObjects: true }))

  const badgeIcons = {
    funded: 'bi bi-check-circle',
    noCost: 'bi bi-cash-stack',
    noBureaucracy: 'bi bi-file-earmark-check',
    official: 'bi bi-building-check',
    supervised: 'bi bi-shield-check'
  }

  function goToContact() {
    const path = locale.value === 'es' ? '/es/contacto' : '/en/contact'
    router.push(path)
  }
</script>

<style lang="scss" scoped>
  .hero-section {
    min-height: 100vh;
    background: url('/images/hero-bg.png') center center / cover no-repeat;
    padding-top: 6rem;
    overflow: hidden;
    position: relative;

    @media (max-width: 991.98px) {
      min-height: auto;
      padding-top: 7rem;
      padding-bottom: 3rem;
    }
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.45) 50%,
      rgba(0, 0, 0, 0.55) 100%
    );
    z-index: 1;
  }

  .hero-title {
    font-size: 3.25rem;
    line-height: 1.15;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 991.98px) {
      font-size: 2.25rem;
    }

    @media (max-width: 575.98px) {
      font-size: 1.875rem;
    }
  }

  .hero-subtitle {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  .hero-text {
    color: #fff;
  }

  .hero-text-muted {
    color: rgba(255, 255, 255, 0.7);
  }

  .hero-highlight {
    color: #69F0AE;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  :deep(.tg-badge) {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff !important;
  }
</style>
