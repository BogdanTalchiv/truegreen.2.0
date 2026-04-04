<template>
  <section class="page-extra tg-section-alt">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <div
          v-for="(block, index) in blocks"
          :key="block.key"
          class="col-12 col-lg-6"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="page-extra-card h-100">
            <div class="page-extra-icon">
              <i :class="block.icon"></i>
            </div>
            <h3 class="page-extra-title">{{ $t(`${prefix}.${block.key}.title`) }}</h3>
            <p class="page-extra-body mb-0">{{ $t(`${prefix}.${block.key}.body`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    prefix: {
      type: String,
      required: true
    },
    blocks: {
      type: Array,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .page-extra-card {
    background: #fff;
    border: 1px solid rgba($tg-primary, 0.12);
    border-radius: 18px;
    padding: 2rem 1.75rem;
    box-shadow: 0 12px 40px rgba(15, 46, 20, 0.06);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      border-color: rgba($tg-primary, 0.28);
      box-shadow: 0 16px 48px rgba(46, 125, 50, 0.1);
    }
  }

  .page-extra-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba($tg-primary, 0.14), rgba($tg-primary, 0.06));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    color: $tg-primary;
    margin-bottom: 1.25rem;
  }

  .page-extra-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: $tg-text-primary;
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }

  .page-extra-body {
    font-size: 0.95rem;
    color: #5c6560;
    line-height: 1.65;
  }
</style>
