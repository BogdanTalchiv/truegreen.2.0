<template>
  <div class="chat-widget">
    <!-- Floating Button -->
    <Transition name="bounce">
      <button
        v-show="!isOpen"
        class="chat-fab"
        @click="openChat"
        :aria-label="locale === 'es' ? 'Abrir chat' : 'Open chat'"
      >
        <span class="chat-fab-icon">
          <i class="bi bi-chat-dots-fill"></i>
        </span>
        <span class="chat-fab-pulse"></span>
        <span class="chat-fab-pulse chat-fab-pulse--delayed"></span>

        <!-- Notification badge -->
        <Transition name="pop">
          <span v-if="showGreeting && !hasBeenOpened" class="chat-fab-badge">1</span>
        </Transition>
      </button>
    </Transition>

    <!-- Greeting bubble -->
    <Transition name="slide-bubble">
      <div v-if="showGreeting && !isOpen && !hasBeenOpened" class="chat-greeting" @click="openChat">
        <button class="chat-greeting-close" @click.stop="showGreeting = false" aria-label="Close">
          <i class="bi bi-x"></i>
        </button>
        <p class="mb-0">{{ greetingText }}</p>
      </div>
    </Transition>

    <!-- Chat Window -->
    <Transition name="chat-window">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="d-flex align-items-center gap-2">
            <div class="chat-header-avatar">
              <i class="bi bi-leaf"></i>
            </div>
            <div>
              <div class="chat-header-name">TrueGreen AI</div>
              <div class="chat-header-status">
                <span class="chat-status-dot"></span>
                Online
              </div>
            </div>
          </div>
          <button class="chat-header-close" @click="closeChat" aria-label="Close chat">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesRef" class="chat-messages">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="chat-message"
            :class="'chat-message--' + msg.role"
          >
            <div v-if="msg.role === 'assistant'" class="chat-msg-avatar">
              <i class="bi bi-leaf"></i>
            </div>
            <div class="chat-msg-bubble" :class="'chat-msg-bubble--' + msg.role">
              <div v-html="formatMessage(msg.content)"></div>
              <div class="chat-msg-time">{{ msg.time }}</div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="chat-message chat-message--assistant">
            <div class="chat-msg-avatar">
              <i class="bi bi-leaf"></i>
            </div>
            <div class="chat-msg-bubble chat-msg-bubble--assistant">
              <div class="chat-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions (shown when few messages) -->
        <div v-if="messages.length <= 1" class="chat-quick-actions">
          <button
            v-for="action in quickActions"
            :key="action.key"
            class="chat-quick-btn"
            @click="sendQuickAction(action)"
          >
            <i :class="action.icon" class="me-1"></i>{{ action.label }}
          </button>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <input
            ref="inputRef"
            v-model="userInput"
            class="chat-input"
            :placeholder="locale === 'es' ? 'Escribe un mensaje...' : 'Type a message...'"
            @keydown.enter="sendMessage"
            :disabled="isTyping"
          />
          <button
            class="chat-send-btn"
            @click="sendMessage"
            :disabled="!userInput.trim() || isTyping"
            :aria-label="locale === 'es' ? 'Enviar' : 'Send'"
          >
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { ref, nextTick, onMounted, computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const isOpen = ref(false)
  const hasBeenOpened = ref(false)
  const showGreeting = ref(false)
  const messages = ref([])
  const userInput = ref('')
  const isTyping = ref(false)
  const messagesRef = ref(null)
  const inputRef = ref(null)

  const greetingText = computed(() =>
    locale.value === 'es'
      ? '¡Hola! ¿Tienes preguntas sobre el aislamiento gratuito? ¡Estoy aquí para ayudarte! 🍃'
      : 'Hi! Have questions about free insulation? I\'m here to help! 🍃'
  )

  const quickActions = computed(() =>
    locale.value === 'es'
      ? [
          { key: 'free', label: '¿Es realmente gratis?', icon: 'bi bi-cash-stack' },
          { key: 'how', label: '¿Cómo funciona?', icon: 'bi bi-question-circle' },
          { key: 'eligible', label: '¿Soy elegible?', icon: 'bi bi-person-check' },
          { key: 'duration', label: '¿Cuánto dura?', icon: 'bi bi-clock' }
        ]
      : [
          { key: 'free', label: 'Is it really free?', icon: 'bi bi-cash-stack' },
          { key: 'how', label: 'How does it work?', icon: 'bi bi-question-circle' },
          { key: 'eligible', label: 'Am I eligible?', icon: 'bi bi-person-check' },
          { key: 'duration', label: 'How long does it take?', icon: 'bi bi-clock' }
        ]
  )

  const knowledgeBase = {
    es: {
      greet: '¡Hola! 👋 Soy el asistente virtual de TrueGreen. Puedo ayudarte con información sobre nuestro programa de aislamiento térmico gratuito. ¿Qué te gustaría saber?',
      free: '**¡Sí, es 100% gratis!** 🎉\n\nEl programa oficial financia íntegramente los costes de aislamiento. No tienes que pagar nada — ni por adelantado, ni después. Las compañías energéticas cubren todos los gastos para cumplir su cuota legal de ahorro energético.\n\n¿Quieres comprobar si tu vivienda es elegible?',
      how: '**El proceso es sencillo, en 4 pasos:**\n\n1️⃣ **Instalación** — Nuestro equipo viene y aísla tu desván con lana mineral insuflada\n2️⃣ **Documentación** — Preparamos todo el expediente técnico\n3️⃣ **Verificación** — Un organismo acreditado verifica el trabajo\n4️⃣ **Compensación** — La compañía energética nos compensa los costes\n\n**¡Tú no pagas nada y no haces ningún trámite!**',
      eligible: 'Para ser elegible, necesitas:\n\n✅ Vivienda con desván o buhardilla sin aislar\n✅ Ser propietario\n✅ Sin requisitos de ingresos\n\n**¡No importan los ingresos, la edad ni el tipo de vivienda!** Rellena el formulario de elegibilidad y te contactamos en 24 horas.',
      duration: '**¡La instalación dura solo 2-4 horas!** ⚡\n\nProceso completo:\n- 📋 Evaluación: 1-2 días desde la solicitud\n- 🔧 Instalación: 2-4 horas\n- ✅ Sin obras ni molestias importantes\n\nTodo se hace rápido y limpio, con el sistema de insuflado.',
      savings: '**¡Puedes ahorrar hasta un 45% en tu factura energética!** 💰\n\nBeneficios:\n- Reducción del 30-45% en calefacción\n- Confort térmico todo el año\n- Aumento del valor de la vivienda\n- Material ignífugo y ecológico',
      contact: 'Puedes contactarnos a través de:\n\n📞 **Teléfono:** +34 900 000 000 (L-V, 9-18)\n📧 **Email:** contacto@truegreen.es\n💬 **WhatsApp:** +34 600 000 000\n\n¡O puedes rellenar el formulario de elegibilidad directamente en la web!',
      material: '**Utilizamos lana mineral insuflada**, un material premium:\n\n🔥 **Ignífugo** — no arde, no se derrite\n🌿 **Ecológico** — de materiales naturales\n🛡️ **Duradero** — dura décadas\n🔇 **Aislamiento acústico** — reduce el ruido\n📐 **Insuflado** — se adapta perfectamente a cualquier forma',
      default: '¡Gracias por tu pregunta! 😊\n\nPuedo ayudarte con información sobre:\n- 💰 Costes y financiación\n- 🏠 Elegibilidad\n- 🔧 Proceso de instalación\n- ⏱️ Duración de los trabajos\n- 📞 Contacto\n\n¿Qué te gustaría saber más en concreto?'
    },
    en: {
      greet: 'Hello! 👋 I\'m TrueGreen\'s virtual assistant. I can help you with information about our free thermal insulation program. What would you like to know?',
      free: '**Yes, it\'s 100% free!** 🎉\n\nThe official program fully funds all insulation costs. You don\'t pay anything — not upfront, not after. Energy companies cover all expenses to meet their legal energy saving quota.\n\nWould you like to check if your home is eligible?',
      how: '**The process is simple, in 4 steps:**\n\n1️⃣ **Installation** — Our team comes and insulates your attic with blown mineral wool\n2️⃣ **Documentation** — We prepare the entire technical file\n3️⃣ **Verification** — An accredited body verifies the work\n4️⃣ **Compensation** — The energy company compensates our costs\n\n**You pay nothing and do no paperwork!**',
      eligible: 'To be eligible, you need:\n\n✅ A home with an uninsulated attic or loft\n✅ To be the owner\n✅ No income requirements\n\n**Income, age, or property type don\'t matter!** Fill out the eligibility form and we\'ll contact you within 24 hours.',
      duration: '**Installation takes only 2-4 hours!** ⚡\n\nComplete process:\n- 📋 Assessment: 1-2 days from request\n- 🔧 Installation: 2-4 hours\n- ✅ No construction or major disruption\n\nEverything is done quickly and cleanly with the blowing system.',
      savings: '**You can save up to 45% on your energy bill!** 💰\n\nBenefits:\n- 30-45% reduction in heating costs\n- Year-round thermal comfort\n- Increased property value\n- Fireproof and ecological material',
      contact: 'You can reach us through:\n\n📞 **Phone:** +34 900 000 000 (Mon-Fri, 9-18)\n📧 **Email:** contacto@truegreen.es\n💬 **WhatsApp:** +34 600 000 000\n\nOr you can fill out the eligibility form directly on the site!',
      material: '**We use blown mineral wool**, a premium material:\n\n🔥 **Fireproof** — doesn\'t burn or melt\n🌿 **Ecological** — from natural materials\n🛡️ **Durable** — lasts for decades\n🔇 **Sound insulation** — reduces noise\n📐 **Blown** — adapts perfectly to any shape',
      default: 'Thanks for your question! 😊\n\nI can help you with information about:\n- 💰 Costs and funding\n- 🏠 Eligibility\n- 🔧 Installation process\n- ⏱️ Work duration\n- 📞 Contact\n\nWhat would you like to know more about?'
    }
  }

  function getTime() {
    return new Date().toLocaleTimeString(locale.value === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function openChat() {
    isOpen.value = true
    hasBeenOpened.value = true
    showGreeting.value = false

    if (messages.value.length === 0) {
      messages.value.push({
        role: 'assistant',
        content: knowledgeBase[locale.value].greet,
        time: getTime()
      })
    }

    nextTick(() => {
      inputRef.value?.focus()
      scrollToBottom()
    })
  }

  function closeChat() {
    isOpen.value = false
  }

  function sendQuickAction(action) {
    userInput.value = action.label
    sendMessage()
  }

  async function sendMessage() {
    const text = userInput.value.trim()
    if (!text || isTyping.value) return

    messages.value.push({
      role: 'user',
      content: text,
      time: getTime()
    })

    userInput.value = ''
    await nextTick()
    scrollToBottom()

    isTyping.value = true
    await nextTick()
    scrollToBottom()

    const response = generateResponse(text)
    const typingDelay = Math.min(800 + response.length * 8, 2500)

    await new Promise((r) => setTimeout(r, typingDelay))

    isTyping.value = false
    messages.value.push({
      role: 'assistant',
      content: response,
      time: getTime()
    })

    await nextTick()
    scrollToBottom()
  }

  function generateResponse(input) {
    const kb = knowledgeBase[locale.value]
    const lower = input.toLowerCase()

    const patterns = [
      { keys: ['gratis', 'gratuito', 'free', 'coste', 'cost', 'precio', 'price', 'pagar', 'pay', 'dinero', 'money'], response: 'free' },
      { keys: ['cómo func', 'como func', 'how does', 'how it', 'proceso', 'process', 'pasos', 'steps', 'etapas'], response: 'how' },
      { keys: ['elegib', 'eligible', 'puedo beneficiar', 'can i', 'calific', 'qualify', 'condicion', 'condition', 'requisit', 'require'], response: 'eligible' },
      { keys: ['dura', 'duration', 'cuánto dura', 'cuanto dura', 'how long', 'tiempo', 'time', 'rápid', 'rapid', 'quick', 'hora', 'hour'], response: 'duration' },
      { keys: ['ahorr', 'saving', 'factura', 'bill', 'reduc', 'reduce', 'porcent', 'percent', '45', '30'], response: 'savings' },
      { keys: ['contact', 'teléfono', 'telefono', 'phone', 'email', 'whatsapp', 'llam', 'call', 'dirección', 'direccion', 'address'], response: 'contact' },
      { keys: ['material', 'lana', 'wool', 'mineral', 'ignífug', 'ignifug', 'fireproof', 'ecológic', 'ecologic', 'insuflad', 'blown'], response: 'material' },
      { keys: ['hola', 'buenas', 'hello', 'hi ', 'hey', 'buenos días', 'buenos dias'], response: 'greet' }
    ]

    for (const pattern of patterns) {
      if (pattern.keys.some((k) => lower.includes(k))) {
        return kb[pattern.response]
      }
    }

    return kb.default
  }

  function formatMessage(content) {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
  }

  function scrollToBottom() {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  }

  watch(locale, () => {
    if (messages.value.length > 0) {
      messages.value = [{
        role: 'assistant',
        content: knowledgeBase[locale.value].greet,
        time: getTime()
      }]
    }
  })

  onMounted(() => {
    setTimeout(() => {
      showGreeting.value = true
    }, 3000)
  })
</script>

<style lang="scss" scoped>
  $chat-primary: #2E7D32;
  $chat-radius: 16px;
  $chat-width: 380px;
  $chat-height: 520px;

  .chat-widget {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 1040;

    @media (max-width: 575.98px) {
      bottom: 1rem;
      right: 1rem;
    }
  }

  // ─── Floating Action Button ───
  .chat-fab {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #4CAF50, #2E7D32);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba($chat-primary, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba($chat-primary, 0.5);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .chat-fab-icon {
    position: relative;
    z-index: 1;
    animation: fab-float 3s ease-in-out infinite;
  }

  @keyframes fab-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  .chat-fab-pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid rgba($chat-primary, 0.4);
    animation: fab-pulse 2.5s ease-out infinite;

    &--delayed {
      animation-delay: 1.25s;
    }
  }

  @keyframes fab-pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  .chat-fab-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #E53935;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    z-index: 2;
  }

  // ─── Greeting Bubble ───
  .chat-greeting {
    position: absolute;
    bottom: 72px;
    right: 0;
    width: 260px;
    background: white;
    border-radius: 12px 12px 4px 12px;
    padding: 0.875rem 1rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #333;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .chat-greeting-close {
    position: absolute;
    top: 4px;
    right: 6px;
    background: none;
    border: none;
    color: #999;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 2px;
    line-height: 1;

    &:hover { color: #333; }
  }

  // ─── Chat Window ───
  .chat-window {
    position: absolute;
    bottom: 0;
    right: 0;
    width: $chat-width;
    height: $chat-height;
    background: #f7f8fa;
    border-radius: $chat-radius;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 575.98px) {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }

  // ─── Header ───
  .chat-header {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    color: white;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .chat-header-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
  }

  .chat-header-name {
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .chat-header-status {
    font-size: 0.75rem;
    opacity: 0.85;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .chat-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #69F0AE;
    display: inline-block;
    animation: status-blink 2s ease-in-out infinite;
  }

  @keyframes status-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .chat-header-close {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 0.875rem;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  // ─── Messages ───
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
  }

  .chat-message {
    display: flex;
    gap: 0.5rem;
    max-width: 88%;
    animation: msg-appear 0.3s ease;

    &--user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    &--assistant {
      align-self: flex-start;
    }
  }

  @keyframes msg-appear {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .chat-msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4CAF50, #2E7D32);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .chat-msg-bubble {
    padding: 0.625rem 0.875rem;
    border-radius: 12px;
    font-size: 0.875rem;
    line-height: 1.55;
    word-break: break-word;

    &--assistant {
      background: white;
      color: #333;
      border: 1px solid #e9ecef;
      border-bottom-left-radius: 4px;
    }

    &--user {
      background: linear-gradient(135deg, #4CAF50, #2E7D32);
      color: white;
      border-bottom-right-radius: 4px;
    }
  }

  .chat-msg-time {
    font-size: 0.6875rem;
    opacity: 0.5;
    margin-top: 0.25rem;
    text-align: right;
  }

  // ─── Typing Indicator ───
  .chat-typing {
    display: flex;
    gap: 4px;
    padding: 4px 0;

    span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #aaa;
      animation: typing-dot 1.4s ease-in-out infinite;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }

  @keyframes typing-dot {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  // ─── Quick Actions ───
  .chat-quick-actions {
    padding: 0 1rem 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .chat-quick-btn {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 2rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    color: $chat-primary;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-weight: 500;

    &:hover {
      background: rgba($chat-primary, 0.08);
      border-color: $chat-primary;
      transform: translateY(-1px);
    }
  }

  // ─── Input Area ───
  .chat-input-area {
    padding: 0.75rem;
    background: white;
    border-top: 1px solid #e9ecef;
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .chat-input {
    flex: 1;
    border: 1px solid #dee2e6;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: $chat-primary;
      box-shadow: 0 0 0 3px rgba($chat-primary, 0.1);
    }

    &::placeholder {
      color: #aaa;
    }
  }

  .chat-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #4CAF50, #2E7D32);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba($chat-primary, 0.3);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  // ─── Transitions ───
  .bounce-enter-active { animation: bounce-in 0.5s ease; }
  .bounce-leave-active { animation: bounce-in 0.3s ease reverse; }

  @keyframes bounce-in {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }

  .pop-enter-active { animation: pop-in 0.3s ease; }
  .pop-leave-active { animation: pop-in 0.2s ease reverse; }

  @keyframes pop-in {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }

  .slide-bubble-enter-active {
    animation: slide-bubble-in 0.4s ease;
  }
  .slide-bubble-leave-active {
    animation: slide-bubble-in 0.2s ease reverse;
  }

  @keyframes slide-bubble-in {
    0% { opacity: 0; transform: translateY(10px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .chat-window-enter-active {
    animation: chat-open 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .chat-window-leave-active {
    animation: chat-open 0.2s ease reverse;
  }

  @keyframes chat-open {
    0% {
      opacity: 0;
      transform: scale(0.7) translateY(20px);
      transform-origin: bottom right;
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      transform-origin: bottom right;
    }
  }
</style>
