<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="text-center mb-5">
        <h1 class="mb-3">{{ $t('services.title') }}</h1>
        <p class="lead text-muted">{{ $t('services.subtitle') }}</p>
      </div>

      <div class="row g-4">
        <div v-for="service in services" :key="service.icon" class="col-12 col-md-6 col-lg-4">
          <div class="tg-card h-100">
            <div class="tg-card-icon">
              <i :class="service.icon"></i>
            </div>
            <h3 class="tg-card-title">{{ service.title[locale] }}</h3>
            <p class="tg-card-text">{{ service.description[locale] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const services = [
    {
      icon: 'bi bi-house-up',
      title: { ro: 'Izolarea Mansardelor', en: 'Attic Insulation' },
      description: {
        ro: 'Izolație cu lână minerală suflată pentru mansarde și poduri nelocuibile. Sistem rapid, curat și eficient.',
        en: 'Blown mineral wool insulation for attics and uninhabitable lofts. Fast, clean and efficient system.'
      }
    },
    {
      icon: 'bi bi-thermometer-half',
      title: { ro: 'Audit Energetic', en: 'Energy Audit' },
      description: {
        ro: 'Evaluarea completă a performanței energetice a locuinței și recomandări personalizate de îmbunătățire.',
        en: 'Complete evaluation of your home energy performance with personalized improvement recommendations.'
      }
    },
    {
      icon: 'bi bi-file-earmark-check',
      title: { ro: 'Documentație Completă', en: 'Complete Documentation' },
      description: {
        ro: 'Pregătirea întregului dosar tehnic necesar pentru programul oficial de finanțare, fără niciun efort din partea ta.',
        en: 'Preparation of the entire technical file required for the official funding program, without any effort on your part.'
      }
    },
    {
      icon: 'bi bi-shield-check',
      title: { ro: 'Verificare și Certificare', en: 'Verification & Certification' },
      description: {
        ro: 'Verificare independentă a economiilor energetice de către organisme acreditate.',
        en: 'Independent verification of energy savings by accredited bodies.'
      }
    },
    {
      icon: 'bi bi-tools',
      title: { ro: 'Instalare Profesională', en: 'Professional Installation' },
      description: {
        ro: 'Echipă de tehnicieni certificați cu experiență vastă în izolații termice rezidențiale.',
        en: 'Team of certified technicians with extensive experience in residential thermal insulation.'
      }
    },
    {
      icon: 'bi bi-headset',
      title: { ro: 'Suport Post-Instalare', en: 'Post-Installation Support' },
      description: {
        ro: 'Asistență continuă după finalizarea lucrărilor. Garanție și monitorizare a performanței.',
        en: 'Ongoing assistance after work completion. Warranty and performance monitoring.'
      }
    }
  ]
</script>
