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

- **Vite + React (JavaScript)**
- **Tailwind CSS v4** con `@tailwindcss/vite`. Config en CSS, sin `tailwind.config.js`.
- **Modo oscuro:** variables CSS en `:root` redefinidas en `@media (prefers-color-scheme: dark)`. Sin variantes `dark:` en componentes.
- **Fuentes:** `@fontsource/ibm-plex-sans` (400, 500, 600) y `@fontsource/ibm-plex-sans-condensed` (700), subconjunto latino.
- **Íconos:** `lucide-react`, importando por nombre.
- **Formulario:** Web3Forms, `fetch` + `FormData`, sin preflight CORS. Clave en `site.js`.
- **Analítica:** `@vercel/analytics`, todos los eventos vía `trackEvent()` en `src/lib/analytics.js`.
- **Testing:** Vitest, solo para `src/lib/whatsapp.js`.

## Tokens de color (sistema de diseño)

Las utilidades Tailwind que expone el tema son:
`bg-bg` · `bg-bg-2` · `text-ink` · `text-text` · `text-text-2` · `border-line` · `text-brand` · `bg-brand` · `border-brand` · `bg-cta` · `text-cta-ink`

Los valores se definen en `src/styles/index.css`. El cambio de tema es automático vía CSS variables. No usar `dark:` en los componentes.

## Tipografía

- Titulares: IBM Plex Sans Condensed 700, `font-condensed`. Titular de portada 40 px, `leading-[1.02]`, `max-w-[14ch]`.
- Cuerpo: IBM Plex Sans 400/500/600, `font-sans`. 16 px, `leading-[1.5]`.
- Encabezados de sección: 22 px mínimo (escala con `clamp()`), `max-w-[24ch]`.
- Sin mayúsculas sostenidas, sin "eyebrows", sin palabra resaltada con otro color en titulares.

## Estructura de carpetas

```
src/
├── main.jsx
├── App.jsx
├── config/site.js          ← única fuente de datos de contacto y claves
├── content/
│   ├── copy.js             ← TODO el texto aprobado; no modificar sin aprobación
│   └── images.js           ← registro de slots de foto
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

Ver documento de diseño. Resumen: `preventDefault` → validar → verificar botcheck → `submitLead()` (fire-and-forget) → `trackEvent()` → `openWhatsApp()` → mostrar confirmación. El `openWhatsApp` debe llamarse síncronamente dentro del handler.

## Fases de construcción

- **Fase 1 (completa):** scaffold, sistema de diseño, Hero, Problem, secciones vacías 3–9.
- **Fases siguientes:** construir secciones restantes una por una según el documento de diseño.
