/**
 * Logo provisional SVG de LimpioVen.
 * L en bloque: barra vertical 7×24 px + barra horizontal 20×7 px.
 * Colores heredados de las variables CSS del tema.
 * Se sustituye por el vector original cuando esté disponible.
 */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2" aria-label="LimpioVen C.A.">
      {/* L shape */}
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0" y="0" width="7" height="24" fill="var(--brand)" />
        <rect x="0" y="17" width="20" height="7" fill="var(--brand)" />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'IBM Plex Sans Condensed', system-ui, sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '.06em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: 'var(--ink)' }}>LIMPIOVEN</span>
        <span style={{ color: 'var(--brand)' }}> C.A</span>
      </span>
    </span>
  )
}
