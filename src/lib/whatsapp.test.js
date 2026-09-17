import { describe, it, expect, vi } from 'vitest'

// Mock con número válido para la mayoría de los tests
vi.mock('../config/site.js', () => ({
  SITE: { whatsappNumber: '584241234567' },
}))

const { buildWaUrl, buildLeadMessage, hasWhatsApp, isValidWhatsAppNumber } =
  await import('./whatsapp.js')

// ── buildWaUrl ─────────────────────────────────────────────────────────────

describe('buildWaUrl', () => {
  it('returns the correct URL format', () => {
    expect(buildWaUrl('Hola')).toBe('https://wa.me/584241234567?text=Hola')
  })

  it('encodes tildes (á é í ó ú)', () => {
    expect(buildWaUrl('información')).toContain('informaci%C3%B3n')
  })

  it('encodes ñ', () => {
    expect(buildWaUrl('mañana')).toContain('ma%C3%B1ana')
  })

  it('encodes line breaks as %0A', () => {
    expect(buildWaUrl('línea1\nlínea2')).toContain('%0A')
  })

  it('encodes ampersand as %26', () => {
    expect(buildWaUrl('A & B')).toContain('%26')
  })

  it('uses whatsappNumber from site config', () => {
    expect(buildWaUrl('test')).toContain('wa.me/584241234567')
  })
})

// ── buildLeadMessage ───────────────────────────────────────────────────────

describe('buildLeadMessage', () => {
  it('always includes the header line', () => {
    expect(buildLeadMessage({})).toBe(
      'Hola, les escribo desde la página de LimpioVen para solicitar una visita.'
    )
  })

  it('omits lines for empty string fields', () => {
    const msg = buildLeadMessage({ nombre: 'Juan García', empresa: '' })
    expect(msg).toContain('Nombre: Juan García')
    expect(msg).not.toContain('Empresa:')
  })

  it('omits lines for null and undefined fields', () => {
    const msg = buildLeadMessage({ nombre: 'Ana', cargo: null, telefono: undefined })
    expect(msg).not.toContain('Cargo:')
    expect(msg).not.toContain('Teléfono:')
  })

  it('includes all provided non-empty fields', () => {
    const msg = buildLeadMessage({
      nombre:    'Juan Pérez',
      empresa:   'ACME, C.A.',
      cargo:     'Gerente de Planta',
      telefono:  '04241234567',
      correo:    'juan@acme.com',
      ubicacion: 'Aragua',
      servicio:  'Sanitización para industria alimentaria',
      necesidad: 'Necesito apoyo urgente.',
    })
    expect(msg).toContain('Nombre: Juan Pérez')
    expect(msg).toContain('Empresa: ACME, C.A.')
    expect(msg).toContain('Cargo: Gerente de Planta')
    expect(msg).toContain('Teléfono: 04241234567')
    expect(msg).toContain('Correo: juan@acme.com')
    expect(msg).toContain('Ubicación: Aragua')
    expect(msg).toContain('Servicio: Sanitización para industria alimentaria')
    expect(msg).toContain('Necesidad: Necesito apoyo urgente.')
  })

  it('truncates necesidad to 500 characters', () => {
    const msg = buildLeadMessage({ necesidad: 'x'.repeat(600) })
    const line = msg.split('\n').find((l) => l.startsWith('Necesidad: '))
    expect(line).toBe(`Necesidad: ${'x'.repeat(500)}`)
  })

  it('does not truncate necesidad shorter than 500 characters', () => {
    const msg = buildLeadMessage({ necesidad: 'Necesito ayuda.' })
    expect(msg).toContain('Necesidad: Necesito ayuda.')
  })

  it('preserves field order as specified', () => {
    const msg = buildLeadMessage({ nombre: 'A', empresa: 'B', servicio: 'C' })
    const lines = msg.split('\n')
    const iNombre   = lines.findIndex((l) => l.startsWith('Nombre:'))
    const iEmpresa  = lines.findIndex((l) => l.startsWith('Empresa:'))
    const iServicio = lines.findIndex((l) => l.startsWith('Servicio:'))
    expect(iNombre).toBeLessThan(iEmpresa)
    expect(iEmpresa).toBeLessThan(iServicio)
  })
})

// ── isValidWhatsAppNumber ──────────────────────────────────────────────────

describe('isValidWhatsAppNumber', () => {
  it('returns false for empty string', () => {
    expect(isValidWhatsAppNumber('')).toBe(false)
  })

  it('returns false for string with spaces', () => {
    expect(isValidWhatsAppNumber('5842 41234567')).toBe(false)
  })

  it('returns false for string with + prefix', () => {
    expect(isValidWhatsAppNumber('+584241234567')).toBe(false)
  })

  it('returns false for hyphenated number', () => {
    expect(isValidWhatsAppNumber('584-241-234567')).toBe(false)
  })

  it('returns false for fewer than 10 digits', () => {
    expect(isValidWhatsAppNumber('123456789')).toBe(false)
  })

  it('returns false for more than 15 digits', () => {
    expect(isValidWhatsAppNumber('1234567890123456')).toBe(false)
  })

  it('returns true for a valid 10-digit number', () => {
    expect(isValidWhatsAppNumber('1234567890')).toBe(true)
  })

  it('returns true for a valid 12-digit Venezuelan number', () => {
    expect(isValidWhatsAppNumber('584241234567')).toBe(true)
  })

  it('returns true for a valid 15-digit number', () => {
    expect(isValidWhatsAppNumber('123456789012345')).toBe(true)
  })
})

// ── hasWhatsApp ────────────────────────────────────────────────────────────

describe('hasWhatsApp', () => {
  it('returns true with the valid mocked number (584241234567)', () => {
    expect(hasWhatsApp()).toBe(true)
  })
})

// ── buildWaUrl — throws without valid number ───────────────────────────────

describe('buildWaUrl — throws without valid number', () => {
  it('throws when whatsappNumber is empty', async () => {
    vi.resetModules()
    vi.doMock('../config/site.js', () => ({ SITE: { whatsappNumber: '' } }))
    const { buildWaUrl: bwu } = await import('./whatsapp.js')
    expect(() => bwu('Hola')).toThrow('[whatsapp]')
  })

  it('throws when whatsappNumber has spaces', async () => {
    vi.resetModules()
    vi.doMock('../config/site.js', () => ({ SITE: { whatsappNumber: '5842 1234567' } }))
    const { buildWaUrl: bwu } = await import('./whatsapp.js')
    expect(() => bwu('Hola')).toThrow('[whatsapp]')
  })
})
