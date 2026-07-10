import { redirect } from "next/navigation";
import { Tray } from "@phosphor-icons/react/ssr";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuoteRequestCard } from "@/components/dashboard/QuoteRequestCard";
import type { ThreadMessage } from "@/components/dashboard/types";
import type { ClaimWithMessages } from "@/components/dashboard/ClaimsPanel";
import { ButtonLink } from "@/components/ui/Button";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  const [{ data: profile }, { data: quoteRequests }, { data: claims }] = await Promise.all([
    supabase.from("profiles").select("full_name, company").eq("id", user.id).single(),
    supabase
      .from("quote_requests")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("claims")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false }),
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

  return (
    <div className="min-h-screen bg-navy-950">
      <DashboardHeader fullName={profile?.full_name ?? null} company={profile?.company ?? null} />

      <main className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
        <div className="mb-10">
          <h1 className="font-heading text-2xl font-bold text-text-main md:text-3xl">
            Mes demandes de devis
          </h1>
          <p className="mt-2 text-sm text-text-mute">
            Suivez l&apos;avancement de vos demandes et échangez avec notre équipe technique.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center gap-5 rounded-[28px] border border-border-soft bg-navy-800 px-8 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/10">
              <Tray className="h-7 w-7 text-accent-500" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-bold text-text-main">
                Aucune demande pour le moment
              </h2>
              <p className="mt-1.5 max-w-[420px] text-sm text-text-mute">
                Faites votre première demande d&apos;étude et notre équipe technique vous
                recontactera sous 48h.
              </p>
            </div>
            <ButtonLink href="/#contact">Faire une demande</ButtonLink>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {requests.map((r) => (
              <QuoteRequestCard
                key={r.id}
                id={r.id}
                assistanceType={r.assistance_type}
                equipmentType={r.equipment_type}
                powerKva={r.power_kva}
                location={r.location}
                description={r.description}
                status={r.status}
                createdAtLabel={formatDate(r.created_at)}
                messages={messagesByRequest.get(r.id) ?? []}
                claims={claimsByRequest.get(r.id) ?? []}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
