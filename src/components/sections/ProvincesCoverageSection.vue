<template>
  <section
    :id="embedded ? 'coverage' : undefined"
    class="provinces-coverage"
    :class="embedded ? 'tg-section-alt' : 'tg-section'"
  >
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-5" data-aos="fade-up">
        <span class="prov-eyebrow">{{ locale === 'es' ? 'Cobertura' : 'Coverage' }}</span>
        <component :is="embedded ? 'h2' : 'h1'" class="prov-heading">
          {{ locale === 'es' ? 'Regiones donde actuamos' : 'Regions where we operate' }}
        </component>
        <p class="prov-lead">
          {{
            locale === 'es'
              ? 'Trabajamos en estas comunidades autónomas dentro del programa oficial de Certificados de Ahorro Energético.'
              : 'We work in these autonomous communities under the official Energy Savings Certificate programme.'
          }}
        </p>
      </div>

      <!-- ═══════════ MAP ═══════════ -->
      <div class="map-shell" data-aos="fade-up">
        <div class="map-card">
          <svg
            viewBox="0 0 750 620"
            class="spain-svg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Mapa de España"
          >
            <!-- Inactive regions first (no pointer) -->
            <g class="regions-inactive">
              <!-- Extremadura -->
              <path d="M85,252 L130,233 L170,222 L182,247 L210,260 L240,265 L248,296 L245,332 L228,370 L205,388 L180,385 L150,368 L125,345 L105,320 L88,290 Z" />
              <!-- Andalucía -->
              <path d="M75,392 L105,370 L130,355 L162,375 L195,390 L240,395 L292,388 L330,392 L370,408 L415,420 L455,425 L488,420 L512,432 L520,458 L510,488 L480,510 L435,525 L375,528 L310,520 L252,505 L195,482 L148,458 L108,432 Z" />
              <!-- País Vasco -->
              <path d="M348,47 L378,38 L408,44 L418,70 L405,84 L382,88 L358,82 L348,68 Z" />
              <!-- Comunidad Valenciana -->
              <path d="M468,298 L498,280 L522,258 L542,228 L560,205 L575,215 L580,255 L578,298 L568,335 L552,365 L528,382 L505,378 L492,358 L478,335 Z" />
              <!-- Cataluña -->
              <path d="M498,60 L535,48 L578,52 L610,70 L618,108 L610,158 L598,198 L578,228 L558,235 L540,228 L522,205 L520,175 L525,148 L522,115 L510,85 Z" />
              <!-- Murcia -->
              <path d="M448,392 L470,378 L492,372 L512,378 L522,400 L512,420 L492,428 L470,425 L455,412 Z" />
              <!-- Canarias (inset box bottom-left) -->
              <rect x="42" y="480" width="160" height="90" rx="6" fill="#f1f5f3" stroke="#d5deda" stroke-width="1" stroke-dasharray="5,3" />
              <text x="122" y="530" text-anchor="middle" class="inset-label">Islas Canarias</text>
              <!-- Baleares (inset box bottom-right) -->
              <rect x="580" y="480" width="130" height="60" rx="6" fill="#f1f5f3" stroke="#d5deda" stroke-width="1" stroke-dasharray="5,3" />
              <text x="645" y="515" text-anchor="middle" class="inset-label">Baleares</text>
            </g>

            <!-- Active regions (clickable) -->
            <g class="regions-active">
              <!-- Galicia -->
              <path
                d="M52,85 L80,52 L122,38 L160,50 L170,82 L172,112 L168,148 L148,168 L115,175 L82,165 L60,142 L45,115 Z"
                :class="['region', { hovered: hoveredSlug === 'galicia' }]"
                @mouseenter="hoveredSlug = 'galicia'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('galicia')"
              />
              <text x="112" y="115" text-anchor="middle" class="region-label"
                @mouseenter="hoveredSlug = 'galicia'" @mouseleave="hoveredSlug = null" @click="goToRegion('galicia')">
                Galicia
              </text>

              <!-- Asturias + Cantabria + La Rioja + Navarra (Otras Regiones) -->
              <path
                d="M170,82 L205,65 L250,52 L290,45 L325,50 L348,47 L348,68 L335,90 L310,98 L278,100 L248,102 L218,108 L195,112 L172,112 Z"
                :class="['region', { hovered: hoveredSlug === 'otras-regiones' }]"
                @mouseenter="hoveredSlug = 'otras-regiones'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('otras-regiones')"
              />
              <!-- La Rioja / Navarra strip -->
              <path
                d="M310,98 L335,90 L358,82 L382,88 L405,84 L418,70 L440,52 L468,60 L478,88 L480,120 L472,148 L452,162 L428,168 L408,162 L388,155 L365,155 L345,148 L325,128 L325,110 Z"
                :class="['region', { hovered: hoveredSlug === 'otras-regiones' }]"
                @mouseenter="hoveredSlug = 'otras-regiones'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('otras-regiones')"
              />
              <text x="315" y="78" text-anchor="middle" class="region-label"
                @mouseenter="hoveredSlug = 'otras-regiones'" @mouseleave="hoveredSlug = null" @click="goToRegion('otras-regiones')">
                {{ locale === 'es' ? 'Otras' : 'Others' }}
              </text>

              <!-- Aragón -->
              <path
                d="M418,70 L440,52 L468,60 L498,60 L510,85 L522,115 L525,148 L520,175 L522,205 L508,218 L488,222 L468,210 L452,185 L440,158 L428,130 L418,110 L418,84 Z"
                :class="['region', { hovered: hoveredSlug === 'aragon' }]"
                @mouseenter="hoveredSlug = 'aragon'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('aragon')"
              />
              <text x="482" y="148" text-anchor="middle" class="region-label"
                @mouseenter="hoveredSlug = 'aragon'" @mouseleave="hoveredSlug = null" @click="goToRegion('aragon')">
                Aragón
              </text>

              <!-- Castilla y León (large central-north region) -->
              <path
                d="M168,148 L195,112 L218,108 L248,102 L278,100 L310,98 L325,110 L325,128 L345,148 L365,155 L388,155 L408,162 L428,168 L440,158 L452,185 L468,210 L488,222 L488,258 L470,275 L445,282 L415,285 L378,282 L342,278 L308,268 L278,258 L248,248 L218,240 L195,232 L172,222 L162,198 L162,175 L165,155 Z"
                :class="['region', { hovered: hoveredSlug === 'castilla-y-leon' }]"
                @mouseenter="hoveredSlug = 'castilla-y-leon'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('castilla-y-leon')"
              />
              <text x="330" y="205" text-anchor="middle" class="region-label"
                @mouseenter="hoveredSlug = 'castilla-y-leon'" @mouseleave="hoveredSlug = null" @click="goToRegion('castilla-y-leon')">
                {{ locale === 'es' ? 'Castilla y León' : 'Castile & León' }}
              </text>

              <!-- Madrid (small) -->
              <path
                d="M340,288 L368,282 L395,285 L402,305 L395,322 L372,328 L348,322 L338,308 Z"
                :class="['region', 'region--madrid', { hovered: hoveredSlug === 'madrid' }]"
                @mouseenter="hoveredSlug = 'madrid'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('madrid')"
              />
              <text x="370" y="308" text-anchor="middle" class="region-label region-label--small"
                @mouseenter="hoveredSlug = 'madrid'" @mouseleave="hoveredSlug = null" @click="goToRegion('madrid')">
                Madrid
              </text>

              <!-- Castilla-La Mancha -->
              <path
                d="M248,268 L278,258 L308,268 L342,278 L378,282 L340,288 L338,308 L348,322 L372,328 L395,322 L415,332 L438,328 L462,310 L488,295 L508,295 L522,310 L522,340 L512,368 L498,385 L478,395 L452,398 L415,392 L378,382 L348,368 L318,352 L290,335 L265,315 L248,295 Z"
                :class="['region', { hovered: hoveredSlug === 'castilla-la-mancha' }]"
                @mouseenter="hoveredSlug = 'castilla-la-mancha'"
                @mouseleave="hoveredSlug = null"
                @click="goToRegion('castilla-la-mancha')"
              />
              <text x="388" y="352" text-anchor="middle" class="region-label"
                @mouseenter="hoveredSlug = 'castilla-la-mancha'" @mouseleave="hoveredSlug = null" @click="goToRegion('castilla-la-mancha')">
                C-La Mancha
              </text>
            </g>

            <!-- Hover tooltip -->
            <g v-if="hoveredSlug && tooltipRegion" class="map-tooltip">
              <rect
                :x="tooltipX - 5"
                :y="tooltipY - 22"
                :width="tooltipRegion.label.length * 7.5 + 20"
                height="28"
                rx="6"
                fill="#1b5e20"
              />
              <text
                :x="tooltipX + (tooltipRegion.label.length * 7.5 + 10) / 2"
                :y="tooltipY - 4"
                text-anchor="middle"
                fill="#fff"
                font-size="13"
                font-weight="600"
                font-family="Montserrat, sans-serif"
              >{{ tooltipRegion.label }}</text>
            </g>
          </svg>

          <!-- Legend -->
          <div class="map-legend">
            <span class="legend-item legend-item--active">
              <span class="legend-dot"></span>
              {{ locale === 'es' ? 'Región activa — haz clic para más info' : 'Active region — click for details' }}
            </span>
            <span class="legend-item">
              <span class="legend-dot legend-dot--inactive"></span>
              {{ locale === 'es' ? 'Región no activa' : 'Inactive region' }}
            </span>
          </div>
        </div>
      </div>

      <!-- ═══════════ REGION CARDS ═══════════ -->
      <div class="row g-4 mt-2">
        <div
          v-for="(group, i) in regionGroups"
          :key="group.slug"
          class="col-12 col-sm-6 col-lg-4"
          data-aos="fade-up"
          :data-aos-delay="i * 70"
        >
          <router-link :to="getRegionRoute(group.slug)" class="text-decoration-none d-block h-100">
            <div
              class="region-card h-100"
              :class="{ 'region-card--hovered': hoveredSlug === group.slug }"
              @mouseenter="hoveredSlug = group.slug"
              @mouseleave="hoveredSlug = null"
            >
              <div class="region-card-top">
                <div class="region-card-icon">
                  <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h3 class="region-card-name">{{ locale === 'es' ? group.nameEs : group.nameEn }}</h3>
                  <span class="region-card-count">
                    {{ group.provinces.length }} {{ locale === 'es' ? 'provincias' : 'provinces' }}
                  </span>
                </div>
              </div>
              <div class="region-card-tags">
                <span v-for="prov in group.provinces" :key="prov" class="prov-tag">{{ prov }}</span>
              </div>
              <div class="region-card-cta">
                {{ locale === 'es' ? 'Ver detalles' : 'View details' }}
                <i class="bi bi-arrow-right-short"></i>
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

  defineProps({ embedded: { type: Boolean, default: false } })

  const { locale } = useI18n()
  const router = useRouter()
  const hoveredSlug = ref(null)

  /* Region groups for the cards */
  const regionGroups = [
    {
      slug: 'castilla-y-leon', nameEs: 'Castilla y León', nameEn: 'Castile and León',
      provinces: ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora']
    },
    {
      slug: 'castilla-la-mancha', nameEs: 'Castilla-La Mancha', nameEn: 'Castile-La Mancha',
      provinces: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo']
    },
    {
      slug: 'madrid', nameEs: 'Madrid', nameEn: 'Madrid',
      provinces: ['Madrid']
    },
    {
      slug: 'galicia', nameEs: 'Galicia', nameEn: 'Galicia',
      provinces: ['Lugo', 'Ourense']
    },
    {
      slug: 'aragon', nameEs: 'Aragón', nameEn: 'Aragon',
      provinces: ['Huesca', 'Teruel', 'Zaragoza']
    },
    {
      slug: 'otras-regiones', nameEs: 'Otras Regiones', nameEn: 'Other Regions',
      provinces: ['Asturias', 'Cantabria', 'La Rioja', 'Navarra']
    }
  ]

  /* Tooltip positioning per active slug */
  const TOOLTIP_POS = {
    'galicia'             : { x: 58,  y: 56,  label: 'Galicia' },
    'castilla-y-leon'     : { x: 255, y: 152, label: 'Castilla y León' },
    'madrid'              : { x: 270, y: 272, label: 'Madrid' },
    'castilla-la-mancha'  : { x: 305, y: 298, label: 'C-La Mancha' },
    'aragon'              : { x: 420, y: 100, label: 'Aragón' },
    'otras-regiones'      : { x: 260, y: 40,  label: locale.value === 'es' ? 'Otras Regiones' : 'Other Regions' }
  }

  const tooltipRegion = computed(() => hoveredSlug.value ? (TOOLTIP_POS[hoveredSlug.value] || null) : null)
  const tooltipX      = computed(() => tooltipRegion.value?.x ?? 0)
  const tooltipY      = computed(() => tooltipRegion.value?.y ?? 0)

  function getRegionRoute(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    return `/${locale.value}/${base}/${slug}`
  }
  function goToRegion(slug) {
    if (slug) router.push(getRegionRoute(slug))
  }
