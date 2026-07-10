"use client";

import { useState, type FormEvent } from "react";
import { ClaimStatusBadge } from "@/components/ui/Badge";
import { createClaim, sendClaimMessage } from "@/lib/actions/claims";
import { MessageThread } from "@/components/dashboard/MessageThread";
import type { ClaimStatus } from "@/lib/supabase/types";
import type { ThreadMessage } from "@/components/dashboard/types";

export interface ClaimWithMessages {
  id: string;
  subject: string;
  description: string;
  status: ClaimStatus;
  createdAtLabel: string;
  messages: ThreadMessage[];
}

const fieldClass =
  "rounded-lg border border-border-soft bg-navy-800 px-4 py-2.5 text-sm text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25";

export function ClaimsPanel({
  quoteRequestId,
  claims,
}: {
  quoteRequestId: string;
  claims: ClaimWithMessages[];
}) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openClaimId, setOpenClaimId] = useState<string | null>(null);

  async function handleCreateClaim(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const result = await createClaim(quoteRequestId, subject, description);
    setPending(false);

    if (!result.success) {
      setError(result.error ?? "Une erreur est survenue.");
      return;
    }

    setSubject("");
    setDescription("");
    setShowNewForm(false);
  }

  return (
    <div className="mt-5 rounded-2xl border border-border-soft bg-navy-700 p-5">
      {claims.length === 0 && !showNewForm && (
        <p className="mb-4 text-sm text-text-mute">Aucune réclamation pour cette demande.</p>
      )}

      {claims.length > 0 && (
        <ul className="mb-4 flex flex-col gap-3">
          {claims.map((claim) => (
            <li key={claim.id} className="rounded-xl border border-border-soft bg-navy-800 p-4">
              <button
                type="button"
                onClick={() => setOpenClaimId(openClaimId === claim.id ? null : claim.id)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-text-main">{claim.subject}</p>
                  <p className="text-xs text-text-faint">{claim.createdAtLabel}</p>
                </div>
                <ClaimStatusBadge status={claim.status} />
              </button>

              {openClaimId === claim.id && (
                <ClaimThread
                  claimId={claim.id}
                  description={claim.description}
                  messages={claim.messages}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {showNewForm ? (
        <form onSubmit={handleCreateClaim} className="flex flex-col gap-3">
          <input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Objet de la réclamation"
            className={fieldClass}
          />
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez le problème rencontré..."
            className={`${fieldClass} resize-y`}
          />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Envoi..." : "Envoyer la réclamation"}
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="rounded-full border border-border-soft px-5 py-2.5 text-sm font-medium text-text-mute hover:text-text-main"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowNewForm(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 text-sm font-medium text-text-mute transition-colors hover:border-accent-500/40 hover:text-text-main"
        >
          Ouvrir une réclamation
        </button>
      )}
    </div>
  );
}

export function ClaimThread({
  claimId,
  description,
  messages,
}: {
  claimId: string;
  description: string;
  messages: ThreadMessage[];
}) {
  return (
    <div className="mt-4 border-t border-border-soft pt-4">
      <p className="mb-3 text-sm text-text-mute">{description}</p>
      <MessageThread
        messages={messages}
        onSend={(body) => sendClaimMessage(claimId, body)}
        placeholder="Répondre..."
        size="sm"
      />
    </div>
  );
}
