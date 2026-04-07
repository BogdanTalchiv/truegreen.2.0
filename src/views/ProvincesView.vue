<template>
  <div class="provinces-page">

    <!-- ── Hero band with background image ── -->
    <div class="prov-hero">
      <div class="prov-hero-bg" :style="{ backgroundImage: `url('${heroBg}')` }"></div>
      <div class="prov-hero-overlay"></div>
      <div class="container prov-hero-body">
        <span class="prov-eyebrow" data-aos="fade-up">{{ $t('nav.provinces') }}</span>
        <h1 class="prov-hero-title" data-aos="fade-up" data-aos-delay="80">
          {{ locale === 'es' ? 'Dónde trabajamos' : 'Where we work' }}
        </h1>
        <p class="prov-hero-sub" data-aos="fade-up" data-aos-delay="160">
          {{
            locale === 'es'
              ? 'Operamos en 6 comunidades autónomas con equipos locales certificados. Consulta si tu provincia está activa.'
              : 'We operate across 6 autonomous communities with certified local teams. Check if your province is active.'
          }}
        </p>

        <!-- Stats strip -->
        <div class="prov-stats" data-aos="fade-up" data-aos-delay="240">
          <div class="pstat">
            <span class="pstat-num">6</span>
            <span class="pstat-label">{{ locale === 'es' ? 'Comunidades' : 'Communities' }}</span>
          </div>
          <div class="pstat-divider"></div>
          <div class="pstat">
            <span class="pstat-num">24</span>
            <span class="pstat-label">{{ locale === 'es' ? 'Provincias' : 'Provinces' }}</span>
          </div>
          <div class="pstat-divider"></div>
          <div class="pstat">
            <span class="pstat-num">+1.500</span>
            <span class="pstat-label">{{ locale === 'es' ? 'Instalaciones' : 'Installations' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Region cards ── -->
    <div class="container prov-main">

      <div class="row g-4">
        <div
          v-for="(region, ri) in regions"
          :key="region.key"
          class="col-12 col-md-6 col-xl-4"
          data-aos="fade-up"
          :data-aos-delay="ri * 60"
        >
          <div class="rcard h-100">
            <!-- Card header -->
            <div class="rcard-head">
              <div class="rcard-icon">
                <i :class="region.icon"></i>
              </div>
              <div>
                <h2 class="rcard-name">{{ region.name }}</h2>
                <span class="rcard-count">
                  {{ region.provinces.length }}
                  {{ locale === 'es' ? 'provincias' : 'provinces' }}
                </span>
              </div>
            </div>

            <!-- Province chips -->
            <div class="rcard-chips">
              <button
                v-for="prov in region.provinces"
                :key="prov.slug"
                class="chip"
                @click="goTo(prov.slug)"
              >
                {{ prov.name }}
                <i class="bi bi-arrow-right chip-arrow"></i>
              </button>
            </div>

            <!-- Footer link -->
            <div class="rcard-foot">
              <button class="rcard-cta" @click="goToRegion(region.slug)">
                {{
                  locale === 'es'
                    ? `Ver región ${region.name}`
                    : `View ${region.name} region`
                }}
                <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Eligibility CTA ── -->
      <div class="prov-cta-wrap" data-aos="fade-up">
        <div class="prov-cta-card">
          <div class="prov-cta-icon"><i class="bi bi-patch-check-fill"></i></div>
          <h3 class="prov-cta-title">
            {{ locale === 'es' ? '¿Tu provincia está activa?' : 'Is your province active?' }}
          </h3>
          <p class="prov-cta-sub">
            {{
              locale === 'es'
                ? 'Comprueba tu elegibilidad en 2 minutos. Sin compromiso, sin coste.'
                : 'Check your eligibility in 2 minutes. No commitment, no cost.'
            }}
          </p>
          <router-link :to="localePath('/eligibility', locale)" class="btn btn-tg-primary px-5 py-3">
            {{ locale === 'es' ? '¿Soy elegible?' : 'Am I eligible?' }}
          </router-link>
        </div>
      </div>

    </div><!-- /container -->
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import AOS from 'aos'
  import { localePath } from '@/utils/helpers'

  const { locale } = useI18n()
  const router = useRouter()

  const heroBg = `${import.meta.env.BASE_URL}images/provincies.png`

  onMounted(() => {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 60 })
  })

  const regions = [
    {
      key: 'castilla-leon',
      slug: 'castilla-y-leon',
      icon: 'bi bi-buildings',
      name: 'Castilla y León',
      provinces: [
        { name: 'Ávila',      slug: 'avila' },
        { name: 'Burgos',     slug: 'burgos' },
        { name: 'León',       slug: 'leon' },
        { name: 'Palencia',   slug: 'palencia' },
        { name: 'Salamanca',  slug: 'salamanca' },
        { name: 'Segovia',    slug: 'segovia' },
        { name: 'Soria',      slug: 'soria' },
        { name: 'Valladolid', slug: 'valladolid' },
        { name: 'Zamora',     slug: 'zamora' }
      ]
    },
    {
      key: 'castilla-la-mancha',
      slug: 'castilla-la-mancha',
      icon: 'bi bi-wind',
      name: 'Castilla-La Mancha',
      provinces: [
        { name: 'Albacete',    slug: 'albacete' },
        { name: 'Ciudad Real', slug: 'ciudad-real' },
        { name: 'Cuenca',      slug: 'cuenca' },
        { name: 'Guadalajara', slug: 'guadalajara' },
        { name: 'Toledo',      slug: 'toledo' }
      ]
    },
    {
      key: 'madrid',
      slug: 'madrid',
      icon: 'bi bi-geo-alt',
      name: 'Madrid',
      provinces: [
        { name: 'Madrid', slug: 'madrid' }
      ]
    },
    {
      key: 'galicia',
      slug: 'galicia',
      icon: 'bi bi-droplet',
      name: 'Galicia',
      provinces: [
        { name: 'Lugo',   slug: 'lugo' },
        { name: 'Ourense', slug: 'ourense' }
      ]
    },
    {
      key: 'aragon',
      slug: 'aragon',
      icon: 'bi bi-snow',
      name: 'Aragón',
      provinces: [
        { name: 'Huesca',   slug: 'huesca' },
        { name: 'Teruel',   slug: 'teruel' },
        { name: 'Zaragoza', slug: 'zaragoza' }
      ]
    },
    {
      key: 'otras',
      slug: 'otras-regiones',
      icon: 'bi bi-stars',
      name: locale.value === 'es' ? 'Otras Regiones' : 'Other Regions',
      provinces: [
        { name: 'Asturias',   slug: 'asturias' },
        { name: 'Cantabria',  slug: 'cantabria' },
        { name: 'La Rioja',   slug: 'la-rioja' },
        { name: 'Navarra',    slug: 'navarra' }
      ]
    }
  ]

  function goTo(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    router.push(`/${locale.value}/${base}/${slug}`)
  }

  function goToRegion(slug) {
    const base = locale.value === 'es' ? 'provincias' : 'provinces'
    router.push(`/${locale.value}/${base}/${slug}`)
  }
