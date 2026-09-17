import { describe, it, expect } from 'vitest'
import {
  getEnvironment,
  resolveBaseUrl,
  isIndexable,
  buildRobotsTxt,
  buildSitemapXml,
  buildHeadersFile,
} from './site-meta.js'

// Configuración base para los tests
const SITE = {
  name: 'LimpioVen, C.A.',
  url: 'https://limpioven.com',
  productionBranch: 'main',
  published: true,
}

const SITE_UNPUBLISHED = { ...SITE, published: false }
const SITE_NO_URL = { ...SITE, url: '' }

// ── getEnvironment ─────────────────────────────────────────────────────────

describe('getEnvironment', () => {
  it('returns "local" when CF_PAGES is not set', () => {
    expect(getEnvironment(SITE, {})).toBe('local')
  })

  it('returns "local" when CF_PAGES is not "1"', () => {
    expect(getEnvironment(SITE, { CF_PAGES: '0' })).toBe('local')
  })

  it('returns "production" when CF_PAGES=1 and branch matches productionBranch', () => {
    expect(getEnvironment(SITE, { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe('production')
  })

  it('returns "preview" when CF_PAGES=1 and branch is not productionBranch', () => {
    expect(getEnvironment(SITE, { CF_PAGES: '1', CF_PAGES_BRANCH: 'feature-x' })).toBe('preview')
  })

  it('returns "preview" when CF_PAGES=1 and branch is undefined', () => {
    expect(getEnvironment(SITE, { CF_PAGES: '1' })).toBe('preview')
  })

  it('respects custom productionBranch', () => {
    const site = { ...SITE, productionBranch: 'release' }
    expect(getEnvironment(site, { CF_PAGES: '1', CF_PAGES_BRANCH: 'release' })).toBe('production')
    expect(getEnvironment(site, { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe('preview')
  })
})

// ── resolveBaseUrl ─────────────────────────────────────────────────────────

describe('resolveBaseUrl', () => {
  it('returns empty string in local', () => {
    expect(resolveBaseUrl(SITE, {})).toBe('')
  })

  it('returns CF_PAGES_URL in preview', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'fix-typo', CF_PAGES_URL: 'https://abc123.limpioven.pages.dev' }
    expect(resolveBaseUrl(SITE, env)).toBe('https://abc123.limpioven.pages.dev')
  })

  it('strips trailing slash from CF_PAGES_URL', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'fix-typo', CF_PAGES_URL: 'https://abc.pages.dev/' }
    expect(resolveBaseUrl(SITE, env)).toBe('https://abc.pages.dev')
  })

  it('returns SITE.url in production when url is set', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'main', SITE_BASE_URL: 'https://pages.dev' }
    expect(resolveBaseUrl(SITE, env)).toBe('https://limpioven.com')
  })

  it('falls back to SITE_BASE_URL in production when SITE.url is empty', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'main', SITE_BASE_URL: 'https://limpioven.pages.dev' }
    expect(resolveBaseUrl(SITE_NO_URL, env)).toBe('https://limpioven.pages.dev')
  })

  it('returns empty string in production when both SITE.url and SITE_BASE_URL are missing', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' }
    expect(resolveBaseUrl(SITE_NO_URL, env)).toBe('')
  })

  it('returns empty string in preview when CF_PAGES_URL is missing', () => {
    const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'feature-x' }
    expect(resolveBaseUrl(SITE, env)).toBe('')
  })
})

// ── isIndexable ────────────────────────────────────────────────────────────

describe('isIndexable', () => {
  const prodEnv = { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' }
  const previewEnv = { CF_PAGES: '1', CF_PAGES_BRANCH: 'feature-x' }

  it('returns true when published=true and environment=production', () => {
    expect(isIndexable(SITE, prodEnv)).toBe(true)
  })

  it('returns false when published=false even in production', () => {
    expect(isIndexable(SITE_UNPUBLISHED, prodEnv)).toBe(false)
  })

  it('returns false in preview even when published=true', () => {
    expect(isIndexable(SITE, previewEnv)).toBe(false)
  })

  it('returns false in local even when published=true', () => {
    expect(isIndexable(SITE, {})).toBe(false)
  })
})

// ── buildRobotsTxt ─────────────────────────────────────────────────────────

describe('buildRobotsTxt', () => {
  it('always allows all crawlers', () => {
    const txt = buildRobotsTxt()
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain('Allow: /')
  })

  it('never contains Disallow', () => {
    expect(buildRobotsTxt()).not.toContain('Disallow')
    expect(buildRobotsTxt({ sitemapUrl: 'https://x.com/sitemap.xml' })).not.toContain('Disallow')
  })

  it('includes Sitemap line when sitemapUrl is provided', () => {
    const txt = buildRobotsTxt({ sitemapUrl: 'https://limpioven.com/sitemap.xml' })
    expect(txt).toContain('Sitemap: https://limpioven.com/sitemap.xml')
  })

  it('omits Sitemap line when sitemapUrl is not provided', () => {
    expect(buildRobotsTxt()).not.toContain('Sitemap:')
    expect(buildRobotsTxt({})).not.toContain('Sitemap:')
  })
})

// ── buildSitemapXml ────────────────────────────────────────────────────────

describe('buildSitemapXml', () => {
  it('generates valid XML with the root URL', () => {
    const xml = buildSitemapXml('https://limpioven.com')
    expect(xml).toContain('<?xml version="1.0"')
    expect(xml).toContain('<loc>https://limpioven.com/</loc>')
  })

  it('includes lastmod in YYYY-MM-DD format', () => {
    const xml = buildSitemapXml('https://limpioven.com')
    expect(xml).toMatch(/lastmod>\d{4}-\d{2}-\d{2}<\/lastmod/)
  })
})

// ── buildHeadersFile ───────────────────────────────────────────────────────

describe('buildHeadersFile', () => {
  it('always includes immutable cache header for /assets/*', () => {
    expect(buildHeadersFile({ indexable: true })).toContain(
      '/assets/*\n  Cache-Control: public, max-age=31536000, immutable'
    )
    expect(buildHeadersFile({ indexable: false })).toContain(
      '/assets/*\n  Cache-Control: public, max-age=31536000, immutable'
    )
  })

  it('adds X-Robots-Tag when not indexable', () => {
    const headers = buildHeadersFile({ indexable: false })
    expect(headers).toContain('X-Robots-Tag: noindex, nofollow')
  })

  it('omits X-Robots-Tag when indexable', () => {
    const headers = buildHeadersFile({ indexable: true })
    expect(headers).not.toContain('X-Robots-Tag')
  })
})
