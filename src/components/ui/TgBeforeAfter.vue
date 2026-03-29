<template>
  <div
    ref="containerRef"
    class="ba-container"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
    role="slider"
    :aria-valuenow="Math.round(position)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="beforeLabel + ' / ' + afterLabel"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div class="ba-image ba-image--after">
      <img :src="afterImage" :alt="afterLabel" loading="lazy" />
    </div>

    <div class="ba-image ba-image--before" :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }">
      <img :src="beforeImage" :alt="beforeLabel" loading="lazy" />
    </div>

    <div class="ba-handle" :style="{ left: position + '%' }">
      <div class="ba-handle-line"></div>
      <div class="ba-handle-knob">
        <i class="bi bi-arrows-expand" style="transform: rotate(90deg)"></i>
      </div>
    </div>

    <span class="ba-label ba-label--before">{{ beforeLabel }}</span>
    <span class="ba-label ba-label--after">{{ afterLabel }}</span>
  </div>
</template>

<script setup>
  import { ref, onUnmounted } from 'vue'
  import { clamp } from '@/utils/helpers'

  defineProps({
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    beforeLabel: { type: String, default: 'Before' },
    afterLabel: { type: String, default: 'After' }
  })

  const containerRef = ref(null)
  const position = ref(50)
  let isDragging = false

  function getPosition(event) {
    if (!containerRef.value) return 50
    const rect = containerRef.value.getBoundingClientRect()
    const clientX = event.touches ? event.touches[0].clientX : event.clientX
    const x = clientX - rect.left
    return clamp((x / rect.width) * 100, 0, 100)
  }

  function startDrag(event) {
    isDragging = true
    position.value = getPosition(event)
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', onDrag, { passive: true })
    document.addEventListener('touchend', stopDrag)
  }

  function onDrag(event) {
    if (!isDragging) return
    position.value = getPosition(event)
  }

  function stopDrag() {
    isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('touchend', stopDrag)
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowLeft') position.value = clamp(position.value - 2, 0, 100)
    if (event.key === 'ArrowRight') position.value = clamp(position.value + 2, 0, 100)
  }

  onUnmounted(() => {
    stopDrag()
  })
</script>

<style lang="scss" scoped>
  .ba-container {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: ew-resize;
    user-select: none;
    touch-action: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    aspect-ratio: 16 / 10;
    background: #e9ecef;
  }

  .ba-image {
    position: absolute;
    inset: 0;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }

  .ba-image--before {
    z-index: 1;
  }

  .ba-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .ba-handle-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 3px;
    background: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .ba-handle-knob {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 1rem;
    z-index: 3;
  }

  .ba-label {
    position: absolute;
    top: 0.75rem;
    padding: 0.25rem 0.875rem;
    border-radius: 2rem;
    font-size: 0.8125rem;
    font-weight: 600;
    z-index: 3;
    pointer-events: none;

    &--before {
      left: 0.75rem;
      background: rgba(0, 0, 0, 0.6);
      color: white;
    }

    &--after {
      right: 0.75rem;
      background: rgba(46, 125, 50, 0.85);
      color: white;
    }
  }
</style>
