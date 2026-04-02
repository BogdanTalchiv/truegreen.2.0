<template>
  <section id="solutions" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :tag="$t('solutions.sectionTag')"
        :title="$t('solutions.sectionTitle')"
        :subtitle="$t('solutions.sectionSubtitle')"
      />

      <!-- Before / After Groups -->
      <div class="row g-4 mb-5">
        <div class="col-12 col-lg-4" data-aos="fade-up">
          <div class="ba-group h-100">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-house-door me-2 text-success"></i>
              {{ locale === 'es' ? 'Aislamiento de Desván' : 'Attic Insulation' }}
            </h4>
            <TgBeforeAfter
              before-image="/images/avant-g.jpg"
              after-image="/images/apres-g.jpg"
              :before-label="$t('solutions.beforeAfter.before')"
              :after-label="$t('solutions.beforeAfter.after')"
            />
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="ba-group h-100">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-building me-2 text-success"></i>
              {{ locale === 'es' ? 'Aislamiento Interior' : 'Interior Insulation' }}
            </h4>
            <TgBeforeAfter
              before-image="/images/avant1-d.jpg"
              after-image="/images/apres1-d.jpg"
              :before-label="$t('solutions.beforeAfter.before')"
              :after-label="$t('solutions.beforeAfter.after')"
            />
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="ba-group h-100">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-thermometer-half me-2 text-success"></i>
              {{ locale === 'es' ? 'Resultado Final' : 'Final Result' }}
            </h4>
            <TgBeforeAfter
              before-image="/images/before.jpg"
              after-image="/images/after.jpg"
              :before-label="$t('solutions.beforeAfter.before')"
              :after-label="$t('solutions.beforeAfter.after')"
            />
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Centered Title & Description -->
      <div class="text-center mb-5" data-aos="fade-up">
        <h3 class="fw-bold mb-3">{{ $t('solutions.mainTitle') }}</h3>
        <p class="text-muted col-lg-7 col-md-9 mx-auto mb-0">{{ $t('solutions.mainDescription') }}</p>
      </div>

      <!-- Pyramid Category Cards -->
      <div class="pyramid-layout mb-5">
        <!-- Peak: Quick Installation -->
        <div class="row justify-content-center mb-4" data-aos="fade-up">
          <div class="col-12 col-sm-10 col-md-7 col-lg-5">
            <div class="solution-card solution-card--peak d-flex align-items-start gap-3">
              <div class="solution-icon flex-shrink-0">
                <i class="bi bi-lightning-charge"></i>
              </div>
              <div class="flex-grow-1">
                <h4 class="fw-semibold mb-2 fs-6">{{ $t('solutions.categories.installation.title') }}</h4>
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, i) in getCategoryItems('installation')"
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

        <!-- Base: Savings + Comfort -->
        <div class="row justify-content-center g-4" data-aos="fade-up" data-aos-delay="100">
          <div class="col-12 col-sm-6 col-lg-5">
            <div class="solution-card d-flex align-items-start gap-3 h-100">
              <div class="solution-icon flex-shrink-0">
                <i class="bi bi-piggy-bank"></i>
              </div>
              <div class="flex-grow-1">
                <h4 class="fw-semibold mb-2 fs-6">{{ $t('solutions.categories.savings.title') }}</h4>
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, i) in getCategoryItems('savings')"
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

          <div class="col-12 col-sm-6 col-lg-5">
            <div class="solution-card d-flex align-items-start gap-3 h-100">
              <div class="solution-icon flex-shrink-0">
                <i class="bi bi-shield-check"></i>
              </div>
              <div class="flex-grow-1">
                <h4 class="fw-semibold mb-2 fs-6">{{ $t('solutions.categories.comfort.title') }}</h4>
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, i) in getCategoryItems('comfort')"
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

      <!-- CTA Button -->
      <div class="text-center" data-aos="fade-up">
        <TgButton variant="cta" icon="arrow-right" icon-position="end" @click="goToContact">
          {{ $t('solutions.cta') }}
        </TgButton>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'
  import TgBeforeAfter from '@/components/ui/TgBeforeAfter.vue'
  import TgButton from '@/components/ui/TgButton.vue'

  const { tm, rt, locale } = useI18n()
  const router = useRouter()

  function getCategoryItems(key) {
    const messages = tm(`solutions.categories.${key}.items`)
    if (Array.isArray(messages)) {
      return messages.map((msg) => rt(msg))
    }
    return []
  }

  function goToContact() {
    const path = locale.value === 'es' ? '/es/contacto' : '/en/contact'
    router.push(path)
  }
</script>

<style lang="scss" scoped>
  .ba-group {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 1.5rem;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
  }

  .ba-group-title {
    font-size: 1.05rem;
    color: $tg-text-primary;
  }

  .pyramid-layout {
    max-width: 820px;
    margin-left: auto;
    margin-right: auto;
  }

  .solution-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 14px;
    padding: 1.5rem;
    transition: all 0.25s ease;

    &:hover {
      border-color: #4CAF50;
      box-shadow: 0 6px 24px rgba(46, 125, 50, 0.1);
      transform: translateY(-2px);
    }

    &--peak {
      border-color: rgba(46, 125, 50, 0.2);
      background: linear-gradient(135deg, rgba(46, 125, 50, 0.03), rgba(46, 125, 50, 0.06));
    }
  }

  .solution-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
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
