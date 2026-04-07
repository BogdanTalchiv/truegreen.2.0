<template>
  <div class="elig-page">
    <!-- Hero band -->
    <div class="elig-hero">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-12 col-lg-7">
            <span class="elig-eyebrow">
              <i class="bi bi-check2-circle me-2"></i>
              {{ locale === 'es' ? 'Programa CAE — 100% gratuito' : 'CAE Programme — 100% free' }}
            </span>
            <h1 class="elig-hero-title">{{ $t('nav.checkEligibility') }}</h1>
            <p class="elig-hero-sub">
              {{ locale === 'es'
                  ? 'Comprueba en menos de 2 minutos si tu vivienda cumple los requisitos del programa oficial.'
                  : 'Check in under 2 minutes if your home meets the requirements of the official programme.' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form body -->
    <div class="container elig-body">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 col-xl-7">

          <!-- ─── Success ─── -->
          <div v-if="formStore.isSubmitted && formStore.lastSubmission" class="success-block" data-aos="fade-up">
            <div class="success-icon-wrap">
              <i class="bi bi-envelope-check-fill"></i>
            </div>
            <h2 class="success-title">
              {{ locale === 'es' ? '¡Casi listo!' : 'Almost done!' }}
            </h2>
            <p class="success-sub">
              {{
                locale === 'es'
                  ? 'Se ha abierto tu aplicación de correo con el mensaje ya redactado. Solo tienes que pulsar «Enviar».'
                  : 'Your email app has opened with the message already written. Just click "Send".'
              }}
            </p>

            <!-- Visual hint -->
            <div class="mailto-hint">
              <div class="mailto-hint-step">
                <span class="mailto-hint-num">1</span>
                <span>{{ locale === 'es' ? 'Se ha abierto Gmail / tu correo' : 'Gmail / your mail app opened' }}</span>
              </div>
              <div class="mailto-hint-arrow"><i class="bi bi-arrow-right"></i></div>
              <div class="mailto-hint-step">
                <span class="mailto-hint-num">2</span>
                <span>{{ locale === 'es' ? 'El mensaje ya está escrito' : 'The message is already written' }}</span>
              </div>
              <div class="mailto-hint-arrow"><i class="bi bi-arrow-right"></i></div>
              <div class="mailto-hint-step mailto-hint-step--final">
                <span class="mailto-hint-num">3</span>
                <span>{{ locale === 'es' ? 'Pulsa «Enviar» ✓' : 'Press "Send" ✓' }}</span>
              </div>
            </div>

            <!-- Re-open link in case the tab didn't open -->
            <p class="reopen-tip text-muted small mt-3">
              {{ locale === 'es' ? '¿No se abrió el correo?' : "Didn't it open?" }}
              <a href="#" class="text-success fw-semibold ms-1" @click.prevent="reopenMailto">
                {{ locale === 'es' ? 'Haz clic aquí' : 'Click here' }}
              </a>
            </p>

            <!-- Summary table -->
            <div class="summary-card mt-4">
              <h4 class="summary-card-title">
                <i class="bi bi-clipboard2-data me-2 text-success"></i>
                {{ locale === 'es' ? 'Datos enviados' : 'Submitted data' }}
              </h4>
              <div class="table-responsive">
                <table class="summary-table">
                  <tbody>
                    <tr v-for="row in summaryRows" :key="row.key">
                      <th>{{ row.label }}</th>
                      <td>{{ row.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button class="btn btn-tg-primary mt-4 px-4" @click="formStore.resetForm()">
              <i class="bi bi-arrow-repeat me-2"></i>
              {{ locale === 'es' ? 'Nueva solicitud' : 'New request' }}
            </button>
          </div>

          <!-- ─── Multi-step form ─── -->
          <div v-else>
            <!-- Step progress indicators -->
            <div class="step-progress mb-4" data-aos="fade-up">
              <div
                v-for="s in formStore.totalSteps"
                :key="s"
                class="step-dot"
                :class="{
                  'step-dot--done'   : s < formStore.currentStep,
                  'step-dot--active' : s === formStore.currentStep
                }"
                @click="s < formStore.currentStep && formStore.goToStep(s)"
              >
                <span class="step-dot-inner">
                  <i v-if="s < formStore.currentStep" class="bi bi-check2"></i>
                  <span v-else>{{ s }}</span>
                </span>
                <span class="step-dot-label">{{ STEP_LABELS[locale][s - 1] }}</span>
              </div>
              <div class="step-progress-line">
                <div
                  class="step-progress-fill"
                  :style="{ width: ((formStore.currentStep - 1) / (formStore.totalSteps - 1) * 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Card form -->
            <div class="form-card" data-aos="fade-up">
              <!-- Step 1: Property -->
              <transition name="step-slide" mode="out-in">
                <div v-if="formStore.currentStep === 1" key="step1">
                  <h3 class="form-step-title">
                    <span class="form-step-num">1</span>
                    {{ locale === 'es' ? 'Datos de la vivienda' : 'Property details' }}
                  </h3>

                  <div class="row g-3">
                    <div class="col-12 col-sm-6">
                      <TgSelect
                        id="propertyType"
                        :label="$t('form.propertyType')"
                        v-model="formStore.eligibilityForm.propertyType"
                        :options="[
                          { value: 'house',     label: $t('form.house') },
                          { value: 'apartment', label: $t('form.apartment') },
                          { value: 'building',  label: $t('form.building') }
                        ]"
                        :placeholder="$t('form.propertyType')"
                        required
                        :error="formStore.validationErrors.propertyType"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="area" :label="$t('form.area')" type="number"
                        v-model="formStore.eligibilityForm.area" placeholder="100"
                        required :error="formStore.validationErrors.area"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="yearBuilt" :label="$t('form.yearBuilt')" type="number"
                        v-model="formStore.eligibilityForm.yearBuilt" placeholder="1990"
                        required :error="formStore.validationErrors.yearBuilt"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgSelect
                        id="hasAttic" :label="$t('form.hasAttic')"
                        v-model="formStore.eligibilityForm.hasAttic"
                        :options="[
                          { value: 'yes', label: $t('form.yes') },
                          { value: 'no',  label: $t('form.no') }
                        ]"
                        :placeholder="$t('form.hasAttic')"
                        required :error="formStore.validationErrors.hasAttic"
                      />
                    </div>
                  </div>
                </div>

                <!-- Step 2: Location -->
                <div v-else-if="formStore.currentStep === 2" key="step2">
                  <h3 class="form-step-title">
                    <span class="form-step-num">2</span>
                    {{ locale === 'es' ? 'Ubicación' : 'Location' }}
                  </h3>
                  <div class="row g-3">
                    <div class="col-12">
                      <TgSelect
                        id="county" :label="$t('form.county')"
                        v-model="formStore.eligibilityForm.county"
                        :options="provinces" :placeholder="$t('form.county')"
                        required :error="formStore.validationErrors.county"
                      />
                    </div>
                    <div class="col-12 col-sm-8">
                      <TgInput
                        id="city" :label="$t('form.city')"
                        v-model="formStore.eligibilityForm.city" :placeholder="$t('form.city')"
                        required :error="formStore.validationErrors.city"
                      />
                    </div>
                    <div class="col-12 col-sm-4">
                      <TgInput
                        id="postalCode" :label="$t('form.postalCode')"
                        v-model="formStore.eligibilityForm.postalCode" placeholder="28001"
                        required :error="formStore.validationErrors.postalCode"
                      />
                    </div>
                  </div>
                </div>

                <!-- Step 3: Personal -->
                <div v-else-if="formStore.currentStep === 3" key="step3">
                  <h3 class="form-step-title">
                    <span class="form-step-num">3</span>
                    {{ locale === 'es' ? 'Datos de contacto' : 'Contact details' }}
                  </h3>
                  <div class="row g-3">
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="firstName" :label="$t('form.firstName')"
                        v-model="formStore.eligibilityForm.firstName"
                        required :error="formStore.validationErrors.firstName"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="lastName" :label="$t('form.lastName')"
                        v-model="formStore.eligibilityForm.lastName"
                        required :error="formStore.validationErrors.lastName"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="phone" :label="$t('form.phone')" type="tel"
                        v-model="formStore.eligibilityForm.phone" placeholder="+34 6XX XXX XXX"
                        required :error="formStore.validationErrors.phone"
                      />
                    </div>
                    <div class="col-12 col-sm-6">
                      <TgInput
                        id="email" :label="$t('form.email')" type="email"
                        v-model="formStore.eligibilityForm.email" placeholder="email@ejemplo.es"
                        required :error="formStore.validationErrors.email"
                      />
                    </div>
                    <div class="col-12">
                      <TgTextarea
                        id="message" :label="$t('form.message')"
                        v-model="formStore.eligibilityForm.message"
                        :placeholder="locale === 'es' ? 'Observaciones opcionales sobre la vivienda...' : 'Optional notes about the property...'"
                        :rows="3" :error="formStore.validationErrors.message"
                      />
                    </div>
                    <div class="col-12">
                      <TgCheckbox id="consent" v-model="formStore.eligibilityForm.consent" :error="formStore.validationErrors.consent">
                        {{ $t('form.consent') }}
                        <router-link :to="privacyRoute" class="text-success fw-medium">{{ $t('form.privacyLink') }}</router-link>.
                      </TgCheckbox>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Error banner -->
              <div v-if="formStore.submitError" class="alert alert-danger mt-3 small">
                <i class="bi bi-exclamation-triangle me-2"></i>{{ formStore.submitError }}
              </div>

              <!-- Navigation buttons -->
              <div class="form-nav mt-4">
                <button
                  v-if="formStore.currentStep > 1"
                  class="btn btn-tg-ghost"
                  @click="formStore.prevStep()"
                >
                  <i class="bi bi-arrow-left me-1"></i>{{ $t('form.previous') }}
                </button>
                <div v-else></div>

                <button
                  v-if="formStore.currentStep < formStore.totalSteps"
                  class="btn btn-tg-primary"
                  @click="formStore.nextStep()"
                >
                  {{ $t('form.next') }}<i class="bi bi-arrow-right ms-1"></i>
                </button>
                <button
                  v-else
                  class="btn btn-tg-cta btn-submit"
                  @click="formStore.submitForm()"
                >
                  <i class="bi bi-envelope-arrow-up me-2"></i>
                  {{ locale === 'es' ? 'Abrir correo y enviar' : 'Open mail & send' }}
                </button>
              </div>
            </div>

            <!-- Trust badges -->
            <div class="trust-row mt-4" data-aos="fade-up">
              <div class="trust-badge">
                <i class="bi bi-shield-lock-fill text-success"></i>
                {{ locale === 'es' ? 'Datos protegidos' : 'Data protected' }}
              </div>
              <div class="trust-badge">
                <i class="bi bi-clock-fill text-success"></i>
                {{ locale === 'es' ? 'Respuesta en 24 h' : 'Reply within 24 h' }}
              </div>
              <div class="trust-badge">
                <i class="bi bi-patch-check-fill text-success"></i>
                {{ locale === 'es' ? 'Sin compromiso' : 'No commitment' }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useFormStore } from '@/stores/form'
  import { PROVINCES } from '@/utils/constants'
  import TgInput from '@/components/form/TgInput.vue'
  import TgSelect from '@/components/form/TgSelect.vue'
  import TgTextarea from '@/components/form/TgTextarea.vue'
  import TgCheckbox from '@/components/form/TgCheckbox.vue'
  import AOS from 'aos'

  const { locale, t } = useI18n()
  const formStore = useFormStore()
  const provinces = PROVINCES

  const STEP_LABELS = {
    es: ['Vivienda', 'Ubicación', 'Contacto'],
    en: ['Property', 'Location', 'Contact']
  }

  const privacyRoute = computed(() =>
    locale.value === 'es' ? '/es/politica-privacidad' : '/en/privacy-policy'
  )

  function reopenMailto() {
    if (formStore.lastMailto) window.open(formStore.lastMailto, '_blank')
  }

  /* Summary table rows */
  const SUMMARY_KEYS = ['propertyType','area','yearBuilt','hasAttic','county','city','postalCode','firstName','lastName','phone','email','message']

  function labelOf(key) {
    const m = {
      propertyType : t('form.propertyType'),
      area         : t('form.area'),
      yearBuilt    : t('form.yearBuilt'),
      hasAttic     : t('form.hasAttic'),
      county       : t('form.county'),
      city         : t('form.city'),
      postalCode   : t('form.postalCode'),
      firstName    : t('form.firstName'),
      lastName     : t('form.lastName'),
      phone        : t('form.phone'),
      email        : t('form.email'),
      message      : t('form.message')
    }
    return m[key] || key
  }

  function displayValue(key, val) {
    if (key === 'propertyType') {
      return { house: t('form.house'), apartment: t('form.apartment'), building: t('form.building') }[val] || val
    }
    if (key === 'hasAttic') return { yes: t('form.yes'), no: t('form.no') }[val] || val
    return val || '—'
  }

  const summaryRows = computed(() => {
    const s = formStore.lastSubmission
    if (!s) return []
    return SUMMARY_KEYS
      .filter(k => s[k] != null && s[k] !== '')
      .map(k => ({ key: k, label: labelOf(k), value: displayValue(k, s[k]) }))
  })

  onMounted(() => AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 80 }))
