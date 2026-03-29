<template>
  <div>
    <HeroSection />
    <WhyUsSection />
    <HowItWorksSection />
    <SolutionsSection />
    <TestimonialsSection />
    <ContactSection />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useScrollSpy } from '@/composables/useScrollSpy'
  import HeroSection from '@/components/sections/HeroSection.vue'
  import WhyUsSection from '@/components/sections/WhyUsSection.vue'
  import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
  import SolutionsSection from '@/components/sections/SolutionsSection.vue'
  import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
  import ContactSection from '@/components/sections/ContactSection.vue'
  import AOS from 'aos'

  useScrollSpy(['hero', 'why-us', 'how-it-works', 'solutions', 'testimonials', 'contact'])

  onMounted(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 80
    })
  })
</script>
