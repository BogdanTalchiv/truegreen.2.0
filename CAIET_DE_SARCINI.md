# Caiet de Sarcini (Specificație Tehnică)

## Proiect: TrueGreen 2.0 — Website pentru Eficiență Energetică și Izolație Termică

**Versiune document:** 1.0  
**Data:** 26.03.2026  
**Referință design:** [https://www.slcerticasa.es/](https://www.slcerticasa.es/)

---

## Cuprins

1. [Descrierea generală a proiectului](#1-descrierea-generală-a-proiectului)
2. [Stack tehnologic](#2-stack-tehnologic)
3. [Arhitectura aplicației](#3-arhitectura-aplicației)
4. [Structura paginilor și secțiunilor](#4-structura-paginilor-și-secțiunilor)
5. [Design și UI/UX](#5-design-și-uiux)
6. [Responsive Design (Bootstrap 5 Grid)](#6-responsive-design-bootstrap-5-grid)
7. [Internaționalizare (i18n)](#7-internaționalizare-i18n)
8. [Managementul stării (Pinia)](#8-managementul-stării-pinia)
9. [Rutare (Vue Router)](#9-rutare-vue-router)
10. [Componente reutilizabile](#10-componente-reutilizabile)
11. [Animații și interactivitate](#11-animații-și-interactivitate)
12. [SEO și performanță](#12-seo-și-performanță)
13. [Formulare și validare](#13-formulare-și-validare)
14. [Integrări externe](#14-integrări-externe)
15. [Structura fișierelor proiectului](#15-structura-fișierelor-proiectului)
16. [Cerințe non-funcționale](#16-cerințe-non-funcționale)
17. [Plan de livrare](#17-plan-de-livrare)

---

## 1. Descrierea generală a proiectului

### 1.1 Scopul proiectului

Dezvoltarea unui website modern, performant și complet responsive pentru compania **TrueGreen**, specializată în soluții de eficiență energetică și izolație termică a locuințelor. Site-ul va prezenta serviciile companiei, programele de finanțare disponibile, procesul de lucru și va facilita colectarea de lead-uri prin formulare de contact.

### 1.2 Obiective de business

| # | Obiectiv | Metrică de succes |
|---|----------|-------------------|
| 1 | Generare de lead-uri calificate | Formulare completate / lună |
| 2 | Prezentarea credibilității companiei | Timp petrecut pe pagină > 2 min |
| 3 | Conversie vizitatori → clienți potențiali | Rata de conversie > 3% |
| 4 | Accesibilitate bilingvă RO/EN | 100% conținut tradus |
| 5 | Experiență mobilă excelentă | Scor Google PageSpeed > 90 |

### 1.3 Publicul țintă

- Proprietari de locuințe individuale (case, vile)
- Administratori de blocuri / asociații de proprietari
- Companii din domeniul construcțiilor și renovărilor
- Autorități locale interesate de programe de eficiență energetică

---

## 2. Stack tehnologic

### 2.1 Frontend Framework

| Tehnologie | Versiune | Rol |
|-----------|---------|-----|
| **Vue.js** | 4.x (latest) | Framework SPA principal |
| **Pinia** | latest | State management |
| **Vue Router** | latest (compatibil Vue 4) | Rutare client-side |
| **Vue I18n** | latest (compatibil Vue 4) | Internaționalizare RO / EN |
| **Bootstrap** | 5.3.x | Sistem de grid și componente CSS |
| **Bootstrap Icons** | latest | Iconițe vectoriale |
| **Vite** | latest | Build tool și dev server |

### 2.2 Dependențe adiționale

| Pachet | Scop |
|--------|------|
| `@vueuse/core` | Composables utilitare (intersectionObserver, etc.) |
| `vee-validate` + `yup` | Validare formulare |
| `axios` | HTTP client pentru API calls |
| `animate.css` sau `aos` | Animații la scroll |
| `swiper` | Slider/carousel pentru testimoniale |
| `@popperjs/core` | Tooltips și popovers Bootstrap |

### 2.3 Instrumente de dezvoltare

| Instrument | Scop |
|-----------|------|
| ESLint + Prettier | Linting și formatare cod |
| TypeScript | Tipizare statică (opțional, recomandat) |
| Vitest | Unit testing |
| Cypress | E2E testing |
| Husky + lint-staged | Pre-commit hooks |

---

## 3. Arhitectura aplicației

### 3.1 Diagrama generală

```
┌──────────────────────────────────────────────────┐
│                    Browser                        │
├──────────────────────────────────────────────────┤
│                  Vue Router                       │
│          ┌──────────┬──────────┐                 │
│          │  /ro/*   │  /en/*   │                 │
│          └────┬─────┴────┬─────┘                 │
│               │          │                        │
│        ┌──────▼──────────▼──────┐                │
│        │     Vue I18n           │                │
│        │  (ro.json / en.json)   │                │
│        └──────────┬─────────────┘                │
│                   │                               │
│        ┌──────────▼─────────────┐                │
│        │    Page Components      │                │
│        │  (Home, About, etc.)    │                │
│        └──────────┬─────────────┘                │
│                   │                               │
│        ┌──────────▼─────────────┐                │
│        │  Reusable Components    │                │
│        │  (Cards, Hero, etc.)    │                │
│        └──────────┬─────────────┘                │
│                   │                               │
│        ┌──────────▼─────────────┐                │
│        │     Pinia Stores        │                │
│        │  (ui, form, content)    │                │
│        └──────────┬─────────────┘                │
│                   │                               │
│        ┌──────────▼─────────────┐                │
│        │   Bootstrap 5 Grid      │                │
│        │  + Custom SCSS          │                │
│        └────────────────────────┘                │
└──────────────────────────────────────────────────┘
```

### 3.2 Pattern-uri arhitecturale

- **Composition API** — toate componentele folosesc `<script setup>` cu Composition API
- **Composables** — logica reutilizabilă extrasă în funcții `use*`
- **Lazy Loading** — paginile se încarcă lazy prin Vue Router
- **Component-Driven** — UI compus din componente mici, izolate și reutilizabile

---

## 4. Structura paginilor și secțiunilor

### 4.1 Pagina principală (Home) — Single Page Layout

Inspirată direct de [slcerticasa.es](https://www.slcerticasa.es/), pagina principală este un **single-page scrollable** cu următoarele secțiuni, în ordine:

---

#### Secțiunea 1: Navbar (Header fix / sticky)

| Proprietate | Detalii |
|------------|---------|
| **Poziție** | `fixed-top` cu efect de transparență → solid la scroll |
| **Conținut stânga** | Logo TrueGreen (SVG) |
| **Conținut centru** | Link-uri de navigare: Acasă, De ce noi?, Cum funcționează, Soluții, Testimoniale, Contact |
| **Conținut dreapta** | Selector limbă (RO 🇷🇴 / EN 🇬🇧) + Buton CTA „Verifică eligibilitatea" |
| **Mobile** | Hamburger menu (Bootstrap Offcanvas) cu toate link-urile + selector limbă |
| **Comportament** | Smooth scroll la secțiunea corespunzătoare la click pe link |

**Breakpoint-uri navbar:**

| Breakpoint | Comportament |
|-----------|-------------|
| `≥ 992px` (lg) | Navbar extins, toate link-urile vizibile inline |
| `< 992px` | Navbar colapsed, hamburger menu → Offcanvas din dreapta |

---

#### Secțiunea 2: Hero Section

| Proprietate | Detalii |
|------------|---------|
| **Layout** | Full-viewport height (`min-height: 100vh`) |
| **Background** | Gradient suprapus pe imagine/video de fundal (casă verde / natură / izolație) |
| **Titlu principal** | H1 mare, bold, cu text evidențiat color (verde) |
| **Subtitlu** | Paragraf descriptiv cu beneficiile principale |
| **CTA Principal** | Buton mare „Verifică eligibilitatea" → scroll la formular |
| **Trust Indicators** | Rating (4.9 ★), Număr instalații (ex: „+1.500 locuințe izolate") |
| **Badge-uri** | Rând de badge-uri: „100% Finanțat", „Fără Costuri", „Fără Birocrație", „Program Oficial", „Supervizat" |

**Grid Hero:**

```
Desktop (≥ lg):
┌─────────────────────────────────┐
│  col-lg-7          col-lg-5     │
│  ┌──────────┐  ┌────────────┐  │
│  │ Text     │  │  Imagine/  │  │
│  │ CTA      │  │  Ilustrație│  │
│  │ Badges   │  │            │  │
│  └──────────┘  └────────────┘  │
└─────────────────────────────────┘

Tablet (sm-md):
┌─────────────────────────────────┐
│         col-12                   │
│  ┌──────────────────────────┐   │
│  │ Text centrat             │   │
│  │ CTA centrat              │   │
│  │ Badges pe 2 rânduri      │   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │ Imagine sub text         │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘

Mobile (< sm):
┌───────────────────┐
│     col-12        │
│  Text centrat     │
│  CTA full-width   │
│  Badges stacked   │
│  Imagine ascunsă  │
│  sau minimizată   │
└───────────────────┘
```

---

#### Secțiunea 3: De ce TrueGreen? (Trust / Why Us)

| Proprietate | Detalii |
|------------|---------|
| **Titlu secțiune** | „De ce să alegi TrueGreen?" cu subtitlu explicativ |
| **Layout** | Grid de 4 carduri cu iconițe |
| **Card 1** | 🏗️ Experiență demonstrată — nr. locuințe izolate, ani experiență |
| **Card 2** | ✅ Garanție oficială — program de stat, verificare independentă |
| **Card 3** | 👥 Echipă specializată — nr. profesioniști, certificări |
| **Card 4** | 🛡️ Fără griji — fără birocrație, fără costuri ascunse |
| **Bandă oficială** | Banner cu logo-uri parteneri/organisme oficiale |

**Grid Carduri:**

| Breakpoint | Distribuție |
|-----------|------------|
| `col-xl-3` | 4 carduri pe rând |
| `col-lg-6` | 2 carduri pe rând |
| `col-md-6` | 2 carduri pe rând |
| `col-sm-12` | 1 card pe rând (full-width) |

**Stil carduri:**
- Fundal alb cu umbră subtilă (`box-shadow`)
- Iconiță mare colorată (verde) în partea de sus
- Titlu bold + paragraf descriptiv
- Hover: elevare ușoară (translateY + shadow mai pronunțat)
- Border-radius: `12px`
- Padding: `24px–32px`

---

#### Secțiunea 4: Cum funcționează? (Process Steps)

| Proprietate | Detalii |
|------------|---------|
| **Titlu secțiune** | „Cum funcționează programul?" |
| **Layout** | Timeline verticală cu 4 pași numerotați |
| **Pas 1** | Instalare și finanțare — TrueGreen realizează lucrarea, avansează costurile |
| **Pas 2** | Documentație completă — pregătirea dosarului tehnic |
| **Pas 3** | Verificare independentă — audit de organism acreditat |
| **Pas 4** | Validare și compensare — compania energetică compensează costurile |
| **Rezultat** | Box evidențiat cu rezumatul: „Clientul nu plătește nimic" |
| **Link extern** | Link către pagina oficială a programului guvernamental |

**Grid Pași:**

```
Desktop (≥ lg):
┌──────────────────────────────────────┐
│  col-lg-6            col-lg-6        │
│  ┌───────────┐   ┌───────────┐      │
│  │  Pas 1    │   │  Pas 2    │      │
│  └───────────┘   └───────────┘      │
│  ┌───────────┐   ┌───────────┐      │
│  │  Pas 3    │   │  Pas 4    │      │
│  └───────────┘   └───────────┘      │
└──────────────────────────────────────┘

Tablet (md):
  col-md-6 × 2 pe rând

Mobile (< md):
  col-12, fiecare pas pe rând separat, timeline verticală stângă
```

**Stil timeline:**
- Cercuri numerotate (1, 2, 3, 4) cu gradient verde
- Linie verticală/orizontală conectoare între pași
- Animație secvențială la scroll (fiecare pas apare cu delay)

---

#### Secțiunea 5: Soluțiile noastre (Solutions/Benefits)

| Proprietate | Detalii |
|------------|---------|
| **Titlu secțiune** | „Soluțiile noastre" cu subtitlu |
| **Comparator Before/After** | Slider interactiv cu imagini „Înainte" / „După" |
| **Categorii beneficii** | 3 sub-carduri: Economie, Confort & Siguranță, Instalare rapidă |
| **CTA** | Buton „Solicită studiul energetic gratuit" |

**Grid Beneficii:**

| Breakpoint | Layout |
|-----------|--------|
| `col-xl-4` | 3 carduri inline |
| `col-md-6` | 2 + 1 (ultimul centrat sau full-width) |
| `col-sm-12` | Stacked vertical |

**Comparator Before/After:**
- Slider drag orizontal cu linie centrală
- Imagine stânga: „Înainte" (mansardă neizolată)
- Imagine dreapta: „După" (mansardă izolată)
- Label-uri „Înainte" / „După" fixate
- Pe mobile: funcționează cu touch/swipe

---

#### Secțiunea 6: Testimoniale (Reviews)

| Proprietate | Detalii |
|------------|---------|
| **Titlu secțiune** | „Ce spun clienții noștri" |
| **Rating general** | Card mare cu scor mediu (ex: 4.9/5), nr. recenzii, link Google |
| **Carousel testimoniale** | Slider cu carduri de recenzii individuale |
| **Card recenzie** | Avatar/Inițiale, Nume, Dată, Text recenzie, Rating stele |

**Grid Testimoniale:**

| Breakpoint | Layout |
|-----------|--------|
| `≥ lg` | Scor stânga (`col-lg-4`) + Carousel dreapta (`col-lg-8`) |
| `md` | Scor sus (full-width) + Carousel sub (full-width) |
| `< md` | Totul stacked, 1 testimonial vizibil + swipe |

**Carousel:**
- Auto-play cu pauză la hover
- Indicators (dots) pentru navigare
- Swipe pe mobile
- 3 carduri vizibile pe desktop, 2 pe tablet, 1 pe mobile

---

#### Secțiunea 7: Contact

| Proprietate | Detalii |
|------------|---------|
| **Titlu secțiune** | „Suntem aici pentru tine" |
| **Carduri contact** | Telefon, Email, WhatsApp, Adresă fizică |
| **CTA final** | Box evidențiat cu mesaj + 2 butoane: „Solicită studiu gratuit" + „Sună acum" |

**Grid Contact:**

| Breakpoint | Layout carduri |
|-----------|---------------|
| `col-xl-3` | 4 carduri inline |
| `col-md-6` | 2 × 2 grid |
| `col-sm-12` | Stacked vertical |

**Stil carduri contact:**
- Fundal ușor colorat (gradient subtil verde-alb)
- Iconiță mare + text + link clickable
- Hover: border colorat sau shadow

---

#### Secțiunea 8: Footer

| Proprietate | Detalii |
|------------|---------|
| **Coloana 1** | Logo + descriere scurtă companie |
| **Coloana 2** | Link-uri rapide (secțiuni pagină) |
| **Coloana 3** | Contact rapid (telefon, email) |
| **Coloana 4** | Social media icons (Facebook, Instagram, LinkedIn, YouTube) |
| **Copyright** | Rând inferior: „© 2026 TrueGreen. Toate drepturile rezervate." + link Politică confidențialitate |

**Grid Footer:**

| Breakpoint | Layout |
|-----------|--------|
| `col-lg-3` | 4 coloane inline |
| `col-md-6` | 2 × 2 |
| `col-sm-12` | Stacked vertical, centrat |

---

### 4.2 Pagini secundare

| Pagină | Rută RO | Rută EN | Descriere |
|--------|---------|---------|-----------|
| Despre noi | `/ro/despre-noi` | `/en/about-us` | Istorie, echipă, misiune, viziune |
| Servicii | `/ro/servicii` | `/en/services` | Detalii servicii oferite |
| FAQ | `/ro/intrebari-frecvente` | `/en/faq` | Întrebări și răspunsuri frecvente (accordion) |
| Blog | `/ro/blog` | `/en/blog` | Articole despre eficiență energetică |
| Blog Articol | `/ro/blog/:slug` | `/en/blog/:slug` | Pagina individuală articol |
| Politica de confidențialitate | `/ro/politica-confidentialitate` | `/en/privacy-policy` | GDPR, cookies |
| Formular eligibilitate | `/ro/verificare-eligibilitate` | `/en/check-eligibility` | Formular multi-step |
| 404 | `/*` | `/*` | Pagina not found |

---

## 5. Design și UI/UX

### 5.1 Paleta de culori

| Variabilă | Hex | Utilizare |
|----------|-----|-----------|
| `--tg-primary` | `#2E7D32` | Verde principal — butoane, accente |
| `--tg-primary-light` | `#4CAF50` | Verde deschis — hover, gradienți |
| `--tg-primary-dark` | `#1B5E20` | Verde închis — text pe fundal deschis |
| `--tg-secondary` | `#1565C0` | Albastru — elemente secundare |
| `--tg-accent` | `#FF8F00` | Portocaliu/Amber — CTA-uri importante, badge-uri |
| `--tg-bg-light` | `#F8FBF8` | Fundal secțiuni alternante (ușor verde) |
| `--tg-bg-white` | `#FFFFFF` | Fundal alb |
| `--tg-bg-dark` | `#1A2E1A` | Fundal footer / secțiuni dark |
| `--tg-text-primary` | `#212121` | Text principal |
| `--tg-text-secondary` | `#616161` | Text secundar / descrieri |
| `--tg-text-light` | `#FFFFFF` | Text pe fundal închis |
| `--tg-border` | `#E0E0E0` | Borduri subtile |
| `--tg-success` | `#43A047` | Succes / confirmare |
| `--tg-warning` | `#FB8C00` | Avertisment |
| `--tg-error` | `#E53935` | Eroare |

### 5.2 Tipografie

| Element | Font | Dimensiune Desktop | Dimensiune Mobile | Greutate |
|---------|------|--------------------|--------------------|----------|
| H1 (Hero) | Poppins | 56px / 3.5rem | 32px / 2rem | 700 (Bold) |
| H2 (Titlu secțiune) | Poppins | 42px / 2.625rem | 28px / 1.75rem | 700 |
| H3 (Subtitlu card) | Poppins | 24px / 1.5rem | 20px / 1.25rem | 600 (SemiBold) |
| H4 | Poppins | 20px / 1.25rem | 18px / 1.125rem | 600 |
| Body | Inter | 16px / 1rem | 15px / 0.9375rem | 400 (Regular) |
| Body Small | Inter | 14px / 0.875rem | 13px / 0.8125rem | 400 |
| Button | Inter | 16px / 1rem | 15px / 0.9375rem | 600 |
| Caption | Inter | 12px / 0.75rem | 12px / 0.75rem | 400 |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
```

### 5.3 Spațiere și grid

- Sistem bazat pe **8px grid** (multipli de 8: 8, 16, 24, 32, 48, 64, 80, 96, 128)
- Padding secțiuni: `80px` vertical (desktop), `48px` (tablet), `32px` (mobile)
- Gap între carduri: `24px` (desktop), `16px` (mobile)
- Container max-width: Bootstrap default (`1320px` pe xxl)
- Border-radius standard: `8px` (elemente mici), `12px` (carduri), `16px` (secțiuni)

### 5.4 Componente UI — Stilizare

#### Butoane

| Tip | Stil |
|-----|------|
| Primary | `background: var(--tg-primary)`, text alb, border-radius 8px, padding 12px 32px, hover: darken 10% |
| Secondary | `background: transparent`, border 2px verde, text verde, hover: fill verde + text alb |
| CTA (Call to Action) | `background: gradient(--tg-primary, --tg-primary-dark)`, text alb, shadow, hover: shadow mai mare + scale(1.02) |
| Ghost | Transparent, text verde, hover: background ușor |
| Disabled | Opacity 0.5, cursor not-allowed |

#### Carduri

```scss
.tg-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(46, 125, 50, 0.12);
    border-color: var(--tg-primary-light);
  }
}
```

---

## 6. Responsive Design (Bootstrap 5 Grid)

### 6.1 Breakpoint-uri utilizate

| Breakpoint | Prefix | Dimensiune | Dispozitiv |
|-----------|--------|------------|------------|
| Extra small | — (default) | `< 576px` | Telefoane portret |
| Small | `sm` | `≥ 576px` | Telefoane landscape |
| Medium | `md` | `≥ 768px` | Tablete |
| Large | `lg` | `≥ 992px` | Desktop mic / Tablete landscape |
| Extra large | `xl` | `≥ 1200px` | Desktop |
| XXL | `xxl` | `≥ 1400px` | Desktop mare / Monitor wide |

### 6.2 Reguli obligatorii de responsive

1. **Mobile-First** — Toate stilurile se scriu mai întâi pentru mobile, apoi se adaugă media queries ascendente
2. **Fără scroll orizontal** — Nicio secțiune nu trebuie să producă overflow pe X
3. **Touch-friendly** — Toate elementele interactive au minim `44px × 44px` target size
4. **Imagini responsive** — Toate imaginile folosesc `img-fluid` și/sau `srcset` pentru rezoluții diferite
5. **Text lizibil** — Font-size minim 14px pe orice dispozitiv, line-height minim 1.5
6. **Spațiere adaptivă** — Padding/margin redus proporțional pe ecrane mici

### 6.3 Tabel responsiv complet per secțiune

| Secțiune | `< 576px` | `sm (≥576)` | `md (≥768)` | `lg (≥992)` | `xl (≥1200)` | `xxl (≥1400)` |
|---------|-----------|------------|------------|------------|-------------|-------------|
| **Navbar** | Hamburger + Offcanvas | Hamburger + Offcanvas | Hamburger + Offcanvas | Full navbar expanded | Full navbar | Full navbar |
| **Hero** | 1 col, text centrat, CTA full-width | 1 col, text centrat | 1 col, text stânga | 2 col (7+5) | 2 col (7+5) | 2 col (7+5) |
| **Why Us Cards** | 1/rând | 1/rând | 2/rând | 2/rând | 4/rând | 4/rând |
| **Process Steps** | 1/rând, timeline stânga | 1/rând | 2/rând | 2/rând | 2/rând | 4/rând sau 2/rând |
| **Solutions** | 1/rând | 1/rând | 2/rând | 3/rând | 3/rând | 3/rând |
| **Testimonials** | 1 card vizibil | 1 card | 2 carduri | 2 carduri + scor | 3 carduri + scor | 3 carduri + scor |
| **Contact** | 1/rând | 2/rând | 2/rând | 4/rând | 4/rând | 4/rând |
| **Footer** | 1 col, centrat | 2 col | 2 col | 4 col | 4 col | 4 col |

### 6.4 Exemple de clase Bootstrap per componentă

```html
<!-- Hero Section -->
<div class="container">
  <div class="row align-items-center">
    <div class="col-12 col-lg-7 text-center text-lg-start">
      <!-- Text + CTA -->
    </div>
    <div class="col-12 col-lg-5 d-none d-lg-block">
      <!-- Imagine -->
    </div>
  </div>
</div>

<!-- Why Us Cards -->
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-xl-3"><!-- Card 1 --></div>
    <div class="col-12 col-md-6 col-xl-3"><!-- Card 2 --></div>
    <div class="col-12 col-md-6 col-xl-3"><!-- Card 3 --></div>
    <div class="col-12 col-md-6 col-xl-3"><!-- Card 4 --></div>
  </div>
</div>

<!-- Contact Cards -->
<div class="container">
  <div class="row g-3">
    <div class="col-12 col-sm-6 col-xl-3"><!-- Telefon --></div>
    <div class="col-12 col-sm-6 col-xl-3"><!-- Email --></div>
    <div class="col-12 col-sm-6 col-xl-3"><!-- WhatsApp --></div>
    <div class="col-12 col-sm-6 col-xl-3"><!-- Adresă --></div>
  </div>
</div>

<!-- Footer -->
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-3"><!-- Logo + descriere --></div>
    <div class="col-12 col-md-6 col-lg-3"><!-- Link-uri --></div>
    <div class="col-12 col-md-6 col-lg-3"><!-- Contact --></div>
    <div class="col-12 col-md-6 col-lg-3"><!-- Social --></div>
  </div>
</div>
```

### 6.5 Utilități responsive obligatorii

```scss
// Text alignment
.text-center // mobile default
.text-lg-start // desktop aligned left

// Display
.d-none .d-lg-block // ascuns pe mobile, vizibil pe desktop
.d-block .d-lg-none // vizibil pe mobile, ascuns pe desktop

// Spacing responsive
.py-5 .py-lg-6 // padding diferit per breakpoint
.mb-3 .mb-lg-4 // margin diferit per breakpoint

// Flex responsive
.flex-column .flex-lg-row // stack pe mobile, inline pe desktop
.justify-content-center .justify-content-lg-start
```

---

## 7. Internaționalizare (i18n)

### 7.1 Configurare

```javascript
// src/i18n/index.js
import { createI18n } from 'vue-i18n'
import ro from './locales/ro.json'
import en from './locales/en.json'

export default createI18n({
  legacy: false,
  locale: 'ro',
  fallbackLocale: 'en',
  messages: { ro, en }
})
```

### 7.2 Structura fișierelor de traducere

```
src/i18n/
├── index.js
└── locales/
    ├── ro.json
    └── en.json
```

### 7.3 Schema traducerilor (ro.json)

```json
{
  "nav": {
    "home": "Acasă",
    "whyUs": "De ce noi?",
    "howItWorks": "Cum funcționează",
    "solutions": "Soluții",
    "testimonials": "Testimoniale",
    "contact": "Contact",
    "checkEligibility": "Verifică eligibilitatea",
    "about": "Despre noi",
    "services": "Servicii",
    "faq": "Întrebări frecvente",
    "blog": "Blog"
  },
  "hero": {
    "title": "Izolează-ți mansarda {highlight} grație programului de eficiență energetică",
    "titleHighlight": "fără niciun cost",
    "subtitle": "Peste {count} locuințe izolate cu lână minerală certificată. Până la {savings}% economie la energie. Fără avans și fără birocrație.",
    "cta": "Sunt eligibil?",
    "stats": {
      "rating": "{score} ({count} opinii)",
      "installations": "+{count} instalări realizate"
    },
    "badges": {
      "funded": "100% Finanțat",
      "noCost": "Fără Costuri",
      "noBureaucracy": "Fără Birocrație",
      "official": "Program Oficial",
      "supervised": "Supervizat"
    }
  },
  "whyUs": {
    "sectionTitle": "De ce să alegi TrueGreen?",
    "sectionSubtitle": "Intermediari oficiali ai programului cu peste {count} instalări verificate.",
    "cards": {
      "experience": {
        "title": "Experiență demonstrată",
        "description": "Peste {count} locuințe izolate de tehnicieni certificați, cu economii verificate de până la {savings}% la încălzire."
      },
      "guarantee": {
        "title": "Garanție oficială",
        "description": "Companie înregistrată în programul oficial. Fiecare dosar este verificat de un organism acreditat."
      },
      "team": {
        "title": "Echipă specializată",
        "description": "Peste {count} profesioniști calificați la dispoziția dumneavoastră."
      },
      "peace": {
        "title": "Fără griji",
        "description": "Fără birocrație, fără condiții de venit și fără avans. Companiile energetice finanțează 100% din lucrări."
      }
    }
  },
  "howItWorks": {
    "sectionTitle": "Cum funcționează programul?",
    "sectionSubtitle": "Un mecanism oficial care finanțează 100% lucrările de izolație termică.",
    "steps": {
      "step1": {
        "title": "TrueGreen instalează și avansează costurile",
        "description": "Echipa noastră realizează instalarea completă. TrueGreen avansează 100% din costuri.",
        "summary": "Instalăm izolația completă. TrueGreen avansează toate costurile."
      },
      "step2": {
        "title": "Gestionăm toată documentația",
        "description": "Pregătim dosarul tehnic complet: măsurători, certificate, calcul economii.",
        "summary": "Pregătim tot dosarul tehnic. Nu trebuie să faceți nimic."
      },
      "step3": {
        "title": "Verificare independentă",
        "description": "Un organism verificator acreditat revizuiește și validează economia energetică.",
        "summary": "Un organism acreditat verifică că economia energetică este reală."
      },
      "step4": {
        "title": "Validare și compensare",
        "description": "Dosarul verificat este prezentat companiei energetice care compensează costurile.",
        "summary": "Compania energetică compensează costurile. Procesul este supervizat."
      }
    },
    "result": "Clientul nu plătește nimic. TrueGreen este compensat de compania energetică."
  },
  "solutions": {
    "sectionTitle": "Soluțiile noastre",
    "sectionSubtitle": "Îmbunătățește eficiența energetică a locuinței tale cu soluțiile noastre inovatoare.",
    "beforeAfter": {
      "before": "Înainte",
      "after": "După",
      "hint": "Glisează pentru a compara"
    },
    "categories": {
      "savings": {
        "title": "Economie",
        "items": [
          "Până la 45% reducere la factura energetică",
          "Fără costuri cu programul oficial",
          "Creșterea valorii locuinței"
        ]
      },
      "comfort": {
        "title": "Confort și Siguranță",
        "items": [
          "Confort termic tot anul",
          "Material ignifug certificat",
          "Soluție ecologică și durabilă"
        ]
      },
      "installation": {
        "title": "Instalare rapidă",
        "items": [
          "Instalare în câteva ore",
          "Fără construcții sau demontări",
          "Sistem 100% suflat, curat"
        ]
      }
    },
    "cta": "Solicită studiul energetic gratuit"
  },
  "testimonials": {
    "sectionTitle": "Ce spun clienții noștri",
    "sectionSubtitle": "Nimic nu vorbește mai bine despre calitatea muncii noastre decât experiența celor care ne-au ales.",
    "verifiedReviews": "Opinii verificate pe Google",
    "basedOn": "Bazat pe +{count} opinii",
    "viewOnGoogle": "Vezi pe Google"
  },
  "contact": {
    "sectionTitle": "Suntem aici pentru tine",
    "sectionSubtitle": "Echipa noastră de experți este disponibilă prin mai multe canale.",
    "phone": {
      "label": "Telefon",
      "schedule": "L-V 9:00-18:00"
    },
    "email": {
      "label": "Email",
      "response": "Răspuns în mai puțin de 24 ore"
    },
    "whatsapp": {
      "label": "WhatsApp",
      "subtitle": "Mesagerie instantanee"
    },
    "address": {
      "label": "Adresă"
    },
    "ctaTitle": "Vrei să-ți izolezi locuința gratuit?",
    "ctaSubtitle": "Ne angajăm să răspundem la toate întrebările în maximum 24 ore.",
    "ctaButton": "Solicită studiu gratuit",
    "ctaCall": "Sună acum"
  },
  "footer": {
    "description": "Soluții profesionale de eficiență energetică pentru locuința ta.",
    "quickLinks": "Link-uri rapide",
    "contactInfo": "Contact",
    "followUs": "Urmărește-ne",
    "copyright": "© {year} TrueGreen. Toate drepturile rezervate.",
    "privacy": "Politica de confidențialitate",
    "terms": "Termeni și condiții"
  },
  "common": {
    "learnMore": "Află mai mult",
    "getStarted": "Începe acum",
    "backToHome": "Înapoi acasă",
    "loading": "Se încarcă...",
    "error": "A apărut o eroare",
    "retry": "Încearcă din nou"
  },
  "form": {
    "firstName": "Prenume",
    "lastName": "Nume",
    "email": "Adresă email",
    "phone": "Telefon",
    "city": "Oraș",
    "county": "Județ",
    "propertyType": "Tip proprietate",
    "house": "Casă",
    "apartment": "Apartament",
    "building": "Bloc",
    "message": "Mesaj",
    "consent": "Sunt de acord cu prelucrarea datelor personale conform {link}.",
    "privacyLink": "Politicii de confidențialitate",
    "submit": "Trimite cererea",
    "success": "Cererea a fost trimisă cu succes! Vă vom contacta în cel mai scurt timp.",
    "errors": {
      "required": "Acest câmp este obligatoriu",
      "email": "Adresa de email nu este validă",
      "phone": "Numărul de telefon nu este valid",
      "minLength": "Minim {min} caractere"
    }
  },
  "faq": {
    "sectionTitle": "Întrebări frecvente",
    "items": []
  },
  "notFound": {
    "title": "Pagina nu a fost găsită",
    "subtitle": "Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.",
    "backHome": "Înapoi la pagina principală"
  }
}
```

### 7.4 Schema traducerilor (en.json)

Structură identică cu `ro.json`, cu toate valorile traduse în limba engleză. Exemplu parțial:

```json
{
  "nav": {
    "home": "Home",
    "whyUs": "Why Us?",
    "howItWorks": "How It Works",
    "solutions": "Solutions",
    "testimonials": "Testimonials",
    "contact": "Contact",
    "checkEligibility": "Check Eligibility"
  },
  "hero": {
    "title": "Insulate your attic {highlight} thanks to the energy efficiency program",
    "titleHighlight": "at no cost",
    "subtitle": "Over {count} homes insulated with certified mineral wool. Up to {savings}% energy savings. No upfront payment and no paperwork.",
    "cta": "Am I eligible?"
  }
}
```

### 7.5 Comutare limbă

| Funcționalitate | Detalii |
|----------------|---------|
| **Selector** | Dropdown cu steaguri: 🇷🇴 Română / 🇬🇧 English |
| **URL** | Prefixul `/ro/` sau `/en/` în URL |
| **Persistență** | Limba aleasă se salvează în `localStorage` |
| **Detectare automată** | La prima vizită, se detectează limba browserului |
| **Redirect** | `/` redirectează la `/ro/` sau `/en/` conform preferinței |
| **SEO** | Tag-uri `hreflang` pentru fiecare pagină |
| **Meta tags** | `<html lang="ro">` sau `<html lang="en">` se actualizează dinamic |

---

## 8. Managementul stării (Pinia)

### 8.1 Store-uri necesare

#### `useUiStore`

```javascript
// src/stores/ui.js
export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false,
    isScrolled: false,
    currentSection: 'hero',
    isLoading: false,
    showCookieBanner: true
  }),
  actions: {
    toggleMobileMenu() { /* ... */ },
    setScrollState(value) { /* ... */ },
    setCurrentSection(section) { /* ... */ },
    acceptCookies() { /* ... */ }
  }
})
```

#### `useFormStore`

```javascript
// src/stores/form.js
export const useFormStore = defineStore('form', {
  state: () => ({
    eligibilityForm: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      county: '',
      propertyType: '',
      message: '',
      consent: false
    },
    isSubmitting: false,
    isSubmitted: false,
    errors: {}
  }),
  actions: {
    async submitForm() { /* ... */ },
    resetForm() { /* ... */ },
    validateField(field) { /* ... */ }
  }
})
```

#### `useContentStore`

```javascript
// src/stores/content.js
export const useContentStore = defineStore('content', {
  state: () => ({
    testimonials: [],
    faqItems: [],
    blogPosts: [],
    stats: {
      installationsCount: 1500,
      rating: 4.9,
      reviewsCount: 600,
      professionalCount: 100
    }
  }),
  actions: {
    async fetchTestimonials() { /* ... */ },
    async fetchFaqItems() { /* ... */ },
    async fetchBlogPosts() { /* ... */ }
  }
})
```

---

## 9. Rutare (Vue Router)

### 9.1 Configurare rute

```javascript
// src/router/index.js
const routes = [
  {
    path: '/',
    redirect: () => {
      const savedLang = localStorage.getItem('tg-lang')
      const browserLang = navigator.language.startsWith('ro') ? 'ro' : 'en'
      return `/${savedLang || browserLang}/`
    }
  },
  {
    path: '/:lang(ro|en)',
    component: () => import('@/layouts/MainLayout.vue'),
    beforeEnter: (to) => {
      const lang = to.params.lang
      i18n.global.locale.value = lang
      document.documentElement.lang = lang
      localStorage.setItem('tg-lang', lang)
    },
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
      { path: 'despre-noi', name: 'about-ro', component: () => import('@/views/AboutView.vue') },
      { path: 'about-us', name: 'about-en', component: () => import('@/views/AboutView.vue') },
      { path: 'servicii', name: 'services-ro', component: () => import('@/views/ServicesView.vue') },
      { path: 'services', name: 'services-en', component: () => import('@/views/ServicesView.vue') },
      { path: 'intrebari-frecvente', name: 'faq-ro', component: () => import('@/views/FaqView.vue') },
      { path: 'faq', name: 'faq-en', component: () => import('@/views/FaqView.vue') },
      { path: 'blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
      { path: 'blog/:slug', name: 'blog-post', component: () => import('@/views/BlogPostView.vue') },
      { path: 'verificare-eligibilitate', name: 'eligibility-ro', component: () => import('@/views/EligibilityView.vue') },
      { path: 'check-eligibility', name: 'eligibility-en', component: () => import('@/views/EligibilityView.vue') },
      { path: 'politica-confidentialitate', name: 'privacy-ro', component: () => import('@/views/PrivacyView.vue') },
      { path: 'privacy-policy', name: 'privacy-en', component: () => import('@/views/PrivacyView.vue') }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]
```

### 9.2 Navigation Guards

| Guard | Scop |
|-------|------|
| `beforeEach` | Setează limba, actualizează `<html lang>`, meta tags |
| `afterEach` | Scroll to top, actualizează titlul paginii, tracking analytics |
| `beforeEnter` (per rută) | Verificări specifice (ex: încărcare date blog) |

### 9.3 Scroll Behavior

```javascript
scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth', top: 80 } // offset pentru navbar
  }
  if (savedPosition) return savedPosition
  return { top: 0, behavior: 'smooth' }
}
```

---

## 10. Componente reutilizabile

### 10.1 Inventar componente

```
src/components/
├── layout/
│   ├── AppNavbar.vue          — Navbar sticky cu selector limbă
│   ├── AppFooter.vue          — Footer cu 4 coloane
│   ├── MobileMenu.vue         — Offcanvas menu mobil
│   └── LanguageSwitcher.vue   — Dropdown selector RO/EN
│
├── sections/
│   ├── HeroSection.vue        — Hero cu CTA + badges
│   ├── WhyUsSection.vue       — De ce noi (4 carduri)
│   ├── HowItWorksSection.vue  — Proces în 4 pași
│   ├── SolutionsSection.vue   — Soluții + comparator
│   ├── TestimonialsSection.vue — Testimoniale + carousel
│   └── ContactSection.vue     — Contact + CTA final
│
├── ui/
│   ├── TgButton.vue           — Buton reutilizabil (primary/secondary/cta/ghost)
│   ├── TgCard.vue             — Card reutilizabil
│   ├── TgBadge.vue            — Badge/tag
│   ├── TgSectionHeader.vue    — Titlu + subtitlu secțiune
│   ├── TgIcon.vue             — Wrapper pentru Bootstrap Icons
│   ├── TgRating.vue           — Afișare rating stele
│   ├── TgTestimonialCard.vue  — Card testimonial individual
│   ├── TgStepCard.vue         — Card pas din timeline
│   ├── TgContactCard.vue      — Card contact (telefon/email/etc.)
│   ├── TgBeforeAfter.vue      — Comparator before/after slider
│   ├── TgCarousel.vue         — Carousel wrapper peste Swiper
│   ├── TgAccordion.vue        — Accordion pentru FAQ
│   ├── TgCookieBanner.vue     — Banner GDPR cookies
│   └── TgScrollTopButton.vue  — Buton „înapoi sus"
│
├── form/
│   ├── TgInput.vue            — Input text cu validare
│   ├── TgSelect.vue           — Select dropdown
│   ├── TgTextarea.vue         — Textarea cu validare
│   ├── TgCheckbox.vue         — Checkbox cu label
│   └── TgFormGroup.vue        — Wrapper pentru grupuri de câmpuri
│
└── common/
    ├── TgLoader.vue           — Spinner/skeleton loader
    ├── TgAlert.vue            — Alert box (success/warning/error)
    └── TgModal.vue            — Modal dialog
```

### 10.2 Specificații componente cheie

#### `AppNavbar.vue`

| Prop | Tip | Descriere |
|------|-----|-----------|
| — | — | Nu primește props, folosește stores și i18n |

| Comportament | Detalii |
|-------------|---------|
| Scroll detection | La scroll > 50px, adaugă clasă `.scrolled` (fundal solid, shadow) |
| Active link | Evidențiază link-ul secțiunii curente bazat pe IntersectionObserver |
| Smooth scroll | Click pe link → smooth scroll la secțiune cu offset |
| Collapse | Sub breakpoint `lg`, se transformă în hamburger menu |
| Limba | LanguageSwitcher integrat, schimbă ruta + locale |

#### `TgBeforeAfter.vue`

| Prop | Tip | Descriere |
|------|-----|-----------|
| `beforeImage` | String | URL imagine „înainte" |
| `afterImage` | String | URL imagine „după" |
| `beforeLabel` | String | Label „Înainte" (i18n) |
| `afterLabel` | String | Label „După" (i18n) |

| Comportament | Detalii |
|-------------|---------|
| Drag | Slider central draggable stânga-dreapta |
| Touch | Suport touch pe mobile |
| Resize | Se adaptează la redimensionare fereastră |
| Accesibilitate | Keyboard navigation (stânga/dreapta) |

#### `TgButton.vue`

| Prop | Tip | Default | Descriere |
|------|-----|---------|-----------|
| `variant` | String | `'primary'` | `primary` / `secondary` / `cta` / `ghost` |
| `size` | String | `'md'` | `sm` / `md` / `lg` |
| `icon` | String | `null` | Bootstrap Icon name |
| `iconPosition` | String | `'start'` | `start` / `end` |
| `loading` | Boolean | `false` | Arată spinner în loc de text |
| `disabled` | Boolean | `false` | Dezactivat |
| `fullWidth` | Boolean | `false` | `w-100` pe orice breakpoint |
| `href` | String | `null` | Dacă setat, render `<a>` în loc de `<button>` |
| `to` | Object | `null` | Dacă setat, render `<router-link>` |

---

## 11. Animații și interactivitate

### 11.1 Animații la scroll (AOS / IntersectionObserver)

| Element | Animație | Duration | Delay |
|---------|---------|----------|-------|
| Titluri secțiuni | Fade up | 600ms | 0 |
| Carduri (Why Us) | Fade up | 600ms | 100ms × index |
| Pași (Timeline) | Slide in from left/right alternat | 800ms | 200ms × index |
| Testimoniale | Fade in | 500ms | 0 |
| Badge-uri Hero | Scale in | 400ms | 50ms × index |
| Numere statistici | Count-up animat | 2000ms | 0 |

### 11.2 Micro-interacțiuni

| Element | Interacțiune | Efect |
|---------|-------------|-------|
| Butoane | Hover | Scale(1.02), shadow accentuat |
| Butoane | Click | Scale(0.98) rapid, apoi revenire |
| Carduri | Hover | TranslateY(-4px), shadow |
| Link-uri navbar | Hover | Underline animat (width: 0 → 100%) |
| Hamburger icon | Click | Transformare animată (× / ≡) |
| Scroll-to-top | Scroll > 300px | Fade in buton |
| Selector limbă | Click | Dropdown animat |

### 11.3 Tranziții pagini (Vue Router)

```vue
<router-view v-slot="{ Component }">
  <Transition name="page-fade" mode="out-in">
    <component :is="Component" />
  </Transition>
</router-view>
```

```css
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
```

---

## 12. SEO și performanță

### 12.1 Meta tags dinamice

Fiecare pagină actualizează dinamic:

```html
<head>
  <html lang="ro"> <!-- sau "en" -->
  <title>TrueGreen — Izolație Termică Gratuită | Program Eficiență Energetică</title>
  <meta name="description" content="...">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="...">
  <meta property="og:url" content="...">
  <meta property="og:locale" content="ro_RO">
  <meta property="og:locale:alternate" content="en_US">
  <link rel="alternate" hreflang="ro" href="https://truegreen.ro/ro/">
  <link rel="alternate" hreflang="en" href="https://truegreen.ro/en/">
  <link rel="canonical" href="...">
</head>
```

### 12.2 Performanță

| Optimizare | Implementare |
|-----------|-------------|
| **Lazy loading imagini** | `loading="lazy"` pe toate imaginile sub fold |
| **Lazy loading rute** | `() => import(...)` pe toate rutele |
| **Image optimization** | Format WebP cu fallback JPEG, srcset pentru rezoluții |
| **Code splitting** | Vite automatic chunks per rută |
| **Font preloading** | `<link rel="preload">` pentru Poppins și Inter |
| **CSS purging** | Elimină Bootstrap CSS nefolosit via PurgeCSS |
| **Gzip/Brotli** | Compresie la nivel de server |
| **Cache headers** | Static assets cu cache pe termen lung |

### 12.3 Lighthouse targets

| Categorie | Scor minim |
|----------|-----------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

### 12.4 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TrueGreen",
  "description": "Soluții de eficiență energetică și izolație termică",
  "url": "https://truegreen.ro",
  "telephone": "+40-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "...",
    "addressCountry": "RO"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "600"
  }
}
```

---

## 13. Formulare și validare

### 13.1 Formular de eligibilitate (multi-step)

#### Step 1: Informații proprietate

| Câmp | Tip | Validare | Obligatoriu |
|------|-----|---------|-------------|
| Tip proprietate | Select | enum: casă, apartament, bloc | Da |
| Suprafață (m²) | Number input | min: 10, max: 10000 | Da |
| An construcție | Number input | min: 1900, max: 2026 | Da |
| Are mansardă/pod | Radio | Da/Nu | Da |

#### Step 2: Localizare

| Câmp | Tip | Validare | Obligatoriu |
|------|-----|---------|-------------|
| Județ | Select (lista județe) | enum | Da |
| Oraș | Text input | min: 2 chars | Da |
| Cod poștal | Text input | pattern: 6 cifre | Nu |

#### Step 3: Date personale

| Câmp | Tip | Validare | Obligatoriu |
|------|-----|---------|-------------|
| Prenume | Text input | min: 2, max: 50 | Da |
| Nume | Text input | min: 2, max: 50 | Da |
| Telefon | Tel input | pattern RO: +40/07xx | Da |
| Email | Email input | format email valid | Da |
| Mesaj | Textarea | max: 500 chars | Nu |
| Consimțământ GDPR | Checkbox | must be true | Da |

#### Comportament multi-step

- Progress bar vizual (step 1/3, 2/3, 3/3)
- Validare per step înainte de a avansa
- Buton „Înapoi" și „Următorul"
- Step final: buton „Trimite cererea"
- Animație tranziție între steps (slide left/right)
- Pe mobile: steps stacked, scroll automat la step activ

### 13.2 Formular de contact simplu (în secțiunea Contact)

| Câmp | Tip | Validare |
|------|-----|---------|
| Nume | Text | min: 2 |
| Email | Email | format valid |
| Telefon | Tel | pattern RO |
| Mesaj | Textarea | min: 10, max: 500 |
| GDPR | Checkbox | required |

### 13.3 Librărie de validare

Folosind **VeeValidate** + **Yup**:

```javascript
import * as yup from 'yup'

const contactSchema = yup.object({
  name: yup.string().required(t('form.errors.required')).min(2),
  email: yup.string().required(t('form.errors.required')).email(t('form.errors.email')),
  phone: yup.string().matches(/^(\+40|0)[0-9]{9}$/, t('form.errors.phone')),
  message: yup.string().required(t('form.errors.required')).min(10),
  consent: yup.boolean().oneOf([true], t('form.errors.required'))
})
```

---

## 14. Integrări externe

### 14.1 API Backend

| Endpoint | Metodă | Scop |
|---------|--------|------|
| `POST /api/eligibility` | POST | Trimite formular eligibilitate |
| `POST /api/contact` | POST | Trimite formular contact |
| `GET /api/testimonials` | GET | Obține lista de testimoniale |
| `GET /api/blog` | GET | Obține lista articole blog |
| `GET /api/blog/:slug` | GET | Obține articol individual |
| `GET /api/faq` | GET | Obține lista FAQ |
| `GET /api/stats` | GET | Obține statistici (instalări, rating, etc.) |

> **Notă:** În faza inițială, datele vor fi stocate în fișiere JSON statice. API-ul backend va fi implementat ulterior.

### 14.2 Servicii terțe

| Serviciu | Scop | Implementare |
|---------|------|-------------|
| **Google Analytics 4** | Tracking vizitatori | `gtag.js` cu consimțământ cookies |
| **Google Tag Manager** | Management tag-uri | Container GTM |
| **Google Maps** | Hartă locație birou | Embed iframe sau API |
| **Google reCAPTCHA v3** | Protecție anti-spam formulare | Invisible reCAPTCHA |
| **WhatsApp Business API** | Link direct chat WhatsApp | `wa.me/` link |
| **Facebook Pixel** | Remarketing | Cu consimțământ |
| **Hotjar / Microsoft Clarity** | Heatmaps, session recording | Cu consimțământ |

### 14.3 GDPR / Cookie Consent

| Funcționalitate | Detalii |
|----------------|---------|
| Banner cookies | Apare la prima vizită, cu opțiuni: Acceptă toate / Doar necesare / Personalizează |
| Categorii cookies | Necesare (always), Analytics, Marketing |
| Persistență | Alegerea se salvează în localStorage/cookie |
| Blocarea scripturilor | Scripts GA/FB/Hotjar se încarcă doar după consimțământ |

---

## 15. Structura fișierelor proiectului

```
truegreen-2.0/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── logo.svg
│       ├── logo-white.svg
│       ├── hero-bg.webp
│       ├── hero-bg-mobile.webp
│       ├── before.webp
│       ├── after.webp
│       ├── og-image.jpg
│       └── partners/
│           └── *.svg
│
├── src/
│   ├── main.js                    — Entry point
│   ├── App.vue                    — Root component
│   │
│   ├── assets/
│   │   ├── scss/
│   │   │   ├── _variables.scss    — Variabile custom (culori, tipografie, spacing)
│   │   │   ├── _mixins.scss       — Mixins responsive helpers
│   │   │   ├── _typography.scss   — Stiluri tipografie
│   │   │   ├── _buttons.scss      — Stiluri butoane
│   │   │   ├── _cards.scss        — Stiluri carduri
│   │   │   ├── _animations.scss   — Keyframes și tranziții
│   │   │   ├── _utilities.scss    — Clase utilitare custom
│   │   │   └── main.scss          — Import principal (Bootstrap + custom)
│   │   └── images/
│   │       └── *.webp / *.svg
│   │
│   ├── components/
│   │   ├── layout/                — (vezi secțiunea 10)
│   │   ├── sections/
│   │   ├── ui/
│   │   ├── form/
│   │   └── common/
│   │
│   ├── composables/
│   │   ├── useScrollSpy.js        — Detectare secțiune activă
│   │   ├── useIntersectionObserver.js — Animații la scroll
│   │   ├── useBreakpoint.js       — Detectare breakpoint curent
│   │   ├── useSmoothScroll.js     — Smooth scroll la secțiuni
│   │   └── useHead.js             — Meta tags dinamice
│   │
│   ├── i18n/
│   │   ├── index.js
│   │   └── locales/
│   │       ├── ro.json
│   │       └── en.json
│   │
│   ├── layouts/
│   │   └── MainLayout.vue         — Layout principal (Navbar + RouterView + Footer)
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── stores/
│   │   ├── ui.js
│   │   ├── form.js
│   │   └── content.js
│   │
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── ServicesView.vue
│   │   ├── FaqView.vue
│   │   ├── BlogView.vue
│   │   ├── BlogPostView.vue
│   │   ├── EligibilityView.vue
│   │   ├── PrivacyView.vue
│   │   └── NotFoundView.vue
│   │
│   └── utils/
│       ├── api.js                 — Axios instance + interceptors
│       ├── constants.js           — Constante globale
│       └── helpers.js             — Funcții utilitare
│
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   └── stores/
│   └── e2e/
│       └── specs/
│
├── .env                           — Variabile de mediu (development)
├── .env.production                — Variabile de mediu (production)
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 16. Cerințe non-funcționale

### 16.1 Performanță

| Cerință | Valoare |
|---------|---------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Time to Interactive (TTI) | < 3.5s |
| Bundle size (gzipped) | < 200KB JS, < 50KB CSS |

### 16.2 Compatibilitate browsere

| Browser | Versiune minimă |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |
| Safari iOS | 14+ |
| Chrome Android | 90+ |
| Samsung Internet | 14+ |

### 16.3 Accesibilitate (a11y)

| Cerință | Standard |
|---------|---------|
| Nivel conformitate | WCAG 2.1 AA |
| Navigare keyboard | Completă — tab, enter, escape, arrow keys |
| Screen readers | Atribute ARIA corecte pe toate componentele interactive |
| Contrast culori | Minim 4.5:1 (text normal), 3:1 (text mare) |
| Focus visible | Outline vizibil pe toate elementele focusabile |
| Alt text | Toate imaginile au atribut `alt` descriptiv (tradus) |
| Skip navigation | Link „Sari la conținut" ascuns, vizibil la focus |
| Reduced motion | `prefers-reduced-motion` — dezactivează animații |

### 16.4 Securitate

| Cerință | Implementare |
|---------|-------------|
| HTTPS | Obligatoriu (redirect HTTP → HTTPS) |
| CSP | Content Security Policy headers |
| XSS protection | Sanitizare input-uri, Vue escape implicit |
| CORS | Configurare corectă pe API |
| Rate limiting | Limite pe endpoint-uri formular |
| reCAPTCHA | Pe toate formularele |
| GDPR compliance | Consimțământ explicit, drept la ștergere |

### 16.5 Disponibilitate și hosting

| Cerință | Detalii |
|---------|---------|
| Uptime target | 99.9% |
| Hosting recomandat | Netlify / Vercel / AWS S3+CloudFront |
| CI/CD | GitHub Actions — build, test, deploy automat |
| Environments | Development, Staging, Production |
| SSL | Certificat SSL/TLS (Let's Encrypt sau CloudFlare) |

---

## 17. Plan de livrare

### 17.1 Faze de dezvoltare

| Fază | Durată estimată | Livrabile |
|------|----------------|-----------|
| **Faza 1: Setup & Infrastructură** | 3-4 zile | Proiect Vue 4, configurare Vite, Bootstrap 5 SCSS, Vue Router, i18n, Pinia, ESLint, structura fișiere |
| **Faza 2: Layout & Navbar** | 2-3 zile | MainLayout, AppNavbar (responsive), AppFooter, MobileMenu, LanguageSwitcher |
| **Faza 3: Hero & Why Us** | 3-4 zile | HeroSection (responsive, animații), WhyUsSection (carduri, animații) |
| **Faza 4: How It Works & Solutions** | 3-4 zile | HowItWorksSection (timeline, animații), SolutionsSection (comparator before/after) |
| **Faza 5: Testimonials & Contact** | 3-4 zile | TestimonialsSection (carousel, rating), ContactSection (carduri, CTA) |
| **Faza 6: Formulare** | 3-4 zile | Formular eligibilitate multi-step, formular contact, validare, reCAPTCHA |
| **Faza 7: Pagini secundare** | 4-5 zile | About, Services, FAQ, Blog, Privacy, 404 |
| **Faza 8: Traduceri EN** | 2-3 zile | Traducere completă en.json, verificare contextuală |
| **Faza 9: SEO & Performanță** | 2-3 zile | Meta tags, structured data, optimizare imagini, Lighthouse audit |
| **Faza 10: Testing & QA** | 3-4 zile | Unit tests, E2E tests, cross-browser testing, responsive testing |
| **Faza 11: Deploy & Launch** | 1-2 zile | CI/CD setup, deploy production, DNS, SSL |

**Durată totală estimată: 29–40 zile lucrătoare (6–8 săptămâni)**

### 17.2 Criterii de acceptare

- [ ] Toate secțiunile paginii principale sunt implementate conform specificațiilor
- [ ] Site-ul este complet responsive pe toate breakpoint-urile Bootstrap 5
- [ ] Comutarea RO ↔ EN funcționează corect, URL-urile se actualizează
- [ ] Toate formularele funcționează cu validare corectă
- [ ] Animațiile la scroll funcționează fluid
- [ ] Carousel testimoniale funcționează cu touch pe mobile
- [ ] Comparator before/after funcționează cu drag și touch
- [ ] Scor Lighthouse Performance ≥ 90
- [ ] Scor Lighthouse Accessibility ≥ 95
- [ ] Scor Lighthouse SEO = 100
- [ ] Funcționează corect pe Chrome, Firefox, Safari, Edge (desktop + mobile)
- [ ] GDPR cookie banner implementat corect
- [ ] Meta tags și hreflang corecte pentru ambele limbi
- [ ] Structured data JSON-LD validat
- [ ] Zero erori în consola browser
- [ ] Toate testele unitare și E2E trec

---

## Anexa A: Wireframe-uri text (referință rapidă)

### Pagina principală — Flow complet

```
┌─────────────────────────────────────────┐
│ [Logo]  Acasă  De ce noi?  ...  [RO▾] [CTA] │  ← Navbar sticky
├─────────────────────────────────────────┤
│                                         │
│   Izolează-ți mansarda FĂRĂ COST        │
│   grație programului...                 │
│                                         │
│   [★ 4.9 (+600)]  [+1500 instalări]    │
│   [Verifică eligibilitatea →]           │
│                                         │
│   ┌──────┬──────┬──────┬──────┬──────┐ │
│   │100%  │Fără  │Fără  │Prog. │Super-│ │
│   │Finan.│Cost  │Biro. │Ofic. │vizat │ │
│   └──────┴──────┴──────┴──────┴──────┘ │
├─────────────────────────────────────────┤
│                                         │
│   De ce să alegi TrueGreen?             │
│                                         │
│   ┌──────────┐  ┌──────────┐           │
│   │ Experiență│  │ Garanție │           │
│   └──────────┘  └──────────┘           │
│   ┌──────────┐  ┌──────────┐           │
│   │  Echipă  │  │Fără griji│           │
│   └──────────┘  └──────────┘           │
│                                         │
│   [Logo parteneri / organisme]          │
├─────────────────────────────────────────┤
│                                         │
│   Cum funcționează programul?           │
│                                         │
│   ① Instalare ──② Documentație         │
│         │              │                │
│   ③ Verificare──④ Validare             │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Rezultat: Clientul nu plătește  │  │
│   │ nimic.                          │  │
│   └─────────────────────────────────┘  │
├─────────────────────────────────────────┤
│                                         │
│   Soluțiile noastre                     │
│                                         │
│   ┌──────────┬──────────┐              │
│   │ ÎNAINTE  │  DUPĂ    │  ← slider   │
│   └──────────┴──────────┘              │
│                                         │
│   ┌────────┐ ┌────────┐ ┌────────┐    │
│   │Economie│ │Confort │ │Instalare│    │
│   └────────┘ └────────┘ └────────┘    │
│                                         │
│   [Solicită studiu energetic gratuit]   │
├─────────────────────────────────────────┤
│                                         │
│   Ce spun clienții noștri               │
│                                         │
│   ┌────────┐ ┌─────┬─────┬─────┐      │
│   │  4.9/5 │ │Rev 1│Rev 2│Rev 3│ ←→   │
│   │ Google │ │     │     │     │      │
│   └────────┘ └─────┴─────┴─────┘      │
├─────────────────────────────────────────┤
│                                         │
│   Suntem aici pentru tine               │
│                                         │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐         │
│   │Tel │ │Mail│ │WApp│ │Adr │         │
│   └────┘ └────┘ └────┘ └────┘         │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Vrei izolație gratuită?         │  │
│   │ [Studiu gratuit] [Sună acum]    │  │
│   └─────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ Logo │ Link-uri │ Contact │ Social     │
│ © 2026 TrueGreen │ Confidențialitate   │
└─────────────────────────────────────────┘
```

---

## Anexa B: Variabile de mediu

```env
# .env
VITE_APP_TITLE=TrueGreen
VITE_APP_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GA_ID=
VITE_GTM_ID=
VITE_RECAPTCHA_SITE_KEY=
VITE_WHATSAPP_NUMBER=
VITE_PHONE_NUMBER=
VITE_EMAIL=
VITE_ADDRESS=

# .env.production
VITE_APP_URL=https://truegreen.ro
VITE_API_BASE_URL=https://api.truegreen.ro/api
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
VITE_RECAPTCHA_SITE_KEY=XXXXXXXX
```

---

**Document realizat de:** AI Assistant  
**Data:** 26.03.2026  
**Versiune:** 1.0  
**Status:** Draft — Necesită aprobare client
