<template>
  <div>
    <HeroSection />

    <WhyUsSection />
    <HowItWorksSection />
    <SolutionsSection />
    <TestimonialsSection />

    <!-- Stats Bar -->
    <section class="home-stats" data-aos="fade-up">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-6 col-md-3">
            <div class="home-stat">
              <div class="home-stat-number">1.500+</div>
              <div class="home-stat-label">{{ locale === 'es' ? 'Instalaciones' : 'Installations' }}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="home-stat">
              <div class="home-stat-number">4.9/5</div>
              <div class="home-stat-label">{{ locale === 'es' ? 'Valoración Google' : 'Google Rating' }}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="home-stat">
              <div class="home-stat-number">100%</div>
              <div class="home-stat-label">{{ locale === 'es' ? 'Subvencionado' : 'Funded' }}</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="home-stat">
              <div class="home-stat-number">2-4h</div>
              <div class="home-stat-label">{{ locale === 'es' ? 'Instalación' : 'Installation' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="home-green-spacer" aria-hidden="true"></div>

    <!-- Quick links to dedicated pages -->
    <section class="home-services tg-section">
      <div class="container">
        <div class="text-center mb-5" data-aos="fade-up">
          <span class="home-tag">{{ $t('nav.services') }}</span>
          <h2 class="fw-bold mt-2 mb-3">{{ locale === 'es' ? 'Profundiza en cada tema' : 'Explore each topic in depth' }}</h2>
          <p class="text-muted col-lg-8 mx-auto">
            {{
              locale === 'es'
                ? 'Accede a las páginas dedicadas para leer con detalle cómo trabajamos, dónde actuamos y qué opinan nuestros clientes.'
                : 'Visit dedicated pages for full detail on how we work, where we operate, and what our clients say.'
            }}
          </p>
        </div>

        <div class="row home-card-row g-4">
          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
            <router-link :to="getRoute('por-que-nosotros', 'why-us')" class="text-decoration-none">
              <div class="home-card h-100">
                <div class="home-card-icon">
                  <i class="bi bi-award"></i>
                </div>
                <h3 class="home-card-title">{{ $t('nav.whyUs') }}</h3>
                <p class="home-card-text">
                  {{
                    locale === 'es'
                      ? 'Más de 1.500 instalaciones verificadas, equipo certificado y garantía oficial del programa.'
                      : 'Over 1,500 verified installations, certified team and official program guarantee.'
                  }}
                </p>
                <span class="home-card-link">
                  {{ $t('common.learnMore') }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <router-link :to="getRoute('como-funciona', 'how-it-works')" class="text-decoration-none">
              <div class="home-card h-100">
                <div class="home-card-icon">
                  <i class="bi bi-diagram-3"></i>
                </div>
                <h3 class="home-card-title">{{ $t('nav.howItWorks') }}</h3>
                <p class="home-card-text">
                  {{
                    locale === 'es'
                      ? 'Un proceso sencillo en 4 pasos. Nosotros nos encargamos de todo, tú no pagas nada.'
                      : 'A simple 4-step process. We take care of everything, you pay nothing.'
                  }}
                </p>
                <span class="home-card-link">
                  {{ $t('common.learnMore') }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <router-link :to="getRoute('soluciones', 'solutions')" class="text-decoration-none">
              <div class="home-card h-100">
                <div class="home-card-icon">
                  <i class="bi bi-house-gear"></i>
                </div>
                <h3 class="home-card-title">{{ $t('nav.solutions') }}</h3>
                <p class="home-card-text">
                  {{
                    locale === 'es'
                      ? 'Aislamiento con lana mineral insuflada. Hasta un 45% de ahorro en tu factura energética.'
                      : 'Blown mineral wool insulation. Up to 45% savings on your energy bill.'
                  }}
                </p>
                <span class="home-card-link">
                  {{ $t('common.learnMore') }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <router-link :to="getRoute('testimonios', 'testimonials')" class="text-decoration-none">
              <div class="home-card h-100">
                <div class="home-card-icon">
                  <i class="bi bi-chat-quote"></i>
                </div>
                <h3 class="home-card-title">{{ $t('nav.testimonials') }}</h3>
                <p class="home-card-text">
                  {{
                    locale === 'es'
                      ? 'Valoración 4.9/5 en Google con más de 600 opiniones verificadas de clientes satisfechos.'
                      : '4.9/5 Google rating with over 600 verified reviews from satisfied customers.'
                  }}
                </p>
                <span class="home-card-link">
                  {{ $t('common.learnMore') }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
            <router-link :to="getRoute('provincias', 'provinces')" class="text-decoration-none">
              <div class="home-card h-100">
                <div class="home-card-icon">
                  <i class="bi bi-map"></i>
                </div>
                <h3 class="home-card-title">{{ $t('nav.provinces') }}</h3>
                <p class="home-card-text">
                  {{
                    locale === 'es'
                      ? 'Consulta en qué regiones y provincias de España ofrecemos nuestro servicio gratuito.'
                      : 'Check in which regions and provinces of Spain we offer our free service.'
                  }}
                </p>
                <span class="home-card-link">
                  {{ $t('common.learnMore') }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="500">
            <router-link :to="getRoute('contacto', 'contact')" class="text-decoration-none">
              <div class="home-card home-card--cta h-100">
                <div class="home-card-icon home-card-icon--white">
                  <i class="bi bi-headset"></i>
                </div>
                <h3 class="home-card-title text-white">{{ $t('nav.contact') }}</h3>
                <p class="home-card-text text-white-75">
                  {{
                    locale === 'es'
                      ? 'Contacta con nuestro equipo de expertos. Respuesta garantizada en menos de 24 horas.'
                      : 'Contact our team of experts. Guaranteed response within 24 hours.'
                  }}
                </p>
                <span class="home-card-link text-white">
                  {{ locale === 'es' ? 'Contactar ahora' : 'Contact now' }} <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <div class="home-green-spacer home-green-spacer--before-cta" aria-hidden="true"></div>

    <!-- Final CTA -->
    <section class="home-cta tg-section" data-aos="fade-up">
      <div class="container text-center">
        <h2 class="fw-bold text-white mb-3">
          {{ locale === 'es' ? '¿Listo para aislar tu hogar gratis?' : 'Ready to insulate your home for free?' }}
        </h2>
        <p class="text-white-75 col-lg-8 mx-auto mb-4">
          {{
            locale === 'es'
              ? 'Solicita tu estudio energético gratuito y descubre cuánto puedes ahorrar. Sin compromiso, sin costes.'
              : 'Request your free energy study and discover how much you can save. No commitment, no costs.'
          }}
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <router-link :to="eligibilityRoute" class="btn btn-tg-white btn-lg">
            <i class="bi bi-file-earmark-check me-2"></i>{{ $t('nav.checkEligibility') }}
          </router-link>
          <router-link :to="getRoute('contacto', 'contact')" class="btn btn-outline-light btn-lg">
            <i class="bi bi-telephone me-2"></i>{{ $t('nav.contact') }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import HeroSection from '@/components/sections/HeroSection.vue'
  import WhyUsSection from '@/components/sections/WhyUsSection.vue'
  import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
  import SolutionsSection from '@/components/sections/SolutionsSection.vue'

  import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
  import AOS from 'aos'

  const { locale } = useI18n()

  function getRoute(esPath, enPath) {
    return `/${locale.value}/${locale.value === 'es' ? esPath : enPath}`
  }

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )

  onMounted(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 80
    })
  })
</script>

<style lang="scss" scoped>
  .home-tag {
    display: inline-block;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.35rem 1rem;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .home-card-row {
    row-gap: 1.75rem;

    @media (min-width: 768px) {
      row-gap: 2rem;
    }
  }

  .home-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: $tg-primary;
      box-shadow: 0 8px 32px rgba(46, 125, 50, 0.1);
      transform: translateY(-4px);
    }

    &--cta {
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      border-color: transparent;
      margin-top: 0.25rem;

      @media (min-width: 992px) {
        margin-top: 0;
      }

      &:hover {
        box-shadow: 0 8px 32px rgba(46, 125, 50, 0.3);
        border-color: transparent;
      }
    }
  }

  .home-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba($tg-primary, 0.1), rgba($tg-primary, 0.05));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: $tg-primary;
    margin-bottom: 1.25rem;

    &--white {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }

  .home-card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 0.75rem;
  }

  .home-card-text {
    font-size: 0.9375rem;
    color: #6c757d;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .home-card-link {
    font-weight: 600;
    font-size: 0.875rem;
    color: $tg-primary;
    display: inline-flex;
    align-items: center;
    transition: gap 0.2s ease;
    gap: 0;

    .home-card:hover & {
      gap: 0.25rem;
    }
  }

  .text-white-75 {
    color: rgba(255, 255, 255, 0.75);
  }

  .home-green-spacer {
    height: 2.75rem;
    background: #fff;

    @media (min-width: 768px) {
      height: 3.25rem;
    }

    &--before-cta {
      background: #f8f9fa;
    }
  }

  .home-stats {
    background: linear-gradient(135deg, #1b5e20, #2e7d32);
    padding: 3.5rem 0 3.75rem;
    margin-bottom: 0;
  }

  .home-stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    line-height: 1;
    margin-bottom: 0.5rem;

    @media (max-width: 575.98px) {
      font-size: 2rem;
    }
  }

  .home-stat-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .home-cta {
    background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 50%, #0d3b0f 100%);
    margin-top: 0;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
</style>
