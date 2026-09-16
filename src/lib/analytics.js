import { track } from '@vercel/analytics'

/**
 * Registra un evento personalizado en Vercel Analytics.
 * Es seguro llamar aunque Analytics no esté disponible o no esté inicializado.
 * Nota: los eventos personalizados pueden requerir un plan de pago en Vercel.
 *
 * @param {string} name - Nombre del evento
 * @param {Record<string, unknown>} [data] - Datos adicionales del evento
 */
export function trackEvent(name, data) {
  try {
    track(name, data)
  } catch {
    // Analytics no disponible o no inicializado — no interrumpir el flujo
  }
}
