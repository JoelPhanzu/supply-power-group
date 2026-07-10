"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import { useSimulator } from "@/components/marketing/SimulatorContext";
import { submitQuoteRequest } from "@/lib/actions/quote-requests";
import { ASSISTANCE_TYPES } from "@/lib/assistance-types";

export function ContactForm() {
  const { prefillMessage } = useSimulator();
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("+243 ");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onHashPrefill = () => {
      if (window.location.hash === "#contact" && !description) {
        setDescription(prefillMessage);
      }
    };
    window.addEventListener("hashchange", onHashPrefill);
    return () => window.removeEventListener("hashchange", onHashPrefill);
  }, [description, prefillMessage]);

  function handlePhoneChange(value: string) {
    if (!value.startsWith("+243")) {
      setPhone("+243 " + value.replace(/^\+?243\s?/, ""));
    } else {
      setPhone(value);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const result = await submitQuoteRequest(new FormData(form));

    setPending(false);

    if (!result.success) {
      setError(result.error ?? "Une erreur est survenue, merci de réessayer.");
      return;
    }

    setSubmitted(true);
    form.reset();
    setPhone("+243 ");
    setDescription("");
  }

  return (
    <section
      id="contact"
      className="bg-navy-950 py-28"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 800px 500px at 100% 0%, rgba(255,90,31,0.08), transparent 60%)",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 md:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            Parlons de votre projet
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-[2.4rem]">
            Faire une demande d&apos;étude
          </h2>
          <p className="mb-8 text-text-mute">
            Décrivez-nous votre besoin, notre équipe technique reviendra vers vous sous 48h avec
            une proposition adaptée à votre site et à votre budget.
          </p>
          <div className="flex flex-col gap-4 text-sm text-text-mute">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
              Avenue Nyamuragira 59, Gombe, Kinshasa — Immeuble Beautour
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
              +243 816 283 633
            </div>
            <div className="flex items-start gap-3">
              <EnvelopeSimple className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
              contact@supplypowergroup.com
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-border-soft bg-navy-800 p-6 md:p-10"
        >
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Nom complet *">
              <input name="fullName" required placeholder="Ex : Jean Kabila" className={inputClass} />
            </Field>
            <Field label="Entreprise">
              <input name="company" placeholder="Nom de votre société" className={inputClass} />
            </Field>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="E-mail *">
              <input
                type="email"
                name="email"
                required
                placeholder="vous@entreprise.com"
                className={inputClass}
              />
            </Field>
            <Field label="Téléphone *">
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mb-5">
            <Field label="Type d'assistance">
              <select name="assistanceType" className={inputClass} defaultValue="infrastructure">
                {ASSISTANCE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mb-6">
            <Field label="Description du besoin *">
              <textarea
                name="description"
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre site, votre puissance estimée, vos délais..."
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>

          {error && (
            <p className="mb-5 rounded-lg border border-red-400/35 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,60,40,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,60,40,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>

          {submitted && (
            <p className="mt-4 rounded-lg border border-emerald-400/35 bg-emerald-400/10 px-4 py-3.5 text-center text-sm text-emerald-300">
              Merci ! Votre demande a bien été enregistrée. Notre équipe vous recontactera très
              prochainement.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-border-soft bg-navy-700 px-4 py-3 text-[0.95rem] text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}
