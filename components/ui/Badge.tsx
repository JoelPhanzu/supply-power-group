import type { ClaimStatus, QuoteStatus } from "@/lib/supabase/types";

const STATUS_CONFIG: Record<QuoteStatus, { label: string; className: string }> = {
  received: {
    label: "Reçue",
    className: "bg-blue-400/10 text-blue-300 border-blue-400/25",
  },
  in_review: {
    label: "En étude",
    className: "bg-amber-400/10 text-amber-300 border-amber-400/25",
  },
  quote_sent: {
    label: "Devis envoyé",
    className: "bg-accent-500/10 text-accent-500 border-accent-500/25",
  },
  validated: {
    label: "Validée",
    className: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  },
  rejected: {
    label: "Refusée",
    className: "bg-red-400/10 text-red-300 border-red-400/25",
  },
};

const CLAIM_STATUS_CONFIG: Record<ClaimStatus, { label: string; className: string }> = {
  open: {
    label: "Ouverte",
    className: "bg-blue-400/10 text-blue-300 border-blue-400/25",
  },
  in_progress: {
    label: "En traitement",
    className: "bg-amber-400/10 text-amber-300 border-amber-400/25",
  },
  resolved: {
    label: "Résolue",
    className: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  },
  rejected: {
    label: "Rejetée",
    className: "bg-red-400/10 text-red-300 border-red-400/25",
  },
};

export const QUOTE_STATUS_OPTIONS = (Object.keys(STATUS_CONFIG) as QuoteStatus[]).map(
  (value) => ({ value, label: STATUS_CONFIG[value].label })
);

export const CLAIM_STATUS_OPTIONS = (Object.keys(CLAIM_STATUS_CONFIG) as ClaimStatus[]).map(
  (value) => ({ value, label: CLAIM_STATUS_CONFIG[value].label })
);

export function StatusBadge({ status }: { status: QuoteStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const config = CLAIM_STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
