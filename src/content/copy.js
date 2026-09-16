/**
 * Copy aprobado — NO modificar sin aprobación explícita.
 * Todo el texto visible de la página se lee desde aquí.
 * Fuente: documento de diseño LimpioVen, sección 8.
 */

export const COPY = {
  // ── Metadatos ───────────────────────────────────────────────────────────
  meta: {
    title:
      'LimpioVen, C.A. — Tercerización de limpieza y mantenimiento industrial en Venezuela',
    description:
      'Personal de limpieza industrial, sanitización para industria alimentaria y trabajos en altura y espacios confinados. Más de 10 años operando. Cobertura nacional.',
    whatsappMessage:
      'Hola, vi la página de LimpioVen y quiero información sobre el servicio de limpieza para mi empresa.',
  },

  // ── 1. Portada ──────────────────────────────────────────────────────────
  hero: {
    headline: 'Su planta limpia. Sin una nómina más que administrar.',
    subtitle:
      'Tercerizamos el personal de limpieza y mantenimiento de su empresa: operarios capacitados, supervisión propia y todas las obligaciones laborales de nuestro lado.',
    ctaPrimary: 'Solicitar cotización',
    ctaSecondary: 'Escríbanos por WhatsApp',
    supportLine:
      'Más de 10 años operando · Cobertura nacional · Facturación formal y cumplimiento laboral al día',
  },

  // ── 2. El problema ──────────────────────────────────────────────────────
  problem: {
    heading:
      'Mantener personal de limpieza propio le cuesta más de lo que aparece en la nómina',
    columns: [
      {
        title: 'Carga laboral',
        text: 'Contrataciones, sustituciones, vacaciones, reposos, prestaciones, inspecciones. Cada operario es un expediente que alguien de su equipo tiene que administrar.',
      },
      {
        title: 'Inversión que no produce',
        text: 'Máquinas, equipos de seguridad, uniformes y productos de limpieza son capital inmovilizado en algo que no es el negocio de su empresa.',
      },
      {
        title: 'Supervisión desatendida',
        text: 'Sin alguien dedicado a supervisar la limpieza, el estándar baja con el tiempo y solo se nota cuando llega una auditoría o una visita.',
      },
    ],
  },

  // ── 3. La solución ──────────────────────────────────────────────────────
  solution: {
    heading: 'Nosotros asumimos la operación completa',
    benefits: [
      {
        title: 'Sin responsabilidad laboral para usted.',
        text: 'Nuestros trabajadores son nuestros. Cumplimos IVSS, FAOV, INCES, bono de alimentación y todas las obligaciones de ley, y usted no es nuestra única ni mayor fuente de ingreso.',
      },
      {
        title: 'Sin comprar equipos ni productos.',
        text: 'El costo del servicio incluye maquinaria, implementos, uniformes, equipos de protección personal y productos de limpieza.',
      },
      {
        title: 'Supervisión incluida.',
        text: 'Cada contrato lleva un supervisor o coordinador de nuestra plantilla que responde por el resultado y sirve de canal único con su empresa.',
      },
      {
        title: 'Costo previsible y facturación formal.',
        text: 'Facturamos por horas efectivamente laboradas, con factura fiscal y retenciones conforme a la ley. Lo que no se trabaja, no se cobra.',
      },
      {
        title: 'Sustitución garantizada.',
        text: 'Si un operario falta, lo reemplazamos. Su operación no se detiene por una ausencia.',
      },
      {
        title: 'Horarios a la medida.',
        text: 'Turnos diurnos, nocturnos, rotativos, fines de semana y trabajos en paradas de planta.',
      },
    ],
  },

  // ── 4. Servicios ────────────────────────────────────────────────────────
  services: {
    heading: 'Qué hacemos',
    items: [
      {
        id: '4.1',
        title: 'Mantenimiento y limpieza continua',
        intro:
          'Personal fijo asignado a sus instalaciones, en el turno y la cantidad que su operación requiera.',
        bullets: [
          'Áreas de producción y líneas de proceso',
          'Edificios de empaque y despacho',
          'Almacenes, galpones y áreas externas',
          'Oficinas administrativas, comedores y cocinas',
          'Baños y áreas sanitarias',
          'Centros comerciales, condominios y edificios',
        ],
        image: null,
      },
      {
        id: '4.2',
        title: 'Sanitización para industria alimentaria',
        intro:
          'Limpieza y desinfección bajo los estándares que exige la manipulación de alimentos, con personal entrenado en los protocolos del sector. Es el servicio que prestamos a diario en las dos plantas de un molino harinero desde hace más de una década.',
        bullets: [
          'Desinfección y sanitización de áreas de proceso',
          'Turnos nocturnos de sanitización sin interrumpir la producción',
          'Limpieza de depósitos refrigerados, comedores y áreas de manipulación',
        ],
        image: 'sanitizacion',
      },
      {
        id: '4.3',
        title: 'Trabajos en altura y espacios confinados',
        intro:
          'Nuestra especialidad técnica, y el servicio que pocas empresas de limpieza pueden ejecutar.',
        bullets: [
          'Limpieza interna de silos de harina, sémola, afrecho, granolina y empaque',
          'Trabajos en altura sobre estructuras, techos y tuberías',
          'Personal certificado en trabajos en altura y espacios confinados',
          'Equipos propios: trípode de rescate, extractor de aire a prueba de explosiones, silla de trabajo en altura',
          'Cuadrilla con técnico especialista en descenso y supervisor dedicado',
        ],
        image: 'altura',
      },
      {
        id: '4.4',
        title: 'Limpieza especial y paradas de planta',
        intro:
          'Desempolvado y limpieza profunda de techos, tuberías, paredes, columnas, estructuras, tableros, escaleras y pisos, con recolección y disposición de desechos. Movilizamos cuadrillas de hasta 16 operarios para ejecutar en los días de parada, sin extender el tiempo de inactividad.',
        bullets: [],
        image: null,
      },
      {
        id: '4.5',
        title: 'Fumigación y control de plagas',
        intro:
          'Control de plagas con operarios certificados y supervisión, programado para no interferir con la operación.',
        bullets: [],
        image: null,
      },
      {
        id: '4.6',
        title: 'Jardinería y áreas verdes',
        intro: 'Mantenimiento de áreas verdes, poda y desmalezado con equipo propio.',
        bullets: [],
        image: null,
      },
      {
        id: '4.7',
        title: 'Trabajos especiales',
        intro:
          'Pintura de instalaciones, lavado de tanques, lavado de fachadas y cercas, limpieza de fosas y alcantarillas, cristalizado y diamantado de pisos, adecuación de espacios y plomería menor.',
        bullets: [],
        image: null,
      },
    ],
    closing: 'Si su empresa lo necesita, lo evaluamos y le presentamos una propuesta.',
  },

  // ── 5. Trayectoria y clientes ───────────────────────────────────────────
  clients: {
    heading: 'Empresas que han confiado su operación en nosotros',
    text: 'Desde 2015 prestamos servicio a empresas industriales y comerciales en Venezuela. Hoy mantenemos de forma continua las dos plantas de Molinos Carabobo, S.A. (MOCASA), con más de 30 personas en sitio entre operarios, jardinería y supervisión, un servicio que no se ha interrumpido en más de una década.',
    list: [
      'Molinos Carabobo, S.A. (MOCASA)',
      'Polifilm de Venezuela, S.A.',
      'Bera Motorcycles (Corporación Kuri Sam)',
      'Industrias Unicon, C.A.',
      'Fersoga, C.A.',
      'Distribuidora 360 VIP',
      'Consorcio Licorero Altú, C.A.',
      'Maxiconsumos 24, C.A.',
      'IM Victoria, C.A.',
      'Heydi Lee Sport',
    ],
    stats: [
      { value: '+10', label: 'años de operación continua' },
      { value: '+30', label: 'personas en servicio activo' },
      { value: '2',   label: 'plantas industriales atendidas a diario' },
    ],
  },

  // ── 6. Cómo trabajamos ──────────────────────────────────────────────────
  process: {
    heading: 'De la visita a la operación en 15 días hábiles',
    steps: [
      {
        n: '1',
        title: 'Visita y análisis.',
        text: 'Recorremos sus instalaciones y levantamos las áreas, frecuencias y requerimientos reales.',
      },
      {
        n: '2',
        title: 'Propuesta a la medida.',
        text: 'Le presentamos cantidad de personal, turnos, equipos e insumos, con el costo desglosado.',
      },
      {
        n: '3',
        title: 'Contratación del personal.',
        text: 'Aprobada la propuesta, reclutamos, evaluamos y contratamos en un lapso de 15 días hábiles.',
      },
      {
        n: '4',
        title: 'Inducción y arranque.',
        text: 'El personal entra con uniformes, equipos de protección, inducción de seguridad y notificación de riesgos del puesto.',
      },
      {
        n: '5',
        title: 'Supervisión y control.',
        text: 'Un coordinador asignado responde por el servicio y ajusta el plan según sus evaluaciones.',
      },
    ],
    footnote:
      'Nuestro proceso de selección incluye entrevista, examen médico, pruebas psicotécnicas, contratación formal, charla de inducción y adiestramiento continuo.',
  },

  // ── 7. Cumplimiento y seguridad ─────────────────────────────────────────
  compliance: {
    heading: 'Una contratación que no le genera contingencias',
    text: 'Tercerizar con una empresa informal traslada el riesgo a su empresa. Con LimpioVen, cada trabajador está formalmente contratado y cada servicio se respalda con factura fiscal.',
    points: [
      'Empresa inscrita en el Registro Mercantil Segundo del Estado Aragua desde 2015',
      'Facturación fiscal con IVA y retenciones conforme a la ley',
      'Cumplimiento de LOPCYMAT: delegado de prevención en cada contrato, notificación de riesgos por puesto e instrucción en seguridad y salud laboral',
      'Exámenes médicos de ingreso, egreso, pre y post vacacionales',
      'Dotación completa de equipos de protección personal',
      'Pólizas de responsabilidad patronal y servicio de área protegida',
      'Personal certificado en trabajos en altura, espacios confinados y fumigación',
      'Productos con controles de calidad y ficha de seguridad',
    ],
  },

  // ── 8. Cobertura ────────────────────────────────────────────────────────
  coverage: {
    heading: 'Dónde prestamos servicio',
    text: 'Atendemos empresas en todo el territorio nacional. Nuestra operación actual se concentra en el eje Aragua–Carabobo, con sede administrativa en Cagua, estado Aragua, y evaluamos proyectos en cualquier estado del país.',
  },

  // ── 9. Contacto ─────────────────────────────────────────────────────────
  contact: {
    heading: 'Cuéntenos qué necesita su empresa',
    text: 'Coordinamos una visita a sus instalaciones sin costo y le presentamos una propuesta con el personal, los turnos y el costo desglosado.',
    fields: {
      nombre:    'Nombre y apellido',
      empresa:   'Empresa',
      cargo:     'Cargo',
      telefono:  'Teléfono',
      correo:    'Correo electrónico',
      ubicacion: 'Estado o ciudad',
      servicio:  'Servicio de interés',
      necesidad: 'Cuéntenos brevemente qué necesita',
    },
    servicioOptions: [
      'Mantenimiento y limpieza continua',
      'Sanitización para industria alimentaria',
      'Trabajos en altura y espacios confinados',
      'Limpieza especial y paradas de planta',
      'Fumigación y control de plagas',
      'Jardinería y áreas verdes',
      'Trabajos especiales',
      'Aún no lo tengo claro',
    ],
    submitButton: 'Enviar solicitud',
    hoursLabel: 'Horario de atención',
    baseLabel: 'Sede administrativa',
  },

  // ── Pie de página ───────────────────────────────────────────────────────
  footer: {
    line1: 'LIMPIOVEN, C.A. · RIF J-40663817-0',
    line2: 'Servicios de limpieza y mantenimiento industrial · Cobertura nacional',
    copyright: '© 2026 LimpioVen, C.A. Todos los derechos reservados.',
  },
}
