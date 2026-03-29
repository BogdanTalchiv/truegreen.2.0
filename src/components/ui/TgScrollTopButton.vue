<template>
  <Transition name="scroll-top">
    <button
      v-if="visible"
      class="scroll-top-btn"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </Transition>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useSmoothScroll } from '@/composables/useSmoothScroll'

  const { scrollToTop } = useSmoothScroll()
  const visible = ref(false)

  function onScroll() {
    visible.value = window.scrollY > 300
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scoped>
  .scroll-top-btn {
    position: fixed;
    bottom: 5.5rem;
    right: 1.75rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    @include gradient-primary;
    color: white;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: $zindex-scroll-top;
    box-shadow: 0 4px 12px rgba($tg-primary, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($tg-primary, 0.4);
    }
  }
</style>
