/**
 * Script manual para generar las imágenes estáticas de Open Graph y apple-touch-icon.
 * Ejecución: npm run og
 * Las imágenes generadas se versionan en public/ y NO forman parte de npm run build.
 *
 * Salidas:
 *   public/og-image.png        — 1200 × 630 para Open Graph / WhatsApp
 *   public/apple-touch-icon.png — 180 × 180 para iOS
 */

import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ── Fuentes (woff, no woff2 — requerimiento de Satori) ────────────────────
const fontCondensed700 = readFileSync(
  join(root, 'node_modules/@fontsource/ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-700-normal.woff')
)
const fontSans500 = readFileSync(
  join(root, 'node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff')
)

const fonts = [
  { name: 'IBM Plex Sans Condensed', data: fontCondensed700, weight: 700, style: 'normal' },
  { name: 'IBM Plex Sans',           data: fontSans500,       weight: 500, style: 'normal' },
]

// ── Copy (leído directamente para no duplicar) ────────────────────────────
const { COPY } = await import(join(root, 'src/content/copy.js'))
const headline = COPY.hero.headline
const servicesLine = 'Limpieza industrial · Sanitización alimentaria · Trabajos en altura' // TEXTO NUEVO

// ── Helper: PNG a partir de SVG ───────────────────────────────────────────
async function renderPng(element, width, height) {
  const svg = await satori(element, { width, height, fonts })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } })
  return resvg.render().asPng()
}

// ── Logo — forma de L (sin absolute positioning para compatibilidad Satori) ─
// Columna flex: barra superior (solo la parte vertical) + fila inferior (ancho total)
function logoMark({ barW, barH, extW, extH, color }) {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', width: `${extW}px`, height: `${barH}px` },
      children: [
        // Parte superior del palo vertical
        {
          type: 'div',
          props: { style: { width: `${barW}px`, height: `${barH - extH}px`, backgroundColor: color, display: 'flex' } },
        },
        // Fila inferior: barra horizontal completa
        {
          type: 'div',
          props: { style: { width: `${extW}px`, height: `${extH}px`, backgroundColor: color, display: 'flex' } },
        },
      ],
    },
  }
}

// ── og-image — 1200 × 630 ─────────────────────────────────────────────────
const ogElement = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#0F2B47',
      padding: '72px',
    },
    children: [
      // Logo
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' },
          children: [
            logoMark({ barW: 21, barH: 60, extW: 60, extH: 18, color: '#5C9BE0' }),
            {
              type: 'div',
              props: {
                style: { display: 'flex', alignItems: 'baseline', gap: '0px' },
                children: [
                  {
                    type: 'span',
                    props: {
                      style: {
                        fontFamily: 'IBM Plex Sans Condensed',
                        fontWeight: 700,
                        fontSize: '30px',
                        color: '#EEF1F4',
                        letterSpacing: '0.06em',
                      },
                      children: 'LIMPIOVEN',
                    },
                  },
                  {
                    type: 'span',
                    props: {
                      style: {
                        fontFamily: 'IBM Plex Sans Condensed',
                        fontWeight: 700,
                        fontSize: '30px',
                        color: '#5C9BE0',
                        letterSpacing: '0.06em',
                      },
                      children: ' C.A',
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      // Barra de acento amarilla
      {
        type: 'div',
        props: {
          style: { width: '120px', height: '8px', backgroundColor: '#E2A318', marginBottom: '40px', display: 'flex' },
        },
      },

      // Titular de portada
      {
        type: 'div',
        props: {
          style: {
            fontFamily: 'IBM Plex Sans Condensed',
            fontWeight: 700,
            fontSize: '76px',
            lineHeight: 1.02,
            color: '#EEF1F4',
            maxWidth: '900px',
            marginBottom: '32px',
          },
          children: headline,
        },
      },

      // Línea de servicios
      {
        type: 'div',
        props: {
          style: {
            fontFamily: 'IBM Plex Sans',
            fontWeight: 500,
            fontSize: '30px',
            color: '#C5CBD1',
          },
          children: servicesLine,
        },
      },
    ],
  },
}

// ── apple-touch-icon — 180 × 180 ──────────────────────────────────────────
const iconElement = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#0F2B47',
    },
    children: [
      logoMark({ barW: 28, barH: 96, extW: 80, extH: 26, color: '#5C9BE0' }),
    ],
  },
}

// ── Generar y guardar ─────────────────────────────────────────────────────
console.log('Generando og-image.png (1200×630)…')
const ogPng = await renderPng(ogElement, 1200, 630)
writeFileSync(join(root, 'public/og-image.png'), ogPng)

const ogKb = Math.round(ogPng.length / 1024)
console.log(`  ✓ public/og-image.png — ${ogKb} KB`)

if (ogKb > 300) {
  console.warn(`  ⚠ og-image supera 300 KB (${ogKb} KB). Considera reducir el tamaño.`)
}

console.log('Generando apple-touch-icon.png (180×180)…')
const iconPng = await renderPng(iconElement, 180, 180)
writeFileSync(join(root, 'public/apple-touch-icon.png'), iconPng)
console.log(`  ✓ public/apple-touch-icon.png — ${Math.round(iconPng.length / 1024)} KB`)

console.log('\nDone. Versiona public/og-image.png y public/apple-touch-icon.png en git.')
