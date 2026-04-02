export const PHONE_NUMBER = '062115092'
export const EMAIL = 'talchivbogdan03@gmail.com'
export const WHATSAPP_NUMBER = '062115092'
export const ADDRESS = 'Madrid, España 28006'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo más información sobre vuestros servicios de eficiencia energética.')}`
export const PHONE_URL = `tel:${PHONE_NUMBER}`
export const EMAIL_URL = `mailto:${EMAIL}?subject=${encodeURIComponent('Consulta sobre servicios de eficiencia energética')}`

export const NAV_ITEMS = [
  { key: 'nav.home', routeName: 'home' },
  { key: 'nav.whyUs', routeEs: 'por-que-nosotros', routeEn: 'why-us' },
  { key: 'nav.howItWorks', routeEs: 'como-funciona', routeEn: 'how-it-works' },
  { key: 'nav.solutions', routeEs: 'soluciones', routeEn: 'solutions' },
  { key: 'nav.provinces', routeEs: 'provincias', routeEn: 'provinces' },
  { key: 'nav.testimonials', routeEs: 'testimonios', routeEn: 'testimonials' },
  { key: 'nav.contact', routeEs: 'contacto', routeEn: 'contact' }
]

export const PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón',
  'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Illes Balears', 'Jaén', 'La Rioja',
  'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia',
  'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
]
