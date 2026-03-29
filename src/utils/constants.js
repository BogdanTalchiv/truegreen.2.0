export const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '+34 900 000 000'
export const EMAIL = import.meta.env.VITE_EMAIL || 'contacto@truegreen.es'
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+34 600 000 000'
export const ADDRESS = import.meta.env.VITE_ADDRESS || 'Madrid, España'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`
export const PHONE_URL = `tel:${PHONE_NUMBER}`
export const EMAIL_URL = `mailto:${EMAIL}`

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/truegreen',
  instagram: 'https://instagram.com/truegreen',
  linkedin: 'https://linkedin.com/company/truegreen',
  youtube: 'https://youtube.com/@truegreen'
}

export const NAV_SECTIONS = [
  { id: 'hero', key: 'nav.home' },
  { id: 'why-us', key: 'nav.whyUs' },
  { id: 'how-it-works', key: 'nav.howItWorks' },
  { id: 'solutions', key: 'nav.solutions' },
  { id: 'testimonials', key: 'nav.testimonials' },
  { id: 'contact', key: 'nav.contact' }
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
