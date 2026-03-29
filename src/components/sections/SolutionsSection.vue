<template>
  <section id="solutions" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :tag="$t('solutions.sectionTag')"
        :title="$t('solutions.sectionTitle')"
        :subtitle="$t('solutions.sectionSubtitle')"
      />

      <div class="row align-items-center g-4 mb-5">
        <!-- Before / After Slider -->
        <div class="col-12 col-lg-6" data-aos="fade-up">
          <TgBeforeAfter
            before-image="/images/before.jpg"
            after-image="/images/after.jpg"
            :before-label="$t('solutions.beforeAfter.before')"
            :after-label="$t('solutions.beforeAfter.after')"
          />
          <p class="text-center text-muted small mt-2">
            <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
            {{ $t('solutions.beforeAfter.hint') }}
          </p>
        </div>

        <!-- Category cards -->
        <div class="col-12 col-lg-6">
          <h3 class="fw-bold mb-2" data-aos="fade-up">{{ $t('solutions.mainTitle') }}</h3>
          <p class="text-muted mb-4" data-aos="fade-up">{{ $t('solutions.mainDescription') }}</p>

          <div class="d-flex flex-column gap-3">
            <div
              v-for="(cat, index) in categories"
              :key="cat.key"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <div class="solution-card d-flex align-items-start gap-3">
                <div class="solution-icon flex-shrink-0">
                  <i :class="cat.icon"></i>
                </div>
                <div class="flex-grow-1">
                  <h4 class="fw-semibold mb-2 fs-6">{{ $t(`solutions.categories.${cat.key}.title`) }}</h4>
                  <ul class="list-unstyled mb-0">
                    <li
                      v-for="(item, i) in getCategoryItems(cat.key)"
                      :key="i"
                      class="solution-item d-flex align-items-start gap-2 mb-1"
                    >
                      <i class="bi bi-check-circle-fill text-success flex-shrink-0 mt-1" style="font-size: 0.75rem"></i>
                      <span class="text-muted small">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" data-aos="fade-up">
        <TgButton variant="cta" icon="arrow-right" icon-position="end" @click="scrollToContact">
          {{ $t('solutions.cta') }}
        </TgButton>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSmoothScroll } from '@/composables/useSmoothScroll'
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'
  import TgBeforeAfter from '@/components/ui/TgBeforeAfter.vue'
  import TgButton from '@/components/ui/TgButton.vue'

  const { tm, rt } = useI18n()
  const { scrollTo } = useSmoothScroll()

  const categories = [
    { key: 'savings', icon: 'bi bi-piggy-bank' },
    { key: 'comfort', icon: 'bi bi-shield-check' },
    { key: 'installation', icon: 'bi bi-lightning-charge' }
  ]

  function getCategoryItems(key) {
    const messages = tm(`solutions.categories.${key}.items`)
    if (Array.isArray(messages)) {
      return messages.map((msg) => rt(msg))
    }
    return []
  }

  function scrollToContact() {
    scrollTo('contact')
  }
</script>

<style lang="scss" scoped>
  .solution-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 1.25rem;
    transition: all 0.25s ease;

    &:hover {
      border-color: #4CAF50;
      box-shadow: 0 4px 16px rgba(46, 125, 50, 0.08);
      transform: translateY(-2px);
    }
  }

  .solution-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
  }

  .solution-item {
    line-height: 1.4;
  }
</style>
