/**
 * Bloque semántico <section> con fondo alterno y scroll-margin para el header fijo.
 *
 * Props:
 *   id        — ancla de navegación
 *   bg        — 'bg' (default) | 'bg-2'
 *   children
 *   className — clases extra
 *   ...rest   — aria-labelledby y otros atributos semánticos
 */
export function Section({ id, bg = 'bg', children, className = '', ...rest }) {
  const bgClass =
    bg === 'bg-2' ? 'bg-bg-2 border-t border-line' : 'bg-bg'

  return (
    <section
      id={id}
      className={`scroll-mt-14 ${bgClass} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}
