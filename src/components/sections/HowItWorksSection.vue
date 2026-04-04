<template>
  <section id="how-it-works" class="tg-section-alt">
    <div class="container">
      <TgSectionHeader
        :tag="$t('howItWorks.sectionTag')"
        :title="$t('howItWorks.sectionTitle')"
        :subtitle="$t('howItWorks.sectionSubtitle')"
      />

      <div class="row g-4 mb-5">
        <div
          v-for="(step, index) in steps"
          :key="step.key"
          class="col-12 col-md-6"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="tg-step-card">
            <div class="tg-step-number">{{ index + 1 }}</div>
            <h3 class="tg-card-title">{{ $t(`howItWorks.steps.${step.key}.title`) }}</h3>
            <p class="tg-card-text mb-2">{{ $t(`howItWorks.steps.${step.key}.description`) }}</p>
            <p class="small text-success fw-medium mb-0">
              <i class="bi bi-check2 me-1"></i>
              {{ $t(`howItWorks.steps.${step.key}.summary`) }}
            </p>
          </div>
        </div>
      </div>

      <div class="tg-result-box" data-aos="fade-up">
        <i class="bi bi-check-circle me-2"></i>
        {{ $t('howItWorks.result') }}
      </div>

      <div class="text-center mt-4" data-aos="fade-up">
        <a
          href="https://www.miteco.gob.es/es/calidad-y-evaluacion-ambiental/planes-y-estrategias/plan-de-ahorro-y-eficiencia-energetica-paee"
          target="_blank"
          rel="noopener noreferrer"
          class="text-success fw-medium text-decoration-none"
        >
          <i class="bi bi-box-arrow-up-right me-1"></i>
          {{ $t('howItWorks.legalLink') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'

  const steps = [
    { key: 'step1' },
    { key: 'step2' },
    { key: 'step3' },
    { key: 'step4' }
  ]
</script>
