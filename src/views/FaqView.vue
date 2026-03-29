<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="text-center mb-5">
            <h1 class="mb-3">{{ $t('faq.sectionTitle') }}</h1>
            <p class="lead text-muted">{{ $t('faq.sectionSubtitle') }}</p>
          </div>

          <TgAccordion :items="faqItems" accordion-id="faqPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TgAccordion from '@/components/ui/TgAccordion.vue'

  const { t } = useI18n()
  const faqItems = computed(() => t('faq.items', {}, { returnObjects: true }))
</script>
