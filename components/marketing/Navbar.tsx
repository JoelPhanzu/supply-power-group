"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

const LINKS = [
  { href: "/#hero", label: "Accueil" },
  { href: "/#expertises", label: "Nos expertises" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(!!session));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={`mx-auto flex h-[68px] max-w-[1100px] items-center justify-between rounded-full bg-surface-card px-3 pl-5 transition-shadow ${
          scrolled ? "shadow-[0_12px_36px_rgba(18,21,31,0.14)]" : "shadow-[0_6px_20px_rgba(18,21,31,0.08)]"
        }`}
      >
        <Link href="/" className="flex-shrink-0">
          <Logo theme="light" size="sm" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {signedIn ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-ink-600 hover:text-ink-900">
                Mon espace
              </Link>
              <LogoutButton className="text-sm font-medium text-ink-600 hover:text-ink-900" />
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium text-ink-600 hover:text-ink-900">
              Connexion
            </Link>
          )}
          <ButtonLink href="/#contact" variant="dark" size="md">
            Demander un devis
          </ButtonLink>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-ink-900 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-[1100px] flex-col gap-4 rounded-3xl bg-surface-card px-6 py-5 shadow-[0_12px_36px_rgba(18,21,31,0.14)] md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={signedIn ? "/dashboard" : "/login"}
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            {signedIn ? "Mon espace" : "Connexion"}
          </Link>
          {signedIn && (
            <LogoutButton className="text-left text-sm font-medium text-ink-600 hover:text-ink-900" />
          )}
          <ButtonLink href="/#contact" variant="dark" size="md" className="justify-center">
            Demander un devis
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
