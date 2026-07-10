import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminQuoteList } from "@/components/admin/AdminQuoteList";
import type { AdminQuoteCardProps } from "@/components/admin/AdminQuoteCard";
import type { ThreadMessage } from "@/components/dashboard/types";
import type { ClaimWithMessages } from "@/components/dashboard/ClaimsPanel";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const [{ data: quoteRequests }, { data: claims }] = await Promise.all([
    supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("claims").select("*").order("created_at", { ascending: false }),
  ]);

  const requests = quoteRequests ?? [];
  const allClaims = claims ?? [];

  const requestIds = requests.map((r) => r.id);
  const claimIds = allClaims.map((c) => c.id);

  const [{ data: messages }, { data: claimMessages }] = await Promise.all([
    requestIds.length > 0
      ? supabase
          .from("messages")
          .select("*")
          .in("quote_request_id", requestIds)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [] as { quote_request_id: string; id: string; body: string; sender_id: string; created_at: string }[] }),
    claimIds.length > 0
      ? supabase
          .from("claim_messages")
          .select("*")
          .in("claim_id", claimIds)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [] as { claim_id: string; id: string; body: string; sender_id: string; created_at: string }[] }),
  ]);

  const messagesByRequest = new Map<string, ThreadMessage[]>();
  for (const m of messages ?? []) {
    const list = messagesByRequest.get(m.quote_request_id) ?? [];
    list.push({
      id: m.id,
      body: m.body,
      createdAtLabel: formatDate(m.created_at),
      isMine: m.sender_id === user.id,
    });
    messagesByRequest.set(m.quote_request_id, list);
  }

  const claimMessagesByClaim = new Map<string, ThreadMessage[]>();
  for (const cm of claimMessages ?? []) {
    const list = claimMessagesByClaim.get(cm.claim_id) ?? [];
    list.push({
      id: cm.id,
      body: cm.body,
      createdAtLabel: formatDate(cm.created_at),
      isMine: cm.sender_id === user.id,
    });
    claimMessagesByClaim.set(cm.claim_id, list);
  }

  const claimsByRequest = new Map<string, ClaimWithMessages[]>();
  for (const c of allClaims) {
    const list = claimsByRequest.get(c.quote_request_id) ?? [];
    list.push({
      id: c.id,
      subject: c.subject,
      description: c.description,
      status: c.status,
      createdAtLabel: formatDate(c.created_at),
      messages: claimMessagesByClaim.get(c.id) ?? [],
    });
    claimsByRequest.set(c.quote_request_id, list);
  }

  const adminRequests: AdminQuoteCardProps[] = requests.map((r) => ({
    id: r.id,
    fullName: r.full_name,
    company: r.company,
    email: r.email,
    phone: r.phone,
    assistanceType: r.assistance_type,
    equipmentType: r.equipment_type,
    powerKva: r.power_kva,
    location: r.location,
    description: r.description,
    status: r.status,
    createdAtLabel: formatDate(r.created_at),
    messages: messagesByRequest.get(r.id) ?? [],
    claims: claimsByRequest.get(r.id) ?? [],
  }));

  const pendingCount = requests.filter(
    (r) => r.status === "received" || r.status === "in_review"
  ).length;
  const openClaimsCount = allClaims.filter(
    (c) => c.status === "open" || c.status === "in_progress"
  ).length;

  return (
    <div className="min-h-screen bg-navy-950">
      <AdminHeader fullName={profile?.full_name ?? null} />

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-text-main md:text-3xl">
            Demandes de devis
          </h1>
          <p className="mt-2 text-sm text-text-mute">
            Gérez les demandes de tous les clients, échangez et traitez les réclamations.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border-soft bg-navy-800 p-5">
            <p className="text-xs text-text-faint">Total demandes</p>
            <p className="mt-1 font-heading text-2xl font-bold text-text-main">
              {requests.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border-soft bg-navy-800 p-5">
            <p className="text-xs text-text-faint">En attente de traitement</p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-500">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-border-soft bg-navy-800 p-5">
            <p className="text-xs text-text-faint">Réclamations ouvertes</p>
            <p className="mt-1 font-heading text-2xl font-bold text-text-main">
              {openClaimsCount}
            </p>
          </div>
        </div>

        <AdminQuoteList requests={adminRequests} />
      </main>
    </div>
  );
}
