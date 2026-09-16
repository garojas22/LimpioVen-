/**
 * Encabezado de sección (h2 por defecto).
 * Tipografía condensada, color --ink, interlineado apretado.
 * Usa el prop `id` para enlazarlo con aria-labelledby en <Section>.
 *
 * Props:
 *   id        — para aria-labelledby
 *   level     — número del heading (2 por defecto)
 *   children
 *   className — clases extra
 */
export function SectionHeading({ id, level = 2, children, className = '' }) {
  const Tag = `h${level}`
  return (
    <Tag
      id={id}
      className={`font-condensed font-bold text-ink leading-tight max-w-[24ch] ${className}`}
      style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)' }}
    >
      {children}
    </Tag>
  )
}
