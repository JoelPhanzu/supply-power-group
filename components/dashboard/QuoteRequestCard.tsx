"use client";

import { useState } from "react";
import { ChatCircleDots, Warning, CaretDown } from "@phosphor-icons/react/ssr";
import { StatusBadge } from "@/components/ui/Badge";
import { ASSISTANCE_TYPE_LABELS } from "@/lib/assistance-types";
import { sendQuoteMessage } from "@/lib/actions/messages";
import { MessageThread } from "@/components/dashboard/MessageThread";
import { ClaimsPanel, type ClaimWithMessages } from "@/components/dashboard/ClaimsPanel";
import type { ThreadMessage } from "@/components/dashboard/types";
import type { QuoteStatus } from "@/lib/supabase/types";

export interface QuoteRequestCardProps {
  id: string;
  assistanceType: string;
  equipmentType: string | null;
  powerKva: number | null;
  location: string | null;
  description: string;
  status: QuoteStatus;
  createdAtLabel: string;
  messages: ThreadMessage[];
  claims: ClaimWithMessages[];
}

export function QuoteRequestCard({
  id,
  assistanceType,
  equipmentType,
  powerKva,
  location,
  description,
  status,
  createdAtLabel,
  messages,
  claims,
}: QuoteRequestCardProps) {
  const [panel, setPanel] = useState<"none" | "suivi" | "reclamations">("none");

  return (
    <div className="rounded-[28px] border border-border-soft bg-navy-800 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-faint">
            {createdAtLabel}
          </p>
          <h3 className="font-heading text-lg font-bold text-text-main">
            {ASSISTANCE_TYPE_LABELS[assistanceType] ?? assistanceType}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-mute">{description}</p>

      {(equipmentType || powerKva || location) && (
        <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-border-soft pt-5 sm:grid-cols-3">
          {equipmentType && (
            <div>
              <dt className="text-xs text-text-faint">Équipement</dt>
              <dd className="text-sm font-medium text-text-main">{equipmentType}</dd>
            </div>
          )}
          {powerKva && (
            <div>
              <dt className="text-xs text-text-faint">Puissance</dt>
              <dd className="text-sm font-medium text-text-main">{powerKva} kVA</dd>
            </div>
          )}
          {location && (
            <div>
              <dt className="text-xs text-text-faint">Localisation</dt>
              <dd className="text-sm font-medium text-text-main">{location}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap gap-3 border-t border-border-soft pt-5">
        <button
          type="button"
          onClick={() => setPanel(panel === "suivi" ? "none" : "suivi")}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            panel === "suivi"
              ? "border-accent-500/40 bg-accent-500/10 text-accent-500"
              : "border-border-soft text-text-mute hover:text-text-main"
          }`}
        >
          <ChatCircleDots className="h-4 w-4" />
          Suivi {messages.length > 0 && `(${messages.length})`}
          <CaretDown
            className={`h-3.5 w-3.5 transition-transform ${panel === "suivi" ? "rotate-180" : ""}`}
          />
        </button>
        <button
          type="button"
          onClick={() => setPanel(panel === "reclamations" ? "none" : "reclamations")}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            panel === "reclamations"
              ? "border-accent-500/40 bg-accent-500/10 text-accent-500"
              : "border-border-soft text-text-mute hover:text-text-main"
          }`}
        >
          <Warning className="h-4 w-4" />
          Réclamations {claims.length > 0 && `(${claims.length})`}
          <CaretDown
            className={`h-3.5 w-3.5 transition-transform ${panel === "reclamations" ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {panel === "suivi" && (
        <div className="mt-5 rounded-2xl border border-border-soft bg-navy-700 p-5">
          <MessageThread
            messages={messages}
            onSend={(body) => sendQuoteMessage(id, body)}
            emptyLabel="Aucun échange pour le moment. Envoyez un message à notre équipe technique."
          />
        </div>
      )}

      {panel === "reclamations" && <ClaimsPanel quoteRequestId={id} claims={claims} />}
    </div>
  );
}
