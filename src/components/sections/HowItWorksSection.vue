<template>
  <!--
    Full-bleed section: howitworks.jpg is the background; dark gradient overlay
    keeps every text element readable regardless of image brightness.
  -->
  <section id="how-it-works" class="hiw-section">
    <!-- Background layers -->
    <div class="hiw-bg" :style="{ backgroundImage: `url('${imgSrc}')` }"></div>
    <div class="hiw-overlay"></div>

    <div class="container hiw-content">
      <!-- Header -->
      <div class="text-center mb-5 hiw-header" data-aos="fade-up">
        <span class="hiw-tag">{{ $t('howItWorks.sectionTag') }}</span>
        <h2 class="hiw-title">{{ $t('howItWorks.sectionTitle') }}</h2>
        <p class="hiw-subtitle">{{ $t('howItWorks.sectionSubtitle') }}</p>
      </div>

      <!-- Step cards -->
      <div class="row g-4 mb-5">
        <div
          v-for="(step, index) in steps"
          :key="step.key"
          class="col-12 col-sm-6 col-xl-3"
          data-aos="fade-up"
          :data-aos-delay="index * 120"
        >
          <div class="hiw-card h-100">
            <div class="hiw-number">{{ index + 1 }}</div>
            <h3 class="hiw-card-title">{{ $t(`howItWorks.steps.${step.key}.title`) }}</h3>
            <p class="hiw-card-text">{{ $t(`howItWorks.steps.${step.key}.description`) }}</p>
            <p class="hiw-card-summary mb-0">
              <i class="bi bi-check2 me-1"></i>
              {{ $t(`howItWorks.steps.${step.key}.summary`) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Result banner -->
      <div class="hiw-result" data-aos="fade-up">
        <i class="bi bi-check-circle-fill me-2"></i>
        {{ $t('howItWorks.result') }}
      </div>

      <!-- Legal link -->
      <div class="text-center mt-4" data-aos="fade-up">
        <a
          href="https://www.miteco.gob.es/es/calidad-y-evaluacion-ambiental/planes-y-estrategias/plan-de-ahorro-y-eficiencia-energetica-paee"
          target="_blank"
          rel="noopener noreferrer"
          class="hiw-legal-link"
        >
          <i class="bi bi-box-arrow-up-right me-1"></i>
          {{ $t('howItWorks.legalLink') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()
  void locale // referenced for reactivity

  const imgSrc = `${import.meta.env.BASE_URL}images/howitworks.jpg`

  const steps = [
    { key: 'step1' },
    { key: 'step2' },
    { key: 'step3' },
    { key: 'step4' }
  ]
</script>

<style lang="scss" scoped>
  /* ── Section shell ── */
  .hiw-section {
    position: relative;
    padding: 6rem 0 5rem;
    isolation: isolate;
  }

  /* ── Photo background ── */
  .hiw-bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* ── Dark gradient overlay — left heavier so text is always legible ── */
  .hiw-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      135deg,
      rgba(10, 30, 12, 0.88) 0%,
      rgba(10, 30, 12, 0.78) 50%,
      rgba(10, 30, 12, 0.65) 100%
    );
  }

  /* ── Content sits above the overlays ── */
  .hiw-content {
    position: relative;
  }

  /* ── Header typography ── */
  .hiw-header {}

  .hiw-tag {
    display: inline-block;
    background: rgba(76, 175, 80, 0.22);
    border: 1px solid rgba(76, 175, 80, 0.5);
    color: #a5d6a7;
    font-weight: 600;
    font-size: 0.82rem;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 1rem;
  }

  .hiw-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hiw-subtitle {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.78);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.65;
  }

  /* ── Step cards ── */
  /*
   * Blur fix: backdrop-filter combined with a translateY() transition causes
   * subpixel jitter because the browser must re-composite two GPU layers each
   * frame. Solution: remove backdrop-filter entirely and use a solid
   * semi-transparent fill that doesn't require compositing. The card is
   * pre-promoted to its own layer via will-change so the hover transform is
   * always crisp.
   */
  .hiw-card {
    background: rgba(10, 35, 12, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 18px;
    padding: 1.75rem 1.5rem;
    /* Pre-promote layer so hover transform never triggers a re-composite */
    will-change: transform;
    transform: translate3d(0, 0, 0);
    transition: background 0.22s ease, border-color 0.22s ease,
                transform 0.22s ease, box-shadow 0.22s ease;

    &:hover {
      background: rgba(30, 70, 35, 0.72);
      border-color: rgba(165, 214, 167, 0.3);
      transform: translate3d(0, -5px, 0);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
    }
  }

  .hiw-number {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4caf50, #2e7d32);
    color: #fff;
    font-weight: 800;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    box-shadow: 0 4px 14px rgba(46, 125, 50, 0.5);
  }

  .hiw-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.6rem;
  }

  .hiw-card-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .hiw-card-summary {
    font-size: 0.82rem;
    font-weight: 600;
    color: #a5d6a7;
  }

  /* ── Result banner ── */
  .hiw-result {
    background: rgba(30, 80, 35, 0.65);
    border: 1px solid rgba(76, 175, 80, 0.4);
    border-radius: 14px;
    padding: 1.25rem 2rem;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.975rem;
    line-height: 1.6;
    text-align: center;
  }

  /* ── Legal link ── */
  .hiw-legal-link {
    color: #a5d6a7;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover { color: #c8e6c9; text-decoration: underline; }
  }
</style>
