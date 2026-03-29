<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 text-center">
          <h1 class="mb-3">{{ $t('about.title') }}</h1>
          <p class="lead text-muted mb-5">{{ $t('about.subtitle') }}</p>
        </div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-12 col-md-4">
          <div class="tg-card text-center h-100">
            <div class="tg-card-icon mx-auto">
              <i class="bi bi-bullseye"></i>
            </div>
            <h3 class="tg-card-title">{{ locale === 'es' ? 'Misión' : 'Mission' }}</h3>
            <p class="tg-card-text">{{ locale === 'es'
              ? 'Hacemos la eficiencia energética accesible a cada hogar, contribuyendo a un futuro más verde.'
              : 'We make energy efficiency accessible to every home, contributing to a greener future.'
            }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="tg-card text-center h-100">
            <div class="tg-card-icon mx-auto">
              <i class="bi bi-eye"></i>
            </div>
            <h3 class="tg-card-title">{{ locale === 'es' ? 'Visión' : 'Vision' }}</h3>
            <p class="tg-card-text">{{ locale === 'es'
              ? 'Convertirnos en el líder nacional en soluciones de aislamiento térmico financiadas a través de programas oficiales.'
              : 'To become the national leader in thermal insulation solutions funded through official programs.'
            }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="tg-card text-center h-100">
            <div class="tg-card-icon mx-auto">
              <i class="bi bi-heart"></i>
            </div>
            <h3 class="tg-card-title">{{ locale === 'es' ? 'Valores' : 'Values' }}</h3>
            <p class="tg-card-text">{{ locale === 'es'
              ? 'Transparencia, profesionalismo, sostenibilidad y atención a cada cliente.'
              : 'Transparency, professionalism, sustainability and care for every client.'
            }}</p>
          </div>
        </div>
      </div>

      <div class="row align-items-center g-4">
        <div class="col-12 col-lg-6">
          <h2 class="fw-bold mb-3">{{ locale === 'es' ? 'Nuestra historia' : 'Our Story' }}</h2>
          <p class="text-muted">{{ locale === 'es'
            ? 'TrueGreen nació del deseo de hacer los hogares españoles más eficientes energéticamente. Con un equipo de más de 100 profesionales y más de 1.500 instalaciones realizadas, estamos dedicados a transformar cada casa en un hogar más verde y confortable.'
            : 'TrueGreen was born from the desire to make Spanish homes more energy efficient. With a team of over 100 professionals and over 1,500 installations completed, we are dedicated to transforming every house into a greener, more comfortable home.'
          }}</p>
          <p class="text-muted">{{ locale === 'es'
            ? 'A través de los programas oficiales de financiación, ofrecemos soluciones de aislamiento térmico sin ningún coste para los propietarios, contribuyendo al mismo tiempo a reducir la huella de carbono a nivel nacional.'
            : 'Through official funding programs, we offer thermal insulation solutions at no cost to homeowners, while contributing to reducing the national carbon footprint.'
          }}</p>
        </div>
        <div class="col-12 col-lg-6">
          <div class="row g-3">
            <div class="col-6">
              <div class="text-center p-4 bg-light rounded-3">
                <div class="display-5 fw-bold text-success">1.500+</div>
                <div class="text-muted small">{{ locale === 'es' ? 'Instalaciones' : 'Installations' }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center p-4 bg-light rounded-3">
                <div class="display-5 fw-bold text-success">100+</div>
                <div class="text-muted small">{{ locale === 'es' ? 'Profesionales' : 'Professionals' }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center p-4 bg-light rounded-3">
                <div class="display-5 fw-bold text-success">4.9</div>
                <div class="text-muted small">{{ locale === 'es' ? 'Valoración Google' : 'Google Rating' }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="text-center p-4 bg-light rounded-3">
                <div class="display-5 fw-bold text-success">30%</div>
                <div class="text-muted small">{{ locale === 'es' ? 'Ahorro energético' : 'Energy Savings' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
</script>
