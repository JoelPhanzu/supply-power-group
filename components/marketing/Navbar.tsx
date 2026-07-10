"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lightning, List, X } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

const LINKS = [
  { href: "#hero", label: "Accueil" },
  { href: "#expertises", label: "Nos expertises" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border-soft bg-navy-950/70 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-6">
        <Link href="#" className="flex items-center gap-2.5 font-heading text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-accent shadow-[0_6px_16px_rgba(255,90,31,0.35)]">
            <Lightning weight="fill" className="h-5 w-5 text-white" />
          </span>
          SUPPLY <span className="text-accent-500">POWER</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-text-mute transition-colors hover:text-text-main"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-gradient-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {signedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-mute hover:text-text-main"
              >
                Mon espace
              </Link>
              <LogoutButton className="text-sm font-medium text-text-mute hover:text-text-main" />
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium text-text-mute hover:text-text-main">
              Connexion
            </Link>
          )}
          <a
            href="#contact"
            className="inline-flex rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,60,40,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,60,40,0.5)]"
          >
            Demander un devis
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-text-main md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-b border-border-soft bg-navy-900 px-6 py-5 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-text-mute hover:text-text-main"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={signedIn ? "/dashboard" : "/login"}
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-text-mute hover:text-text-main"
          >
            {signedIn ? "Mon espace" : "Connexion"}
          </Link>
          {signedIn && (
            <LogoutButton className="text-left text-sm font-medium text-text-mute hover:text-text-main" />
          )}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-white"
          >
            Demander un devis
          </a>
        </nav>
      )}
    </header>
  );
}
