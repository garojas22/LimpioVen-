import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Logo } from '../ui/Logo.jsx'
import { Button } from '../ui/Button.jsx'
import { Container } from '../ui/Container.jsx'
import { MobileMenu } from './MobileMenu.jsx'

const NAV_LINKS = [
  { href: '#servicios',        label: 'Servicios' },
  { href: '#clientes',         label: 'Clientes' },
  { href: '#como-trabajamos',  label: 'Cómo trabajamos' },
  { href: '#cumplimiento',     label: 'Cumplimiento' },
  { href: '#contacto',         label: 'Contacto' },
]

/**
 * Cabecera fija con logo, navegación por anclas y botón CTA en escritorio.
 * En móvil muestra el botón hamburguesa que abre MobileMenu.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-bg border-b border-line">
        <Container>
          <div className="flex items-center justify-between h-14">
            {/* Logo — enlace al inicio */}
            <a href="#portada" className="flex-shrink-0">
              <Logo />
            </a>

            {/* Navegación escritorio */}
            <nav
              className="hidden md:flex items-center gap-5 lg:gap-7"
              aria-label="Navegación principal"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text hover:text-ink transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contacto" variant="primary">
                Solicitar cotización
              </Button>
            </nav>

            {/* Botón hamburguesa — solo móvil */}
            <button
              className="md:hidden p-2 -mr-2 text-ink"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú de navegación" // TEXTO NUEVO
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
