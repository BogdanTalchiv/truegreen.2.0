<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label fw-medium">{{ label }}</label>
    <textarea
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    ></textarea>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
  defineProps({
    id: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 4 },
    error: { type: String, default: '' },
    required: { type: Boolean, default: false }
  })

  defineEmits(['update:modelValue', 'blur'])
</script>
