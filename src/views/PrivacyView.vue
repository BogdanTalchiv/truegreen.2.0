<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <h1 class="mb-4">{{ $t('footer.privacy') }}</h1>

          <div v-if="locale === 'es'">
            <h3>1. Información General</h3>
            <p>TrueGreen respeta la confidencialidad de sus datos personales. Esta política describe cómo recopilamos, utilizamos y protegemos su información.</p>

            <h3>2. Datos Recopilados</h3>
            <p>Recopilamos las siguientes categorías de datos: nombre, apellidos, dirección de correo electrónico, número de teléfono, dirección, información sobre la propiedad, datos de navegación (cookies).</p>

            <h3>3. Finalidad del Tratamiento</h3>
            <p>Los datos se tratan para: procesar las solicitudes de elegibilidad, contactarle respecto a nuestros servicios, mejorar los servicios ofrecidos, cumplir con las obligaciones legales.</p>

            <h3>4. Sus Derechos</h3>
            <p>Tiene derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de datos y derecho de oposición al tratamiento. Para ejercer estos derechos, contacte con nosotros en la dirección de correo indicada en el sitio.</p>

            <h3>5. Cookies</h3>
            <p>El sitio utiliza cookies esenciales para su funcionamiento, cookies analíticas (Google Analytics) y cookies de marketing. Puede gestionar sus preferencias a través del banner de cookies que se muestra en su primera visita.</p>

            <h3>6. Seguridad de los Datos</h3>
            <p>Implementamos medidas técnicas y organizativas adecuadas para la protección de sus datos personales.</p>

            <h3>7. Contacto</h3>
            <p>Para preguntas relacionadas con la protección de datos, puede contactarnos en: <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
          </div>

          <div v-else>
            <h3>1. General Information</h3>
            <p>TrueGreen respects the confidentiality of your personal data. This policy describes how we collect, use and protect your information.</p>

            <h3>2. Data Collected</h3>
            <p>We collect the following categories of data: first name, last name, email address, phone number, address, property information, browsing data (cookies).</p>

            <h3>3. Purpose of Processing</h3>
            <p>Data is processed for: processing eligibility requests, contacting you regarding our services, improving services offered, compliance with legal obligations.</p>

            <h3>4. Your Rights</h3>
            <p>You have the right of access, rectification, erasure, restriction of processing, data portability and the right to object to processing. To exercise these rights, contact us at the email address indicated on the site.</p>

            <h3>5. Cookies</h3>
            <p>The site uses essential cookies for functionality, analytical cookies (Google Analytics) and marketing cookies. You can manage your preferences through the cookie banner displayed on your first visit.</p>

            <h3>6. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal data.</p>

            <h3>7. Contact</h3>
            <p>For data protection questions, you can contact us at: <a :href="'mailto:' + EMAIL">{{ EMAIL }}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { EMAIL } from '@/utils/constants'
  const { locale } = useI18n()
</script>
