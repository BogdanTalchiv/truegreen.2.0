import { ref, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/ui'

export function useScrollSpy(sectionIds = []) {
  const activeSection = ref('')
  const uiStore = useUiStore()
  let observer = null

  onMounted(() => {
    const options = {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
          uiStore.setCurrentSection(entry.target.id)
        }
      })
    }, options)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { activeSection }
}
