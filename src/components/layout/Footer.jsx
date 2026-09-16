import { Container } from '../ui/Container.jsx'
import { COPY } from '../../content/copy.js'

export function Footer() {
  return (
    <footer className="bg-bg-2 border-t border-line">
      <Container className="py-8">
        <p className="text-text-2 text-sm">{COPY.footer.line1}</p>
        <p className="text-text-2 text-sm">{COPY.footer.line2}</p>
        <p className="text-text-2 text-sm mt-3">{COPY.footer.copyright}</p>
      </Container>
    </footer>
  )
}
