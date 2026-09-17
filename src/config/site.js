export const SITE = {
  name: 'LimpioVen, C.A.',
  legalName: 'LIMPIOVEN, C.A.',
  rif: 'J-40663817-0',
  url: '',                  // PENDIENTE: dominio definitivo (ej. https://limpioven.com)
  whatsappNumber: import.meta.env?.VITE_WHATSAPP_NUMBER ?? '', // solo dígitos con código de país, ej. 58424XXXXXXX
  email: import.meta.env?.VITE_EMAIL ?? '',                   // si está vacío, la línea de correo no se muestra
  web3formsAccessKey: import.meta.env?.VITE_WEB3FORMS_KEY ?? '',
  hours: 'lunes a viernes, 8:00 a.m. a 5:00 p.m.',
  base: 'Cagua, estado Aragua',

  // Despliegue — Cloudflare Pages
  published: false,          // true solo al lanzar al público
  productionBranch: 'main',  // rama de producción en Cloudflare Pages
}
