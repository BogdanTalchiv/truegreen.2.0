<template>
  <div class="accordion" :id="accordionId">
    <div v-for="(item, index) in items" :key="index" class="accordion-item border rounded-3 mb-2">
      <h2 class="accordion-header">
        <button
          class="accordion-button fw-semibold"
          :class="{ collapsed: index !== 0 }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${accordionId}-${index}`"
          :aria-expanded="index === 0"
        >
          {{ item.question }}
        </button>
      </h2>
      <div
        :id="`${accordionId}-${index}`"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        :data-bs-parent="`#${accordionId}`"
      >
        <div class="accordion-body text-secondary">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    items: { type: Array, required: true },
    accordionId: { type: String, default: 'tgAccordion' }
  })
</script>

<style lang="scss" scoped>
  .accordion-item {
    border-color: $tg-border !important;
    overflow: hidden;
  }

  .accordion-button {
    &:not(.collapsed) {
      background: rgba($tg-primary, 0.05);
      color: $tg-primary;
      box-shadow: none;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba($tg-primary, 0.25);
    }
  }
</style>
