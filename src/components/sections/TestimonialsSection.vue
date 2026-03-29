<template>
  <section id="testimonials" class="tg-section-alt">
    <div class="container">
      <TgSectionHeader
        :tag="$t('testimonials.sectionTag')"
        :title="$t('testimonials.sectionTitle')"
        :subtitle="$t('testimonials.sectionSubtitle')"
      />

      <div class="row g-4">
        <!-- Google Rating Card -->
        <div class="col-12 col-lg-4 order-1 order-lg-0" data-aos="fade-up">
          <div class="rating-card h-100 text-center d-flex flex-column justify-content-center align-items-center">
            <div class="rating-badge mb-3">
              <i class="bi bi-google"></i>
            </div>
            <h3 class="fw-bold mb-1">{{ $t('testimonials.verifiedTitle') }}</h3>
            <p class="text-muted small mb-3">{{ $t('testimonials.verifiedSubtitle') }}</p>
            <div class="display-3 fw-bold text-success mb-1">4.9<span class="fs-4 text-muted">/5</span></div>
            <div class="mb-2">
              <TgRating :score="4.9" />
            </div>
            <p class="text-muted small mb-4">{{ $t('testimonials.basedOn') }}</p>
            <a
              href="https://www.google.com/search?q=TrueGreen"
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
              :class="{ 'd-none d-md-block': index >= 2 && index < 4, 'd-none d-lg-block': index >= 4 }"
              data-aos="fade-up"
              :data-aos-delay="index * 80"
            >
              <div class="testimonial-card h-100">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="testimonial-avatar">
                    {{ getInitials(review.name) }}
                  </div>
                  <div>
                    <div class="fw-semibold">{{ review.name }}</div>
                    <div class="text-muted" style="font-size: 0.8rem">{{ review.date }}</div>
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
  .rating-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
    border: 1px solid #e9ecef;

    @media (max-width: 991.98px) {
      padding: 2rem 1.5rem;
    }
  }

  .rating-badge {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #4285F4;
  }

  .testimonial-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e9ecef;
    transition: all 0.25s ease;

    &:hover {
      border-color: #4CAF50;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transform: translateY(-2px);
    }

    @media (max-width: 575.98px) {
      padding: 1.25rem;
    }
  }

  .testimonial-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
    color: white;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .testimonial-text {
    color: #616161;
    line-height: 1.6;
    font-style: italic;
    font-size: 0.9375rem;

    @media (max-width: 575.98px) {
      font-size: 0.875rem;
    }
  }
</style>
