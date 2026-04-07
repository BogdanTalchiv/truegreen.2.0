import { defineStore } from 'pinia'
import i18n from '@/i18n'
import { saveFormDraft, loadFormDraft, clearFormDraft } from '@/utils/cacheService'

function t(key) {
  return i18n.global.t(key)
}

const MAIL_TO = 'truegreenenergysl@gmail.com'

function buildEmailContent(f) {
  const lang = i18n.global.locale.value || 'es'
  const isEs = lang === 'es'

  const LABELS = {
    propertyType : isEs ? 'Tipo de propiedad'       : 'Property type',
    area         : isEs ? 'Superficie (m2)'         : 'Area (m2)',
    yearBuilt    : isEs ? 'Año de construccion'     : 'Year built',
    hasAttic     : isEs ? 'Tiene desvan/buhardilla' : 'Has attic',
    county       : isEs ? 'Provincia'               : 'Province',
    city         : isEs ? 'Ciudad'                  : 'City',
    postalCode   : isEs ? 'Codigo postal'           : 'Postal code',
    firstName    : isEs ? 'Nombre'                  : 'First name',
    lastName     : isEs ? 'Apellidos'               : 'Last name',
    phone        : isEs ? 'Telefono'                : 'Phone',
    email        : isEs ? 'Correo electronico'      : 'Email',
    message      : isEs ? 'Mensaje adicional'       : 'Additional message'
  }

  const name = [f.firstName, f.lastName].filter(Boolean).join(' ') || 'Cliente'

  const subject = isEs
    ? `[TrueGreen] Solicitud de elegibilidad - ${name}`
    : `[TrueGreen] Eligibility request - ${name}`

  const divider = '-'.repeat(42)
  const bodyLines = [
    isEs
      ? 'Nueva solicitud de elegibilidad recibida desde truegreen.vercel.app'
      : 'New eligibility request from truegreen.vercel.app',
    '',
    divider,
    ...Object.entries(LABELS)
      .filter(([key]) => f[key] != null && f[key] !== '' && f[key] !== false)
      .map(([key, label]) => `${label}: ${f[key]}`),
    divider,
    '',
    isEs
      ? 'Por favor, contacta al cliente lo antes posible.'
      : 'Please contact the client as soon as possible.'
  ]

  const body = bodyLines.join('\r\n')

  return { subject, body, name }
}

/**
 * Standard mailto: URL — opens the default mail client on every platform
 * (Outlook, Apple Mail, Thunderbird, Gmail desktop app, etc.)
 */
function buildMailtoUrl(f) {
  const { subject, body } = buildEmailContent(f)
  return (
    `mailto:${MAIL_TO}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  )
}

/**
 * Gmail web-compose URL — opens Gmail in the browser tab
 */
function buildGmailUrl(f) {
  const { subject, body } = buildEmailContent(f)
  return (
    'https://mail.google.com/mail/?view=cm&fs=1' +
    `&to=${encodeURIComponent(MAIL_TO)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  )
}

/**
 * Most reliable cross-platform way to trigger a mailto: link.
 * Creates a temporary <a> element and clicks it — avoids popup-blocker
 * issues that come from window.open().
 */
function openMailto(url) {
  const a = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  // Small delay before removal so mobile browsers can process the click
  setTimeout(() => document.body.removeChild(a), 300)
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
    lastMailto: null,
    lastGmailUrl: null,
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
      // Auto-save draft to localStorage when user has accepted cookies
      saveFormDraft({ ...this.eligibilityForm })
    },

    loadDraftIfAvailable() {
      const draft = loadFormDraft()
      if (draft) {
        Object.keys(this.eligibilityForm).forEach((key) => {
          if (draft[key] !== undefined) this.eligibilityForm[key] = draft[key]
        })
      }
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
        // message is optional — no validation required
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

    submitForm() {
      /* Validate all steps before opening mail client */
      for (let s = 1; s <= this.totalSteps; s++) {
        const errs = this._validate(s)
        if (Object.keys(errs).length > 0) {
          this.validationErrors = errs
          this.currentStep = s
          return
        }
      }

      this.submitError = null
      this.validationErrors = {}

      // Build both URLs and store them
      this.lastMailto     = buildMailtoUrl(this.eligibilityForm)  // universal
      this.lastGmailUrl   = buildGmailUrl(this.eligibilityForm)   // Gmail web

      // Open with the default mail client (Outlook, Apple Mail, etc.)
      // Falls back to Gmail if the user has it configured as default
      openMailto(this.lastMailto)

      // Mark as submitted so the success screen is shown
      this.lastSubmission = { ...this.eligibilityForm }
      this.isSubmitted = true
      clearFormDraft()
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
      this.lastMailto = null
      this.lastGmailUrl = null
      this.currentStep = 1
      this.isSubmitted = false
      this.submitError = null
      this.validationErrors = {}
      clearFormDraft()
    }
  }
})
