"use client";

import { useState } from "react";
import { ChatCircleDots, Warning, CaretDown, EnvelopeSimple, Phone } from "@phosphor-icons/react/ssr";
import { QUOTE_STATUS_OPTIONS } from "@/components/ui/Badge";
import { ASSISTANCE_TYPE_LABELS } from "@/lib/assistance-types";
import { sendQuoteMessage } from "@/lib/actions/messages";
import { updateQuoteRequestStatus } from "@/lib/actions/quote-requests";
import { MessageThread } from "@/components/dashboard/MessageThread";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { AdminClaimsPanel } from "@/components/admin/AdminClaimsPanel";
import type { ClaimWithMessages } from "@/components/dashboard/ClaimsPanel";
import type { ThreadMessage } from "@/components/dashboard/types";
import type { QuoteStatus } from "@/lib/supabase/types";

export interface AdminQuoteCardProps {
  id: string;
  fullName: string;
  company: string | null;
  email: string;
  phone: string;
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

export function AdminQuoteCard({
  id,
  fullName,
  company,
  email,
  phone,
  assistanceType,
  equipmentType,
  powerKva,
  location,
  description,
  status,
  createdAtLabel,
  messages,
  claims,
}: AdminQuoteCardProps) {
  const [panel, setPanel] = useState<"none" | "suivi" | "reclamations">("none");

  return (
    <div className="rounded-[28px] border border-border-soft bg-navy-800 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-faint">
            {createdAtLabel}
          </p>
          <h3 className="font-heading text-lg font-bold text-text-main">{fullName}</h3>
          {company && <p className="text-sm text-text-mute">{company}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-mute">
            <span className="inline-flex items-center gap-1.5">
              <EnvelopeSimple className="h-3.5 w-3.5 text-text-faint" />
              {email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-text-faint" />
              {phone}
            </span>
          </div>
        </div>
        <StatusSelect
          value={status}
          options={QUOTE_STATUS_OPTIONS}
          onChange={(next) => updateQuoteRequestStatus(id, next)}
        />
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-500">
        {ASSISTANCE_TYPE_LABELS[assistanceType] ?? assistanceType}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-mute">{description}</p>

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
            emptyLabel="Aucun échange pour le moment."
            placeholder="Répondre au client..."
          />
        </div>
      )}

      {panel === "reclamations" && <AdminClaimsPanel claims={claims} />}
    </div>
  );
}
