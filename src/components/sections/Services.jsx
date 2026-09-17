import { COPY } from '../../content/copy.js'
import { Section } from '../ui/Section.jsx'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Button } from '../ui/Button.jsx'
import { ServiceCard } from './ServiceCard.jsx'

export function Services() {
  const { heading, items, closing } = COPY.services

  // 4.1–4.3: tienen lista de alcances (bullets) y foto → layout featured
  const featured = items.filter(item => item.bullets.length > 0)

  // 4.4–4.7: intro únicamente, sin foto → grid compacto 2×2
  const compact = items.filter(item => item.bullets.length === 0)

  return (
    <Section id="servicios" bg="bg-2" aria-labelledby="servicios-heading">
      <Container className="py-16 md:py-20">
        <SectionHeading id="servicios-heading" className="mb-10 md:mb-14">
          {heading}
        </SectionHeading>

        {/* Servicios featured 4.1–4.3, separados por línea horizontal */}
        <div>
          {featured.map((item, i) => (
            <div key={item.id}>
              <ServiceCard item={item} variant="featured" />
              {i < featured.length - 1 && <hr className="border-line" />}
            </div>
          ))}
        </div>

        {/* Servicios compactos 4.4–4.7 en grid 2×2 con bordes colapsados */}
        <div className="mt-14 md:mt-16 border-t border-l border-line grid grid-cols-1 md:grid-cols-2">
          {compact.map(item => (
            <div key={item.id} className="border-b border-r border-line">
              <ServiceCard item={item} variant="compact" />
            </div>
          ))}
        </div>

        {/* Cierre */}
        <div className="mt-12 md:mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text text-[0.9375rem] leading-[1.5] max-w-[52ch]">
            {closing}
          </p>
          <Button href="#contacto" variant="primary" className="shrink-0">
            {COPY.hero.ctaPrimary}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
