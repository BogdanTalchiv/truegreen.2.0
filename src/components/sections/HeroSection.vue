<template>
  <section id="hero" class="hero-section d-flex align-items-center position-relative">
    <video
      class="hero-video"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    >
      <source src="/images/hero-video.mp4" type="video/mp4" />
    </video>
    <div class="hero-overlay"></div>

    <div class="container position-relative" style="z-index: 2">
      <div class="row align-items-center">
        <div class="col-12 col-lg-8 text-center text-lg-start">
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

          <!-- Badge Cards -->
          <div class="hero-badges" data-aos="fade-up" data-aos-delay="400">
            <div class="badge-grid">
              <div v-for="badge in badgeItems" :key="badge.key" class="badge-card">
                <i :class="badge.icon" class="badge-card-icon"></i>
                <span class="badge-card-text">{{ badge.label }}</span>
              </div>
            </div>
            <button class="hero-how-link" @click="goToContact">
              {{ $t('hero.howPossible') }}
              <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
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

  const { tm, rt, locale } = useI18n()
  const router = useRouter()

  const icons = {
    funded: 'bi bi-patch-check-fill',
    noCost: 'bi bi-wallet2',
    noBureaucracy: 'bi bi-file-earmark-check-fill',
    official: 'bi bi-bank2',
    supervised: 'bi bi-shield-fill-check'
  }

  const badgeItems = computed(() => {
    const msgs = tm('hero.badges')
    if (typeof msgs === 'object' && msgs !== null) {
      return Object.entries(msgs).map(([key, msg]) => ({
        key,
        label: rt(msg),
        icon: icons[key] || 'bi bi-check-circle-fill'
      }))
    }
    return []
  })

  function goToContact() {
    const path = locale.value === 'es' ? '/es/contacto' : '/en/contact'
    router.push(path)
  }
</script>

<style lang="scss" scoped>
  .hero-section {
    min-height: 100vh;
    padding-top: 6rem;
    overflow: hidden;
    position: relative;
    background: #0a1a0a;

    @media (max-width: 991.98px) {
      min-height: auto;
      padding-top: 7rem;
      padding-bottom: 3rem;
    }
  }

  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }

  .hero-title {
    font-size: clamp(1.65rem, 5vw, 3.25rem);
    line-height: 1.15;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    word-break: break-word;
    hyphens: auto;
  }

  .hero-subtitle {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);

    @media (max-width: 575.98px) {
      font-size: 0.95rem;
    }
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

  // ─── Badge Cards ───
  .hero-badges {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;

    @media (max-width: 991.98px) {
      align-items: center;
    }
  }

  .badge-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;

    @media (max-width: 991.98px) {
      justify-content: center;
    }

    @media (max-width: 575.98px) {
      gap: 0.4rem;
    }
  }

  .badge-card {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 0.85rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    @media (max-width: 575.98px) {
      padding: 0.4rem 0.65rem;
    }
  }

  .badge-card-icon {
    color: #69F0AE;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .badge-card-text {
    color: #fff;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    white-space: normal;       /* allow wrapping on tiny screens */
    word-break: break-word;

    @media (max-width: 575.98px) {
      font-size: 0.72rem;
    }
  }

  .hero-how-link {
    background: none;
    border: none;
    color: #69F0AE;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
    align-items: center;
    transition: all 0.2s ease;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: #fff;
      gap: 0.25rem;
    }
  }
</style>
