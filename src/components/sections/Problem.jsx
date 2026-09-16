import { Section } from '../ui/Section.jsx'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { COPY } from '../../content/copy.js'

export function Problem() {
  const { heading, columns } = COPY.problem

  return (
    <Section id="problema" bg="bg-2" aria-labelledby="problema-heading">
      <Container className="py-12 md:py-20">
        <SectionHeading id="problema-heading" className="mb-10">
          {heading}
        </SectionHeading>

        <div className="grid sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div
              key={col.title}
              style={{ borderTop: '3px solid var(--brand)', paddingTop: '8px' }}
            >
              <h3
                className="text-ink font-semibold mb-2"
                style={{ fontSize: '15px' }}
              >
                {col.title}
              </h3>
              <p className="text-text" style={{ fontSize: '14px' }}>
                {col.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
