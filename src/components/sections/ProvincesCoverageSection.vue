<template>
  <section
    :id="embedded ? 'coverage' : undefined"
    class="provinces-coverage"
    :class="[embedded ? 'tg-section-alt' : 'tg-section', { 'provinces-coverage--embedded': embedded }]"
  >
    <div class="container">
      <div class="text-center mb-5" data-aos="fade-up">
        <span class="prov-tag">{{ locale === 'es' ? 'Cobertura' : 'Coverage' }}</span>
        <component :is="embedded ? 'h2' : 'h1'" class="fw-bold mt-2 mb-3 section-heading">
          {{ locale === 'es' ? 'Regiones disponibles' : 'Available regions' }}
        </component>
        <p class="text-muted col-lg-8 mx-auto mb-0">
          {{
            locale === 'es'
              ? 'Descubre en qué provincias de España ofrecemos nuestro servicio de aislamiento gratuito dentro del programa CAE.'
              : 'Discover in which provinces of Spain we offer our free insulation service under the CAE program.'
          }}
        </p>
      </div>

      <div class="map-wrapper mb-5" data-aos="fade-up">
        <svg viewBox="0 0 950 750" class="spain-map" xmlns="http://www.w3.org/2000/svg">
          <g v-for="region in mapRegions" :key="region.id">
            <path
              :d="region.path"
              :class="[
                'map-region',
                { 'map-region--active': region.active, 'map-region--hover': hoveredRegion === region.groupSlug }
              ]"
              @mouseenter="region.active && (hoveredRegion = region.groupSlug)"
              @mouseleave="hoveredRegion = null"
              @click="region.active && goToRegion(region.groupSlug)"
            />
            <text
              v-if="region.active && region.label"
              :x="region.labelX"
              :y="region.labelY"
              class="map-label"
              text-anchor="middle"
              @mouseenter="hoveredRegion = region.groupSlug"
              @mouseleave="hoveredRegion = null"
              @click="goToRegion(region.groupSlug)"
            >
              {{ region.label }}
            </text>
          </g>
        </svg>
      </div>

      <div class="row g-4 mb-0">
        <div
          v-for="(group, i) in regionGroups"
          :key="group.slug"
          class="col-12 col-sm-6 col-lg-4"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <router-link :to="getRegionRoute(group.slug)" class="text-decoration-none">
            <div
              class="region-card h-100"
              @mouseenter="hoveredRegion = group.slug"
              @mouseleave="hoveredRegion = null"
            >
              <div class="region-card-header">
                <i class="bi bi-geo-alt-fill text-success me-2"></i>
                <h3 class="region-card-title mb-0">{{ locale === 'es' ? group.nameEs : group.nameEn }}</h3>
              </div>
              <div class="region-card-provinces">
                <span v-for="prov in group.provinces" :key="prov" class="province-tag">{{ prov }}</span>
              </div>
              <div class="region-card-footer">
                <span class="region-card-link">
                  {{ locale === 'es' ? 'Ver detalles' : 'View details' }}
                  <i class="bi bi-arrow-right ms-1"></i>
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  defineProps({
    embedded: {
      type: Boolean,
      default: false
    }
  })

  const { locale } = useI18n()
  const router = useRouter()
  const hoveredRegion = ref(null)

  const regionGroups = [
    {
      slug: 'castilla-y-leon',
      nameEs: 'Castilla y León',
      nameEn: 'Castile and León',
      provinces: ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora']
    },
    {
      slug: 'castilla-la-mancha',
      nameEs: 'Castilla-La Mancha',
      nameEn: 'Castile-La Mancha',
      provinces: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo']
    },
    {
      slug: 'madrid',
      nameEs: 'Madrid',
      nameEn: 'Madrid',
      provinces: ['Madrid']
    },
    {
      slug: 'galicia',
      nameEs: 'Galicia',
      nameEn: 'Galicia',
      provinces: ['Lugo', 'Ourense']
    },
    {
      slug: 'aragon',
      nameEs: 'Aragón',
      nameEn: 'Aragon',
      provinces: ['Huesca', 'Teruel', 'Zaragoza']
    },
    {
      slug: 'otras-regiones',
      nameEs: 'Otras Regiones',
      nameEn: 'Other Regions',
      provinces: ['Asturias', 'Cantabria', 'La Rioja', 'Navarra']
    }
  ]

  const mapRegions = computed(() => [
    {
      id: 'galicia',
      path: 'M65,108 L100,65 L155,48 L200,62 L215,98 L215,140 L210,185 L205,218 L170,228 L132,222 L100,208 L78,180 L62,148 Z',
      active: true,
      groupSlug: 'galicia',
      label: locale.value === 'es' ? 'Galicia' : 'Galicia',
      labelX: 140,
      labelY: 148
    },
    {
      id: 'asturias',
      path: 'M215,98 L258,72 L308,58 L352,65 L352,100 L320,115 L278,120 L238,120 L215,115 Z',
      active: true,
      groupSlug: 'otras-regiones',
      label: null,
      labelX: 280,
      labelY: 95
    },
    {
      id: 'cantabria',
      path: 'M352,65 L398,52 L440,60 L440,100 L418,112 L388,112 L362,105 L352,100 Z',
      active: true,
      groupSlug: 'otras-regiones',
      label: null,
      labelX: 395,
      labelY: 85
    },
    {
      id: 'paisVasco',
      path: 'M440,60 L475,48 L512,55 L515,90 L498,105 L470,102 L448,98 L440,90 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 478,
      labelY: 78
    },
    {
      id: 'navarra',
      path: 'M515,55 L548,45 L585,62 L588,108 L582,152 L560,170 L538,172 L515,158 L508,128 L515,90 Z',
      active: true,
      groupSlug: 'otras-regiones',
      label: null,
      labelX: 550,
      labelY: 115
    },
    {
      id: 'laRioja',
      path: 'M398,112 L440,100 L448,98 L470,102 L508,118 L515,158 L498,168 L465,168 L435,162 L410,152 L400,135 Z',
      active: true,
      groupSlug: 'otras-regiones',
      label: locale.value === 'es' ? 'Otras' : 'Other',
      labelX: 448,
      labelY: 145
    },
    {
      id: 'aragon',
      path: 'M515,90 L545,68 L585,62 L628,72 L668,98 L678,148 L672,220 L662,298 L645,368 L608,388 L565,372 L540,335 L528,278 L520,228 L510,200 L508,180 L515,158 L508,118 Z',
      active: true,
      groupSlug: 'aragon',
      label: locale.value === 'es' ? 'Aragón' : 'Aragon',
      labelX: 592,
      labelY: 230
    },
    {
      id: 'castillayLeon',
      path: 'M215,115 L238,120 L278,120 L320,115 L352,100 L362,105 L388,112 L398,112 L400,135 L410,152 L435,162 L465,168 L498,168 L508,180 L510,200 L520,228 L528,278 L505,308 L472,332 L430,348 L388,355 L345,352 L305,345 L268,332 L235,312 L215,288 L205,258 L205,232 L210,200 L215,170 L215,140 Z',
      active: true,
      groupSlug: 'castilla-y-leon',
      label: locale.value === 'es' ? 'Castilla y León' : 'Castile & León',
      labelX: 355,
      labelY: 238
    },
    {
      id: 'madrid',
      path: 'M378,358 L415,348 L445,355 L452,380 L442,405 L415,412 L388,402 L378,382 Z',
      active: true,
      groupSlug: 'madrid',
      label: 'Madrid',
      labelX: 415,
      labelY: 385
    },
    {
      id: 'castillaLaMancha',
      path: 'M310,408 L345,395 L378,402 L388,402 L415,412 L442,405 L462,385 L498,368 L540,362 L565,372 L582,398 L588,435 L580,478 L562,512 L528,530 L485,538 L438,532 L392,518 L355,498 L328,472 L312,445 Z',
      active: true,
      groupSlug: 'castilla-la-mancha',
      label: locale.value === 'es' ? 'C-La Mancha' : 'C-La Mancha',
      labelX: 450,
      labelY: 460
    },
    {
      id: 'extremadura',
      path: 'M108,318 L158,298 L215,288 L235,312 L268,332 L305,345 L315,378 L312,418 L298,452 L268,478 L230,490 L192,485 L155,468 L128,442 L112,408 L102,368 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 210,
      labelY: 395
    },
    {
      id: 'andalucia',
      path: 'M95,498 L128,478 L155,468 L192,485 L230,490 L268,478 L312,488 L355,498 L392,518 L438,532 L485,538 L528,535 L562,545 L588,565 L595,592 L580,622 L545,642 L488,655 L422,660 L352,652 L285,638 L225,618 L172,592 L125,568 L95,542 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 350,
      labelY: 578
    },
    {
      id: 'comunidadValenciana',
      path: 'M588,388 L628,375 L658,348 L678,318 L692,282 L718,288 L725,328 L722,378 L710,418 L692,452 L668,478 L640,485 L612,472 L598,450 L590,428 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 655,
      labelY: 400
    },
    {
      id: 'cataluna',
      path: 'M628,72 L678,60 L732,65 L768,88 L775,138 L768,198 L752,242 L732,272 L712,278 L692,268 L678,248 L672,220 L678,178 L678,148 L668,98 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 720,
      labelY: 170
    },
    {
      id: 'murcia',
      path: 'M562,512 L590,498 L622,490 L648,495 L658,520 L648,545 L622,558 L598,555 L580,540 Z',
      active: false,
      groupSlug: null,
      label: null,
      labelX: 615,
      labelY: 528
    }
  ])

  function getRegionRoute(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    return `/${locale.value}/${base}/${slug}`
  }

  function goToRegion(slug) {
    if (slug) router.push(getRegionRoute(slug))
  }
