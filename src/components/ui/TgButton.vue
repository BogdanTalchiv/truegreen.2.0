<template>
  <component
    :is="tag"
    :class="classes"
    :disabled="disabled || loading"
    :href="href"
    :to="to"
    v-bind="$attrs"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </span>
    <i v-if="icon && iconPosition === 'start' && !loading" :class="`bi bi-${icon} me-2`"></i>
    <slot />
    <i v-if="icon && iconPosition === 'end'" :class="`bi bi-${icon} ms-2`"></i>
  </component>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    icon: { type: String, default: null },
    iconPosition: { type: String, default: 'start' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    href: { type: String, default: null },
    to: { type: [String, Object], default: null }
  })

  const tag = computed(() => {
    if (props.to) return 'router-link'
    if (props.href) return 'a'
    return 'button'
  })

  const variantMap = {
    primary: 'btn-tg-primary',
    secondary: 'btn-tg-secondary',
    cta: 'btn-tg-cta',
    ghost: 'btn-tg-ghost',
    white: 'btn-tg-white'
  }

  const sizeMap = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }

  const classes = computed(() => [
    'btn',
    variantMap[props.variant] || 'btn-tg-primary',
    sizeMap[props.size] || '',
    { 'w-100': props.fullWidth, disabled: props.disabled || props.loading }
  ])
</script>
