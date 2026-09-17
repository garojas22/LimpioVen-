import { defineConfig, loadEnv } from 'vite'
import { cwd } from 'process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE } from './src/config/site.js'
import { COPY } from './src/content/copy.js'
import {
  getEnvironment,
  resolveBaseUrl,
  isIndexable,
  buildRobotsTxt,
  buildSitemapXml,
  buildHeadersFile,
} from './build/site-meta.js'

// ── Calcular estado del build una sola vez ────────────────────────────────
const env = process.env
const environment = getEnvironment(SITE, env)
const baseUrl = resolveBaseUrl(SITE, env)
const indexable = isIndexable(SITE, env)

/** Validación de número de WhatsApp (equivalente a hasWhatsApp() en la app). */
function isValidWhatsAppNumber(n) {
  return typeof n === 'string' && /^\d{10,15}$/.test(n)
}

// ── JSON-LD ───────────────────────────────────────────────────────────────
function buildJsonLd(whatsappNumber) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    legalName: SITE.legalName,
    taxID: SITE.rif,
    areaServed: 'Venezuela',
    openingHours: 'Mo-Fr 08:00-17:00',
    description: COPY.meta.description,
  }
  if (SITE.url) data.url = SITE.url
  if (isValidWhatsAppNumber(whatsappNumber)) data.telephone = `+${whatsappNumber}`
  return JSON.stringify(data, null, 2)
}

// ── Bloque de etiquetas <head> ────────────────────────────────────────────
function buildMetaTags(whatsappNumber) {
  const tags = []

  // Título y descripción
  tags.push(`<title>${COPY.meta.title}</title>`)
  tags.push(`<meta name="description" content="${COPY.meta.description}" />`)

  // Robots: si no es indexable, el header HTTP X-Robots-Tag ya lo cubre,
  // pero añadimos también la meta para mayor compatibilidad.
  if (!indexable) {
    tags.push('<meta name="robots" content="noindex, nofollow" />')
  }

  // Canonical: solo con el dominio definitivo y si es indexable.
  // Nunca usa URLs temporales de Cloudflare como canónico.
  if (indexable && SITE.url) {
    tags.push(`<link rel="canonical" href="${SITE.url}" />`)
  }

  // Theme color
  tags.push(
    '<meta name="theme-color" content="#FAFBFB" media="(prefers-color-scheme: light)" />'
  )
  tags.push(
    '<meta name="theme-color" content="#0B1826" media="(prefers-color-scheme: dark)" />'
  )

  // Open Graph base
  tags.push('<meta property="og:type" content="website" />')
  tags.push('<meta property="og:locale" content="es_VE" />')
  tags.push(`<meta property="og:site_name" content="${SITE.name}" />`)
  tags.push(`<meta property="og:title" content="${COPY.meta.title}" />`)
  tags.push(`<meta property="og:description" content="${COPY.meta.description}" />`)

  // og:url e og:image (URL absoluta — WhatsApp y Facebook ignoran rutas relativas)
  if (baseUrl) {
    tags.push(`<meta property="og:url" content="${baseUrl}" />`)
    tags.push(`<meta property="og:image" content="${baseUrl}/og-image.png" />`)
    tags.push('<meta property="og:image:width" content="1200" />')
    tags.push('<meta property="og:image:height" content="630" />')
    tags.push('<meta property="og:image:type" content="image/png" />')
    tags.push(`<meta property="og:image:alt" content="${COPY.hero.headline}" />`)
  }

  // Twitter Card
  tags.push('<meta name="twitter:card" content="summary_large_image" />')
  tags.push(`<meta name="twitter:title" content="${COPY.meta.title}" />`)
  tags.push(`<meta name="twitter:description" content="${COPY.meta.description}" />`)
  if (baseUrl) {
    tags.push(`<meta name="twitter:image" content="${baseUrl}/og-image.png" />`)
  }

  // JSON-LD
  tags.push(`<script type="application/ld+json">\n${buildJsonLd(whatsappNumber)}\n</script>`)

  return tags.join('\n    ')
}

// ── Plugin ────────────────────────────────────────────────────────────────
function siteMetaPlugin(whatsappNumber, cfBeaconToken) {
  return {
    name: 'site-meta',

    transformIndexHtml(html) {
      let out = html.replace('<!--__META__-->', buildMetaTags(whatsappNumber))

      // Beacon de Cloudflare Web Analytics — solo en builds indexables con token configurado.
      const analyticsScript =
        indexable && cfBeaconToken
          ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js"` +
            ` data-cf-beacon='{"token":"${cfBeaconToken}"}'></script>`
          : ''
      out = out.replace('<!--__ANALYTICS__-->', analyticsScript)

      return out
    },

    generateBundle() {
      if (!baseUrl && environment === 'local') {
        console.warn(
          '[site-meta] og:image omitida: no hay URL base configurada. ' +
            'Configura SITE.url en src/config/site.js o SITE_BASE_URL en el entorno.'
        )
      }

      const sitemapUrl =
        indexable && SITE.url ? `${SITE.url}/sitemap.xml` : undefined

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: buildRobotsTxt({ sitemapUrl }),
      })

      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: buildHeadersFile({ indexable }),
      })

      if (indexable && SITE.url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: buildSitemapXml(SITE.url),
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, cwd(), '')
  const whatsappNumber = viteEnv.VITE_WHATSAPP_NUMBER ?? ''
  const cfBeaconToken = viteEnv.VITE_CF_BEACON_TOKEN ?? ''

  return {
    plugins: [tailwindcss(), react(), siteMetaPlugin(whatsappNumber, cfBeaconToken)],
    test: {
      environment: 'node',
      include: ['src/**/*.test.{js,jsx}', 'build/**/*.test.{js,jsx}'],
    },
  }
})
