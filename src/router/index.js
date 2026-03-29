import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

const routes = [
  {
    path: '/',
    redirect: () => {
      const saved = localStorage.getItem('tg-lang')
      if (saved && ['es', 'en'].includes(saved)) return `/${saved}`
      const browserLang = navigator.language?.startsWith('en') ? 'en' : 'es'
      return `/${browserLang}`
    }
  },
  {
    path: '/:lang(es|en)',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { titleKey: 'nav.home' }
      },
      {
        path: 'sobre-nosotros',
        name: 'about-es',
        component: () => import('@/views/AboutView.vue'),
        meta: { titleKey: 'nav.about' }
      },
      {
        path: 'about-us',
        name: 'about-en',
        component: () => import('@/views/AboutView.vue'),
        meta: { titleKey: 'nav.about' }
      },
      {
        path: 'servicios',
        name: 'services-es',
        component: () => import('@/views/ServicesView.vue'),
        meta: { titleKey: 'nav.services' }
      },
      {
        path: 'services',
        name: 'services-en',
        component: () => import('@/views/ServicesView.vue'),
        meta: { titleKey: 'nav.services' }
      },
      {
        path: 'preguntas-frecuentes',
        name: 'faq-es',
        component: () => import('@/views/FaqView.vue'),
        meta: { titleKey: 'nav.faq' }
      },
      {
        path: 'faq',
        name: 'faq-en',
        component: () => import('@/views/FaqView.vue'),
        meta: { titleKey: 'nav.faq' }
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('@/views/BlogView.vue'),
        meta: { titleKey: 'nav.blog' }
      },
      {
        path: 'blog/:slug',
        name: 'blog-post',
        component: () => import('@/views/BlogPostView.vue')
      },
      {
        path: 'verificar-elegibilidad',
        name: 'eligibility-es',
        component: () => import('@/views/EligibilityView.vue'),
        meta: { titleKey: 'nav.checkEligibility' }
      },
      {
        path: 'check-eligibility',
        name: 'eligibility-en',
        component: () => import('@/views/EligibilityView.vue'),
        meta: { titleKey: 'nav.checkEligibility' }
      },
      {
        path: 'politica-privacidad',
        name: 'privacy-es',
        component: () => import('@/views/PrivacyView.vue')
      },
      {
        path: 'privacy-policy',
        name: 'privacy-en',
        component: () => import('@/views/PrivacyView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to) => {
  const lang = to.params.lang
  if (lang && ['es', 'en'].includes(lang)) {
    i18n.global.locale.value = lang
    document.documentElement.lang = lang
    localStorage.setItem('tg-lang', lang)
  }
})

router.afterEach((to) => {
  const t = i18n.global.t
  const titleKey = to.meta.titleKey
  const appTitle = 'TrueGreen'

  if (titleKey) {
    document.title = `${t(titleKey)} — ${appTitle}`
  } else {
    document.title = `${appTitle} — Eficiencia Energética y Aislamiento Térmico`
  }
})

export default router
