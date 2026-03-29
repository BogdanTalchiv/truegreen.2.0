<template>
  <div class="mb-3 form-check">
    <input
      :id="id"
      type="checkbox"
      class="form-check-input"
      :class="{ 'is-invalid': error }"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="id" class="form-check-label">
      <slot>{{ label }}</slot>
    </label>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
  defineProps({
    id: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: Boolean, default: false },
    error: { type: String, default: '' }
  })

  defineEmits(['update:modelValue'])
</script>
