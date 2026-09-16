import { SITE } from '../config/site.js'

/**
 * Envía los datos del formulario a Web3Forms.
 * Fire-and-forget: no espera respuesta, no bloquea el flujo del formulario.
 * Los errores se capturan y se envían a consola.
 *
 * @param {Record<string, string>} data - Campos del formulario
 */
export function submitLead(data) {
  if (!SITE.web3formsAccessKey) {
    console.warn(
      '[submitLead] web3formsAccessKey no está configurado en src/config/site.js. ' +
        'Configura la clave antes de publicar.'
    )
    return
  }

  const formData = new FormData()
  formData.append('access_key', SITE.web3formsAccessKey)
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
    keepalive: true,
  }).catch((err) => {
    console.error('[submitLead] Error al enviar formulario:', err)
  })
}
