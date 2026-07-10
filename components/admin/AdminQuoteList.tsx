"use client";

import { useState } from "react";
import { QUOTE_STATUS_OPTIONS } from "@/components/ui/Badge";
import { AdminQuoteCard, type AdminQuoteCardProps } from "@/components/admin/AdminQuoteCard";
import type { QuoteStatus } from "@/lib/supabase/types";

export function AdminQuoteList({ requests }: { requests: AdminQuoteCardProps[] }) {
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const countFor = (status: QuoteStatus) => requests.filter((r) => r.status === status).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            filter === "all"
              ? "border-accent-500/40 bg-accent-500/10 text-accent-500"
              : "border-border-soft text-text-mute hover:text-text-main"
          }`}
        >
          Toutes ({requests.length})
        </button>
        {QUOTE_STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === opt.value
                ? "border-accent-500/40 bg-accent-500/10 text-accent-500"
                : "border-border-soft text-text-mute hover:text-text-main"
            }`}
          >
            {opt.label} ({countFor(opt.value)})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[28px] border border-border-soft bg-navy-800 px-8 py-16 text-center">
          <p className="text-sm text-text-mute">Aucune demande dans cette catégorie.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map((request) => (
            <AdminQuoteCard key={request.id} {...request} />
          ))}
        </div>
      )}
    </div>
  );
}
