<template>
  <section id="why-us" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :title="$t('whyUs.sectionTitle')"
        :highlight="$t('whyUs.sectionTitleHighlight')"
        :subtitle="$t('whyUs.sectionSubtitle')"
      />

      <div class="row g-4">
        <div
          v-for="(card, index) in cards"
          :key="card.key"
          class="col-12 col-md-6 col-xl-3"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="tg-card h-100">
            <div class="tg-card-icon">
              <i :class="card.icon"></i>
            </div>
            <h3 class="tg-card-title">{{ $t(`whyUs.cards.${card.key}.title`) }}</h3>
            <p class="tg-card-text">{{ $t(`whyUs.cards.${card.key}.description`) }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-5 py-3 border-top border-bottom" data-aos="fade-up">
        <p class="mb-0 text-muted fw-medium">
          <i class="bi bi-shield-check me-2 text-success"></i>
          {{ $t('whyUs.officialProgram') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'

  const cards = [
    { key: 'experience', icon: 'bi bi-buildings' },
    { key: 'guarantee', icon: 'bi bi-patch-check' },
    { key: 'team', icon: 'bi bi-people' },
    { key: 'peace', icon: 'bi bi-shield-lock' }
  ]
</script>
