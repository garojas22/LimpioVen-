import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Logo } from '../ui/Logo.jsx'
import { Button } from '../ui/Button.jsx'
import { Container } from '../ui/Container.jsx'
import { COPY } from '../../content/copy.js'

/**
 * Menú móvil fullscreen accesible.
 * - Se abre desde Header al pulsar el botón hamburguesa.
 * - Se cierra con Escape, con el botón de cerrar, o al elegir un enlace.
 * - El foco va al botón de cerrar al abrirse.
 *
 * Props:
 *   open    — boolean
 *   onClose — función para cerrar
 *   links   — [{ href, label }]
 */
export function MobileMenu({ open, onClose, links }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    closeRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 bg-bg flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación" // TEXTO NUEVO
    >
      <Container>
        <div className="flex items-center justify-between h-14 border-b border-line">
          <Logo />
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-2 text-ink"
            aria-label="Cerrar menú de navegación" // TEXTO NUEVO
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <nav className="flex-1 flex flex-col overflow-y-auto" aria-label="Navegación principal">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-6 py-4 text-ink text-base font-medium border-b border-line hover:bg-bg-2 transition-colors"
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}

        {/* CTA al final de la lista — desplaza a #contacto y cierra el menú */}
        <div className="px-6 py-5 mt-auto border-t border-line">
          <Button
            href="#contacto"
            variant="primary"
            className="w-full justify-center"
            onClick={onClose}
          >
            {COPY.hero.ctaPrimary}
          </Button>
        </div>
      </nav>
    </div>
  )
}
