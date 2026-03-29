import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    stats: {
      installationsCount: 1500,
      rating: 4.9,
      reviewsCount: 600,
      professionalCount: 100,
      savingsPercent: 30
    },
    blogPosts: [],
    isLoadingBlog: false
  }),

  getters: {
    formattedInstallations: (state) => {
      return new Intl.NumberFormat('ro-RO').format(state.stats.installationsCount)
    }
  },

  actions: {
    async fetchBlogPosts() {
      this.isLoadingBlog = true
      try {
        // Static data for now — will be replaced with API call
        this.blogPosts = []
      } finally {
        this.isLoadingBlog = false
      }
    }
  }
})
