/**
 * Botón de acción — dos variantes, esquinas rectas.
 *
 * Variante "primary":  fondo --cta, texto --cta-ink. Solo para "Solicitar cotización" / "Enviar solicitud".
 * Variante "secondary": borde 1.5 px --brand, texto --brand, fondo transparente.
 *
 * Renderiza <a> si recibe `href`, <button> si no.
 *
 * Props:
 *   href      — si está presente, renderiza <a>
 *   variant   — 'primary' | 'secondary'
 *   children
 *   className — clases extra
 *   ...rest   — onClick, aria-*, etc.
 */
export function Button({ href, variant = 'primary', children, className = '', ...rest }) {
  const base =
    'inline-flex items-center gap-2 font-semibold text-[14px] px-4 py-[11px] leading-none transition-opacity hover:opacity-90'

  const variants = {
    primary:   'bg-cta text-cta-ink',
    secondary: 'text-brand bg-transparent',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
