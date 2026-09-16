/**
 * Contenedor de ancho máximo con padding lateral.
 * Úsalo dentro de cada Section para centrar el contenido.
 */
export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  )
}
