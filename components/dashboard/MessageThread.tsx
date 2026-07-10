"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react/ssr";
import type { ThreadMessage } from "@/components/dashboard/types";
import type { ActionResult } from "@/lib/actions/types";

export function MessageThread({
  messages,
  onSend,
  emptyLabel = "Aucun échange pour le moment.",
  placeholder = "Écrire un message...",
  size = "md",
}: {
  messages: ThreadMessage[];
  onSend: (body: string) => Promise<ActionResult>;
  emptyLabel?: string;
  placeholder?: string;
  size?: "md" | "sm";
}) {
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setPending(true);
    setError(null);

    const result = await onSend(body);
    setPending(false);

    if (!result.success) {
      setError(result.error ?? "Une erreur est survenue.");
      return;
    }

    setBody("");
  }

  const bubbleClass =
    size === "sm" ? "rounded-xl px-3.5 py-2.5 text-sm" : "rounded-2xl px-4 py-3 text-sm";
  const listGap = size === "sm" ? "gap-2.5" : "gap-3";
  const inputClass =
    size === "sm"
      ? "flex-1 rounded-lg border border-border-soft bg-navy-700 px-3.5 py-2 text-sm text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25"
      : "flex-1 rounded-lg border border-border-soft bg-navy-800 px-4 py-2.5 text-sm text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25";
  const buttonClass =
    size === "sm"
      ? "inline-flex items-center justify-center rounded-full bg-gradient-accent px-3.5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      : "inline-flex items-center justify-center rounded-full bg-gradient-accent px-4 py-2.5 text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div>
      {messages.length === 0 ? (
        <p className="text-sm text-text-mute">{emptyLabel}</p>
      ) : (
        <ul className={`flex flex-col ${listGap}`}>
          {messages.map((m) => (
            <li
              key={m.id}
              className={`max-w-[85%] ${bubbleClass} ${
                m.isMine ? "ml-auto bg-gradient-accent text-white" : "bg-navy-600 text-text-main"
              }`}
            >
              <p>{m.body}</p>
              <p className={`mt-1 text-[0.7rem] ${m.isMine ? "text-white/70" : "text-text-faint"}`}>
                {m.createdAtLabel}
              </p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className={`${size === "sm" ? "mt-3" : "mt-4"} flex gap-3`}>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={pending || !body.trim()}
          className={buttonClass}
          aria-label="Envoyer"
        >
          <PaperPlaneTilt className={iconClass} weight="fill" />
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}
