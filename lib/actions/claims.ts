"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ClaimStatus } from "@/lib/supabase/types";
import type { ActionResult } from "@/lib/actions/types";

export async function createClaim(
  quoteRequestId: string,
  subject: string,
  description: string
): Promise<ActionResult> {
  const trimmedSubject = subject.trim();
  const trimmedDescription = description.trim();

  if (!trimmedSubject || !trimmedDescription) {
    return { success: false, error: "Merci de remplir l'objet et la description." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté pour ouvrir une réclamation." };
  }

  const { error } = await supabase.from("claims").insert({
    quote_request_id: quoteRequestId,
    client_id: user.id,
    subject: trimmedSubject,
    description: trimmedDescription,
  });

  if (error) {
    console.error("createClaim failed:", error);
    return { success: false, error: "Une erreur est survenue, merci de réessayer." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function sendClaimMessage(
  claimId: string,
  body: string
): Promise<ActionResult> {
  const trimmed = body.trim();
  if (!trimmed) {
    return { success: false, error: "Le message ne peut pas être vide." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté pour répondre." };
  }

  const { error } = await supabase.from("claim_messages").insert({
    claim_id: claimId,
    sender_id: user.id,
    body: trimmed,
  });

  if (error) {
    console.error("sendClaimMessage failed:", error);
    return { success: false, error: "Une erreur est survenue, merci de réessayer." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateClaimStatus(
  claimId: string,
  status: ClaimStatus
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { success: false, error: "Action réservée aux administrateurs." };
  }

  const { error } = await supabase.from("claims").update({ status }).eq("id", claimId);

  if (error) {
    console.error("updateClaimStatus failed:", error);
    return { success: false, error: "Une erreur est survenue, merci de réessayer." };
  }

  revalidatePath("/admin");
  return { success: true };
}
