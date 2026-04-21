<template>
  <section id="solutions" class="tg-section">
    <div class="container">
      <TgSectionHeader
        :tag="$t('solutions.sectionTag')"
        :title="$t('solutions.sectionTitle')"
        :subtitle="$t('solutions.sectionSubtitle')"
      />

      <!-- Before / After Groups -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-4" data-aos="fade-up">
          <div class="ba-group">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-house-door me-2 text-success"></i>
              {{ locale === 'es' ? 'Aislamiento de Desván' : 'Attic Insulation' }}
            </h4>
            <div class="ba-wrap">
              <TgBeforeAfter
                before-image="/images/avant-g.jpg"
                after-image="/images/apres-g.jpg"
                :before-label="$t('solutions.beforeAfter.before')"
                :after-label="$t('solutions.beforeAfter.after')"
              />
            </div>
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="ba-group">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-building me-2 text-success"></i>
              {{ locale === 'es' ? 'Aislamiento Interior' : 'Interior Insulation' }}
            </h4>
            <div class="ba-wrap">
              <TgBeforeAfter
                before-image="/images/avant1-d.jpg"
                after-image="/images/apres1-d.jpg"
                :before-label="$t('solutions.beforeAfter.before')"
                :after-label="$t('solutions.beforeAfter.after')"
              />
            </div>
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div class="ba-group">
            <h4 class="ba-group-title fw-semibold mb-3">
              <i class="bi bi-thermometer-half me-2 text-success"></i>
              {{ locale === 'es' ? 'Resultado Final' : 'Final Result' }}
            </h4>
            <div class="ba-wrap">
              <TgBeforeAfter
                before-image="/images/before.jpg"
                after-image="/images/after.jpg"
                :before-label="$t('solutions.beforeAfter.before')"
                :after-label="$t('solutions.beforeAfter.after')"
              />
            </div>
            <p class="text-center text-muted small mt-2 mb-0">
              <i class="bi bi-arrows-expand me-1" style="transform: rotate(90deg); display: inline-block"></i>
              {{ $t('solutions.beforeAfter.hint') }}
            </p>
          </div>
        </div>
      </div>

      <!-- View All Gallery Button -->
      <div class="text-center mb-5" data-aos="fade-up">
        <TgButton variant="secondary" icon="images" @click="openGallery">
          {{ viewAllLabel }}
        </TgButton>
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
          <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
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
          <div class="col-12 col-sm-6 col-lg-6 col-xl-5">
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

          <div class="col-12 col-sm-6 col-lg-6 col-xl-5">
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

  <teleport to="body">
    <div v-if="isGalleryOpen" class="tg-gallery-overlay" @click.self="closeGallery">
      <div class="tg-gallery-modal" role="dialog" aria-modal="true" :aria-label="viewAllLabel">
        <button type="button" class="tg-gallery-close" @click="closeGallery" aria-label="Close">
          ✕
        </button>

        <div class="tg-gallery-header">
          <h4 class="fw-bold mb-1">{{ galleryTitle }}</h4>
          <p class="text-muted mb-0 small">{{ gallerySubtitle }}</p>
        </div>

        <div class="tg-gallery-grid" role="list">
          <div
            v-for="(img, idx) in galleryImages"
            :key="img.src"
            class="tg-gallery-item"
            :aria-label="img.alt"
            tabindex="0"
            role="button"
            @click="openImage(idx)"
            @keydown.enter.prevent="openImage(idx)"
            @keydown.space.prevent="openImage(idx)"
          >
            <img :src="img.src" :alt="img.alt" loading="lazy" @error="onImgError" />
          </div>
        </div>

        <div v-if="activeImage" class="tg-viewer-overlay" @click.self="closeImage">
          <button type="button" class="tg-viewer-close" @click="closeImage" aria-label="Close image">✕</button>

          <button
            type="button"
            class="tg-viewer-nav tg-viewer-nav--prev"
            @click="prevImage"
            aria-label="Previous image"
          >
            <i class="bi bi-chevron-left"></i>
          </button>

          <figure class="tg-viewer-figure">
            <img :src="activeImage.src" :alt="activeImage.alt" @error="onImgError" />
          </figure>

          <button
            type="button"
            class="tg-viewer-nav tg-viewer-nav--next"
            @click="nextImage"
            aria-label="Next image"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
  import { computed, onBeforeUnmount, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import TgSectionHeader from '@/components/ui/TgSectionHeader.vue'
  import TgBeforeAfter from '@/components/ui/TgBeforeAfter.vue'
  import TgButton from '@/components/ui/TgButton.vue'

  const { tm, rt, locale } = useI18n()
  const router = useRouter()

  const isGalleryOpen = ref(false)
  const activeIndex = ref(null)

  const viewAllLabel = computed(() => (locale.value === 'es' ? 'Ver todo' : 'View All'))
  const galleryTitle = computed(() => (locale.value === 'es' ? 'Galería de Resultados' : 'Results Gallery'))
  const galleryImageFiles = [
    'img8.JPG',
    'img2.JPG',
    'img3.JPG',
    'img1.JPG',
    'img4.JPG',
    'img5.JPG',
    'img6.JPG',
    'img7.JPG',
    'img9.JPG',
    'img10.JPG',
    'img11.JPG',
    'img12.JPG'
  ]

  const galleryImages = computed(() =>
    galleryImageFiles.map((file, i) => ({
      src: `/images/${file}`,
      alt: `Gallery image ${i + 1}`
    }))
  )

  const gallerySubtitle = computed(() => {
    const count = galleryImages.value.length
    return locale.value === 'es'
      ? `${count} fotos (antes/después y trabajos terminados)`
      : `${count} photos (before/after & completed work)`
  })

  const activeImage = computed(() => {
    const i = activeIndex.value
    if (typeof i !== 'number') return null
    return galleryImages.value[i] || null
  })

  function getCategoryItems(key) {
    const messages = tm(`solutions.categories.${key}.items`)
    if (Array.isArray(messages)) {
      return messages.map((msg) => rt(msg))
    }
    return []
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (activeIndex.value !== null) closeImage()
      else closeGallery()
    }
    if (activeIndex.value !== null) {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
  }

  function onImgError(e) {
    const el = e?.target
    if (!el || el.dataset?.fallback === '1') return
    el.dataset.fallback = '1'
    el.src = '/images/vector.png'
  }

  function openGallery() {
    isGalleryOpen.value = true
  }

  function closeGallery() {
    isGalleryOpen.value = false
    activeIndex.value = null
  }

  function openImage(idx) {
    activeIndex.value = idx
  }

  function closeImage() {
    activeIndex.value = null
  }

  function nextImage() {
    const total = galleryImages.value.length
    if (!total) return
    const cur = typeof activeIndex.value === 'number' ? activeIndex.value : 0
    activeIndex.value = (cur + 1) % total
  }

  function prevImage() {
    const total = galleryImages.value.length
    if (!total) return
    const cur = typeof activeIndex.value === 'number' ? activeIndex.value : 0
    activeIndex.value = (cur - 1 + total) % total
  }

  function goToContact() {
    const path = locale.value === 'es' ? '/es/contacto' : '/en/contact'
    router.push(path)
  }

  watch(isGalleryOpen, (open) => {
    if (typeof window === 'undefined') return
    if (open) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  })
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

    @media (min-width: 992px)  { max-width: 1000px; }
    @media (min-width: 1200px) { max-width: 1120px; }
  }

  /* On desktop make the slider a touch taller (no width change) */
  .ba-wrap {
    /* default – keep the 16/10 ratio from TgBeforeAfter */

    @media (min-width: 992px) {
      /* Force a 4/3 container so height increases without touching width */
      :deep(.ba-container) { aspect-ratio: 4 / 3; }
    }
  }

  .solution-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 14px;
    padding: 1.5rem;
    transition: all 0.25s ease;
    will-change: transform;
    transform: translateZ(0);

    &:hover {
      border-color: #4CAF50;
      box-shadow: 0 6px 24px rgba(46, 125, 50, 0.1);
      transform: translate3d(0, -2px, 0);
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

  .tg-gallery-overlay {
    position: fixed;
    inset: 0;
    z-index: 1100;
    background: rgba(10, 12, 16, 0.55);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .tg-gallery-modal {
    width: min(980px, 100%);
    max-height: min(82vh, 820px);
    overflow: auto;
    position: relative;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid rgba(233, 236, 239, 0.9);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    padding: 1.25rem;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
  }

  .tg-gallery-close {
    position: sticky;
    top: 0;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid #e9ecef;
    background: rgba(255, 255, 255, 0.9);
    color: #111827;
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

    &:hover {
      background: #ffffff;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-1px);
    }
  }

  .tg-gallery-header {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding-right: 2.75rem;
  }

  .tg-gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;

    @media (min-width: 576px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 992px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .tg-gallery-item {
    display: block;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e9ecef;
    background: #f8f9fa;
    cursor: zoom-in;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: rgba(76, 175, 80, 0.5);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
    }

    &:focus-visible {
      outline: 3px solid rgba(76, 175, 80, 0.4);
      outline-offset: 3px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }

  .tg-viewer-overlay {
    position: fixed;
    inset: 0;
    z-index: 1200;
    background: rgba(10, 12, 16, 0.72);
    backdrop-filter: blur(2px);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
  }

  .tg-viewer-figure {
    margin: 0;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tg-viewer-figure img {
    max-width: min(1100px, 92vw);
    max-height: 82vh;
    width: auto;
    height: auto;
    border-radius: 16px;
    border: 1px solid rgba(233, 236, 239, 0.25);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
    background: rgba(255, 255, 255, 0.03);
  }

  .tg-viewer-close {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1201;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid rgba(233, 236, 239, 0.25);
    background: rgba(17, 24, 39, 0.55);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      background: rgba(17, 24, 39, 0.72);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      transform: translateY(-1px);
    }
  }

  .tg-viewer-nav {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid rgba(233, 236, 239, 0.25);
    background: rgba(17, 24, 39, 0.55);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      background: rgba(17, 24, 39, 0.72);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      transform: translateY(-1px);
    }

    i {
      font-size: 1.25rem;
      line-height: 1;
    }
  }

  @media (max-width: 575.98px) {
    .tg-viewer-overlay {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      align-items: center;
      justify-items: center;
      padding: 0.75rem;
    }

    .tg-viewer-nav {
      position: fixed;
      bottom: 16px;
    }

    .tg-viewer-nav--prev {
      left: 16px;
    }

    .tg-viewer-nav--next {
      right: 16px;
    }
  }
</style>
