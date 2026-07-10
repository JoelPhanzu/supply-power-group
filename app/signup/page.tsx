"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell, authInputClass } from "@/components/auth/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("+243 ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company, phone },
      },
    });

    setPending(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setNeedsConfirmation(true);
    }
  }

  if (needsConfirmation) {
    return (
      <>
        <Navbar />
        <AuthShell
          title="Vérifie ta boîte mail"
          subtitle="Dernière étape avant d'accéder à ton espace."
          footer={
            <Link href="/login" className="font-semibold text-accent-500 hover:underline">
              Retour à la connexion
            </Link>
          }
        >
          <p className="text-sm text-text-mute">
            Un e-mail de confirmation a été envoyé à <strong className="text-text-main">{email}</strong>.
            Clique sur le lien qu&apos;il contient pour activer ton compte.
          </p>
        </AuthShell>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <AuthShell
        title="Créer un compte"
        subtitle="Suis tes demandes de devis et échange directement avec notre équipe."
        footer={
          <>
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-accent-500 hover:underline">
              Se connecter
            </Link>
          </>
        }
      >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">Nom complet *</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex : Jean Kabila"
            className={authInputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Entreprise</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nom de votre société"
            className={authInputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Téléphone *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={authInputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">E-mail *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@entreprise.com"
            className={authInputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Mot de passe *</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 caractères minimum"
            className={authInputClass}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-400/35 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-8 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,60,40,0.35)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </AuthShell>
      <Footer />
    </>
  );
}
