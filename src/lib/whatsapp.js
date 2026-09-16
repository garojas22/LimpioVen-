import { SITE } from '../config/site.js'

/**
 * Construye la URL de WhatsApp con el mensaje codificado.
 * Si whatsappNumber está vacío, emite un aviso en desarrollo.
 * @param {string} message
 * @returns {string}
 */
export function buildWaUrl(message) {
  if (!SITE.whatsappNumber) {
    console.warn(
      '[whatsapp] SITE.whatsappNumber no está configurado en src/config/site.js. ' +
        'Configura el número antes de publicar.'
    )
  }
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/**
 * Construye el mensaje precargado del formulario de contacto.
 * Omite las líneas cuyos campos estén vacíos/nulos.
 * Recorta el campo "necesidad" a 500 caracteres.
 * @param {Object} data
 * @param {string} [data.nombre]
 * @param {string} [data.empresa]
 * @param {string} [data.cargo]
 * @param {string} [data.telefono]
 * @param {string} [data.correo]
 * @param {string} [data.ubicacion]
 * @param {string} [data.servicio]
 * @param {string} [data.necesidad]
 * @returns {string}
 */
export function buildLeadMessage(data = {}) {
  const lines = [
    'Hola, les escribo desde la página de LimpioVen para solicitar una visita.',
    data.nombre    ? `Nombre: ${data.nombre}`          : null,
    data.empresa   ? `Empresa: ${data.empresa}`         : null,
    data.cargo     ? `Cargo: ${data.cargo}`             : null,
    data.telefono  ? `Teléfono: ${data.telefono}`       : null,
    data.correo    ? `Correo: ${data.correo}`           : null,
    data.ubicacion ? `Ubicación: ${data.ubicacion}`     : null,
    data.servicio  ? `Servicio: ${data.servicio}`       : null,
    data.necesidad ? `Necesidad: ${data.necesidad.slice(0, 500)}` : null,
  ]
  return lines.filter(Boolean).join('\n')
}

/**
 * Abre WhatsApp.
 * En dispositivos táctiles: redirige en la misma pestaña.
 * En escritorio: abre en nueva pestaña.
 * Debe llamarse sincrónicamente dentro del handler del evento de clic/envío.
 * @param {string} url
 */
export function openWhatsApp(url) {
  if (window.matchMedia('(pointer: coarse)').matches) {
    window.location.href = url
  } else {
    window.open(url, '_blank', 'noopener')
  }
}