</script>

<style lang="scss" scoped>
  /* ── Section ── */
  .provinces-coverage { background: #fff; }

  /* ── Typography ── */
  .prov-eyebrow {
    display: inline-block;
    background: rgba($tg-primary, 0.1);
    color: $tg-primary;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 0.875rem;
  }

  .prov-heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    color: $tg-text-primary;
    margin-bottom: 1rem;
  }

  .prov-lead {
    font-size: 1.05rem;
    color: $tg-text-secondary;
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.65;
  }

  /* ── Map card ── */
  .map-shell { max-width: 820px; margin: 0 auto 0.5rem; }

  .map-card {
    background: #fff;
    border: 1.5px solid #e4ede6;
    border-radius: 20px;
    padding: 2rem 1.75rem 1.25rem;
    box-shadow:
      0 2px 8px rgba(13, 59, 15, 0.06),
      0 16px 40px rgba(13, 59, 15, 0.09);
  }

  .spain-svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }

  /* ── Inactive regions ── */
  .regions-inactive path {
    fill: #eef2ef;
    stroke: #d5ddd7;
    stroke-width: 1.2;
  }

  /* ── Active regions ── */
  .region {
    fill: #d0ebd2;
    stroke: #4caf50;
    stroke-width: 1.5;
    cursor: pointer;
    transition: fill 0.22s ease, stroke-width 0.22s ease;

    &.hovered, &:hover {
      fill: #a5d6a7;
      stroke: #2e7d32;
      stroke-width: 2;
    }

    &--madrid {
      fill: #b2dfdb;
      stroke: #00897b;

      &.hovered, &:hover {
        fill: #80cbc4;
        stroke: #00695c;
      }
    }
  }

  /* ── Region labels (dark, readable on light fill) ── */
  .region-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 700;
    fill: #1b3a1e;
    pointer-events: all;
    cursor: pointer;
    user-select: none;

    &--small { font-size: 9px; }

    @media (max-width: 575.98px) { font-size: 8px; }
  }

  .inset-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 500;
    fill: #6c757d;
  }

  /* ── Legend ── */
  .map-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
    justify-content: center;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid #e9edea;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  .legend-dot {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: #d0ebd2;
    border: 1.5px solid #4caf50;
    flex-shrink: 0;

    &--inactive {
      background: #eef2ef;
      border-color: #d5ddd7;
    }
  }

  /* ── Region cards ── */
  .region-card {
    background: #fff;
    border: 1.5px solid #e4ede6;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

    &:hover,
    &--hovered {
      border-color: $tg-primary;
      box-shadow: 0 8px 32px rgba(46, 125, 50, 0.12);
      transform: translateY(-3px);
    }
  }

  .region-card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
  }

  .region-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .region-card-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 0.15rem;
  }

  .region-card-count {
    font-size: 0.8rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  .region-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    flex-grow: 1;
  }

  .prov-tag {
    display: inline-block;
    background: rgba($tg-primary, 0.08);
    color: $tg-primary-dark;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
  }

  .region-card-cta {
    font-size: 0.85rem;
    font-weight: 700;
    color: $tg-primary;
    display: flex;
    align-items: center;
    gap: 0.1rem;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f0;
    transition: gap 0.2s ease;

    .region-card:hover &,
    .region-card--hovered & {
      gap: 0.35rem;
    }
  }
</style>
