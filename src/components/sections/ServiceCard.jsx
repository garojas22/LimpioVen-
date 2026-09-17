import { ImageSlot } from '../ui/ImageSlot.jsx'

/**
 * Tarjeta de servicio — dos variantes:
 *
 * "featured" (4.1–4.3): título + intro + bullets en 2 columnas desktop + foto a la derecha.
 * "compact"  (4.4–4.7): título + intro, sin foto. El borde lo aplica el wrapper en Services.
 */
export function ServiceCard({ item, variant }) {
  if (variant === 'compact') {
    return (
      <div className="p-6 md:p-8">
        <h3
          className="font-condensed font-bold text-ink mb-3"
          style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)' }}
        >
          {item.title}
        </h3>
        <p className="text-text text-[0.9375rem] leading-[1.5]">{item.intro}</p>
      </div>
    )
  }

  // variant === 'featured'
  return (
    <div className="py-10 md:py-14">
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-start">
        {/* Columna de texto y bullets */}
        <div>
          <h3
            className="font-condensed font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)' }}
          >
            {item.title}
          </h3>
          <p className="text-text text-[0.9375rem] leading-[1.5] mb-6">{item.intro}</p>

          {item.bullets.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {item.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-2 text-text-2 text-[0.875rem] leading-[1.5]"
                >
                  <span className="text-brand shrink-0" aria-hidden="true">—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Columna de imagen */}
        <div className="mt-8 md:mt-0">
          <ImageSlot name={item.image} ratio="16/9" />
        </div>
      </div>
    </div>
  )
}
