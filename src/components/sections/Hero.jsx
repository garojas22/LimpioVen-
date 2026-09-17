import { Section } from '../ui/Section.jsx'
import { Container } from '../ui/Container.jsx'
import { Button } from '../ui/Button.jsx'
import { ImageSlot } from '../ui/ImageSlot.jsx'
import { hasWhatsApp, buildWaUrl, openWhatsApp } from '../../lib/whatsapp.js'
import { trackEvent } from '../../lib/analytics.js'
import { COPY } from '../../content/copy.js'

export function Hero() {
  const handleWhatsApp = () => {
    const url = buildWaUrl(COPY.meta.whatsappMessage)
    trackEvent('whatsapp_click', { origen: 'portada' })
    openWhatsApp(url)
  }

  return (
    <Section id="portada" bg="bg" aria-labelledby="hero-heading">
      <Container className="py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <h1
              id="hero-heading"
              className="font-condensed font-bold text-ink"
              style={{
                fontSize: 'clamp(2.25rem, 6vw, 3.25rem)',
                lineHeight: 1.02,
                maxWidth: '14ch',
              }}
            >
              {COPY.hero.headline}
            </h1>

            <p
              className="text-text mt-4 mb-6"
              style={{ fontSize: '15px', maxWidth: '44ch' }}
            >
              {COPY.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Button href="#contacto" variant="primary">
                {COPY.hero.ctaPrimary}
              </Button>

              {/* Botón de WhatsApp: solo si el número está configurado */}
              {hasWhatsApp() && (
                <Button
                  variant="secondary"
                  onClick={handleWhatsApp}
                  style={{ border: '1.5px solid var(--brand)' }}
                >
                  {COPY.hero.ctaSecondary}
                </Button>
              )}
            </div>

            {/* Línea de apoyo */}
            <p
              className="text-text-2 border-t border-line pt-3"
              style={{ fontSize: '12px' }}
            >
              {COPY.hero.supportLine}
            </p>
          </div>

          {/* Foto */}
          <div>
            <ImageSlot name="hero" ratio="4/3" priority />
          </div>
        </div>
      </Container>
    </Section>
  )
}
