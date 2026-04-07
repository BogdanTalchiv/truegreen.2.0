import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import { rehydrateCacheIfConsented } from './utils/cacheService'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/scss/main.scss'
import 'aos/dist/aos.css'

// Silently warm the asset cache on repeat visits (only if user previously consented)
rehydrateCacheIfConsented()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
