import { ref, onMounted, onUnmounted } from 'vue'

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

export function useBreakpoint() {
  const current = ref('xs')
  const width = ref(0)

  function update() {
    width.value = window.innerWidth

    if (width.value >= BREAKPOINTS.xxl) current.value = 'xxl'
    else if (width.value >= BREAKPOINTS.xl) current.value = 'xl'
    else if (width.value >= BREAKPOINTS.lg) current.value = 'lg'
    else if (width.value >= BREAKPOINTS.md) current.value = 'md'
    else if (width.value >= BREAKPOINTS.sm) current.value = 'sm'
    else current.value = 'xs'
  }

  const isMobile = () => ['xs', 'sm'].includes(current.value)
  const isTablet = () => current.value === 'md'
  const isDesktop = () => ['lg', 'xl', 'xxl'].includes(current.value)

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { current, width, isMobile, isTablet, isDesktop, BREAKPOINTS }
}
