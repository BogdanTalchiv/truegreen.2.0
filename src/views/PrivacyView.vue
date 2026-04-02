<template>
  <div class="tg-section" style="padding-top: 7rem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <h1 class="mb-4">{{ locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy' }}</h1>

          <div v-if="locale === 'es'" class="privacy-content">
            <p class="lead text-muted mb-4">
              Truegreen Energy respeta la privacidad de los usuarios y se compromete a proteger los datos personales conforme al RGPD y a la legislación española vigente.
            </p>

            <h3>1. Responsable del tratamiento</h3>
            <p>
              Truegreen Energy<br />
              Correo electrónico: <a href="mailto:talchivbogdan03@gmail.com">talchivbogdan03@gmail.com</a>
            </p>

            <h3>2. Finalidad del tratamiento</h3>
            <p>Los datos personales recogidos a través de nuestros canales (WhatsApp, correo electrónico, teléfono o formularios web) se utilizan exclusivamente para:</p>
            <ul>
              <li>Gestionar solicitudes de información.</li>
              <li>Seguimiento de expedientes de eficiencia energética (programa CAE).</li>
              <li>Servicio posventa y atención al cliente.</li>
              <li>Envío de documentación relacionada con los trabajos realizados.</li>
            </ul>
            <p>No realizamos envíos publicitarios ni campañas de marketing automatizadas.</p>

            <h3>3. Conservación y seguridad</h3>
            <p>Los datos se conservan el tiempo necesario para cumplir obligaciones legales y de servicio. Aplicamos medidas técnicas y organizativas adecuadas para garantizar la seguridad y confidencialidad.</p>

            <h3>4. Derechos de los usuarios</h3>
            <p>Puede ejercer derechos de acceso, rectificación, supresión, oposición y portabilidad escribiendo a: <a href="mailto:talchivbogdan03@gmail.com">talchivbogdan03@gmail.com</a></p>

            <h3>5. Uso de la API de WhatsApp Business</h3>
            <p>Esta aplicación utiliza la API oficial de WhatsApp Business únicamente para comunicaciones informativas y de servicio con clientes con relación comercial previa. No se recopilan ni comparten datos con terceros ajenos a la prestación del servicio.</p>

            <p class="text-muted small mt-4"><em>Última actualización: Febrero 2026.</em></p>
          </div>

          <div v-else class="privacy-content">
            <p class="lead text-muted mb-4">
              Truegreen Energy respects the privacy of its users and is committed to protecting personal data in accordance with the GDPR and current Spanish legislation.
            </p>

            <h3>1. Data Controller</h3>
            <p>
              Truegreen Energy<br />
              Email: <a href="mailto:talchivbogdan03@gmail.com">talchivbogdan03@gmail.com</a>
            </p>

            <h3>2. Purpose of Processing</h3>
            <p>Personal data collected through our channels (WhatsApp, email, telephone or web forms) is used exclusively for:</p>
            <ul>
              <li>Managing information requests.</li>
              <li>Monitoring energy efficiency files (CAE program).</li>
              <li>After-sales service and customer support.</li>
              <li>Sending documentation related to completed work.</li>
            </ul>
            <p>We do not carry out advertising mailings or automated marketing campaigns.</p>

            <h3>3. Retention and Security</h3>
            <p>Data is retained for the time necessary to comply with legal and service obligations. We apply appropriate technical and organizational measures to ensure security and confidentiality.</p>

            <h3>4. User Rights</h3>
            <p>You can exercise your rights of access, rectification, erasure, objection and portability by writing to: <a href="mailto:talchivbogdan03@gmail.com">talchivbogdan03@gmail.com</a></p>

            <h3>5. Use of WhatsApp Business API</h3>
            <p>This application uses the official WhatsApp Business API solely for informational and service communications with customers with a prior business relationship. No data is collected or shared with third parties outside the provision of the service.</p>

            <p class="text-muted small mt-4"><em>Last updated: February 2026.</em></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
</script>

<style lang="scss" scoped>
  .privacy-content {
    h3 {
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.35rem;
      }
    }

    a {
      color: #2E7D32;
      text-decoration: underline;

      &:hover {
        color: #1B5E20;
      }
    }
  }
</style>
