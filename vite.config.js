import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE } from './src/config/site.js'

function buildJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    legalName: SITE.legalName,
    taxID: SITE.rif,
    areaServed: 'Venezuela',
    openingHours: 'Mo-Fr 08:00-17:00',
  }
  if (SITE.whatsappNumber) data.telephone = `+${SITE.whatsappNumber}`
  if (SITE.url) data.url = SITE.url
  return JSON.stringify(data, null, 2)
}

function siteMetaPlugin() {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      let result = html

      if (SITE.url) {
        result = result
          .replace('<!--__CANONICAL__-->', `<link rel="canonical" href="${SITE.url}" />`)
          .replace('<!--__OG_URL__-->', `<meta property="og:url" content="${SITE.url}" />`)
      } else {
        result = result
          .replace('<!--__CANONICAL__-->', '')
          .replace('<!--__OG_URL__-->', '')
      }

      result = result.replace(
        '<!--__JSON_LD__-->',
        `<script type="application/ld+json">\n${buildJsonLd()}\n</script>`
      )

      return result
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), siteMetaPlugin()],
  test: {
    environment: 'node',
  },
})
