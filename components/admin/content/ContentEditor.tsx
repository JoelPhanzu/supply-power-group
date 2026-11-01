"use client";

import { useState } from "react";
import { ArrowSquareOut, ArrowCounterClockwise, FloppyDisk } from "@phosphor-icons/react";
import {
  DEFAULT_CONTENT,
  SECTIONS,
  type SectionKey,
  type SiteContent,
} from "@/lib/content/schema";
import { resetSiteSection, saveSiteSection } from "@/lib/actions/content";
import { FieldsEditor } from "@/components/admin/content/Fields";

type Status = { type: "success" | "error"; message: string } | null;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ContentEditor({
  initialContent,
  updatedAt,
}: {
  initialContent: SiteContent;
  updatedAt: Record<string, string>;
}) {
  const [activeKey, setActiveKey] = useState<SectionKey>(SECTIONS[0].key);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saved, setSaved] = useState<SiteContent>(initialContent);
  const [lastUpdate, setLastUpdate] = useState(updatedAt);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const section = SECTIONS.find((s) => s.key === activeKey)!;
  const value = content[activeKey] as unknown as Record<string, unknown>;
  const isDirty = (key: SectionKey) => JSON.stringify(content[key]) !== JSON.stringify(saved[key]);

  function update(next: Record<string, unknown>) {
    setContent((c) => ({ ...c, [activeKey]: next }));
    setStatus(null);
  }

  function switchTo(key: SectionKey) {
    setActiveKey(key);
    setStatus(null);
  }

  async function handleSave() {
    setPending(true);
    setStatus(null);
    const result = await saveSiteSection(activeKey, content[activeKey]);
    setPending(false);
    if (!result.success) {
      setStatus({ type: "error", message: result.error ?? "Une erreur est survenue." });
      return;
    }
    setSaved((s) => ({ ...s, [activeKey]: content[activeKey] }));
    setLastUpdate((u) => ({ ...u, [activeKey]: new Date().toISOString() }));
    setStatus({ type: "success", message: "Modifications enregistrées et publiées sur le site." });
  }

  async function handleReset() {
    if (!confirm("Remettre cette section à son contenu d'origine ? Vos modifications seront perdues.")) {
      return;
    }
    setPending(true);
    setStatus(null);
    const result = await resetSiteSection(activeKey);
    setPending(false);
    if (!result.success) {
      setStatus({ type: "error", message: result.error ?? "Une erreur est survenue." });
      return;
    }
    const original = structuredClone(DEFAULT_CONTENT[activeKey]);
    setContent((c) => ({ ...c, [activeKey]: original }));
    setSaved((s) => ({ ...s, [activeKey]: original }));
    setLastUpdate((u) => {
      const next = { ...u };
      delete next[activeKey];
      return next;
    });
    setStatus({ type: "success", message: "Section remise à son contenu d'origine." });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-2xl border border-border-soft bg-navy-800 p-2 lg:sticky lg:top-6">
        <ul className="flex gap-1 overflow-x-auto lg:flex-col">
          {SECTIONS.map((s) => (
            <li key={s.key} className="flex-shrink-0">
              <button
                type="button"
                onClick={() => switchTo(s.key)}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                  s.key === activeKey
                    ? "bg-navy-600 font-semibold text-text-main"
                    : "text-text-mute hover:bg-navy-700 hover:text-text-main"
                }`}
              >
                {s.label}
                {isDirty(s.key) && (
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent-500" title="Non enregistré" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="rounded-2xl border border-border-soft bg-navy-800 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-border-soft pb-5">
          <div>
            <h2 className="font-heading text-xl font-bold text-text-main">{section.label}</h2>
            <p className="mt-1 text-sm text-text-mute">{section.description}</p>
            <p className="mt-2 text-xs text-text-faint">
              {lastUpdate[activeKey]
                ? `Dernière modification : ${formatDate(lastUpdate[activeKey])}`
                : "Contenu d'origine (jamais modifié)"}
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm text-text-mute hover:text-accent-500"
          >
            Voir le site <ArrowSquareOut className="h-4 w-4" />
          </a>
        </div>

        <FieldsEditor fields={section.fields} value={value} onChange={update} />

        <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 flex flex-wrap items-center gap-3 rounded-b-2xl border-t border-border-soft bg-navy-800/95 px-6 py-4 backdrop-blur md:-mx-8 md:-mb-8 md:px-8">
          <button
            type="button"
            onClick={handleSave}
            disabled={pending || !isDirty(activeKey)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FloppyDisk className="h-4 w-4" />
            {pending ? "Enregistrement..." : "Enregistrer et publier"}
          </button>
          {lastUpdate[activeKey] && (
            <button
              type="button"
              onClick={handleReset}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full border border-border-soft px-5 py-2.5 text-sm text-text-mute hover:text-text-main disabled:opacity-50"
            >
              <ArrowCounterClockwise className="h-4 w-4" />
              Contenu d&apos;origine
            </button>
          )}
          {status && (
            <p
              className={`text-sm ${
                status.type === "success" ? "text-emerald-400" : "text-red-300"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
