"use client";

import { useState } from "react";
import { LuLoaderCircle, LuMail } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { subscribeToNewsletter } from "@/lib/mock/newsletter";
import type { NewsletterResponse, NewsletterStatus } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEEDBACK_STYLES: Record<NewsletterStatus, string> = {
  success: "bg-accent-green text-night",
  already_subscribed: "bg-python-yellow text-night",
  error: "bg-accent-red text-white",
};

type FormState =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "loading" }
  | { kind: "feedback"; response: NewsletterResponse };

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>({ kind: "idle" });

  const loading = state.kind === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    if (!EMAIL_PATTERN.test(email.trim())) {
      setState({ kind: "invalid" });
      return;
    }

    setState({ kind: "loading" });
    // Mismo contrato async que tendrá el fetch a la API real.
    const response = await subscribeToNewsletter(email);
    setState({ kind: "feedback", response });
    if (response.status === "success") setEmail("");
  }

  return (
    <section id="newsletter" className="scroll-mt-24 py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid border border-white/10 lg:grid-cols-5">
            {/* Panel de marca en azul sólido */}
            <div className="relative bg-python-blue p-8 sm:p-10 lg:col-span-2">
              <SectionHeading
                number="04"
                eyebrow="Newsletter"
                title="No te pierdas nada"
                accentClass="text-python-yellow-light"
              />
              <div aria-hidden="true" className="mt-10 hidden gap-1.5 lg:flex">
                <span className="h-3 w-3 bg-python-yellow" />
                <span className="h-3 w-3 bg-python-yellow/60" />
                <span className="h-3 w-3 bg-python-yellow/30" />
              </div>
            </div>

            {/* Panel del formulario */}
            <div className="bg-night-card p-8 sm:p-10 lg:col-span-3">
              <p className="max-w-md text-lg font-light leading-relaxed text-zinc-400">
                Recibe en tu correo los próximos eventos, noticias y novedades
                de la comunidad. Nada de spam, lo prometemos.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Correo electrónico
                  </label>
                  <div className="relative flex-1">
                    <LuMail
                      size={18}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (state.kind === "invalid") setState({ kind: "idle" });
                      }}
                      aria-invalid={state.kind === "invalid"}
                      aria-describedby="newsletter-feedback"
                      className={`w-full border bg-night py-3.5 pl-11 pr-4 text-base text-white placeholder:text-zinc-500 transition focus:outline-2 focus:outline-offset-2 focus:outline-python-yellow ${
                        state.kind === "invalid"
                          ? "border-accent-red"
                          : "border-white/15 hover:border-white/30"
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-python-yellow px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-night transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-python-blue-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:hover:translate-y-0"
                  >
                    {loading && (
                      <LuLoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                    )}
                    {loading ? "Enviando…" : "Suscribirme"}
                  </button>
                </div>

                {/* Región viva para anunciar el resultado a lectores de pantalla */}
                <div id="newsletter-feedback" aria-live="polite" className="mt-4 min-h-6">
                  {state.kind === "invalid" && (
                    <p className="bg-accent-red px-4 py-3 text-sm font-semibold text-white">
                      Ingresa un correo electrónico válido.
                    </p>
                  )}
                  {state.kind === "feedback" && (
                    <p
                      className={`px-4 py-3 text-sm font-semibold ${FEEDBACK_STYLES[state.response.status]}`}
                    >
                      {state.response.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
