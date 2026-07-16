import Image from "next/image";
import CurrentYear from "./current-year";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d0d1a]">

      {/* ── Blobs de color decorativos ────────────────────────── */}
      <div className="blob blob-blue" aria-hidden="true" />
      <div className="blob blob-yellow" aria-hidden="true" />
      <div className="blob blob-red" aria-hidden="true" />
      <div className="blob blob-green" aria-hidden="true" />

      {/* ── Grilla sutil de fondo ─────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Contenido principal ───────────────────────────────── */}
      <main className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 text-center max-w-3xl mx-auto">

        {/* Logo */}
        <div className="logo-glow">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
            alt="Python Colombia"
            width={480}
            height={148}
            priority
            className="w-56 sm:w-72 md:w-[420px] h-auto"
          />
        </div>

        {/* Badge «Próximamente» */}
        <span className="badge-glow inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase text-yellow-300">
          <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          Próximamente
        </span>

        {/* Encabezado principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
          El hogar digital de la comunidad{" "}
          <span className="gradient-text">Python Colombia</span>{" "}
          se está renovando.
        </h1>

        {/* Subtexto */}
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
          Estamos construyendo algo increíble para ti y toda la comunidad.
          Vuelve pronto y sé parte de este gran paso.
        </p>

        {/* Snippet decorativo tipo código */}
        <div className="mt-2 w-full max-w-sm rounded-xl border border-zinc-700/50 bg-zinc-900/60 backdrop-blur-sm px-6 py-4 text-left font-mono text-sm leading-7">
          <span className="text-[#ffd43b]">import</span>{" "}
          <span className="text-[#4584b6]">python_colombia</span>
          <br />
          <br />
          <span className="text-[#4caf50]">community</span>{" "}
          <span className="text-zinc-300">=</span>{" "}
          <span className="text-[#4584b6]">python_colombia</span>
          <span className="text-zinc-300">.</span>
          <span className="text-zinc-200">Community</span>
          <span className="text-zinc-300">()</span>
          <br />
          <span className="text-zinc-500"># coming soon... 🐍</span>
        </div>

      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="text-zinc-600 text-sm">
          © <CurrentYear /> Python Colombia
          <span className="mx-2 text-zinc-700">·</span>
          Comunidad de Python en Colombia
        </p>
      </footer>

    </div>
  );
}
