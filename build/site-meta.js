/**
 * Funciones puras para metadatos, indexación, robots, sitemap y cabeceras.
 * No importan nada de src/ — reciben todos los datos como parámetros.
 * Usadas por vite.config.js y cubiertas con pruebas en site-meta.test.js.
 */

/**
 * Detecta el entorno de build a partir de las variables de entorno de Cloudflare Pages.
 *   - CF_PAGES = "1" cuando el build corre en Cloudflare.
 *   - CF_PAGES_BRANCH = rama que se está construyendo.
 *
 * @param {{ productionBranch: string }} site
 * @param {NodeJS.ProcessEnv} env
 * @returns {'local' | 'preview' | 'production'}
 */
export function getEnvironment(site, env) {
  if (env.CF_PAGES === '1') {
    if (env.CF_PAGES_BRANCH === site.productionBranch) return 'production'
    return 'preview'
  }
  return 'local'
}

/**
 * Resuelve la URL base del despliegue.
 * - production: SITE.url → SITE_BASE_URL → vacío
 * - preview:    CF_PAGES_URL
 * - local:      vacío
 *
 * Elimina la barra final si la hay.
 *
 * @param {{ url?: string }} site
 * @param {NodeJS.ProcessEnv} env
 * @returns {string}
 */
export function resolveBaseUrl(site, env) {
  const environment = getEnvironment(site, env)
  let url = ''
  if (environment === 'production') {
    url = site.url || env.SITE_BASE_URL || ''
  } else if (environment === 'preview') {
    url = env.CF_PAGES_URL || ''
  }
  return url.replace(/\/$/, '')
}

/**
 * Indica si el build actual debe ser indexable por buscadores.
 * Solo es true cuando published === true Y el entorno es production.
 * Un preview nunca es indexable, aunque published sea true.
 *
 * @param {{ published: boolean }} site
 * @param {NodeJS.ProcessEnv} env
 * @returns {boolean}
 */
export function isIndexable(site, env) {
  return site.published === true && getEnvironment(site, env) === 'production'
}

/**
 * Genera el contenido de robots.txt.
 * Siempre permite el rastreo (sin Disallow):
 * bloquear el rastreo impide que Google lea el noindex y la URL
 * podría aparecer en resultados de todos modos.
 * Añade línea Sitemap solo si recibe sitemapUrl.
 *
 * @param {{ sitemapUrl?: string }} [options]
 * @returns {string}
 */
export function buildRobotsTxt({ sitemapUrl } = {}) {
  let txt = 'User-agent: *\nAllow: /\n'
  if (sitemapUrl) txt += `\nSitemap: ${sitemapUrl}\n`
  return txt
}

/**
 * Genera un sitemap.xml con una sola URL (la raíz).
 *
 * @param {string} baseUrl - URL base sin barra final, ej. https://limpioven.com
 * @returns {string}
 */
export function buildSitemapXml(baseUrl) {
  const today = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
}

/**
 * Genera el contenido del archivo _headers de Cloudflare Pages.
 * - /assets/* con Cache-Control inmutable.
 * - /* con X-Robots-Tag: noindex si el build no es indexable.
 *
 * @param {{ indexable: boolean }} options
 * @returns {string}
 */
export function buildHeadersFile({ indexable }) {
  let content = '/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n'
  if (!indexable) {
    content += '\n/*\n  X-Robots-Tag: noindex, nofollow\n'
  }
  return content
}
