<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 col-xl-6">
          <div class="text-center mb-4">
            <h1 class="mb-2">{{ $t('nav.checkEligibility') }}</h1>
            <p class="text-muted">
              {{ locale === 'es'
                ? 'Rellena el formulario de abajo para verificar si tu vivienda es elegible.'
                : 'Fill in the form below to check if your home is eligible.'
              }}
            </p>
          </div>

          <div v-if="formStore.isSubmitted" class="tg-card text-center py-5">
            <i class="bi bi-check-circle text-success display-3 mb-3 d-block"></i>
            <h3 class="text-success mb-2">{{ locale === 'es' ? '¡Gracias!' : 'Thank you!' }}</h3>
            <p class="text-muted">{{ $t('form.success') }}</p>
            <button class="btn btn-tg-primary" @click="formStore.resetForm()">
              {{ locale === 'es' ? 'Enviar otra solicitud' : 'Submit another request' }}
            </button>
          </div>

          <div v-else class="tg-card">
            <!-- Progress -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="fw-semibold">
                {{ $t('form.step') }} {{ formStore.currentStep }} {{ $t('form.of') }} {{ formStore.totalSteps }}
              </span>
              <div class="progress flex-grow-1 ms-3" style="height: 6px">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: (formStore.currentStep / formStore.totalSteps * 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Step 1: Property -->
            <div v-show="formStore.currentStep === 1">
              <h4 class="mb-3">{{ $t('form.propertyInfo') }}</h4>
              <TgSelect
                id="propertyType"
                :label="$t('form.propertyType')"
                v-model="formStore.eligibilityForm.propertyType"
                :options="[
                  { value: 'house', label: $t('form.house') },
                  { value: 'apartment', label: $t('form.apartment') },
                  { value: 'building', label: $t('form.building') }
                ]"
                :placeholder="$t('form.propertyType')"
                required
              />
              <TgInput
                id="area"
                :label="$t('form.area')"
                type="number"
                v-model="formStore.eligibilityForm.area"
                placeholder="100"
                required
              />
              <TgInput
                id="yearBuilt"
                :label="$t('form.yearBuilt')"
                type="number"
                v-model="formStore.eligibilityForm.yearBuilt"
                placeholder="1990"
                required
              />
              <TgSelect
                id="hasAttic"
                :label="$t('form.hasAttic')"
                v-model="formStore.eligibilityForm.hasAttic"
                :options="[
                  { value: 'yes', label: $t('form.yes') },
                  { value: 'no', label: $t('form.no') }
                ]"
                :placeholder="$t('form.hasAttic')"
                required
              />
            </div>

            <!-- Step 2: Location -->
            <div v-show="formStore.currentStep === 2">
              <h4 class="mb-3">{{ $t('form.locationInfo') }}</h4>
              <TgSelect
                id="county"
                :label="$t('form.county')"
                v-model="formStore.eligibilityForm.county"
                :options="provinces"
                :placeholder="$t('form.county')"
                required
              />
              <TgInput
                id="city"
                :label="$t('form.city')"
                v-model="formStore.eligibilityForm.city"
                :placeholder="$t('form.city')"
                required
              />
              <TgInput
                id="postalCode"
                :label="$t('form.postalCode')"
                v-model="formStore.eligibilityForm.postalCode"
                placeholder="28001"
              />
            </div>

            <!-- Step 3: Personal -->
            <div v-show="formStore.currentStep === 3">
              <h4 class="mb-3">{{ $t('form.personalInfo') }}</h4>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <TgInput
                    id="firstName"
                    :label="$t('form.firstName')"
                    v-model="formStore.eligibilityForm.firstName"
                    required
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <TgInput
                    id="lastName"
                    :label="$t('form.lastName')"
                    v-model="formStore.eligibilityForm.lastName"
                    required
                  />
                </div>
              </div>
              <TgInput
                id="phone"
                :label="$t('form.phone')"
                type="tel"
                v-model="formStore.eligibilityForm.phone"
                placeholder="+34 6XX XXX XXX"
                required
              />
              <TgInput
                id="email"
                :label="$t('form.email')"
                type="email"
                v-model="formStore.eligibilityForm.email"
                placeholder="email@ejemplo.es"
                required
              />
              <TgTextarea
                id="message"
                :label="$t('form.message')"
                v-model="formStore.eligibilityForm.message"
                :placeholder="locale === 'es' ? 'Mensaje opcional...' : 'Optional message...'"
                :rows="3"
              />
              <TgCheckbox
                id="consent"
                v-model="formStore.eligibilityForm.consent"
              >
                {{ $t('form.consent') }}
                <router-link :to="privacyRoute" class="text-success">
                  {{ $t('form.privacyLink') }}
                </router-link>.
              </TgCheckbox>
            </div>

            <div v-if="formStore.submitError" class="alert alert-danger mt-3">
              {{ formStore.submitError }}
            </div>

            <!-- Navigation -->
            <div class="d-flex justify-content-between mt-4">
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
                class="btn btn-tg-cta"
                :disabled="formStore.isSubmitting"
                @click="formStore.submitForm()"
              >
                <span v-if="formStore.isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                {{ $t('form.submit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useFormStore } from '@/stores/form'
  import { PROVINCES } from '@/utils/constants'
  import TgInput from '@/components/form/TgInput.vue'
  import TgSelect from '@/components/form/TgSelect.vue'
  import TgTextarea from '@/components/form/TgTextarea.vue'
  import TgCheckbox from '@/components/form/TgCheckbox.vue'

  const { locale } = useI18n()
  const formStore = useFormStore()
  const provinces = PROVINCES

  const privacyRoute = computed(() =>
    locale.value === 'es' ? '/es/politica-privacidad' : '/en/privacy-policy'
  )
</script>
