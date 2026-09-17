import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { WhatsAppFloat } from './components/layout/WhatsAppFloat.jsx'
import { Hero } from './components/sections/Hero.jsx'
import { Problem } from './components/sections/Problem.jsx'
import { Services } from './components/sections/Services.jsx'
import { Section } from './components/ui/Section.jsx'

/**
 * App — compone las secciones en orden.
 * Las secciones 3–9 son placeholders vacíos para que las anclas y la
 * navegación ya funcionen. Se completan en fases posteriores.
 */
export default function App() {
  return (
    <>
      {/* Enlace de salto — accesibilidad por teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only"
        style={{
          position: 'absolute',
          zIndex: 100,
          top: 8,
          left: 8,
          padding: '8px 12px',
          background: 'var(--cta)',
          color: 'var(--cta-ink)',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        Saltar al contenido {/* TEXTO NUEVO */}
      </a>

      <Header />

      <main id="main-content" className="pt-14">
        {/* 1 — Portada */}
        <Hero />

        {/* 2 — El problema */}
        <Problem />

        {/* 3 — La solución (fase posterior) */}
        <Section id="solucion" bg="bg" />

        {/* 4 — Servicios */}
        <Services />

        {/* 5 — Trayectoria y clientes (fase posterior) */}
        <Section id="clientes" bg="bg" />

        {/* 6 — Cómo trabajamos (fase posterior) */}
        <Section id="como-trabajamos" bg="bg-2" />

        {/* 7 — Cumplimiento y seguridad (fase posterior) */}
        <Section id="cumplimiento" bg="bg" />

        {/* 8 — Cobertura (fase posterior) */}
        <Section id="cobertura" bg="bg-2" />

        {/* 9 — Contacto (fase posterior)
            Nota: sin whatsappNumber válido, el formulario solo registra por correo
            y muestra confirmación; openWhatsApp no se llama. */}
        <Section id="contacto" bg="bg" />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
