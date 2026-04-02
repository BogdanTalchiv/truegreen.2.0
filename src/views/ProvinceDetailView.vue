<template>
  <div class="page-wrapper">
    <div class="container" v-if="region">
      <!-- Breadcrumb -->
      <nav class="mb-4" data-aos="fade-up">
        <router-link :to="provincesRoute" class="back-link">
          <i class="bi bi-arrow-left me-1"></i>
          {{ locale === 'es' ? 'Todas las regiones' : 'All regions' }}
        </router-link>
      </nav>

      <!-- Header -->
      <div class="row align-items-center mb-5" data-aos="fade-up">
        <div class="col-12 col-lg-7">
          <span class="detail-tag">
            <i class="bi bi-geo-alt-fill me-1"></i>
            {{ locale === 'es' ? 'Región activa' : 'Active region' }}
          </span>
          <h1 class="fw-bold mt-2 mb-3">{{ locale === 'es' ? region.nameEs : region.nameEn }}</h1>
          <p class="text-muted lead">
            {{ locale === 'es' ? region.descEs : region.descEn }}
          </p>
        </div>
        <div class="col-12 col-lg-5 text-center" data-aos="fade-up" data-aos-delay="100">
          <div class="detail-stat-grid">
            <div class="detail-stat">
              <div class="detail-stat-number">{{ region.provinces.length }}</div>
              <div class="detail-stat-label">{{ locale === 'es' ? 'Provincias' : 'Provinces' }}</div>
            </div>
            <div class="detail-stat">
              <div class="detail-stat-number">100%</div>
              <div class="detail-stat-label">{{ locale === 'es' ? 'Gratuito' : 'Free' }}</div>
            </div>
            <div class="detail-stat">
              <div class="detail-stat-number">2-4h</div>
              <div class="detail-stat-label">{{ locale === 'es' ? 'Instalación' : 'Installation' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Provinces Grid -->
      <div class="mb-5">
        <h2 class="fw-bold mb-4" data-aos="fade-up">
          {{ locale === 'es' ? 'Provincias disponibles' : 'Available provinces' }}
        </h2>
        <div class="row g-3">
          <div
            v-for="(prov, i) in region.provinces"
            :key="prov"
            class="col-6 col-sm-4 col-md-3"
            data-aos="fade-up"
            :data-aos-delay="i * 50"
          >
            <div class="prov-card">
              <i class="bi bi-pin-map-fill text-success me-2"></i>
              <span class="fw-semibold">{{ prov }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Info -->
      <div class="services-banner mb-5" data-aos="fade-up">
        <div class="row align-items-center">
          <div class="col-12 col-md-8">
            <h3 class="fw-bold text-white mb-2">
              {{ locale === 'es' ? '¿Vives en esta región?' : 'Do you live in this region?' }}
            </h3>
            <p class="text-white-75 mb-md-0">
              {{ locale === 'es'
                ? 'Solicita tu estudio energético gratuito. Nuestro equipo de expertos verificará si tu vivienda cumple los requisitos del programa CAE.'
                : 'Request your free energy study. Our team of experts will verify if your home meets the CAE program requirements.'
              }}
            </p>
          </div>
          <div class="col-12 col-md-4 text-md-end mt-3 mt-md-0">
            <router-link :to="eligibilityRoute" class="btn btn-light btn-lg fw-bold">
              <i class="bi bi-file-earmark-check me-2"></i>
              {{ locale === 'es' ? 'Verificar elegibilidad' : 'Check eligibility' }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- What We Offer -->
      <div class="row g-4 mb-5">
        <div class="col-12 col-md-4" data-aos="fade-up">
          <div class="offer-card h-100">
            <div class="offer-icon"><i class="bi bi-patch-check-fill"></i></div>
            <h4 class="fw-semibold fs-6">{{ locale === 'es' ? '100% Financiado' : '100% Funded' }}</h4>
            <p class="text-muted small mb-0">{{ locale === 'es' ? 'El programa CAE cubre el 100% del coste. No pagas nada.' : 'The CAE program covers 100% of the cost. You pay nothing.' }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4" data-aos="fade-up" data-aos-delay="80">
          <div class="offer-card h-100">
            <div class="offer-icon"><i class="bi bi-lightning-charge-fill"></i></div>
            <h4 class="fw-semibold fs-6">{{ locale === 'es' ? 'Instalación rápida' : 'Fast installation' }}</h4>
            <p class="text-muted small mb-0">{{ locale === 'es' ? 'En solo 2-4 horas, sin obras ni molestias.' : 'In just 2-4 hours, no construction or hassle.' }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4" data-aos="fade-up" data-aos-delay="160">
          <div class="offer-card h-100">
            <div class="offer-icon"><i class="bi bi-shield-fill-check"></i></div>
            <h4 class="fw-semibold fs-6">{{ locale === 'es' ? 'Supervisado MITECO' : 'Supervised by MITECO' }}</h4>
            <p class="text-muted small mb-0">{{ locale === 'es' ? 'Proceso supervisado bajo Real Decreto 36/2023.' : 'Process supervised under Royal Decree 36/2023.' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="container text-center py-5">
      <i class="bi bi-geo-alt display-1 text-muted mb-3"></i>
      <h2>{{ locale === 'es' ? 'Región no encontrada' : 'Region not found' }}</h2>
      <router-link :to="provincesRoute" class="btn btn-tg-primary mt-3">
        {{ locale === 'es' ? 'Ver todas las regiones' : 'View all regions' }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import AOS from 'aos'

  const { locale } = useI18n()
  const route = useRoute()

  const allRegions = [
    {
      slug: 'castilla-y-leon',
      nameEs: 'Castilla y León',
      nameEn: 'Castile and León',
      descEs: 'La comunidad autónoma más extensa de España, con 9 provincias cubiertas por nuestro programa de aislamiento gratuito.',
      descEn: 'Spain\'s largest autonomous community, with 9 provinces covered by our free insulation program.',
      provinces: ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora']
    },
    {
      slug: 'castilla-la-mancha',
      nameEs: 'Castilla-La Mancha',
      nameEn: 'Castile-La Mancha',
      descEs: 'Región central de España con inviernos fríos y veranos calurosos, ideal para el aislamiento térmico.',
      descEn: 'Central Spain region with cold winters and hot summers, ideal for thermal insulation.',
      provinces: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo']
    },
    {
      slug: 'madrid',
      nameEs: 'Comunidad de Madrid',
      nameEn: 'Community of Madrid',
      descEs: 'La capital y su comunidad autónoma, con miles de viviendas que pueden beneficiarse del programa.',
      descEn: 'The capital and its autonomous community, with thousands of homes that can benefit from the program.',
      provinces: ['Madrid']
    },
    {
      slug: 'galicia',
      nameEs: 'Galicia',
      nameEn: 'Galicia',
      descEs: 'Región del noroeste con clima húmedo y temperaturas suaves, donde el aislamiento mejora significativamente el confort.',
      descEn: 'Northwestern region with a humid climate and mild temperatures, where insulation significantly improves comfort.',
      provinces: ['Lugo', 'Ourense']
    },
    {
      slug: 'aragon',
      nameEs: 'Aragón',
      nameEn: 'Aragon',
      descEs: 'Comunidad del noreste con gran variedad climática, desde el Pirineo hasta el valle del Ebro.',
      descEn: 'Northeastern community with great climatic variety, from the Pyrenees to the Ebro valley.',
      provinces: ['Huesca', 'Teruel', 'Zaragoza']
    },
    {
      slug: 'otras-regiones',
      nameEs: 'Otras Regiones',
      nameEn: 'Other Regions',
      descEs: 'También cubrimos comunidades del norte de España con clima atlántico, donde el aislamiento es especialmente beneficioso.',
      descEn: 'We also cover communities in northern Spain with an Atlantic climate, where insulation is especially beneficial.',
      provinces: ['Asturias', 'Cantabria', 'La Rioja', 'Navarra']
    }
  ]

  const region = computed(() => {
    const slug = route.params.slug
    return allRegions.find(r => r.slug === slug) || null
  })

  const provincesRoute = computed(() =>
    locale.value === 'es' ? `/${locale.value}/provincias` : `/${locale.value}/provinces`
  )

  const eligibilityRoute = computed(() =>
    locale.value === 'es' ? '/es/verificar-elegibilidad' : '/en/check-eligibility'
  )

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 })
  })
</script>

<style lang="scss" scoped>
  .page-wrapper {
    padding-top: 6rem;
    padding-bottom: 3rem;
  }

  .back-link {
    color: $tg-primary;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
      color: $tg-primary-dark;
    }
  }

  .detail-tag {
    display: inline-block;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.35rem 1rem;
    border-radius: 2rem;
  }

  .detail-stat-grid {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    @media (max-width: 991.98px) {
      margin-top: 1.5rem;
    }
  }

  .detail-stat {
    text-align: center;
  }

  .detail-stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: $tg-primary;
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .detail-stat-label {
    font-size: 0.8rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  .prov-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
      border-color: $tg-primary-light;
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.08);
    }
  }

  .services-banner {
    background: linear-gradient(135deg, #1B5E20, #2E7D32);
    border-radius: 20px;
    padding: 2.5rem;

    @media (max-width: 575.98px) {
      padding: 1.5rem;
    }
  }

  .text-white-75 {
    color: rgba(255, 255, 255, 0.75);
  }

  .offer-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 14px;
    padding: 1.75rem;
    text-align: center;
    transition: all 0.25s ease;

    &:hover {
      border-color: $tg-primary;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(46, 125, 50, 0.1);
    }
  }

  .offer-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba($tg-primary, 0.1), rgba($tg-primary, 0.05));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: $tg-primary;
    margin: 0 auto 1rem;
  }
</style>