</script>

<style lang="scss" scoped>
  /* ── Hero band ── */
  .elig-page { background: #f7faf8; min-height: 100vh; }

  .elig-hero {
    background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%);
    padding: 7rem 0 4rem;
    text-align: center;
  }

  .elig-eyebrow {
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    padding: 0.35rem 1rem;
    border-radius: 2rem;
    letter-spacing: 0.03em;
    margin-bottom: 1rem;
  }

  .elig-hero-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #fff;
    margin-bottom: 0.875rem;
  }

  .elig-hero-sub {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.82);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.65;
  }

  /* ── Body ── */
  .elig-body { padding: 2.5rem 0 5rem; }

  /* ── Step progress ── */
  .step-progress {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .step-progress-line {
    position: absolute;
    top: 22px;
    left: 22px;
    right: 22px;
    height: 3px;
    background: #e0e8e2;
    z-index: 0;
  }

  .step-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #2e7d32);
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .step-dot {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    cursor: default;

    &--done { cursor: pointer; }
  }

  .step-dot-inner {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #e0e8e2;
    border: 2px solid #b8ccba;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.95rem;
    color: #6c757d;
    transition: all 0.25s ease;

    .step-dot--done & {
      background: $tg-primary;
      border-color: $tg-primary;
      color: #fff;
    }

    .step-dot--active & {
      background: #fff;
      border-color: $tg-primary;
      color: $tg-primary;
      box-shadow: 0 0 0 5px rgba($tg-primary, 0.15);
    }
  }

  .step-dot-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: #9aaba0;
    white-space: nowrap;

    .step-dot--active & { color: $tg-primary; }
    .step-dot--done &   { color: $tg-text-primary; }
  }

  /* ── Form card ── */
  .form-card {
    background: #fff;
    border: 1.5px solid #e4ede6;
    border-radius: 20px;
    padding: 2rem 1.75rem;
    box-shadow: 0 8px 32px rgba(13, 59, 15, 0.07);

    @media (min-width: 768px) { padding: 2.5rem; }
  }

  .form-step-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .form-step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ── Navigation row ── */
  .form-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.25rem;
    border-top: 1px solid #f0f4f1;
  }

  .btn-submit {
    min-width: 180px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Step slide transition ── */
  .step-slide-enter-active,
  .step-slide-leave-active { transition: all 0.28s ease; }
  .step-slide-enter-from   { opacity: 0; transform: translateX(24px); }
  .step-slide-leave-to     { opacity: 0; transform: translateX(-24px); }

  /* ── Trust badges ── */
  .trust-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1.5rem;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: $tg-text-secondary;
    font-weight: 500;
  }

  /* ── Success block ── */
  .success-block {
    text-align: center;
    padding: 1rem 0 2rem;
    animation: si-fade 0.4s ease;
  }

  @keyframes si-fade {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: none; }
  }

  .success-icon-wrap {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, $tg-primary, $tg-primary-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.25rem;
    box-shadow: 0 8px 24px rgba(46, 125, 50, 0.4);

    i { font-size: 2rem; color: #fff; }
  }

  .success-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: $tg-text-primary;
    margin-bottom: 0.5rem;
  }

  .success-sub { margin-bottom: 1.5rem; font-size: 1.05rem; color: #4a5a4c; }

  /* ── Mailto step hints ── */
  .mailto-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;

    /* On very small screens hide the arrows and stack vertically */
    @media (max-width: 420px) {
      flex-direction: column;
      gap: 0.4rem;

      .mailto-hint-arrow { transform: rotate(90deg); }
    }
  }

  .mailto-hint-step {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: #f1f8f2;
    border: 1px solid #c8e6c9;
    border-radius: 2rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.83rem;
    font-weight: 600;
    color: #2e7d32;

    &--final {
      background: #2e7d32;
      border-color: #2e7d32;
      color: #fff;
    }
  }

  .mailto-hint-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(46, 125, 50, 0.15);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 800;
    flex-shrink: 0;

    .mailto-hint-step--final & {
      background: rgba(255, 255, 255, 0.25);
      color: #fff;
    }
  }

  .mailto-hint-arrow {
    color: #a5d6a7;
    font-size: 0.8rem;
  }

  .reopen-tip { font-size: 0.82rem; }

  /* ── Summary card ── */
  .summary-card {
    background: #fff;
    border: 1.5px solid #e4ede6;
    border-radius: 18px;
    padding: 1.75rem;
    text-align: left;
    box-shadow: 0 8px 32px rgba(13, 59, 15, 0.07);
  }

  .summary-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 1.25rem;
  }

  .summary-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.9rem;
    border: 1px solid #e4ede6;
    border-radius: 12px;
    overflow: hidden;

    th, td {
      padding: 0.9rem 1.2rem;
      border-bottom: 1px solid #eef1f0;
      vertical-align: middle;
    }

    tr:last-child th,
    tr:last-child td { border-bottom: none; }

    th {
      width: 38%;
      background: #f6faf7;
      font-weight: 600;
      color: #5a6360;
      border-right: 1px solid #eef1f0;
      white-space: nowrap;
    }

    td { color: $tg-text-primary; word-break: break-word; }
    tr:hover th, tr:hover td { background: rgba($tg-primary, 0.025); }
  }
</style>
