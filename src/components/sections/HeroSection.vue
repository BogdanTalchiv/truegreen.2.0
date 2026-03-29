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

          <p class="lead mb-4" data-aos="fade-up" data-aos-delay="100">
            {{ $t('hero.subtitle') }}
          </p>

          <div class="d-flex flex-wrap align-items-center gap-3 mb-4 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="200">
            <div class="d-flex align-items-center gap-2">
              <TgRating :score="4.9" />
              <span class="fw-bold">{{ $t('hero.rating') }}</span>
              <span class="text-muted small">({{ $t('hero.ratingCount') }})</span>
            </div>
            <span class="text-muted d-none d-sm-inline">|</span>
            <span class="fw-semibold text-success">
              <i class="bi bi-check-circle-fill me-1"></i>{{ $t('hero.installations') }}
            </span>
          </div>

          <div class="mb-4" data-aos="fade-up" data-aos-delay="300">
            <TgButton variant="cta" size="lg" icon="arrow-right" icon-position="end" @click="scrollToContact">
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

        <div class="col-lg-5 d-none d-lg-flex justify-content-center" data-aos="fade-in" data-aos-delay="300">
          <div class="hero-illustration">
            <div class="hero-image-placeholder">
              <i class="bi bi-house-heart display-1 text-success"></i>
              <p class="mt-3 fw-semibold text-success">TrueGreen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useSmoothScroll } from '@/composables/useSmoothScroll'
  import TgButton from '@/components/ui/TgButton.vue'
  import TgRating from '@/components/ui/TgRating.vue'

  const { t } = useI18n()
  const { scrollTo } = useSmoothScroll()

  const badges = computed(() => t('hero.badges', {}, { returnObjects: true }))

  const badgeIcons = {
    funded: 'bi bi-check-circle',
    noCost: 'bi bi-cash-stack',
    noBureaucracy: 'bi bi-file-earmark-check',
    official: 'bi bi-building-check',
    supervised: 'bi bi-shield-check'
  }

  function scrollToContact() {
    scrollTo('contact')
  }
</script>

<style lang="scss" scoped>
  .hero-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 50%, #f1f8f6 100%);
    padding-top: 6rem;
    overflow: hidden;

    @media (max-width: 991.98px) {
      min-height: auto;
      padding-top: 7rem;
      padding-bottom: 3rem;
    }
  }

  .hero-title {
    font-size: 3.25rem;
    line-height: 1.15;

    @media (max-width: 991.98px) {
      font-size: 2.25rem;
    }

    @media (max-width: 575.98px) {
      font-size: 1.875rem;
    }
  }

  .hero-illustration {
    width: 100%;
    max-width: 420px;
  }

  .hero-image-placeholder {
    aspect-ratio: 1;
    background: rgba($tg-primary, 0.05);
    border-radius: 24px;
    border: 2px dashed rgba($tg-primary, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
