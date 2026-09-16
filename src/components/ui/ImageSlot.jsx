import { IMAGES } from '../../content/images.js'

/**
 * Slot de imagen con placeholder punteado cuando la foto aún no está disponible.
 *
 * - Si src es null: pinta el placeholder con la etiqueta y reserva el espacio con aspect-ratio.
 * - Si src existe: renderiza <img> optimizado.
 * - Sustituir una foto = copiar a public/images/ y actualizar src + alt en images.js.
 *
 * Props:
 *   name      — clave en IMAGES (ej. "hero")
 *   ratio     — aspect-ratio CSS (ej. "4/3", "16/9"). Default "4/3"
 *   priority  — si es true, omite loading="lazy" (para la imagen above-the-fold)
 *   className — clases extra
 */
export function ImageSlot({ name, ratio = '4/3', priority = false, className = '' }) {
  const image = IMAGES[name]

  if (!image) return null

  const style = { aspectRatio: ratio }

  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full object-cover ${className}`}
        style={style}
        data-placeholder={name}
      />
    )
  }

  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{
        ...style,
        border: '1.5px dashed var(--line)',
      }}
      data-placeholder={name}
      aria-hidden="true"
    >
      <span
        style={{
          fontSize: '12px',
          color: 'var(--text-2)',
          textAlign: 'center',
          padding: '8px',
        }}
      >
        {image.label}
      </span>
    </div>
  )
}
