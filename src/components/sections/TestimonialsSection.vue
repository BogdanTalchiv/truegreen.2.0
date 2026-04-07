<template>
  <section id="testimonials" class="testi-section">
    <!-- Background layers -->
    <div class="testi-bg" :style="{ backgroundImage: `url('${bgSrc}')` }"></div>
    <div class="testi-overlay"></div>

    <div class="container testi-content">
      <!-- Header -->
      <div class="text-center mb-5" data-aos="fade-up">
        <span class="testi-tag">{{ $t('testimonials.sectionTag') }}</span>
        <h2 class="testi-title">{{ $t('testimonials.sectionTitle') }}</h2>
        <p class="testi-subtitle">{{ $t('testimonials.sectionSubtitle') }}</p>
      </div>

      <div class="row g-4 align-items-stretch">
        <!-- Google Rating Card -->
        <div class="col-12 col-lg-4 order-1 order-lg-0" data-aos="fade-up">
          <div class="rating-card h-100 text-center d-flex flex-column justify-content-center align-items-center">
            <div class="rating-badge mb-3">
              <i class="bi bi-google"></i>
            </div>
            <h3 class="fw-bold mb-1 text-dark">{{ $t('testimonials.verifiedTitle') }}</h3>
            <p class="text-muted small mb-3">{{ $t('testimonials.verifiedSubtitle') }}</p>
            <div class="display-3 fw-bold text-success mb-1">4.9<span class="fs-4 text-muted">/5</span></div>
            <div class="mb-2">
              <TgRating :score="4.9" />
            </div>
            <p class="text-muted small mb-4">{{ $t('testimonials.basedOn') }}</p>
            <a
              href="https://www.google.com/search?q=TrueGreen+Energy"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-tg-secondary btn-sm"
            >
              <i class="bi bi-box-arrow-up-right me-1"></i>
              {{ $t('testimonials.viewOnGoogle') }}
            </a>
          </div>
        </div>

        <!-- Testimonial Cards -->
        <div class="col-12 col-lg-8 order-0 order-lg-1">
          <div class="row g-3">
            <div
              v-for="(review, index) in reviewsList"
              :key="index"
              class="col-12 col-sm-6"
              :class="{
                'd-none d-md-block': index >= 2 && index < 4,
                'd-none d-lg-block': index >= 4
              }"
              data-aos="fade-up"
              :data-aos-delay="index * 80"
            >
              <div class="testimonial-card h-100">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="testimonial-avatar">{{ getInitials(review.name) }}</div>
                  <div class="min-w-0">
                    <div class="fw-semibold text-dark text-truncate">{{ review.name }}</div>
                    <div class="text-muted" style="font-size:0.78rem">{{ review.date }}</div>
                  </div>
                </div>
                <div class="mb-2">
                  <TgRating :score="review.rating" />
                </div>
                <p class="testimonial-text mb-0">"{{ review.text }}"</p>
              </div>
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
  import { getInitials } from '@/utils/helpers'
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'
  import TgRating from '@/components/ui/TgRating.vue'

  const { tm, rt } = useI18n()

  const bgSrc = `${import.meta.env.BASE_URL}images/recenzii.png`

  const reviewsList = computed(() => {
    const raw = tm('testimonials.reviews')
    if (!Array.isArray(raw)) return []
    return raw.map((review) => ({
      name: rt(review.name),
      date: rt(review.date),
      text: rt(review.text),
      rating: Number(review.rating) || 5
    }))
  })
</script>

<style lang="scss" scoped>
  /* ── Section shell ── */
  .testi-section {
    position: relative;
    padding: 6rem 0 5rem;
    isolation: isolate;
  }

  /* ── Background photo ── */
  .testi-bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* ── Dark overlay for readability ── */
  .testi-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.75) 100%),
      linear-gradient(135deg, rgba(5,20,8,0.55) 0%, rgba(10,40,15,0.45) 100%);
  }

  /* ── Content ── */
  .testi-content { position: relative; }

  /* ── Header ── */
  .testi-tag {
    display: inline-block;
    background: rgba(76,175,80,0.22);
    border: 1px solid rgba(76,175,80,0.45);
    color: #a5d6a7;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    margin-bottom: 1rem;
  }

  .testi-title {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.875rem;
    line-height: 1.2;
  }

  .testi-subtitle {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.78);
    max-width: 580px;
    margin: 0 auto;
    line-height: 1.65;
  }

  /* ── Google Rating card ── */
  .rating-card {
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(4px);
    border-radius: 20px;
    padding: 2.25rem 1.75rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    border: 1px solid rgba(255,255,255,0.9);

    @media (max-width: 991.98px) { padding: 1.75rem 1.5rem; }
    @media (max-width: 575.98px) { padding: 1.5rem 1.25rem; }
  }

  .rating-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f1f3f4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #4285F4;
    flex-shrink: 0;
  }

  /* ── Testimonial cards ── */
  .testimonial-card {
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(4px);
    border-radius: 16px;
    padding: 1.4rem;
    border: 1px solid rgba(255,255,255,0.85);
    box-shadow: 0 4px 20px rgba(0,0,0,0.14);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    will-change: transform;
    transform: translateZ(0);

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    @media (max-width: 575.98px) { padding: 1.1rem; }
  }

  .testimonial-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4caf50, #2e7d32);
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .testimonial-text {
    color: #424242;
    line-height: 1.6;
    font-style: italic;
    font-size: 0.9rem;

    @media (max-width: 575.98px) { font-size: 0.855rem; }
  }

  /* ── Mobile ── */
  @media (max-width: 575.98px) {
    .testi-section { padding: 4.5rem 0 4rem; }
  }
</style>
