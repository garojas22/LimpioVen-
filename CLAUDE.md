# LimpioVen — Reglas del proyecto

## Reglas que no se negocian

1. **El copy es definitivo.** Todo el texto visible proviene de `src/content/copy.js`. No reescribir, resumir, corregir estilo ni añadir frases. Si un componente necesita texto que no está ahí, proponer antes y marcarlo con `// TEXTO NUEVO`.
2. Sin dirección física ni mapa. Solo "Cagua, estado Aragua" como sede administrativa.
3. Un solo número de WhatsApp en toda la página, leído de `src/config/site.js`.
4. Nombres de clientes solo como texto. Nunca logos.
5. Ningún precio.
6. Sin fotos de banco de imágenes. Usar `<ImageSlot>` con placeholder hasta tener fotos reales.
7. JavaScript, no TypeScript.
8. Sin backend propio.

## Stack cerrado

- **Vite + React (JavaScript)**, desplegado en **Cloudflare Pages** mediante integración con GitHub.
- **Tailwind CSS v4** con `@tailwindcss/vite`. Config en CSS, sin `tailwind.config.js`.
- **Modo oscuro:** variables CSS en `:root` redefinidas en `@media (prefers-color-scheme: dark)`. Sin variantes `dark:` en componentes.
- **Fuentes:** `@fontsource/ibm-plex-sans` (400, 500, 600) y `@fontsource/ibm-plex-sans-condensed` (700), subconjunto latino.
- **Íconos:** `lucide-react`, importando por nombre.
- **Formulario:** Web3Forms, `fetch` + `FormData`, sin preflight CORS. Clave en `site.js`.
- **Analítica:** pendiente de definir proveedor. Todas las llamadas pasan por `trackEvent()` en `src/lib/analytics.js` (no-op en prod, `console.debug` en dev). No tocar las llamadas existentes en componentes.
- **Testing:** Vitest, para `src/lib/whatsapp.js` y `build/site-meta.js`.

## Tokens de color (sistema de diseño)

Las utilidades Tailwind que expone el tema son:
`bg-bg` · `bg-bg-2` · `text-ink` · `text-text` · `text-text-2` · `border-line` · `text-brand` · `bg-brand` · `border-brand` · `bg-cta` · `text-cta-ink`

Los valores se definen en `src/styles/index.css`. El cambio de tema es automático vía CSS variables. No usar `dark:` en los componentes.

## Tipografía

- Titulares: IBM Plex Sans Condensed 700, `font-condensed`. Titular de portada 40 px, `leading-[1.02]`, `max-w-[14ch]`.
- Cuerpo: IBM Plex Sans 400/500/600, `font-sans`. 16 px, `leading-[1.5]`.
- Encabezados de sección: 22 px mínimo (escala con `clamp()`), `max-w-[24ch]`.
- Sin mayúsculas sostenidas, sin "eyebrows", sin palabra resaltada con otro color en titulares.

## Guarda de WhatsApp

- `hasWhatsApp()` en `src/lib/whatsapp.js` es la única fuente de verdad. Devuelve `true` solo si `SITE.whatsappNumber` contiene exclusivamente dígitos (10–15 cifras).
- Si `hasWhatsApp()` es `false`, no se renderizan: el botón flotante, el botón secundario de portada, ni la línea de WhatsApp en contacto (cuando se construya esa sección).
- `buildWaUrl()` lanza error si se llama sin número válido.

## Indexación y despliegue (Cloudflare Pages)

- `SITE.published = false` hasta el lanzamiento público.
- El plugin `siteMetaPlugin` de `vite.config.js` detecta el entorno con variables de Cloudflare (`CF_PAGES`, `CF_PAGES_BRANCH`, `CF_PAGES_URL`) y la variable manual `SITE_BASE_URL` (solo producción).
- Un build de preview **nunca** es indexable, aunque `published` sea `true`.
- El plugin emite `robots.txt`, `_headers` y, cuando es indexable, `sitemap.xml`. No hay `robots.txt` estático en `public/`.
- La canonical y el `sitemap.xml` solo usan `SITE.url` (el dominio definitivo), nunca URLs temporales de Cloudflare.
- La og:image siempre se referencia con URL absoluta. En local (sin URL base), se omite con un aviso en consola.
- Las imágenes de redes sociales (`public/og-image.png`, `public/apple-touch-icon.png`) se generan con `npm run og` y se versionan en `public/`. No se regeneran en `npm run build`.

## Estructura de carpetas

```
build/
  site-meta.js           ← funciones puras de metadatos/indexación
  site-meta.test.js
scripts/
  generate-og.mjs        ← npm run og
src/
├── main.jsx
├── App.jsx
├── config/site.js       ← única fuente de datos de contacto y claves
├── content/
│   ├── copy.js          ← TODO el texto aprobado; no modificar sin aprobación
│   └── images.js        ← registro de slots de foto
├── lib/
│   ├── whatsapp.js + whatsapp.test.js
│   ├── submitLead.js
│   └── analytics.js
├── styles/index.css
└── components/
    ├── layout/   Header · MobileMenu · Footer · WhatsAppFloat
    ├── ui/       Container · Section · SectionHeading · Button · Logo · ImageSlot
    └── sections/ Hero · Problem · Solution · Services · ServiceCard ·
                  Clients · ClientList · StatsBand · Process · Compliance ·
                  Coverage · Contact · ContactForm
```

## Movimiento

Mínimo. Solo transiciones que respondan a una acción (abrir menú, desplegar servicio). Sin animaciones de entrada por sección ni efectos hover en todas las tarjetas. Respetar `prefers-reduced-motion`.

## Flujo del formulario (aprobado)

Ver documento de diseño. Resumen: `preventDefault` → validar → verificar botcheck → `submitLead()` (fire-and-forget) → `trackEvent()` → `openWhatsApp()` (solo si `hasWhatsApp()`) → mostrar confirmación. El `openWhatsApp` debe llamarse síncronamente dentro del handler.

## Fases de construcción

- **Fase 1 (completa):** scaffold, sistema de diseño, Hero, Problem, secciones vacías 3–9.
- **Correcciones post-Fase 1 (completas):** cambio a Cloudflare Pages, guarda WhatsApp, metadatos desde plugin, og-image.
- **Fases siguientes:** construir secciones restantes una por una según el documento de diseño.
