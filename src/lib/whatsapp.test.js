import { describe, it, expect, vi } from 'vitest'

vi.mock('../config/site.js', () => ({
  SITE: { whatsappNumber: '584241234567' },
}))

// Dynamic import so the mock applies before the module loads
const { buildWaUrl, buildLeadMessage } = await import('./whatsapp.js')

// ── buildWaUrl ─────────────────────────────────────────────────────────────

describe('buildWaUrl', () => {
  it('returns the correct URL format', () => {
    const url = buildWaUrl('Hola')
    expect(url).toBe('https://wa.me/584241234567?text=Hola')
  })

  it('encodes tildes (á é í ó ú)', () => {
    const url = buildWaUrl('información')
    expect(url).toContain('informaci%C3%B3n')
  })

  it('encodes ñ', () => {
    const url = buildWaUrl('mañana')
    expect(url).toContain('ma%C3%B1ana')
  })

  it('encodes line breaks as %0A', () => {
    const url = buildWaUrl('línea1\nlínea2')
    expect(url).toContain('%0A')
  })

  it('encodes ampersand as %26', () => {
    const url = buildWaUrl('A & B')
    expect(url).toContain('%26')
  })

  it('uses the whatsappNumber from site config', () => {
    const url = buildWaUrl('test')
    expect(url).toContain('wa.me/584241234567')
  })
})

// ── buildLeadMessage ───────────────────────────────────────────────────────

describe('buildLeadMessage', () => {
  it('always includes the header line', () => {
    const msg = buildLeadMessage({})
    expect(msg).toBe(
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
      necesidad: 'Necesito apoyo urgente en el turno nocturno.',
    })
    expect(msg).toContain('Nombre: Juan Pérez')
    expect(msg).toContain('Empresa: ACME, C.A.')
    expect(msg).toContain('Cargo: Gerente de Planta')
    expect(msg).toContain('Teléfono: 04241234567')
    expect(msg).toContain('Correo: juan@acme.com')
    expect(msg).toContain('Ubicación: Aragua')
    expect(msg).toContain('Servicio: Sanitización para industria alimentaria')
    expect(msg).toContain('Necesidad: Necesito apoyo urgente en el turno nocturno.')
  })

  it('truncates necesidad to 500 characters', () => {
    const longText = 'x'.repeat(600)
    const msg = buildLeadMessage({ necesidad: longText })
    const necesidadLine = msg.split('\n').find((l) => l.startsWith('Necesidad: '))
    expect(necesidadLine).toBe(`Necesidad: ${'x'.repeat(500)}`)
  })

  it('does not truncate necesidad shorter than 500 characters', () => {
    const shortText = 'Necesito ayuda.'
    const msg = buildLeadMessage({ necesidad: shortText })
    expect(msg).toContain(`Necesidad: ${shortText}`)
  })

  it('preserves field order as specified', () => {
    const msg = buildLeadMessage({
      nombre: 'A',
      empresa: 'B',
      servicio: 'C',
    })
    const lines = msg.split('\n')
    const iNombre   = lines.findIndex((l) => l.startsWith('Nombre:'))
    const iEmpresa  = lines.findIndex((l) => l.startsWith('Empresa:'))
    const iServicio = lines.findIndex((l) => l.startsWith('Servicio:'))
    expect(iNombre).toBeLessThan(iEmpresa)
    expect(iEmpresa).toBeLessThan(iServicio)
  })
})
