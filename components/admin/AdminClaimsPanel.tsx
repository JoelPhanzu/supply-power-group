"use client";

import { useState } from "react";
import { CLAIM_STATUS_OPTIONS } from "@/components/ui/Badge";
import { ClaimThread } from "@/components/dashboard/ClaimsPanel";
import { updateClaimStatus } from "@/lib/actions/claims";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { ClaimWithMessages } from "@/components/dashboard/ClaimsPanel";

export function AdminClaimsPanel({ claims }: { claims: ClaimWithMessages[] }) {
  const [openClaimId, setOpenClaimId] = useState<string | null>(null);

  if (claims.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-border-soft bg-navy-700 p-5">
        <p className="text-sm text-text-mute">Aucune réclamation pour cette demande.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-border-soft bg-navy-700 p-5">
      <ul className="flex flex-col gap-3">
        {claims.map((claim) => (
          <li key={claim.id} className="rounded-xl border border-border-soft bg-navy-800 p-4">
            <div className="flex items-start justify-between gap-3">
              <button
                type="button"
                onClick={() => setOpenClaimId(openClaimId === claim.id ? null : claim.id)}
                className="text-left"
              >
                <p className="text-sm font-semibold text-text-main">{claim.subject}</p>
                <p className="text-xs text-text-faint">{claim.createdAtLabel}</p>
              </button>
              <StatusSelect
                value={claim.status}
                options={CLAIM_STATUS_OPTIONS}
                onChange={(status) => updateClaimStatus(claim.id, status)}
              />
            </div>

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
    </div>
  );
}
