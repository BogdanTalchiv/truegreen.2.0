<template>
  <section class="contact-qa tg-section-alt">
    <div class="container">
      <div class="qa-shell" data-aos="fade-up">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-12 col-lg-5">
            <span class="qa-eyebrow">{{ $t('contactPage.qa.eyebrow') }}</span>
            <h2 class="qa-title">{{ $t('contactPage.qa.title') }}</h2>
            <p class="qa-lead">{{ $t('contactPage.qa.lead') }}</p>
            <ul class="qa-list list-unstyled mb-0">
              <li v-for="(item, i) in checklist" :key="i" class="qa-list-item">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-7">
            <div class="qa-panels">
              <div class="qa-panel" data-aos="fade-up" data-aos-delay="80">
                <div class="qa-panel-icon">
                  <i class="bi bi-shield-lock"></i>
                </div>
                <h3 class="qa-panel-title">{{ $t('contactPage.qa.panel1Title') }}</h3>
                <p class="qa-panel-text mb-0">{{ $t('contactPage.qa.panel1Body') }}</p>
              </div>
              <div class="qa-panel qa-panel--accent" data-aos="fade-up" data-aos-delay="140">
                <div class="qa-panel-icon qa-panel-icon--light">
                  <i class="bi bi-clipboard2-check"></i>
                </div>
                <h3 class="qa-panel-title text-white">{{ $t('contactPage.qa.panel2Title') }}</h3>
                <p class="qa-panel-text text-white-75 mb-0">{{ $t('contactPage.qa.panel2Body') }}</p>
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

  const { tm, rt } = useI18n()

  const checklist = computed(() => {
    const raw = tm('contactPage.qa.checklist')
    if (!Array.isArray(raw)) return []
    return raw.map((item) => rt(item))
  })
</script>

<style lang="scss" scoped>
  .qa-shell {
    background: linear-gradient(145deg, #f6faf7 0%, #eef5f0 45%, #e8f0eb 100%);
    border: 1px solid rgba(46, 125, 50, 0.14);
    border-radius: 24px;
    padding: 2.5rem 1.75rem;
    box-shadow: 0 24px 60px rgba(13, 59, 15, 0.08);

    @media (min-width: 992px) {
      padding: 3rem 3rem;
    }
  }

  .qa-eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $tg-primary;
    margin-bottom: 0.75rem;
  }

  .qa-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: $tg-text-primary;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .qa-lead {
    color: #5a635e;
    font-size: 1rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }

  .qa-list-item {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    font-size: 0.95rem;
    color: #3d4540;
    margin-bottom: 0.65rem;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .qa-panels {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .qa-panel {
    background: #fff;
    border-radius: 18px;
    padding: 1.75rem;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.05);

    &--accent {
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      border-color: transparent;
      box-shadow: 0 18px 48px rgba(27, 94, 32, 0.35);
    }
  }

  .qa-panel-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 1rem;

    &--light {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
  }

  .qa-panel-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: $tg-text-primary;
  }

  .qa-panel-text {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #5c6560;
  }

  .text-white-75 {
    color: rgba(255, 255, 255, 0.82);
  }
</style>
