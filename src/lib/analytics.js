/**
 * Capa de analítica — sin proveedor por ahora.
 * En desarrollo imprime los eventos en consola para facilitar el debug.
 * En producción es un no-op hasta conectar un proveedor.
 * Las llamadas existentes a trackEvent en los componentes se mantienen sin cambios.
 *
 * @param {string} name - Nombre del evento
 * @param {Record<string, unknown>} [data] - Datos adicionales del evento
 */
export function trackEvent(name, data) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, data ?? {})
  }
  // TODO: conectar proveedor cuando esté definido (Cloudflare Web Analytics, Plausible, etc.)
}