</script>

<style lang="scss" scoped>
  .provinces-coverage {
    &--embedded {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .section-heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
  }

  .prov-tag {
    display: inline-block;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.35rem 1rem;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .map-wrapper {
    max-width: 700px;
    margin: 0 auto;
  }

  .spain-map {
    width: 100%;
    height: auto;
  }

  .map-region {
    fill: #e0e0e0;
    stroke: #fff;
    stroke-width: 2;
    cursor: default;
    transition: fill 0.25s ease, transform 0.2s ease;

    &--active {
      fill: #81c784;
      cursor: pointer;

      &:hover,
      &.map-region--hover {
        fill: #2e7d32;
      }
    }
  }

  .map-label {
    font-size: 16px;
    font-weight: 600;
    fill: #fff;
    pointer-events: all;
    cursor: pointer;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    font-family: 'Montserrat', sans-serif;

    @media (max-width: 575.98px) {
      font-size: 11px;
    }
  }

  .region-card {
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 1.75rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: $tg-primary;
      box-shadow: 0 8px 32px rgba(46, 125, 50, 0.12);
      transform: translateY(-4px);
    }
  }

  .region-card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .region-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: $tg-text-primary;
  }

  .region-card-provinces {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    flex-grow: 1;
    margin-bottom: 1.25rem;
  }

  .province-tag {
    display: inline-block;
    background: rgba($tg-primary, 0.08);
    color: $tg-primary-dark;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
  }

  .region-card-footer {
    border-top: 1px solid #f0f0f0;
    padding-top: 1rem;
  }

  .region-card-link {
    font-weight: 600;
    font-size: 0.85rem;
    color: $tg-primary;
    display: inline-flex;
    align-items: center;
    transition: gap 0.2s ease;
    gap: 0;

    .region-card:hover & {
      gap: 0.25rem;
    }
  }
</style>
