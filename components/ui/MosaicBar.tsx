const MOSAIC_CLASSES = [
  "bg-accent-red",
  "bg-accent-orange",
  "bg-python-yellow",
  "bg-accent-green",
  "bg-python-blue-light",
  "bg-accent-purple",
] as const;

/** Fila de bloques sólidos del mosaico del logo (elemento gráfico recurrente). */
export function MosaicBar({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-1 ${className}`.trim()}>
      {MOSAIC_CLASSES.map((color) => (
        <span key={color} className={`h-2 w-2 ${color}`} />
      ))}
    </span>
  );
}

/** Franja de mosaico de borde a borde (remate de navbar y footer). */
export function MosaicStrip({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex h-[3px] w-full ${className}`.trim()}>
      {MOSAIC_CLASSES.map((color) => (
        <span key={color} className={`flex-1 ${color}`} />
      ))}
    </div>
  );
}
