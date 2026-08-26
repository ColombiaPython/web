import { MosaicBar } from "@/components/ui/MosaicBar";

interface SectionHeadingProps {
  /** Número editorial de la sección (ej. "01"). */
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Color del kicker (número + eyebrow). */
  accentClass?: string;
}

export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  accentClass = "text-python-yellow",
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${accentClass}`}
      >
        {/* <span className="font-mono">{number}</span> */}
        <span aria-hidden="true" className="h-px w-10 bg-current" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <MosaicBar className="mt-6" />
      {description && (
        <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
