<template>
  <Transition name="cookie-slide">
    <div v-if="uiStore.showCookieBanner" class="cookie-banner" role="dialog" aria-live="polite" :aria-label="locale === 'es' ? 'Aviso de cookies' : 'Cookie notice'">
      <div class="cb-inner">

        <!-- Icon + text -->
        <div class="cb-body">
          <div class="cb-icon-wrap">
            <i class="bi bi-shield-lock-fill cb-icon"></i>
          </div>
          <div class="cb-text">
            <p class="cb-title">
              {{ locale === 'es' ? 'Tu privacidad, bajo control' : 'Your privacy, under control' }}
            </p>
            <p class="cb-desc">
              <template v-if="locale === 'es'">
                Usamos cookies esenciales para el funcionamiento del sitio y, con tu permiso, cookies de rendimiento para cargas más rápidas en visitas futuras.
                <router-link :to="`/${locale}/privacidad`" class="cb-link">{{ 'Política de Privacidad' }}</router-link>
              </template>
              <template v-else>
                We use essential cookies to run the site and, with your permission, performance cookies for faster loads on repeat visits.
                <router-link :to="`/${locale}/privacy`" class="cb-link">{{ 'Privacy Policy' }}</router-link>
              </template>
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="cb-actions">
          <button class="cb-btn cb-btn-secondary" @click="uiStore.declineCookies()">
            {{ locale === 'es' ? 'Solo esenciales' : 'Essential only' }}
          </button>
          <button class="cb-btn cb-btn-primary" @click="uiStore.acceptCookies()">
            <i class="bi bi-check-lg me-1"></i>
            {{ locale === 'es' ? 'Aceptar todas' : 'Accept all' }}
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
  import { useUiStore } from '@/stores/ui'
  import { useI18n } from 'vue-i18n'

  const uiStore = useUiStore()
  const { locale } = useI18n()
</script>

<style lang="scss" scoped>
  /* ── Banner shell ── */
  .cookie-banner {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: min(760px, calc(100vw - 2rem));
    z-index: 9999;
  }

  /* Inner card */
  .cb-inner {
    background: #fff;
    border: 1px solid #e2ebe4;
    border-radius: 18px;
    box-shadow:
      0 8px 32px rgba(30, 80, 35, 0.12),
      0 2px 8px rgba(0, 0, 0, 0.06);
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  /* Body (icon + text) */
  .cb-body {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    flex: 1;
    min-width: 0;
  }

  .cb-icon-wrap {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cb-icon {
    font-size: 1.2rem;
    color: #2e7d32;
  }

  .cb-text {
    min-width: 0;
  }

  .cb-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1a2e1c;
    margin: 0 0 0.2rem;
  }

  .cb-desc {
    font-size: 0.8rem;
    color: #5a6b5c;
    margin: 0;
    line-height: 1.55;
  }

  .cb-link {
    color: #2e7d32;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.25rem;

    &:hover { text-decoration: underline; }
  }

  /* Actions */
  .cb-actions {
    display: flex;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  .cb-btn {
    border: none;
    border-radius: 10px;
    font-size: 0.83rem;
    font-weight: 700;
    padding: 0.55rem 1.1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;

    &:active { transform: scale(0.97); }
  }

  .cb-btn-primary {
    background: linear-gradient(135deg, #388e3c, #2e7d32);
    color: #fff;
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);

    &:hover {
      background: linear-gradient(135deg, #2e7d32, #1b5e20);
      box-shadow: 0 6px 18px rgba(46, 125, 50, 0.45);
    }
  }

  .cb-btn-secondary {
    background: #f1f8f2;
    color: #388e3c;
    border: 1px solid #c8e6c9;

    &:hover {
      background: #e0f2e1;
      border-color: #a5d6a7;
    }
  }

  /* ── Slide transition ── */
  .cookie-slide-enter-active,
  .cookie-slide-leave-active {
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .cookie-slide-enter-from,
  .cookie-slide-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.97);
  }

  /* ── Mobile ── */
  @media (max-width: 575.98px) {
    .cookie-banner {
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      transform: none;
    }

    .cb-inner {
      border-radius: 18px 18px 0 0;
      padding: 1.1rem 1rem;
      flex-direction: column;
      align-items: stretch;
    }

    .cb-actions {
      justify-content: stretch;

      .cb-btn { flex: 1; text-align: center; }
    }

    /* Slide from bottom on mobile */
    .cookie-slide-enter-from,
    .cookie-slide-leave-to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
</style>
