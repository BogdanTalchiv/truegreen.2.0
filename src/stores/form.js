import { defineStore } from 'pinia'
import api from '@/utils/api'

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
    currentStep: 1,
    totalSteps: 3,
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  }),

  actions: {
    updateField(field, value) {
      this.eligibilityForm[field] = value
    },

    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    goToStep(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step
      }
    },

    async submitForm() {
      this.isSubmitting = true
      this.submitError = null

      try {
        await api.post('/eligibility', this.eligibilityForm)
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
      this.currentStep = 1
      this.isSubmitted = false
      this.submitError = null
    }
  }
})
