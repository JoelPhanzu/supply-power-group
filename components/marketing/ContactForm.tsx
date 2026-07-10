"use client";

import { useEffect, useState, type FormEvent } from "react";
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
    <section id="contact" className="bg-surface-page py-28">
      <div className="mx-auto max-w-[720px] px-6">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-heading text-3xl font-bold text-ink-900 md:text-4xl">
            Faire une Demande d&apos;Étude
          </h2>
          <p className="text-ink-600">
            Remplissez ce formulaire d&apos;avant-projet. Nos techniciens vous recontacteront sous
            24 heures pour planifier un audit technique ou chiffrer vos fournitures.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-border-light bg-surface-card p-6 shadow-[0_10px_30px_rgba(18,21,31,0.06)] md:p-10"
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
            <p className="mb-5 rounded-lg border border-red-400/35 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-8 py-4 text-base font-semibold text-white shadow-[0_10px_25px_rgba(18,21,31,0.2)] transition-all hover:-translate-y-0.5 hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Envoi en cours..." : "Soumettre mon projet"}
          </button>

          {submitted && (
            <p className="mt-4 rounded-lg border border-emerald-400/35 bg-emerald-50 px-4 py-3.5 text-center text-sm text-emerald-700">
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
  "w-full rounded-lg border border-border-light bg-surface-page px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink-900">{label}</label>
      {children}
    </div>
  );
}