</script>

<style lang="scss" scoped>
  /* ── Page ── */
  .provinces-page {
    padding-bottom: 5rem;
  }

  /* ── Hero band ── */
  .prov-hero {
    position: relative;
    padding: 8rem 0 5rem;
    overflow: hidden;
    text-align: center;
    color: #fff;
    isolation: isolate;
  }

  .prov-hero-bg {
    position: absolute;
    inset: 0;
    z-index: -2;
    background-size: cover;
    background-position: center 30%;
    background-repeat: no-repeat;
  }

  /* Multi-layer dark gradient: bottom-heavy so stats strip stays readable */
  .prov-hero-overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 100%),
      linear-gradient(135deg, rgba(10,40,12,0.6) 0%, rgba(30,80,35,0.4) 100%);
  }

  .prov-hero-body {
    position: relative;
    z-index: 1;
  }

  .prov-eyebrow {
    display: inline-block;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #c8e6c9;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    margin-bottom: 1.25rem;
  }

  .prov-hero-title {
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .prov-hero-sub {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  /* Stats strip */
  .prov-stats {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 2rem;
    padding: 0.75rem 1.75rem;
  }

  .pstat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }

  .pstat-num {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 900;
    color: #fff;
    line-height: 1;
  }

  .pstat-label {
    font-size: 0.72rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .pstat-divider {
    width: 1px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);

    /* Hide dividers when stats wrap to new rows */
    @media (max-width: 400px) { display: none; }
  }

  /* ── Main content ── */
  .prov-main {
    padding-top: 4rem;
  }

  /* ── Region card ── */
  .rcard {
    background: #fff;
    border: 1.5px solid #e8f0e9;
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    box-shadow: 0 2px 12px rgba(46, 125, 50, 0.06);

    &:hover {
      border-color: #a5d6a7;
      box-shadow: 0 8px 32px rgba(46, 125, 50, 0.14);
      transform: translateY(-3px);
    }
  }

  .rcard-head {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .rcard-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #2e7d32;
    flex-shrink: 0;
  }

  .rcard-name {
    font-size: 1.1rem;
    font-weight: 800;
    color: #1a2e1c;
    margin: 0 0 0.1rem;
    line-height: 1.2;
  }

  .rcard-count {
    font-size: 0.78rem;
    color: #6c9473;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* Province chips */
  .rcard-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: #f1f8f2;
    border: 1px solid #d4e8d6;
    border-radius: 2rem;
    padding: 0.28rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #2e7d32;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease, transform 0.15s ease;

    .chip-arrow {
      font-size: 0.65rem;
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
      transform: translateX(-4px);
    }

    &:hover {
      background: #2e7d32;
      border-color: #2e7d32;
      color: #fff;
      transform: translateY(-1px);

      .chip-arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  /* Card footer */
  .rcard-foot {
    padding-top: 0.5rem;
    border-top: 1px solid #f0f5f0;
  }

  .rcard-cta {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.85rem;
    font-weight: 700;
    color: #388e3c;
    cursor: pointer;
    transition: color 0.18s ease, gap 0.18s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &:hover {
      color: #1b5e20;
      gap: 0.45rem;
    }
  }

  /* ── Bottom CTA ── */
  .prov-cta-wrap {
    margin-top: 4rem;
  }

  .prov-cta-card {
    background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
    border-radius: 24px;
    padding: 3.5rem 2rem;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -60px;
      width: 220px;
      height: 220px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -40px;
      left: -40px;
      width: 160px;
      height: 160px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 50%;
    }
  }

  .prov-cta-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #a5d6a7;
  }

  .prov-cta-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 900;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .prov-cta-sub {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.78);
    margin-bottom: 2rem;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.65;
  }

  /* ── Responsive ── */
  @media (max-width: 575.98px) {
    .prov-hero { padding: 5rem 0 3rem; }
    .prov-stats { padding: 0.65rem 1.25rem; gap: 1rem; }
    .pstat-num { font-size: 1.2rem; }
    .prov-cta-card { padding: 2.5rem 1.25rem; }
  }
</style>
