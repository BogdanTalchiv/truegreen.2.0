import { defineStore } from 'pinia'
import api from '@/utils/api'
import i18n from '@/i18n'

function t(key) {
  return i18n.global.t(key)
}

export const useFormStore = defineStore('form', {
  state: () => ({
    eligibilityForm: {
      propertyType: '',
      area: '',
      yearBuilt: '',
      hasAttic: '',
      county: '',
      city: '',
      postalCode: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
      consent: false
    },
    lastSubmission: null,
    currentStep: 1,
    totalSteps: 3,
    isSubmitting: false,
    isSubmitted: false,
    submitError: null,
    validationErrors: {}
  }),

  actions: {
    updateField(field, value) {
      this.eligibilityForm[field] = value
    },

    _validate(step) {
      const errs = {}
      const f = this.eligibilityForm
      const req = t('form.errors.required')

      if (step === 1) {
        if (!String(f.propertyType || '').trim()) errs.propertyType = req
        if (!String(f.area || '').trim() || Number(f.area) <= 0) errs.area = req
        const yr = Number(f.yearBuilt)
        if (!f.yearBuilt || yr < 1800 || yr > new Date().getFullYear() + 1) errs.yearBuilt = req
        if (!String(f.hasAttic || '').trim()) errs.hasAttic = req
      }

      if (step === 2) {
        if (!String(f.county || '').trim()) errs.county = req
        if (!String(f.city || '').trim()) errs.city = req
        if (!/^\d{5}$/.test(String(f.postalCode || '').trim())) {
          errs.postalCode = t('form.errors.postal')
        }
      }

      if (step === 3) {
        if (!String(f.firstName || '').trim()) errs.firstName = req
        if (!String(f.lastName || '').trim()) errs.lastName = req
        if (!String(f.phone || '').trim()) errs.phone = req
        if (!String(f.email || '').trim()) {
          errs.email = req
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
          errs.email = t('form.errors.email')
        }
        if (!String(f.message || '').trim()) errs.message = req
        if (!f.consent) errs.consent = t('form.errors.consent')
      }

      return errs
    },

    nextStep() {
      const errs = this._validate(this.currentStep)
      this.validationErrors = errs
      if (Object.keys(errs).length === 0 && this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.validationErrors = {}
        this.currentStep--
      }
    },

    goToStep(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.validationErrors = {}
        this.currentStep = step
      }
    },

    async submitForm() {
      /* Validate all steps before submitting */
      for (let s = 1; s <= this.totalSteps; s++) {
        const errs = this._validate(s)
        if (Object.keys(errs).length > 0) {
          this.validationErrors = errs
          this.currentStep = s
          return
        }
      }

      this.isSubmitting = true
      this.submitError = null
      this.validationErrors = {}

      try {
        await api.post('/send-eligibility', { ...this.eligibilityForm })
        this.lastSubmission = { ...this.eligibilityForm }
        this.isSubmitted = true
      } catch (error) {
        this.submitError = error.message || 'An error occurred'
      } finally {
        this.isSubmitting = false
      }
    },

    resetForm() {
      this.eligibilityForm = {
        propertyType: '',
        area: '',
        yearBuilt: '',
        hasAttic: '',
        county: '',
        city: '',
        postalCode: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        consent: false
      }
      this.lastSubmission = null
      this.currentStep = 1
      this.isSubmitted = false
      this.submitError = null
      this.validationErrors = {}
    }
  }
})
