import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false,
    isScrolled: false,
    currentSection: 'hero',
    isLoading: false,
    showCookieBanner: !localStorage.getItem('tg-cookies-accepted')
  }),

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
      localStorage.setItem('tg-cookies-accepted', 'true')
    },

    declineCookies() {
      this.showCookieBanner = false
      localStorage.setItem('tg-cookies-accepted', 'essential')
    }
  }
})
