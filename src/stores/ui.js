import { defineStore } from 'pinia'
import { activateFullCaching, deactivateFullCaching } from '@/utils/cacheService'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false,
    isScrolled: false,
    currentSection: 'hero',
    isLoading: false,
    showCookieBanner: !localStorage.getItem('tg-cookies-accepted'),
    cookieConsent: localStorage.getItem('tg-cookies-accepted') || null
  }),

  getters: {
    hasFullConsent: (state) => state.cookieConsent === 'true'
  },

  actions: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    setScrollState(value) {
      this.isScrolled = value
    },

    setCurrentSection(section) {
      this.currentSection = section
    },

    acceptCookies() {
      this.showCookieBanner = false
      this.cookieConsent = 'true'
      activateFullCaching()
    },

    declineCookies() {
      this.showCookieBanner = false
      this.cookieConsent = 'essential'
      deactivateFullCaching()
    }
  }
})
